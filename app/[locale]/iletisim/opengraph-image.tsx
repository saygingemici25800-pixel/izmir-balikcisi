import { renderOgImage } from '@/lib/og';

export const runtime = 'edge';
export const alt = 'İletişim — İzmir Balıkçısı · Fethiye / Muğla';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function ContactOgImage() {
  return renderOgImage({
    eyebrow: '№ 06 — İletişim',
    title: 'İletişim',
    subtitle: 'Yol tarifi & rezervasyon',
    footLeft: 'Her gün 10.30 — 23.45',
    footRight: 'Fethiye / Muğla',
  });
}
