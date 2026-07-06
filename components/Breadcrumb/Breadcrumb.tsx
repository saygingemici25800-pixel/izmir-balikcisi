import { Link } from '@/i18n/navigation';
import { localeUrl } from '@/lib/seo';
import styles from './Breadcrumb.module.css';

type Crumb = { label: string; path: string };

/**
 * Visible breadcrumb (Home / Current) + `BreadcrumbList` JSON-LD. Sits directly
 * under the fixed nav (its top padding clears it). `PageShell` renders it as the
 * first element of every sub-page; the trail is always Home → current page.
 */
export function Breadcrumb({
  locale,
  homeLabel,
  current,
}: {
  locale: string;
  homeLabel: string;
  current: Crumb;
}) {
  const items = [
    { label: homeLabel, path: '' },
    { label: current.label, path: current.path },
  ];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.label,
      item: localeUrl(locale, c.path),
    })),
  };

  return (
    <nav className={styles.crumbs} aria-label={`${homeLabel} / ${current.label}`}>
      <ol className={styles.list}>
        <li>
          <Link href="/" className={styles.link}>
            {homeLabel}
          </Link>
        </li>
        <li aria-hidden className={styles.sep}>
          /
        </li>
        <li>
          <span aria-current="page" className={styles.current}>
            {current.label}
          </span>
        </li>
      </ol>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </nav>
  );
}
