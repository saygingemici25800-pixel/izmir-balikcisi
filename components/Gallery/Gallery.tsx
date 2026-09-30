'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useCallback, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useLocale, useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { pickLocale } from '@/lib/menu';
import { MEZE, SEA, TEASER, VENUE, type GalleryShot } from '@/lib/gallery';
import { MakeWayGrid, type MakeWayConfig } from './MakeWayGrid';
import styles from './Gallery.module.css';

type Group = {
  key: 'venue' | 'meze' | 'sea';
  shots: GalleryShot[];
  variant: 'default' | 'teaser' | 'medium' | 'narrow' | 'dense';
  config: Partial<MakeWayConfig>;
};

// Full /galeri page — three grids, each with its own "make way" character
// (same idea as the Codrops demo: calm / elastic / skewed).
const GROUPS: Group[] = [
  { key: 'venue', shots: VENUE, variant: 'medium', config: { scale: 1.6, maxRotation: 8, spread: 70, maxDistance: 1400, duration: 0.8 } },
  { key: 'meze', shots: MEZE, variant: 'narrow', config: { scale: 3, maxRotation: 18, spread: 150, maxDistance: 700, duration: 1, ease: 'elastic' } },
  { key: 'sea', shots: SEA, variant: 'dense', config: { scale: 3, maxRotation: 10, skew: 10, spread: 120, maxDistance: 600, duration: 0.6, ease: 'power3' } },
];

const TOTAL = VENUE.length + MEZE.length + SEA.length;

export function Gallery({ teaser = false }: { teaser?: boolean }) {
  const t = useTranslations('gallery');
  const locale = useLocale();
  const capOf = useCallback((s: GalleryShot) => pickLocale(s.cap, locale), [locale]);

  const [open, setOpen] = useState<{ list: GalleryShot[]; index: number } | null>(null);
  const current = open ? open.list[open.index] : null;
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const close = useCallback(() => setOpen(null), []);
  const prev = useCallback(
    () => setOpen((o) => (o ? { ...o, index: (o.index - 1 + o.list.length) % o.list.length } : o)),
    []
  );
  const next = useCallback(() => setOpen((o) => (o ? { ...o, index: (o.index + 1) % o.list.length } : o)), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      else if (e.key === 'ArrowLeft') prev();
      else if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    window.lenis?.stop();
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
      window.lenis?.start();
    };
  }, [open, close, prev, next]);

  const grid = (shots: GalleryShot[], variant: Group['variant'] = 'default', config?: Partial<MakeWayConfig>) => (
    <MakeWayGrid
      shots={shots}
      captions={shots.map(capOf)}
      variant={variant}
      config={config}
      openLabel={(cap) => t('enlargeAria', { cap })}
      onOpen={(index) => setOpen({ list: shots, index })}
    />
  );

  return (
    <section className={styles.section} id="galeri">
      <header className={styles.header}>
        <span className="eyebrow">{t('eyebrow')}</span>
        <span className={styles.rule} aria-hidden />
        <span className={styles.meta}>{t('frames', { count: teaser ? TEASER.length : TOTAL })}</span>
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

      {teaser ? (
        <>
          {grid(TEASER, 'teaser')}
          <p className={styles.mwHint}>{t('hint2')}</p>
          <div className={styles.more}>
            <Link href="/galeri" className={styles.seeAllLink} data-magnetic data-cursor-label={t('moreCta')}>
              {t('moreCta')} <span aria-hidden>→</span>
            </Link>
          </div>
        </>
      ) : (
        GROUPS.map((g) => (
          <div key={g.key} className={styles.group}>
            <h3 className={styles.groupTitle}>
              {t(`groups.${g.key}`)}
              <span className={styles.groupCount}>{String(g.shots.length).padStart(2, '0')}</span>
            </h3>
            {grid(g.shots, g.variant, g.config)}
          </div>
        ))
      )}

      {mounted && createPortal(
      <AnimatePresence>
        {open !== null && current && (
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
                key={current.src}
                className={styles.lbImg}
                src={current.src}
                alt={capOf(current)}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
              />
              <button className={`${styles.nav} ${styles.next}`} onClick={next} aria-label={t('next')} data-magnetic>›</button>
            </div>

            <div className={styles.lbFoot}>
              <span>{capOf(current)}</span>
              <span className={styles.lbCounter}>
                {String(open.index + 1).padStart(2, '0')} / {String(open.list.length).padStart(2, '0')}
              </span>
              <span>{t('hint')}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>,
      document.body
      )}
    </section>
  );
}
