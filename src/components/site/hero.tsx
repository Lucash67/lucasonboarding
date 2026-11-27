import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useI18n } from "@/components/site/i18n";
import { RollText } from "@/components/site/motion";
import { useTrailMask } from "@/components/site/trail";

const FADE = "linear-gradient(180deg, #000 70%, transparent 100%)";

/**
 * Hero no molde do Mídia Kit do Mars (nome gigante em marquee atrás da foto,
 * frase pequena embaixo à esquerda, dois botões à direita), na paleta Profitize.
 * A foto é colorida e fica assim; só onde o cursor passa ela vira preto e branco (rastro em CSS).
 */
export function Hero() {
  const { t, wa } = useI18n();
  const h = t.s.hero;
  const sec = useRef<HTMLElement>(null);
  const bw = useRef<HTMLDivElement>(null);
  useTrailMask(sec, bw, { cx: 0.5, cy: 0.6, rx: 0.07, ry: 0.28, radius: [150, 90], auto: false });

  // Saída da hero: o conteúdo recua e apaga devagar enquanto a parede da próxima seção sobe por baixo.
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: sec, offset: ["start start", "end start"] });
  const exitScale = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : 0.88]);
  const exitOpacity = useTransform(scrollYProgress, [0, 0.85], [1, reduce ? 1 : 0.15]);
  const exitY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 120]);

  return (
    <section id="inicio" ref={sec} className="relative isolate z-20 flex min-h-[100svh] flex-col overflow-hidden bg-background">
      <motion.div style={{ scale: exitScale, opacity: exitOpacity, y: exitY }} className="relative flex min-h-[100svh] flex-1 flex-col">
      <div className="pointer-events-none absolute inset-0 -z-10" style={{ background: "radial-gradient(55% 52% at 50% 68%, rgb(196 85 58 / 0.16), transparent 72%)" }} />

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="relative z-20 flex items-center justify-between gap-4 px-[var(--pad)] pt-24 font-mono text-[10px] uppercase tracking-[0.14em] text-foreground/85 sm:text-xs"
      >
        <span>{h.tag}</span>
        <span className="flex shrink-0 items-center gap-2">
          <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-accent" />
          {h.open}
        </span>
      </motion.div>

      {/* Nome gigante atrás da foto: cheio, fantasma, cheio, fantasma… */}
      <div aria-hidden className="pointer-events-none absolute left-0 top-[48%] z-0 w-full -translate-y-1/2 select-none">
        <div className="flex w-max animate-marquee whitespace-nowrap font-display font-extrabold leading-[0.8]" style={{ fontSize: "clamp(150px,24vw,380px)", ["--dur" as string]: "38s" }}>
          {Array.from({ length: 8 }).map((_, i) => (
            <span key={i} className={`pr-[0.22em] ${i % 2 ? "text-ghost" : "text-fade"}`}>
              {h.word}
            </span>
          ))}
        </div>
      </div>

      {/* Foto deitada (16:9), recortada, com fade na base */}
      <div className="pointer-events-none absolute inset-x-0 -bottom-[6svh] z-10 flex justify-center">
        <div className="relative" style={{ height: "clamp(640px, 130svh, 1500px)", aspectRatio: "16 / 9", maskImage: FADE, WebkitMaskImage: FADE }}>
          <motion.img
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 1, ease: [0.22, 1, 0.36, 1] }}
            src="/lucas/foto-hero.webp"
            alt="Lucas Henrique"
            width={2574}
            height={1448}
            fetchPriority="high"
            draggable={false}
            className="absolute inset-0 h-full w-full object-contain"
          />
          <div ref={bw} className="absolute inset-0" aria-hidden>
            <img src="/lucas/foto-hero-pb.webp" alt="" width={2574} height={1448} draggable={false} className="h-full w-full object-contain" />
          </div>
        </div>
      </div>

      <div className="relative z-20 mt-auto flex flex-col gap-6 px-[var(--pad)] pb-8 md:flex-row md:items-end md:justify-between md:pb-12">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="max-w-[24ch] text-[clamp(22px,2.3vw,36px)] leading-[1.12] tracking-[-0.02em] text-muted-foreground md:max-w-[26ch]"
        >
          {h.before}
          <strong className="font-medium text-foreground">{h.strong}</strong>
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.65, duration: 0.8 }} className="flex flex-wrap gap-3">
          <a href="#projetos" className="rounded-full border border-foreground/25 bg-background/40 px-6 py-3.5 text-sm font-medium backdrop-blur transition hover:bg-foreground/10">
            <RollText>{h.seeProjects}</RollText>
          </a>
          <a href={wa} target="_blank" rel="noreferrer" className="rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground transition hover:-translate-y-0.5">
            <RollText>{h.quote}</RollText>
          </a>
        </motion.div>
      </div>
      </motion.div>
    </section>
  );
}
