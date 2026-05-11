import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'İzmir Balıkçısı — Alkolsüz Taze Deniz Ürünleri, Fethiye / Muğla';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OgImage() {
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
            'radial-gradient(120% 80% at 50% 110%, #1c3a5e 0%, transparent 65%), radial-gradient(80% 60% at 50% 0%, #050b16 0%, transparent 70%), linear-gradient(180deg, #0a1426, #0f2340)',
          color: '#efe4cc',
          fontFamily: 'sans-serif',
          position: 'relative',
        }}
      >
        {/* top meta */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: 18,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: '#efe4cc',
            opacity: 0.7,
          }}
        >
          <span>№ 001 / Est. 1989</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span
              style={{
                width: 10,
                height: 10,
                borderRadius: 5,
                background: '#ecc170',
                display: 'inline-block',
              }}
            />
            FETHİYE · TAZE · AİLE DOSTU
          </span>
        </div>

        {/* mega type */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div
            style={{
              fontSize: 220,
              fontWeight: 600,
              lineHeight: 0.86,
              letterSpacing: '-0.04em',
              textTransform: 'uppercase',
              background:
                'linear-gradient(180deg, #f7f1e3 0%, #ecc170 35%, #d8a44a 55%, #4f6f95 90%)',
              backgroundClip: 'text',
              color: 'transparent',
              display: 'flex',
            }}
          >
            İZMİR
          </div>
          <div
            style={{
              fontSize: 220,
              fontWeight: 400,
              lineHeight: 0.86,
              letterSpacing: '-0.04em',
              textTransform: 'uppercase',
              color: 'transparent',
              WebkitTextStroke: '2px #efe4cc',
              display: 'flex',
              alignSelf: 'flex-end',
              opacity: 0.55,
            }}
          >
            BALIKÇISI
          </div>
        </div>

        {/* bottom */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            fontSize: 22,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: '#efe4cc',
          }}
        >
          <span style={{ opacity: 0.75 }}>Otuz Beş Yıllık Sofra</span>
          <span style={{ color: '#d8a44a' }}>Fethiye / Muğla · 0% alkol</span>
        </div>

        {/* gold ribbon right edge */}
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
