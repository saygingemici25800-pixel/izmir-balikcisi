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
import { memo, useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { useTranslations } from 'next-intl';
import styles from './Timeline.module.css';

/* ── Milestones — 35 yıl, baba → oğul. `photo` is a full-screen placeholder
   background per era (swap for real url(...) images later). The copy (tag /
   title / body / caption) is pulled from the `about.stops` messages. ─────── */
type Stop = {
  year: string;
  tag: string;
  title: ReactNode;
  body: string;
  caption: string;
  photo: string; // CSS background-image value
};

const STOP_PHOTOS: { year: string; photo: string }[] = [
  {
    year: '1989',
    photo:
      'radial-gradient(120% 90% at 72% 80%, rgba(214,198,247,0.22), transparent 55%), linear-gradient(180deg, #16223f 0%, #1e2e54 52%, #2d4275 100%)',
  },
  {
    year: '1995',
    photo:
      'radial-gradient(95% 75% at 32% 32%, rgba(214,198,247,0.28), transparent 60%), linear-gradient(155deg, #2d4275 0%, #1e2e54 55%, #16223f 100%)',
  },
  {
    year: '2008',
    photo:
      'radial-gradient(85% 65% at 62% 36%, rgba(159,176,208,0.30), transparent 60%), linear-gradient(205deg, #1e2e54 0%, #3a5292 45%, #16223f 100%)',
  },
  {
    year: '2026',
    photo:
      'radial-gradient(75% 55% at 50% 26%, rgba(214,198,247,0.30), transparent 56%), linear-gradient(180deg, #3a5292 0%, #2d4275 48%, #16223f 100%)',
  },
];

const CENTERS = STOP_PHOTOS.map((_, i) => (i + 0.5) / STOP_PHOTOS.length); // [0.125, 0.375, 0.625, 0.875]

/* ── Full-screen era photo: crossfades + slow Ken-Burns parallax on scroll.
   First/last hold at the edges so a photo is always present. ───────────── */
const PhotoBg = memo(function PhotoBg({
  photo,
  center: c,
  progress,
  near,
  isFirst,
  isLast,
}: {
  photo: string;
  center: number;
  progress: MotionValue<number>;
  near: boolean;
  isFirst: boolean;
  isLast: boolean;
}) {
  const opacity = useTransform(
    progress,
    [c - 0.18, c - 0.05, c + 0.05, c + 0.18],
    [isFirst ? 1 : 0, 1, 1, isLast ? 1 : 0]
  );
  const scale = useTransform(progress, [c - 0.2, c + 0.2], [1.14, 1.0]);
  const y = useTransform(progress, [c - 0.2, c + 0.2], ['-4%', '4%']);
  return (
    <motion.div
      className={styles.photoBg}
      style={{ opacity, scale, y, backgroundImage: photo, willChange: near ? 'opacity, transform' : 'auto' }}
    />
  );
});

/* ── Giant background year — cream outline + gold fill, over the photo. */
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
  const outlineOpacity = useTransform(progress, window5, [0, 0.5, 0.36, 0.5, 0]);
  const fillOpacity = useTransform(progress, window5, [0, 0, 0.92, 0.42, 0]);
  const blurPx = useTransform(progress, window5, lowFx ? [0, 0, 0, 0, 0] : [9, 3, 0, 3, 9]);
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

/* ── Foreground copy — sits over the photo, lower-left, with parallax. */
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

  return (
    <motion.div className={styles.panel} style={{ opacity }} aria-hidden={!active}>
      <motion.div className={styles.copyCol} style={{ y: textY }}>
        <motion.div className={styles.kicker} style={{ y: kickerY }}>
          <span className={styles.kdot} aria-hidden />
          <span className={styles.tag}>{stop.tag}</span>
          <time className={styles.yearSm}>{stop.year}</time>
        </motion.div>
        <h3 className={styles.title}>{stop.title}</h3>
        <p className={styles.body}>{stop.body}</p>
      </motion.div>
      <span className={styles.stamp}>{stop.caption}</span>
    </motion.div>
  );
});

/* ── The rail: a gold spine that fills with progress, over the photo. */
const Rail = memo(function Rail({
  stops,
  label,
  active,
  progress,
  onSeek,
}: {
  stops: Stop[];
  label: string;
  active: number;
  progress: MotionValue<number>;
  onSeek: (center: number) => void;
}) {
  return (
    <div className={styles.rail}>
      <span className={styles.railEyebrow}>{label}</span>
      <div className={styles.railTrack}>
        <motion.div className={styles.railFill} style={{ scaleY: progress }} />
        {stops.map((s, i) => {
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

/* ── Static fallback — SSR, reduced-motion & narrow viewports. The era photo
   becomes a full-width banner above each milestone's text. */
function StaticTimeline({ stops }: { stops: Stop[] }) {
  return (
    <div className={styles.staticWrap}>
      <ol className={styles.staticList}>
        {stops.map((s) => (
          <motion.li
            key={s.year}
            className={styles.staticItem}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-12% 0px' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className={styles.staticPhoto} style={{ backgroundImage: s.photo }} aria-hidden>
              <span className={styles.staticPhotoYear}>{s.year}</span>
            </div>
            <div className={styles.staticMain}>
              <div className={styles.kicker}>
                <span className={styles.kdot} aria-hidden />
                <span className={styles.tag}>{s.tag}</span>
              </div>
              <h3 className={styles.title}>{s.title}</h3>
              <p className={styles.body}>{s.body}</p>
              <span className={styles.caption}>{s.caption}</span>
            </div>
          </motion.li>
        ))}
      </ol>
    </div>
  );
}

export function Timeline() {
  const t = useTranslations('about');
  const reduce = useReducedMotion();
  const scrollerRef = useRef<HTMLDivElement>(null);

  const [isNarrow, setIsNarrow] = useState(false);
  const [lowFx, setLowFx] = useState(false);
  const [active, setActive] = useState(0);

  // Localised milestones (year + photo from code, copy from messages).
  const stops: Stop[] = useMemo(
    () =>
      STOP_PHOTOS.map((s) => ({
        year: s.year,
        photo: s.photo,
        tag: t(`stops.${s.year}.tag`),
        title: t.rich(`stops.${s.year}.title`, { em: (chunks) => <em>{chunks}</em> }),
        body: t(`stops.${s.year}.body`),
        caption: t(`stops.${s.year}.caption`),
      })),
    [t]
  );

  const { scrollYProgress } = useScroll({
    target: scrollerRef,
    offset: ['start start', 'end end'],
  });
  const ps = useSpring(scrollYProgress, { stiffness: 90, damping: 30, mass: 0.6 });

  const hintOpacity = useTransform(ps, [0, 0.06], [0.65, 0]);

  useMotionValueEvent(ps, 'change', (v) => {
    const clamped = Math.max(0, Math.min(0.999999, v));
    const idx = Math.floor(clamped * STOP_PHOTOS.length);
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
    const absTop = el.getBoundingClientRect().top + window.scrollY;
    const target = absTop + center * (el.offsetHeight - window.innerHeight);
    if (window.lenis) window.lenis.scrollTo(target, { duration: 1.2 });
    else window.scrollTo({ top: target, behavior: 'smooth' });
  }, []);

  if (reduce || isNarrow) return <StaticTimeline stops={stops} />;

  return (
    <div
      className={styles.scroller}
      ref={scrollerRef}
      style={{ height: `${STOP_PHOTOS.length * 100}vh` }}
    >
      <div className={styles.stage}>
        <div className={styles.photos} aria-hidden>
          {stops.map((s, i) => (
            <PhotoBg
              key={s.year}
              photo={s.photo}
              center={CENTERS[i]}
              progress={ps}
              near={Math.abs(i - active) <= 1}
              isFirst={i === 0}
              isLast={i === STOP_PHOTOS.length - 1}
            />
          ))}
        </div>
        <div className={styles.overlay} aria-hidden />

        <div className={styles.bgYears} aria-hidden>
          {stops.map((s, i) => (
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

        <Rail stops={stops} label={t('railLabel')} active={active} progress={ps} onSeek={seek} />

        <div className={styles.panels}>
          {stops.map((s, i) => (
            <Panel key={s.year} stop={s} center={CENTERS[i]} progress={ps} active={active === i} />
          ))}
        </div>

        <motion.span className={styles.hint} style={{ opacity: hintOpacity }} aria-hidden>
          {t('scrollHint')} ↓
        </motion.span>
      </div>
    </div>
  );
}
