import * as THREE from 'three';

// Create a realistic island shape - flatter and more organic
export const createIslandShape = (scale: number = 1, seed: number = 0): THREE.BufferGeometry => {
  // Start with a cylinder for a flatter base
  const geometry = new THREE.CylinderGeometry(0.3 * scale, 0.35 * scale, 0.15 * scale, 16, 4);

  // Get position attribute
  const positions = geometry.attributes.position;
  const vertex = new THREE.Vector3();

  // Random generator seeded
  const random = (x: number, y: number, z: number) => {
    const value = Math.sin(x * 12.9898 + y * 78.233 + z * 45.164 + seed) * 43758.5453;
    return value - Math.floor(value);
  };

  // Deform to create organic island shape
  for (let i = 0; i < positions.count; i++) {
    vertex.fromBufferAttribute(positions, i);

    // Distance from center
    const distFromCenter = Math.sqrt(vertex.x * vertex.x + vertex.z * vertex.z);
    const normalizedDist = distFromCenter / (0.3 * scale);

    // Create irregular coastline
    const angle = Math.atan2(vertex.z, vertex.x);
    const coastVariation = random(Math.cos(angle * 5), Math.sin(angle * 5), 0) * 0.3;

    // Make edges more irregular
    if (normalizedDist > 0.7) {
      const edgeFactor = (normalizedDist - 0.7) / 0.3;
      vertex.x *= 1 + coastVariation * edgeFactor * 0.5;
      vertex.z *= 1 + coastVariation * edgeFactor * 0.5;
    }

    // Add height variations for mountains (only on top)
    if (vertex.y > 0) {
      const heightNoise = random(vertex.x * 2, vertex.z * 2, 1) * 0.4;
      // Central peak
      const peakHeight = (1 - normalizedDist) * heightNoise * 2;
      vertex.y += peakHeight * scale;
    }

    positions.setXYZ(i, vertex.x, vertex.y, vertex.z);
  }

  geometry.computeVertexNormals();
  return geometry;
};

// Create terrain texture with height-based coloring
export const createTerrainTexture = (baseColor: string): THREE.CanvasTexture => {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');

  if (ctx) {
    // Base color
    ctx.fillStyle = baseColor;
    ctx.fillRect(0, 0, 256, 256);

    // Add rocky/volcanic texture
    ctx.globalAlpha = 0.3;
    for (let i = 0; i < 500; i++) {
      const x = Math.random() * 256;
      const y = Math.random() * 256;
      const size = Math.random() * 3;

      // Darker spots for rocks
      ctx.fillStyle = `rgba(0, 0, 0, ${Math.random() * 0.5})`;
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fill();
    }

    // Add some highlights for variety
    ctx.globalAlpha = 0.2;
    for (let i = 0; i < 300; i++) {
      const x = Math.random() * 256;
      const y = Math.random() * 256;
      const size = Math.random() * 2;

      ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  return texture;
};

// Predefined island shapes with unique characteristics
export const ISLAND_SHAPES: Record<number, (scale: number) => THREE.BufferGeometry> = {
  1: (scale) => createIslandShape(scale, 1),  // Tenerife - volcanic peak (Teide)
  2: (scale) => createIslandShape(scale, 2),  // Gran Canaria - circular
  3: (scale) => createIslandShape(scale, 3),  // Lanzarote - elongated
  4: (scale) => createIslandShape(scale, 4),  // Fuerteventura - elongated
  5: (scale) => createIslandShape(scale, 5),  // La Palma - steep mountains
  6: (scale) => createIslandShape(scale, 6),  // La Gomera - circular
  7: (scale) => createIslandShape(scale, 7)   // El Hierro - small and steep
};
