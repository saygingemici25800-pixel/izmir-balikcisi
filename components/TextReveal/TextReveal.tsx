'use client';

import { createElement, useEffect, useLayoutEffect, useRef, type ReactNode } from 'react';

/*
 * TextReveal — masked line/word reveal (Codegrid "Copy" port, no GSAP).
 * Every word is wrapped in an overflow-hidden mask and slides up from below;
 * words on the same visual line share a delay so it reads as a line reveal,
 * with a tiny per-word offset for the "typed" feel.
 *
 * Splitting walks text nodes, so rich children (<em>, <br/>) keep working.
 * The original text nodes are kept and restored on cleanup, so React's
 * references stay valid.
 */

type Props = {
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'div' | 'span' | 'blockquote';
  className?: string;
  children: ReactNode;
  /** seconds */
  delay?: number;
  /** 'view' = on scroll into view (top 75%); 'manual' = when `play` turns true */
  trigger?: 'view' | 'manual';
  play?: boolean;
  id?: string;
};

const useIsoLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect;

export function TextReveal({
  as = 'div',
  className,
  children,
  delay = 0,
  trigger = 'view',
  play = false,
  id,
}: Props) {
  const ref = useRef<HTMLElement>(null);
  const words = useRef<HTMLSpanElement[]>([]);
  const played = useRef(false);

  const run = () => {
    const el = ref.current;
    if (!el || played.current || !words.current.length) return;
    played.current = true;
    // Group by visual line (offsetTop of each mask) → stagger per line.
    let line = -1;
    let lastTop = -Infinity;
    let inLine = 0;
    for (const w of words.current) {
      const top = (w.parentElement as HTMLElement).offsetTop;
      if (top > lastTop + 4) {
        line++;
        inLine = 0;
        lastTop = top;
      }
      w.style.setProperty('--tr-d', `${delay + line * 0.1 + inLine * 0.025}s`);
      inLine++;
    }
    // next frame so the start state is committed before the transition
    requestAnimationFrame(() => el.classList.add('tr-in'));
  };

  useIsoLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.classList.add('tr-ready', 'tr-in');
      return;
    }

    const restored: { text: Text; frag: Node[] }[] = [];
    const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
    const texts: Text[] = [];
    while (walker.nextNode()) texts.push(walker.currentNode as Text);

    words.current = [];
    for (const text of texts) {
      const value = text.nodeValue ?? '';
      if (!value.trim()) continue;
      const parts = value.split(/(\s+)/);
      const nodes: Node[] = [];
      for (const part of parts) {
        if (!part) continue;
        if (/^\s+$/.test(part)) {
          nodes.push(document.createTextNode(part));
          continue;
        }
        const mask = document.createElement('span');
        mask.className = 'tr-mask';
        const word = document.createElement('span');
        word.className = 'tr-word';
        word.textContent = part;
        mask.appendChild(word);
        nodes.push(mask);
        words.current.push(word);
      }
      nodes.forEach((n) => text.parentNode?.insertBefore(n, text));
      text.parentNode?.removeChild(text);
      restored.push({ text, frag: nodes });
    }
    el.classList.add('tr-ready');

    return () => {
      for (const { text, frag } of restored) {
        const first = frag[0];
        first?.parentNode?.insertBefore(text, first);
        frag.forEach((n) => n.parentNode?.removeChild(n));
      }
      el.classList.remove('tr-ready', 'tr-in');
      words.current = [];
      played.current = false;
    };
  }, []);

  // Scroll trigger — like ScrollTrigger start: "top 75%", once.
  useEffect(() => {
    if (trigger !== 'view') return;
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          io.disconnect();
          document.fonts?.ready.then(run) ?? run();
        }
      },
      { rootMargin: '0px 0px -25% 0px' }
    );
    io.observe(el);
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trigger]);

  useEffect(() => {
    if (trigger === 'manual' && play) run();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trigger, play]);

  return createElement(as, { ref, className, id }, children);
}
