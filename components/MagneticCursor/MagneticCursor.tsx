'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './MagneticCursor.module.css';

const lerp = (a: number, b: number, n: number) => a + (b - a) * n;

export function MagneticCursor() {
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
    if (matchMedia('(hover: none)').matches) return;

    const onMove = (e: PointerEvent) => {
      target.current.x = e.clientX;
      target.current.y = e.clientY;
      wake();
    };

    const onOver = (e: PointerEvent) => {
      const el = (e.target as HTMLElement | null)?.closest('[data-magnetic],a,button,[role="button"]') as HTMLElement | null;
      if (!el) {
        magnet.current = null;
        setHover(false);
        setLabel('');
        wake();
        return;
      }
      magnet.current = el.hasAttribute('data-magnetic') ? el : null;
      setHover(true);
      setLabel(el.getAttribute('data-cursor-label') || '');
      wake();
    };

    const onOut = (e: PointerEvent) => {
      const el = (e.relatedTarget as HTMLElement | null)?.closest?.('[data-magnetic],a,button,[role="button"]');
      if (!el) {
        magnet.current = null;
        setHover(false);
        setLabel('');
        wake();
      }
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerover', onOver);
    document.addEventListener('pointerout', onOut);

    let raf = 0;
    let running = false;

    // Below this the movement is sub-pixel — parking the loop here means an idle
    // pointer costs nothing instead of compositing a full-screen layer at 60fps.
    const EPS = 0.05;

    const wake = () => {
      if (running) return;
      running = true;
      raf = requestAnimationFrame(tick);
    };

    const tick = () => {
      // magnetic pull
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

      // A magnet keeps animating (its rect can move under a still pointer);
      // otherwise stop once both dot and ring have settled on the target.
      const settled =
        !magnet.current &&
        Math.abs(dotPos.current.x - target.current.x) < EPS &&
        Math.abs(dotPos.current.y - target.current.y) < EPS &&
        Math.abs(ringPos.current.x - dotPos.current.x) < EPS &&
        Math.abs(ringPos.current.y - dotPos.current.y) < EPS;

      if (settled) {
        running = false;
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    wake();

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerover', onOver);
      document.removeEventListener('pointerout', onOut);
    };
  }, []);

  return (
    <div className={`${styles.layer} ${hover ? styles.hover : ''}`} aria-hidden>
      <div ref={ringRef} className={styles.ring} />
      <div ref={dotRef} className={styles.dot} />
      {label ? (
        <div ref={textRef} className={styles.text}>{label}</div>
      ) : null}
    </div>
  );
}
