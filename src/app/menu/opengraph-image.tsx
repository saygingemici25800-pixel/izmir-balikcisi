import { ImageResponse } from 'next/og';
import { MENU_DATA } from '@/data/menu';

export const runtime = 'edge';
export const alt = 'İzmir Balıkçısı Menü';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  const totalItems = MENU_DATA.reduce((a, c) => a + c.items.length, 0);

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          background: 'linear-gradient(135deg, #085278 0%, #0E6F9E 50%, #1A90C4 100%)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Sol panel */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: '60px 64px',
            gap: 20,
          }}
        >
          <div style={{ fontSize: 18, color: 'rgba(255,255,255,0.6)', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
            🐟 İzmir Balıkçısı
          </div>
          <div style={{ fontSize: 72, fontWeight: 800, color: '#ffffff', lineHeight: 1, letterSpacing: '-0.03em' }}>
            Menümüz
          </div>
          <div style={{ fontSize: 24, color: 'rgba(255,255,255,0.7)', lineHeight: 1.5 }}>
            Taze deniz ürünleri, geleneksel{'\n'}mezeler ve özel tatlılar.
          </div>
          <div
            style={{
              display: 'flex',
              gap: 12,
              marginTop: 12,
            }}
          >
            {[`${totalItems}+ Çeşit`, '12 Kategori', '100% Alkolsüz'].map((b) => (
              <div
                key={b}
                style={{
                  background: 'rgba(255,255,255,0.12)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  borderRadius: 100,
                  padding: '8px 20px',
                  fontSize: 16,
                  color: 'rgba(255,255,255,0.85)',
                  fontWeight: 600,
                }}
              >
                {b}
              </div>
            ))}
          </div>
        </div>

        {/* Sağ — kategori listesi */}
        <div
          style={{
            width: 340,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: 8,
            padding: '60px 48px 60px 24px',
            background: 'rgba(0,0,0,0.15)',
          }}
        >
          {MENU_DATA.slice(0, 8).map((cat) => (
            <div
              key={cat.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                padding: '8px 16px',
                background: 'rgba(255,255,255,0.06)',
                borderRadius: 12,
              }}
            >
              <span style={{ fontSize: 20 }}>{cat.emoji}</span>
              <span style={{ fontSize: 16, color: 'rgba(255,255,255,0.85)', fontWeight: 500 }}>{cat.name}</span>
              <span style={{ marginLeft: 'auto', fontSize: 13, color: 'rgba(255,255,255,0.4)' }}>{cat.items.length}</span>
            </div>
          ))}
          <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.35)', textAlign: 'center', marginTop: 4 }}>
            +{MENU_DATA.length - 8} kategori daha...
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
