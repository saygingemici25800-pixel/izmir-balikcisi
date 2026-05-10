'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import styles from './About.module.css';

const STATS = [
  { num: '35+', lbl: 'Yıllık masa' },
  { num: '0%',  lbl: 'Alkol' },
  { num: '124', lbl: 'Koltuk' }
];

export function About() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });

  // Parallax on the big number — opposite direction to body for editorial drift
  const yNum  = useTransform(scrollYProgress, [0, 1], [60, -180]);
  const yBody = useTransform(scrollYProgress, [0, 1], [0, -40]);

  return (
    <section className={styles.section} id="hikaye" ref={ref}>
      <header className={styles.header}>
        <span className="eyebrow">№ 02 — Hikâye</span>
        <span className={styles.rule} aria-hidden />
        <span className={styles.index}>1989 → 2026</span>
      </header>

      <div className={styles.grid}>
        <motion.div className={styles.numWrap} style={{ y: yNum }}>
          <div className={styles.numLabel}>İlk gün</div>
          <span className={styles.bigNum}>1989</span>
          <div className={styles.numLabel} style={{ marginTop: '1rem' }}>Bugün</div>
          <span className={styles.bigNumFill}>2026</span>
        </motion.div>

        <motion.div className={styles.body} style={{ y: yBody }}>
          <p className={styles.lead}>
            Bir <em>baba</em> ve oğul. Sabah dörtte hâl, akşam yedide ışıklar.
            Aralarındaki her şey: <em>balık</em>.
          </p>
          <p className={styles.copy}>
            İzmir Balıkçısı, otuz beş yıldır aynı kapıyı açıyor, aynı tabakları
            taşıyor. Burada içki yok; tıkırtı, kahkaha ve marine olmuş hamsi
            var. Çocuklarınızın elinden bırakmadığı limon, dedenizin anlattığı
            eski Muğla hikâyesi, garsonun ezbere bildiği masa numarası — hepsi
            tabağın bir parçası.
          </p>

          <div className={styles.stats}>
            {STATS.map((s) => (
              <div key={s.lbl} className={styles.stat}>
                <div className={`${styles.num} tabular`}>{s.num}</div>
                <div className={styles.lbl}>{s.lbl}</div>
              </div>
            ))}
          </div>

          <blockquote className={styles.pull}>
            “Buraya gelen kimse aceleyle çıkmadı. Deniz acele etmez,
            biz de etmeyiz.”
            <span className={styles.who}>Hasan Usta · Şef</span>
          </blockquote>
        </motion.div>
      </div>
    </section>
  );
}
