'use client';

import styles from './Marquee.module.css';

type Item = { text: string; tone?: 'gold' | 'thin' };

export function Marquee({
  items,
  duration = 38,
  reverse = false
}: {
  items: Item[];
  duration?: number;
  reverse?: boolean;
}) {
  const doubled = [...items, ...items];
  return (
    <div
      className={`${styles.marquee} ${reverse ? styles.reverse : ''}`}
      style={{ ['--duration' as string]: `${duration}s` }}
      aria-hidden
    >
      <div className={styles.track}>
        {doubled.map((it, i) => (
          <span key={i} className={styles.item}>
            <span className={it.tone === 'gold' ? styles.gold : it.tone === 'thin' ? styles.thin : ''}>
              {it.text}
            </span>
            <span className={styles.bullet} />
          </span>
        ))}
      </div>
    </div>
  );
}
