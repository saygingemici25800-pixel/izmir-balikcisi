'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import styles from './Philosophy.module.css';

const reveal = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-12% 0px' },
  transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const },
};

export function Philosophy({ teaser = false }: { teaser?: boolean }) {
  const t = useTranslations('philosophy');

  // Home teaser — eyebrow + heading + italic lead + rule + link to /hikaye.
  if (teaser) {
    return (
      <section className={`${styles.section} darkSurface`} id="felsefe">
        <div className={styles.inner}>
          <motion.span className="eyebrow" {...reveal}>{t('eyebrow')}</motion.span>
          <motion.h2 className={styles.heading} {...reveal}>{t('heading')}</motion.h2>
          <motion.p className={styles.lead} {...reveal}>{t('lead')}</motion.p>
          <motion.span className={styles.rule} aria-hidden {...reveal} />
          <motion.div {...reveal}>
            <Link href="/hikaye" className={styles.more} data-magnetic data-cursor-label={t('moreCta')}>
              {t('moreCta')} <span aria-hidden>→</span>
            </Link>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section className={`${styles.section} darkSurface`} id="felsefe">
      <div className={styles.inner}>
        <motion.span className="eyebrow" {...reveal}>{t('eyebrow')}</motion.span>
        <motion.h2 className={styles.heading} {...reveal}>{t('heading')}</motion.h2>
        <motion.p className={styles.lead} {...reveal}>{t('lead')}</motion.p>
        <motion.span className={styles.rule} aria-hidden {...reveal} />
        <motion.div className={styles.body} {...reveal}>
          {t.rich('body', { p: (chunks) => <p>{chunks}</p> })}
        </motion.div>
        <motion.p className={styles.close} {...reveal}>{t('close')}</motion.p>
      </div>
    </section>
  );
}
