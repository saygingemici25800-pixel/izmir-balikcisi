'use client';

import { motion } from 'framer-motion';
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
    <span className={`${styles.line} ${variant === 'aqua' ? styles.aqua : styles.outline}`}>
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
  return (
    <section className={styles.hero} id="top">
      <div className={styles.ribbon} aria-hidden />

      <header className={styles.topMeta}>
        <span>№ 001 / Est. 1989</span>
        <span className={styles.rule} aria-hidden />
        <span className={styles.pin}>
          <span className={styles.dot} aria-hidden /> Fethiye · Açık · 10.30—22.30
        </span>
      </header>

      <div className={styles.typeBlock}>
        <Line word="İZMİR" variant="aqua" />
        <div className={styles.lineB}>
          <Line word="BALIKÇISI" variant="outline" />
        </div>
        <span className={styles.sideLabel}>Otuz Beş Yıllık Sofra · Vol. XXXV</span>
      </div>

      <div className={styles.sub}>
        <p className={styles.lede}>
          Muğla'da otuz beş yıllık <em>alkolsüz</em> bir ev. Çocukların kahkahası,
          büyüklerin sessizliği ve mutfakta bugün ne pişiyorsa. Bir editorial
          değil; bir <em>tabak</em>.
        </p>
        <dl className={styles.card + ' glass'}>
          <dt>Gün</dt>
          <dd>Levrek, çupra, mezgit</dd>
          <dt>Mevsim</dt>
          <dd>Kalkan başlıyor</dd>
          <dt>Saat</dt>
          <dd>10.30 — 22.30</dd>
        </dl>
      </div>

      <footer className={styles.bottomMeta}>
        <span>36.6536° K / 29.1268° D</span>
        <span className={styles.col2}>
          <span className={styles.scrollCue}>
            Kaydır <span className={styles.scrollLine} aria-hidden />
          </span>
        </span>
        <span className={styles.col3}>Fethiye / Muğla · Bahar 2026</span>
      </footer>
    </section>
  );
}
