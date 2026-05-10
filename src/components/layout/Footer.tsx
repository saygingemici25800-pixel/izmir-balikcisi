import Link from 'next/link';
import { RESTAURANT, SISTER_VENUE, NAV_LINKS } from '@/data/constants';
import styles from './Footer.module.css';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>

        {/* Üst kısım */}
        <div className={styles.top}>

          {/* Logo & Açıklama */}
          <div className={styles.brand}>
            <Link href="/" className={styles.logo}>
              <span>🐟</span>
              <span className={styles.logoText}>İzmir Balıkçısı</span>
            </Link>
            <p className={styles.brandDesc}>
              Fethiye / Muğla&apos;da, her gün taze deniz ürünleri.
              Alkolsüz, aile dostu, huzurlu bir sofra.
            </p>
            <div className={styles.badge}>
              <span className={styles.badgeDot} />
              <span>100% Alkolsüz Mekan</span>
            </div>
          </div>

          {/* Navigasyon */}
          <div className={styles.navGroup}>
            <p className={styles.groupTitle}>Menü</p>
            <nav>
              {NAV_LINKS.map((link) => (
                <Link key={link.href} href={link.href} className={styles.navLink}>
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* İletişim */}
          <div className={styles.navGroup}>
            <p className={styles.groupTitle}>İletişim</p>
            <div className={styles.contactList}>
              <span className={styles.contactItem}>
                📍 {RESTAURANT.address}
              </span>
              <span className={styles.contactItem}>
                📞 {RESTAURANT.phone}
              </span>
              <span className={styles.contactItem}>
                🕐 {RESTAURANT.hours.weekdays} (Hft İçi)
              </span>
              <span className={styles.contactItem}>
                🕐 {RESTAURANT.hours.weekends} (Hft Sonu)
              </span>
            </div>
          </div>

          {/* Kardeş Mekan */}
          <div className={styles.navGroup}>
            <p className={styles.groupTitle}>Kardeş Mekan</p>
            <a
              href={SISTER_VENUE.url}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.sisterCard}
            >
              <span className={styles.sisterEmoji}>🐟</span>
              <div>
                <p className={styles.sisterName}>{SISTER_VENUE.name}</p>
                <p className={styles.sisterLoc}>{SISTER_VENUE.location}</p>
              </div>
              <svg className={styles.sisterArrow} width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2.5 11.5l9-9M5 2.5h6.5V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </div>

        </div>

        {/* Divider */}
        <div className={styles.divider} />

        {/* Alt kısım */}
        <div className={styles.bottom}>
          <p className={styles.copy}>
            © {year} İzmir Balıkçısı. Tüm hakları saklıdır.
          </p>
          <p className={styles.madeWith}>
            Fethiye&apos;deki kardeşimiz:{' '}
            <a
              href={SISTER_VENUE.url}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.sisterLink}
            >
              Çalış Balıkçısı →
            </a>
          </p>
        </div>

      </div>
    </footer>
  );
}
