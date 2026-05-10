'use client';

import { motion } from 'framer-motion';
import styles from './Manifesto.module.css';

const LINES: { text: React.ReactNode; variant?: 'large' | 'right' }[] = [
  { text: <>Burada <em>alkol</em> yok.</>, variant: 'large' },
  { text: <>Çünkü bir çocuğun kahkahası, bir ebeveynin sessizliği ve iyi pişmiş bir balık <em>zaten yeter</em>.</> },
  { text: <>Akşam yemeği, kafayı bulmak değil; <em>birbirini</em> bulmaktır.</>, variant: 'right' },
  { text: <>Tabağın asıl tadı, sandalyenin altındaki ayaklarını sallayan <em>torundadır</em>.</> },
  { text: <>Buradayız. Adres saymaya gerek yok. <em>Sadece otur.</em></>, variant: 'large' }
];

const fade = {
  hidden: { opacity: 0, y: 40 },
  show:   { opacity: 1, y: 0, transition: { duration: 1, ease: [0.22, 1, 0.36, 1] } }
};

export function Manifesto() {
  return (
    <section className={styles.section} id="manifesto">
      <div className={styles.frame}>
        <aside className={styles.aside}>
          <span className="eyebrow">№ 04</span>
          <span className={styles.num}>0%</span>
          <span className={styles.lbl}>Alkolsüz<br />Manifesto</span>
        </aside>

        <div>
          <motion.h2
            className={styles.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-15% 0px' }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <strong>Neden</strong> alkolsüz?
          </motion.h2>

          <div className={styles.lines}>
            {LINES.map((l, i) => (
              <motion.p
                key={i}
                className={`${styles.line} ${l.variant ? styles[l.variant] : ''}`}
                variants={fade}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: '-20% 0px' }}
              >
                {l.text}
              </motion.p>
            ))}
          </div>

          <motion.div
            className={styles.sig}
            variants={fade}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <span>Editöryal not</span>
            <span className={styles.auto}>— İzmir Balıkçısı</span>
            <span>Bahar · 2026</span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
