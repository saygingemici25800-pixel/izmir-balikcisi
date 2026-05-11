import type { Metadata, Viewport } from 'next';
import './globals.css';
import { OceanBackground } from '@/components/OceanBackground/OceanBackground';
import { MagneticCursor } from '@/components/MagneticCursor/MagneticCursor';
import { SmoothScroll } from '@/components/SmoothScroll/SmoothScroll';
import { Nav } from '@/components/Nav/Nav';
import { RESTAURANT, SEO, SITE } from '@/lib/constants';

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: SEO.title,
    template: `%s · İzmir Balıkçısı`,
  },
  description: SEO.description,
  keywords: [...SEO.keywords],
  alternates: {
    canonical: SITE.url,
    languages: { 'tr-TR': SITE.url },
  },
  openGraph: {
    type: 'website',
    locale: SITE.locale,
    url: SITE.url,
    siteName: SITE.name,
    title: SEO.title,
    description: SEO.description,
  },
  twitter: {
    card: 'summary_large_image',
    title: SEO.title,
    description: SEO.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  authors: [{ name: SITE.name, url: SITE.url }],
  creator: SITE.name,
  publisher: SITE.name,
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#050b16',
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Restaurant',
  '@id': SITE.url,
  name: RESTAURANT.name,
  alternateName: 'Izmir Balikcisi',
  description: RESTAURANT.description,
  url: SITE.url,
  telephone: RESTAURANT.phone,
  email: RESTAURANT.email,
  image: `${SITE.url}/opengraph-image`,
  servesCuisine: ['Seafood', 'Turkish', 'Mediterranean', 'Aegean'],
  priceRange: '$$',
  hasMenu: `${SITE.url}/menu`,
  acceptsReservations: 'True',
  address: {
    '@type': 'PostalAddress',
    addressLocality: RESTAURANT.address.locality,
    addressRegion: RESTAURANT.address.region,
    addressCountry: RESTAURANT.address.country,
    streetAddress: RESTAURANT.address.full,
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: RESTAURANT.location.lat,
    longitude: RESTAURANT.location.lng,
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday'],
      opens: RESTAURANT.hours.weekdays.open,
      closes: RESTAURANT.hours.weekdays.close,
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: RESTAURANT.hours.weekends.open,
      closes: RESTAURANT.hours.weekends.close,
    },
  ],
  amenityFeature: [
    { '@type': 'LocationFeatureSpecification', name: 'Alcohol-free',   value: true },
    { '@type': 'LocationFeatureSpecification', name: 'Family-friendly', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'Fresh seafood',   value: true },
    { '@type': 'LocationFeatureSpecification', name: 'Vegetarian options', value: true },
  ],
  sameAs: [RESTAURANT.social.instagram],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr">
      <head>
        <link
          rel="preload"
          href="/fonts/Panchang-Variable.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/Satoshi-400.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <OceanBackground />
        <MagneticCursor />
        <SmoothScroll>
          <Nav />
          <main>{children}</main>
        </SmoothScroll>
      </body>
    </html>
  );
}
