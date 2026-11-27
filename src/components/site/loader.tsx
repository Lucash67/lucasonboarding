import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { useI18n } from "@/components/site/i18n";
import { PRELOAD } from "@/lib/preload";

const EXPO: [number, number, number, number] = [0.87, 0, 0.13, 1];

/**
 * Loader no molde do G-Steel: nome em mono, contador gigante 000→100 com barra fina e legenda,
 * dois painéis (cima e baixo) que se abrem no fim. O contador acompanha a pré-carga REAL das
 * imagens e fontes críticas, então o site já abre pronto, sem imagem aparecendo depois.
 * Tem trava de segurança de 6 s e respeita "reduzir movimento".
 */
export function Loader({ onDone }: { onDone: () => void }) {
  const { t } = useI18n();
  const [phase, setPhase] = useState<"loading" | "closing" | "done">("loading");
  const count = useRef<HTMLSpanElement>(null);
  const bar = useRef<HTMLElement>(null);
  const onDoneRef = useRef(onDone);
  onDoneRef.current = onDone;

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const html = document.documentElement;
    html.style.overflow = "hidden";

    let target = 0;
    let v = 0;
    let raf = 0;
    let last = performance.now();
    let finished = false;
    const timers: number[] = [];

    const paint = (now: number) => {
      raf = requestAnimationFrame(paint);
      const dt = Math.min(0.1, (now - last) / 1000);
      last = now;
      v += (target - v) * (1 - Math.pow(1 - 0.08, dt * 60));
      if (count.current) count.current.textContent = String(Math.round(v)).padStart(3, "0");
      if (bar.current) bar.current.style.transform = `scaleX(${(v / 100).toFixed(4)})`;
    };
    raf = requestAnimationFrame(paint);

    const finish = () => {
      if (finished) return;
      finished = true;
      target = 100;
      // espera o contador chegar a 100 e então abre os painéis (igual ao G-Steel)
      timers.push(
        window.setTimeout(() => {
          setPhase("closing");
          timers.push(window.setTimeout(() => onDoneRef.current(), reduce ? 0 : 750)); // entrada da hero junto da abertura
          timers.push(
            window.setTimeout(() => {
              setPhase("done");
              html.style.overflow = "";
            }, reduce ? 50 : 1950),
          );
        }, reduce ? 0 : 750),
      );
    };

    // pré-carga real: imagens críticas + fontes
    let loaded = 0;
    const total = PRELOAD.length + 1;
    const bump = () => {
      loaded++;
      target = Math.max(target, Math.min(96, (loaded / total) * 96));
    };
    const jobs = PRELOAD.map(
      (src) =>
        new Promise<void>((resolve) => {
          const img = new Image();
          img.decoding = "async";
          img.onload = img.onerror = () => {
            bump();
            resolve();
          };
          img.src = src;
        }),
    );
    const fonts = (document.fonts?.ready ?? Promise.resolve()).then(bump, bump);
    void Promise.all([...jobs, fonts]).then(finish);
    // trava de segurança: nunca prende o visitante
    timers.push(window.setTimeout(finish, 6000));

    return () => {
      cancelAnimationFrame(raf);
      timers.forEach((id) => window.clearTimeout(id));
      html.style.overflow = "";
    };
  }, []);

  if (phase === "done") return null;
  const closing = phase === "closing";

  return (
    <div className="lh-loader fixed inset-0 z-[200] grid place-items-center text-foreground" aria-hidden>
      <motion.div
        className="absolute inset-x-0 top-0 h-[50.5%] bg-background"
        animate={{ y: closing ? "-101%" : "0%" }}
        transition={{ duration: 1.3, delay: closing ? 0.55 : 0, ease: EXPO }}
      />
      <motion.div
        className="absolute inset-x-0 bottom-0 h-[50.5%] bg-background"
        animate={{ y: closing ? "101%" : "0%" }}
        transition={{ duration: 1.3, delay: closing ? 0.55 : 0, ease: EXPO }}
      />
      <motion.div
        className="relative grid justify-items-center gap-3.5 px-5"
        animate={closing ? { y: "-40%", opacity: 0 } : { y: "0%", opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.32, 0, 0.67, 1] }}
      >
        <span className="font-mono text-[11px] uppercase tracking-[0.08em] opacity-60">
          Lucas Henrique · {new Date().getFullYear()}
        </span>
        <div className="font-display text-[clamp(72px,14vw,180px)] font-extrabold leading-[0.85] tabular-nums">
          <span ref={count}>000</span>
          <sup className="ml-[0.1em] align-top text-[0.25em] font-medium">%</sup>
        </div>
        <div className="h-px w-[min(280px,60vw)] overflow-hidden bg-foreground/20">
          <i ref={bar} className="block h-full w-full origin-left bg-foreground" style={{ transform: "scaleX(0)" }} />
        </div>
        <span className="font-mono text-[11px] uppercase tracking-[0.08em] opacity-60">{t.loaderHint}</span>
      </motion.div>
    </div>
  );
}
