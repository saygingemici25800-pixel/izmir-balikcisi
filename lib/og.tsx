import { ImageResponse } from 'next/og';

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = 'image/png';

/**
 * Shared Open Graph card renderer for the section pages — navy editorial band,
 * light title with a lavender wash, lavender accents. Text is passed per route
 * (static, Turkish brand voice), mirroring the light redesign palette.
 */
export function renderOgImage({
  eyebrow,
  title,
  subtitle,
  footLeft,
  footRight,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
  footLeft: string;
  footRight: string;
}) {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 72,
          background:
            'radial-gradient(120% 80% at 100% 0%, #34518a 0%, transparent 55%), linear-gradient(160deg, #2d4275 0%, #223a68 55%, #1b2b50 100%)',
          color: '#f2f5f7',
          fontFamily: 'sans-serif',
          position: 'relative',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: 20,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
          }}
        >
          <span style={{ color: '#d6c6f7' }}>{eyebrow}</span>
          <span style={{ opacity: 0.7 }}>İzmir Balıkçısı</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <div
            style={{
              fontSize: 168,
              fontWeight: 600,
              lineHeight: 0.92,
              letterSpacing: '-0.03em',
              background: 'linear-gradient(180deg, #ffffff 0%, #eef1f8 45%, #d6c6f7 100%)',
              backgroundClip: 'text',
              color: 'transparent',
              display: 'flex',
            }}
          >
            {title}
          </div>
          <div style={{ fontSize: 34, fontStyle: 'italic', color: '#d6c6f7', display: 'flex' }}>
            {subtitle}
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            fontSize: 22,
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
          }}
        >
          <span style={{ opacity: 0.72 }}>{footLeft}</span>
          <span style={{ color: '#d6c6f7' }}>{footRight}</span>
        </div>

        <div
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            right: 0,
            width: 3,
            background:
              'linear-gradient(180deg, transparent 0%, #d6c6f7 45%, #d6c6f7 55%, transparent 100%)',
            opacity: 0.6,
          }}
        />
      </div>
    ),
    ogSize,
  );
}
