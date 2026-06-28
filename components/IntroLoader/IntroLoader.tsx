'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import styles from './IntroLoader.module.css';

export function IntroLoader() {
  const t = useTranslations('intro');
  const [done, setDone] = useState(false);

  useEffect(() => {
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const hold = reduce ? 250 : 1850;

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
      unlock();
    }, hold);

    return () => {
      window.clearTimeout(tm);
      window.clearTimeout(lenisRetry);
      unlock();
    };
  }, []);

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
