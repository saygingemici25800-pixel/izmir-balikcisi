'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import styles from './Nav.module.css';
import { RESTAURANT } from '@/lib/constants';
import { SectionLink } from '@/components/SectionLink';
import { SeasonalButton, type SeasonalData } from '@/components/SeasonalButton/SeasonalButton';
import { LanguageSwitcher } from '@/components/LanguageSwitcher/LanguageSwitcher';

// Section ids (stable anchors); labels come from the `nav` message namespace.
const LINK_IDS = ['hikaye', 'menu', 'galeri', 'manifesto', 'yorumlar', 'iletisim'] as const;

export function Nav({ seasonal }: { seasonal: SeasonalData }) {
  const t = useTranslations('nav');
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

  // Active-section indicator (scroll-spy) — only the home page has these anchors.
  useEffect(() => {
    if (pathname !== '/') {
      setActive('');
      return;
    }
    const els = LINK_IDS.map((id) => document.getElementById(id)).filter(
      (el): el is HTMLElement => el !== null
    );
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

  // Which nav item is highlighted: the menu page marks "Menü"; the home page
  // uses the scroll-spy section.
  const activeId = pathname === '/menu' ? 'menu' : active;

  // Logo → always home. On the home page, smooth-scroll to top in place.
  const goHome = (e: React.MouseEvent) => {
    setOpen(false);
    if (pathname === '/') {
      e.preventDefault();
      if (window.lenis) window.lenis.scrollTo(0, { duration: 1.1 });
      else window.scrollTo({ top: 0, behavior: 'smooth' });
      window.history.replaceState(null, '', window.location.pathname);
    }
  };

  return (
    <>
      <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''} ${open ? styles.open : ''}`}>
        <Link
          href="/"
          scroll={false}
          className={styles.brand}
          aria-label={t('brandAria')}
          data-magnetic
          data-cursor-label={pathname === '/' ? t('up') : t('home')}
          onClick={goHome}
        >
          <span className={styles.brandMark} aria-hidden />
          <span className={styles.brandName}>İzmir Balıkçısı</span>
        </Link>

        <div className={styles.links}>
          {LINK_IDS.map((id) => {
            const isActive = activeId === id;
            return (
              <SectionLink
                key={id}
                id={id}
                className={`${styles.link} ${isActive ? styles.linkActive : ''}`}
                aria-current={isActive ? 'page' : undefined}
                data-magnetic
                data-cursor-label={t(id)}
              >
                {t(id)}
              </SectionLink>
            );
          })}
        </div>

        <div className={styles.actions}>
          <LanguageSwitcher />
          <SeasonalButton seasonal={seasonal} />
          <a href={`tel:${RESTAURANT.phoneE164}`} className={styles.cta} data-magnetic data-cursor-label={t('call')}>
            <span className={styles.ctaDot} aria-hidden />
            <span>{t('call')}</span>
          </a>
          <button
            type="button"
            className={styles.burger}
            aria-label={open ? t('closeMenu') : t('openMenu')}
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
        aria-label={t('closeMenu')}
        tabIndex={-1}
        onClick={() => setOpen(false)}
      />
      <div
        id="mobile-menu"
        className={styles.panel}
        role="dialog"
        aria-modal="true"
        aria-label={t('siteMenu')}
        data-open={open}
      >
        <nav className={styles.panelLinks}>
          {LINK_IDS.map((id) => {
            const isActive = activeId === id;
            return (
              <SectionLink
                key={id}
                id={id}
                className={`${styles.panelLink} ${isActive ? styles.panelLinkActive : ''}`}
                aria-current={isActive ? 'page' : undefined}
                onNavigate={() => setOpen(false)}
              >
                {t(id)}
              </SectionLink>
            );
          })}
        </nav>
        <LanguageSwitcher />
        <a
          href={`tel:${RESTAURANT.phoneE164}`}
          className={styles.panelCta}
          onClick={() => setOpen(false)}
        >
          <span className={styles.ctaDot} aria-hidden />
          {t('panelCall', { phone: RESTAURANT.phoneDisplay })}
        </a>
        <p className={styles.panelMeta}>{t('panelMeta')}</p>
      </div>
    </>
  );
}
