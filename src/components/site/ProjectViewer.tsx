import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { Monitor, Smartphone, X, ArrowRight, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { webProjects, type Project } from "@/lib/projects";
import { useI18n } from "@/components/site/i18n";

export function ProjectViewer({
  project,
  onClose,
  onNavigate,
}: {
  project: Project | null;
  onClose: () => void;
  onNavigate: (p: Project) => void;
}) {
  const { t, wa } = useI18n();
  const [device, setDevice] = useState<"desktop" | "mobile">("desktop");
  const [loaded, setLoaded] = useState(false);
  const loc = project ? t.projects[project.slug] : undefined;

  useEffect(() => {
    setLoaded(false);
  }, [project?.slug, device]);

  useEffect(() => {
    if (!project) return;
    const idx = webProjects.findIndex((p) => p.slug === project.slug);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNavigate(webProjects[(idx + 1) % webProjects.length]!);
      if (e.key === "ArrowLeft") onNavigate(webProjects[(idx - 1 + webProjects.length) % webProjects.length]!);
    };
    document.documentElement.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [project, onClose, onNavigate]);

  const idx = project ? webProjects.findIndex((p) => p.slug === project.slug) : 0;
  const prev = webProjects[(idx - 1 + webProjects.length) % webProjects.length]!;
  const next = webProjects[(idx + 1) % webProjects.length]!;

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col bg-background/95 backdrop-blur-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          data-lenis-prevent
        >
          <div className="flex items-center justify-between gap-3 border-b px-4 py-3 md:px-6">
            <div className="flex min-w-0 items-center gap-3">
              <span className="font-mono text-xs text-primary">{String(idx + 1).padStart(2, "0")}</span>
              <div className="min-w-0">
                <p className="truncate font-display text-lg font-semibold">{project.name}</p>
                <p className="truncate font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
                  {loc?.niche ?? project.niche}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1 rounded-full border bg-card p-1">
              {(["desktop", "mobile"] as const).map((d) => (
                <button
                  key={d}
                  onClick={() => setDevice(d)}
                  aria-label={d === "desktop" ? t.viewer.desktop : t.viewer.mobile}
                  className={`rounded-full p-2 transition ${device === d ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
                >
                  {d === "desktop" ? <Monitor size={16} /> : <Smartphone size={16} />}
                </button>
              ))}
            </div>
            <button onClick={onClose} aria-label={t.viewer.close} className="rounded-full border p-2.5 transition hover:rotate-90 hover:bg-secondary">
              <X size={18} />
            </button>
          </div>

          <div className="grid min-h-0 flex-1 lg:grid-cols-[1fr_340px]">
            <div className="relative flex min-h-0 items-center justify-center overflow-hidden bg-muted/40 p-3 md:p-6">
              <motion.div
                key={project.slug + device}
                initial={{ opacity: 0, scale: 0.96, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className={`relative h-full overflow-hidden border bg-card shadow-card ${device === "mobile" ? "aspect-[9/19] max-h-full w-auto rounded-[2.2rem] border-[6px] border-secondary" : "w-full rounded-xl"}`}
              >
                {!loaded && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                    <img src={device === "mobile" && project.coverMobile ? project.coverMobile : project.cover} alt="" className="absolute inset-0 h-full w-full object-cover object-top opacity-30 blur-sm" />
                    <Loader2 className="relative animate-spin text-primary" />
                    <p className="relative font-mono text-xs text-muted-foreground">{t.viewer.loading}</p>
                  </div>
                )}
                <iframe
                  src={project.url}
                  title={project.name}
                  onLoad={() => setLoaded(true)}
                  className="relative h-full w-full bg-background"
                />
              </motion.div>
            </div>

            <aside className="hidden flex-col gap-6 overflow-y-auto border-l p-6 lg:flex">
              {[
                [t.viewer.problem, loc?.problem ?? project.problem],
                [t.viewer.solution, loc?.solution ?? project.solution],
                [t.viewer.result, loc?.result ?? project.result],
              ].map(([title, detail], i) => (
                <motion.div key={title + project.slug} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 + i * 0.1 }}>
                  <p className={`font-mono text-[11px] uppercase tracking-widest ${i === 2 ? "text-primary" : "text-muted-foreground"}`}>{title}</p>
                  <p className={`mt-2 ${i === 2 ? "font-display text-2xl font-semibold" : "text-sm text-foreground/85"}`}>{detail}</p>
                </motion.div>
              ))}
              <div className="flex flex-wrap gap-2">
                {(loc?.tags ?? project.tags).map((tag) => (
                  <span key={tag} className="rounded-full border px-3 py-1 text-xs text-muted-foreground">{tag}</span>
                ))}
              </div>
              <a href={wa} target="_blank" rel="noreferrer" className="group mt-auto flex items-center justify-between rounded-2xl bg-primary p-5 font-display text-lg font-semibold text-primary-foreground transition hover:shadow-glow">
                {t.viewer.want}
                <ArrowRight className="transition group-hover:translate-x-1" />
              </a>
              <div className="flex gap-2">
                <button onClick={() => onNavigate(prev)} className="flex flex-1 items-center justify-center gap-1 rounded-xl border py-3 text-sm hover:bg-secondary">
                  <ChevronLeft size={16} /> {t.viewer.prev}
                </button>
                <button onClick={() => onNavigate(next)} className="flex flex-1 items-center justify-center gap-1 rounded-xl border py-3 text-sm hover:bg-secondary">
                  {t.viewer.next} <ChevronRight size={16} />
                </button>
              </div>
            </aside>
          </div>
          <div className="flex gap-2 border-t p-3 lg:hidden">
            <button onClick={() => onNavigate(prev)} aria-label={t.viewer.prev} className="rounded-xl border px-4"><ChevronLeft size={16} /></button>
            <a href={wa} target="_blank" rel="noreferrer" className="flex-1 rounded-xl bg-primary py-3 text-center font-semibold text-primary-foreground">{t.viewer.want}</a>
            <button onClick={() => onNavigate(next)} aria-label={t.viewer.next} className="rounded-xl border px-4"><ChevronRight size={16} /></button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
