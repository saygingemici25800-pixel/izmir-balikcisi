'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import styles from './WhyAlcoholFree.module.css';

const easeOut = [0.16, 1, 0.3, 1] as [number, number, number, number];

const reasons = [
  {
    icon: '🌿',
    title: 'Sağlıklı Yaşam Seçimi',
    desc: 'Alkol tüketmek istemeyenler için yargısız, rahat bir alan. Herkes hoş geldiniz.',
    color: 'green',
  },
  {
    icon: '👧',
    title: 'Çocuklar Dahil Herkes',
    desc: 'Aileler çekinmeden gelebilir. Çocuklar için güvenli ve neşeli bir ortam.',
    color: 'sea',
  },
  {
    icon: '🤝',
    title: 'Şeffaf & Güvenilir',
    desc: 'Ne sunduğumuzu açıkça söylüyoruz. Gizli içerik yok, sürpriz yok.',
    color: 'sand',
  },
  {
    icon: '🍋',
    title: 'Zengin İçecek Seçeneği',
    desc: 'Taze sıkılmış meyve suları, ev yapımı limonatalar, şerbetler ve daha fazlası.',
    color: 'green',
  },
  {
    icon: '🕌',
    title: 'Herkesin Mekanı',
    desc: 'Dini veya kişisel tercih ne olursa olsun, aynı kaliteli hizmeti sunuyoruz.',
    color: 'sea',
  },
  {
    icon: '💚',
    title: 'Bilinçli Bir Tercih',
    desc: 'Alkolsüz olmak bizi sınırlamıyor — tam tersine, daha geniş bir topluluğa kapı açıyor.',
    color: 'sand',
  },
];

export default function WhyAlcoholFree() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} id="neden-alkolsuz" className={styles.section}>
      <div className={styles.container}>

        {/* Başlık */}
        <div className={styles.header}>
          <motion.span
            className={styles.label}
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: easeOut }}
          >
            <span className={styles.labelLine} />
            Neden Alkolsüz?
          </motion.span>

          <motion.h2
            className={styles.title}
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: easeOut, delay: 0.1 }}
          >
            Bir kısıtlama değil,<br />
            <span className={styles.titleAccent}>bilinçli bir seçim</span>
          </motion.h2>

          <motion.p
            className={styles.subtitle}
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: easeOut, delay: 0.18 }}
          >
            Alkolsüz olmayı özgürce seçtik. Bu tercih, daha geniş bir kitleyi
            ağırlamamızı ve herkesin kendini evinde hissetmesini sağlıyor.
          </motion.p>
        </div>

        {/* Kart Grid */}
        <div className={styles.grid}>
          {reasons.map((r, i) => (
            <motion.div
              key={r.title}
              className={`${styles.card} ${styles[`card_${r.color}`]}`}
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: easeOut, delay: 0.1 + i * 0.08 }}
            >
              <span className={styles.cardIcon}>{r.icon}</span>
              <h3 className={styles.cardTitle}>{r.title}</h3>
              <p className={styles.cardDesc}>{r.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Alt not */}
        <motion.div
          className={styles.note}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, ease: easeOut, delay: 0.7 }}
        >
          <span className={styles.noteIcon}>🐟</span>
          <p className={styles.noteText}>
            Fethiye&apos;deki kardeş mekanımız{' '}
            <a
              href="https://calis-balikcisi.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.noteLink}
            >
              Çalış Balıkçısı
            </a>{' '}
            ile aynı kalite felsefesini paylaşıyoruz.
          </p>
        </motion.div>

      </div>
    </section>
  );
}
