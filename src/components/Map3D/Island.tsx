import React, { useRef, useState, useMemo } from 'react';
import { Mesh } from 'three';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import { IslandInfo } from '../../types/tourism';
import { createIslandShape, createTerrainTexture } from './IslandGeometry';

interface IslandProps {
  island: IslandInfo;
  isSelected: boolean;
  isHovered: boolean;
  onClick: () => void;
  onHover: (hover: boolean) => void;
}

export const Island: React.FC<IslandProps> = ({
  island,
  isSelected,
  isHovered,
  onClick,
  onHover
}) => {
  const meshRef = useRef<Mesh>(null);
  const [hovered, setHovered] = useState(false);

  // Create geometry and texture once
  const geometry = useMemo(() => createIslandShape(island.scale, island.code), [island.scale, island.code]);
  const terrainTexture = useMemo(() => createTerrainTexture(island.color), [island.color]);

  useFrame(() => {
    if (meshRef.current) {
      // Rotate slowly for dynamic effect
      meshRef.current.rotation.y += 0.001;
    }
  });

  const handlePointerOver = () => {
    setHovered(true);
    onHover(true);
    document.body.style.cursor = 'pointer';
  };

  const handlePointerOut = () => {
    setHovered(false);
    onHover(false);
    document.body.style.cursor = 'default';
  };

  const scale = isSelected ? 1.2 : (hovered || isHovered) ? 1.1 : 1.0;
  const elevation = isSelected ? 0.5 : (hovered || isHovered) ? 0.3 : 0;

  return (
    <group position={[island.position.x, island.position.y + elevation, island.position.z]} scale={scale}>
      <mesh
        ref={meshRef}
        onClick={onClick}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        geometry={geometry}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial
          map={terrainTexture}
          color={island.color}
          roughness={0.7}
          metalness={0.1}
          emissive={island.color}
          emissiveIntensity={isSelected ? 0.3 : (hovered || isHovered) ? 0.15 : 0.05}
          bumpMap={terrainTexture}
          bumpScale={0.1}
        />
      </mesh>

      {(isSelected || hovered || isHovered) && (
        <Text
          position={[0, 0.8, 0]}
          fontSize={0.15}
          color="white"
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.02}
          outlineColor="#000000"
        >
          {island.name}
        </Text>
      )}

      {/* Add a subtle glow effect */}
      {(isSelected || hovered || isHovered) && (
        <pointLight
          position={[0, 0.5, 0]}
          intensity={isSelected ? 2 : 1}
          distance={2}
          color={island.color}
        />
      )}
    </group>
  );
};
