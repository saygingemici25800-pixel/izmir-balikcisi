import { useTranslations } from 'next-intl';
import styles from './MenuFull.module.css';
import { pickLocale, type MenuCategory } from '@/lib/menu';
import { menuMediaFor } from '@/lib/menuMedia';
import { MenuMediaButton } from '@/components/MenuMedia/MenuMediaButton';

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
            {cat.items.map((item, i) => {
              const name = pickLocale(item.name, locale);
              const price = item.daily ? t('daily') : item.price ? `${item.price}${item.unit ?? '₺'}` : t('notSeasonal');
              const media = menuMediaFor(item.name?.tr);
              return (
                <li key={i} className={styles.item}>
                  <div className={styles.itemHead}>
                    <h3 className={styles.itemName}>
                      {media ? (
                        <MenuMediaButton
                          media={media}
                          name={name}
                          price={price}
                          openLabel={`${name} — ${t('mediaOpen')}`}
                          closeLabel={t('mediaClose')}
                        >
                          {name}
                        </MenuMediaButton>
                      ) : (
                        name
                      )}
                    </h3>
                    <span className={styles.leader} aria-hidden />
                    <span className={styles.itemPrice}>{price}</span>
                  </div>
                </li>
              );
            })}
          </ul>
        </section>
      ))}
    </>
  );
}
