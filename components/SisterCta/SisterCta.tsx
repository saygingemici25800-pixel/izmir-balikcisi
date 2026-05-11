'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import styles from './SisterCta.module.css';

const SISTER_URL = 'https://calis-balikcisi.vercel.app';

export function SisterCta() {
  const [open, setOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const close = useCallback(() => setOpen(false), []);

  // ESC + body scroll lock + initial focus
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    // Move focus into the modal so keyboard users land here
    const t = window.setTimeout(() => closeRef.current?.focus(), 50);

    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
      window.clearTimeout(t);
      // Restore focus to trigger
      triggerRef.current?.focus();
    };
  }, [open, close]);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        className={styles.trigger}
        onClick={() => setOpen(true)}
        data-magnetic
        data-cursor-label="Önizle"
        aria-haspopup="dialog"
        aria-expanded={open}
      >
        <span className={styles.tEyebrow}>Kardeş mekân</span>
        <span className={styles.tName}>
          Çalış Balıkçısı <em>· Fethiye sahili</em>
        </span>
        <span className={styles.tArrow}>Önizle</span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className={styles.backdrop}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28 }}
            onClick={close}
            role="dialog"
            aria-modal="true"
            aria-labelledby="sister-modal-title"
          >
            <motion.div
              className={styles.modal}
              initial={{ y: 24, scale: 0.97, opacity: 0 }}
              animate={{ y: 0,  scale: 1,    opacity: 1 }}
              exit={{    y: 16, scale: 0.97, opacity: 0 }}
              transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              data-lenis-prevent
            >
              <button
                ref={closeRef}
                className={styles.close}
                onClick={close}
                aria-label="Kapat"
                data-magnetic
              />

              <div className={styles.visual} aria-hidden>
                <span className={styles.badge}>Kardeş Mekân</span>
                <div className={styles.sun} />
                <div className={styles.horizon} />
                <div className={`${styles.ripple} ${styles.r1}`} />
                <div className={`${styles.ripple} ${styles.r2}`} />
                <div className={`${styles.ripple} ${styles.r3}`} />
                <div className={`${styles.ripple} ${styles.r4}`} />
                <h2 className={styles.brand}>
                  Çalış<br /><em>Balıkçısı</em>
                </h2>
              </div>

              <div className={styles.copy}>
                <div>
                  <p className={styles.eyebrow}>№ — Sister venue</p>
                  <h3 className={styles.title} id="sister-modal-title">
                    Aynı sofranın<br />
                    <em>Çalış sahilindeki</em><br />kardeşi.
                  </h3>
                </div>

                <p className={styles.lede}>
                  Otuz beş yıllık aynı tabaklar, <em>farklı bir kıyı</em>:
                  martı sesi, akşamüstü rüzgârı ve doğrudan denize bakan masa.
                  İzmir Balıkçısı'nın izinden Fethiye Çalış sahilinde.
                </p>

                <dl className={styles.meta}>
                  <dt>Şehir</dt>
                  <dd>Çalış, Fethiye</dd>
                  <dt>Konsept</dt>
                  <dd>Aynı menü, deniz manzarası</dd>
                  <dt>Açılış</dt>
                  <dd>Yıl boyunca</dd>
                </dl>

                <div className={styles.actions}>
                  <a
                    className={styles.primary}
                    href={SISTER_URL}
                    target="_blank"
                    rel="noreferrer"
                    data-magnetic
                    data-cursor-label="Yeni sekme"
                  >
                    Siteye Git
                    <span className={styles.arrow} aria-hidden />
                  </a>
                  <button
                    type="button"
                    className={styles.secondary}
                    onClick={close}
                    data-magnetic
                    data-cursor-label="Kapat"
                  >
                    Geri Dön
                  </button>
                </div>

                <p className={styles.foot}>
                  calis-balikcisi.vercel.app · Yeni sekmede açılır
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
