'use client';

import dynamic from 'next/dynamic';

// Three.js SSR'da çalışmaz — sadece client'ta yükle
const OceanScene = dynamic(() => import('./OceanScene'), {
  ssr: false,
  loading: () => (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(160deg, #C8E6F5 0%, #4DAED9 40%, #0E6F9E 100%)',
      }}
    />
  ),
});

export default OceanScene;
