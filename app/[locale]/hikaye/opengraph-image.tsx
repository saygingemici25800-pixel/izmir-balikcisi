import { renderOgImage } from '@/lib/og';

export const runtime = 'edge';
export const alt = 'Hikâyemiz — İzmir Balıkçısı · Fethiye / Muğla';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function StoryOgImage() {
  return renderOgImage({
    eyebrow: '№ 02 — Hikâye',
    title: 'Hikâyemiz',
    subtitle: 'Denizden sofraya lezzet yolculuğu',
    footLeft: 'İzmir Balıkçısı · 2014',
    footRight: 'Fethiye / Muğla',
  });
}
