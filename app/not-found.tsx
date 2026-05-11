import Link from 'next/link';
import type { Metadata } from 'next';
import styles from './not-found.module.css';

export const metadata: Metadata = {
  title: 'Bu masada yer yok — 404',
  description: 'Aradığınız sayfa bulunamadı. Ana sayfaya veya menüye dönebilirsiniz.',
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <article className={styles.page}>
      <div className={styles.frame}>
        <p className={styles.eyebrow}>№ 404 — Bulunamadı</p>
        <span className={styles.big}>404</span>
        <h1 className={styles.title}>
          Bu <strong>masada</strong> yer yok.
        </h1>
        <p className={styles.lede}>
          Aradığınız sayfa ya kaldırıldı, ya da hiç var olmadı. Ana sofraya
          dönelim — ya da menüye göz atın.
        </p>
        <div className={styles.actions}>
          <Link href="/" className={`${styles.btn} ${styles.primary}`} data-magnetic data-cursor-label="Ana sayfa">
            Ana sayfa
          </Link>
          <Link href="/menu" className={styles.btn} data-magnetic data-cursor-label="Menü">
            Menüye göz at
          </Link>
        </div>
      </div>

      <footer className={styles.foot}>
        <span>İzmir Balıkçısı</span>
        <span>Fethiye / Muğla · Est. 1989</span>
      </footer>
    </article>
  );
}
