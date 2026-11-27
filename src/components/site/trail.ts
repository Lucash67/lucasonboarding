import { useEffect, type RefObject } from "react";

type Pt = { x: number; y: number; t: number };

type TrailOptions = {
  /** Centro e raio (em fração do tamanho da camada) do passeio automático do pincel. */
  cx?: number;
  cy?: number;
  rx?: number;
  ry?: number;
  /** Raio do pincel em px (desktop / celular). */
  radius?: [number, number];
  /** Pincel virtual automático quando não há mouse. Desligado = só aparece sob o cursor. */
  auto?: boolean;
};

/**
 * Revelação pelo cursor (ref: Império Web §5 e Gustavo Carvalho).
 * O cursor deixa um rastro que some devagar e funciona como `mask-image` da camada `layer`.
 * Sem mouse (celular ou parado por 1,4 s), um pincel virtual percorre `layer` sozinho.
 * Em `prefers-reduced-motion` a camada fica sem máscara (efeito estático).
 * O rastro é feito com vários `radial-gradient` em CSS, sem WebGL.
 */
export function useTrailMask(stage: RefObject<HTMLElement | null>, layer: RefObject<HTMLElement | null>, opts: TrailOptions = {}) {
  const { cx = 0.5, cy = 0.5, rx = 0.36, ry = 0.3, radius = [118, 62], auto = true } = opts;
  useEffect(() => {
    const el = stage.current;
    const top = layer.current;
    if (!el || !top) return;

    const setMask = (v: string) => {
      top.style.maskImage = v;
      top.style.webkitMaskImage = v;
      top.style.maskRepeat = "no-repeat";
      top.style.webkitMaskRepeat = "no-repeat";
    };
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!finePointer) {
      // celular/tablet: sem efeito de rastro, para o dedo só rolar a página
      setMask("linear-gradient(transparent, transparent)");
      return;
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setMask(auto ? "none" : "linear-gradient(transparent, transparent)");
      return;
    }

    const LIFE = 950;
    const pts: Pt[] = [];
    let pointer = false;
    let lastMove = 0;
    let raf = 0;
    let active = true;
    let width = top.clientWidth;
    let height = top.clientHeight;
    const R = () => (window.innerWidth < 640 ? radius[1] : radius[0]);

    const push = (x: number, y: number, now: number) => {
      const last = pts[pts.length - 1];
      if (last) {
        const dx = x - last.x;
        const dy = y - last.y;
        const dist = Math.hypot(dx, dy);
        if (dist < 6 && now - last.t < 24) return;
        const n = Math.min(Math.floor(dist / (R() * 0.35)), 8);
        for (let i = 1; i <= n; i++) pts.push({ x: last.x + (dx * i) / (n + 1), y: last.y + (dy * i) / (n + 1), t: now });
      }
      pts.push({ x, y, t: now });
      if (pts.length > 40) pts.splice(0, pts.length - 40);
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      const b = top.getBoundingClientRect();
      const now = performance.now();
      pointer = true;
      lastMove = now;
      push(e.clientX - b.left, e.clientY - b.top, now);
    };
    const onLeave = () => {
      pointer = false;
    };

    const loop = (now: number) => {
      raf = requestAnimationFrame(loop);
      if (!active) return;
      if (auto && (!pointer || now - lastMove > 1400)) {
        push(width * (cx + rx * Math.sin(now / 1150)), height * (cy + ry * Math.sin(now / 790 + 1.2)), now);
      }
      while (pts.length && now - pts[0]!.t > LIFE) pts.shift();
      if (!pts.length) {
        setMask("linear-gradient(transparent, transparent)");
        return;
      }
      const base = R();
      setMask(
        pts
          .map((p) => {
            const age = (now - p.t) / LIFE;
            const rr = Math.max(base * (0.3 + 0.7 * (1 - age)), 1);
            return `radial-gradient(circle ${rr.toFixed(0)}px at ${p.x.toFixed(0)}px ${p.y.toFixed(0)}px, #000 38%, transparent 100%)`;
          })
          .join(","),
      );
    };

    const ro = new ResizeObserver(() => {
      width = top.clientWidth;
      height = top.clientHeight;
    });
    ro.observe(top);
    const io = new IntersectionObserver(([entry]) => {
      active = !!entry?.isIntersecting;
    });
    io.observe(el);
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stage, layer]);
}
