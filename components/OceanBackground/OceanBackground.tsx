'use client';

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useMemo, useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import styles from './OceanBackground.module.css';
import { vertexShader, fragmentShader } from './waterShader';

function WaterPlane({ interactive }: { interactive: boolean }) {
  const matRef = useRef<THREE.ShaderMaterial>(null);
  const mouseRef = useRef(new THREE.Vector2(0.5, 0.5));
  const targetMouse = useRef(new THREE.Vector2(0.5, 0.5));
  const { size } = useThree();

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uResolution: { value: new THREE.Vector2(size.width, size.height) },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) }
    }),
    []
  );

  useEffect(() => {
    if (!interactive) return;
    const onMove = (e: PointerEvent) => {
      targetMouse.current.set(e.clientX / window.innerWidth, 1 - e.clientY / window.innerHeight);
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, [interactive]);

  useEffect(() => {
    if (!matRef.current) return;
    matRef.current.uniforms.uResolution.value.set(size.width, size.height);
  }, [size]);

  useFrame((_, delta) => {
    if (!matRef.current) return;
    // clamp delta so a paused/throttled frame doesn't jump the wave on resume
    matRef.current.uniforms.uTime.value += Math.min(delta, 0.05);
    if (interactive) {
      mouseRef.current.lerp(targetMouse.current, 0.04);
      matRef.current.uniforms.uMouse.value.copy(mouseRef.current);
    }
  });

  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={matRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
      />
    </mesh>
  );
}

/**
 * Drives rendering manually (frameloop="demand") so we control the FPS and can
 * stop entirely when the hero is off-screen or the tab is hidden — a big battery
 * win on phones where a full-screen fragment shader is the most expensive thing
 * on the page.
 */
function RenderController({ active, fps }: { active: boolean; fps: number }) {
  const invalidate = useThree((s) => s.invalidate);
  useEffect(() => {
    if (!active) return;
    let raf = 0;
    let last = -Infinity;
    const interval = 1000 / fps;
    const loop = (t: number) => {
      raf = requestAnimationFrame(loop);
      if (t - last >= interval) {
        last = t;
        invalidate();
      }
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [active, fps, invalidate]);
  return null;
}

export function OceanBackground() {
  const [mounted, setMounted] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [coarse, setCoarse] = useState(false);
  const [active, setActive] = useState(true);
  const [ready, setReady] = useState(false); // WebGL context created → fade canvas in over the gradient

  // capability detection (client only)
  useEffect(() => {
    setMounted(true);
    const mqReduce = matchMedia('(prefers-reduced-motion: reduce)');
    const mqCoarse = matchMedia('(hover: none) and (pointer: coarse)');
    const sync = () => {
      setReduced(mqReduce.matches);
      setCoarse(mqCoarse.matches);
    };
    sync();
    mqReduce.addEventListener('change', sync);
    mqCoarse.addEventListener('change', sync);
    return () => {
      mqReduce.removeEventListener('change', sync);
      mqCoarse.removeEventListener('change', sync);
    };
  }, []);

  // pause WebGL once the hero is scrolled away (canvas is covered) or tab hidden
  useEffect(() => {
    if (reduced) {
      setActive(false);
      return;
    }
    let ticking = false;
    const compute = () => {
      const visible = document.visibilityState === 'visible';
      const nearHero = window.scrollY < window.innerHeight * 1.15;
      setActive(visible && nearHero);
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(compute);
      }
    };
    compute();
    window.addEventListener('scroll', onScroll, { passive: true });
    document.addEventListener('visibilitychange', compute);
    return () => {
      window.removeEventListener('scroll', onScroll);
      document.removeEventListener('visibilitychange', compute);
    };
  }, [reduced]);

  // Reduced motion → never mount the WebGL canvas; the static gradient stands in.
  const showCanvas = mounted && !reduced;

  return (
    <div className={styles.root} aria-hidden>
      <div className={styles.fallback} />
      {showCanvas && (
        <Canvas
          className={`${styles.canvas} ${ready ? styles.canvasReady : ''}`}
          dpr={coarse ? 1 : [1, 1.5]}
          gl={{ antialias: false, alpha: true, powerPreference: 'low-power' }}
          camera={{ position: [0, 0, 1] }}
          frameloop="demand"
          onCreated={() => setReady(true)}
        >
          <WaterPlane interactive={!coarse} />
          <RenderController active={active} fps={coarse ? 30 : 60} />
        </Canvas>
      )}
    </div>
  );
}
