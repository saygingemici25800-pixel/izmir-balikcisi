'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './SeasonalButton.module.css';

export type SeasonalData = {
  title: string;
  dateRange: string;
  fish: string[];
  active: boolean;
};

export function SeasonalButton({ seasonal }: { seasonal: SeasonalData }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('mousedown', onDoc);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDoc);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  if (!seasonal?.active || !seasonal.title) return null;

  return (
    <div className={styles.wrap} ref={ref}>
      <button
        type="button"
        className={styles.pill}
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-haspopup="dialog"
        data-magnetic
        data-cursor-label="Mevsim"
      >
        <span className={styles.dot} aria-hidden />
        <span className={styles.title}>{seasonal.title}</span>
        {seasonal.dateRange && <span className={styles.range}>· {seasonal.dateRange}</span>}
      </button>

      {open && (
        <div className={styles.pop} role="dialog" aria-label={seasonal.title}>
          <p className={styles.popHead}>
            {seasonal.title}
            {seasonal.dateRange && <span className={styles.popRange}>{seasonal.dateRange}</span>}
          </p>
          {seasonal.fish.length > 0 ? (
            <ul className={styles.fishList}>
              {seasonal.fish.map((f, i) => (
                <li key={i}>{f}</li>
              ))}
            </ul>
          ) : (
            <p className={styles.popEmpty}>Liste yakında güncellenecek.</p>
          )}
        </div>
      )}
    </div>
  );
}
