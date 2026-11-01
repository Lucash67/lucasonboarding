import { motion, useMotionValue, useScroll, useSpring, useTransform, type MotionValue } from "motion/react";
import { useEffect, useRef, type ReactNode } from "react";

export function SmoothScroll() {
  useEffect(() => {
    let raf = 0;
    let lenis: { raf: (t: number) => void; destroy: () => void } | null = null;
    import("lenis").then(({ default: Lenis }) => {
      lenis = new Lenis({ lerp: 0.1 });
      const loop = (t: number) => {
        lenis?.raf(t);
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);
    });
    return () => {
      cancelAnimationFrame(raf);
      lenis?.destroy();
    };
  }, []);
  return null;
}

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const x = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  return <motion.div style={{ scaleX: x }} className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-primary" />;
}

export function Reveal({ children, delay = 0, className = "", y = 40 }: { children: ReactNode; delay?: number; className?: string; y?: number }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function SplitWords({ text, className = "", delay = 0 }: { text: string; className?: string; delay?: number }) {
  return (
    <span className={className}>
      {text.split(" ").map((w, i) => (
        <span key={i} className="inline-block overflow-hidden pb-[0.08em] align-bottom">
          <motion.span
            className="inline-block"
            initial={{ y: "110%", rotate: 6 }}
            whileInView={{ y: 0, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: delay + i * 0.06, ease: [0.22, 1, 0.36, 1] }}
          >
            {w}&nbsp;
          </motion.span>
        </span>
      ))}
    </span>
  );
}

/** Words light up one by one as you scroll through. */
export function ScrollText({ text, className = "" }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 45%"] });
  const words = text.split(" ");
  return (
    <p ref={ref} className={className}>
      {words.map((w, i) => (
        <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]} highlight={w.startsWith("*")}>
          {w.replace(/\*/g, "")}
        </Word>
      ))}
    </p>
  );
}
function Word({ children, progress, range, highlight }: { children: string; progress: MotionValue<number>; range: [number, number]; highlight: boolean }) {
  const opacity = useTransform(progress, range, [0.12, 1]);
  return (
    <motion.span style={{ opacity }} className={`mr-[0.25em] inline-block ${highlight ? "text-primary" : ""}`}>
      {children}
    </motion.span>
  );
}

export function Marquee({ children, reverse = false, duration = 40, className = "" }: { children: ReactNode; reverse?: boolean; duration?: number; className?: string }) {
  return (
    <div className={`group flex overflow-hidden ${className}`}>
      <div
        className={`flex shrink-0 gap-[inherit] group-hover:[animation-play-state:paused] ${reverse ? "animate-marquee-rev" : "animate-marquee"}`}
        style={{ ["--dur" as string]: `${duration}s` }}
      >
        <div className="flex shrink-0 items-center gap-[inherit]">{children}</div>
        <div className="flex shrink-0 items-center gap-[inherit]" aria-hidden>{children}</div>
      </div>
    </div>
  );
}

/** Marquee whose speed/direction reacts to scroll velocity. */
export function VelocityMarquee({ children, base = 1 }: { children: ReactNode; base?: number }) {
  const x = useMotionValue(0);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let last = window.scrollY;
    let raf = 0;
    let pos = 0;
    let dir = base;
    const loop = () => {
      const y = window.scrollY;
      const v = y - last;
      last = y;
      if (v !== 0) dir = Math.sign(v) * base;
      pos -= dir * (0.6 + Math.min(Math.abs(v), 60) * 0.25);
      const w = (ref.current?.scrollWidth ?? 2) / 2;
      if (pos <= -w) pos += w;
      if (pos > 0) pos -= w;
      x.set(pos);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [x, base]);
  return (
    <div className="overflow-hidden">
      <motion.div ref={ref} style={{ x }} className="flex w-max whitespace-nowrap">
        <div className="flex shrink-0">{children}</div>
        <div className="flex shrink-0" aria-hidden>{children}</div>
      </motion.div>
    </div>
  );
}

export function Magnetic({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useSpring(0, { stiffness: 200, damping: 15 });
  const y = useSpring(0, { stiffness: 200, damping: 15 });
  return (
    <motion.div
      ref={ref}
      style={{ x, y }}
      className={`inline-block ${className}`}
      onMouseMove={(e) => {
        const r = ref.current!.getBoundingClientRect();
        x.set((e.clientX - r.left - r.width / 2) * 0.35);
        y.set((e.clientY - r.top - r.height / 2) * 0.35);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}

export function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (!e?.isIntersecting) return;
      io.disconnect();
      const start = performance.now();
      const tick = (t: number) => {
        const p = Math.min((t - start) / 1400, 1);
        el.textContent = Math.round(to * (1 - Math.pow(1 - p, 3))) + suffix;
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
    io.observe(el);
    return () => io.disconnect();
  }, [to, suffix]);
  return <span ref={ref}>0{suffix}</span>;
}
