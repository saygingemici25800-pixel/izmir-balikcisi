'use client';

import styles from './Contact.module.css';

export function Contact() {
  return (
    <section className={styles.section} id="iletisim">
      <div className={styles.frame}>
        <div className={styles.header}>
          <div className={styles.eyebrowRow}>
            <span>№ 06 — İletişim</span>
            <span className={styles.ruleLong} aria-hidden />
            <span>Açık · 12—24</span>
          </div>
          <h2 className={styles.title}>
            Bir <em>masa</em><br />ayırtalım.
          </h2>
          <p className={styles.lede}>
            Telefon en hızlısı. Pencere kenarı için biraz erken arayın; en iyi
            ışık 19.30 ile 20.15 arası.
          </p>
        </div>

        <div className={styles.details}>
          <dl className={styles.block}>
            <dt>Adres</dt>
            <dd>
              Atatürk Cad. № 38<br />
              Fethiye / Muğla
              <span className={styles.small}>36.6536° K · 29.1268° D</span>
            </dd>
          </dl>
          <dl className={styles.block}>
            <dt>Telefon</dt>
            <dd>
              +90 252 000 00 00
              <span className={styles.small}>WhatsApp kabul ediyoruz</span>
            </dd>
          </dl>
          <dl className={styles.block}>
            <dt>Saatler</dt>
            <dd>
              Pzt — Çar · 12.00—23.00<br />
              Per — Pzr · 12.00—00.00
              <span className={styles.small}>Mutfak kapanışı saat dönmeden 45 dk önce</span>
            </dd>
          </dl>
          <dl className={styles.block}>
            <dt>Notlar</dt>
            <dd>
              Aile dostu · 0% alkol · Vejetaryen menü mevcut
              <span className={styles.small}>Servis ücreti dahildir</span>
            </dd>
          </dl>

          <div className={styles.ctaRow}>
            <a className={`${styles.cta} ${styles.primary}`} href="tel:+902520000000" data-magnetic data-cursor-label="Ara">
              Hemen Ara <span className={styles.arrow} aria-hidden />
            </a>
            <a className={styles.cta} href="https://maps.google.com" target="_blank" rel="noreferrer" data-magnetic data-cursor-label="Haritada">
              Haritada gör <span className={styles.arrow} aria-hidden />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
