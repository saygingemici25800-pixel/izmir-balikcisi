'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import styles from './IntroLoader.module.css';

const SEEN_KEY = 'ib:intro-seen';

/** Private mode / disabled storage must not break the intro — treat as unseen. */
const alreadySeen = () => {
  try {
    return sessionStorage.getItem(SEEN_KEY) === '1';
  } catch {
    return false;
  }
};

const markSeen = () => {
  try {
    sessionStorage.setItem(SEEN_KEY, '1');
  } catch {
    /* ignore */
  }
};

export function IntroLoader() {
  const t = useTranslations('intro');
  // Server renders the intro (no sessionStorage there); the effect below
  // dismisses it immediately on repeat visits within the same tab session.
  const [done, setDone] = useState(false);
  const [skip, setSkip] = useState(false);

  useEffect(() => {
    // Already shown once this session → don't hold the page again.
    if (alreadySeen()) {
      setSkip(true);
      setDone(true);
      return;
    }

    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const hold = reduce ? 250 : 600;

    // best-effort scroll lock during the intro (Lenis may mount just after us)
    document.body.style.overflow = 'hidden';
    window.lenis?.stop();
    const lenisRetry = window.setTimeout(() => window.lenis?.stop(), 80);

    const unlock = () => {
      document.body.style.overflow = '';
      window.lenis?.start();
      window.lenis?.scrollTo(0, { immediate: true });
    };

    const tm = window.setTimeout(() => {
      setDone(true);
      markSeen();
      unlock();
    }, hold);

    return () => {
      window.clearTimeout(tm);
      window.clearTimeout(lenisRetry);
      unlock();
    };
  }, []);

  // Repeat visit: drop the overlay out of the tree entirely so it never paints
  // or animates.
  if (skip) return null;

  return (
    <div className={`${styles.intro} ${done ? styles.done : ''}`} role="presentation" aria-hidden={done}>
      <div className={styles.inner}>
        <span className={styles.mark} aria-hidden />
        <span className={styles.word}>İZMİR BALIKÇISI</span>
        <span className={styles.sub}>{t('sub')}</span>
        <span className={styles.rule} aria-hidden>
          <span className={styles.ruleFill} />
        </span>
      </div>
    </div>
  );
}
