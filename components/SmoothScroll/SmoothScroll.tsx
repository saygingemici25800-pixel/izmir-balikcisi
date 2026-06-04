'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { MotionConfig } from 'framer-motion';
import Lenis from 'lenis';

declare global {
  interface Window {
    lenis?: Lenis;
  }
}

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.2,
    });
    lenisRef.current = lenis;
    window.lenis = lenis;

    // Own scroll restoration so the browser's native hash-jump doesn't fight
    // Lenis on load / back-forward (we drive hash scrolling ourselves).
    const prevRestoration = history.scrollRestoration;
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual';

    let raf = 0;
    const tick = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      lenisRef.current = null;
      delete window.lenis;
      if ('scrollRestoration' in history) history.scrollRestoration = prevRestoration;
    };
  }, []);

  // Scroll handling on route change — Lenis hijacks window.scroll so Next.js's
  // default scroll behaviour doesn't reach it. If the new URL carries a hash
  // (e.g. arriving at /#hikaye from a sub-page), smooth-scroll to that section
  // once it's in the DOM; otherwise reset to the top.
  useEffect(() => {
    const lenis = lenisRef.current;
    if (!lenis) return;

    let timer: number | undefined;

    // Drive scrolling for: cross-page nav to /#section, deep links / refresh on
    // a hash, and browser back/forward between hashes (hashchange).
    const scrollToHash = () => {
      // After a route/content swap the cached scroll limit is stale (e.g. short
      // /menu → tall home), which would clamp scrollTo. Recompute first.
      lenis.resize();
      const hash = window.location.hash.slice(1);
      if (!hash) {
        lenis.scrollTo(0, { immediate: true });
        return;
      }
      const id = decodeURIComponent(hash);
      let tries = 0;
      const seek = () => {
        const el = document.getElementById(id);
        if (!el) return false;
        lenis.resize(); // a section's final offset depends on everything above it
        lenis.scrollTo(el, { offset: -90 });
        return true;
      };
      const tick = () => {
        if (!seek() && tries++ < 12) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
      // corrective pass once late layout (fonts/images below the fold) settles
      window.clearTimeout(timer);
      timer = window.setTimeout(seek, 700);
    };

    scrollToHash(); // on mount + every pathname change
    window.addEventListener('hashchange', scrollToHash);
    return () => {
      window.removeEventListener('hashchange', scrollToHash);
      window.clearTimeout(timer);
    };
  }, [pathname]);

  // reducedMotion="user" → all framer animations below honour the OS setting
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
