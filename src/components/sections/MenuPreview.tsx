'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';
import { MENU_DATA } from '@/data/menu';
import styles from './MenuPreview.module.css';

const easeOut = [0.16, 1, 0.3, 1] as [number, number, number, number];

export default function MenuPreview() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [activeTab, setActiveTab] = useState(MENU_DATA[0].id);

  const activeCategory = MENU_DATA.find((c) => c.id === activeTab)!;

  return (
    <section ref={ref} id="menu" className={styles.section}>
      {/* Üst dalga */}
      <div className={styles.waveTop} aria-hidden="true">
        <svg viewBox="0 0 1440 60" fill="none" preserveAspectRatio="none">
          <path d="M0 30 C360 60 720 0 1080 30 C1260 45 1380 20 1440 30 L1440 0 L0 0 Z" fill="var(--cream-50)" />
        </svg>
      </div>

      <div className={styles.container}>
        {/* Başlık */}
        <div className={styles.header}>
          <motion.span
            className={styles.label}
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: easeOut }}
          >
            <span className={styles.labelLine} />
            Menümüz
          </motion.span>

          <motion.h2
            className={styles.title}
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: easeOut, delay: 0.1 }}
          >
            Günlük Taze<br />
            <span className={styles.titleAccent}>Deniz Sofrasını</span>
          </motion.h2>

          <motion.p
            className={styles.subtitle}
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: easeOut, delay: 0.2 }}
          >
            Her gün değişen taze balıklar, geleneksel mezeler ve taze içecekler.
          </motion.p>
        </div>

        {/* Kategori Tabları */}
        <motion.div
          className={styles.tabs}
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: easeOut, delay: 0.25 }}
        >
          {MENU_DATA.map((cat) => (
            <button
              key={cat.id}
              className={`${styles.tab} ${activeTab === cat.id ? styles.tabActive : ''}`}
              onClick={() => setActiveTab(cat.id)}
            >
              <span>{cat.emoji}</span>
              <span>{cat.name}</span>
            </button>
          ))}
        </motion.div>

        {/* Item Kartları */}
        <motion.div
          className={styles.grid}
          key={activeTab}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: easeOut }}
        >
          {activeCategory.items.map((item, i) => (
            <motion.div
              key={item.id}
              className={styles.card}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: easeOut, delay: i * 0.07 }}
            >
              <div className={styles.cardVisual}>
                <span className={styles.cardIcon}>{activeCategory.emoji}</span>
              </div>
              <div className={styles.cardBody}>
                <div className={styles.cardTop}>
                  <h3 className={styles.cardName}>{item.name}</h3>
                  <span className={styles.cardPrice}>
                    {item.price ? `${item.price} ₺` : 'Günlük fiyat'}
                  </span>
                </div>
                <p className={styles.cardDesc}>{item.description}</p>
                {item.tags && (
                  <div className={styles.tags}>
                    {item.tags.map((tag) => (
                      <span key={tag} className={styles.tag}>{tag}</span>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Tam Menü CTA */}
        <motion.div
          className={styles.cta}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, ease: easeOut, delay: 0.5 }}
        >
          <Link href="/menu" className={styles.ctaBtn}>
            Tüm Menüyü Gör
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
          <p className={styles.ctaNote}>* Balık fiyatları günlük piyasaya göre değişmektedir.</p>
        </motion.div>
      </div>

      {/* Alt dalga */}
      <div className={styles.waveBottom} aria-hidden="true">
        <svg viewBox="0 0 1440 60" fill="none" preserveAspectRatio="none">
          <path d="M0 30 C360 0 720 60 1080 30 C1260 15 1380 40 1440 30 L1440 60 L0 60 Z" fill="var(--cream-50)" />
        </svg>
      </div>
    </section>
  );
}
