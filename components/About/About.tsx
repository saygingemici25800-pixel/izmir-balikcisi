'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { RESTAURANT } from '@/lib/constants';
import styles from './About.module.css';

// Our Story photo — Unsplash placeholder (swap for a real archive/ambiance shot).
const STORY_IMG =
  'https://images.unsplash.com/photo-1559827260-dc66d52bef19?auto=format&fit=crop&w=1600&q=80';

const reveal = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-12% 0px' },
  transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const },
};

export function About({ teaser = false }: { teaser?: boolean }) {
  const t = useTranslations('about');

  // Home teaser — eyebrow + heading + one-line summary + photo + link to /hikaye.
  if (teaser) {
    return (
      <section className={styles.section} id="hikaye">
        <motion.div className={styles.head} {...reveal}>
          <span className="eyebrow">{t('eyebrow')}</span>
          <h2 className={styles.heading}>{t('heading')}</h2>
        </motion.div>

        <motion.div className={styles.photo} {...reveal}>
          <Image src={STORY_IMG} alt="" fill sizes="(max-width: 980px) 92vw, 1080px" className={styles.photoImg} />
        </motion.div>

        <motion.p className={styles.teaserText} {...reveal}>
          {t('teaser')}
        </motion.p>

        <motion.div className={styles.moreWrap} {...reveal}>
          <Link href="/hikaye" className={styles.more} data-magnetic data-cursor-label={t('moreCta')}>
            {t('moreCta')} <span aria-hidden>→</span>
          </Link>
        </motion.div>
      </section>
    );
  }

  return (
    <section className={styles.section} id="hikaye">
      <motion.div className={styles.head} {...reveal}>
        <span className="eyebrow">{t('eyebrow')}</span>
        <h2 className={styles.heading}>{t('heading')}</h2>
      </motion.div>

      <motion.div className={styles.photo} {...reveal}>
        <Image src={STORY_IMG} alt="" fill sizes="(max-width: 980px) 92vw, 1080px" className={styles.photoImg} />
      </motion.div>

      <div className={styles.columns}>
        <motion.div className={styles.body} {...reveal}>
          {t.rich('body', { p: (chunks) => <p>{chunks}</p> })}
        </motion.div>
        <motion.blockquote className={styles.quote} {...reveal}>
          {t('quote')}
        </motion.blockquote>
      </div>

      <motion.div className={styles.family} {...reveal}>
        <span className={styles.familyBadge} aria-hidden>0%</span>
        <h3 className={styles.familyTitle}>{t('familyTitle')}</h3>
        <p className={styles.familyBody}>{t('familyBody')}</p>
        <a
          className={styles.phone}
          href={`tel:${RESTAURANT.phoneE164}`}
          data-magnetic
          data-cursor-label={t('phoneCta')}
        >
          <span className={styles.phoneLabel}>{t('phoneCta')}</span>
          <span className={styles.phoneNum}>{RESTAURANT.phoneDisplay}</span>
        </a>
      </motion.div>
    </section>
  );
}
