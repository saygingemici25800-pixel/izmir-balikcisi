import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { type MenuCategory } from '@/lib/menu';
import styles from './MenuScroll.module.css';

// Home menu PREVIEW — calm typographic two-column list (first two categories),
// serif names + price / "Günlük Fiyat", two food photos, link to the full menu.
export function MenuScroll({ menu }: { menu: MenuCategory[] }) {
  const t = useTranslations('menuScroll');
  const cols = menu.slice(0, 2).map((cat) => ({ ...cat, items: cat.items.slice(0, 6) }));
  const photos = menu.flatMap((c) => c.items).filter((i) => i.img).slice(0, 2);

  return (
    <section className={styles.section} id="menu">
      <header className={styles.head}>
        <span className="eyebrow">{t('eyebrow')}</span>
        <h2 className={styles.heading}>{t.rich('title', { em: (chunks) => <em>{chunks}</em> })}</h2>
      </header>

      <div className={styles.cols}>
        {cols.map((cat) => (
          <div className={styles.col} key={cat.id}>
            <h3 className={styles.colTitle}>{cat.title}</h3>
            <ul className={styles.list}>
              {cat.items.map((item) => (
                <li className={styles.row} key={item.name}>
                  <span className={styles.name}>{item.name}</span>
                  <span className={styles.leader} aria-hidden />
                  <span className={styles.price}>
                    {item.daily ? t('daily') : `${item.price}${item.unit ?? '₺'}`}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {photos.length > 0 && (
        <div className={styles.photos}>
          {photos.map((p) => (
            <div className={styles.photo} key={p.name}>
              <Image
                src={p.img as string}
                alt={p.name}
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
