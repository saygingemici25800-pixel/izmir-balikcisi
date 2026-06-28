import { useTranslations } from 'next-intl';
import styles from './Footer.module.css';
import { RESTAURANT } from '@/lib/constants';
import { SectionLink } from '@/components/SectionLink';

const MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  RESTAURANT.address.full
)}`;

export function Footer() {
  const t = useTranslations('footer');
  const tn = useTranslations('nav');
  return (
    <footer className={styles.footer}>
      <aside className={styles.sister}>
        <a
          className={styles.sisterCard}
          href="https://calis-balikcisi.vercel.app"
          target="_blank"
          rel="noreferrer"
          aria-label={t('sisterAria')}
          data-magnetic
          data-cursor-label={t('sisterTab')}
        >
          <span className={styles.sisterVisual} aria-hidden>
            <span className={styles.sisterBadge}>{t('sisterBadge')}</span>
            <span className={styles.sisterSun} />
            <span className={styles.sisterHorizon} />
            <span className={styles.sisterMark}>Çalış<br /><em>Balıkçısı</em></span>
          </span>

          <span className={styles.sisterCopy}>
            <span className={styles.sisterEyebrow}>{t('sisterEyebrow')}</span>
            <span className={styles.sisterTitle}>
              {t.rich('sisterTitle', { em: (chunks) => <em>{chunks}</em> })}
            </span>
            <span className={styles.sisterText}>{t('sisterText')}</span>
            <span className={styles.sisterBtn}>
              {t('sisterBtn')}
              <span className={styles.sisterArrow} aria-hidden>→</span>
            </span>
          </span>
        </a>
      </aside>

      <div className={styles.grid}>
        <div className={styles.brand}>
          <span className={styles.markLg}>İzmir Balıkçısı</span>
          <p className={styles.brandCopy}>{t('brandCopy')}</p>
        </div>

        <div className={styles.col}>
          <h4>{t('colSection')}</h4>
          <ul>
            <li><SectionLink id="hikaye">{tn('hikaye')}</SectionLink></li>
            <li><SectionLink id="menu">{tn('menu')}</SectionLink></li>
            <li><SectionLink id="galeri">{tn('galeri')}</SectionLink></li>
            <li><SectionLink id="manifesto">{tn('manifesto')}</SectionLink></li>
            <li><SectionLink id="yorumlar">{tn('yorumlar')}</SectionLink></li>
            <li><SectionLink id="iletisim">{tn('iletisim')}</SectionLink></li>
          </ul>
        </div>

        <div className={styles.col}>
          <h4>{t('colContact')}</h4>
          <ul>
            <li><a href={`tel:${RESTAURANT.phoneE164}`}>{RESTAURANT.phoneDisplay}</a></li>
            <li><a href={`mailto:${RESTAURANT.email}`}>{RESTAURANT.email}</a></li>
            <li><a href={MAPS_URL} target="_blank" rel="noreferrer">{t('addressShort')}</a></li>
          </ul>
        </div>

        <div className={styles.col}>
          <h4>{t('colSocial')}</h4>
          <ul>
            <li><a href={RESTAURANT.social.instagram} target="_blank" rel="noreferrer">Instagram</a></li>
            <li><a href="#" target="_blank" rel="noreferrer">TripAdvisor</a></li>
          </ul>
        </div>
      </div>

      <div className={styles.bottom}>
        <span>{t('copyright')}</span>
        <span className={styles.rule} aria-hidden />
        <span>{t('setIn')}</span>
      </div>
    </footer>
  );
}
