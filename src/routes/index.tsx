import { createFileRoute } from "@tanstack/react-router";
import { motion, useScroll, useTransform, AnimatePresence, MotionConfig } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowRight, ArrowUpRight, Check, MessageCircle, X } from "lucide-react";
import { webProjects, type Project } from "@/lib/projects";
import { ProjectViewer } from "@/components/site/ProjectViewer";
import { Counter, Magnetic, Marquee, Reveal, RollText, ScrollProgress, ScrollText, SmoothScroll, SplitWords, VelocityMarquee } from "@/components/site/motion";
import { Loader } from "@/components/site/loader";
import { PortraitStage, RevealStage } from "@/components/site/reveal";
import { ThemeSwitch } from "@/components/site/theme";
import { LangToggle, useI18n } from "@/components/site/i18n";
import { copy } from "@/lib/i18n";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Lucas Henrique — Sites que convertem visita em orçamento fechado" },
      { name: "description", content: "Landing pages e sites institucionais que resolvem conversão. Copy, visual e um próximo passo — veja os projetos ao vivo." },
      { property: "og:title", content: "Lucas Henrique — Sites que convertem visita em orçamento fechado" },
      { property: "og:description", content: "Landing pages e sites institucionais que resolvem conversão. Veja os projetos ao vivo." },
      { property: "og:type", content: "website" },
      { property: "og:image", content: "https://lucashportfolio.vercel.app/og.jpg" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: "https://lucashportfolio.vercel.app/og.jpg" },
    ],
  }),
  component: Index,
});

function Index() {
  const [open, setOpen] = useState<Project | null>(null);
  const close = useCallback(() => setOpen(null), []);
  const [ready, setReady] = useState(false);
  const onLoaded = useCallback(() => setReady(true), []);
  const { t } = useI18n();
  return (
    <MotionConfig reducedMotion="user">
    <main className="relative overflow-x-clip bg-grain">
      <noscript><style>{".lh-loader{display:none!important}"}</style></noscript>
      <Loader onDone={onLoaded} />
      <a href="#projetos" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[300] focus:rounded-full focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground">{t.skip}</a>
      <SmoothScroll />
      <ScrollProgress />
      <Nav />
      <Hero key={ready ? "ready" : "loading"} onOpen={setOpen} />
      <PainBand />
      <Manifesto />
      <Solves />
      <Work onOpen={setOpen} />
      <Numbers />
      <Compare />
      <Process />
      <Faq />
      <FinalCTA />
      <Footer />
      <FloatingWA />
      <ThemeSwitch />
      <ProjectViewer project={open} onClose={close} onNavigate={setOpen} />
    </main>
    </MotionConfig>
  );
}

function Nav() {
  const { t, wa } = useI18n();
  const { scrollY } = useScroll();
  const [solid, setSolid] = useState(false);
  useEffect(() => scrollY.on("change", (v) => setSolid(v > 40)), [scrollY]);
  const links: [string, string][] = [
    [t.nav.problems, "#resolvo"],
    [t.nav.work, "#projetos"],
    [t.nav.process, "#processo"],
    [t.nav.faq, "#faq"],
  ];
  return (
    <motion.header
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed inset-x-0 top-0 z-50 transition-all ${solid ? "border-b bg-background/70 backdrop-blur-xl" : ""}`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-5 py-4">
        <a href="#inicio" className="flex items-center gap-2.5 font-display text-xl font-bold">
          <img src="/lucas/foto-pb.webp" alt="" width={32} height={32} className="h-8 w-8 rounded-full border object-cover object-[50%_28%]" />
          <span>
            lucas<span className="text-primary">.</span>
          </span>
        </a>
        <nav className="hidden gap-8 text-sm text-muted-foreground md:flex">
          {links.map(([l, h]) => (
            <a key={h} href={h} className="transition hover:text-foreground">{l}</a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <LangToggle />
          <a href={wa} target="_blank" rel="noreferrer" className="flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground transition hover:shadow-glow sm:gap-2 sm:px-4 sm:text-sm">
            <RollText>{t.nav.cta}</RollText> <ArrowUpRight size={15} />
          </a>
        </div>
      </div>
    </motion.header>
  );
}

function Hero({ onOpen }: { onOpen: (p: Project) => void }) {
  const { t, wa, lang } = useI18n();
  const ref = useRef<HTMLElement>(null);
  const [i, setI] = useState(0);
  const rotating = t.hero.rotating;
  useEffect(() => {
    setI(0);
    const len = copy[lang].hero.rotating.length;
    const timer = setInterval(() => setI((v) => (v + 1) % len), 2200);
    return () => clearInterval(timer);
  }, [lang]);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yText = useTransform(scrollYProgress, [0, 1], [0, -160]);
  const opText = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const rot = useTransform(scrollYProgress, [0, 1], [28, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.95, 1.1]);

  // Moldura inclina em 3D seguindo o cursor (ref: hero do Império Web / Mars Designer)
  const tiltRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const sec = ref.current;
    const el = tiltRef.current;
    if (!sec || !el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || window.matchMedia("(pointer: coarse)").matches) return;
    const move = (e: PointerEvent) => {
      const b = sec.getBoundingClientRect();
      const x = (e.clientX - b.left) / b.width;
      const y = (e.clientY - b.top) / b.height;
      el.style.transform = `perspective(1000px) rotateX(${((0.5 - y) * 7).toFixed(2)}deg) rotateY(${((x - 0.5) * 11).toFixed(2)}deg)`;
    };
    const leave = () => {
      el.style.transform = "";
    };
    sec.addEventListener("pointermove", move);
    sec.addEventListener("pointerleave", leave);
    return () => {
      sec.removeEventListener("pointermove", move);
      sec.removeEventListener("pointerleave", leave);
    };
  }, []);

  return (
    <section id="inicio" ref={ref} className="relative min-h-[100svh] pt-28">
      <div className="pointer-events-none absolute inset-0 bg-grid" />
      <div className="pointer-events-none absolute inset-0 bg-glow" />
      <motion.div style={{ y: yText, opacity: opText }} className="relative mx-auto flex max-w-7xl flex-col items-center px-5 text-center">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="order-1 mb-6 inline-flex items-center gap-2 rounded-full border bg-card/60 px-4 py-1.5 font-mono text-xs uppercase tracking-widest text-muted-foreground backdrop-blur">
          <span className="h-2 w-2 rounded-full bg-primary" /> {t.hero.chip}
        </motion.div>
        <h1 className="relative z-10 order-3 -mt-[24vw] font-display text-[11.5vw] font-bold leading-[0.88] md:-mt-44 md:text-[6.2vw] xl:text-[6rem]">
          <SplitWords text={t.hero.line1} className="block text-foreground/70" />
          <span className="mt-1 flex flex-wrap items-baseline justify-center gap-x-[0.22em]">
            <SplitWords text={t.hero.line2} delay={0.4} />
            <span className="relative inline-grid">
              {rotating.map((w, k) => (
                <motion.span
                  key={w}
                  aria-hidden={k !== i}
                  initial={false}
                  animate={k === i ? { y: 0, opacity: 1 } : { y: k < i ? -40 : 40, opacity: 0 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="col-start-1 row-start-1 block font-serif font-normal italic leading-[0.95] text-primary"
                >
                  {w}.
                </motion.span>
              ))}
            </span>
          </span>
        </h1>
        <div className="order-4 mt-8 flex flex-col items-center gap-8">
          <Reveal delay={0.7}>
            <p className="mx-auto max-w-xl text-lg text-foreground/80 md:text-xl">
              {t.hero.lead} <strong className="text-foreground">{t.hero.leadStrong}</strong>
            </p>
          </Reveal>
          <Reveal delay={0.85} className="flex flex-wrap justify-center gap-3">
            <Magnetic>
              <a href={wa} target="_blank" rel="noreferrer" className="group flex items-center gap-3 rounded-full bg-primary px-7 py-4 font-semibold text-primary-foreground shadow-glow">
                <RollText>{t.hero.cta}</RollText> <ArrowRight className="transition group-hover:translate-x-1" size={18} />
              </a>
            </Magnetic>
            <a href="#projetos" className="rounded-full border px-7 py-4 font-semibold transition hover:bg-secondary">
              {t.hero.secondary}
            </a>
          </Reveal>
        </div>
        <Reveal delay={0.5} className="order-2 w-[min(86vw,440px)]">
          <div ref={tiltRef} className="will-change-transform [transition:transform_0.12s_ease-out]">
            <PortraitStage />
          </div>
        </Reveal>
      </motion.div>

      <div className="relative mx-auto mt-16 max-w-7xl px-5">
        <RevealStage />
      </div>

      <div className="relative mt-16 [perspective:1400px]">
        <motion.div style={{ rotateX: rot, scale }} className="origin-top">
          <Marquee duration={50} className="gap-5">
            {webProjects.map((p) => (
              <CoverThumb key={p.slug} p={p} onOpen={onOpen} />
            ))}
          </Marquee>
        </motion.div>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40" style={{ background: "var(--gradient-fade-b)" }} />
      </div>
    </section>
  );
}

function CoverImg({ p, alt, className }: { p: Project; alt: string; className?: string }) {
  return (
    <picture>
      {p.coverMobile ? <source media="(max-width: 767px)" srcSet={p.coverMobile} /> : null}
      <img src={p.cover} alt={alt} loading="lazy" className={className} />
    </picture>
  );
}

function CoverThumb({ p, onOpen }: { p: Project; onOpen: (p: Project) => void }) {
  const { t } = useI18n();
  return (
    <button onClick={() => onOpen(p)} className="group relative h-48 w-80 shrink-0 overflow-hidden rounded-2xl border bg-card md:h-60 md:w-[26rem]">
      <CoverImg p={p} alt={`Capa ${p.name}`} className="h-full w-full object-cover object-top transition duration-700 group-hover:scale-110" />
      <div className="absolute inset-0 flex items-end justify-between bg-gradient-to-t from-background/90 via-transparent p-4 opacity-0 transition group-hover:opacity-100">
        <span className="font-display font-semibold">{p.name}</span>
        <span className="rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">{t.live}</span>
      </div>
    </button>
  );
}

function PainBand() {
  const { t } = useI18n();
  return (
    <section className="relative -rotate-2 border-y bg-primary py-5 text-primary-foreground">
      <VelocityMarquee>
        {t.pain.map((item) => (
          <span key={item} className="flex items-center gap-6 px-6 font-display text-3xl font-bold uppercase md:text-5xl">
            {item} <X className="opacity-60" size={36} strokeWidth={3} />
          </span>
        ))}
      </VelocityMarquee>
    </section>
  );
}

function Manifesto() {
  const { t } = useI18n();
  return (
    <section className="mx-auto max-w-6xl px-5 py-32 md:py-48">
      <p className="mb-10 font-mono text-xs uppercase tracking-widest text-primary">{t.manifestoKicker}</p>
      <ScrollText key={t.manifesto} className="font-display text-4xl font-semibold leading-[1.05] md:text-7xl" text={t.manifesto} />
    </section>
  );
}

function Solves() {
  const { t } = useI18n();
  return (
    <section id="resolvo" className="mx-auto max-w-7xl px-5 py-24">
      <div className="grid gap-16 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <p className="font-mono text-xs uppercase tracking-widest text-primary">{t.solvesKicker}</p>
          <h2 className="mt-4 font-display text-5xl font-bold leading-[0.95] md:text-7xl">
            <SplitWords text={t.solvesH2a} />
            <span className="block font-serif font-normal italic text-primary"><SplitWords text={t.solvesH2b} delay={0.2} /></span>
          </h2>
          <Reveal delay={0.3}>
            <p className="mt-6 max-w-md text-lg text-muted-foreground">{t.solvesLead}</p>
          </Reveal>
        </div>
        <div className="space-y-4">
          {t.solves.map(([title, detail], i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, x: 60, rotate: 2 }}
              whileInView={{ opacity: 1, x: 0, rotate: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ x: -8 }}
              className="group relative overflow-hidden rounded-3xl border bg-card p-7 transition-colors hover:border-primary/60"
            >
              <div className="absolute inset-0 -translate-x-full bg-primary/5 transition duration-700 group-hover:translate-x-0" />
              <div className="relative flex gap-6">
                <span className="font-mono text-sm text-primary">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="font-display text-2xl font-semibold line-through decoration-destructive/70 decoration-2 transition group-hover:no-underline md:text-3xl">{title}</h3>
                  <p className="mt-3 flex gap-2 text-foreground/80"><Check className="mt-1 shrink-0 text-primary" size={18} /> {detail}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Work({ onOpen }: { onOpen: (p: Project) => void }) {
  const { t, wa } = useI18n();
  const ref = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [dist, setDist] = useState(0);
  useEffect(() => {
    const calc = () => setDist(Math.max(0, (track.current?.scrollWidth ?? 0) - window.innerWidth + 40));
    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, []);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], [0, -dist]);
  const bar = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="projetos" ref={ref} style={{ height: `calc(100vh + ${dist}px)` }} className="relative">
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        <div className="mx-auto mb-10 flex w-full max-w-7xl items-end justify-between gap-6 px-5">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-primary">{t.workKicker}</p>
            <h2 className="mt-3 font-display text-5xl font-bold leading-[0.95] md:text-7xl">
              {t.workH2a} <span className="font-serif font-normal italic text-primary">{t.workH2b}</span> {t.workH2c}
            </h2>
          </div>
          <p className="hidden max-w-xs text-sm text-muted-foreground md:block">{t.workLead}</p>
        </div>
        <motion.div ref={track} style={{ x }} className="flex gap-6 pl-5 md:pl-[max(1.25rem,calc((100vw-80rem)/2+1.25rem))]">
          {webProjects.map((p, i) => (
            <WorkCard key={p.slug} p={p} i={i} onOpen={onOpen} />
          ))}
          <a href={wa} target="_blank" rel="noreferrer" className="group flex w-[80vw] shrink-0 flex-col justify-between rounded-3xl bg-primary p-8 text-primary-foreground md:w-[28rem]">
            <span className="font-mono text-xs uppercase tracking-widest">{t.nextKicker}</span>
            <span className="font-display text-5xl font-bold leading-none">{t.nextTitle}</span>
            <span className="flex items-center gap-2 font-semibold">{t.nextCta} <ArrowRight className="transition group-hover:translate-x-2" /></span>
          </a>
        </motion.div>
        <div className="mx-auto mt-10 h-px w-full max-w-7xl bg-border px-5">
          <motion.div style={{ width: bar }} className="h-px bg-primary" />
        </div>
      </div>
    </section>
  );
}

function WorkCard({ p, i, onOpen }: { p: Project; i: number; onOpen: (p: Project) => void }) {
  const { t } = useI18n();
  const loc = t.projects[p.slug];
  return (
    <button onClick={() => onOpen(p)} className="group relative flex w-[80vw] shrink-0 flex-col overflow-hidden rounded-3xl border bg-card text-left transition hover:border-primary/60 md:w-[34rem]">
      <div className="relative h-[34vh] overflow-hidden md:h-[40vh]">
        <CoverImg p={p} alt={`Projeto ${p.name}`} className="h-full w-full object-cover object-top transition-[object-position,transform] duration-[3s] ease-out group-hover:scale-105 group-hover:object-bottom" />
        <span className="absolute left-4 top-4 rounded-full bg-background/80 px-3 py-1 font-mono text-[11px] uppercase tracking-widest backdrop-blur">{loc?.niche ?? p.niche}</span>
        <span className="absolute right-4 top-4 rounded-full bg-primary px-3 py-1 text-[11px] font-semibold text-primary-foreground opacity-0 transition group-hover:opacity-100">{t.live}</span>
      </div>
      <div className="flex flex-1 flex-col gap-3 p-6">
        <div className="flex items-baseline justify-between">
          <h3 className="font-display text-3xl font-semibold">{p.name}</h3>
          <span className="font-mono text-xs text-muted-foreground">{String(i + 1).padStart(2, "0")}</span>
        </div>
        <p className="text-sm text-muted-foreground"><span className="text-destructive">{t.problemLabel}</span> {loc?.problem ?? p.problem}</p>
        <p className="mt-auto flex items-center gap-2 font-semibold text-primary">→ {loc?.result ?? p.result}</p>
      </div>
    </button>
  );
}

function Numbers() {
  const { t } = useI18n();
  return (
    <section className="py-28">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-px overflow-hidden rounded-3xl border bg-border px-0 md:grid-cols-4">
        {t.numbers.map(([n, s, l], i) => (
          <div key={l} className="bg-background p-8 md:p-10">
            <p className="font-display text-6xl font-bold text-primary md:text-7xl">
              <Counter to={i === 0 ? webProjects.length : n} suffix={s} />
            </p>
            <p className="mt-2 text-sm text-muted-foreground">{l}</p>
          </div>
        ))}
      </div>
      <div className="mt-20 space-y-4">
        <p className="text-center font-mono text-xs uppercase tracking-widest text-muted-foreground">{t.nichesKicker}</p>
        <Marquee duration={35} className="gap-4">
          {t.niches.map((n) => (
            <span key={n} className="whitespace-nowrap font-display text-5xl font-bold text-stroke md:text-7xl">{n} ✦</span>
          ))}
        </Marquee>
        <Marquee duration={45} reverse className="gap-4">
          {t.niches.slice().reverse().map((n) => (
            <span key={n} className="whitespace-nowrap font-display text-5xl font-bold md:text-7xl">{n} <span className="text-primary">✦</span></span>
          ))}
        </Marquee>
      </div>
    </section>
  );
}

function Compare() {
  const { t } = useI18n();
  return (
    <section className="mx-auto max-w-6xl px-5 py-24">
      <Reveal>
        <h2 className="text-center font-display text-5xl font-bold md:text-7xl">
          {t.compareH2a} <span className="text-muted-foreground">{t.compareVs}</span>{" "}
          <span className="font-serif font-normal italic text-primary">{t.compareH2b}</span>
        </h2>
      </Reveal>
      <div className="mt-14 overflow-hidden rounded-3xl border">
        {t.compare.map(([a, b], i) => (
          <motion.div
            key={a}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="grid grid-cols-2 border-b last:border-b-0"
          >
            <p className="flex items-center gap-3 p-5 text-muted-foreground line-through decoration-destructive/60 md:p-7 md:text-lg"><X className="shrink-0 text-destructive" size={18} /> {a}</p>
            <p className="flex items-center gap-3 border-l bg-primary/5 p-5 font-semibold md:p-7 md:text-lg"><Check className="shrink-0 text-primary" size={18} /> {b}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function Process() {
  const { t } = useI18n();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 60%"] });
  const h = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  return (
    <section id="processo" className="mx-auto max-w-5xl px-5 py-28">
      <p className="font-mono text-xs uppercase tracking-widest text-primary">{t.processKicker}</p>
      <h2 className="mt-3 font-display text-5xl font-bold md:text-7xl"><SplitWords text={t.processH2} /></h2>
      <div ref={ref} className="relative mt-16 pl-10 md:pl-16">
        <div className="absolute left-3 top-0 h-full w-px bg-border md:left-5" />
        <motion.div style={{ height: h }} className="absolute left-3 top-0 w-px bg-primary shadow-glow md:left-5" />
        {t.process.map(([title, detail], i) => (
          <Reveal key={title} className="relative pb-20 last:pb-0">
            <span className="absolute -left-10 top-2 flex h-6 w-6 -translate-x-[0.5px] items-center justify-center rounded-full border-2 border-primary bg-background md:-left-16 md:translate-x-2" />
            <p className="font-mono text-sm text-primary">0{i + 1}</p>
            <h3 className="mt-2 font-display text-4xl font-semibold md:text-6xl">{title}</h3>
            <p className="mt-4 max-w-xl text-lg text-muted-foreground">{detail}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Faq() {
  const { t } = useI18n();
  return (
    <section id="faq" className="mx-auto max-w-4xl px-5 py-24">
      <p className="font-mono text-xs uppercase tracking-widest text-primary">{t.faqKicker}</p>
      <h2 className="mt-3 font-display text-5xl font-bold md:text-7xl">{t.faqH2}</h2>
      <Accordion type="single" collapsible className="mt-12 rounded-3xl border bg-card px-5 md:px-8">
        {t.faq.map(([q, a], i) => (
          <AccordionItem key={q} value={`faq-${i}`} className="border-border/60">
            <AccordionTrigger className="py-6 font-display text-lg font-semibold hover:no-underline md:text-xl">{q}</AccordionTrigger>
            <AccordionContent className="pb-6 text-base leading-relaxed text-muted-foreground">{a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}

function FinalCTA() {
  const { t, wa } = useI18n();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const scale = useTransform(scrollYProgress, [0, 1], [0.85, 1]);
  const radius = useTransform(scrollYProgress, [0, 1], [80, 24]);
  return (
    <section id="contato" ref={ref} className="px-3 py-16 md:px-5">
      <motion.div style={{ scale, borderRadius: radius }} className="relative mx-auto max-w-7xl overflow-hidden bg-primary px-6 py-24 text-primary-foreground md:px-16 md:py-36">
        <svg viewBox="0 0 200 200" className="absolute -right-10 -top-10 h-56 w-56 animate-spin-slow opacity-30 md:h-80 md:w-80">
          <defs><path id="c" d="M100,100 m-75,0 a75,75 0 1,1 150,0 a75,75 0 1,1 -150,0" /></defs>
          <text className="fill-current font-mono text-[13px] uppercase tracking-[0.3em]"><textPath href="#c">{t.nextTitle} · {t.nextTitle} · </textPath></text>
        </svg>
        <div className="flex items-center gap-4">
          <img src="/lucas/foto-pb.webp" alt="Lucas Henrique" width={64} height={64} loading="lazy" className="h-16 w-16 rounded-full border-2 border-primary-foreground/30 object-cover object-[50%_28%]" />
          <p className="font-mono text-xs uppercase tracking-widest">{t.finalKicker}</p>
        </div>
        <h2 className="mt-4 max-w-4xl font-display text-6xl font-bold leading-[0.9] md:text-[7.5rem]">
          <SplitWords text={t.finalH2} />
        </h2>
        <p className="mt-8 max-w-xl text-lg opacity-80">{t.finalLead}</p>
        <div className="mt-12">
          <Magnetic>
            <a href={wa} target="_blank" rel="noreferrer" className="group flex items-center gap-4 rounded-full bg-background px-9 py-6 font-display text-xl font-semibold text-foreground transition hover:gap-6">
              <MessageCircle /> <RollText>{t.finalCta}</RollText> <ArrowRight />
            </a>
          </Magnetic>
        </div>
      </motion.div>
    </section>
  );
}

function Footer() {
  const { t } = useI18n();
  return (
    <footer className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-5 py-10 text-sm text-muted-foreground">
      <p className="font-display text-lg font-bold text-foreground">lucas<span className="text-primary">.</span></p>
      <p>{t.footerTag}</p>
      <p>© {new Date().getFullYear()} Lucas Henrique</p>
    </footer>
  );
}

function FloatingWA() {
  const { t, wa } = useI18n();
  const { scrollY } = useScroll();
  const [show, setShow] = useState(false);
  useEffect(() => scrollY.on("change", (v) => setShow(v > 700)), [scrollY]);
  return (
    <AnimatePresence>
      {show && (
        <motion.a
          href={wa}
          target="_blank"
          rel="noreferrer"
          aria-label={t.floatAria}
          initial={{ y: 24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 24, opacity: 0 }}
          className="fixed bottom-5 right-5 z-40 flex items-center gap-3 rounded-full border bg-secondary/90 py-2 pl-3 pr-2 backdrop-blur-xl"
        >
          <span className="font-display text-sm font-bold">lucas<span className="text-primary">.</span></span>
          <span className="flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground">
            {t.floatCta} <ArrowUpRight size={14} />
          </span>
        </motion.a>
      )}
    </AnimatePresence>
  );
}
