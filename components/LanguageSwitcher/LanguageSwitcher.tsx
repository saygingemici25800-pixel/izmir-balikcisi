'use client';

import { useTransition } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';
import styles from './LanguageSwitcher.module.css';

const LABELS: Record<string, string> = { tr: 'TR', en: 'EN', ar: 'ع' };
const NAMES: Record<string, string> = { tr: 'Türkçe', en: 'English', ar: 'العربية' };

/**
 * Compact TR / EN / AR segmented toggle. Switching navigates to the same path
 * in the chosen locale (next-intl router), and the middleware persists the
 * choice in the NEXT_LOCALE cookie.
 */
export function LanguageSwitcher({ className = '' }: { className?: string }) {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations('nav');
  const [isPending, startTransition] = useTransition();

  const switchTo = (next: string) => {
    if (next === locale) return;
    startTransition(() => {
      router.replace(pathname, { locale: next as (typeof routing.locales)[number] });
    });
  };

  return (
    <div className={`${styles.switch} ${className}`} role="group" aria-label={t('language')}>
      {routing.locales.map((l) => (
        <button
          key={l}
          type="button"
          className={`${styles.opt} ${l === locale ? styles.active : ''}`}
          onClick={() => switchTo(l)}
          aria-current={l === locale ? 'true' : undefined}
          aria-label={NAMES[l]}
          lang={l}
          disabled={isPending}
        >
          {LABELS[l]}
        </button>
      ))}
    </div>
  );
}
