import type { Metadata } from 'next';
import MenuFull from '@/components/MenuFull/MenuFull';
import { RESTAURANT, SITE } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Menü — İzmir Balıkçısı · Fethiye / Muğla',
  description:
    "İzmir Balıkçısı tam menüsü: mezeler, çorbalar, ızgara balıklar, buğulama, tava ve alkolsüz içecekler. Fethiye / Muğla'da otuz beş yıllık bir sofra.",
  alternates: { canonical: `${SITE.url}/menu` },
  openGraph: {
    title: 'Menü — İzmir Balıkçısı',
    description: `${RESTAURANT.tagline} · ${RESTAURANT.city} / ${RESTAURANT.region}`,
    url: `${SITE.url}/menu`,
    type: 'website',
    locale: SITE.locale,
  },
};

export default function MenuPage() {
  return <MenuFull />;
}
