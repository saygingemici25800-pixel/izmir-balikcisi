'use client';

import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import styles from './Gallery.module.css';

// Image sources + intrinsic dimensions stay in code; captions come from the
// `gallery.caps` messages. Dimensions let next/image reserve space (no CLS) and
// emit a responsive srcset (AVIF/WebP, downscaled per viewport).
const SHOTS = [
  { src: '/images/mekan/giris.webp', w: 2272, h: 2428 },
  { src: '/images/mekan/sef-sofrasi.webp', w: 2472, h: 3076 },
  { src: '/images/mekan/salon.webp', w: 2120, h: 2696 },
  { src: '/images/yemek/levrek-lokum.webp', w: 1152, h: 2048 },
  { src: '/images/mekan/teras.webp', w: 2120, h: 2500 },
  { src: '/images/yemek/ahtapot-izgara.webp', w: 2048, h: 1152 },
  { src: '/images/mekan/salon-detay.webp', w: 2088, h: 2752 },
  { src: '/images/yemek/cupra-izgara.webp', w: 928, h: 1664 },
  { src: '/images/mekan/ahsap-detay.webp', w: 2084, h: 2744 },
];

const SIZES = '(max-width: 600px) 92vw, (max-width: 980px) 46vw, 30vw';

export function Gallery({ teaser = false }: { teaser?: boolean }) {
  const t = useTranslations('gallery');
  const caps = t.raw('caps') as string[];
  const cap = (i: number) => caps[i] ?? '';

  const [open, setOpen] = useState<number | null>(null);
  const [shown, setShown] = useState(teaser ? 5 : 6);
  const [loaded, setLoaded] = useState<Record<number, boolean>>({});
  const markLoaded = (i: number) => setLoaded((s) => (s[i] ? s : { ...s, [i]: true }));

  const close = useCallback(() => setOpen(null), []);
  const prev  = useCallback(() => setOpen((i) => (i === null ? null : (i - 1 + SHOTS.length) % SHOTS.length)), []);
  const next  = useCallback(() => setOpen((i) => (i === null ? null : (i + 1) % SHOTS.length)), []);

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      else if (e.key === 'ArrowLeft') prev();
      else if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, close, prev, next]);

  return (
    <section className={styles.section} id="galeri">
      <header className={styles.header}>
        <span className="eyebrow">{t('eyebrow')}</span>
        <span className={styles.rule} aria-hidden />
        <span className={styles.meta}>{t('frames', { count: SHOTS.length })}</span>
      </header>

      <motion.h2
        className={styles.title}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-10% 0px' }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        {t.rich('title', { em: (chunks) => <em>{chunks}</em> })}
      </motion.h2>

      <div className={styles.grid}>
        {SHOTS.slice(0, shown).map((s, i) => (
          <motion.button
            key={s.src}
            type="button"
            className={`${styles.item} ${loaded[i] ? styles.itemLoaded : ''}`}
            onClick={() => setOpen(i)}
            data-magnetic
            data-cursor-label={t('enlarge')}
            aria-label={t('enlargeAria', { cap: cap(i) })}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-8% 0px' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <Image
              className={styles.itemImg}
              src={s.src}
              alt={cap(i)}
              width={s.w}
              height={s.h}
              sizes={SIZES}
              onLoad={() => markLoaded(i)}
              onError={() => markLoaded(i)}
            />
            <span className={styles.itemMeta}>
              <span className={styles.itemNum}>{String(i + 1).padStart(2, '0')}</span>
              <span className={styles.itemCap}>{cap(i)}</span>
            </span>
          </motion.button>
        ))}
      </div>

      {!teaser && shown < SHOTS.length && (
        <div className={styles.more}>
          <button
            type="button"
            className={styles.moreBtn}
            onClick={() => setShown(SHOTS.length)}
            data-magnetic
            data-cursor-label={t('loadMore')}
          >
            {t('loadMore')}
          </button>
        </div>
      )}

      {teaser && (
        <div className={styles.more}>
          <Link href="/galeri" className={styles.seeAllLink} data-magnetic data-cursor-label={t('moreCta')}>
            {t('moreCta')} <span aria-hidden>→</span>
          </Link>
        </div>
      )}

      <AnimatePresence>
        {open !== null && (
          <motion.div
            className={styles.lightbox}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            role="dialog"
            aria-modal="true"
          >
            <div className={styles.lbHeader}>
              <span>{t('lbTitle')}</span>
              <button className={styles.close} onClick={close} aria-label={t('close')} data-magnetic />
            </div>

            <div className={styles.lbStage}>
              <button className={`${styles.nav} ${styles.prev}`} onClick={prev} aria-label={t('prev')} data-magnetic>‹</button>
              {/* Full-screen on-demand image — plain <img> (loaded only when opened) */}
              <motion.img
                key={SHOTS[open].src}
                className={styles.lbImg}
                src={SHOTS[open].src.replace('w=900', 'w=1600')}
                alt={cap(open)}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
              />
              <button className={`${styles.nav} ${styles.next}`} onClick={next} aria-label={t('next')} data-magnetic>›</button>
            </div>

            <div className={styles.lbFoot}>
              <span>{cap(open)}</span>
              <span className={styles.lbCounter}>
                {String(open + 1).padStart(2, '0')} / {String(SHOTS.length).padStart(2, '0')}
              </span>
              <span>{t('hint')}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
