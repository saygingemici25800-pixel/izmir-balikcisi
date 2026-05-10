import type { Metadata, Viewport } from "next";
import "@/styles/globals.css";
import { SEO, RESTAURANT } from "@/data/constants";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import OceanBackground from "@/components/layout/OceanBackground";
import SmoothScroll from "@/components/layout/SmoothScroll/SmoothScroll";
import MagneticCursor from "@/components/layout/MagneticCursor/MagneticCursor";

export const metadata: Metadata = {
  title: {
    default: SEO.title,
    template: `%s | İzmir Balıkçısı`,
  },
  description: SEO.description,
  keywords: [...SEO.keywords],
  metadataBase: new URL(SEO.url),
  alternates: {
    canonical: SEO.url,
    languages: { 'tr-TR': SEO.url },
  },
  openGraph: {
    title: SEO.title,
    description: SEO.description,
    url: SEO.url,
    siteName: "İzmir Balıkçısı",
    locale: "tr_TR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: SEO.title,
    description: SEO.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export const viewport: Viewport = {
  themeColor: "#0E6F9E",
  width: "device-width",
  initialScale: 1,
};

// ─── JSON-LD Structured Data ──────────────────────────────────────────────────
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  name: RESTAURANT.name,
  description: RESTAURANT.description,
  url: SEO.url,
  servesCuisine: ["Seafood", "Turkish", "Mediterranean"],
  priceRange: "$$",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Fethiye",
    addressRegion: "Muğla",
    addressCountry: "TR",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: RESTAURANT.location.lat,
    longitude: RESTAURANT.location.lng,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "11:00",
      closes: "22:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Saturday", "Sunday"],
      opens: "10:00",
      closes: "23:00",
    },
  ],
  hasMenu: `${SEO.url}/menu`,
  amenityFeature: [
    { "@type": "LocationFeatureSpecification", name: "Alcohol-free", value: true },
    { "@type": "LocationFeatureSpecification", name: "Family-friendly", value: true },
    { "@type": "LocationFeatureSpecification", name: "Fresh seafood", value: true },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <OceanBackground />
        <MagneticCursor />
        <SmoothScroll>
          <Navbar />
          {children}
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
