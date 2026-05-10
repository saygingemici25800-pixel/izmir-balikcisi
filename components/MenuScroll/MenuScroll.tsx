'use client';

import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import { useRef, useState } from 'react';
import styles from './MenuScroll.module.css';

type Dish = {
  name: string;
  price: string;
  unit?: string;
  desc: string;
  tags: string[];
  img: string;
};

const DISHES: Dish[] = [
  {
    name: 'Karides Güveç',
    price: '420',
    unit: '₺',
    desc: 'Ege karidesi, kekik, kaşar, taze domates, fırında topraktan toprağa.',
    tags: ['fırın', 'meze'],
    img: 'https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?auto=format&fit=crop&w=900&q=80'
  },
  {
    name: 'Levrek Buğulama',
    price: '680',
    unit: '₺',
    desc: 'Sabah avlanmış levrek, sebze yatağı, limon zeytinyağı, kâğıtta.',
    tags: ['sıcak', 'bütün'],
    img: 'https://images.unsplash.com/photo-1535007813616-79dc02ba4021?auto=format&fit=crop&w=900&q=80'
  },
  {
    name: 'Çupra Izgara',
    price: '620',
    unit: '₺',
    desc: 'Açık ateş, çıtır kabuk, içi süt gibi. Yanında roka, soğan, nar.',
    tags: ['ızgara', 'bütün'],
    img: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=900&q=80'
  },
  {
    name: 'Hamsi Tava',
    price: '280',
    unit: '₺',
    desc: 'Karadeniz kavurması değil, Ege üslubu: tek katman, mısır unu, jiletle.',
    tags: ['tava', 'klasik'],
    img: 'https://images.unsplash.com/photo-1559737558-2f5a35f4523b?auto=format&fit=crop&w=900&q=80'
  },
  {
    name: 'Ahtapot Carpaccio',
    price: '380',
    unit: '₺',
    desc: 'İnce dilimlenmiş haşlanmış ahtapot, kapari, kişniş yağı, deniz tuzu.',
    tags: ['soğuk', 'meze'],
    img: 'https://images.unsplash.com/photo-1559847844-5315695dadae?auto=format&fit=crop&w=900&q=80'
  },
  {
    name: 'Kalkan Pane',
    price: '880',
    unit: '₺',
    desc: 'Mevsim başlangıcı. Kalın dilim, gevrek kırık galeta, tartar limonu.',
    tags: ['mevsim', 'şefin'],
    img: 'https://images.unsplash.com/photo-1485921325833-c519f76c4927?auto=format&fit=crop&w=900&q=80'
  }
];

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
                      {d.tags.map((t) => (
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
          <span className={`${styles.label} ${styles.labelRight}`}>Menünün tamamı →</span>
        </footer>
      </div>
    </section>
  );
}
