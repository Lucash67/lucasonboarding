import { useEffect, useRef, type RefObject } from "react";
import { ArrowUpRight } from "lucide-react";
import { webProjects } from "@/lib/projects";
import { useI18n } from "@/components/site/i18n";

type Pt = { x: number; y: number; t: number };

/**
 * Hero com revelação pelo cursor: "site comum" → "o mesmo site com motion".
 * Técnica (ref: Império Web §5 / Gustavo Carvalho): o cursor deixa um rastro que
 * some devagar e funciona como máscara da camada "com motion". Sem mouse (celular
 * ou parado), um pincel virtual percorre o quadro sozinho. Em `prefers-reduced-motion`
 * a camada com motion aparece inteira, estática.
 * Aqui o rastro é feito com `mask-image` em CSS (vários radial-gradient), sem WebGL.
 */
export function useTrailMask(stage: RefObject<HTMLElement | null>, layer: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = stage.current;
    const top = layer.current;
    if (!el || !top) return;

    const setMask = (v: string) => {
      top.style.maskImage = v;
      top.style.webkitMaskImage = v;
    };
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setMask("none");
      return;
    }

    const LIFE = 950;
    const pts: Pt[] = [];
    let pointer = false;
    let lastMove = 0;
    let raf = 0;
    let active = true;
    let width = el.clientWidth;
    let height = el.clientHeight;
    const radius = () => (width < 640 ? 62 : 118);

    const push = (x: number, y: number, now: number) => {
      const last = pts[pts.length - 1];
      if (last) {
        const dx = x - last.x;
        const dy = y - last.y;
        const dist = Math.hypot(dx, dy);
        const step = radius() * 0.35;
        if (dist < 6 && now - last.t < 24) return;
        const n = Math.min(Math.floor(dist / step), 8);
        for (let i = 1; i <= n; i++) pts.push({ x: last.x + (dx * i) / (n + 1), y: last.y + (dy * i) / (n + 1), t: now });
      }
      pts.push({ x, y, t: now });
      if (pts.length > 40) pts.splice(0, pts.length - 40);
    };

    const onMove = (e: PointerEvent) => {
      const b = el.getBoundingClientRect();
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
      if (!pointer || now - lastMove > 1400) {
        const x = width * (0.5 + 0.36 * Math.sin(now / 1150));
        const y = height * (0.5 + 0.3 * Math.sin(now / 790 + 1.2));
        push(x, y, now);
      }
      while (pts.length && now - pts[0]!.t > LIFE) pts.shift();
      if (!pts.length) {
        setMask("linear-gradient(transparent, transparent)");
        return;
      }
      const R = radius();
      const layers = pts.map((p) => {
        const age = (now - p.t) / LIFE;
        const rr = Math.max(R * (0.3 + 0.7 * (1 - age)), 1);
        return `radial-gradient(circle ${rr.toFixed(0)}px at ${p.x.toFixed(0)}px ${p.y.toFixed(0)}px, #000 38%, transparent 100%)`;
      });
      setMask(layers.join(","));
    };

    const ro = new ResizeObserver(() => {
      width = el.clientWidth;
      height = el.clientHeight;
    });
    ro.observe(el);
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
  }, [stage, layer]);
}

/** Retrato: a foto do Lucas em P&B; onde o cursor passa, a versão gráfica (posterizada). */
export function PortraitStage() {
  const { t } = useI18n();
  const stage = useRef<HTMLDivElement>(null);
  const layer = useRef<HTMLDivElement>(null);
  useTrailMask(stage, layer);
  return (
    <div
      ref={stage}
      role="img"
      aria-label="Lucas Henrique"
      className="relative aspect-[3/4] w-full touch-pan-y select-none overflow-hidden rounded-2xl border bg-black"
    >
      <img src="/lucas/foto-pb.webp" alt="" width={900} height={1200} fetchPriority="high" className="absolute inset-0 h-full w-full object-cover" draggable={false} />
      <div
        ref={layer}
        aria-hidden
        className="absolute inset-0"
        style={{ maskRepeat: "no-repeat", WebkitMaskRepeat: "no-repeat", maskImage: "linear-gradient(#000,#000)", WebkitMaskImage: "linear-gradient(#000,#000)" }}
      >
        <img src="/lucas/foto-linhas.webp" alt="" width={900} height={1200} className="h-full w-full object-cover" draggable={false} />
      </div>
      {/* textura "glitch": a versão gráfica pisca em tempos irregulares (só no desktop) */}
      <img src="/lucas/foto-linhas.webp" alt="" aria-hidden width={900} height={1200} className="animate-glitch pointer-events-none absolute inset-0 hidden h-full w-full object-cover mix-blend-screen md:block" draggable={false} />
      {/* fade inferior: emenda a foto com o fundo e dá base para o título sobreposto */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-[42%]" style={{ background: "linear-gradient(to bottom, transparent, var(--background))" }} />
      <span className="pointer-events-none absolute right-3 top-3 z-20 hidden rounded-full bg-white px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-black md:block">{t.reveal.hint}</span>
    </div>
  );
}

export function RevealStage() {
  const { t } = useI18n();
  const r = t.reveal;
  const stage = useRef<HTMLDivElement>(null);
  const layer = useRef<HTMLDivElement>(null);
  const covers = webProjects.slice(0, 3);
  useTrailMask(stage, layer);

  return (
    <div
      ref={stage}
      role="img"
      aria-label={`${r.plain} → ${r.motion}`}
      className="relative aspect-[4/5] w-full touch-pan-y select-none overflow-hidden rounded-2xl border bg-[#e9e9e9] [container-type:inline-size] sm:aspect-[16/10]"
    >
      {/* Camada de baixo: o site comum, genérico e chapado */}
      <div aria-hidden className="absolute inset-0 p-[6cqw] text-[#5a5a5a] md:p-[3cqw]" style={{ fontFamily: "Arial, Helvetica, sans-serif" }}>
        <div className="flex items-center justify-between">
          <span className="bg-[#c4c4c4] px-[2cqw] py-[1cqw] text-[3.4cqw] font-bold text-[#777] md:px-[1cqw] md:py-[0.5cqw] md:text-[1.5cqw]">LOGO</span>
          <div className="flex gap-[3cqw] text-[3cqw] md:gap-[2cqw] md:text-[1.35cqw]">
            {r.fakeNav.map((n) => (
              <span key={n}>{n}</span>
            ))}
          </div>
        </div>
        <div className="mt-[8cqw] grid grid-cols-1 gap-[4cqw] md:mt-[4cqw] md:grid-cols-[1.1fr_1fr] md:gap-[3cqw]">
          <div>
            <p className="text-[7cqw] font-bold leading-tight text-[#333] md:text-[3cqw]">{r.fakeH}</p>
            <p className="mt-[3cqw] max-w-[90%] text-[3.4cqw] leading-snug md:mt-[1.2cqw] md:text-[1.35cqw]">{r.fakeP}</p>
            <span className="mt-[4cqw] inline-block bg-[#8d8d8d] px-[4cqw] py-[2cqw] text-[3.4cqw] text-white md:mt-[1.6cqw] md:px-[2cqw] md:py-[0.8cqw] md:text-[1.3cqw]">{r.fakeBtn}</span>
          </div>
          <div className="relative hidden bg-[#cfcfcf] md:block md:h-[16cqw]">
            <svg className="absolute inset-0 h-full w-full text-[#b3b3b3]" preserveAspectRatio="none" viewBox="0 0 100 100">
              <line x1="0" y1="0" x2="100" y2="100" stroke="currentColor" strokeWidth="0.6" vectorEffect="non-scaling-stroke" />
              <line x1="100" y1="0" x2="0" y2="100" stroke="currentColor" strokeWidth="0.6" vectorEffect="non-scaling-stroke" />
            </svg>
          </div>
        </div>
        <div className="absolute inset-x-[6cqw] bottom-[6cqw] grid grid-cols-3 gap-[3cqw] md:inset-x-[3cqw] md:bottom-[3cqw] md:gap-[2cqw]">
          {r.fakeCards.map((c) => (
            <div key={c} className="bg-[#dcdcdc] p-[2.5cqw] md:p-[1.2cqw]">
              <div className="h-[8cqw] bg-[#c8c8c8] md:h-[4cqw]" />
              <p className="mt-[2cqw] text-[3cqw] font-bold text-[#555] md:mt-[0.8cqw] md:text-[1.25cqw]">{c}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Camada de cima: o mesmo site com motion, revelada pelo rastro do cursor */}
      <div
        ref={layer}
        aria-hidden
        className="absolute inset-0 overflow-hidden bg-[#0b0b0b] p-[6cqw] text-white md:p-[3cqw]"
        style={{ maskRepeat: "no-repeat", WebkitMaskRepeat: "no-repeat", maskImage: "linear-gradient(#000,#000)", WebkitMaskImage: "linear-gradient(#000,#000)" }}
      >
        <div className="pointer-events-none absolute inset-0 opacity-[0.18]" style={{ backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)", backgroundSize: "8cqw 8cqw" }} />
        <div className="relative flex items-center justify-between">
          <span className="font-display text-[4.6cqw] font-bold md:text-[1.8cqw]">
            lucas<span className="opacity-60">.</span>
          </span>
          <div className="flex gap-[3cqw] font-mono text-[2.6cqw] uppercase tracking-widest md:gap-[2cqw] md:text-[1.05cqw]">
            {r.fakeNav.map((n) => (
              <span key={n} className="opacity-70">{n}</span>
            ))}
          </div>
        </div>
        <div className="relative mt-[8cqw] grid grid-cols-1 gap-[4cqw] md:mt-[4cqw] md:grid-cols-[1.1fr_1fr] md:gap-[3cqw]">
          <div>
            <p className="font-display text-[11cqw] font-bold leading-[0.9] md:text-[5.6cqw]">{r.motionH}</p>
            <p className="mt-[3cqw] font-serif text-[5cqw] italic text-white/70 md:mt-[1.2cqw] md:text-[2.2cqw]">{r.motionSub}</p>
            <span className="mt-[4cqw] inline-flex animate-pulse-dot items-center gap-[1.5cqw] rounded-full bg-white px-[5cqw] py-[2.4cqw] text-[3.4cqw] font-semibold text-black md:mt-[1.6cqw] md:gap-[0.6cqw] md:px-[2.2cqw] md:py-[0.9cqw] md:text-[1.25cqw]">
              {r.motionBtn} <ArrowUpRight className="h-[1.2em] w-[1.2em]" />
            </span>
          </div>
          <div className="relative hidden md:block md:h-[16cqw]">
            {covers.map((c, i) => (
              <img
                key={c.slug}
                src={c.cover}
                alt=""
                loading="lazy"
                className="animate-float absolute w-[62%] rounded-lg border border-white/20 object-cover object-top shadow-2xl"
                style={{
                  height: "70%",
                  left: `${i * 17}%`,
                  top: `${i * 12}%`,
                  transform: `rotate(${(i - 1) * 4}deg)`,
                  animationDelay: `${i * 0.6}s`,
                  zIndex: i,
                }}
              />
            ))}
          </div>
        </div>
        <div className="absolute inset-x-0 bottom-[6cqw] overflow-hidden md:bottom-[3cqw]">
          <div className="flex w-max animate-marquee gap-[4cqw] whitespace-nowrap font-display text-[9cqw] font-bold uppercase md:text-[3.4cqw]" style={{ ["--dur" as string]: "18s" }}>
            {[0, 1].map((k) => (
              <span key={k} className="flex shrink-0 gap-[4cqw]">
                {t.pain.concat(t.pain).map((w, i) => (
                  <span key={`${k}-${i}`} className={i % 2 ? "text-stroke-white" : ""} style={i % 2 ? { WebkitTextStroke: "1.5px #fff", color: "transparent" } : undefined}>
                    {w} ✦
                  </span>
                ))}
              </span>
            ))}
          </div>
        </div>
      </div>

      <span className="pointer-events-none absolute left-3 top-3 z-20 rounded-full bg-black/70 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-white backdrop-blur">{r.plain}</span>
      <span className="pointer-events-none absolute right-3 top-3 z-20 rounded-full bg-white px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-black">{r.motion}</span>
      <span className="pointer-events-none absolute left-1/2 top-3 z-20 hidden -translate-x-1/2 rounded-full bg-black/70 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-white backdrop-blur md:block">{r.hint}</span>
    </div>
  );
}
