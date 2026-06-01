'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useCallback, useEffect, useState } from 'react';
import styles from './Gallery.module.css';

type Shot = { src: string; cap: string; w: number; h: number };

const SHOTS: Shot[] = [
  { src: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=900&q=80', cap: 'Çupra',     w: 900, h: 1200 },
  { src: 'https://images.unsplash.com/photo-1559737558-2f5a35f4523b?auto=format&fit=crop&w=900&q=80',  cap: 'Hamsi',     w: 900, h: 600  },
  { src: 'https://images.unsplash.com/photo-1535007813616-79dc02ba4021?auto=format&fit=crop&w=900&q=80', cap: 'Levrek',    w: 900, h: 900  },
  { src: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?auto=format&fit=crop&w=900&q=80',  cap: 'Avlu',      w: 900, h: 1100 },
  { src: 'https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?auto=format&fit=crop&w=900&q=80',  cap: 'Karides',   w: 900, h: 600  },
  { src: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=900&q=80',  cap: 'Masa',      w: 900, h: 1300 },
  { src: 'https://images.unsplash.com/photo-1559847844-5315695dadae?auto=format&fit=crop&w=900&q=80',  cap: 'Ahtapot',   w: 900, h: 700  },
  { src: 'https://images.unsplash.com/photo-1485921325833-c519f76c4927?auto=format&fit=crop&w=900&q=80',  cap: 'Kalkan',    w: 900, h: 1100 },
  { src: 'https://images.unsplash.com/photo-1514516345957-556ca7d90a29?auto=format&fit=crop&w=900&q=80',  cap: 'Mutfak',    w: 900, h: 600  }
];

export function Gallery() {
  const [open, setOpen] = useState<number | null>(null);
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
        <span className="eyebrow">№ 06 — Galeri</span>
        <span className={styles.rule} aria-hidden />
        <span className={styles.meta}>{SHOTS.length} kare</span>
      </header>

      <motion.h2
        className={styles.title}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-10% 0px' }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        Bir akşam, <em>dokuz kare</em>
      </motion.h2>

      <div className={styles.grid}>
        {SHOTS.map((s, i) => (
          <motion.button
            key={s.src}
            type="button"
            className={`${styles.item} ${loaded[i] ? styles.itemLoaded : ''}`}
            onClick={() => setOpen(i)}
            data-magnetic
            data-cursor-label="Büyüt"
            aria-label={`${s.cap} fotoğrafını büyüt`}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-8% 0px' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <img
              className={styles.itemImg}
              src={s.src}
              alt={s.cap}
              loading="lazy"
              onLoad={() => markLoaded(i)}
              onError={() => markLoaded(i)}
            />
            <span className={styles.itemMeta}>
              <span className={styles.itemNum}>{String(i + 1).padStart(2, '0')}</span>
              <span className={styles.itemCap}>{s.cap}</span>
            </span>
          </motion.button>
        ))}
      </div>

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
              <span>İzmir Balıkçısı / Galeri</span>
              <button className={styles.close} onClick={close} aria-label="Kapat" data-magnetic />
            </div>

            <div className={styles.lbStage}>
              <button className={`${styles.nav} ${styles.prev}`} onClick={prev} aria-label="Önceki" data-magnetic>‹</button>
              <motion.img
                key={SHOTS[open].src}
                className={styles.lbImg}
                src={SHOTS[open].src.replace('w=900', 'w=1600')}
                alt={SHOTS[open].cap}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
              />
              <button className={`${styles.nav} ${styles.next}`} onClick={next} aria-label="Sonraki" data-magnetic>›</button>
            </div>

            <div className={styles.lbFoot}>
              <span>{SHOTS[open].cap}</span>
              <span className={styles.lbCounter}>
                {String(open + 1).padStart(2, '0')} / {String(SHOTS.length).padStart(2, '0')}
              </span>
              <span>← → / Esc</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
