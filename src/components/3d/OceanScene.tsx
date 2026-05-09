'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// ─── Su Yüzeyi Shader ─────────────────────────────────────────────────────────

const waterVertexShader = `
  uniform float uTime;
  uniform float uWaveAmplitude;
  uniform float uWaveSpeed;

  varying vec2 vUv;
  varying float vElevation;
  varying vec3 vNormal;

  void main() {
    vUv = uv;

    vec4 modelPosition = modelMatrix * vec4(position, 1.0);

    // Çok katmanlı dalga
    float wave1 = sin(modelPosition.x * 0.6 + uTime * uWaveSpeed) * uWaveAmplitude;
    float wave2 = sin(modelPosition.z * 0.5 + uTime * uWaveSpeed * 0.8) * uWaveAmplitude * 0.7;
    float wave3 = sin((modelPosition.x + modelPosition.z) * 0.4 + uTime * uWaveSpeed * 1.2) * uWaveAmplitude * 0.5;
    float wave4 = cos(modelPosition.x * 0.9 - modelPosition.z * 0.3 + uTime * uWaveSpeed * 0.6) * uWaveAmplitude * 0.3;

    float elevation = wave1 + wave2 + wave3 + wave4;
    modelPosition.y += elevation;

    vElevation = elevation;

    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;
    gl_Position = projectedPosition;
  }
`;

const waterFragmentShader = `
  uniform float uTime;
  uniform vec3 uDepthColor;
  uniform vec3 uSurfaceColor;
  uniform vec3 uFoamColor;
  uniform float uColorOffset;
  uniform float uColorMultiplier;

  varying vec2 vUv;
  varying float vElevation;

  void main() {
    // Dalga yüksekliğine göre renk karıştır
    float mixStrength = (vElevation + uColorOffset) * uColorMultiplier;
    mixStrength = clamp(mixStrength, 0.0, 1.0);

    vec3 color = mix(uDepthColor, uSurfaceColor, mixStrength);

    // Güneş yansıması — sabah ışığı
    float sunReflection = pow(max(vElevation, 0.0), 2.5) * 0.6;
    color += vec3(1.0, 0.95, 0.8) * sunReflection;

    // Köpük efekti — yüksek noktalarda beyaz
    float foam = smoothstep(0.12, 0.18, vElevation);
    color = mix(color, uFoamColor, foam * 0.4);

    // UV tabanlı hafif desen
    float pattern = sin(vUv.x * 20.0 + uTime * 0.5) * sin(vUv.y * 20.0 + uTime * 0.3) * 0.02;
    color += pattern;

    gl_FragColor = vec4(color, 0.88);
  }
`;

// ─── Su Mesh ──────────────────────────────────────────────────────────────────

function WaterMesh() {
  const meshRef = useRef<THREE.Mesh>(null);

  const uniforms = useMemo(
    () => ({
      uTime:            { value: 0 },
      uWaveAmplitude:   { value: 0.18 },
      uWaveSpeed:       { value: 0.55 },
      uDepthColor:      { value: new THREE.Color('#1A90C4') },
      uSurfaceColor:    { value: new THREE.Color('#8DCAE8') },
      uFoamColor:       { value: new THREE.Color('#EDF6FB') },
      uColorOffset:     { value: 0.18 },
      uColorMultiplier: { value: 4.0 },
    }),
    []
  );

  useFrame(({ clock }) => {
    uniforms.uTime.value = clock.getElapsedTime();
  });

  return (
    <mesh
      ref={meshRef}
      rotation={[-Math.PI / 2, 0, 0]}
      position={[0, -0.5, 0]}
    >
      <planeGeometry args={[20, 20, 128, 128]} />
      <shaderMaterial
        vertexShader={waterVertexShader}
        fragmentShader={waterFragmentShader}
        uniforms={uniforms}
        transparent
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

// ─── Işık Tanecikleri ─────────────────────────────────────────────────────────

function LightParticles() {
  const pointsRef = useRef<THREE.Points>(null);

  const { positions, speeds } = useMemo(() => {
    const count = 80;
    const positions = new Float32Array(count * 3);
    const speeds = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      positions[i * 3]     = (Math.random() - 0.5) * 16;
      positions[i * 3 + 1] = Math.random() * 3 - 0.3;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 16;
      speeds[i] = 0.3 + Math.random() * 0.7;
    }
    return { positions, speeds };
  }, []);

  useFrame(({ clock }) => {
    if (!pointsRef.current) return;
    const t = clock.getElapsedTime();
    const pos = pointsRef.current.geometry.attributes.position;

    for (let i = 0; i < 80; i++) {
      const s = speeds[i];
      (pos as THREE.BufferAttribute).setY(
        i,
        Math.sin(t * s + i * 0.5) * 0.4 - 0.1
      );
    }
    pos.needsUpdate = true;
    pointsRef.current.rotation.y = t * 0.02;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        color="#C8E6F5"
        transparent
        opacity={0.7}
        sizeAttenuation
      />
    </points>
  );
}

// ─── Işıklar ──────────────────────────────────────────────────────────────────

function SceneLights() {
  const dirLightRef = useRef<THREE.DirectionalLight>(null);

  useFrame(({ clock }) => {
    if (!dirLightRef.current) return;
    const t = clock.getElapsedTime() * 0.1;
    dirLightRef.current.position.x = Math.sin(t) * 6;
    dirLightRef.current.position.z = Math.cos(t) * 6;
  });

  return (
    <>
      {/* Sabah güneşi — sıcak sarı-turuncu */}
      <directionalLight
        ref={dirLightRef}
        position={[5, 8, 3]}
        intensity={2.2}
        color="#FFE4B5"
        castShadow
      />
      {/* Gökyüzü ambient — açık mavi */}
      <ambientLight intensity={0.9} color="#C8E6F5" />
      {/* Deniz yansıması — alttan yukarı */}
      <pointLight
        position={[0, -1, 0]}
        intensity={0.8}
        color="#4DAED9"
        distance={12}
      />
      {/* Ufuk ışığı */}
      <hemisphereLight
        args={['#87CEEB', '#1A90C4', 0.6]}
      />
    </>
  );
}

// ─── Kamera Hareketi ──────────────────────────────────────────────────────────

function CameraRig() {
  useFrame(({ camera, mouse, clock }) => {
    const t = clock.getElapsedTime();
    // Yavaş sallantı
    camera.position.x += (mouse.x * 0.4 - camera.position.x) * 0.03;
    camera.position.y += (mouse.y * 0.2 + 2.5 - camera.position.y) * 0.03;
    camera.position.z = 5 + Math.sin(t * 0.15) * 0.3;
    camera.lookAt(0, -0.3, 0);
  });
  return null;
}

// ─── Ana Export ───────────────────────────────────────────────────────────────

export default function OceanScene() {
  return (
    <Canvas
      camera={{ position: [0, 2.5, 5], fov: 55, near: 0.1, far: 100 }}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      }}
      dpr={[1, 1.5]}
      style={{ background: 'transparent' }}
    >
      <SceneLights />
      <WaterMesh />
      <LightParticles />
      <CameraRig />
    </Canvas>
  );
}
