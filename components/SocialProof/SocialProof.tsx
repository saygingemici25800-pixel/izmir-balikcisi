'use client';

import { motion } from 'framer-motion';
import styles from './SocialProof.module.css';
import { RESTAURANT } from '@/lib/constants';

const REVIEWS_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  `${RESTAURANT.name} ${RESTAURANT.address.full}`
)}`;

// Aggregate rating — PLACEHOLDER. Replace with the real Google Business figures.
const RATING = { score: 4.8, count: 1847 };

type Review = { name: string; meta: string; stars: number; text: string };

// PLACEHOLDER reviews — swap for real Google reviews when available.
const REVIEWS: Review[] = [
  {
    name: 'Mehmet A.',
    meta: 'Google · Yerel Rehber',
    stars: 5,
    text:
      'Levrek tam kıvamında, mezeler taptaze. Çocuklarla rahatça oturduk; alkolsüz olması bizim için büyük artı. Yıllardır ilk tercihimiz.',
  },
  {
    name: 'Selin K.',
    meta: 'Google · 3 hafta önce',
    stars: 5,
    text:
      'Ailecek otuz yıldır geliyoruz, tat hiç değişmedi. Garsonlar bizi isimle karşılıyor. Burası bir restoran değil, ikinci ev.',
  },
  {
    name: 'David R.',
    meta: 'Google · United Kingdom',
    stars: 4,
    text:
      'Best fresh fish in Fethiye. Honest prices, no alcohol but a warm, family atmosphere. The sea bass was perfect.',
  },
  {
    name: 'Hakan Y.',
    meta: 'Google · 1 ay önce',
    stars: 5,
    text:
      'Hâlden gelen balık ne demek burada anlıyorsunuz. Servis hızlı, porsiyonlar dolu. Pencere kenarı için erken gidin.',
  },
];

function Stars({ value, large = false }: { value: number; large?: boolean }) {
  const pct = Math.max(0, Math.min(100, (value / 5) * 100));
  return (
    <span
      className={`${styles.stars} ${large ? styles.starsLg : ''}`}
      role="img"
      aria-label={`${value} / 5 yıldız`}
    >
      <span className={styles.starsBase} aria-hidden>★★★★★</span>
      <span className={styles.starsFill} style={{ width: `${pct}%` }} aria-hidden>★★★★★</span>
    </span>
  );
}

const fade = {
  hidden: { opacity: 0, y: 28 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: 0.05 * i, ease: [0.22, 1, 0.36, 1] },
  }),
};

export function SocialProof() {
  return (
    <section className={styles.section} id="yorumlar">
      <header className={styles.header}>
        <span className="eyebrow">№ 05 — Misafir Sözü</span>
        <span className={styles.rule} aria-hidden />
        <span className={styles.meta}>
          <Stars value={RATING.score} /> {RATING.score.toLocaleString('tr-TR')} · Google
        </span>
      </header>

      <h2 className={styles.title}>
        Aynı sofra, <em>binlerce</em> akşam.
      </h2>

      {/* Rating + longevity summary */}
      <div className={styles.summary}>
        <motion.div
          className={styles.sumCard}
          variants={fade}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-10% 0px' }}
        >
          <div className={styles.ratingTop}>
            <span className={styles.bigNum}>{RATING.score.toLocaleString('tr-TR')}</span>
            <span className={styles.ratingOf}>/ 5</span>
          </div>
          <Stars value={RATING.score} large />
          <span className={styles.sumLbl}>
            {RATING.count.toLocaleString('tr-TR')} Google değerlendirmesi
          </span>
        </motion.div>

        <motion.div
          className={`${styles.sumCard} ${styles.expCard}`}
          variants={fade}
          custom={1}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-10% 0px' }}
        >
          <div className={styles.ratingTop}>
            <span className={styles.bigNumFill}>35</span>
            <span className={styles.ratingOf}>yıl</span>
          </div>
          <span className={styles.expLead}>Otuz beş yıllık deneyim</span>
          <span className={styles.sumLbl}>1989'dan bu yana aynı kapı, aynı sofra</span>
        </motion.div>
      </div>

      {/* Review cards */}
      <div className={styles.reviews}>
        {REVIEWS.map((r, i) => (
          <motion.article
            key={r.name}
            className={styles.card}
            variants={fade}
            custom={i}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-8% 0px' }}
          >
            <Stars value={r.stars} />
            <blockquote className={styles.quote}>{r.text}</blockquote>
            <footer className={styles.cardFoot}>
              <span className={styles.name}>{r.name}</span>
              <span className={styles.rMeta}>{r.meta}</span>
            </footer>
          </motion.article>
        ))}
      </div>

      <a
        className={styles.allLink}
        href={REVIEWS_URL}
        target="_blank"
        rel="noreferrer"
        data-magnetic
        data-cursor-label="Google"
      >
        Google'da tüm yorumlar <span className={styles.arrow} aria-hidden />
      </a>
    </section>
  );
}
