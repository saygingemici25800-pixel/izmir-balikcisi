'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import styles from './About.module.css';

const easeOut = [0.16, 1, 0.3, 1] as [number, number, number, number];

const stats = [
  { value: '15+', label: 'Yıllık Deneyim' },
  { value: 'Her gün', label: 'Taze Balık' },
  { value: '100%', label: 'Alkolsüz' },
  { value: '4', label: 'Nesil Tarif' },
];

const values = [
  { icon: '🌊', title: 'Taze & Doğal', desc: 'Her sabah İzmir körfezinden gelen taze deniz ürünleri, kimyasal katkısız.' },
  { icon: '👨‍👩‍👧‍👦', title: 'Aile Dostu', desc: 'Çocuklar dahil herkesin kendini rahat hissedeceği huzurlu bir sofra ortamı.' },
  { icon: '🌿', title: 'Alkolsüz Seçim', desc: 'Sağlıklı yaşamı destekleyen, herkesin rahatlıkla gelebileceği şeffaf bir mekan.' },
];

export default function About() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} id="hakkimizda" className={styles.about}>
      <div className={styles.container}>

        {/* ── Sol — Metin ── */}
        <div className={styles.textCol}>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: easeOut }}
          >
            <span className={styles.label}>
              <span className={styles.labelLine} />
              Hakkımızda
            </span>
          </motion.div>

          <motion.h2
            className={styles.title}
            initial={{ opacity: 0, y: 32 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: easeOut, delay: 0.1 }}
          >
            İzmir&apos;in<br />
            <span className={styles.titleAccent}>kalbinde</span>,<br />
            denizin tazesinde
          </motion.h2>

          <motion.p
            className={styles.desc}
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: easeOut, delay: 0.2 }}
          >
            İzmir Balıkçısı olarak yıllardır şehrin en taze deniz ürünlerini
            sofralarınıza taşıyoruz. Fethiye&apos;deki kardeş mekanımız Çalış
            Balıkçısı ile aynı kalite anlayışını, İzmir&apos;in aydınlık ruhuna
            uygun açık ve sıcak bir atmosferle sunuyoruz.
          </motion.p>

          <motion.p
            className={styles.desc}
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: easeOut, delay: 0.28 }}
          >
            Alkolsüz tercihimiz bir kısıtlama değil, bir seçim. Çocuklarınızla,
            ailenizle, her kesimiyle huzurla vakit geçirebileceğiniz bir sofra
            kurmak istedik.
          </motion.p>

          {/* Değerler */}
          <div className={styles.values}>
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                className={styles.valueCard}
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, ease: easeOut, delay: 0.35 + i * 0.1 }}
              >
                <span className={styles.valueIcon}>{v.icon}</span>
                <div>
                  <p className={styles.valueTitle}>{v.title}</p>
                  <p className={styles.valueDesc}>{v.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── Sağ — Görsel + Stats ── */}
        <div className={styles.visualCol}>
          {/* Placeholder görsel */}
          <motion.div
            className={styles.imageWrap}
            initial={{ opacity: 0, scale: 0.94 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.9, ease: easeOut, delay: 0.15 }}
          >
            <div className={styles.imagePlaceholder}>
              <span className={styles.imagePlaceholderIcon}>🐟</span>
              <span className={styles.imagePlaceholderText}>Restoran Fotoğrafı</span>
            </div>
            {/* Dekoratif çerçeve */}
            <div className={styles.imageFrame} />
          </motion.div>

          {/* Stats grid */}
          <motion.div
            className={styles.statsGrid}
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: easeOut, delay: 0.4 }}
          >
            {stats.map((s) => (
              <div key={s.label} className={styles.statCard}>
                <span className={styles.statValue}>{s.value}</span>
                <span className={styles.statLabel}>{s.label}</span>
              </div>
            ))}
          </motion.div>
        </div>

      </div>
    </section>
  );
}
