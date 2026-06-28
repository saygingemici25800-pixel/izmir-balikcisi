import type { Metadata, Viewport } from 'next';
import { notFound } from 'next/navigation';
import { Amiri, Tajawal } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';
import '../globals.css';
import { SiteShell } from '@/components/SiteShell';
import { getContent } from '@/lib/content';
import { RESTAURANT, SITE } from '@/lib/constants';
import { routing, isRtl } from '@/i18n/routing';

// Arabic fonts — downloaded at build by next/font and self-hosted from our own
// origin (no runtime Google Fonts request). Exposed as CSS vars and swapped in
// via [lang='ar'] in globals.css. preload:false so TR/EN pages don't fetch them
// (they only resolve when Arabic glyphs render). Amiri ≈ editorial display
// (mirrors Panchang), Tajawal ≈ clean body (mirrors Satoshi).
const amiri = Amiri({
  subsets: ['arabic', 'latin'],
  weight: ['400', '700'],
  variable: '--f-display-ar',
  display: 'swap',
  preload: false,
});
const tajawal = Tajawal({
  subsets: ['arabic', 'latin'],
  weight: ['400', '500', '700'],
  variable: '--f-body-ar',
  display: 'swap',
  preload: false,
});

const OG_LOCALE: Record<string, string> = { tr: 'tr_TR', en: 'en_US', ar: 'ar_AR' };

const SEO_KEYWORDS = [
  'izmir balıkçısı',
  'izmir balıkçısı fethiye',
  'fethiye balık restoranı',
  'muğla balık',
  'alkolsüz balık',
  'fethiye seafood',
  'fethiye fish restaurant',
  'مطعم سمك فتحية',
];

const isValidLocale = (l: string) => (routing.locales as readonly string[]).includes(l);

const localePath = (locale: string, path = '') =>
  `${SITE.url}${locale === routing.defaultLocale ? '' : '/' + locale}${path}`;

/** hreflang map for a given page path (same set for every locale's render). */
export const hreflangLanguages = (path = '') => ({
  tr: `${SITE.url}${path}`,
  en: `${SITE.url}/en${path}`,
  ar: `${SITE.url}/ar${path}`,
  'x-default': `${SITE.url}${path}`,
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'meta' });
  return {
    metadataBase: new URL(SITE.url),
    title: { default: t('title'), template: '%s · İzmir Balıkçısı' },
    description: t('description'),
    keywords: [...SEO_KEYWORDS],
    alternates: { canonical: localePath(locale), languages: hreflangLanguages() },
    openGraph: {
      type: 'website',
      locale: OG_LOCALE[locale] ?? 'tr_TR',
      url: localePath(locale),
      siteName: SITE.name,
      title: t('title'),
      description: t('description'),
    },
    twitter: { card: 'summary_large_image', title: t('title'), description: t('description') },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large' } },
    authors: [{ name: SITE.name, url: SITE.url }],
    creator: SITE.name,
    publisher: SITE.name,
  };
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#2d4275',
};

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (!isValidLocale(locale)) notFound();
  setRequestLocale(locale);

  const messages = await getMessages();
  const { seasonal } = await getContent();
  const t = await getTranslations({ locale, namespace: 'meta' });
  const rtl = isRtl(locale);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    '@id': SITE.url,
    name: RESTAURANT.name,
    alternateName: 'Izmir Balikcisi',
    description: t('description'),
    url: localePath(locale),
    telephone: RESTAURANT.phone,
    email: RESTAURANT.email,
    image: `${SITE.url}/opengraph-image`,
    servesCuisine: ['Seafood', 'Turkish', 'Mediterranean', 'Aegean'],
    priceRange: '$$',
    hasMenu: localePath(locale, '/menu'),
    acceptsReservations: 'True',
    address: {
      '@type': 'PostalAddress',
      addressLocality: RESTAURANT.address.locality,
      addressRegion: RESTAURANT.address.region,
      addressCountry: RESTAURANT.address.country,
      streetAddress: RESTAURANT.address.full,
    },
    geo: { '@type': 'GeoCoordinates', latitude: RESTAURANT.location.lat, longitude: RESTAURANT.location.lng },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        opens: RESTAURANT.hours.everyday.open,
        closes: RESTAURANT.hours.everyday.close,
      },
    ],
    sameAs: [RESTAURANT.social.instagram],
  };

  return (
    <html lang={locale} dir={rtl ? 'rtl' : 'ltr'} className={`${amiri.variable} ${tajawal.variable}`}>
      <head>
        <link rel="preload" href="/fonts/Panchang-Variable.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/Satoshi-400.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <NextIntlClientProvider messages={messages}>
          <SiteShell seasonal={seasonal}>{children}</SiteShell>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
