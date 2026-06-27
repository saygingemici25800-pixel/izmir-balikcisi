import styles from './About.module.css';
import { Timeline } from './Timeline';

export function About() {
  return (
    <section className={styles.section} id="hikaye">
      <header className={styles.header}>
        <span className="eyebrow">№ 02 — Hikâye</span>
        <span className={styles.rule} aria-hidden />
        <span className={styles.index}>1989 → 2026</span>
      </header>

      <p className={styles.intro}>
        Bir <em>baba</em> ve oğul. Sabah dörtte hâl, akşam yedide ışıklar.
        Aralarındaki her şey: <em>balık</em>.
      </p>

      {/* ── Scroll-driven timeline ───────────────────────────────────── */}
      <Timeline />
    </section>
  );
}
