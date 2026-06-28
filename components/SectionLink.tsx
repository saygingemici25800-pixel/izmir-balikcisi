'use client';

import type { ComponentProps, MouseEvent, ReactNode } from 'react';
import { Link, usePathname } from '@/i18n/navigation';

type Props = {
  /** Home-page section id, e.g. "hikaye" (links resolve to `/#hikaye`). */
  id: string;
  children: ReactNode;
  /** Fired on click (e.g. to close a mobile menu) regardless of page. */
  onNavigate?: () => void;
  /** Lenis scroll offset to clear the fixed nav. */
  offset?: number;
} & Omit<ComponentProps<typeof Link>, 'href'>;

/**
 * A link to a home-page section that works from ANY route and ANY locale.
 * - On `/` it smooth-scrolls in place via Lenis (no reload).
 * - From a sub-page it navigates to `/#id`; SmoothScroll scrolls to the section
 *   once the home page mounts.
 * `usePathname`/`Link` come from next-intl, so the active locale prefix is
 * preserved automatically (`/en/#id`, `/ar/#id`).
 */
export function SectionLink({ id, children, onNavigate, offset = -90, ...rest }: Props) {
  const pathname = usePathname();

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    onNavigate?.();
    if (pathname === '/') {
      const el = document.getElementById(id);
      if (el) {
        e.preventDefault();
        if (window.lenis) window.lenis.scrollTo(el, { offset });
        else el.scrollIntoView({ behavior: 'smooth' });
        // keep whatever locale prefix is currently in the address bar
        window.history.replaceState(null, '', `${window.location.pathname}#${id}`);
      }
    }
    // From a sub-page: let the Link navigate to `/#id` (scroll handled on arrival).
  };

  return (
    <Link href={`/#${id}`} scroll={false} onClick={handleClick} {...rest}>
      {children}
    </Link>
  );
}
