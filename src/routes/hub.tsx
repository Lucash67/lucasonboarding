import { createFileRoute } from "@tanstack/react-router";
import { MotionConfig, motion } from "motion/react";
import { ArrowUpRight, Github, Instagram, Mail } from "lucide-react";
import type { ReactNode } from "react";

const SITE = "https://lucashportfolio.vercel.app";
const EMAIL = "lucashcampos667@gmail.com";
const GITHUB = "https://github.com/Lucash67";
const INSTAGRAM = "https://instagram.com/lucash.ia";

const TITLE = "Lucas Campos de Matos — Negócios, tecnologia e produtos digitais";
const DESC =
  "Estudante de Negócios da Unifor que transforma problemas reais em produtos digitais funcionando. Cases, sistemas e projetos para clientes.";

export const Route = createFileRoute("/hub")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "profile" },
      { property: "og:url", content: `${SITE}/hub` },
      { property: "og:image", content: `${SITE}/og.jpg` },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: `${SITE}/hub` }],
  }),
  component: Hub,
});

const fade = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
};

function Section({ id, kicker, title, children }: { id: string; kicker: string; title: string; children: ReactNode }) {
  return (
    <section id={id} className="scroll-mt-20 border-t border-border py-16 md:py-24">
      <div className="mx-auto w-full max-w-5xl px-5 md:px-8">
        <motion.p {...fade} className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
          {kicker}
        </motion.p>
        <motion.h2 {...fade} className="mt-3 max-w-3xl font-display text-3xl font-semibold leading-tight tracking-tight md:text-5xl">
          {title}
        </motion.h2>
        <div className="mt-10">{children}</div>
      </div>
    </section>
  );
}

function ExtLink({ href, children, className = "" }: { href: string; children: ReactNode; className?: string }) {
  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noreferrer" : undefined}
      className={`inline-flex items-center gap-1.5 underline-offset-4 hover:underline ${className}`}
    >
      {children}
      <ArrowUpRight size={14} aria-hidden />
    </a>
  );
}

const stats = [
  { n: "1.861", l: "vendas registradas" },
  { n: "2.510", l: "itens vendidos" },
  { n: "91", l: "dias de operação" },
  { n: "20,4", l: "vendas por dia, em média" },
];

const zaivonFeatures = [
  ["Vendas e estoque", "Registro de cada venda, controle de saídas e reposição."],
  ["Recebíveis", "O que foi pago, o que ficou pendente e o que ainda vai entrar."],
  ["Conciliação", "Cruza o que saiu, o que foi pago e o que está em aberto, por dia."],
  ["Prévia antes de gravar", "O fechamento é simulado numa transação com rollback e auditado antes de qualquer gravação real."],
  ["Indicadores", "Painel com volume, ritmo diário e desempenho da operação."],
  ["Segurança dos dados", "Acesso fechado por padrão no banco (RLS), com migração reversível."],
];

const products = [
  {
    name: "Flowin",
    tag: "Em desenvolvimento · com sócio",
    text: "PWA mobile-first de organização pessoal com IA, desenvolvido com Cauã Victor. Em uso no meu próprio celular; ainda em construção, sem lançamento público.",
    stack: "TanStack Start · Supabase",
    href: "",
    cta: "",
  },
  {
    name: "RYVON",
    tag: "Projeto pessoal",
    text: "Painel de evolução física com autenticação, controle de acesso por linha (RLS) e gráficos. Nasceu com a regra de “não reconstruir”: evoluir o que já funciona.",
    stack: "Next.js · TypeScript · Supabase",
    href: "https://github.com/Lucash67/ryvon",
    cta: "Ver o código",
  },
  {
    name: "Ops Hub",
    tag: "Demo com dados fictícios",
    text: "Versão de demonstração do motor de operações que evoluiu do meu primeiro sistema: eventos, regras de validação e múltiplos negócios no mesmo painel.",
    stack: "Next.js · Drizzle · SQLite",
    href: "https://ops-hub-portfolio-demo.vercel.app",
    cta: "Abrir a demo",
  },
];

const clients = [
  { name: "Clarissa Palácio", what: "Landing page · professora de inglês", href: "https://clarissateacher.vercel.app", img: "/covers/clarissa.webp" },
  { name: "Muell Machado", what: "Portfólio · tatuagem realista", href: "https://muell-machado.vercel.app", img: "/covers/muell.webp" },
  { name: "Malu Nutri", what: "Site · nutricionista", href: "https://malu-nutri.vercel.app", img: "/covers/malu-nutri.webp" },
  { name: "Arthur Anadon", what: "Landing page · nutrição", href: "https://arthurnutrilp.vercel.app", img: "/covers/arthur-anadon.webp" },
  { name: "Terus", what: "Site institucional · SaaS de supply chain", href: "https://terus-platform-web.vercel.app", img: "/covers/terus-platform.webp" },
];

function Hub() {
  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-background text-foreground">
        <a
          href="#conteudo"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
        >
          Pular para o conteúdo
        </a>

        <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur">
          <nav aria-label="Principal" className="mx-auto flex max-w-5xl items-center justify-between px-5 py-3.5 md:px-8">
            <a href="#topo" className="font-display text-sm font-semibold tracking-tight">
              Lucas Campos de Matos
            </a>
            <ul className="hidden items-center gap-6 text-sm text-muted-foreground md:flex">
              <li><a className="hover:text-foreground" href="#zaivon">ZAIVON</a></li>
              <li><a className="hover:text-foreground" href="#produtos">Produtos</a></li>
              <li><a className="hover:text-foreground" href="#clientes">Clientes</a></li>
              <li><a className="hover:text-foreground" href="#contato">Contato</a></li>
            </ul>
          </nav>
        </header>

        <main id="conteudo">
          {/* Hero */}
          <section id="topo" className="mx-auto grid w-full max-w-5xl gap-10 px-5 pb-16 pt-12 md:grid-cols-[1fr_280px] md:items-center md:gap-14 md:px-8 md:pb-24 md:pt-20">
            <div>
              <motion.p {...fade} className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
                Bacharelado em Negócios · Unifor · Fortaleza
              </motion.p>
              <motion.h1 {...fade} className="mt-4 font-display text-4xl font-semibold leading-[1.05] tracking-tight md:text-6xl">
                Transformo problemas reais em produtos digitais que funcionam.
              </motion.h1>
              <motion.p {...fade} className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
                Estudo Negócios e programo. Percebo uma oportunidade, testo uma solução simples e a
                construo até funcionar na prática, do primeiro cliente ao sistema que sustenta a operação.
              </motion.p>
              <motion.div {...fade} className="mt-8 flex flex-wrap gap-3 text-sm">
                <a href="#zaivon" className="rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground transition hover:-translate-y-0.5">
                  Ver o case principal
                </a>
                <a href={`mailto:${EMAIL}`} className="rounded-full border border-border px-6 py-3 font-medium transition hover:bg-secondary">
                  Falar comigo
                </a>
                <a href="/Lucas_Campos_de_Matos_Curriculo.pdf" target="_blank" rel="noreferrer" className="rounded-full border border-border px-6 py-3 font-medium transition hover:bg-secondary">
                  Currículo (PDF)
                </a>
              </motion.div>
            </div>
            <motion.div {...fade} className="mx-auto w-52 md:w-full">
              <img
                src="/lucas/foto-hero.webp"
                alt="Retrato de Lucas Campos de Matos"
                width={560}
                height={700}
                className="aspect-[4/5] w-full rounded-2xl border border-border object-cover"
              />
            </motion.div>
          </section>

          {/* ZAIVON */}
          <Section id="zaivon" kicker="Case principal" title="ZAIVON: um sistema criado porque a operação precisou de um.">
            <div className="grid gap-10 md:grid-cols-2">
              <motion.div {...fade} className="space-y-5 text-base leading-relaxed text-muted-foreground">
                <p>
                  <span className="font-semibold text-foreground">O problema.</span> No ambiente de estágio, percebi
                  demanda por lanches e montei uma operação própria de salgados em autoatendimento: deixo a caixa no
                  local, os colegas pegam, pagam por Pix ou em espécie e seguem para o refeitório. Em casos
                  excepcionais, falam comigo pelo WhatsApp, por um QR Code na caixa.
                </p>
                <p>
                  <span className="font-semibold text-foreground">A consequência.</span> O modelo funcionou, e criou um
                  problema novo: conciliar o que saiu, o que foi pago e o que ficou pendente, todos os dias, sem
                  planilha frágil.
                </p>
                <p>
                  <span className="font-semibold text-foreground">A solução.</span> Projetei e desenvolvi sozinho o
                  ZAIVON, em duas gerações: um primeiro sistema (Lucas Business OS) para entender o domínio e a versão
                  atual, em produção com PostgreSQL, que trata o fechamento do dia como uma operação auditável.
                </p>
              </motion.div>

              <motion.dl {...fade} className="grid grid-cols-2 gap-3">
                {stats.map((s) => (
                  <div key={s.l} className="rounded-2xl border border-border bg-card p-5">
                    <dt className="font-display text-4xl font-semibold tracking-tight">{s.n}</dt>
                    <dd className="mt-2 text-xs leading-snug text-muted-foreground">{s.l}</dd>
                  </div>
                ))}
                <p className="col-span-2 mt-1 text-xs text-muted-foreground">
                  Dados do próprio sistema, de 16/07 a 24/11/2026. Números de contagem, sem valores financeiros.
                </p>
              </motion.dl>
            </div>

            <ul className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
              {zaivonFeatures.map(([t, d]) => (
                <li key={t} className="bg-background p-6">
                  <h3 className="font-display text-base font-semibold">{t}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{d}</p>
                </li>
              ))}
            </ul>

            <motion.div {...fade} className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm">
              <p className="text-muted-foreground">
                <span className="text-foreground">Stack:</span> Next.js 14 · TypeScript · Drizzle · PostgreSQL (Supabase) · Vercel
              </p>
              <p className="text-muted-foreground">
                Código privado: dados reais de operação. Posso demonstrar ao vivo.
              </p>
            </motion.div>
          </Section>

          {/* Produtos */}
          <Section id="produtos" kicker="Outros produtos" title="Construo para aprender: cada projeto resolve uma pergunta diferente.">
            <div className="grid gap-4 md:grid-cols-3">
              {products.map((p) => (
                <motion.article key={p.name} {...fade} className="flex flex-col rounded-2xl border border-border bg-card p-6">
                  <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">{p.tag}</p>
                  <h3 className="mt-3 font-display text-2xl font-semibold">{p.name}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.text}</p>
                  <p className="mt-auto pt-6 text-xs text-muted-foreground">{p.stack}</p>
                  {p.href ? (
                    <ExtLink href={p.href} className="mt-3 text-sm font-medium">{p.cta}</ExtLink>
                  ) : (
                    <p className="mt-3 text-sm text-muted-foreground">Repositório privado</p>
                  )}
                </motion.article>
              ))}
            </div>
          </Section>

          {/* Clientes */}
          <Section id="clientes" kicker="Freelance" title="Sites e vídeos para clientes reais, do primeiro contato à entrega.">
            <motion.p {...fade} className="max-w-2xl text-base leading-relaxed text-muted-foreground">
              Trabalho de forma independente com landing pages, sites e motion design para profissionais autônomos e
              empresas. Cuido do briefing, do design, do desenvolvimento e do ar.
            </motion.p>
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {clients.map((c) => (
                <motion.a
                  key={c.name}
                  {...fade}
                  href={c.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group overflow-hidden rounded-2xl border border-border bg-card transition hover:-translate-y-1"
                >
                  <img src={c.img} alt={`Prévia do site de ${c.name}`} loading="lazy" className="aspect-[16/10] w-full object-cover object-top" />
                  <div className="flex items-start justify-between gap-3 p-5">
                    <div>
                      <h3 className="font-display text-base font-semibold">{c.name}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">{c.what}</p>
                    </div>
                    <ArrowUpRight size={16} className="mt-1 shrink-0 text-muted-foreground transition group-hover:text-foreground" aria-hidden />
                  </div>
                </motion.a>
              ))}
              <motion.a
                {...fade}
                href="/"
                className="flex flex-col justify-center rounded-2xl border border-dashed border-border p-6 transition hover:bg-secondary"
              >
                <h3 className="font-display text-base font-semibold">Portfólio completo de sites e vídeos</h3>
                <p className="mt-2 text-sm text-muted-foreground">Landing pages, sites e motion design, com mais projetos e o reel de vídeo.</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium">
                  Ver tudo <ArrowUpRight size={14} aria-hidden />
                </span>
              </motion.a>
            </div>
          </Section>

          {/* Hoje + Hub */}
          <Section id="hub" kicker="Por que o Hub" title="Já construo sozinho. Quero aprender a validar antes de construir.">
            <div className="grid gap-10 md:grid-cols-2">
              <motion.div {...fade} className="space-y-4 text-base leading-relaxed text-muted-foreground">
                <p>
                  Aprendi errando: no fechamento do caixa, ao refazer a arquitetura de um sistema, ao negociar com
                  cliente. Isso me deu execução e mostrou o que falta: método e convivência com quem já validou
                  negócios de verdade.
                </p>
                <p>
                  Empreendo desde os 14 anos: brigadeiros no primeiro ano do ensino médio, salgados no segundo e no
                  terceiro, dropshipping, infoprodutos e, hoje, vibe coding para vender sites e vídeos.
                </p>
                <p>
                  Quero colaborar em projetos que não são meus, aprender com quem está alguns passos à frente e
                  contribuir com o que já faço bem: entender um problema de negócio e transformá-lo rápido em
                  protótipo, sistema ou material visual.
                </p>
              </motion.div>
              <motion.div {...fade} className="rounded-2xl border border-border bg-card p-6">
                <h3 className="font-display text-base font-semibold">Hoje</h3>
                <ul className="mt-4 space-y-4 text-sm leading-relaxed text-muted-foreground">
                  <li>
                    <span className="text-foreground">Estágio em e-commerce (desde jul/2026).</span> Cadastro e revisão
                    de produtos, rotinas de operação e relatórios de desempenho de campanhas.
                  </li>
                  <li>
                    <span className="text-foreground">Produtos digitais na Terus (desde abr/2026).</span> Apoio o
                    desenvolvimento front-end dos produtos de uma startup de inteligência para supply chain, além do
                    site institucional e do vídeo de apresentação em motion design. Acompanho o back-end e as
                    automações para aprender e praticar.
                  </li>
                  <li>
                    <span className="text-foreground">Converto, agência.</span> Colaboro com ideação, conteúdo e
                    estratégia; atuação integral prevista para 2027.
                  </li>
                  <li>
                    <span className="text-foreground">Formação.</span> Negócios na Unifor (3º semestre) e Marketing
                    Digital (Infinity School).
                  </li>
                </ul>
              </motion.div>
            </div>
          </Section>

          {/* Contato */}
          <Section id="contato" kicker="Contato" title="Vamos conversar?">
            <motion.div {...fade} className="flex flex-wrap gap-3 text-sm">
              <a href={`mailto:${EMAIL}`} className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground transition hover:-translate-y-0.5">
                <Mail size={16} aria-hidden /> {EMAIL}
              </a>
              <a href={GITHUB} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 font-medium transition hover:bg-secondary">
                <Github size={16} aria-hidden /> GitHub
              </a>
              <a href={INSTAGRAM} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 font-medium transition hover:bg-secondary">
                <Instagram size={16} aria-hidden /> @lucash.ia
              </a>
            </motion.div>
          </Section>
        </main>

        <footer className="border-t border-border py-8">
          <p className="mx-auto max-w-5xl px-5 text-xs text-muted-foreground md:px-8">
            © 2026 Lucas Campos de Matos · Fortaleza, CE
          </p>
        </footer>
      </div>
    </MotionConfig>
  );
}
