'use client';

import dynamic from 'next/dynamic';
import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import styles from './OceanBackground.module.css';

const OceanScene = dynamic(() => import('@/components/3d/OceanScene'), {
  ssr: false,
  loading: () => null,
});

export default function OceanBackground() {
  const pathname = usePathname();
  const wrapRef = useRef<HTMLDivElement>(null);

  // Menü sayfasında hafifçe daha koyu yap
  useEffect(() => {
    if (!wrapRef.current) return;
    if (pathname === '/menu') {
      wrapRef.current.style.opacity = '0.55';
    } else {
      wrapRef.current.style.opacity = '1';
    }
  }, [pathname]);

  return (
    <div ref={wrapRef} className={styles.wrap} aria-hidden="true">
      <OceanScene />
      {/* Hafif noise texture — derinlik hissi */}
      <div className={styles.noise} />
    </div>
  );
}
