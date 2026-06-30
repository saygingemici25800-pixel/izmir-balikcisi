'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { SectionLink } from '@/components/SectionLink';
import styles from './Hero.module.css';

// Full-bleed hero photo — Unsplash placeholder (swap for a real dish/ambiance shot).
const HERO_IMG =
  'https://images.unsplash.com/photo-1535007813616-79dc02ba4021?auto=format&fit=crop&w=1920&q=80';

const fade = (delay: number) => ({
  initial: { opacity: 0, y: 22 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 1, delay, ease: [0.22, 1, 0.36, 1] as const },
});

export function Hero() {
  const t = useTranslations('hero');
  return (
    <section className={`${styles.hero} darkSurface`} id="top">
      <div className={styles.bg} aria-hidden>
        <Image src={HERO_IMG} alt="" fill priority sizes="100vw" className={styles.bgImg} />
        <div className={styles.overlay} />
      </div>

      <div className={styles.inner}>
        <motion.h1 className={styles.title} {...fade(0.1)}>
          <span className={styles.l1}>{t('titleLine1')}</span>
          <span className={styles.l2}>{t('titleLine2')}</span>
        </motion.h1>

        <motion.p className={styles.intro} {...fade(0.26)}>
          {t('intro')}
        </motion.p>

        <motion.div {...fade(0.42)}>
          <SectionLink id="menu" className={styles.cta} data-magnetic data-cursor-label={t('cta')}>
            {t('cta')}
            <span className={styles.ctaArrow} aria-hidden>→</span>
          </SectionLink>
        </motion.div>
      </div>

      <span className={styles.scrollCue} aria-hidden>
        <span className={styles.scrollLine} />
      </span>
    </section>
  );
}
