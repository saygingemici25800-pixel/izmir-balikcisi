import { useTranslations } from 'next-intl';
import styles from './Footer.module.css';
import { RESTAURANT } from '@/lib/constants';
import { SectionLink } from '@/components/SectionLink';
import { SisterCta } from '@/components/SisterCta/SisterCta';

export function Footer() {
  const t = useTranslations('footer');
  const tn = useTranslations('nav');
  return (
    <footer className={styles.footer}>
      <div className={styles.grid}>
        <div className={styles.brand}>
          <span className={styles.markLg}>İzmir Balıkçısı</span>
          <p className={styles.brandCopy}>{t('brandCopy')}</p>
          <p className={styles.contactLine}>
            <a href={`tel:${RESTAURANT.phoneE164}`}>{RESTAURANT.phoneDisplay}</a>
            <a href={`mailto:${RESTAURANT.email}`}>{RESTAURANT.email}</a>
          </p>
        </div>

        <nav className={styles.col} aria-label={t('colSection')}>
          <h4>{t('colSection')}</h4>
          <ul>
            <li><SectionLink id="hikaye">{tn('hikaye')}</SectionLink></li>
            <li><SectionLink id="menu">{tn('menu')}</SectionLink></li>
            <li><SectionLink id="galeri">{tn('galeri')}</SectionLink></li>
            <li><SectionLink id="iletisim">{tn('iletisim')}</SectionLink></li>
          </ul>
        </nav>

        <div className={styles.col}>
          <h4>{t('sisterBadge')}</h4>
          <SisterCta />
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
