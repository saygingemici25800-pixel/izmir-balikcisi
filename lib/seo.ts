import { SITE } from '@/lib/constants';
import { routing } from '@/i18n/routing';

/**
 * SEO URL helpers shared by every route's `generateMetadata`, the sitemap and
 * the breadcrumb JSON-LD. Slugs are the SAME across locales (e.g. `/hikaye`,
 * `/en/hikaye`, `/ar/hikaye`); only the locale prefix changes (TR default is
 * served without a prefix — `localePrefix: 'as-needed'`).
 */

/** Absolute URL for `path` at `locale` (TR default → no prefix). */
export const localeUrl = (locale: string, path = '') =>
  `${SITE.url}${locale === routing.defaultLocale ? '' : '/' + locale}${path}`;

/** hreflang alternates map for `path` (tr / en / ar + x-default). */
export const hreflangFor = (path = '') => ({
  tr: `${SITE.url}${path}`,
  en: `${SITE.url}/en${path}`,
  ar: `${SITE.url}/ar${path}`,
  'x-default': `${SITE.url}${path}`,
});

/** `alternates` block (canonical + languages) for a page's Metadata. */
export const alternatesFor = (locale: string, path = '') => ({
  canonical: localeUrl(locale, path),
  languages: hreflangFor(path),
});
