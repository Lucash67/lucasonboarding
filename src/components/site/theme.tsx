import { useEffect, useState } from "react";
import { useI18n } from "@/components/site/i18n";

export const THEMES = ["preto", "branco", "cinza", "concreto"] as const;
export type Theme = (typeof THEMES)[number];
export const THEME_KEY = "lh-theme";

/** Runs before paint (inlined in <head>) so there is no flash of the wrong theme. */
export const themeBootScript = `try{var t=localStorage.getItem("${THEME_KEY}");if(t&&["preto","branco","cinza","concreto"].indexOf(t)>-1)document.documentElement.setAttribute("data-theme",t)}catch(e){}`;

const SWATCH: Record<Theme, string> = {
  preto: "oklch(0.1 0 0)",
  branco: "oklch(0.975 0 0)",
  cinza: "oklch(0.4 0 0)",
  concreto: "oklch(0.8 0 0)",
};

export function ThemeSwitch() {
  const { t } = useI18n();
  const [theme, setTheme] = useState<Theme>("preto");

  useEffect(() => {
    const cur = document.documentElement.getAttribute("data-theme") as Theme | null;
    if (cur && THEMES.includes(cur)) setTheme(cur);
  }, []);

  const apply = (next: Theme) => {
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    try {
      window.localStorage.setItem(THEME_KEY, next);
    } catch {
      /* private mode */
    }
  };

  return (
    <div
      role="group"
      aria-label={t.themes.label}
      className="fixed bottom-5 left-5 z-40 flex items-center gap-1 rounded-full border bg-background/80 p-1 backdrop-blur-xl"
    >
      {THEMES.map((id) => (
        <button
          key={id}
          type="button"
          aria-pressed={theme === id}
          aria-label={t.themes[id]}
          title={t.themes[id]}
          onClick={() => apply(id)}
          className={`flex items-center gap-2 rounded-full p-1 transition sm:pr-3 ${theme === id ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"}`}
        >
          <span className="h-5 w-5 shrink-0 rounded-full border border-foreground/40" style={{ background: SWATCH[id] }} />
          <span className="hidden text-[11px] font-semibold sm:inline">{t.themes[id]}</span>
        </button>
      ))}
    </div>
  );
}
