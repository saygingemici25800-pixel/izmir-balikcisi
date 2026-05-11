'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, type PanInfo } from 'framer-motion';
import styles from './MenuFull.module.css';
import type { MenuCategory, MenuItem } from '@/lib/menu';

type Props = { categories: readonly MenuCategory[] };

export default function MenuList({ categories }: Props) {
  const [selected, setSelected] = useState<MenuItem | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  const open = useCallback((item: MenuItem, btn: HTMLButtonElement) => {
    triggerRef.current = btn;
    setSelected(item);
  }, []);

  const close = useCallback(() => {
    setSelected(null);
    // restore focus to the originating button so keyboard users land back
    window.setTimeout(() => triggerRef.current?.focus(), 50);
  }, []);

  // ESC + scroll lock while sheet is open
  useEffect(() => {
    if (!selected) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [selected, close]);

  return (
    <>
      {categories.map((cat) => (
        <section key={cat.id} id={cat.id} className={styles.category}>
          <header className={styles.catHead}>
            <h2 className={styles.catTitle}>{cat.title}</h2>
            {cat.subtitle && <p className={styles.catSub}>{cat.subtitle}</p>}
            <span className={styles.catCount}>
              {String(cat.items.length).padStart(2, '0')} tabak
            </span>
          </header>

          <ul className={styles.list}>
            {cat.items.map((item) => (
              <li key={item.name} className={styles.itemRow}>
                <button
                  type="button"
                  className={styles.item}
                  onClick={(e) => open(item, e.currentTarget)}
                  data-magnetic
                  data-cursor-label="Detay"
                  aria-haspopup="dialog"
                  aria-label={`${item.name} — detayını gör`}
                >
                  <span className={styles.itemHead}>
                    <span className={styles.itemName}>{item.name}</span>
                    {item.tags && item.tags.length > 0 && (
                      <span className={styles.itemTags}>
                        {item.tags.map((t) => (
                          <span key={t} className={styles.itemTag}>{t}</span>
                        ))}
                      </span>
                    )}
                  </span>
                  <span className={styles.itemPrice}>
                    {item.price}
                    <small>{item.unit ?? '₺'}</small>
                  </span>
                  <span className={styles.itemDesc}>{item.desc}</span>
                </button>
              </li>
            ))}
          </ul>
        </section>
      ))}

      <AnimatePresence>
        {selected && <DetailSheet item={selected} onClose={close} />}
      </AnimatePresence>
    </>
  );
}

function DetailSheet({ item, onClose }: { item: MenuItem; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const t = window.setTimeout(() => closeRef.current?.focus(), 80);
    return () => window.clearTimeout(t);
  }, []);

  const onDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.y > 110 || info.velocity.y > 600) onClose();
  };

  return (
    <motion.div
      className={styles.sheetBackdrop}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="menu-sheet-title"
    >
      <motion.div
        className={styles.sheet}
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', damping: 30, stiffness: 280, mass: 0.7 }}
        onClick={(e) => e.stopPropagation()}
        drag="y"
        dragConstraints={{ top: 0, bottom: 0 }}
        dragElastic={{ top: 0, bottom: 0.5 }}
        onDragEnd={onDragEnd}
        data-lenis-prevent
      >
        <div className={styles.sheetGrip} aria-hidden />
        <button
          ref={closeRef}
          type="button"
          className={styles.sheetClose}
          onClick={onClose}
          aria-label="Kapat"
          data-magnetic
        />

        <div className={styles.sheetContent}>
          <header className={styles.sheetHeader}>
            <p className={styles.sheetEyebrow}>
              {item.tags?.[0] ?? 'Tabak'}
            </p>
            <h3 className={styles.sheetTitle} id="menu-sheet-title">
              {item.name}
            </h3>
            <span className={styles.sheetPrice}>
              {item.price}
              <small>{item.unit ?? '₺'}</small>
            </span>
          </header>

          {item.tags && item.tags.length > 0 && (
            <div className={styles.sheetTags}>
              {item.tags.map((t) => (
                <span key={t} className={styles.sheetTag}>{t}</span>
              ))}
            </div>
          )}

          <p className={styles.sheetDesc}>{item.desc}</p>

          {item.img && (
            <div className={styles.sheetImage}>
              <img src={item.img} alt={item.name} loading="lazy" />
            </div>
          )}

          <p className={styles.sheetFoot}>
            ESC / Aşağı kaydır / Dışa tıkla — kapatmak için
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}
