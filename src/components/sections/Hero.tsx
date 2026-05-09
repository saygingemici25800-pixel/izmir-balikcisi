'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, type Variants } from 'framer-motion';
import Link from 'next/link';
import { RESTAURANT, SISTER_VENUE } from '@/data/constants';
import styles from './Hero.module.css';

// ─── Ease Curve ───────────────────────────────────────────────────────────────

const easeOut = [0.16, 1, 0.3, 1] as [number, number, number, number];

// ─── Animasyon Varyantları ────────────────────────────────────────────────────

const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.3,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 32 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: easeOut },
  },
};

const lineVariants: Variants = {
  hidden: { scaleX: 0, originX: 0 },
  show: {
    scaleX: 1,
    transition: { duration: 1.0, ease: easeOut, delay: 0.2 },
  },
};

// ─── Scroll Indicator ─────────────────────────────────────────────────────────

function ScrollIndicator() {
  return (
    <motion.div
      className={styles.scrollIndicator}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.8, duration: 0.6 }}
    >
      <motion.div
        className={styles.scrollDot}
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
      />
      <span className={styles.scrollText}>Aşağı Kaydır</span>
    </motion.div>
  );
}

// ─── Floating Badge ───────────────────────────────────────────────────────────

function AlkholsuzbBadge() {
  return (
    <motion.div
      className={styles.badge}
      initial={{ opacity: 0, scale: 0.8, rotate: -8 }}
      animate={{ opacity: 1, scale: 1, rotate: -6 }}
      transition={{ delay: 1.2, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ scale: 1.05, rotate: -4 }}
    >
      <span className={styles.badgeIcon}>🌿</span>
      <span className={styles.badgeText}>100% Alkolsüz</span>
    </motion.div>
  );
}

// ─── Ana Hero Component ───────────────────────────────────────────────────────

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollY } = useScroll();
  const contentY     = useTransform(scrollY, [0, 600], [0, -60]);
  const contentOpacity = useTransform(scrollY, [0, 400], [1, 0]);

  return (
    <section ref={heroRef} className={styles.hero} aria-label="Ana Hero">

      {/* ── Gradient Overlay ── */}
      <div className={styles.overlay} aria-hidden="true" />

      {/* ── Işık Huzmeleri ── */}
      <div className={styles.rays} aria-hidden="true">
        <div className={styles.ray} />
        <div className={styles.ray} />
        <div className={styles.ray} />
      </div>

      {/* ── İçerik ── */}
      <motion.div
        className={styles.content}
        style={{ y: contentY, opacity: contentOpacity }}
      >
        <motion.div
          className={styles.inner}
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >

          {/* Üst etiket */}
          <motion.div className={styles.topLabel} variants={itemVariants}>
            <motion.span className={styles.labelLine} variants={lineVariants} />
            <span className={styles.labelText}>İzmir · Taze · Aile Dostu</span>
            <motion.span className={styles.labelLine} variants={lineVariants} />
          </motion.div>

          {/* Ana başlık */}
          <motion.h1 className={styles.title} variants={itemVariants}>
            <span className={styles.titleTop}>İzmir</span>
            <span className={styles.titleMain}>Balıkçısı</span>
          </motion.h1>

          {/* Alt başlık */}
          <motion.p className={styles.tagline} variants={itemVariants}>
            {RESTAURANT.tagline}
          </motion.p>

          {/* Açıklama */}
          <motion.p className={styles.description} variants={itemVariants}>
            Denizin taze nefesi, sofranıza yansıyor.<br />
            Alkolsüz, huzurlu, aile sofrası.
          </motion.p>

          {/* CTA Butonları */}
          <motion.div className={styles.cta} variants={itemVariants}>
            <Link href="/menu" className={styles.btnPrimary}>
              <span>Menüyü Keşfet</span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
            <Link href="#iletisim" className={styles.btnOutline}>
              Rezervasyon
            </Link>
          </motion.div>

          {/* Kardeş mekan linki */}
          <motion.div className={styles.sisterLink} variants={itemVariants}>
            <span className={styles.sisterText}>Kardeş mekanımız:</span>
            <a
              href={SISTER_VENUE.url}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.sisterBtn}
            >
              {SISTER_VENUE.name} · {SISTER_VENUE.location}
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M2.5 9.5l7-7M4 2.5h5.5V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </motion.div>

        </motion.div>

        {/* Floating badge */}
        <AlkholsuzbBadge />
      </motion.div>

      {/* ── Scroll Indicator ── */}
      <ScrollIndicator />

      {/* ── Alt dalga geçişi ── */}
      <div className={styles.waveBottom} aria-hidden="true">
        <svg viewBox="0 0 1440 80" fill="none" preserveAspectRatio="none">
          <path
            d="M0 40 C240 0 480 80 720 40 C960 0 1200 80 1440 40 L1440 80 L0 80 Z"
            fill="var(--cream-50)"
          />
        </svg>
      </div>

    </section>
  );
}
