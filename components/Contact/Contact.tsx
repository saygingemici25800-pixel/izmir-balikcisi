'use client';

import { motion } from 'framer-motion';
import styles from './Contact.module.css';
import { RESTAURANT } from '@/lib/constants';

const reveal = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-10% 0px' },
} as const;

const MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  RESTAURANT.address.full
)}`;

const MAPS_EMBED = `https://maps.google.com/maps?q=${encodeURIComponent(
  RESTAURANT.address.full
)}&z=16&output=embed`;

export function Contact() {
  return (
    <section className={styles.section} id="iletisim">
      <div className={styles.frame}>
        <motion.div
          className={styles.header}
          {...reveal}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className={styles.eyebrowRow}>
            <span>№ 07 — İletişim</span>
            <span className={styles.ruleLong} aria-hidden />
            <span>Her gün · 10.30—22.30</span>
          </div>
          <h2 className={styles.title}>
            Bir <em>masa</em><br />ayırtalım.
          </h2>
          <p className={styles.lede}>
            Telefon en hızlısı. Pencere kenarı için biraz erken arayın; en iyi
            ışık 19.30 ile 20.15 arası.
          </p>

          <div className={styles.ctaRow}>
            <a
              className={`${styles.cta} ${styles.primary}`}
              href={`tel:${RESTAURANT.phoneE164}`}
              data-magnetic
              data-cursor-label="Ara"
            >
              <span className={styles.ctaDot} aria-hidden />
              {RESTAURANT.phoneDisplay} <span className={styles.arrow} aria-hidden />
            </a>
            <a
              className={styles.cta}
              href={MAPS_URL}
              target="_blank"
              rel="noreferrer"
              data-magnetic
              data-cursor-label="Yol tarifi"
            >
              Yol tarifi al <span className={styles.arrow} aria-hidden />
            </a>
          </div>
        </motion.div>

        <motion.div
          className={styles.details}
          {...reveal}
          transition={{ duration: 0.7, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
        >
          <dl className={styles.block}>
            <dt>Adres</dt>
            <dd>
              <a
                className={styles.contactLink}
                href={MAPS_URL}
                target="_blank"
                rel="noreferrer"
              >
                {RESTAURANT.address.street}<br />
                {RESTAURANT.address.postalCode} {RESTAURANT.address.locality} / {RESTAURANT.address.region}
              </a>
              <span className={styles.small}>
                {RESTAURANT.location.lat}° K · {RESTAURANT.location.lng}° D
              </span>
            </dd>
          </dl>
          <dl className={styles.block}>
            <dt>Telefon</dt>
            <dd>
              <a className={styles.contactLink} href={`tel:${RESTAURANT.phoneE164}`}>
                {RESTAURANT.phoneDisplay}
              </a>
              <span className={styles.small}>Tıkla & ara · WhatsApp kabul ediyoruz</span>
            </dd>
          </dl>
          <dl className={styles.block}>
            <dt>Saatler</dt>
            <dd>
              Her gün · 10.30 — 22.30
              <span className={styles.small}>Mutfak son sipariş 22.00</span>
            </dd>
          </dl>
          <dl className={styles.block}>
            <dt>Notlar</dt>
            <dd>
              Aile dostu · 0% alkol · Vejetaryen menü mevcut
              <span className={styles.small}>Servis ücreti dahildir</span>
            </dd>
          </dl>
        </motion.div>

        <motion.div
          className={styles.mapWrap}
          {...reveal}
          transition={{ duration: 0.7, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
        >
          <iframe
            className={styles.map}
            src={MAPS_EMBED}
            title={`${RESTAURANT.name} konumu — Tuzla, Fethiye / Muğla`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
          <div className={styles.mapGlow} aria-hidden />
          <a
            className={styles.mapOpen}
            href={MAPS_URL}
            target="_blank"
            rel="noreferrer"
            data-magnetic
            data-cursor-label="Aç"
          >
            <span className={styles.mapPin} aria-hidden />
            Google Maps'te aç
          </a>
        </motion.div>
      </div>
    </section>
  );
}
