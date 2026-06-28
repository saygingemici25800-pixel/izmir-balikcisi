import type { MetadataRoute } from 'next';
import { SITE } from '@/lib/constants';

// Pages, listed at the default-locale (TR, un-prefixed) URL with per-locale
// hreflang alternates so search engines index every language.
const PATHS = ['', '/menu'];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return PATHS.map((path) => ({
    url: `${SITE.url}${path}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: path === '' ? 1 : 0.9,
    alternates: {
      languages: {
        tr: `${SITE.url}${path}`,
        en: `${SITE.url}/en${path}`,
        ar: `${SITE.url}/ar${path}`,
      },
    },
  }));
}
