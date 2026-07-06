import { Breadcrumb } from '@/components/Breadcrumb/Breadcrumb';
import styles from './PageShell.module.css';

/**
 * Wrapper for the standalone section pages (/hikaye, /galeri, /iletisim, /menu).
 * Renders the breadcrumb (which clears the fixed nav) then the page's full
 * section(s). The first section's own large top padding is trimmed via CSS so
 * the breadcrumb + section don't stack a double gap.
 */
export function PageShell({
  locale,
  homeLabel,
  current,
  children,
}: {
  locale: string;
  homeLabel: string;
  current: { label: string; path: string };
  children: React.ReactNode;
}) {
  return (
    <div className={styles.shell}>
      <Breadcrumb locale={locale} homeLabel={homeLabel} current={current} />
      {children}
    </div>
  );
}
