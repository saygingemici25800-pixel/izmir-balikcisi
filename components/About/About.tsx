import { useTranslations } from 'next-intl';
import styles from './About.module.css';
import { Timeline } from './Timeline';

export function About() {
  const t = useTranslations('about');
  return (
    <section className={styles.section} id="hikaye">
      <header className={styles.header}>
        <span className="eyebrow">{t('eyebrow')}</span>
        <span className={styles.rule} aria-hidden />
        <span className={styles.index}>{t('index')}</span>
      </header>

      <p className={styles.intro}>
        {t.rich('intro', { em: (chunks) => <em>{chunks}</em> })}
      </p>

      {/* ── Scroll-driven timeline ───────────────────────────────────── */}
      <Timeline />
    </section>
  );
}
