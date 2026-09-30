'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import type { MenuMedia } from '@/lib/menuMedia';
import styles from './MenuMedia.module.css';

type Props = {
  media: MenuMedia;
  name: string;
  price: string;
  /** aria label for the trigger, e.g. "Balık Çorbası — videoyu aç" */
  openLabel: string;
  closeLabel: string;
  children: ReactNode;
};

/**
 * Menu row trigger: small poster thumb + the item name. Opens a modal with the
 * product's silent looping video (poster shown until it plays).
 */
export function MenuMediaButton({ media, name, price, openLabel, closeLabel, children }: Props) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    window.lenis?.stop();
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    const trigger = triggerRef.current;
    return () => {
      window.removeEventListener('keydown', onKey);
      window.lenis?.start();
      document.body.style.overflow = '';
      trigger?.focus();
    };
  }, [open]);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        className={styles.trigger}
        onClick={() => setOpen(true)}
        aria-label={openLabel}
        aria-haspopup="dialog"
      >
        <span className={styles.thumb} aria-hidden>
          <Image src={media.poster} alt="" fill sizes="56px" className={styles.thumbImg} />
          <span className={styles.play} />
        </span>
        <span className={styles.label}>{children}</span>
      </button>

      {mounted &&
        createPortal(
          <AnimatePresence>
            {open && (
              <motion.div
                className={styles.backdrop}
                role="dialog"
                aria-modal="true"
                aria-label={name}
                onClick={() => setOpen(false)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                data-lenis-prevent
              >
                <motion.figure
                  className={styles.card}
                  onClick={(e) => e.stopPropagation()}
                  initial={{ opacity: 0, y: 24, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 16, scale: 0.98 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                >
                  <video
                    className={styles.video}
                    src={media.video}
                    poster={media.poster}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                  />
                  <figcaption className={styles.caption}>
                    <span className={styles.capName}>{name}</span>
                    <span className={styles.capPrice}>{price}</span>
                  </figcaption>
                  <button
                    ref={closeRef}
                    type="button"
                    className={styles.close}
                    onClick={() => setOpen(false)}
                    aria-label={closeLabel}
                  >
                    ×
                  </button>
                </motion.figure>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </>
  );
}
