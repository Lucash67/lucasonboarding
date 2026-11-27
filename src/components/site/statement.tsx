import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import { useRef } from "react";
import { useI18n } from "@/components/site/i18n";
import { RollText } from "@/components/site/motion";

// A parede é UMA imagem pré-montada (public/walls/wall.webp = bloco de 8×6 sites) repetida em mosaico.
// Antes eram 192 elementos com <img>, sombra e filtro; agora é uma só camada, bem mais leve de animar.
const WALL_W = 8 * 278;
const WALL_H = 6 * 180.5;
const COLS = 16;
const ROWS = 12;

// Fração da rolagem fixa da seção gasta enquanto a hero ainda está saindo (100svh de 440svh).
const REVEAL = 100 / 440;
// E a fração final, em que o filme (próxima seção) sobe por cima da parede.
const TAIL = 100 / 440;

/**
 * Segunda seção: parede de todos os sites em perspectiva, derivando na diagonal,
 * com a frase "Ninguém presta atenção no que é comum" no centro.
 * Ao rolar, a câmera mergulha na parede e "comum" é riscado e vira "incomum".
 * O cursor inclina levemente a parede. Com "reduzir movimento", mostra o estado final.
 */
export function Statement() {
  const { t, wa } = useI18n();
  const s = t.s.statement;
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  // A seção começa por baixo da hero (margem negativa): nos primeiros REVEAL da rolagem a hero sai
  // e a parede já vem subindo por baixo dela. Só depois disso o mergulho (p) começa.
  const p = useTransform(scrollYProgress, (v) => (reduce ? 1 : Math.min(1, Math.max(0, (v - REVEAL) / (1 - REVEAL - TAIL)))));
  const tail = useTransform(scrollYProgress, (v) => (reduce ? 0 : Math.min(1, Math.max(0, (v - (1 - TAIL)) / TAIL))));
  const q = useTransform(scrollYProgress, (v) => (reduce ? 1 : Math.min(1, v / REVEAL)));

  const mx = useSpring(useMotionValue(0), { stiffness: 60, damping: 20 });
  const my = useSpring(useMotionValue(0), { stiffness: 60, damping: 20 });

  const wall = useTransform(
    [p, mx, my, q, tail] as never,
    ([v, x, y, qq, tl]: number[]) => {
      const pre = 1 - qq!;
      return `translate(-50%, -50%) translateZ(${(v! * 900 - pre * 700 + tl! * 500).toFixed(1)}px) rotateX(${(54 - v! * 34 + y! * 4 + pre * 12).toFixed(2)}deg) rotateZ(${(-28 + v! * 14 + x! * 5).toFixed(2)}deg)`;
    },
  );
  const strike = useTransform(p, [0.25, 0.47], ["0%", "104%"]);
  const w1 = useTransform(p, [0.55, 0.63], [1, 0]);
  const w2 = useTransform(p, [0.58, 0.68], [0, 1]);
  const w2y = useTransform(p, [0.58, 0.68], ["0.25em", "0em"]);
  const after = useTransform(p, [0.72, 0.84], [0, 1]);
  const afterY = useTransform(p, [0.72, 0.84], [24, 0]);
  const hint = useTransform(p, [0, 0.05], [1, 0]);
  // A frase só aparece quando a hero já saiu quase toda (antes disso só se vê a parede subindo).
  const phrase = useTransform([q, tail] as never, ([a, b]: number[]) => Math.min(1, Math.max(0, (a! - 0.7) / 0.3)) * (1 - b! * 0.95));
  const wallFade = useTransform(tail, [0, 1], [1, 0.35]);

  return (
    <section
      id="statement"
      ref={ref}
      className="relative z-10 -mt-[100svh] h-[540svh] bg-background"
      onPointerMove={(e) => {
        mx.set(e.clientX / window.innerWidth - 0.5);
        my.set(e.clientY / window.innerHeight - 0.5);
      }}
    >
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        {/* Parede em perspectiva */}
        <div aria-hidden className="absolute inset-0 [perspective-origin:50%_40%] [perspective:1300px]">
          <motion.div className="absolute left-1/2 top-[52%] [transform-style:preserve-3d]" style={{ transform: wall, opacity: wallFade, willChange: "transform" }}>
            <div
              className="animate-drift-wall"
              style={{ width: COLS * 278, height: ROWS * 180.5, backgroundImage: "url(/walls/wall.webp)", backgroundSize: `${WALL_W}px ${WALL_H}px`, backgroundRepeat: "repeat" }}
            />
          </motion.div>
        </div>

        {/* Escurecimento no centro e nas bordas, para a frase ler bem */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-[5]"
          style={{
            background:
              "radial-gradient(60% 55% at 50% 50%, rgb(11 10 9 / .94) 0%, rgb(11 10 9 / .7) 45%, rgb(11 10 9 / .08) 100%), linear-gradient(to bottom, var(--background) 0%, transparent 16%, transparent 84%, var(--background) 100%)",
          }}
        />

        {/* Frase */}
        <motion.div style={{ opacity: phrase }} className="absolute inset-0 z-10 flex flex-col items-center justify-center px-[var(--pad)] text-center">
          <h2 aria-label={s.h1} className="max-w-[15ch] text-[clamp(38px,6.6vw,108px)] font-normal leading-[0.98] tracking-[-0.035em]">
            <span aria-hidden>
              {s.before}
              <span className="relative inline-block">
                <motion.span className="relative inline-block" style={{ opacity: w1 }}>
                  {s.w1}
                  <motion.b className="absolute -left-[2%] top-[55%] h-[0.07em] bg-accent" style={{ width: strike }} />
                </motion.span>
                <motion.span className="absolute left-0 top-0 whitespace-nowrap underline decoration-accent decoration-[0.06em] underline-offset-[0.12em]" style={{ opacity: w2, y: w2y }}>
                  {s.w2}
                </motion.span>
              </span>
              .
            </span>
          </h2>

          <motion.div style={{ opacity: after, y: afterY }} className="mt-8 flex flex-col items-center gap-7">
            <p className="max-w-2xl text-[clamp(16px,1.5vw,22px)] text-muted-foreground">{s.lead}</p>
            <div className="flex flex-wrap justify-center gap-3">
              <a href={wa} target="_blank" rel="noreferrer" className="rounded-full bg-primary px-7 py-4 font-semibold text-primary-foreground shadow-glow">
                <RollText>{s.cta}</RollText>
              </a>
              <a href="#projetos" className="rounded-full border bg-secondary/70 px-7 py-4 font-semibold backdrop-blur transition hover:bg-secondary">
                <RollText>{s.secondary}</RollText>
              </a>
            </div>
          </motion.div>
        </motion.div>

        <motion.span style={{ opacity: hint }} className="pointer-events-none absolute bottom-8 left-1/2 z-20 -translate-x-1/2 rounded-full bg-black/60 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.14em] backdrop-blur">
          {s.hint} ↓
        </motion.span>
      </div>
    </section>
  );
}
