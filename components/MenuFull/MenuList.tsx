import { useTranslations } from 'next-intl';
import styles from './MenuFull.module.css';
import type { MenuCategory } from '@/lib/menu';

type Props = { categories: readonly MenuCategory[] };

// Calm typographic menu — static rows (serif name · dotted leader · price),
// description + tags below. No detail sheet.
export default function MenuList({ categories }: Props) {
  const t = useTranslations('menuFull');
  return (
    <>
      {categories.map((cat) => (
        <section key={cat.id} id={cat.id} className={styles.category}>
          <header className={styles.catHead}>
            <h2 className={styles.catTitle}>{cat.title}</h2>
            {cat.subtitle && <p className={styles.catSub}>{cat.subtitle}</p>}
          </header>

          <ul className={styles.list}>
            {cat.items.map((item) => (
              <li key={item.name} className={styles.item}>
                <div className={styles.itemHead}>
                  <h3 className={styles.itemName}>{item.name}</h3>
                  <span className={styles.leader} aria-hidden />
                  <span className={styles.itemPrice}>
                    {item.daily ? t('daily') : `${item.price}${item.unit ?? '₺'}`}
                  </span>
                </div>
                {item.desc && <p className={styles.itemDesc}>{item.desc}</p>}
                {item.tags && item.tags.length > 0 && (
                  <span className={styles.itemTags}>{item.tags.join(' · ')}</span>
                )}
              </li>
            ))}
          </ul>
        </section>
      ))}
    </>
  );
}
