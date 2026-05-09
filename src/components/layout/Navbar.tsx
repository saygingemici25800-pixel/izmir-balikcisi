'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { NAV_LINKS, SISTER_VENUE, RESTAURANT } from '@/data/constants';
import styles from './Navbar.module.css';

// ─── Ease ─────────────────────────────────────────────────────────────────────
const easeOut = [0.16, 1, 0.3, 1] as [number, number, number, number];

// ─── Hamburger Icon ───────────────────────────────────────────────────────────
function Hamburger({ open }: { open: boolean }) {
  return (
    <div className={styles.hamburger} aria-hidden="true">
      <motion.span
        animate={open ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
        transition={{ duration: 0.3, ease: easeOut }}
      />
      <motion.span
        animate={open ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
        transition={{ duration: 0.2 }}
      />
      <motion.span
        animate={open ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
        transition={{ duration: 0.3, ease: easeOut }}
      />
    </div>
  );
}

// ─── Mobile Menu ──────────────────────────────────────────────────────────────
function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            className={styles.backdrop}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            className={styles.mobilePanel}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.4, ease: easeOut }}
          >
            <nav className={styles.mobileNav}>
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i + 0.15, ease: easeOut, duration: 0.4 }}
                >
                  <Link
                    href={link.href}
                    className={styles.mobileLink}
                    onClick={onClose}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05 * NAV_LINKS.length + 0.15, ease: easeOut, duration: 0.4 }}
                className={styles.mobileSister}
              >
                <a
                  href={SISTER_VENUE.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.sisterBtnMobile}
                  onClick={onClose}
                >
                  {SISTER_VENUE.name}
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M2.5 9.5l7-7M4 2.5h5.5V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
              </motion.div>
            </nav>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// ─── Ana Navbar ───────────────────────────────────────────────────────────────
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Mobil menü açıkken body scroll'u kilitle
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <>
      <motion.header
        className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: easeOut, delay: 0.1 }}
      >
        <div className={styles.inner}>

          {/* ── Logo ── */}
          <Link href="/" className={styles.logo} aria-label={RESTAURANT.name}>
            <span className={styles.logoIcon}>🐟</span>
            <span className={styles.logoText}>
              <span className={styles.logoTop}>İzmir</span>
              <span className={styles.logoBottom}>Balıkçısı</span>
            </span>
          </Link>

          {/* ── Desktop Nav ── */}
          <nav className={styles.desktopNav} aria-label="Ana navigasyon">
            {NAV_LINKS.map((link) => (
              <Link key={link.href} href={link.href} className={styles.navLink}>
                {link.label}
              </Link>
            ))}
          </nav>

          {/* ── Sağ Grup ── */}
          <div className={styles.right}>
            {/* Kardeş mekan */}
            <a
              href={SISTER_VENUE.url}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.sisterBtn}
              title={`${SISTER_VENUE.name} — ${SISTER_VENUE.location}`}
            >
              <span className={styles.sisterDot} />
              {SISTER_VENUE.name}
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path d="M2 8l6-6M3.5 2H8v4.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>

            {/* Rezervasyon CTA */}
            <Link href="#iletisim" className={styles.ctaBtn}>
              Rezervasyon
            </Link>

            {/* Hamburger */}
            <button
              className={styles.menuBtn}
              onClick={() => setMobileOpen((p) => !p)}
              aria-label={mobileOpen ? 'Menüyü kapat' : 'Menüyü aç'}
              aria-expanded={mobileOpen}
            >
              <Hamburger open={mobileOpen} />
            </button>
          </div>

        </div>
      </motion.header>

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
