import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { useI18n } from "@/components/site/i18n";

/**
 * Loader com nome, contador 000→100 e saída em clip-path
 * (ref: Gustavo Carvalho / Jorge Guilherme). Tem trava de segurança de 3 s.
 */
export function Loader({ onDone }: { onDone: () => void }) {
  const { t } = useI18n();
  const [visible, setVisible] = useState(true);
  const [n, setN] = useState(0);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setVisible(false);
      onDone();
      return;
    }
    const start = performance.now();
    const DUR = 1500;
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min((now - start) / DUR, 1);
      setN(Math.round((1 - Math.pow(1 - p, 3)) * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
      else setVisible(false);
    };
    raf = requestAnimationFrame(tick);
    const safety = window.setTimeout(() => setVisible(false), 3000);
    document.documentElement.style.overflow = "hidden";
    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(safety);
      document.documentElement.style.overflow = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AnimatePresence onExitComplete={onDone}>
      {visible && (
        <motion.div
          key="loader"
          className="lh-loader fixed inset-0 z-[200] flex flex-col justify-between bg-background px-5 py-6 md:px-10 md:py-9"
          initial={{ clipPath: "inset(0% 0% 0% 0%)" }}
          exit={{ clipPath: "inset(0% 0% 100% 0%)", transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1] } }}
          aria-hidden
        >
          <div className="flex items-start justify-between font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
            <span>Portfólio</span>
            <span>{new Date().getFullYear()}</span>
          </div>
          <div>
            <p className="max-w-md font-mono text-xs uppercase tracking-widest text-muted-foreground">{t.loaderRole}</p>
            <div className="mt-4 flex items-end justify-between gap-6">
              <p className="font-display text-[15vw] font-bold leading-[0.85] md:text-[10vw]">
                lucas
                <br />
                henrique
              </p>
              <p className="font-display text-[18vw] font-bold leading-none tabular-nums md:text-[10vw]">{String(n).padStart(3, "0")}</p>
            </div>
            <div className="mt-6 h-px w-full bg-border">
              <div className="h-px bg-foreground" style={{ width: `${n}%` }} />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
