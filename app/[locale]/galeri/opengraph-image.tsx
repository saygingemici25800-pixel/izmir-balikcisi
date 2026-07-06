import { renderOgImage } from '@/lib/og';

export const runtime = 'edge';
export const alt = 'Galeri — İzmir Balıkçısı · Fethiye / Muğla';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function GalleryOgImage() {
  return renderOgImage({
    eyebrow: '№ 04 — Galeri',
    title: 'Galeri',
    subtitle: 'Bir akşamın kareleri',
    footLeft: 'İzmir Balıkçısı',
    footRight: 'Fethiye / Muğla',
  });
}
