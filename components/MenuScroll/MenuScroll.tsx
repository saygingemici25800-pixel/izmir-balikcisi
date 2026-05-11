'use client';

import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import { useRef, useState } from 'react';
import Link from 'next/link';
import styles from './MenuScroll.module.css';
import { featuredItems } from '@/lib/menu';

const DISHES = featuredItems().filter((d) => d.img);

export function MenuScroll() {
  const outerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  const { scrollYProgress } = useScroll({
    target: outerRef,
    offset: ['start start', 'end end']
  });

  // travel: enough to expose all cards.
  // cards * cardWidth - viewport ≈ (N-1) * 100vw for safety
  const x = useTransform(scrollYProgress, [0, 1], ['0vw', `-${(DISHES.length - 1) * 32}vw`]);

  useMotionValueEvent(scrollYProgress, 'change', (v) => setProgress(v));

  return (
    <section
      className={styles.outer}
      id="menu"
      ref={outerRef}
      style={{ height: `${DISHES.length * 80}vh` }}
    >
      <div className={styles.sticky}>
        <header className={styles.header}>
          <span className="eyebrow">№ 03 — Menü</span>
          <span className={styles.rule} aria-hidden />
          <span className={styles.meta}>Mevsim · Bahar 2026</span>
        </header>

        <h2 className={styles.title}>
          Bugünün <em>tabakları</em>
          <span className={styles.titleSub}>Yatay kaydır</span>
        </h2>

        <div className={styles.trackWrap}>
          <motion.div className={styles.track} style={{ x }}>
            {DISHES.map((d, i) => (
              <article
                key={d.name}
                className={styles.card}
                data-magnetic
                data-cursor-label="Detay"
              >
                <div className={styles.cardTop}>
                  <span className={styles.num}>№ {String(i + 1).padStart(2, '0')}</span>
                  <span>Sıcak / Soğuk</span>
                </div>

                <div
                  className={styles.thumb}
                  style={{ backgroundImage: `url(${d.img})` }}
                  role="img"
                  aria-label={d.name}
                />

                <div>
                  <h3 className={styles.dishName}>{d.name}</h3>
                  <div className={styles.dishMeta}>
                    <div className={styles.tags}>
                      {(d.tags ?? []).map((t) => (
                        <span key={t} className={styles.tag}>{t}</span>
                      ))}
                    </div>
                    <div className={styles.price}>
                      {d.price}<span className={styles.priceSm}>{d.unit}</span>
                    </div>
                  </div>
                  <p className={styles.desc}>{d.desc}</p>
                </div>
              </article>
            ))}
          </motion.div>
        </div>

        <footer className={styles.foot}>
          <span className={styles.label}>{DISHES.length} tabak</span>
          <div className={styles.meter}>
            <div className={styles.meterFill} style={{ width: `${progress * 100}%` }} />
          </div>
          <Link href="/menu" className={`${styles.label} ${styles.labelRight}`} data-magnetic data-cursor-label="Tüm menü">
            Menünün tamamı →
          </Link>
        </footer>
      </div>
    </section>
  );
}
