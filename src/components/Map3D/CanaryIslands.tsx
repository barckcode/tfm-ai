import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars, Environment } from '@react-three/drei';
import { Island } from './Island';
import { Globe } from './Globe';
import { ISLANDS_INFO } from '../../types/tourism';

interface CanaryIslandsProps {
  selectedIsland: number | null;
  hoveredIsland: number | null;
  onSelectIsland: (islandCode: number) => void;
  onHoverIsland: (islandCode: number | null) => void;
}

const Scene: React.FC<CanaryIslandsProps> = ({
  selectedIsland,
  hoveredIsland,
  onSelectIsland,
  onHoverIsland
}) => {
  return (
    <>
      {/* Enhanced Lighting */}
      <ambientLight intensity={0.3} />
      <directionalLight
        position={[10, 10, 5]}
        intensity={1.5}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />
      {/* Rim light from behind */}
      <directionalLight
        position={[-5, 5, -5]}
        intensity={0.5}
        color="#38bdf8"
      />
      {/* Fill light */}
      <pointLight position={[0, 2, 0]} intensity={0.3} color="#ffffff" />

      {/* Starfield Environment */}
      <Stars
        radius={150}
        depth={50}
        count={8000}
        factor={6}
        saturation={0}
        fade
        speed={0.5}
      />

      {/* Globe (replaces ocean plane) */}
      <Globe />

      {/* Islands */}
      {ISLANDS_INFO.map((island) => (
        <Island
          key={island.code}
          island={island}
          isSelected={selectedIsland === island.code}
          isHovered={hoveredIsland === island.code}
          onClick={() => onSelectIsland(island.code)}
          onHover={(hover) => onHoverIsland(hover ? island.code : null)}
        />
      ))}

      {/* Camera controls */}
      <OrbitControls
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        minDistance={4}
        maxDistance={18}
        maxPolarAngle={Math.PI / 2.2}
        autoRotate={false}
        autoRotateSpeed={0.5}
      />

      <Environment preset="sunset" />

      {/* Fog for depth */}
      <fog attach="fog" args={['#0a2540', 10, 30]} />
    </>
  );
};

export const CanaryIslands: React.FC<CanaryIslandsProps> = (props) => {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 4, 10], fov: 55 }}
        shadows
        className="bg-gradient-to-b from-slate-950 via-ocean-950 to-slate-900"
        gl={{ antialias: true }}
      >
        <Suspense fallback={null}>
          <Scene {...props} />
        </Suspense>
      </Canvas>
    </div>
  );
};
