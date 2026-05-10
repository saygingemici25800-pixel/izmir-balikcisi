'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './MagneticCursor.module.css';

const lerp = (a: number, b: number, n: number) => a + (b - a) * n;

const INTERACTIVE_SELECTOR = '[data-magnetic],a,button,[role="button"],input,textarea,select,label';

export default function MagneticCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const target = useRef({ x: -100, y: -100 });
  const dotPos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const magnet = useRef<HTMLElement | null>(null);
  const [hover, setHover] = useState(false);
  const [label, setLabel] = useState('');

  useEffect(() => {
    // Respect platform conventions: no custom cursor on touch / reduced motion
    if (typeof window === 'undefined') return;
    if (matchMedia('(hover: none)').matches) return;
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const onMove = (e: PointerEvent) => {
      target.current.x = e.clientX;
      target.current.y = e.clientY;
    };

    const onOver = (e: PointerEvent) => {
      const el = (e.target as HTMLElement | null)?.closest(INTERACTIVE_SELECTOR) as HTMLElement | null;
      if (!el) {
        magnet.current = null;
        setHover(false);
        setLabel('');
        return;
      }
      magnet.current = el.hasAttribute('data-magnetic') ? el : null;
      setHover(true);
      setLabel(el.getAttribute('data-cursor-label') || '');
    };

    const onOut = (e: PointerEvent) => {
      const el = (e.relatedTarget as HTMLElement | null)?.closest?.(INTERACTIVE_SELECTOR);
      if (!el) {
        magnet.current = null;
        setHover(false);
        setLabel('');
      }
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerover', onOver);
    document.addEventListener('pointerout', onOut);

    let raf = 0;
    const tick = () => {
      if (magnet.current) {
        const r = magnet.current.getBoundingClientRect();
        const cx = r.left + r.width / 2;
        const cy = r.top + r.height / 2;
        const dx = target.current.x - cx;
        const dy = target.current.y - cy;
        const pullX = cx + dx * 0.5;
        const pullY = cy + dy * 0.5;
        dotPos.current.x = lerp(dotPos.current.x, pullX, 0.28);
        dotPos.current.y = lerp(dotPos.current.y, pullY, 0.28);
      } else {
        dotPos.current.x = lerp(dotPos.current.x, target.current.x, 0.28);
        dotPos.current.y = lerp(dotPos.current.y, target.current.y, 0.28);
      }
      ringPos.current.x = lerp(ringPos.current.x, dotPos.current.x, 0.12);
      ringPos.current.y = lerp(ringPos.current.y, dotPos.current.y, 0.12);

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${dotPos.current.x}px, ${dotPos.current.y}px, 0) translate(-50%, -50%)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0) translate(-50%, -50%)`;
      }
      if (textRef.current) {
        textRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y + 56}px, 0) translate(-50%, -50%)`;
      }

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    // Hide native cursor while custom cursor is mounted (form-fields keep it via class override in globals.css)
    document.body.classList.add('has-custom-cursor');

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerover', onOver);
      document.removeEventListener('pointerout', onOut);
      document.body.classList.remove('has-custom-cursor');
    };
  }, []);

  return (
    <div className={`${styles.layer} ${hover ? styles.hover : ''}`} aria-hidden>
      <div ref={ringRef} className={styles.ring} />
      <div ref={dotRef} className={styles.dot} />
      {label ? (
        <div ref={textRef} className={styles.text}>
          {label}
        </div>
      ) : null}
    </div>
  );
}
