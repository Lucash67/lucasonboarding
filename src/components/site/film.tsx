import { useEffect, useRef } from "react";
import { useI18n } from "@/components/site/i18n";
import { bySlug } from "@/lib/projects";

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const ease = (t: number) => 1 - Math.pow(1 - clamp(t), 3);

const STACK = ["muell", "g-steel", "clarissa", "shari", "grupo-atlas"];
const FRAMES = Array.from({ length: 12 }, (_, i) => `/motion/frames/f_${String(i + 1).padStart(2, "0")}.jpg`);
type Els = {
  video: HTMLElement | null;
  tc: HTMLElement | null;
  s2: HTMLElement | null;
  s3: HTMLElement | null;
  browser: HTMLElement | null;
  wire: HTMLElement | null;
  stack: HTMLElement | null;
  hudt: HTMLElement | null;
  hudbar: HTMLElement | null;
};
type Lists = { slices: (HTMLElement | null)[]; tags: (HTMLElement | null)[]; planes: (HTMLElement | null)[]; axes: (HTMLElement | null)[]; chips: (HTMLElement | null)[] };
const HREFS = ["#projetos", "#projetos", "#motion"];

/**
 * Seção "O que eu construo" como um filme em 3 cenas, comandado pelo scroll:
 *  1 · Landing pages (escuro): a página se monta em fatias, do esboço ao final.
 *  2 · Sites (creme): páginas em pilha 3D que se afastam em camadas.
 *  3 · Motion design (terracota): o vídeo toca de verdade, com uma tira de quadros rolando.
 * As cenas trocam por uma abertura circular (íris), sem pausa. Com "reduzir movimento",
 * as três cenas aparecem prontas, uma abaixo da outra.
 */
export function Film() {
  const { t } = useI18n();
  const s = t.s.services;
  const f = t.s.film;

  const root = useRef<HTMLElement>(null);
  const el = useRef<Els>({ video: null, tc: null, s2: null, s3: null, browser: null, wire: null, stack: null, hudt: null, hudbar: null });
  const list = useRef<Lists>({ slices: [], tags: [], planes: [], axes: [], chips: [] });
  const set = (k: keyof Els) => (n: HTMLElement | null) => {
    (el.current as Record<keyof Els, HTMLElement | null>)[k] = n;
  };
  const setIn = (k: keyof Lists, i: number) => (n: HTMLElement | null) => {
    list.current[k][i] = n;
  };

  useEffect(() => {
    const E = el.current;
    const L = list.current;
    const video = E.video as HTMLVideoElement | null;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let playing = false;

    const onTime = () => {
      if (video && E.tc) E.tc.textContent = `00:${String(Math.floor(video.currentTime)).padStart(2, "0")} / 00:52`;
    };
    video?.addEventListener("timeupdate", onTime);

    const draw = (a: number, b: number, iris2: number, iris3: number, small: boolean) => {
      const diag = Math.hypot(innerWidth, innerHeight) * 1.25;
      const at = small ? "50% 64%" : "68% 55%";
      if (E.s2) E.s2.style.clipPath = `circle(${(Math.pow(iris2, 1.7) * diag).toFixed(0)}px at ${at})`;
      if (E.s3) E.s3.style.clipPath = `circle(${(Math.pow(iris3, 1.7) * diag).toFixed(0)}px at ${at})`;

      // cena 1
      if (E.browser) E.browser.style.transform = `rotateX(${14 - 10 * a}deg) rotateY(${-24 + 18 * a}deg) rotateZ(${-3 + 3 * a}deg) translateY(${(-a * 10).toFixed(1)}px)`;
      const ww = E.browser?.offsetWidth ?? 600;
      L.slices.forEach((d, i) => {
        if (!d) return;
        const q = ease((a - i * 0.1) / 0.42);
        const sd = i % 2 ? 1 : -1;
        d.style.transform = `translate3d(${((1 - q) * sd * ww * 0.36).toFixed(1)}px, ${((1 - q) * -ww * 0.09).toFixed(1)}px, ${((1 - q) * ww * 0.6).toFixed(1)}px) rotateY(${(1 - q) * sd * -28}deg)`;
        d.style.opacity = String(clamp(q * 1.4));
      });
      if (E.wire) E.wire.style.opacity = String(1 - clamp((a - 0.7) / 0.25) * 0.85);
      L.tags.forEach((tg, i) => {
        if (!tg) return;
        const o = clamp((a - (0.28 + i * 0.18)) / 0.1);
        tg.style.opacity = String(o * (1 - clamp((iris2 - 0.05) / 0.2)));
        tg.style.transform = `translateY(${(1 - o) * 14}px)`;
      });

      // cena 2
      const ex = ease((b - 0.12) / 0.5);
      const enter = clamp(b / 0.22);
      const w = E.stack?.offsetWidth ?? 400;
      const gap = w * 0.26;
      if (E.stack) E.stack.style.transform = `rotateX(58deg) rotateZ(${-38 + 24 * b}deg) translateY(${((1 - ease(b / 0.3)) * w * 0.14).toFixed(1)}px)`;
      L.planes.forEach((pl, i) => {
        if (!pl) return;
        const z = ex * (i - 2) * gap;
        const off = (1 - ease(enter)) * (i % 2 ? w : -w) * 0.95;
        pl.style.transform = `translate3d(${off.toFixed(1)}px, 0, ${z.toFixed(1)}px)`;
        pl.style.opacity = String(clamp(enter * 2));
      });
      L.axes.forEach((ax) => {
        if (!ax) return;
        ax.style.height = `${(ex * 4 * gap).toFixed(1)}px`;
        ax.style.transform = `translateZ(${(-2 * gap * ex).toFixed(1)}px) rotateX(90deg)`;
        ax.style.opacity = ex > 0.02 ? "1" : "0";
      });
      L.chips.forEach((c, i) => c?.classList.toggle("on", b > 0.15 && b < 0.98 && Math.floor(b * 8) % 5 === i));
    };

    if (reduce) {
      draw(1, 1, 1, 1, innerWidth < 900);
      if (video) video.controls = true;
      return () => video?.removeEventListener("timeupdate", onTime);
    }

    const update = () => {
      const r = root.current!.getBoundingClientRect();
      const vh = innerHeight;
      // os últimos 100svh da seção são a "cauda": os projetos sobem por cima enquanto o filme recua
      const p = clamp(-r.top / (r.height - 2 * vh));
      const tail = clamp((-r.top - (r.height - 2 * vh)) / vh);
      const stageEl = root.current!.firstElementChild as HTMLElement | null;
      if (stageEl) {
        stageEl.style.transform = tail > 0 ? `scale(${(1 - tail * 0.06).toFixed(4)})` : "";
        stageEl.style.opacity = tail > 0 ? String(1 - tail * 0.55) : "";
      }
      draw(clamp(p / 0.34), clamp((p - 0.3) / 0.36), clamp((p - 0.3) / 0.13), clamp((p - 0.64) / 0.13), innerWidth < 900);

      const inView = r.top < vh && r.bottom > 0;
      const want = inView && p > 0.6;
      if (video && want && !playing) {
        playing = true;
        void video.play().catch(() => undefined);
      }
      if (video && !want && playing) {
        playing = false;
        video.pause();
      }
      const scene = p < 0.34 ? 0 : p < 0.67 ? 1 : 2;
      if (E.hudt) E.hudt.textContent = inView ? `${String(scene + 1).padStart(2, "0")} · ${s.cards[scene]!.title}` : "";
      if (E.hudbar) E.hudbar.style.width = `${p * 100}%`;
    };
    update();
    addEventListener("scroll", update, { passive: true });
    addEventListener("resize", update);
    return () => {
      removeEventListener("scroll", update);
      removeEventListener("resize", update);
      video?.removeEventListener("timeupdate", onTime);
    };
  }, [s.cards]);

  const cap = (
    <div className="film-cap">
      <span className="film-pill">{s.pill}</span>
      <b>{s.h2}</b>
    </div>
  );
  const text = (i: number) => (
    <div className="film-txt">
      <div className="film-kick">0{i + 1} / 03</div>
      <h3>{s.cards[i]!.title}</h3>
      <p>{s.cards[i]!.text}</p>
      <a className="film-btn" href={HREFS[i]}>
        {s.cards[i]!.cta} →
      </a>
    </div>
  );

  return (
    <section id="servicos" ref={root} className="film-seq">
      <div className="film-stage">
        {/* CENA 1 · Landing pages */}
        <div className="film-scene film-s1">
          {cap}
          {text(0)}
          <div className="film-vis">
            <div className="film-browser" ref={set("browser")}>
              <div className="film-chrome">
                <div className="film-bar">
                  <i />
                  <i />
                  <i />
                </div>
                <div className="film-wire" ref={set("wire")}>
                  <div style={{ left: "4%", top: "5%", width: "20%", height: "8%" }} />
                  <div style={{ right: "4%", top: "5%", width: "30%", height: "8%" }} />
                  <div style={{ left: "4%", top: "24%", width: "46%", height: "10%" }} />
                  <div style={{ left: "4%", top: "38%", width: "40%", height: "10%" }} />
                  <div style={{ left: "4%", top: "56%", width: "22%", height: "11%", borderRadius: 99 }} />
                  <div style={{ right: "4%", top: "22%", width: "38%", height: "52%" }} />
                  <div style={{ left: "4%", bottom: "5%", width: "28%", height: "14%" }} />
                  <div style={{ left: "36%", bottom: "5%", width: "28%", height: "14%" }} />
                  <div style={{ left: "68%", bottom: "5%", width: "28%", height: "14%" }} />
                </div>
                <div className="film-slices">
                  {[0, 1, 2, 3].map((i) => (
                    <div
                      key={i}
                      ref={setIn("slices", i)}
                      className="film-slice"
                      style={{ top: `${i * 25}%`, backgroundImage: `url(${bySlug("clarissa").cover})`, backgroundPosition: `0 ${i * 33.333}%` }}
                    />
                  ))}
                </div>
              </div>
              {f.tags.map((tg, i) => (
                <span key={tg} ref={setIn("tags", i)} className={`film-tag film-tag-${i + 1}`}>
                  {tg}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* CENA 2 · Sites */}
        <div className="film-scene film-s2" ref={set("s2")}>
          {cap}
          {text(1)}
          <div className="film-vis">
            <div className="film-pbox" ref={set("stack")}>
              {STACK.map((slug, i) => (
                <div key={slug} ref={setIn("planes", i)} className="film-plane">
                  <img src={bySlug(slug).cover} alt="" loading="lazy" />
                </div>
              ))}
              {[
                [0, 0],
                [100, 0],
                [0, 100],
                [100, 100],
              ].map(([x, y], i) => (
                <div key={i} ref={setIn("axes", i)} className="film-axis" style={{ left: `${x}%`, top: `${y}%` }} />
              ))}
            </div>
            <div className="film-chips">
              {f.chips.map((c, i) => (
                <span key={c} ref={setIn("chips", i)} className="film-chip">
                  {c}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* CENA 3 · Motion design */}
        <div className="film-scene film-s3" ref={set("s3")}>
          {cap}
          {text(2)}
          <div className="film-vis film-vis-3">
            <div className="film-strip">
              <div className="film-in">
                {[...FRAMES, ...FRAMES].map((src, i) => (
                  <img key={i} src={src} alt="" loading="lazy" />
                ))}
              </div>
            </div>
            <div className="film-playhead" />
            <div className="film-phone">
              <video ref={set("video")} src="/motion/reels.mp4" poster="/motion/reels.jpg" muted loop playsInline preload="metadata" aria-label="Reels" />
            </div>
            <div className="film-tc" ref={set("tc")}>
              00:00 / 00:52
            </div>
          </div>
        </div>

        <div className="film-hud" aria-hidden>
          <span ref={set("hudt")} />
          <div className="film-track">
            <i ref={set("hudbar")} />
          </div>
        </div>
      </div>
    </section>
  );
}
