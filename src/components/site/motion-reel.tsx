import { Pause, Play, Volume2, VolumeX } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useI18n } from "@/components/site/i18n";

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));

const CLIPS = [
  { id: "terus", src: "/motion/terus.mp4", poster: "/motion/terus.jpg", glow: "#2f5bff", start: 0, end: 0 },
  // Converto: só o trecho da colisão da logo (corte da logo, as metades se afastando e voltando, a batida e o nome)
  { id: "converto", src: "/motion/converto.mp4", poster: "/motion/converto.jpg", glow: "#f5d600", start: 10.2, end: 15.5 },
  { id: "reels", src: "/motion/reels.mp4", poster: "/motion/reels.jpg", glow: "#8a6cff", start: 0, end: 0 },
] as const;
const TOTAL = 149; // soma dos 3 vídeos em segundos (só para o timecode de ambiente)

/**
 * Seção de vídeos como "mesa de edição": monitor vertical no centro e linha do tempo embaixo.
 * A agulha anda com o scroll e "corta" de um clipe para o outro; clicar num clipe leva até ele.
 * Cada vídeo tem uma capa com a cena mais chamativa e um botão de play sempre visível quando parado.
 * Só o clipe ativo toca (mudo, em loop); o som é ligado por clique. Com "reduzir movimento",
 * a seção vira uma pilha de três vídeos com controles nativos.
 */
export function MotionReel() {
  const { t } = useI18n();
  const m = t.s.motion;
  const seq = useRef<HTMLElement>(null);
  const mon = useRef<HTMLDivElement>(null);
  const ph = useRef<HTMLDivElement>(null);
  const tc = useRef<HTMLDivElement>(null);
  const vids = useRef<(HTMLVideoElement | null)[]>([]);
  const [active, setActive] = useState(0);
  const [sound, setSound] = useState(false);
  const [paused, setPaused] = useState(false);
  const blocked = useRef(false); // o navegador barrou o início automático
  const [reduce, setReduce] = useState(false);
  const activeRef = useRef(0);
  const soundRef = useRef(false);
  soundRef.current = sound;

  useEffect(() => {
    setReduce(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  // ativa um clipe: pausa os outros, toca o escolhido do início
  const select = (i: number, cut: boolean) => {
    if (i === activeRef.current && !cut) return;
    activeRef.current = i;
    setActive(i);
    vids.current.forEach((v, k) => {
      if (!v) return;
      if (k === i) {
        v.muted = !soundRef.current;
        try {
          v.currentTime = CLIPS[k]!.start;
        } catch {
          /* ainda sem metadados */
        }
        void v.play().catch(() => {
          blocked.current = true;
          setPaused(true);
        });
      } else v.pause();
    });
    if (cut && mon.current) {
      mon.current.classList.remove("desk-cut");
      void mon.current.offsetWidth;
      mon.current.classList.add("desk-cut");
    }
  };

  useEffect(() => {
    if (reduce) return;
    const el = seq.current!;
    let started = false;
    const update = () => {
      const r = el.getBoundingClientRect();
      const vh = innerHeight;
      const p = clamp(-r.top / (r.height - vh));
      const inView = r.top < vh && r.bottom > 0;
      if (ph.current) ph.current.style.left = `${(p * 100).toFixed(2)}%`;
      const i = Math.min(2, Math.floor(p * 3 * 0.9999));
      if (inView) {
        const changed = i !== activeRef.current || !started;
        started = true;
        if (changed) select(i, true);
      } else {
        started = false;
        vids.current.forEach((v) => v?.pause());
      }
      const local = p * 3 - i;
      if (mon.current) mon.current.style.transform = `rotateY(${(8 - 16 * local).toFixed(2)}deg) rotateX(${(2 - 4 * local).toFixed(2)}deg)`;
      const tot = p * TOTAL;
      const pad = (n: number) => String(n).padStart(2, "0");
      if (tc.current) tc.current.textContent = `00:${pad(Math.floor(tot / 60))}:${pad(Math.floor(tot % 60))}:${pad(Math.floor((tot % 1) * 30))}`;
    };
    let tick = 0;
    const onScroll = () => {
      if (tick) return;
      tick = requestAnimationFrame(() => {
        tick = 0;
        update();
      });
    };
    // se o navegador barrou o autoplay (ex.: economia de bateria), o primeiro toque/tecla já inicia o vídeo
    const kick = () => {
      if (!blocked.current) return;
      const v = vids.current[activeRef.current];
      const rc = el.getBoundingClientRect();
      if (v && v.paused && rc.top < innerHeight && rc.bottom > 0) void v.play().catch(() => undefined);
    };
    update();
    addEventListener("scroll", onScroll, { passive: true });
    addEventListener("resize", update);
    addEventListener("touchstart", kick, { passive: true });
    addEventListener("pointerdown", kick, { passive: true });
    return () => {
      cancelAnimationFrame(tick);
      removeEventListener("scroll", onScroll);
      removeEventListener("resize", update);
      removeEventListener("touchstart", kick);
      removeEventListener("pointerdown", kick);
      vids.current.forEach((v) => v?.pause());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduce]);

  useEffect(() => {
    const v = vids.current[active];
    if (v) v.muted = !sound;
  }, [sound, active]);

  // repete só o trecho escolhido do clipe (ex.: a colisão da logo da Converto)
  useEffect(() => {
    const id = window.setInterval(() => {
      const c = CLIPS[active]!;
      const v = vids.current[active];
      if (v && c.end && !v.paused && v.currentTime >= c.end) v.currentTime = c.start;
    }, 60);
    return () => window.clearInterval(id);
  }, [active]);

  const goTo = (i: number) => {
    const el = seq.current!;
    const top = el.getBoundingClientRect().top + scrollY;
    window.scrollTo({ top: top + ((i + 0.5) / 3) * (el.offsetHeight - innerHeight), behavior: "smooth" });
  };

  const toggle = () => {
    const v = vids.current[active];
    if (!v) return;
    if (v.paused) void v.play().catch(() => undefined);
    else v.pause();
  };

  if (reduce) {
    return (
      <section id="motion" className="desk-static">
        <h2>{m.h2}</h2>
        <div className="desk-static-grid">
          {CLIPS.map((c, i) => (
            <figure key={c.id}>
              <video src={c.start ? `${c.src}#t=${c.start}` : c.src} poster={c.poster} controls playsInline preload="none" aria-label={m.items[i]!.title} />
              <figcaption>
                {m.items[i]!.title} <span>{m.items[i]!.meta}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>
    );
  }

  const cur = CLIPS[active]!;
  const rulerMarks = [0, 1, 2, 3, 4, 5, 6].map((i) => {
    const s = Math.round((i / 6) * (TOTAL - 1));
    return { left: `${(i / 6) * 100}%`, label: `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}` };
  });

  return (
    <section id="motion" ref={seq} className="desk-seq">
      <div className="desk-stage" style={{ ["--glow" as string]: cur.glow }}>
        <div className="desk-glow" aria-hidden />
        <div className="desk-fade" aria-hidden />
        <div className="desk-cap">
          <span className="desk-pill">{m.pill}</span>
          <b>{m.h2}</b>
        </div>

        <div className="desk-main">
          <div className="desk-info">
            <div className="desk-k">0{active + 1} / 03</div>
            <h3>{m.items[active]!.title}</h3>
            <p>{m.items[active]!.meta}</p>
            <button type="button" className="desk-snd" onClick={() => setSound((s) => !s)} aria-pressed={sound}>
              {sound ? <Volume2 size={16} /> : <VolumeX size={16} />} {sound ? m.muted : m.sound}
            </button>
          </div>

          <div className="desk-monwrap">
            <div className="desk-mon" ref={mon}>
              {CLIPS.map((c, i) => (
                <video
                  key={c.id}
                  ref={(n) => {
                    vids.current[i] = n;
                  }}
                  className={i === active ? "on" : ""}
                  src={c.src}
                  poster={c.poster}
                  muted
                  loop
                  playsInline
                  preload={i === 0 ? "auto" : "metadata"}
                  aria-label={m.items[i]!.title}
                  onLoadedMetadata={(e) => {
                    const s = c.start;
                    if (s) e.currentTarget.currentTime = s;
                  }}
                  onPlay={() => {
                    if (i !== activeRef.current) return;
                    blocked.current = false;
                    setPaused(false);
                  }}
                  onPause={() => i === activeRef.current && setPaused(true)}
                />
              ))}
              <span className="desk-hudl">
                <i className="desk-rec" />
                PROGRAM · V1 · CLIP {active + 1}
              </span>
              <span className="desk-hudr">1080×1920 · 30 fps</span>
              <i className="desk-corner desk-c1" />
              <i className="desk-corner desk-c2" />
              <i className="desk-corner desk-c3" />
              <i className="desk-corner desk-c4" />
              <button type="button" className={`desk-play${paused ? " show" : ""}`} onClick={toggle} aria-label={paused ? "Play" : "Pause"}>
                {paused ? <Play size={24} fill="currentColor" /> : <Pause size={24} fill="currentColor" />}
              </button>
              <div className="desk-flash" />
            </div>
          </div>
        </div>

        <div className="desk-tl">
          <div className="desk-tc" ref={tc}>
            00:00:00:00
          </div>
          <div className="desk-ruler">
            {rulerMarks.map((r) => (
              <span key={r.left} style={{ left: r.left }}>
                {r.label}
              </span>
            ))}
          </div>
          <div className="desk-tracks">
            <div className="desk-track">
              <span className="desk-lab">V1</span>
              {CLIPS.map((c, i) => (
                <button type="button" key={c.id} className={`desk-clip${i === active ? " on" : ""}`} onClick={() => goTo(i)} aria-label={m.items[i]!.title}>
                  <img src={c.poster} alt="" loading="lazy" />
                  <em>{m.items[i]!.title}</em>
                </button>
              ))}
            </div>
            <div className="desk-track desk-a">
              <span className="desk-lab">A1</span>
              {[1, 2, 3].map((s) => (
                <div key={s} className="desk-wave">
                  {Array.from({ length: 40 }).map((_, k) => (
                    <i key={k} style={{ height: `${Math.round(18 + Math.abs(Math.sin(k * 0.7 + s) * Math.cos(k * 0.23 + s * 2)) * 70)}%` }} />
                  ))}
                </div>
              ))}
            </div>
            <div className="desk-track desk-fx">
              <span className="desk-lab">FX</span>
              {[5, 7, 6].map((n, g) => (
                <div key={g} className="desk-fxs">
                  {Array.from({ length: n }).map((_, k) => (
                    <b key={k} style={{ left: `${((k + 1) / (n + 1)) * 100}%` }} />
                  ))}
                </div>
              ))}
            </div>
            <div className="desk-ph" ref={ph} />
          </div>
        </div>
      </div>
    </section>
  );
}
