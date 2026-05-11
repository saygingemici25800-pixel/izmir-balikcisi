import Link from 'next/link';
import { MENU, itemCount } from '@/lib/menu';
import styles from './MenuFull.module.css';
import MenuToc from './MenuToc';
import MenuList from './MenuList';

export default function MenuFull() {
  return (
    <article className={styles.page}>
      <header className={styles.head}>
        <span className={styles.meta}>№ 03 — Menü</span>
        <span className={styles.rule} aria-hidden />
        <span className={styles.meta}>Bahar 2026 · {itemCount()} tabak</span>
      </header>

      <h1 className={styles.title}>Menü</h1>

      <p className={styles.lede}>
        Otuz beş yıllık bir <em>sofra</em>. Mevsime göre değişen tabaklar; bütün
        olarak ızgaradan, masada açılan tuzda pişene, gevrek tavalardan
        sakızlı muhallebiye. Burası alkolsüz bir ev — eve dönüş gibi.
      </p>

      <MenuToc />

      <MenuList categories={MENU} />

      <aside className={styles.note}>
        <span className={styles.badge}>0%</span>
        <p className={styles.body}>
          Burası <em>alkolsüz</em> bir ev. Şarap ve rakı yerine ev limonatası,
          köpürtülmüş ayran, soğuk Türk kahvesi ve ince belli bardakta sınırsız
          çay var. Çocuklar için özel porsiyonlar masada belirtebilirsiniz.
        </p>
      </aside>

      <Link href="/" className={styles.back} data-magnetic data-cursor-label="Ana sayfa">
        ← Ana sayfaya dön
      </Link>
    </article>
  );
}
