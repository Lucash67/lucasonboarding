import { ArrowUpRight } from "lucide-react";
import { useI18n } from "@/components/site/i18n";
import { Reveal } from "@/components/site/motion";
import { bySlug, type Project } from "@/lib/projects";

const ORDER = ["g-steel", "clarissa", "muell", "shari"];

/**
 * Quarta seção (ref: "Projetos", da Profitize): cada projeto num contêiner grande,
 * com o site num quadro de notebook. Os contêineres empilham ao rolar (sticky).
 */
export function Showcase({ onOpen }: { onOpen: (p: Project) => void }) {
  const { t } = useI18n();
  const s = t.s.showcase;
  return (
    <section id="projetos" className="relative z-[16] -mt-[100svh] overflow-clip rounded-t-[32px] bg-background px-[var(--pad)] pb-[calc(100svh+3rem)] pt-28 shadow-[0_-40px_80px_-20px_rgb(0_0_0/0.7)]">
      <div className="mx-auto max-w-[1280px]">
        <div className="grid items-end gap-8 md:grid-cols-[1.3fr_1fr]">
          <div>
            <Reveal>
              <span className="inline-block rounded-full border bg-secondary/50 px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.14em]">{s.pill}</span>
            </Reveal>
            <h2 className="mt-5 max-w-3xl text-[clamp(34px,4.6vw,72px)] font-normal leading-[1.02] tracking-[-0.035em]">
              <Reveal delay={0.05} y={24}>{s.h2}</Reveal>
            </h2>
          </div>
          <Reveal delay={0.1}>
            <p className="max-w-md text-[clamp(15px,1.3vw,19px)] text-muted-foreground md:ml-auto">{s.lead}</p>
          </Reveal>
        </div>

        <div className="mt-12">
          {ORDER.map((slug, i) => (
            <ProjectCard key={slug} p={bySlug(slug)} i={i} onOpen={onOpen} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ p, i, onOpen }: { p: Project; i: number; onOpen: (p: Project) => void }) {
  const { t } = useI18n();
  const s = t.s.showcase;
  const loc = t.projects[p.slug];
  const live = !!p.url;
  const open = () => live && onOpen(p);

  return (
    <article className="sticky mb-6 last:mb-0" style={{ top: `${88 + i * 14}px`, zIndex: i + 1 }}>
      <div className="rounded-[28px] border bg-[#0e0d0c] p-4 shadow-card md:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary font-semibold text-primary-foreground">{p.name[0]}</span>
            <p className="min-w-0 text-[15px] md:text-base">
              <span className="font-semibold">{p.name}</span>
              <span className="ml-2 text-muted-foreground">{loc?.result ?? p.result}</span>
            </p>
          </div>
          {live ? (
            <div className="flex items-center gap-3">
              {p.slug === "shari" && <span className="rounded-full border px-3 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">{s.personal}</span>}
              <button onClick={open} className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground/90 transition hover:text-foreground">
                {s.live} <ArrowUpRight size={15} />
              </button>
            </div>
          ) : (
            <span className="rounded-full border px-3 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">{s.concept}</span>
          )}
        </div>

        <div className="mt-5 flex justify-center">
          <button
            onClick={open}
            disabled={!live}
            aria-label={`${p.name} — ${live ? s.live : s.soon}`}
            className={`group relative w-full max-w-[860px] ${live ? "cursor-pointer" : "cursor-default"}`}
          >
            {/* tela do notebook */}
            <div className="overflow-hidden rounded-t-2xl border-[7px] border-b-0 border-[#1d1b19] bg-black">
              <div className="aspect-[16/10] overflow-hidden">
                <img
                  src={p.cover}
                  alt={p.name}
                  loading="lazy"
                  className="h-full w-full object-cover object-top transition-transform duration-[1.6s] ease-out group-hover:scale-[1.04]"
                />
              </div>
            </div>
            {/* base */}
            <div className="mx-auto h-3 w-[104%] -translate-x-[2%] rounded-b-[14px] bg-gradient-to-b from-[#2a2724] to-[#161412]" />
            {live && (
              <span className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground opacity-0 shadow-glow transition group-hover:opacity-100">
                {s.live}
              </span>
            )}
          </button>
        </div>

        <div className="mt-5 flex flex-wrap items-center justify-between gap-3 text-sm text-muted-foreground">
          <span className="font-mono text-[11px] uppercase tracking-[0.14em]">{String(i + 1).padStart(2, "0")} · {loc?.niche ?? p.niche}</span>
          <div className="flex flex-wrap gap-2">
            {(loc?.tags ?? p.tags).map((tag) => (
              <span key={tag} className="rounded-full border px-3 py-1 text-xs">{tag}</span>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}
