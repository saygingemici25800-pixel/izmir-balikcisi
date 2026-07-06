import { useTranslations } from 'next-intl';
import styles from './Footer.module.css';
import { RESTAURANT } from '@/lib/constants';
import { Link } from '@/i18n/navigation';
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
            <li><Link href="/hikaye">{tn('hikaye')}</Link></li>
            <li><Link href="/menu">{tn('menu')}</Link></li>
            <li><Link href="/galeri">{tn('galeri')}</Link></li>
            <li><Link href="/iletisim">{tn('iletisim')}</Link></li>
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
