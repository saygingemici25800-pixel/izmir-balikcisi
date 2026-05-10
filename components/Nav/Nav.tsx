'use client';

import { useEffect, useState } from 'react';
import styles from './Nav.module.css';

const LINKS = [
  { href: '#hikaye', label: 'Hikâye' },
  { href: '#menu', label: 'Menü' },
  { href: '#manifesto', label: 'Manifesto' },
  { href: '#galeri', label: 'Galeri' },
  { href: '#iletisim', label: 'İletişim' }
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
      <a href="#top" className={styles.brand} data-magnetic data-cursor-label="Yukarı">
        <span className={styles.brandMark} aria-hidden />
        <span>İzmir Balıkçısı</span>
      </a>
      <div className={styles.links}>
        {LINKS.map((l) => (
          <a key={l.href} href={l.href} className={styles.link}>
            {l.label}
          </a>
        ))}
      </div>
      <a href="#iletisim" className={styles.cta} data-magnetic data-cursor-label="Rezervasyon">
        Rezervasyon
      </a>
      <button className={styles.menuBtn} aria-label="Menü" />
    </nav>
  );
}
