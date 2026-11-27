import { motion, useScroll } from "motion/react";
import { useEffect, useState } from "react";
import { LangToggle, useI18n } from "@/components/site/i18n";
import { RollText } from "@/components/site/motion";

/** Menu fixo em 3 colunas, como o do Mídia Kit: [links] logo [links]. */
export function Nav() {
  const { t, wa } = useI18n();
  const n = t.s.nav;
  const { scrollY } = useScroll();
  const [solid, setSolid] = useState(false);
  useEffect(() => scrollY.on("change", (v) => setSolid(v > 40)), [scrollY]);

  const link = "transition hover:text-foreground";
  return (
    <motion.header
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed inset-x-0 top-0 z-50 border-b transition-colors ${solid ? "border-border bg-background/70 backdrop-blur-xl" : "border-transparent"}`}
    >
      <div className="mx-auto flex h-[68px] max-w-[1700px] items-center justify-between px-[var(--pad)] md:grid md:grid-cols-[1fr_auto_1fr]">
        <nav className="hidden items-center gap-8 font-mono text-xs uppercase tracking-[0.14em] text-foreground/75 md:flex">
          <a href="#servicos" className={link}>{n.services}</a>
          <a href="#projetos" className={link}>{n.projects}</a>
        </nav>

        <a href="#inicio" aria-label="Lucas Henrique" className="flex items-center gap-2.5">
          <img src="/lucas/avatar.webp" alt="" width={34} height={34} className="h-[34px] w-[34px] rounded-full border border-foreground/30 object-cover" />
          <span className="font-display text-lg font-semibold md:hidden">lucas</span>
        </a>

        <div className="flex items-center justify-end gap-3 md:gap-8">
          <nav className="hidden items-center gap-8 font-mono text-xs uppercase tracking-[0.14em] text-foreground/75 md:flex">
            <a href="#motion" className={link}>{n.motion}</a>
            <a href="#contato" className={link}>{n.contact}</a>
          </nav>
          <LangToggle />
          <a href={wa} target="_blank" rel="noreferrer" className="hidden rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition hover:-translate-y-0.5 sm:inline-block md:hidden xl:inline-block">
            <RollText>{n.cta}</RollText>
          </a>
        </div>
      </div>
    </motion.header>
  );
}
