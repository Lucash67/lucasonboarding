import { createFileRoute } from "@tanstack/react-router";
import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowRight, ArrowUpRight, Check, MessageCircle, Plus, X } from "lucide-react";
import { projects, WHATSAPP, type Project } from "@/lib/projects";
import { ProjectViewer } from "@/components/site/ProjectViewer";
import { Counter, Magnetic, Marquee, Reveal, ScrollProgress, ScrollText, SmoothScroll, SplitWords, VelocityMarquee } from "@/components/site/motion";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Lucas Henrique — Sites que convertem visita em orçamento fechado" },
      { name: "description", content: "Não é só um site bonito. Landing pages e sites institucionais que resolvem problemas de conversão, para qualquer nicho. Veja os projetos ao vivo." },
      { property: "og:title", content: "Lucas Henrique — Sites que convertem visita em orçamento fechado" },
      { property: "og:description", content: "Landing pages e sites que resolvem problemas de conversão, para qualquer nicho." },
      { property: "og:type", content: "website" },
      { property: "og:image", content: "https://lucasonboarding.vercel.app/covers/arthur-anadon.png" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const webProjects = projects.filter((p) => p.category !== "Sistema");
const systems = projects.filter((p) => p.category === "Sistema");

function Index() {
  const [open, setOpen] = useState<Project | null>(null);
  const close = useCallback(() => setOpen(null), []);
  return (
    <main className="relative overflow-x-clip bg-grain">
      <SmoothScroll />
      <ScrollProgress />
      <Nav />
      <Hero onOpen={setOpen} />
      <PainBand />
      <Manifesto />
      <Solves />
      <Work onOpen={setOpen} />
      <Numbers />
      <Compare />
      <Process />
      <Systems onOpen={setOpen} />
      <FinalCTA />
      <Footer />
      <FloatingWA />
      <ProjectViewer project={open} onClose={close} onNavigate={setOpen} />
    </main>
  );
}

function Nav() {
  const { scrollY } = useScroll();
  const [solid, setSolid] = useState(false);
  useEffect(() => scrollY.on("change", (v) => setSolid(v > 40)), [scrollY]);
  return (
    <motion.header
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed inset-x-0 top-0 z-50 transition-all ${solid ? "border-b bg-background/70 backdrop-blur-xl" : ""}`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
        <a href="#inicio" className="font-display text-xl font-bold">
          lucas<span className="text-primary">.</span>
        </a>
        <nav className="hidden gap-8 text-sm text-muted-foreground md:flex">
          {[["Problemas", "#resolvo"], ["Projetos", "#projetos"], ["Processo", "#processo"], ["Sistemas", "#sistemas"]].map(([l, h]) => (
            <a key={h} href={h} className="transition hover:text-foreground">{l}</a>
          ))}
        </nav>
        <a href={WHATSAPP} target="_blank" rel="noreferrer" className="flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition hover:shadow-glow">
          Pedir orçamento <ArrowUpRight size={15} />
        </a>
      </div>
    </motion.header>
  );
}

const rotating = ["vender", "converter", "fechar", "lotar a agenda"];

function Hero({ onOpen }: { onOpen: (p: Project) => void }) {
  const ref = useRef<HTMLElement>(null);
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % rotating.length), 2200);
    return () => clearInterval(t);
  }, []);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yText = useTransform(scrollYProgress, [0, 1], [0, -160]);
  const opText = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const rot = useTransform(scrollYProgress, [0, 1], [28, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.95, 1.1]);

  return (
    <section
      id="inicio"
      ref={ref}
      className="relative min-h-[100svh] pt-32"
      onMouseMove={(e) => {
        e.currentTarget.style.setProperty("--mx", `${e.clientX}px`);
        e.currentTarget.style.setProperty("--my", `${e.clientY}px`);
      }}
    >
      <div className="pointer-events-none absolute inset-0 bg-grid" />
      <div className="pointer-events-none absolute inset-0 bg-glow" />
      <motion.div style={{ y: yText, opacity: opText }} className="relative mx-auto max-w-7xl px-5">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="mb-8 inline-flex items-center gap-2 rounded-full border bg-card/60 px-4 py-1.5 font-mono text-xs uppercase tracking-widest text-muted-foreground backdrop-blur">
          <span className="h-2 w-2 rounded-full bg-primary animate-pulse-dot" /> Agenda aberta · qualquer nicho
        </motion.div>
        <h1 className="font-display text-[13vw] font-bold leading-[0.88] md:text-[8.5vw] xl:text-[8rem]">
          <SplitWords text="Seu site não precisa ser bonito." className="block text-muted-foreground/60" />
          <span className="block">
            <SplitWords text="Precisa" delay={0.4} />
            <span className="relative grid">
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
        <div className="mt-10 grid items-end gap-8 md:grid-cols-[1.2fr_1fr]">
          <Reveal delay={0.7}>
            <p className="max-w-xl text-lg text-foreground/80 md:text-xl">
              Eu não entrego "um site". Eu resolvo o que faz sua visita ir embora sem chamar: oferta confusa, CTA escondido, lead frio. <strong className="text-foreground">Você recebe uma máquina de orçamento.</strong>
            </p>
          </Reveal>
          <Reveal delay={0.85} className="flex flex-wrap gap-3 md:justify-end">
            <Magnetic>
              <a href={WHATSAPP} target="_blank" rel="noreferrer" className="group flex items-center gap-3 rounded-full bg-primary px-7 py-4 font-semibold text-primary-foreground shadow-glow">
                Quero meu orçamento <ArrowRight className="transition group-hover:translate-x-1" size={18} />
              </a>
            </Magnetic>
            <a href="#projetos" className="rounded-full border px-7 py-4 font-semibold transition hover:bg-secondary">
              Ver projetos ao vivo
            </a>
          </Reveal>
        </div>
      </motion.div>

      <div className="relative mt-20 [perspective:1400px]">
        <motion.div style={{ rotateX: rot, scale }} className="space-y-5 origin-top">
          <Marquee duration={50} className="gap-5">
            {webProjects.map((p) => (
              <CoverThumb key={p.slug} p={p} onOpen={onOpen} />
            ))}
          </Marquee>
          <Marquee duration={60} reverse className="gap-5">
            {[...projects].reverse().map((p) => (
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
  return (
    <button onClick={() => onOpen(p)} className="group relative h-48 w-80 shrink-0 overflow-hidden rounded-2xl border bg-card md:h-60 md:w-[26rem]">
      <CoverImg p={p} alt={`Capa ${p.name}`} className="h-full w-full object-cover object-top transition duration-700 group-hover:scale-110" />
      <div className="absolute inset-0 flex items-end justify-between bg-gradient-to-t from-background/90 via-transparent p-4 opacity-0 transition group-hover:opacity-100">
        <span className="font-display font-semibold">{p.name}</span>
        <span className="rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">Ver ao vivo</span>
      </div>
    </button>
  );
}

function PainBand() {
  const items = ["Visita sem clique", "Lead frio", "Orçamento perdido", "Oferta confusa", "CTA escondido", "Curioso pedindo preço"];
  return (
    <section className="relative -rotate-2 border-y bg-primary py-5 text-primary-foreground">
      <VelocityMarquee>
        {items.map((t) => (
          <span key={t} className="flex items-center gap-6 px-6 font-display text-3xl font-bold uppercase md:text-5xl">
            {t} <X className="opacity-60" size={36} strokeWidth={3} />
          </span>
        ))}
      </VelocityMarquee>
    </section>
  );
}

function Manifesto() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-32 md:py-48">
      <p className="mb-10 font-mono text-xs uppercase tracking-widest text-primary">— A verdade que ninguém te conta</p>
      <ScrollText
        className="font-display text-4xl font-semibold leading-[1.05] md:text-7xl"
        text="Tráfego você já tem. O que falta é uma página que *explica* a oferta em 5 segundos, *filtra* quem não serve e *empurra* quem serve para um único próximo passo. É isso que eu construo."
      />
    </section>
  );
}

const solves = [
  ["Ninguém entende o que você vende", "Reescrevo a oferta até caber numa frase. Quem chega entende em 5 segundos — ou sai sem gastar seu tempo."],
  ["Visita entra e sai sem chamar", "Um CTA, repetido no ritmo certo, em cada dobra. Zero becos sem saída."],
  ["Lead chega frio, só pedindo preço", "A página faz a venda antes do WhatsApp. Você conversa com quem já quer fechar."],
  ["Seu site parece amador", "Visual premium e motion que comunicam valor — e justificam o seu preço."],
  ["No celular, quebra tudo", "Pensado mobile-first e testado em tela real antes de ir ao ar."],
  ["Você não tem texto pronto", "Copy é comigo. Você traz o negócio, eu traduzo em argumento de venda."],
];

function Solves() {
  return (
    <section id="resolvo" className="mx-auto max-w-7xl px-5 py-24">
      <div className="grid gap-16 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <p className="font-mono text-xs uppercase tracking-widest text-primary">01 · O que eu resolvo</p>
          <h2 className="mt-4 font-display text-5xl font-bold leading-[0.95] md:text-7xl">
            <SplitWords text="Não vendo sites." />
            <span className="block font-serif font-normal italic text-primary"><SplitWords text="Resolvo conversão." delay={0.2} /></span>
          </h2>
          <Reveal delay={0.3}>
            <p className="mt-6 max-w-md text-lg text-muted-foreground">Site bonito que não converte é despesa. Cada bloco que eu entrego existe para resolver um destes problemas.</p>
          </Reveal>
        </div>
        <div className="space-y-4">
          {solves.map(([t, d], i) => (
            <motion.div
              key={t}
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
                  <h3 className="font-display text-2xl font-semibold line-through decoration-destructive/70 decoration-2 transition group-hover:no-underline md:text-3xl">{t}</h3>
                  <p className="mt-3 flex gap-2 text-foreground/80"><Check className="mt-1 shrink-0 text-primary" size={18} /> {d}</p>
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
            <p className="font-mono text-xs uppercase tracking-widest text-primary">02 · Projetos ao vivo</p>
            <h2 className="mt-3 font-display text-5xl font-bold leading-[0.95] md:text-7xl">
              Clique. <span className="font-serif font-normal italic text-primary">Navegue.</span> Sem sair daqui.
            </h2>
          </div>
          <p className="hidden max-w-xs text-sm text-muted-foreground md:block">Cada projeto abre ao vivo aqui dentro — no computador ou no celular — com o problema que ele resolveu.</p>
        </div>
        <motion.div ref={track} style={{ x }} className="flex gap-6 pl-5 md:pl-[max(1.25rem,calc((100vw-80rem)/2+1.25rem))]">
          {webProjects.map((p, i) => (
            <WorkCard key={p.slug} p={p} i={i} onOpen={onOpen} />
          ))}
          <a href={WHATSAPP} target="_blank" rel="noreferrer" className="group flex w-[80vw] shrink-0 flex-col justify-between rounded-3xl bg-primary p-8 text-primary-foreground md:w-[28rem]">
            <span className="font-mono text-xs uppercase tracking-widest">Próximo projeto</span>
            <span className="font-display text-5xl font-bold leading-none">O seu pode ser o próximo.</span>
            <span className="flex items-center gap-2 font-semibold">Chamar no WhatsApp <ArrowRight className="transition group-hover:translate-x-2" /></span>
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
  return (
    <button onClick={() => onOpen(p)} className="group relative flex w-[80vw] shrink-0 flex-col overflow-hidden rounded-3xl border bg-card text-left transition hover:border-primary/60 md:w-[34rem]">
      <div className="relative h-[34vh] overflow-hidden md:h-[40vh]">
        <CoverImg p={p} alt={`Projeto ${p.name}`} className="h-full w-full object-cover object-top transition-[object-position,transform] duration-[3s] ease-out group-hover:scale-105 group-hover:object-bottom" />
        <span className="absolute left-4 top-4 rounded-full bg-background/80 px-3 py-1 font-mono text-[11px] uppercase tracking-widest backdrop-blur">{p.niche}</span>
        <span className="absolute right-4 top-4 flex h-12 w-12 scale-0 items-center justify-center rounded-full bg-primary text-primary-foreground transition duration-500 group-hover:scale-100">
          <Plus />
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-3 p-6">
        <div className="flex items-baseline justify-between">
          <h3 className="font-display text-3xl font-semibold">{p.name}</h3>
          <span className="font-mono text-xs text-muted-foreground">{String(i + 1).padStart(2, "0")}</span>
        </div>
        <p className="text-sm text-muted-foreground"><span className="text-destructive">Problema:</span> {p.problem}</p>
        <p className="mt-auto flex items-center gap-2 font-semibold text-primary">→ {p.result}</p>
      </div>
    </button>
  );
}

function Numbers() {
  const niches = ["Nutrição", "Imobiliário", "Agro", "Educação", "SaaS", "Clínicas", "Consórcio", "Advocacia", "Estética", "Restaurantes", "Fitness", "Consultoria", "E-commerce", "Arquitetura"];
  return (
    <section className="py-28">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-px overflow-hidden rounded-3xl border bg-border px-0 md:grid-cols-4">
        {[
          [10, "", "projetos no ar"],
          [3, "", "etapas até publicar"],
          [100, "%", "pensado pro celular"],
          [1, "", "próximo passo por página"],
        ].map(([n, s, l]) => (
          <div key={l as string} className="bg-background p-8 md:p-10">
            <p className="font-display text-6xl font-bold text-primary md:text-7xl"><Counter to={n as number} suffix={s as string} /></p>
            <p className="mt-2 text-sm text-muted-foreground">{l}</p>
          </div>
        ))}
      </div>
      <div className="mt-20 space-y-4">
        <p className="text-center font-mono text-xs uppercase tracking-widest text-muted-foreground">Qualquer público. Qualquer nicho.</p>
        <Marquee duration={35} className="gap-4">
          {niches.map((n) => (
            <span key={n} className="whitespace-nowrap font-display text-5xl font-bold text-stroke md:text-7xl">{n} ✦</span>
          ))}
        </Marquee>
        <Marquee duration={45} reverse className="gap-4">
          {niches.slice().reverse().map((n) => (
            <span key={n} className="whitespace-nowrap font-display text-5xl font-bold md:text-7xl">{n} <span className="text-primary">✦</span></span>
          ))}
        </Marquee>
      </div>
    </section>
  );
}

function Compare() {
  const rows = [
    ["Template genérico", "Estrutura pensada pra sua oferta"],
    ["Você escreve o texto", "Copy de venda feita por mim"],
    ["Vários botões, nenhum foco", "Um próximo passo, sempre visível"],
    ["Bonito no PC, quebrado no celular", "Testado em celular real"],
    ["Visitante pede preço e some", "Lead chega querendo fechar"],
  ];
  return (
    <section className="mx-auto max-w-6xl px-5 py-24">
      <Reveal>
        <h2 className="text-center font-display text-5xl font-bold md:text-7xl">
          Site comum <span className="text-muted-foreground">vs</span> <span className="font-serif font-normal italic text-primary">site que vende</span>
        </h2>
      </Reveal>
      <div className="mt-14 overflow-hidden rounded-3xl border">
        {rows.map(([a, b], i) => (
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
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 60%"] });
  const h = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const steps = [
    ["Diagnóstico", "Uma conversa. Entendo a oferta, o público e o que a pessoa precisa fazer no site. Você não precisa chegar com nada pronto."],
    ["Construção", "Copy, visual, CTA e motion. Cada bloco existe para converter ou filtrar — nada é enfeite."],
    ["No ar", "Página publicada, testada no celular e pronta para receber tráfego real e transformar em orçamento."],
  ];
  return (
    <section id="processo" className="mx-auto max-w-5xl px-5 py-28">
      <p className="font-mono text-xs uppercase tracking-widest text-primary">03 · Como funciona</p>
      <h2 className="mt-3 font-display text-5xl font-bold md:text-7xl"><SplitWords text="Três passos. Zero burocracia." /></h2>
      <div ref={ref} className="relative mt-16 pl-10 md:pl-16">
        <div className="absolute left-3 top-0 h-full w-px bg-border md:left-5" />
        <motion.div style={{ height: h }} className="absolute left-3 top-0 w-px bg-primary shadow-glow md:left-5" />
        {steps.map(([t, d], i) => (
          <Reveal key={t} className="relative pb-20 last:pb-0">
            <span className="absolute -left-10 top-2 flex h-6 w-6 -translate-x-[0.5px] items-center justify-center rounded-full border-2 border-primary bg-background md:-left-16 md:translate-x-2" />
            <p className="font-mono text-sm text-primary">0{i + 1}</p>
            <h3 className="mt-2 font-display text-4xl font-semibold md:text-6xl">{t}</h3>
            <p className="mt-4 max-w-xl text-lg text-muted-foreground">{d}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Systems({ onOpen }: { onOpen: (p: Project) => void }) {
  return (
    <section id="sistemas" className="mx-auto max-w-7xl px-5 py-24">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-primary">Também construo</p>
          <h2 className="mt-3 font-display text-5xl font-bold md:text-7xl">Sistemas <span className="font-serif font-normal italic text-primary">&</span> apps</h2>
        </div>
        <p className="max-w-sm text-muted-foreground">Mesma lógica: o que importa na frente e o próximo passo óbvio. Demos com login de teste na própria tela.</p>
      </div>
      <div className="mt-14 grid gap-6 md:grid-cols-3">
        {systems.map((p, i) => (
          <motion.button
            key={p.slug}
            onClick={() => onOpen(p)}
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.12, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -10, rotate: i === 1 ? 0 : i === 0 ? -1.5 : 1.5 }}
            className="group overflow-hidden rounded-3xl border bg-card text-left"
          >
            <div className="aspect-[4/3] overflow-hidden">
              <img src={p.cover} alt={`Sistema ${p.name}`} loading="lazy" className="h-full w-full object-cover object-top transition duration-700 group-hover:scale-110" />
            </div>
            <div className="p-6">
              <p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">{p.niche}</p>
              <h3 className="mt-1 flex items-center justify-between font-display text-2xl font-semibold">{p.name} <ArrowUpRight className="text-primary transition group-hover:rotate-45" /></h3>
              <p className="mt-2 text-sm text-muted-foreground">{p.solution}</p>
            </div>
          </motion.button>
        ))}
      </div>
    </section>
  );
}

function FinalCTA() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const scale = useTransform(scrollYProgress, [0, 1], [0.85, 1]);
  const radius = useTransform(scrollYProgress, [0, 1], [80, 24]);
  return (
    <section id="contato" ref={ref} className="px-3 py-16 md:px-5">
      <motion.div style={{ scale, borderRadius: radius }} className="relative mx-auto max-w-7xl overflow-hidden bg-primary px-6 py-24 text-primary-foreground md:px-16 md:py-36">
        <svg viewBox="0 0 200 200" className="absolute -right-10 -top-10 h-56 w-56 animate-spin-slow opacity-30 md:h-80 md:w-80">
          <defs><path id="c" d="M100,100 m-75,0 a75,75 0 1,1 150,0 a75,75 0 1,1 -150,0" /></defs>
          <text className="fill-current font-mono text-[13px] uppercase tracking-[0.3em]"><textPath href="#c">seu site é o próximo · seu site é o próximo ·</textPath></text>
        </svg>
        <p className="font-mono text-xs uppercase tracking-widest">Próximo passo</p>
        <h2 className="mt-4 max-w-4xl font-display text-6xl font-bold leading-[0.9] md:text-[7.5rem]">
          <SplitWords text="Pare de perder orçamento." />
        </h2>
        <p className="mt-8 max-w-xl text-lg opacity-80">Me mande no WhatsApp: o que você vende, pra quem, e o que a pessoa deveria fazer no seu site. Eu respondo com o formato e o caminho.</p>
        <div className="mt-12">
          <Magnetic>
            <a href={WHATSAPP} target="_blank" rel="noreferrer" className="group flex items-center gap-4 rounded-full bg-background px-9 py-6 font-display text-xl font-semibold text-foreground transition hover:gap-6">
              <MessageCircle /> Chamar no WhatsApp <ArrowRight />
            </a>
          </Magnetic>
        </div>
      </motion.div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-5 py-10 text-sm text-muted-foreground">
      <p className="font-display text-lg font-bold text-foreground">lucas<span className="text-primary">.</span></p>
      <p>Landing pages, sites e sistemas que convertem — para qualquer nicho.</p>
      <p>© {new Date().getFullYear()} Lucas Henrique</p>
    </footer>
  );
}

function FloatingWA() {
  const { scrollY } = useScroll();
  const [show, setShow] = useState(false);
  useEffect(() => scrollY.on("change", (v) => setShow(v > 700)), [scrollY]);
  return (
    <AnimatePresence>
      {show && (
        <motion.a
          href={WHATSAPP}
          target="_blank"
          rel="noreferrer"
          aria-label="Pedir orçamento no WhatsApp"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          className="fixed bottom-5 right-5 z-40 flex items-center gap-2 rounded-full bg-primary px-5 py-4 font-semibold text-primary-foreground shadow-glow animate-pulse-dot"
        >
          <MessageCircle size={20} /> <span className="hidden sm:inline">Orçamento</span>
        </motion.a>
      )}
    </AnimatePresence>
  );
}
