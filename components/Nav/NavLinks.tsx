'use client';

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import styles from './NavLinks.module.css';

// Minimal inline icons — 24×24, stroke: currentColor so the CSS colour cascade
// drives them (no icon library; the project has none installed).
const ICONS = {
  hikaye: (
    <>
      <path d="M12 6.5C10.6 5.2 8.9 4.5 6.8 4.5H3.5v13H7c1.9 0 3.6.6 5 1.8 1.4-1.2 3.1-1.8 5-1.8h3.5v-13H17.2c-2.1 0-3.8.7-5.2 2Z" />
      <path d="M12 6.5V19.3" />
    </>
  ),
  menu: (
    <>
      <circle cx="12" cy="12" r="8.2" />
      <circle cx="12" cy="12" r="4" />
    </>
  ),
  galeri: (
    <>
      <rect x="3.2" y="4.8" width="17.6" height="14.4" rx="2.2" />
      <circle cx="8.4" cy="9.6" r="1.5" />
      <path d="m3.6 16.4 4.3-4a1.8 1.8 0 0 1 2.4 0l3.1 2.9m0 0 1.8-1.6a1.8 1.8 0 0 1 2.4 0l2.8 2.6m-7-1 3.3 3.1" />
    </>
  ),
  iletisim: (
    <>
      <path d="M20.4 16.9v2.5a1.7 1.7 0 0 1-1.9 1.7 16.6 16.6 0 0 1-7.2-2.6 16.3 16.3 0 0 1-5-5 16.6 16.6 0 0 1-2.6-7.3A1.7 1.7 0 0 1 5.4 4.4h2.5a1.7 1.7 0 0 1 1.7 1.5c.1.8.3 1.7.6 2.5a1.7 1.7 0 0 1-.4 1.8l-1 1a13.3 13.3 0 0 0 5 5l1-1a1.7 1.7 0 0 1 1.8-.4c.8.3 1.6.5 2.5.6a1.7 1.7 0 0 1 1.4 1.7Z" />
    </>
  ),
} as const;

export type NavLinkItem = { id: keyof typeof ICONS; href: string };

// This component is SSR'd; useLayoutEffect would warn on the server.
const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

export function NavLinks({
  links,
  activeId,
}: {
  links: readonly NavLinkItem[];
  activeId: string;
}) {
  const t = useTranslations('nav');
  const locale = useLocale();
  const listRef = useRef<HTMLUListElement>(null);
  const labelRefs = useRef(new Map<string, HTMLSpanElement>());
  // Bumped whenever fonts finish loading, so the measurement re-runs against
  // the real metrics instead of the fallback face.
  const [fontTick, setFontTick] = useState(0);

  const setLabelRef = useCallback((id: string) => (el: HTMLSpanElement | null) => {
    if (el) labelRefs.current.set(id, el);
    else labelRefs.current.delete(id);
  }, []);

  // Write the active label's rendered width onto the list as --lineWidth; the
  // underline reads it so the rule is exactly as wide as the text.
  const measure = useCallback(() => {
    const list = listRef.current;
    if (!list) return;
    const el = activeId ? labelRefs.current.get(activeId) : undefined;
    list.style.setProperty('--lineWidth', el ? `${Math.round(el.offsetWidth)}px` : '0px');
  }, [activeId]);

  useIsomorphicLayoutEffect(() => {
    measure();
  }, [measure, locale, fontTick]);

  useEffect(() => {
    let frame = 0;
    const onResize = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(measure);
    };
    window.addEventListener('resize', onResize);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', onResize);
    };
  }, [measure]);

  // Webfonts (Hanken Grotesk / Tajawal) land after first paint and change the
  // label width — re-measure once they're ready.
  useEffect(() => {
    if (!document.fonts) return;
    let alive = true;
    document.fonts.ready.then(() => {
      if (alive) setFontTick((n) => n + 1);
    });
    return () => {
      alive = false;
    };
  }, []);

  return (
    <ul className={styles.list} ref={listRef}>
      {links.map(({ id, href }) => {
        const isActive = activeId === id;
        return (
          <li key={id} className={styles.item}>
            <Link
              href={href}
              className={styles.link}
              data-active={isActive || undefined}
              aria-current={isActive ? 'page' : undefined}
              data-magnetic
              data-cursor-label={t(id)}
            >
              <span className={styles.icon} aria-hidden>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {ICONS[id]}
                </svg>
              </span>
              <span className={styles.label} ref={setLabelRef(id)}>
                {t(id)}
              </span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
