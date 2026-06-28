'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import styles from './SisterCta.module.css';

const SISTER_URL = 'https://calis-balikcisi.vercel.app';

export function SisterCta() {
  const t = useTranslations('sister');
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
    const tm = window.setTimeout(() => closeRef.current?.focus(), 50);

    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
      window.clearTimeout(tm);
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
        data-cursor-label={t('preview')}
        aria-haspopup="dialog"
        aria-expanded={open}
      >
        <span className={styles.tEyebrow}>{t('triggerEyebrow')}</span>
        <span className={styles.tName}>
          {t.rich('triggerName', { em: (chunks) => <em>{chunks}</em> })}
        </span>
        <span className={styles.tArrow}>{t('preview')}</span>
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
                aria-label={t('close')}
                data-magnetic
              />

              <div className={styles.visual} aria-hidden>
                <span className={styles.badge}>{t('badge')}</span>
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
                  <p className={styles.eyebrow}>{t('modalEyebrow')}</p>
                  <h3 className={styles.title} id="sister-modal-title">
                    {t.rich('modalTitle', { em: (chunks) => <em>{chunks}</em>, br: () => <br /> })}
                  </h3>
                </div>

                <p className={styles.lede}>
                  {t.rich('modalLede', { em: (chunks) => <em>{chunks}</em> })}
                </p>

                <dl className={styles.meta}>
                  <dt>{t('metaCity')}</dt>
                  <dd>{t('metaCityVal')}</dd>
                  <dt>{t('metaConcept')}</dt>
                  <dd>{t('metaConceptVal')}</dd>
                  <dt>{t('metaOpen')}</dt>
                  <dd>{t('metaOpenVal')}</dd>
                </dl>

                <div className={styles.actions}>
                  <a
                    className={styles.primary}
                    href={SISTER_URL}
                    target="_blank"
                    rel="noreferrer"
                    data-magnetic
                    data-cursor-label={t('newTab')}
                  >
                    {t('goSite')}
                    <span className={styles.arrow} aria-hidden />
                  </a>
                  <button
                    type="button"
                    className={styles.secondary}
                    onClick={close}
                    data-magnetic
                    data-cursor-label={t('close')}
                  >
                    {t('back')}
                  </button>
                </div>

                <p className={styles.foot}>{t('foot')}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
