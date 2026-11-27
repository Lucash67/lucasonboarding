import { useI18n } from "@/components/site/i18n";
import { Reveal, RollText } from "@/components/site/motion";

/**
 * CTA final: estrutura do Mars ("E aí, vai me contratar?": título gigante em degradê,
 * parágrafo, botão pílula e rodapé) com a copy no tom da Profitize
 * ("Vamos conversar? → O resto eu resolvo."), em primeira pessoa do singular.
 * Seção simples, quase estática: só uma entrada suave ao aparecer.
 */
export function FinalCta() {
  const { t, wa } = useI18n();
  const c = t.s.cta;
  return (
    <section id="contato" className="relative bg-background">
      <div className="mx-auto flex min-h-[88svh] max-w-[1700px] flex-col items-center justify-center px-[var(--pad)] py-32 text-center">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">{c.kicker}</p>
        </Reveal>
        <h2 className="mt-10 text-[clamp(52px,10.5vw,190px)] font-extrabold leading-[0.95] tracking-[-0.045em]">
          <Reveal delay={0.05} y={40}>
            <span className="text-fade">{c.h2}</span>
          </Reveal>
        </h2>
        <Reveal delay={0.15}>
          <p className="mx-auto mt-10 max-w-xl text-[clamp(16px,1.4vw,21px)] text-muted-foreground">{c.lead}</p>
        </Reveal>
        <Reveal delay={0.25} className="mt-10">
          <a href={wa} target="_blank" rel="noreferrer" className="inline-block rounded-full bg-primary px-9 py-5 text-base font-semibold text-primary-foreground shadow-glow">
              <RollText>{c.button}</RollText>
            </a>
        </Reveal>
      </div>
      <footer className="flex items-center justify-between border-t px-[var(--pad)] py-6 text-sm text-muted-foreground">
        <span>{c.copy}</span>
        <a href="#inicio">{c.top} ↑</a>
      </footer>
    </section>
  );
}
