'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import styles from './Contact.module.css';
import { RESTAURANT } from '@/lib/constants';

const SISTER_URL = 'https://calis-balikcisi.vercel.app';
const CONTACT_IMG =
  'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1100&q=80';

const MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  RESTAURANT.address.full
)}`;

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

        <motion.div className={styles.photo} {...reveal}>
          <Image src={CONTACT_IMG} alt="" fill sizes="(max-width: 860px) 92vw, 520px" className={styles.photoImg} />
        </motion.div>
      </div>
    </section>
  );
}
