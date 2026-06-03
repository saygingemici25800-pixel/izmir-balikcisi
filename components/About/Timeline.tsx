'use client';

import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionTemplate,
  useMotionValueEvent,
  useReducedMotion,
  type MotionValue,
} from 'framer-motion';
import { memo, useCallback, useEffect, useRef, useState } from 'react';
import styles from './Timeline.module.css';

/* ── Milestones — 35 yıl, baba → oğul. Centers are the scroll-progress
   anchors (0..1) where each year locks into focus. ───────────────────── */
type Stop = {
  year: string;
  tag: string;
  title: React.ReactNode;
  body: string;
  caption: string;
};

const STOPS: Stop[] = [
  {
    year: '1989',
    tag: 'Kuruluş',
    title: <>İlk <em>tezgâh</em></>,
    body: 'Hasan Usta sabahın dördünde tek bir buz tezgâhıyla başladı. Ne menü vardı ne tabela — sadece o günkü deniz, bir terazi ve beklemeyi bilen iki el.',
    caption: 'Arşiv · Tuzla, 1989',
  },
  {
    year: '1995',
    tag: 'İlk Salon',
    title: <>Işıklar <em>yandı</em></>,
    body: 'Tezgâh bir salona dönüştü. Ayşe masaların sessiz sahibi oldu; akşam yedide yanan ilk ışık, hâlâ aynı kapının ardında bekleyenleri çağırıyordu.',
    caption: 'Arşiv · İlk salon, 1995',
  },
  {
    year: '2008',
    tag: 'İkinci Nesil',
    title: <>Oğul <em>mutfakta</em></>,
    body: 'Yusuf babasının yanına geçti. Eski tarifler kaldı, eller çoğaldı — çupra ilk kez tuzun altında dinlendi, sofra hiç acele etmeden büyüdü.',
    caption: 'Arşiv · Tuzda çupra, 2008',
  },
  {
    year: '2026',
    tag: 'Bugün',
    title: <>Aynı <em>deniz</em></>,
    body: 'Otuz beş yıl, sıfır alkol, yüz yirmi dört koltuk. Baba hâlâ hâli ilk gezen, oğul hâlâ tuzu kıran. Deniz acele etmiyor; biz de etmiyoruz.',
    caption: 'Bugün · Mustafa Kemal Blv.',
  },
];

const CENTERS = STOPS.map((_, i) => (i + 0.5) / STOPS.length); // [0.125, 0.375, 0.625, 0.875]
const SCROLL_HINT = 'Kaydır';

/* ── Giant background year: surfaces from the deep, locks at focus,
   drifts past. Two stacked copies (cream outline + gold fill) cross-fade
   — NEVER background-clip on animated text (documented invisibility bug). */
const BgYear = memo(function BgYear({
  year,
  center: c,
  progress,
  near,
  lowFx,
}: {
  year: string;
  center: number;
  progress: MotionValue<number>;
  near: boolean;
  lowFx: boolean;
}) {
  const window5 = [c - 0.16, c - 0.06, c, c + 0.06, c + 0.16];

  const scale = useTransform(progress, window5, [0.55, 0.78, 1.0, 1.22, 1.5]);
  const y = useTransform(progress, [c - 0.16, c + 0.16], ['7vh', '-7vh']);
  const outlineOpacity = useTransform(progress, window5, [0, 0.55, 0.4, 0.55, 0]);
  const fillOpacity = useTransform(progress, window5, [0, 0, 1, 0.45, 0]);
  const blurPx = useTransform(
    progress,
    window5,
    lowFx ? [0, 0, 0, 0, 0] : [9, 3, 0, 3, 9]
  );
  const filter = useMotionTemplate`blur(${blurPx}px)`;

  return (
    <motion.div
      className={styles.bgYear}
      style={{ scale, y, filter, willChange: near ? 'transform, opacity, filter' : 'auto' }}
    >
      <motion.span className={styles.yearOutline} style={{ opacity: outlineOpacity }}>
        {year}
      </motion.span>
      <motion.span className={styles.yearFill} style={{ opacity: fillOpacity }}>
        {year}
      </motion.span>
    </motion.div>
  );
});

/* ── Foreground panel: label + title + body land "on top of" their year,
   then shear gently apart at the seam (copy and photo parallax opposite). */
const Panel = memo(function Panel({
  stop,
  center: c,
  progress,
  active,
}: {
  stop: Stop;
  center: number;
  progress: MotionValue<number>;
  active: boolean;
}) {
  const opacity = useTransform(progress, [c - 0.13, c - 0.045, c + 0.045, c + 0.13], [0, 1, 1, 0]);
  const textY = useTransform(progress, [c - 0.13, c + 0.13], [40, -40]);
  const kickerY = useTransform(progress, [c - 0.13, c + 0.13], [56, -56]);
  const photoY = useTransform(progress, [c - 0.13, c + 0.13], [-34, 34]);
  const photoScale = useTransform(progress, [c - 0.13, c + 0.13], [1.04, 0.98]);
  const kenScale = useTransform(progress, [c - 0.13, c + 0.13], [1.0, 1.06]);

  return (
    <motion.div className={styles.panel} style={{ opacity }} aria-hidden={!active}>
      <div className={styles.panelRow}>
        <motion.div className={styles.copyCol} style={{ y: textY }}>
          <motion.div className={styles.kicker} style={{ y: kickerY }}>
            <span className={styles.kdot} aria-hidden />
            <span className={styles.tag}>{stop.tag}</span>
            <time className={styles.yearSm}>{stop.year}</time>
          </motion.div>
          <h3 className={styles.title}>{stop.title}</h3>
          <p className={styles.body}>{stop.body}</p>
        </motion.div>

        <motion.figure className={styles.photoCol} style={{ y: photoY }}>
          <motion.div className={styles.photo} style={{ scale: photoScale }} aria-hidden>
            <motion.div className={styles.photoInner} style={{ scale: kenScale }} />
            <span className={styles.photoYear}>{stop.year}</span>
          </motion.div>
          <figcaption className={styles.caption}>{stop.caption}</figcaption>
        </motion.figure>
      </div>
    </motion.div>
  );
});

/* ── The rail: the protagonist. A gold spine that fills with progress and
   keeps the visitor oriented across 35 years. */
const Rail = memo(function Rail({
  active,
  progress,
  onSeek,
}: {
  active: number;
  progress: MotionValue<number>;
  onSeek: (center: number) => void;
}) {
  return (
    <div className={styles.rail}>
      <span className={styles.railEyebrow}>1989 — 2026</span>
      <div className={styles.railTrack}>
        <motion.div className={styles.railFill} style={{ scaleY: progress }} />
        {STOPS.map((s, i) => {
          const state = i < active ? 'past' : i === active ? 'active' : 'future';
          return (
            <button
              key={s.year}
              type="button"
              className={styles.railNode}
              style={{ top: `${CENTERS[i] * 100}%` }}
              data-state={state}
              onClick={() => onSeek(CENTERS[i])}
              aria-current={i === active ? 'true' : undefined}
              aria-label={`${s.year} — ${s.tag}`}
              data-magnetic
              data-cursor-label={s.year}
            >
              <span className={styles.railDot} aria-hidden />
              <span className={styles.railYear}>{s.year}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
});

/* ── Static fallback — SSR, reduced-motion & narrow viewports. No pin, no
   scroll-driven transforms; the year is a STATIC numeral so the gold
   clip-text gradient is safe here. */
function StaticTimeline() {
  return (
    <div className={styles.staticWrap}>
      <ol className={styles.staticList}>
        {STOPS.map((s) => (
          <motion.li
            key={s.year}
            className={styles.staticItem}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-12% 0px' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className={styles.staticAxis} aria-hidden />
            <div className={styles.staticMain}>
              <div className={styles.kicker}>
                <span className={styles.kdot} aria-hidden />
                <span className={styles.tag}>{s.tag}</span>
              </div>
              <time className={styles.staticYear}>{s.year}</time>
              <h3 className={styles.title}>{s.title}</h3>
              <p className={styles.body}>{s.body}</p>
            </div>
            <figure className={styles.photoCol}>
              <div className={styles.photo} aria-hidden>
                <div className={styles.photoInner} />
                <span className={styles.photoYear}>{s.year}</span>
              </div>
              <figcaption className={styles.caption}>{s.caption}</figcaption>
            </figure>
          </motion.li>
        ))}
      </ol>
    </div>
  );
}

export function Timeline() {
  const reduce = useReducedMotion();
  const scrollerRef = useRef<HTMLDivElement>(null);

  const [isNarrow, setIsNarrow] = useState(false);
  const [lowFx, setLowFx] = useState(false);
  const [active, setActive] = useState(0);

  // One source of truth, smoothed once — every transform reads this spring so
  // Lenis / trackpad inertial flicks don't jitter the giant year.
  const { scrollYProgress } = useScroll({
    target: scrollerRef,
    offset: ['start start', 'end end'],
  });
  const ps = useSpring(scrollYProgress, { stiffness: 90, damping: 30, mass: 0.6 });

  const hintOpacity = useTransform(ps, [0, 0.06], [0.65, 0]);

  useMotionValueEvent(ps, 'change', (v) => {
    // Spring can overshoot <0 / >1 — clamp before bucketing.
    const clamped = Math.max(0, Math.min(0.999999, v));
    const idx = Math.floor(clamped * STOPS.length);
    setActive((prev) => (prev === idx ? prev : idx));
  });

  useEffect(() => {
    const mqNarrow = window.matchMedia('(max-width: 860px)');
    const mqCoarse = window.matchMedia('(pointer: coarse)');
    const update = () => {
      setIsNarrow(mqNarrow.matches);
      setLowFx(mqCoarse.matches);
    };
    update();
    mqNarrow.addEventListener('change', update);
    mqCoarse.addEventListener('change', update);
    return () => {
      mqNarrow.removeEventListener('change', update);
      mqCoarse.removeEventListener('change', update);
    };
  }, []);

  const seek = useCallback((center: number) => {
    const el = scrollerRef.current;
    if (!el) return;
    // Absolute document top (offsetTop is relative to the positioned section).
    const absTop = el.getBoundingClientRect().top + window.scrollY;
    // Inverse of useScroll offset ['start start','end end']:
    // scrollY at progress p == absTop + p*(scrollerHeight - innerHeight).
    const target = absTop + center * (el.offsetHeight - window.innerHeight);
    if (window.lenis) window.lenis.scrollTo(target, { duration: 1.2 });
    else window.scrollTo({ top: target, behavior: 'smooth' });
  }, []);

  // SSR + first client render are identical (reduce/isNarrow default false →
  // pinned), so the scroller mounts immediately and useScroll binds to it with
  // no hydration mismatch. reduced-motion / narrow viewports swap to the static
  // timeline post-mount (the swap is below the fold → negligible CLS).
  if (reduce || isNarrow) return <StaticTimeline />;

  return (
    <div
      className={styles.scroller}
      ref={scrollerRef}
      style={{ height: `${STOPS.length * 100}vh` }}
    >
      <div className={styles.stage}>
        <div className={styles.bgYears} aria-hidden>
          {STOPS.map((s, i) => (
            <BgYear
              key={s.year}
              year={s.year}
              center={CENTERS[i]}
              progress={ps}
              near={Math.abs(i - active) <= 1}
              lowFx={lowFx}
            />
          ))}
        </div>

        <Rail active={active} progress={ps} onSeek={seek} />

        <div className={styles.panels}>
          {STOPS.map((s, i) => (
            <Panel key={s.year} stop={s} center={CENTERS[i]} progress={ps} active={active === i} />
          ))}
        </div>

        <motion.span className={styles.hint} style={{ opacity: hintOpacity }} aria-hidden>
          {SCROLL_HINT} ↓
        </motion.span>
      </div>
    </div>
  );
}
