'use client';

import dynamic from 'next/dynamic';
import { usePathname } from '@/i18n/navigation';
import { IntroLoader } from './IntroLoader/IntroLoader';
import { MagneticCursor } from './MagneticCursor/MagneticCursor';
import { SmoothScroll } from './SmoothScroll/SmoothScroll';
import { Nav } from './Nav/Nav';
import type { SeasonalData } from './SeasonalButton/SeasonalButton';

// 3D ocean (three.js) is heavy + purely decorative — load it client-only after
// hydration so it never ships in the initial bundle or blocks first paint.
const OceanBackground = dynamic(
  () => import('./OceanBackground/OceanBackground').then((m) => m.OceanBackground),
  { ssr: false }
);

/**
 * Public-site chrome (3D ocean, custom cursor, smooth scroll, nav). Skipped
 * entirely on /admin so the panel is a plain, normal-cursor form UI.
 */
export function SiteShell({
  seasonal,
  children,
}: {
  seasonal: SeasonalData;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  if (pathname?.startsWith('/admin')) return <>{children}</>;

  return (
    <>
      <IntroLoader />
      <OceanBackground />
      <MagneticCursor />
      <SmoothScroll>
        <Nav seasonal={seasonal} />
        <main>{children}</main>
      </SmoothScroll>
    </>
  );
}
