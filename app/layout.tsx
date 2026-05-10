import type { Metadata, Viewport } from 'next';
import './globals.css';
import { OceanBackground } from '@/components/OceanBackground/OceanBackground';
import { MagneticCursor } from '@/components/MagneticCursor/MagneticCursor';
import { SmoothScroll } from '@/components/SmoothScroll/SmoothScroll';
import { Nav } from '@/components/Nav/Nav';

export const metadata: Metadata = {
  title: 'İzmir Balıkçısı — Otuz Beş Yıllık Sofra · Fethiye / Muğla',
  description:
    'İzmir Balıkçısı — Fethiye / Muğla\'da alkolsüz, aile dostu bir deniz ürünleri sofrası. 1989\'dan bu yana editorial bir restoran tecrübesi.',
  metadataBase: new URL('https://izmirbalikcisi.example'),
  keywords: ['İzmir Balıkçısı', 'Fethiye balık restoranı', 'Muğla balık', 'alkolsüz balık', 'aile dostu restoran Fethiye'],
  openGraph: {
    title: 'İzmir Balıkçısı',
    description: 'Fethiye / Muğla. Alkolsüz, aile dostu, taze deniz ürünleri.',
    type: 'website',
    locale: 'tr_TR'
  }
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#050b16'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr">
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
