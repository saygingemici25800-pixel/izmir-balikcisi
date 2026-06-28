'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import styles from './Manifesto.module.css';

// Per-line layout variant (styling) stays in code; text comes from messages.
const VARIANTS: (string | undefined)[] = ['large', undefined, 'right', undefined, undefined, 'large'];

const fade = {
  hidden: { opacity: 0, y: 40 },
  show:   { opacity: 1, y: 0, transition: { duration: 1, ease: [0.22, 1, 0.36, 1] } }
};

export function Manifesto() {
  const t = useTranslations('manifesto');
  return (
    <section className={styles.section} id="manifesto">
      <div className={styles.frame}>
        <aside className={styles.aside}>
          <span className="eyebrow">{t('eyebrow')}</span>
          <span className={styles.num}>{t('num')}</span>
          <span className={styles.lbl}>{t.rich('label', { br: () => <br /> })}</span>
        </aside>

        <div>
          <motion.h2
            className={styles.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-15% 0px' }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            {t.rich('title', { strong: (chunks) => <strong>{chunks}</strong> })}
          </motion.h2>

          <div className={styles.lines}>
            {VARIANTS.map((v, i) => (
              <motion.p
                key={i}
                className={`${styles.line} ${v ? styles[v] : ''}`}
                variants={fade}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: '-20% 0px' }}
              >
                {t.rich(`lines.${i}`, { em: (chunks) => <em>{chunks}</em> })}
              </motion.p>
            ))}
          </div>

          <motion.div
            className={styles.sig}
            variants={fade}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <span>{t('sigNote')}</span>
            <span className={styles.auto}>{t('sigAuthor')}</span>
            <span>{t('sigDate')}</span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
