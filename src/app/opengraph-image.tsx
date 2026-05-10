import { ImageResponse } from 'next/og';
import { RESTAURANT } from '@/data/constants';

export const runtime = 'edge';
export const alt = 'İzmir Balıkçısı';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #085278 0%, #0E6F9E 40%, #1A90C4 70%, #4DAED9 100%)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Dekoratif daireler */}
        <div
          style={{
            position: 'absolute',
            top: -120,
            right: -120,
            width: 480,
            height: 480,
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.05)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: -80,
            left: -80,
            width: 320,
            height: 320,
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.04)',
          }}
        />

        {/* İçerik */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 24,
            padding: '0 80px',
            textAlign: 'center',
          }}
        >
          {/* Logo */}
          <div
            style={{
              fontSize: 72,
              lineHeight: 1,
              marginBottom: 8,
            }}
          >
            🐟
          </div>

          {/* Üst etiket */}
          <div
            style={{
              fontSize: 18,
              fontWeight: 600,
              color: 'rgba(255,255,255,0.65)',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
            }}
          >
            FETHİYE · TAZE · AİLE DOSTU
          </div>

          {/* Ana başlık */}
          <div
            style={{
              fontSize: 88,
              fontWeight: 800,
              color: '#ffffff',
              lineHeight: 1,
              letterSpacing: '-0.03em',
            }}
          >
            {RESTAURANT.name}
          </div>

          {/* Tagline */}
          <div
            style={{
              fontSize: 28,
              color: 'rgba(255,255,255,0.75)',
              fontWeight: 400,
              letterSpacing: '0.04em',
            }}
          >
            {RESTAURANT.tagline}
          </div>

          {/* Badge */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              marginTop: 16,
              background: 'rgba(255,255,255,0.12)',
              border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: 100,
              padding: '10px 28px',
            }}
          >
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                background: 'var(--gold-400)',
              }}
            />
            <div
              style={{
                fontSize: 18,
                color: 'rgba(255,255,255,0.85)',
                fontWeight: 600,
                letterSpacing: '0.06em',
              }}
            >
              100% ALKOLSÜZ MEKAN
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
