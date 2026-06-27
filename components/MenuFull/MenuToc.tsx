'use client';

import { useCallback } from 'react';
import styles from './MenuFull.module.css';
import type { MenuCategory } from '@/lib/menu';

// Sticky TOC offset — nav (~64) + sticky TOC band (~48) + breathing room
// Stays in sync with .category scroll-margin-top in MenuFull.module.css
const SCROLL_OFFSET = -120;

export default function MenuToc({ categories }: { categories: MenuCategory[] }) {
  const handleClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    if (typeof window === 'undefined') return;
    const target = document.getElementById(id);
    if (!target) return;
    e.preventDefault();

    // Prefer Lenis if mounted (smooth + matches the rest of the page motion)
    if (window.lenis) {
      window.lenis.scrollTo(target, { offset: SCROLL_OFFSET, duration: 1.1 });
    } else {
      const y = target.getBoundingClientRect().top + window.scrollY + SCROLL_OFFSET;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }

    // Update URL hash without browser jumping
    history.replaceState(null, '', `#${id}`);
  }, []);

  return (
    <div className={styles.tocWrap}>
      <nav className={styles.toc} aria-label="Menü kategorileri">
        {categories.map((c) => (
          <a
            key={c.id}
            href={`#${c.id}`}
            className={styles.tocLink}
            onClick={(e) => handleClick(e, c.id)}
          >
            {c.title}
          </a>
        ))}
      </nav>
    </div>
  );
}
