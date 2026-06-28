import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import styles from './not-found.module.css';

export default function NotFound() {
  const t = useTranslations('notFound');
  return (
    <article className={styles.page}>
      <div className={styles.frame}>
        <p className={styles.eyebrow}>{t('eyebrow')}</p>
        <span className={styles.big}>404</span>
        <h1 className={styles.title}>
          {t.rich('title', { strong: (chunks) => <strong>{chunks}</strong> })}
        </h1>
        <p className={styles.lede}>{t('lede')}</p>
        <div className={styles.actions}>
          <Link href="/" className={`${styles.btn} ${styles.primary}`} data-magnetic data-cursor-label={t('home')}>
            {t('home')}
          </Link>
          <Link href="/menu" className={styles.btn} data-magnetic data-cursor-label={t('menuLabel')}>
            {t('menu')}
          </Link>
        </div>
      </div>

      <footer className={styles.foot}>
        <span>İzmir Balıkçısı</span>
        <span>{t('footRegion')}</span>
      </footer>
    </article>
  );
}
