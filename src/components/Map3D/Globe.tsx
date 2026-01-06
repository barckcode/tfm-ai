import React, { useRef } from 'react';
import { Mesh } from 'three';
import { useFrame } from '@react-three/fiber';
import { Sphere } from '@react-three/drei';
import * as THREE from 'three';

export const Globe: React.FC = () => {
  const globeRef = useRef<Mesh>(null);
  const atmosphereRef = useRef<Mesh>(null);

  // Slow rotation
  useFrame(() => {
    if (globeRef.current) {
      globeRef.current.rotation.y += 0.0005;
    }
  });

  // Create texture for ocean with procedural noise
  const createOceanTexture = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');

    if (ctx) {
      // Ocean gradient
      const gradient = ctx.createRadialGradient(256, 256, 0, 256, 256, 256);
      gradient.addColorStop(0, '#0c5c8d');
      gradient.addColorStop(0.5, '#0a4a6e');
      gradient.addColorStop(1, '#083851');

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 512, 512);

      // Add some noise for ocean texture
      ctx.globalAlpha = 0.1;
      for (let i = 0; i < 2000; i++) {
        const x = Math.random() * 512;
        const y = Math.random() * 512;
        const radius = Math.random() * 2;
        ctx.fillStyle = Math.random() > 0.5 ? '#ffffff' : '#000000';
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    return new THREE.CanvasTexture(canvas);
  };

  const oceanTexture = createOceanTexture();
  oceanTexture.wrapS = THREE.RepeatWrapping;
  oceanTexture.wrapT = THREE.RepeatWrapping;

  return (
    <group>
      {/* Main Globe - Ocean */}
      <Sphere
        ref={globeRef}
        args={[5, 64, 64]}
        position={[0, -5.5, 0]}
        receiveShadow
      >
        <meshStandardMaterial
          map={oceanTexture}
          color="#0a4a6e"
          roughness={0.2}
          metalness={0.3}
          envMapIntensity={1}
        />
      </Sphere>

      {/* Atmosphere glow */}
      <Sphere
        ref={atmosphereRef}
        args={[5.2, 64, 64]}
        position={[0, -5.5, 0]}
      >
        <meshBasicMaterial
          color="#38bdf8"
          transparent
          opacity={0.1}
          side={THREE.BackSide}
        />
      </Sphere>

      {/* Outer atmosphere */}
      <Sphere
        args={[5.4, 64, 64]}
        position={[0, -5.5, 0]}
      >
        <meshBasicMaterial
          color="#0ea5e9"
          transparent
          opacity={0.05}
          side={THREE.BackSide}
        />
      </Sphere>

      {/* Hemisphere light for more realistic lighting */}
      <hemisphereLight
        args={['#ffffff', '#0c4a6e', 0.6]}
        position={[0, 10, 0]}
      />
    </group>
  );
};
