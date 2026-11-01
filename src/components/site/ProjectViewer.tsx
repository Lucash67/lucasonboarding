import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { Monitor, Smartphone, X, ArrowRight, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { projects, WHATSAPP, type Project } from "@/lib/projects";

export function ProjectViewer({
  project,
  onClose,
  onNavigate,
}: {
  project: Project | null;
  onClose: () => void;
  onNavigate: (p: Project) => void;
}) {
  const [device, setDevice] = useState<"desktop" | "mobile">("desktop");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(false);
  }, [project?.slug, device]);

  useEffect(() => {
    if (!project) return;
    const idx = projects.findIndex((p) => p.slug === project.slug);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNavigate(projects[(idx + 1) % projects.length]!);
      if (e.key === "ArrowLeft") onNavigate(projects[(idx - 1 + projects.length) % projects.length]!);
    };
    document.documentElement.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [project, onClose, onNavigate]);

  const idx = project ? projects.findIndex((p) => p.slug === project.slug) : 0;

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
                  {project.niche} · {project.category}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1 rounded-full border bg-card p-1">
              {(["desktop", "mobile"] as const).map((d) => (
                <button
                  key={d}
                  onClick={() => setDevice(d)}
                  aria-label={d === "desktop" ? "Ver no computador" : "Ver no celular"}
                  className={`rounded-full p-2 transition ${device === d ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
                >
                  {d === "desktop" ? <Monitor size={16} /> : <Smartphone size={16} />}
                </button>
              ))}
            </div>
            <button onClick={onClose} aria-label="Fechar" className="rounded-full border p-2.5 transition hover:rotate-90 hover:bg-secondary">
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
                    <p className="relative font-mono text-xs text-muted-foreground">carregando o site ao vivo…</p>
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
                ["O problema", project.problem],
                ["A solução", project.solution],
                ["O resultado", project.result],
              ].map(([t, d], i) => (
                <motion.div key={t + project.slug} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 + i * 0.1 }}>
                  <p className={`font-mono text-[11px] uppercase tracking-widest ${i === 2 ? "text-primary" : "text-muted-foreground"}`}>{t}</p>
                  <p className={`mt-2 ${i === 2 ? "font-display text-2xl font-semibold" : "text-sm text-foreground/85"}`}>{d}</p>
                </motion.div>
              ))}
              <div className="flex flex-wrap gap-2">
                {project.tags.map((t) => (
                  <span key={t} className="rounded-full border px-3 py-1 text-xs text-muted-foreground">{t}</span>
                ))}
              </div>
              <a href={WHATSAPP} target="_blank" rel="noreferrer" className="group mt-auto flex items-center justify-between rounded-2xl bg-primary p-5 font-display text-lg font-semibold text-primary-foreground transition hover:shadow-glow">
                Quero um assim
                <ArrowRight className="transition group-hover:translate-x-1" />
              </a>
              <div className="flex gap-2">
                <button onClick={() => onNavigate(projects[(idx - 1 + projects.length) % projects.length]!)} className="flex flex-1 items-center justify-center gap-1 rounded-xl border py-3 text-sm hover:bg-secondary">
                  <ChevronLeft size={16} /> Anterior
                </button>
                <button onClick={() => onNavigate(projects[(idx + 1) % projects.length]!)} className="flex flex-1 items-center justify-center gap-1 rounded-xl border py-3 text-sm hover:bg-secondary">
                  Próximo <ChevronRight size={16} />
                </button>
              </div>
            </aside>
          </div>
          <div className="flex gap-2 border-t p-3 lg:hidden">
            <button onClick={() => onNavigate(projects[(idx - 1 + projects.length) % projects.length]!)} aria-label="Anterior" className="rounded-xl border px-4"><ChevronLeft size={16} /></button>
            <a href={WHATSAPP} target="_blank" rel="noreferrer" className="flex-1 rounded-xl bg-primary py-3 text-center font-semibold text-primary-foreground">Quero um assim</a>
            <button onClick={() => onNavigate(projects[(idx + 1) % projects.length]!)} aria-label="Próximo" className="rounded-xl border px-4"><ChevronRight size={16} /></button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
