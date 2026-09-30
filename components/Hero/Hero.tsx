'use client';

import { useEffect, useRef, useState } from 'react';
import { animate, motion, type AnimationSequence } from 'framer-motion';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { SectionLink } from '@/components/SectionLink';
import { TextReveal } from '@/components/TextReveal/TextReveal';
import styles from './Hero.module.css';

/*
 * Hero intro — a small window on a dark navy stage; photos wipe in one after
 * another (accelerating), then the window opens up to the full-bleed hero and
 * the headline reveals line by line.
 *
 * PHOTOS: real restaurant shots (public/images). The LAST one is the hero
 * image that stays on screen.
 */
const SEQUENCE = [
  '/images/mekan/tabela.webp',
  '/images/mekan/giris.webp',
  '/images/mekan/teras.webp',
  '/images/yemek/karisik-deniz-mahsulu.webp',
  '/images/mekan/ahsap-detay.webp',
  '/images/mekan/sef-sofrasi.webp',
];
const HERO_IMG = '/images/mekan/salon.webp';
const SLIDES = [...SEQUENCE, HERO_IMG];

const SEEN_KEY = 'ib:hero-seen';
const START_SCALE = 0.55; // photos inside the small window
const HIDDEN = 'inset(0% 0% 100% 0%)';
const SHOWN = 'inset(0% 0% 0% 0%)';

const wasSeen = () => {
  try {
    return sessionStorage.getItem(SEEN_KEY) === '1';
  } catch {
    return false;
  }
};
const markSeen = () => {
  try {
    sessionStorage.setItem(SEEN_KEY, '1');
  } catch {
    /* ignore */
  }
};

export function Hero() {
  const t = useTranslations('hero');
  const stageRef = useRef<HTMLDivElement>(null);
  const slidesRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const overlayRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false); // all photos decoded (or timed out)
  const [revealed, setRevealed] = useState(false); // window fully open
  const skipIntro = useRef(false);

  // Start once every photo is in (images may finish before hydration, so
  // check .complete instead of relying on onLoad) — but never wait > 2.6s.
  useEffect(() => {
    const imgs = Array.from(stageRef.current?.querySelectorAll('img') ?? []);
    let alive = true;
    const loaded = imgs.map((img) =>
      img.complete
        ? Promise.resolve()
        : new Promise<void>((res) => {
            img.addEventListener('load', () => res(), { once: true });
            img.addEventListener('error', () => res(), { once: true });
          })
    );
    const timeout = new Promise<void>((res) => window.setTimeout(res, 2600));
    Promise.race([Promise.all(loaded), timeout]).then(() => alive && setReady(true));
    return () => {
      alive = false;
    };
  }, []);

  // Repeat visit in this tab / reduced motion → final state at once, just the text.
  useEffect(() => {
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!reduce && !wasSeen()) return;
    skipIntro.current = true;
    stageRef.current?.style.setProperty('clip-path', SHOWN);
    if (slidesRef.current) slidesRef.current.style.transform = 'none';
    slideRefs.current.forEach((s) => s?.style.setProperty('clip-path', SHOWN));
    if (overlayRef.current) overlayRef.current.style.opacity = '1';
    setRevealed(true);
  }, []);

  useEffect(() => {
    if (!ready || skipIntro.current) return;
    const stage = stageRef.current;
    const slidesEl = slidesRef.current;
    const overlay = overlayRef.current;
    const slides = slideRefs.current.filter(Boolean) as HTMLDivElement[];
    if (!stage || !slidesEl || !overlay || !slides.length) return;

    // Small window, centred. Sized in px so the inset() strings interpolate.
    const w = stage.clientWidth;
    const h = stage.clientHeight;
    const frameW = Math.min(440, Math.max(210, w * (w < 720 ? 0.58 : 0.24)));
    const frameH = frameW / 1.55;
    const x = (w - frameW) / 2;
    const y = (h - frameH) / 2;
    const small = `inset(${y}px ${x}px ${y}px ${x}px)`;
    const full = 'inset(0px 0px 0px 0px)';
    stage.style.clipPath = small;

    // Scroll lock while the intro plays; any input skips to the end.
    document.body.style.overflow = 'hidden';
    window.lenis?.stop();

    const seq: AnimationSequence = [];
    let at = 0;
    slides.forEach((s, i) => {
      const dur = Math.max(0.2, 0.62 - i * 0.07);
      seq.push([s, { clipPath: [HIDDEN, SHOWN] }, { duration: dur, at, ease: [0.76, 0, 0.24, 1] }]);
      at += dur * (i === 0 ? 0.85 : 0.6);
    });
    at += 0.2; // brief hold on the hero photo
    seq.push([stage, { clipPath: [small, full] }, { duration: 1.25, at, ease: [0.87, 0, 0.13, 1] }]);
    seq.push([slidesEl, { scale: [START_SCALE, 1] }, { duration: 1.25, at, ease: [0.87, 0, 0.13, 1] }]);
    seq.push([overlay, { opacity: [0, 1] }, { duration: 0.9, at: at + 0.45, ease: 'easeOut' }]);

    const controls = animate(seq);

    const unlock = () => {
      document.body.style.overflow = '';
      window.lenis?.start();
      removeSkip();
    };
    const skip = () => controls.complete();
    const events = ['wheel', 'touchstart', 'keydown'] as const;
    const removeSkip = () => events.forEach((e) => window.removeEventListener(e, skip));
    events.forEach((e) => window.addEventListener(e, skip, { passive: true }));

    // Kick the text off slightly before the window finishes opening.
    const textTimer = window.setTimeout(() => setRevealed(true), (at + 0.85) * 1000);
    controls.then(() => {
      window.clearTimeout(textTimer);
      setRevealed(true);
      markSeen();
      unlock();
    });

    return () => {
      window.clearTimeout(textTimer);
      controls.stop();
      unlock();
    };
  }, [ready]);

  const fade = (delay: number) => ({
    initial: { opacity: 0, y: 22 },
    animate: revealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 22 },
    transition: { duration: 1, delay, ease: [0.22, 1, 0.36, 1] as const },
  });

  return (
    <section className={`${styles.hero} darkSurface`} id="top">
      <div ref={stageRef} className={styles.stage} aria-hidden>
        <div ref={slidesRef} className={styles.slides}>
          {SLIDES.map((src, i) => {
            const last = i === SLIDES.length - 1;
            return (
              <div
                key={src}
                ref={(el) => {
                  slideRefs.current[i] = el;
                }}
                className={styles.slide}
              >
                <Image
                  src={src}
                  alt=""
                  fill
                  priority={last || i === 0}
                  loading={last || i === 0 ? undefined : 'eager'}
                  sizes={last ? '100vw' : '(max-width: 720px) 70vw, 40vw'}
                  className={styles.bgImg}
                />
              </div>
            );
          })}
        </div>
        <div ref={overlayRef} className={styles.overlay} />
      </div>

      <div className={styles.inner}>
        <TextReveal as="h1" className={styles.title} trigger="manual" play={revealed}>
          <span className={styles.l1}>{t('titleLine1')}</span>
          <span className={styles.l2}>{t('titleLine2')}</span>
        </TextReveal>

        <motion.p className={styles.intro} {...fade(0.45)}>
          {t('intro')}
        </motion.p>

        <motion.div {...fade(0.6)}>
          <SectionLink id="menu" className={styles.cta} data-magnetic data-cursor-label={t('cta')}>
            {t('cta')}
            <span className={styles.ctaArrow} aria-hidden>→</span>
          </SectionLink>
        </motion.div>
      </div>

      <motion.span
        className={styles.scrollCue}
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: revealed ? 1 : 0 }}
        transition={{ duration: 0.8, delay: 0.9 }}
      >
        <span className={styles.scrollLine} />
      </motion.span>
    </section>
  );
}
