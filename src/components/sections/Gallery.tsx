'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import styles from './Gallery.module.css';

const easeOut = [0.16, 1, 0.3, 1] as [number, number, number, number];

// Gerçek fotoğraflar gelince buraya ekle
const GALLERY_ITEMS = [
  { id: 1, label: 'Taze Levrek', emoji: '🐟', span: 'tall' },
  { id: 2, label: 'Deniz Mezeler', emoji: '🦐', span: 'normal' },
  { id: 3, label: 'Restoran İç Mekan', emoji: '🏮', span: 'normal' },
  { id: 4, label: 'Taze Ahtapot', emoji: '🐙', span: 'wide' },
  { id: 5, label: 'Aile Sofrası', emoji: '🍽️', span: 'normal' },
  { id: 6, label: 'Sabah Balığı', emoji: '🌅', span: 'tall' },
];

export default function Gallery() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} id="galeri" className={styles.section}>
      <div className={styles.container}>

        <div className={styles.header}>
          <motion.span
            className={styles.label}
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: easeOut }}
          >
            <span className={styles.labelLine} />
            Galeri
          </motion.span>

          <motion.h2
            className={styles.title}
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: easeOut, delay: 0.1 }}
          >
            Gözlerinizle<br />
            <span className={styles.titleAccent}>tadını çıkarın</span>
          </motion.h2>
        </div>

        {/* Masonry-style grid */}
        <motion.div
          className={styles.grid}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {GALLERY_ITEMS.map((item, i) => (
            <motion.div
              key={item.id}
              className={`${styles.cell} ${styles[`cell_${item.span}`]}`}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, ease: easeOut, delay: 0.15 + i * 0.07 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className={styles.cellInner}>
                <span className={styles.cellEmoji}>{item.emoji}</span>
                <div className={styles.cellOverlay}>
                  <span className={styles.cellLabel}>{item.label}</span>
                  <span className={styles.cellSub}>Fotoğraf yakında</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.p
          className={styles.note}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          📸 Gerçek fotoğraflar yakında eklenecek
        </motion.p>

      </div>
    </section>
  );
}
