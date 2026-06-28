'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
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
  const t = useTranslations('contact');
  return (
    <section className={styles.section} id="iletisim">
      <div className={styles.frame}>
        <motion.div
          className={styles.header}
          {...reveal}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className={styles.eyebrowRow}>
            <span>{t('eyebrow')}</span>
            <span className={styles.ruleLong} aria-hidden />
            <span>{t('hours')}</span>
          </div>
          <h2 className={styles.title}>
            {t.rich('title', { em: (chunks) => <em>{chunks}</em>, br: () => <br /> })}
          </h2>
          <p className={styles.lede}>{t('lede')}</p>

          <div className={styles.ctaRow}>
            <a
              className={`${styles.cta} ${styles.primary}`}
              href={`tel:${RESTAURANT.phoneE164}`}
              data-magnetic
              data-cursor-label={t('call')}
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
              data-cursor-label={t('directionsLabel')}
            >
              {t('directions')} <span className={styles.arrow} aria-hidden />
            </a>
          </div>
        </motion.div>

        <motion.div
          className={styles.details}
          {...reveal}
          transition={{ duration: 0.7, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
        >
          <dl className={styles.block}>
            <dt>{t('addressLabel')}</dt>
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
                {t('coords', { lat: RESTAURANT.location.lat, lng: RESTAURANT.location.lng })}
              </span>
            </dd>
          </dl>
          <dl className={styles.block}>
            <dt>{t('phoneLabel')}</dt>
            <dd>
              <a className={styles.contactLink} href={`tel:${RESTAURANT.phoneE164}`}>
                {RESTAURANT.phoneDisplay}
              </a>
              <span className={styles.small}>{t('phoneNote')}</span>
            </dd>
          </dl>
          <dl className={styles.block}>
            <dt>{t('hoursLabel')}</dt>
            <dd>
              {t('hoursValue')}
              <span className={styles.small}>{t('hoursNote')}</span>
            </dd>
          </dl>
          <dl className={styles.block}>
            <dt>{t('notesLabel')}</dt>
            <dd>
              {t('notesValue')}
              <span className={styles.small}>{t('notesNote')}</span>
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
            title={t('mapTitle', { name: RESTAURANT.name })}
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
            data-cursor-label={t('openMapsLabel')}
          >
            <span className={styles.mapPin} aria-hidden />
            {t('openMaps')}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
