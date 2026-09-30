'use client';

import { useEffect, useRef } from 'react';
import { useScroll, useMotionValueEvent } from 'framer-motion';
import { useLocale, useTranslations } from 'next-intl';
import styles from './FooterSpotlight.module.css';
import { RESTAURANT } from '@/lib/constants';
import {
  WORD_VIEWBOX,
  WORD_WIDTH,
  WORD_TOP,
  STEM,
  STATIC_PATHS,
  FALL_STEM,
  FALL_DOT,
} from './wordPaths';

/*
 * Footer spotlight — "İZMİR" stacked in 6 layers that cascade into a ghosted
 * staircase on scroll; then the second İ tips over, falls and turns into a
 * "REZERVASYON" pill (tel: link) whose label scrambles in.
 * Pure transforms written straight to the DOM (no React re-renders per frame).
 */

const LAYERS = 6;
const STEM_CX = STEM.x + STEM.w / 2;
const STEM_CY = STEM.y + STEM.h / 2;

const LATIN = 'ABCÇDEFGĞHIİJKLMNOÖPRSŞTUÜVYZ';
const ARABIC = 'ابتثجحخدذرزسشصضطظعغفقكلمنهوي';

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const easeInOut = (t: number) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);

export function FooterSpotlight() {
  const t = useTranslations('footer');
  const locale = useLocale();
  const label = t('spotlightCta');

  const sectionRef = useRef<HTMLElement>(null);
  const layerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const svgRef = useRef<SVGSVGElement>(null);
  const stemRef = useRef<SVGGElement>(null);
  const dotRef = useRef<SVGPathElement>(null);
  const textRef = useRef<SVGTextElement>(null);

  // Layout-dependent numbers, recomputed on resize.
  const metrics = useRef({ shift: 5, step: 0.075, fallY: 1600, fallScale: 1 });
  const labelState = useRef({ shown: false, p: 0, raf: 0 });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 70%', 'end 70%'],
  });

  /* ---------- label scramble (tiny ScrambleText replacement) ---------- */
  const runLabel = (show: boolean) => {
    const st = labelState.current;
    if (st.shown === show) return;
    st.shown = show;
    cancelAnimationFrame(st.raf);
    const el = textRef.current;
    if (!el) return;
    const chars = locale === 'ar' ? ARABIC : LATIN;
    const target = label;
    const dur = show ? 750 : 350;
    const from = st.p;
    const start = performance.now();
    const step = (now: number) => {
      const k = clamp01((now - start) / dur);
      st.p = show ? lerp(from, 1, k) : lerp(from, 0, k);
      const revealed = Math.floor(clamp01((st.p - 0.1) / 0.9) * target.length);
      const tail = Math.min(target.length - revealed, Math.ceil(st.p * target.length));
      let out = target.slice(0, revealed);
      for (let i = 0; i < tail; i++) {
        const c = target[revealed + i];
        out += c === ' ' ? ' ' : chars[(Math.random() * chars.length) | 0];
      }
      el.textContent = out;
      if (k < 1) st.raf = requestAnimationFrame(step);
    };
    st.raf = requestAnimationFrame(step);
  };

  /* ---------- scroll → transforms ---------- */
  const apply = (p: number) => {
    const { shift, step, fallY, fallScale } = metrics.current;

    const cascade = clamp01(p / 0.5);
    layerRefs.current.forEach((el, i) => {
      if (!el) return;
      const scale = 1 - i * step * cascade;
      const y = i * shift * cascade;
      el.style.transform = `translate3d(0, ${y}px, 0) scale(${scale})`;
    });

    const fall = easeInOut(clamp01((p - 0.5) / 0.5));
    if (stemRef.current) {
      stemRef.current.style.transform =
        `translate(0px, ${fall * fallY}px) rotate(${fall * 90}deg) scale(${lerp(1, fallScale, fall)})`;
    }
    if (dotRef.current) {
      const d = clamp01(fall / 0.35);
      dotRef.current.style.transform = `translate(0px, ${d * -120}px)`;
      dotRef.current.style.opacity = String(1 - d);
    }

    runLabel(p > 0.75);
  };

  const reduced = useRef(false);

  useMotionValueEvent(scrollYProgress, 'change', (p) => {
    if (reduced.current) return;
    apply(p);
  });

  useEffect(() => {
    reduced.current = matchMedia('(prefers-reduced-motion: reduce)').matches;

    const measure = () => {
      const section = sectionRef.current;
      const layer = layerRefs.current[LAYERS - 1];
      const svg = svgRef.current;
      if (!section || !layer || !svg) return;

      const mobile = window.innerWidth < 720;
      const shift = mobile ? 12 : 5;
      const step = 0.075;
      const frontScale = 1 - (LAYERS - 1) * step;

      // Untransformed sizes (offset*, not getBoundingClientRect — layers are scaled).
      const sectionH = section.offsetHeight;
      const layerH = layer.offsetHeight;
      const padTop = parseFloat(getComputedStyle(layer).paddingTop) || 0;
      const unit = svg.clientWidth / WORD_WIDTH; // px per user unit (before layer scale)

      // Where the stem centre sits (px from section top) at the end of the cascade.
      const localY = padTop + (STEM_CY - WORD_TOP) * unit;
      const endY = layerH - (layerH - localY) * frontScale + (LAYERS - 1) * shift;
      const targetY = sectionH * (mobile ? 0.74 : 0.72);
      const fallY = (targetY - endY) / (unit * frontScale);

      // Pill length on screen: ~16vw, clamped.
      const pillPx = Math.min(260, Math.max(180, window.innerWidth * 0.16));
      const fallScale = Math.max(1, pillPx / (STEM.h * unit * frontScale));

      metrics.current = { shift, step, fallY, fallScale };
      apply(reduced.current ? 1 : scrollYProgress.get());
    };

    // Label starts empty; fonts can shift layout → re-measure when ready.
    if (textRef.current) textRef.current.textContent = '';
    labelState.current.shown = false;
    measure();
    document.fonts?.ready.then(measure);
    const ro = new ResizeObserver(measure);
    if (sectionRef.current) ro.observe(sectionRef.current);
    return () => {
      ro.disconnect();
      cancelAnimationFrame(labelState.current.raf);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [label]);

  return (
    <section ref={sectionRef} className={styles.spotlight} aria-label="İzmir Balıkçısı" dir="ltr">
      {Array.from({ length: LAYERS }, (_, i) => {
        const front = i === LAYERS - 1;
        return (
          <div
            key={i}
            ref={(el) => {
              layerRefs.current[i] = el;
            }}
            className={styles.layer}
            aria-hidden={front ? undefined : true}
          >
            <svg
              ref={front ? svgRef : undefined}
              viewBox={WORD_VIEWBOX}
              className={styles.word}
              focusable="false"
            >
              {STATIC_PATHS.map((d, j) => (
                <path key={j} d={d} />
              ))}

              {front ? (
                <>
                  <path ref={dotRef} d={FALL_DOT} className={styles.dot} />
                  <a
                    href={`tel:${RESTAURANT.phoneE164}`}
                    aria-label={t('spotlightAria')}
                    data-cursor-label={label}
                    className={styles.cta}
                  >
                    <g ref={stemRef} className={styles.stem}>
                      <path d={FALL_STEM} />
                      <text
                        ref={textRef}
                        x={STEM_CX}
                        y={STEM_CY}
                        transform={`rotate(-90 ${STEM_CX} ${STEM_CY})`}
                        className={styles.label}
                      />
                    </g>
                  </a>
                </>
              ) : (
                <>
                  <path d={FALL_DOT} />
                  <path d={FALL_STEM} />
                </>
              )}
            </svg>
          </div>
        );
      })}
    </section>
  );
}
