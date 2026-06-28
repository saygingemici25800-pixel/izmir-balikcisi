'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import styles from './Hero.module.css';

const splitChars = (word: string) =>
  Array.from(word).map((ch, i) => ({ ch, key: `${ch}-${i}` }));

const charVariants = {
  hidden: { y: '110%', opacity: 0 },
  show: (i: number) => ({
    y: '0%',
    opacity: 1,
    transition: {
      duration: 0.9,
      delay: 0.25 + i * 0.05,
      ease: [0.22, 1, 0.36, 1]
    }
  })
};

function Line({ word, variant }: { word: string; variant: 'aqua' | 'outline' }) {
  return (
    <span className={`${styles.line} ${variant === 'aqua' ? styles.aqua : styles.outline}`} dir="ltr">
      {splitChars(word).map(({ ch, key }, i) => (
        <motion.span
          key={key}
          className={styles.char}
          custom={i}
          variants={charVariants}
          initial="hidden"
          animate="show"
          aria-hidden
        >
          {ch}
        </motion.span>
      ))}
      <span className="sr-only" style={{ position: 'absolute', clip: 'rect(0 0 0 0)' }}>{word}</span>
    </span>
  );
}

export function Hero() {
  const t = useTranslations('hero');
  return (
    <section className={styles.hero} id="top">
      <h1 className="sr-only">{t('h1')}</h1>
      <div className={styles.ribbon} aria-hidden />

      <header className={styles.topMeta}>
        <span>{t('metaLeft')}</span>
        <span className={styles.rule} aria-hidden />
        <span className={styles.pin}>
          <span className={styles.dot} aria-hidden /> {t('pin')}
        </span>
      </header>

      <div className={styles.typeBlock}>
        {/* Brand wordmark — not translated */}
        <Line word="İZMİR" variant="aqua" />
        <div className={styles.lineB}>
          <Line word="BALIKÇISI" variant="outline" />
        </div>
        <span className={styles.sideLabel}>{t('sideLabel')}</span>
      </div>

      <div className={styles.sub}>
        <p className={styles.lede}>
          {t.rich('lede', { em: (chunks) => <em>{chunks}</em> })}
        </p>
      </div>

      <footer className={styles.bottomMeta}>
        <span>{t('coords')}</span>
        <span className={styles.col2}>
          <span className={styles.scrollCue}>
            {t('scroll')} <span className={styles.scrollLine} aria-hidden />
          </span>
        </span>
        <span className={styles.col3}>{t('bottomRight')}</span>
      </footer>
    </section>
  );
}
