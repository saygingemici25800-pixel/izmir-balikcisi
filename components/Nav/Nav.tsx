'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import styles from './Nav.module.css';
import { RESTAURANT } from '@/lib/constants';

const LINKS = [
  { href: '#hikaye', label: 'Hikâye' },
  { href: '#menu', label: 'Menü' },
  { href: '#manifesto', label: 'Manifesto' },
  { href: '#yorumlar', label: 'Yorumlar' },
  { href: '#galeri', label: 'Galeri' },
  { href: '#iletisim', label: 'İletişim' }
];

export function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Active-section indicator (scroll-spy). Only the home page has these anchors;
  // on other routes no link is marked active.
  useEffect(() => {
    const ids = LINKS.map((l) => l.href.slice(1));
    const els = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (!els.length) {
      setActive('');
      return;
    }
    // a thin centre line: exactly one section crosses it at a time → unambiguous
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: '-50% 0px -50% 0px', threshold: 0 }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [pathname]);

  // ESC to close + lock body scroll while the panel is open
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''} ${open ? styles.open : ''}`}>
        <a href="#top" className={styles.brand} data-magnetic data-cursor-label="Yukarı" onClick={() => setOpen(false)}>
          <span className={styles.brandMark} aria-hidden />
          <span className={styles.brandName}>İzmir Balıkçısı</span>
        </a>

        <div className={styles.links}>
          {LINKS.map((l) => {
            const isActive = active === l.href.slice(1);
            return (
              <a
                key={l.href}
                href={l.href}
                className={`${styles.link} ${isActive ? styles.linkActive : ''}`}
                aria-current={isActive ? 'page' : undefined}
                data-magnetic
                data-cursor-label={l.label}
              >
                {l.label}
              </a>
            );
          })}
        </div>

        <div className={styles.actions}>
          <a href={`tel:${RESTAURANT.phoneE164}`} className={styles.cta} data-magnetic data-cursor-label="Ara">
            <span className={styles.ctaDot} aria-hidden />
            <span>Ara</span>
          </a>
          <button
            type="button"
            className={styles.burger}
            aria-label={open ? 'Menüyü kapat' : 'Menüyü aç'}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((o) => !o)}
          >
            <span className={styles.burgerBox} aria-hidden>
              <span className={styles.burgerLine} />
              <span className={styles.burgerLine} />
              <span className={styles.burgerLine} />
            </span>
          </button>
        </div>
      </nav>

      {/* Mobile slide-down menu — siblings of <nav> so their fixed positioning is
          relative to the viewport, not trapped inside the nav's backdrop-filter
          containing block. */}
      <button
        type="button"
        className={styles.scrim}
        data-open={open}
        aria-hidden={!open}
        tabIndex={-1}
        onClick={() => setOpen(false)}
      />
      <div
        id="mobile-menu"
        className={styles.panel}
        role="dialog"
        aria-modal="true"
        aria-label="Site menüsü"
        data-open={open}
      >
        <nav className={styles.panelLinks}>
          {LINKS.map((l) => {
            const isActive = active === l.href.slice(1);
            return (
              <a
                key={l.href}
                href={l.href}
                className={`${styles.panelLink} ${isActive ? styles.panelLinkActive : ''}`}
                aria-current={isActive ? 'page' : undefined}
                onClick={() => setOpen(false)}
              >
                {l.label}
              </a>
            );
          })}
        </nav>
        <a
          href={`tel:${RESTAURANT.phoneE164}`}
          className={styles.panelCta}
          onClick={() => setOpen(false)}
        >
          <span className={styles.ctaDot} aria-hidden />
          Ara · {RESTAURANT.phoneDisplay}
        </a>
        <p className={styles.panelMeta}>Her gün · 10.30 — 22.30 · Fethiye / Muğla</p>
      </div>
    </>
  );
}
