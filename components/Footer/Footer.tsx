import styles from './Footer.module.css';
import { RESTAURANT } from '@/lib/constants';

const MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  RESTAURANT.address.full
)}`;

export function Footer() {
  return (
    <footer className={styles.footer}>
      <p className={styles.colophon}>
        Otuz beş yıllık <em>sofra</em>; içkisiz, doğru saatte, doğru insanla.
      </p>

      <div className={styles.grid}>
        <div className={styles.brand}>
          <span className={styles.markLg}>İzmir Balıkçısı</span>
          <p className={styles.brandCopy}>
            1989'dan bu yana Fethiye'de. Otuz beş yıldır aynı kapı, aynı masa,
            aynı tabaklar. Editöryal bir restoran.
          </p>
        </div>

        <div className={styles.col}>
          <h4>Bölüm</h4>
          <ul>
            <li><a href="#hikaye">Hikâye</a></li>
            <li><a href="#menu">Menü</a></li>
            <li><a href="#manifesto">Manifesto</a></li>
            <li><a href="#yorumlar">Yorumlar</a></li>
            <li><a href="#galeri">Galeri</a></li>
            <li><a href="#iletisim">İletişim</a></li>
          </ul>
        </div>

        <div className={styles.col}>
          <h4>İletişim</h4>
          <ul>
            <li><a href={`tel:${RESTAURANT.phoneE164}`}>{RESTAURANT.phoneDisplay}</a></li>
            <li><a href={`mailto:${RESTAURANT.email}`}>{RESTAURANT.email}</a></li>
            <li><a href={MAPS_URL} target="_blank" rel="noreferrer">Tuzla · Fethiye / Muğla</a></li>
          </ul>
        </div>

        <div className={styles.col}>
          <h4>Sosyal</h4>
          <ul>
            <li><a href={RESTAURANT.social.instagram} target="_blank" rel="noreferrer">Instagram</a></li>
            <li><a href="#" target="_blank" rel="noreferrer">TripAdvisor</a></li>
            <li><a href="https://calis-balikcisi.vercel.app" target="_blank" rel="noreferrer">Kardeş site</a></li>
          </ul>
        </div>
      </div>

      <div className={styles.bottom}>
        <span>© 1989—2026</span>
        <span className={styles.rule} aria-hidden />
        <span>Bahar Sayısı · Set in Panchang</span>
      </div>
    </footer>
  );
}
