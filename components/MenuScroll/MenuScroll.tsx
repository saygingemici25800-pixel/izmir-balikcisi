'use client';

import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import { useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import styles from './MenuScroll.module.css';
import { type MenuItem } from '@/lib/menu';

export function MenuScroll({ dishes }: { dishes: MenuItem[] }) {
  const t = useTranslations('menuScroll');
  const outerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  const { scrollYProgress } = useScroll({
    target: outerRef,
    offset: ['start start', 'end end']
  });

  // travel: enough to expose all cards.
  // cards * cardWidth - viewport ≈ (N-1) * 100vw for safety
  const x = useTransform(scrollYProgress, [0, 1], ['0vw', `-${(dishes.length - 1) * 32}vw`]);

  useMotionValueEvent(scrollYProgress, 'change', (v) => setProgress(v));

  return (
    <section
      className={styles.outer}
      id="menu"
      ref={outerRef}
      style={{ height: `${dishes.length * 80}vh` }}
    >
      <div className={styles.sticky}>
        <header className={styles.header}>
          <span className="eyebrow">{t('eyebrow')}</span>
          <span className={styles.rule} aria-hidden />
          <span className={styles.meta}>{t('meta')}</span>
        </header>

        <h2 className={styles.title}>
          {t.rich('title', { em: (chunks) => <em>{chunks}</em> })}
          <span className={styles.titleSub}>{t('titleSub')}</span>
        </h2>

        <div className={styles.trackWrap}>
          <motion.div className={styles.track} style={{ x }}>
            {dishes.map((d, i) => (
              <article
                key={d.name}
                className={styles.card}
                data-magnetic
                data-cursor-label={t('detail')}
              >
                <div className={styles.cardTop}>
                  <span className={styles.num}>№ {String(i + 1).padStart(2, '0')}</span>
                  <span>{t('hotCold')}</span>
                </div>

                <div
                  className={styles.thumb}
                  style={{ backgroundImage: `url(${d.img})` }}
                  role="img"
                  aria-label={d.name}
                />

                <div>
                  <h3 className={styles.dishName}>{d.name}</h3>
                  <div className={styles.dishMeta}>
                    <div className={styles.tags}>
                      {(d.tags ?? []).map((tag) => (
                        <span key={tag} className={styles.tag}>{tag}</span>
                      ))}
                    </div>
                    <div className={styles.price}>
                      {d.daily ? (
                        <>{t('daily')}<span className={styles.priceSm}>kg</span></>
                      ) : (
                        <>{d.price}<span className={styles.priceSm}>{d.unit}</span></>
                      )}
                    </div>
                  </div>
                  <p className={styles.desc}>{d.desc}</p>
                </div>
              </article>
            ))}
          </motion.div>
        </div>

        <footer className={styles.foot}>
          <span className={styles.label}>{t('plates', { count: dishes.length })}</span>
          <div className={styles.meter}>
            <div className={styles.meterFill} style={{ width: `${progress * 100}%` }} />
          </div>
          <Link href="/menu" className={`${styles.label} ${styles.labelRight}`} data-magnetic data-cursor-label={t('allMenu')}>
            {t('all')}
          </Link>
        </footer>
      </div>
    </section>
  );
}
