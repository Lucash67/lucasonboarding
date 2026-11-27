import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { copy, detectLang, LANGS, STORAGE_KEY, type Lang } from "@/lib/i18n";
import { whatsappUrl } from "@/lib/projects";

type Ctx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (typeof copy)["pt"];
  wa: string;
};

const LangCtx = createContext<Ctx | null>(null);

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => detectLang());

  useEffect(() => {
    const meta = copy[lang];
    document.documentElement.lang = LANGS.find((l) => l.id === lang)?.html ?? "pt-BR";
    document.title = meta.metaTitle;
    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute("content", meta.metaDescription);
    window.localStorage.setItem(STORAGE_KEY, lang);
  }, [lang]);

  const value = useMemo<Ctx>(
    () => ({
      lang,
      setLang: setLangState,
      t: copy[lang],
      wa: whatsappUrl(copy[lang].waText),
    }),
    [lang],
  );

  return <LangCtx.Provider value={value}>{children}</LangCtx.Provider>;
}

export function useI18n() {
  const ctx = useContext(LangCtx);
  if (!ctx) throw new Error("useI18n must be used inside LangProvider");
  return ctx;
}

export function LangToggle() {
  const { lang, setLang } = useI18n();
  return (
    <div className="flex shrink-0 items-center rounded-full border bg-secondary/60 p-0.5" role="group" aria-label="Language">
      {LANGS.map((item) => {
        const on = lang === item.id;
        return (
          <button
            key={item.id}
            type="button"
            aria-pressed={on}
            onClick={() => setLang(item.id)}
            className={`rounded-full px-2 py-1.5 text-[11px] font-semibold tracking-wide transition sm:px-3 sm:text-xs ${
              on ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
}
