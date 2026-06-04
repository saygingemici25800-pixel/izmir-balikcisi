'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { ComponentProps, MouseEvent, ReactNode } from 'react';

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
 * A link to a home-page section that works from ANY route.
 * - On `/` it smooth-scrolls in place via Lenis (no reload).
 * - From a sub-page it navigates to `/#id`; SmoothScroll scrolls to the section
 *   once the home page mounts.
 * Always renders `/#id` so the href is valid everywhere (req: use `/#`, not `#`).
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
        window.history.replaceState(null, '', `/#${id}`);
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
