import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { pickLocale, type MenuCategory } from '@/lib/menu';
import { menuMediaFor } from '@/lib/menuMedia';
import { MenuMediaButton } from '@/components/MenuMedia/MenuMediaButton';
import styles from './MenuScroll.module.css';
import { TextReveal } from '@/components/TextReveal/TextReveal';

// Home menu PREVIEW — calm typographic two-column list (first two categories),
// serif names + price / "Günlük", optional food photos, link to the full menu.
export function MenuScroll({ menu, locale }: { menu: MenuCategory[]; locale: string }) {
  const t = useTranslations('menuScroll');
  const tm = useTranslations('menuFull');
  const cols = menu.slice(0, 2).map((cat) => ({ ...cat, items: cat.items.slice(0, 6) }));
  const photos = menu.flatMap((c) => c.items).filter((i) => i.img).slice(0, 2);

  return (
    <section className={styles.section} id="menu">
      <header className={styles.head}>
        <span className="eyebrow">{t('eyebrow')}</span>
        <TextReveal as="h2" className={styles.heading}>{t.rich('title', { em: (chunks) => <em>{chunks}</em> })}</TextReveal>
      </header>

      <div className={styles.cols}>
        {cols.map((cat) => (
          <div className={styles.col} key={cat.id}>
            <h3 className={styles.colTitle}>{pickLocale(cat.title, locale)}</h3>
            <ul className={styles.list}>
              {cat.items.map((item, i) => {
                const name = pickLocale(item.name, locale);
                const price = item.daily ? t('daily') : item.price ? `${item.price}${item.unit ?? '₺'}` : t('notSeasonal');
                const media = menuMediaFor(item.name?.tr);
                return (
                  <li className={styles.row} key={i}>
                    <span className={styles.name}>
                      {media ? (
                        <MenuMediaButton
                          media={media}
                          name={name}
                          price={price}
                          openLabel={`${name} — ${tm('mediaOpen')}`}
                          closeLabel={tm('mediaClose')}
                        >
                          {name}
                        </MenuMediaButton>
                      ) : (
                        name
                      )}
                    </span>
                    <span className={styles.leader} aria-hidden />
                    <span className={styles.price}>{price}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>

      {photos.length > 0 && (
        <div className={styles.photos}>
          {photos.map((p, i) => (
            <div className={styles.photo} key={i}>
              <Image
                src={p.img as string}
                alt={pickLocale(p.name, locale)}
                fill
                sizes="(max-width: 860px) 92vw, 540px"
                className={styles.photoImg}
              />
            </div>
          ))}
        </div>
      )}

      <Link href="/menu" className={styles.all} data-magnetic data-cursor-label={t('allMenu')}>
        {t('all')}
      </Link>
    </section>
  );
}
