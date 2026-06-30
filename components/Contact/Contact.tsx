'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import styles from './Contact.module.css';
import { RESTAURANT } from '@/lib/constants';

const SISTER_URL = 'https://calis-balikcisi.vercel.app';

// Directions link (provided) — used by the address + "Yol tarifi al".
const MAPS_URL =
  'https://www.google.com/maps/dir//Fethiye+Alkols%C3%BCz+Bal%C4%B1k+Restoran%C4%B1+-+%C4%B0zmir+Bal%C4%B1k+Pi%C5%9Firicisi,+Tuzla,+Mustafa+Kemal+Blv.+No:30,+48300+Fethiye%2FMu%C4%9Fla/@36.6094761,29.1274329,15z';

// Embedded map (no API key needed).
const MAPS_EMBED = `https://maps.google.com/maps?q=${encodeURIComponent(
  'Fethiye Alkolsüz Balık Restoranı, Tuzla, Mustafa Kemal Blv. No:30, 48300 Fethiye/Muğla'
)}&z=15&output=embed`;

const reveal = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-12% 0px' },
  transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const },
};

export function Contact() {
  const t = useTranslations('contact');
  return (
    <section className={styles.section} id="iletisim">
      <motion.div className={styles.head} {...reveal}>
        <span className="eyebrow">{t('eyebrow')}</span>
        <h2 className={styles.heading}>{t('heading')}</h2>
      </motion.div>

      <div className={styles.grid}>
        <motion.div className={styles.info} {...reveal}>
          <a className={styles.phone} href={`tel:${RESTAURANT.phoneE164}`} data-magnetic data-cursor-label={t('call')}>
            <span className={styles.phoneLabel}>{t('phoneLabel')}</span>
            <span className={styles.phoneNum}>{RESTAURANT.phoneDisplay}</span>
          </a>

          <dl className={styles.blocks}>
            <div className={styles.block}>
              <dt>{t('addressLabel')}</dt>
              <dd>
                <a className={styles.link} href={MAPS_URL} target="_blank" rel="noreferrer">
                  {RESTAURANT.address.street}<br />
                  {RESTAURANT.address.postalCode} {RESTAURANT.address.locality} / {RESTAURANT.address.region}
                </a>
                <a className={styles.dirLink} href={MAPS_URL} target="_blank" rel="noreferrer" data-magnetic data-cursor-label={t('directionsLabel')}>
                  {t('directions')} <span aria-hidden>→</span>
                </a>
              </dd>
            </div>

            <div className={styles.block}>
              <dt>{t('hoursLabel')}</dt>
              <dd>
                {t('hoursValue')}
                <span className={styles.small}>{t('hoursNote')}</span>
              </dd>
            </div>

            <div className={styles.block}>
              <dt>{t('sisterLabel')}</dt>
              <dd>
                <a className={styles.link} href={SISTER_URL} target="_blank" rel="noreferrer" data-magnetic data-cursor-label={t('sisterCta')}>
                  Çalış Balıkçısı <span aria-hidden>→</span>
                </a>
                <span className={styles.small}>{t('sisterNote')}</span>
              </dd>
            </div>
          </dl>
        </motion.div>

        <motion.div className={styles.mapWrap} {...reveal}>
          <iframe
            className={styles.map}
            src={MAPS_EMBED}
            title={t('mapTitle', { name: RESTAURANT.name })}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
          <span className={styles.mapFrame} aria-hidden />
          <a
            className={styles.mapOpen}
            href={MAPS_URL}
            target="_blank"
            rel="noreferrer"
            data-magnetic
            data-cursor-label={t('openMapsLabel')}
          >
            {t('openMaps')} <span aria-hidden>→</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
