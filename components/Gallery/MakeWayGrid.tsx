'use client';

import Image from 'next/image';
import { useCallback, useRef, type CSSProperties } from 'react';
import type { GalleryShot } from '@/lib/gallery';
import styles from './Gallery.module.css';

/*
 * "Make Way" grid (Codrops SpreadGrid port, no GSAP).
 * Hovering a tile scales it up; neighbours within `maxDistance` are pushed
 * away from it (proportionally to how close they are) and get a random tilt.
 * Transforms are written straight to the DOM, CSS transitions do the tween.
 */

export type MakeWayConfig = {
  scale: number;
  maxRotation: number; // deg
  spread: number; // px push at distance 0
  maxDistance: number; // px — beyond this, tiles stay put
  duration: number; // s
  ease: 'expo' | 'elastic' | 'power3';
  skew?: number; // deg
};

export const MAKEWAY_DEFAULT: MakeWayConfig = {
  scale: 1.35,
  maxRotation: 2,
  spread: 32,
  maxDistance: 440,
  duration: 1.1,
  ease: 'expo',
};

/** Stable pseudo-random in [-1, 1] per tile — no tilt jitter when moving between tiles. */
const tilt = (i: number) => {
  const x = Math.sin(i * 12.9898 + 78.233) * 43758.5453;
  return (x - Math.floor(x)) * 2 - 1;
};

type Props = {
  shots: GalleryShot[];
  captions: string[];
  config?: Partial<MakeWayConfig>;
  variant?: 'default' | 'teaser' | 'medium' | 'narrow' | 'dense';
  openLabel: (cap: string) => string;
  onOpen: (index: number) => void;
};

export function MakeWayGrid({ shots, captions, config, variant = 'default', openLabel, onOpen }: Props) {
  const cfg = { ...MAKEWAY_DEFAULT, ...config };
  const items = useRef<(HTMLButtonElement | null)[]>([]);
  const active = useRef<number | null>(null);

  const activate = useCallback(
    (i: number) => {
      if (active.current === i) return;
      active.current = i;
      const els = items.current;
      const cur = els[i];
      if (!cur) return;
      const cx = cur.offsetLeft + cur.offsetWidth / 2;
      const cy = cur.offsetTop + cur.offsetHeight / 2;

      els.forEach((el, j) => {
        if (!el) return;
        if (j === i) {
          el.style.transform = `scale(${cfg.scale})`;
          el.style.zIndex = '5';
          return;
        }
        const dx = el.offsetLeft + el.offsetWidth / 2 - cx;
        const dy = el.offsetTop + el.offsetHeight / 2 - cy;
        const dist = Math.hypot(dx, dy) || 1;
        el.style.zIndex = '1';
        if (dist > cfg.maxDistance) {
          el.style.transform = '';
          return;
        }
        const f = 1 - dist / cfg.maxDistance;
        const tx = (dx / dist) * cfg.spread * f;
        const ty = (dy / dist) * cfg.spread * f;
        const rot = tilt(j) * cfg.maxRotation * f;
        const skew = cfg.skew ? tilt(j + 31) * cfg.skew * f : 0;
        el.style.transform = `translate(${tx.toFixed(1)}px, ${ty.toFixed(1)}px) rotate(${rot.toFixed(2)}deg)${
          skew ? ` skewX(${skew.toFixed(2)}deg)` : ''
        }`;
      });
    },
    [cfg.scale, cfg.maxDistance, cfg.spread, cfg.maxRotation, cfg.skew]
  );

  const reset = useCallback(() => {
    active.current = null;
    items.current.forEach((el) => {
      if (!el) return;
      el.style.transform = '';
      el.style.zIndex = '';
    });
  }, []);

  const vars = { '--mw-dur': `${cfg.duration}s` } as CSSProperties;
  const variantClass =
    variant === 'teaser' ? styles.mwTeaser : variant === 'medium' ? styles.mwMedium : variant === 'narrow' ? styles.mwNarrow : variant === 'dense' ? styles.mwDense : '';
  const easeClass = cfg.ease === 'elastic' ? styles.mwElastic : cfg.ease === 'power3' ? styles.mwPower3 : '';

  return (
    <div
      className={`${styles.mw} ${variantClass} ${easeClass}`}
      style={vars}
      onPointerLeave={reset}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) reset();
      }}
    >
      {shots.map((s, i) => (
        <button
          key={`${s.src}-${i}`}
          ref={(el) => {
            items.current[i] = el;
          }}
          type="button"
          className={styles.mwItem}
          onPointerEnter={(e) => {
            if (e.pointerType === 'mouse') activate(i);
          }}
          onFocus={() => activate(i)}
          onClick={() => onOpen(i)}
          aria-label={openLabel(captions[i] ?? '')}
          data-cursor-label={captions[i]}
        >
          <Image
            src={s.src}
            alt=""
            fill
            sizes="(max-width: 720px) 45vw, 360px"
            className={styles.mwImg}
          />
        </button>
      ))}
    </div>
  );
}
