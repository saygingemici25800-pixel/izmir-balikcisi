import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { itemCount, type MenuCategory } from '@/lib/content';
import styles from './MenuFull.module.css';
import MenuToc from './MenuToc';
import MenuList from './MenuList';

export default function MenuFull({ menu }: { menu: MenuCategory[] }) {
  const t = useTranslations('menuFull');
  return (
    <article className={styles.page}>
      <header className={styles.head}>
        <span className={styles.meta}>{t('eyebrow')}</span>
        <span className={styles.rule} aria-hidden />
        <span className={styles.meta}>{t('meta', { count: itemCount(menu) })}</span>
      </header>

      <h1 className={styles.title}>{t('title')}</h1>

      <p className={styles.lede}>
        {t.rich('lede', { em: (chunks) => <em>{chunks}</em> })}
      </p>

      <MenuToc categories={menu} />

      <MenuList categories={menu} />

      <aside className={styles.note}>
        <span className={styles.badge}>{t('noteBadge')}</span>
        <p className={styles.body}>
          {t.rich('note', { em: (chunks) => <em>{chunks}</em> })}
        </p>
      </aside>

      <Link href="/" className={styles.back} data-magnetic data-cursor-label={t('backLabel')}>
        {t('back')}
      </Link>
    </article>
  );
}
