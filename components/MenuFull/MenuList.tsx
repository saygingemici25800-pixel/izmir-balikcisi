import { useTranslations } from 'next-intl';
import styles from './MenuFull.module.css';
import { pickLocale, type MenuCategory } from '@/lib/menu';

type Props = { categories: readonly MenuCategory[]; locale: string };

// Calm typographic menu — static rows (serif name · dotted leader · price).
export default function MenuList({ categories, locale }: Props) {
  const t = useTranslations('menuFull');
  return (
    <>
      {categories.map((cat) => (
        <section key={cat.id} id={cat.id} className={styles.category}>
          <header className={styles.catHead}>
            <h2 className={styles.catTitle}>{pickLocale(cat.title, locale)}</h2>
            {cat.subtitle && <p className={styles.catSub}>{pickLocale(cat.subtitle, locale)}</p>}
          </header>

          <ul className={styles.list}>
            {cat.items.map((item, i) => (
              <li key={i} className={styles.item}>
                <div className={styles.itemHead}>
                  <h3 className={styles.itemName}>{pickLocale(item.name, locale)}</h3>
                  <span className={styles.leader} aria-hidden />
                  <span className={styles.itemPrice}>
                    {item.daily ? t('daily') : item.price ? `${item.price}${item.unit ?? '₺'}` : '—'}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </>
  );
}
