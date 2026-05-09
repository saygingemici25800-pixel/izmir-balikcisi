'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { RESTAURANT } from '@/data/constants';
import styles from './Contact.module.css';

const easeOut = [0.16, 1, 0.3, 1] as [number, number, number, number];

const infoItems = [
  {
    icon: '📍',
    label: 'Adres',
    value: RESTAURANT.address,
    action: { label: 'Haritada Aç', href: RESTAURANT.location.mapsUrl },
  },
  {
    icon: '📞',
    label: 'Telefon',
    value: RESTAURANT.phone,
    action: { label: 'Ara', href: `tel:${RESTAURANT.phone}` },
  },
  {
    icon: '🕐',
    label: 'Hafta İçi',
    value: RESTAURANT.hours.weekdays,
    action: null,
  },
  {
    icon: '🕐',
    label: 'Hafta Sonu',
    value: RESTAURANT.hours.weekends,
    action: null,
  },
];

export default function Contact() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} id="iletisim" className={styles.section}>
      <div className={styles.container}>

        {/* ── Sol — İletişim Bilgileri ── */}
        <div className={styles.infoCol}>
          <motion.span
            className={styles.label}
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: easeOut }}
          >
            <span className={styles.labelLine} />
            İletişim & Rezervasyon
          </motion.span>

          <motion.h2
            className={styles.title}
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: easeOut, delay: 0.1 }}
          >
            Sofranız<br />
            <span className={styles.titleAccent}>hazır, siz gelin</span>
          </motion.h2>

          <motion.p
            className={styles.desc}
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: easeOut, delay: 0.18 }}
          >
            Rezervasyon veya bilgi için bizi arayabilir, Instagram&apos;dan mesaj atabilirsiniz.
          </motion.p>

          {/* Bilgi listesi */}
          <div className={styles.infoList}>
            {infoItems.map((item, i) => (
              <motion.div
                key={item.label}
                className={styles.infoItem}
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.55, ease: easeOut, delay: 0.25 + i * 0.08 }}
              >
                <span className={styles.infoIcon}>{item.icon}</span>
                <div className={styles.infoText}>
                  <span className={styles.infoLabel}>{item.label}</span>
                  <span className={styles.infoValue}>{item.value}</span>
                </div>
                {item.action && (
                  <a
                    href={item.action.href}
                    className={styles.infoAction}
                    target={item.action.href.startsWith('http') ? '_blank' : undefined}
                    rel={item.action.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  >
                    {item.action.label}
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <path d="M2 8l6-6M3.5 2H8v4.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </a>
                )}
              </motion.div>
            ))}
          </div>

          {/* Sosyal medya */}
          <motion.div
            className={styles.social}
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: easeOut, delay: 0.6 }}
          >
            <a
              href={RESTAURANT.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialBtn}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <circle cx="12" cy="12" r="4"/>
                <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/>
              </svg>
              Instagram&apos;da Takip Et
            </a>
          </motion.div>
        </div>

        {/* ── Sağ — Harita Placeholder + Form ── */}
        <div className={styles.rightCol}>

          {/* Harita placeholder */}
          <motion.div
            className={styles.mapWrap}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, ease: easeOut, delay: 0.2 }}
          >
            <div className={styles.mapPlaceholder}>
              <span className={styles.mapPin}>📍</span>
              <p className={styles.mapText}>İzmir Haritası</p>
              <p className={styles.mapSub}>Adres netleşince Google Maps eklenecek</p>
              <a
                href={RESTAURANT.location.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.mapBtn}
              >
                Haritada Aç
              </a>
            </div>
          </motion.div>

          {/* Hızlı rezervasyon notu */}
          <motion.div
            className={styles.reservationCard}
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: easeOut, delay: 0.45 }}
          >
            <span className={styles.reservationIcon}>🍽️</span>
            <div>
              <p className={styles.reservationTitle}>Rezervasyon için bizi arayın</p>
              <p className={styles.reservationDesc}>
                Özel günler, doğum günleri ve grup rezervasyonları için lütfen önceden arayınız.
              </p>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
