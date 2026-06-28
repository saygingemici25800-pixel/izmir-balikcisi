import { defineRouting } from 'next-intl/routing';

/**
 * Locale routing config — shared by the middleware, the request config and the
 * navigation wrappers. TR is the default and is served WITHOUT a prefix
 * (`localePrefix: 'as-needed'`): `/` → TR, `/en` → EN, `/ar` → AR.
 */
export const routing = defineRouting({
  locales: ['tr', 'en', 'ar'],
  defaultLocale: 'tr',
  localePrefix: 'as-needed',
});

export type Locale = (typeof routing.locales)[number];

/** Right-to-left locales (Arabic). Drives `<html dir>` + RTL CSS. */
export const RTL_LOCALES: Locale[] = ['ar'];

export const isRtl = (locale: string) => RTL_LOCALES.includes(locale as Locale);
