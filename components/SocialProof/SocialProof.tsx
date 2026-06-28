'use client';

import { motion } from 'framer-motion';
import { useLocale, useTranslations } from 'next-intl';
import styles from './SocialProof.module.css';
import { RESTAURANT } from '@/lib/constants';

const REVIEWS_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  `${RESTAURANT.name} ${RESTAURANT.address.full}`
)}`;

// Aggregate rating — PLACEHOLDER. Replace with the real Google Business figures.
const RATING = { score: 4.8, count: 1847 };
// Per-review star count (the review text comes from the `reviews.items` messages).
const STARS = [5, 5, 4, 5];

function Stars({ value, large = false, ariaLabel }: { value: number; large?: boolean; ariaLabel: string }) {
  const pct = Math.max(0, Math.min(100, (value / 5) * 100));
  return (
    <span className={`${styles.stars} ${large ? styles.starsLg : ''}`} role="img" aria-label={ariaLabel}>
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
  const t = useTranslations('reviews');
  const locale = useLocale();
  const numLocale = locale === 'tr' ? 'tr-TR' : locale === 'ar' ? 'ar-u-nu-latn' : 'en-US';
  const fmt = (n: number) => n.toLocaleString(numLocale);
  const reviews = t.raw('items') as { name: string; meta: string; text: string }[];
  const starLabel = (v: number) => t('starsAria', { value: v });

  return (
    <section className={styles.section} id="yorumlar">
      <header className={styles.header}>
        <span className="eyebrow">{t('eyebrow')}</span>
        <span className={styles.rule} aria-hidden />
        <span className={styles.meta}>
          <Stars value={RATING.score} ariaLabel={starLabel(RATING.score)} /> {fmt(RATING.score)} · {t('google')}
        </span>
      </header>

      <h2 className={styles.title}>
        {t.rich('title', { em: (chunks) => <em>{chunks}</em> })}
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
            <span className={styles.bigNum}>{fmt(RATING.score)}</span>
            <span className={styles.ratingOf}>{t('ratingOf')}</span>
          </div>
          <Stars value={RATING.score} large ariaLabel={starLabel(RATING.score)} />
          <span className={styles.sumLbl}>{t('ratingReviews', { count: fmt(RATING.count) })}</span>
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
            <span className={styles.ratingOf}>{t('expYears')}</span>
          </div>
          <span className={styles.expLead}>{t('expLead')}</span>
          <span className={styles.sumLbl}>{t('expSub')}</span>
        </motion.div>
      </div>

      {/* Review cards */}
      <div className={styles.reviews}>
        {reviews.map((r, i) => (
          <motion.article
            key={r.name}
            className={styles.card}
            variants={fade}
            custom={i}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-8% 0px' }}
          >
            <Stars value={STARS[i] ?? 5} ariaLabel={starLabel(STARS[i] ?? 5)} />
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
        data-cursor-label={t('google')}
      >
        {t('allReviews')} <span className={styles.arrow} aria-hidden />
      </a>
    </section>
  );
}
