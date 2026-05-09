'use client';

import { useState, useMemo, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { MENU_DATA, type MenuCategory } from '@/data/menu';
import styles from './MenuPage.module.css';

const easeOut = [0.16, 1, 0.3, 1] as [number, number, number, number];

// ─── Hero ──────────────────────────────────────────────────────────────────────

function MenuHero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 80]);

  return (
    <div ref={ref} className={styles.hero}>
      <motion.div className={styles.heroBg} style={{ y }} aria-hidden="true">
        <div className={styles.heroWave1} />
        <div className={styles.heroWave2} />
        <div className={styles.heroWave3} />
      </motion.div>

      <div className={styles.heroContent}>
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: easeOut }}
        >
          <span className={styles.heroLabel}>
            <span className={styles.heroLabelLine} />
            İzmir Balıkçısı
            <span className={styles.heroLabelLine} />
          </span>
        </motion.div>

        <motion.h1
          className={styles.heroTitle}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: easeOut, delay: 0.1 }}
        >
          Menümüz
        </motion.h1>

        <motion.p
          className={styles.heroSub}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: easeOut, delay: 0.22 }}
        >
          Her gün taze gelen deniz ürünleri, geleneksel mezeler ve özel tatlılar.<br />
          Tüm fiyatlar günlük piyasaya göre belirlenmektedir.
        </motion.p>

        <motion.div
          className={styles.heroMeta}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <span className={styles.heroBadge}>🌿 100% Alkolsüz</span>
          <span className={styles.heroBadge}>🐟 {MENU_DATA.reduce((a, c) => a + c.items.length, 0)}+ Çeşit</span>
          <span className={styles.heroBadge}>📍 İzmir</span>
        </motion.div>
      </div>

      <div className={styles.heroWaveBottom} aria-hidden="true">
        <svg viewBox="0 0 1440 60" fill="none" preserveAspectRatio="none">
          <path d="M0 30 C240 0 480 60 720 30 C960 0 1200 60 1440 30 L1440 60 L0 60 Z" fill="var(--cream-50)" />
        </svg>
      </div>
    </div>
  );
}

// ─── Sidebar Nav ───────────────────────────────────────────────────────────────

function CategorySidebar({ categories, active, onSelect }: {
  categories: MenuCategory[];
  active: string | null;
  onSelect: (id: string) => void;
}) {
  return (
    <nav className={styles.sidebar}>
      <p className={styles.sidebarTitle}>Kategoriler</p>
      <ul className={styles.sidebarList}>
        <li>
          <button
            className={`${styles.sidebarItem} ${active === null ? styles.sidebarActive : ''}`}
            onClick={() => onSelect('all')}
          >
            <span>🍽️</span>
            <span>Tümü</span>
            <span className={styles.sidebarCount}>{MENU_DATA.reduce((a, c) => a + c.items.length, 0)}</span>
          </button>
        </li>
        {categories.map((cat) => (
          <li key={cat.id}>
            <button
              className={`${styles.sidebarItem} ${active === cat.id ? styles.sidebarActive : ''}`}
              onClick={() => onSelect(cat.id)}
            >
              <span>{cat.emoji}</span>
              <span>{cat.name}</span>
              <span className={styles.sidebarCount}>{cat.items.length}</span>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}

// ─── Search ────────────────────────────────────────────────────────────────────

function SearchBar({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div className={styles.searchWrap}>
      <svg className={styles.searchIcon} width="18" height="18" viewBox="0 0 18 18" fill="none">
        <circle cx="8" cy="8" r="5.5" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M12.5 12.5l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
      <input
        type="search"
        className={styles.searchInput}
        placeholder="Yemek ara..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label="Menüde ara"
      />
      {value && (
        <button className={styles.searchClear} onClick={() => onChange('')} aria-label="Temizle">
          ✕
        </button>
      )}
    </div>
  );
}

// ─── Kategori Bloku ────────────────────────────────────────────────────────────

function CategoryBlock({ category, index }: { category: MenuCategory; index: number }) {
  return (
    <motion.section
      id={category.id}
      className={styles.catBlock}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: easeOut, delay: index * 0.04 }}
    >
      <div className={styles.catHeader}>
        <span className={styles.catEmoji}>{category.emoji}</span>
        <div>
          <h2 className={styles.catName}>{category.name}</h2>
          {category.nameEn && <p className={styles.catNameEn}>{category.nameEn}</p>}
        </div>
        <span className={styles.catCount}>{category.items.length} çeşit</span>
      </div>

      <div className={styles.itemGrid}>
        {category.items.map((item) => (
          <div key={item.id} className={styles.item}>
            <div className={styles.itemMain}>
              <p className={styles.itemName}>{item.name}</p>
              {item.description && (
                <p className={styles.itemDesc}>{item.description}</p>
              )}
            </div>
            <div className={styles.itemRight}>
              {item.unit && <span className={styles.itemUnit}>/ {item.unit}</span>}
              <span className={styles.itemPrice}>
                {item.price ? `${item.price} ₺` : 'Günlük'}
              </span>
            </div>
          </div>
        ))}
      </div>
    </motion.section>
  );
}

// ─── Ana Sayfa ─────────────────────────────────────────────────────────────────

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSelect = (id: string) => {
    if (id === 'all') {
      setActiveCategory(null);
    } else {
      setActiveCategory(id);
      // Smooth scroll to section
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 50);
    }
  };

  const filteredData = useMemo(() => {
    let data = activeCategory
      ? MENU_DATA.filter((c) => c.id === activeCategory)
      : MENU_DATA;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      data = data
        .map((cat) => ({
          ...cat,
          items: cat.items.filter(
            (item) =>
              item.name.toLowerCase().includes(q) ||
              (item.description?.toLowerCase().includes(q) ?? false)
          ),
        }))
        .filter((cat) => cat.items.length > 0);
    }

    return data;
  }, [activeCategory, searchQuery]);

  return (
    <div className={styles.page}>
      <MenuHero />

      <div className={styles.body}>
        {/* Sidebar */}
        <aside className={styles.sidebarWrap}>
          <div className={styles.sidebarSticky}>
            <SearchBar value={searchQuery} onChange={setSearchQuery} />
            <CategorySidebar
              categories={MENU_DATA}
              active={activeCategory}
              onSelect={handleSelect}
            />
          </div>
        </aside>

        {/* İçerik */}
        <main className={styles.main}>
          {/* Not */}
          <motion.div
            className={styles.priceNote}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <span>ℹ️</span>
            <p>KG ile satılan balıkların fiyatları günlük piyasaya göre değişmektedir. Güncel fiyat için lütfen sorunuz.</p>
          </motion.div>

          {/* Kategoriler */}
          <AnimatePresence mode="wait">
            {filteredData.length > 0 ? (
              <motion.div
                key={`${activeCategory}-${searchQuery}`}
                className={styles.catList}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
              >
                {filteredData.map((cat, i) => (
                  <CategoryBlock key={cat.id} category={cat} index={i} />
                ))}
              </motion.div>
            ) : (
              <motion.div
                className={styles.empty}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <span>🔍</span>
                <p>&ldquo;{searchQuery}&rdquo; için sonuç bulunamadı.</p>
                <button onClick={() => setSearchQuery('')} className={styles.emptyBtn}>
                  Aramayı Temizle
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>

      {/* Alt CTA */}
      <div className={styles.bottomCta}>
        <div className={styles.bottomCtaInner}>
          <p className={styles.bottomCtaText}>Rezervasyon veya özel menü için bize ulaşın</p>
          <Link href="/#iletisim" className={styles.bottomCtaBtn}>
            Rezervasyon Yap
          </Link>
        </div>
      </div>
    </div>
  );
}
