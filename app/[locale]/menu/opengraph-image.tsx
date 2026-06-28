import { ImageResponse } from 'next/og';
import { itemCount } from '@/lib/menu';

export const runtime = 'edge';
export const alt = 'İzmir Balıkçısı Menü — Fethiye / Muğla';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function MenuOgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 64,
          background:
            'radial-gradient(120% 80% at 50% 110%, #1c3a5e 0%, transparent 65%), linear-gradient(180deg, #0a1426, #0f2340)',
          color: '#efe4cc',
          fontFamily: 'sans-serif',
          position: 'relative',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: 18,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            opacity: 0.7,
          }}
        >
          <span>№ 03 — Menü</span>
          <span>Bahar 2026 · {itemCount()} tabak</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div
            style={{
              fontSize: 260,
              fontWeight: 500,
              lineHeight: 0.85,
              letterSpacing: '-0.04em',
              textTransform: 'uppercase',
              background:
                'linear-gradient(180deg, #f7f1e3 0%, #ecc170 35%, #d8a44a 55%, #4f6f95 90%)',
              backgroundClip: 'text',
              color: 'transparent',
              display: 'flex',
            }}
          >
            Menü
          </div>
          <div
            style={{
              fontSize: 32,
              fontWeight: 300,
              fontStyle: 'italic',
              color: '#d8a44a',
              display: 'flex',
            }}
          >
            İzmir Balıkçısı · Otuz beş yıllık sofra
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            fontSize: 22,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
          }}
        >
          <span style={{ opacity: 0.75 }}>Mezeler · Izgara · Buğulama · Tava</span>
          <span style={{ color: '#d8a44a' }}>Fethiye / Muğla</span>
        </div>

        <div
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            right: 0,
            width: 2,
            background:
              'linear-gradient(180deg, transparent 0%, #d8a44a 40%, #d8a44a 60%, transparent 100%)',
            opacity: 0.5,
          }}
        />
      </div>
    ),
    size,
  );
}
