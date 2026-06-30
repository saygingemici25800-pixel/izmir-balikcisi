'use client';

import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import styles from './Gallery.module.css';

// Image sources + intrinsic dimensions stay in code; captions come from the
// `gallery.caps` messages. Dimensions let next/image reserve space (no CLS) and
// emit a responsive srcset (AVIF/WebP, downscaled per viewport).
const SHOTS = [
  { src: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=900&q=80', w: 900, h: 1200 },
  { src: 'https://images.unsplash.com/photo-1559737558-2f5a35f4523b?auto=format&fit=crop&w=900&q=80', w: 900, h: 600 },
  { src: 'https://images.unsplash.com/photo-1535007813616-79dc02ba4021?auto=format&fit=crop&w=900&q=80', w: 900, h: 900 },
  { src: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?auto=format&fit=crop&w=900&q=80', w: 900, h: 1100 },
  { src: 'https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?auto=format&fit=crop&w=900&q=80', w: 900, h: 600 },
  { src: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=900&q=80', w: 900, h: 1300 },
  { src: 'https://images.unsplash.com/photo-1559847844-5315695dadae?auto=format&fit=crop&w=900&q=80', w: 900, h: 700 },
  { src: 'https://images.unsplash.com/photo-1485921325833-c519f76c4927?auto=format&fit=crop&w=900&q=80', w: 900, h: 1100 },
  { src: 'https://images.unsplash.com/photo-1514516345957-556ca7d90a29?auto=format&fit=crop&w=900&q=80', w: 900, h: 600 }
];

const SIZES = '(max-width: 600px) 92vw, (max-width: 980px) 46vw, 30vw';

export function Gallery() {
  const t = useTranslations('gallery');
  const caps = t.raw('caps') as string[];
  const cap = (i: number) => caps[i] ?? '';

  const [open, setOpen] = useState<number | null>(null);
  const [shown, setShown] = useState(6);
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

      {shown < SHOTS.length && (
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
