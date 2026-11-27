import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, MotionConfig, motion, useScroll } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { type Project } from "@/lib/projects";
import { ProjectViewer } from "@/components/site/ProjectViewer";
import { RollText, ScrollProgress, SmoothScroll } from "@/components/site/motion";
import { useI18n } from "@/components/site/i18n";
import { Loader } from "@/components/site/loader";
import { Nav } from "@/components/site/nav";
import { Hero } from "@/components/site/hero";
import { Statement } from "@/components/site/statement";
import { Film } from "@/components/site/film";
import { Showcase } from "@/components/site/showcase";
import { MotionReel } from "@/components/site/motion-reel";
import { FinalCta } from "@/components/site/cta";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Lucas Henrique — Sites e vídeos que prendem a atenção" },
      { name: "description", content: "Landing pages, sites e motion design que transformam visita em orçamento. Veja os projetos ao vivo." },
      { property: "og:title", content: "Lucas Henrique — Sites e vídeos que prendem a atenção" },
      { property: "og:description", content: "Landing pages, sites e motion design que transformam visita em orçamento. Veja os projetos ao vivo." },
      { property: "og:type", content: "website" },
      { property: "og:image", content: "https://lucashportfolio.vercel.app/og.jpg" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: "https://lucashportfolio.vercel.app/og.jpg" },
    ],
    links: [{ rel: "canonical", href: "https://lucashportfolio.vercel.app/" }],
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
        <noscript>
          <style>{".lh-loader{display:none!important}"}</style>
        </noscript>
        <Loader onDone={onLoaded} />
        <a href="#projetos" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[300] focus:rounded-full focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground">
          {t.skip}
        </a>
        <SmoothScroll />
        <ScrollProgress />
        <Nav />
        <Hero key={ready ? "ready" : "loading"} />
        <Statement />
        <Film />
        <Showcase onOpen={setOpen} />
        <MotionReel />
        <FinalCta />
        <FloatingWA />
        <ProjectViewer project={open} onClose={close} onNavigate={setOpen} />
      </main>
    </MotionConfig>
  );
}

function FloatingWA() {
  const { t, wa } = useI18n();
  const { scrollY } = useScroll();
  const [past, setPast] = useState(false);
  const [atCta, setAtCta] = useState(false);
  useEffect(() => scrollY.on("change", (v) => setPast(v > 900)), [scrollY]);
  useEffect(() => {
    const seen = new Set<string>();
    const mk = (id: string, threshold: number) => {
      const n = document.getElementById(id);
      if (!n) return null;
      const io = new IntersectionObserver(
        ([e]) => {
          if (e?.isIntersecting) seen.add(id);
          else seen.delete(id);
          setAtCta(seen.size > 0);
        },
        { threshold },
      );
      io.observe(n);
      return io;
    };
    // o filme (#servicos) é muito alto: basta tocar a tela; o CTA final precisa de 35% visível
    const ios = [mk("contato", 0.2), mk("servicos", 0), mk("motion", 0)];
    return () => ios.forEach((o) => o?.disconnect());
  }, []);
  const show = past && !atCta;
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
          className="fixed bottom-5 right-5 z-40 flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-glow"
        >
          <RollText>{t.floatCta}</RollText> <ArrowUpRight size={14} />
        </motion.a>
      )}
    </AnimatePresence>
  );
}
