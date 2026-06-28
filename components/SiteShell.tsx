'use client';

import { usePathname } from '@/i18n/navigation';
import { IntroLoader } from './IntroLoader/IntroLoader';
import { OceanBackground } from './OceanBackground/OceanBackground';
import { MagneticCursor } from './MagneticCursor/MagneticCursor';
import { SmoothScroll } from './SmoothScroll/SmoothScroll';
import { Nav } from './Nav/Nav';
import type { SeasonalData } from './SeasonalButton/SeasonalButton';

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
