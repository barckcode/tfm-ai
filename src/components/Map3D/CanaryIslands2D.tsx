import React, { useState } from 'react';
import { ISLANDS_INFO } from '../../types/tourism';

interface CanaryIslands2DProps {
  selectedIsland: number | null;
  hoveredIsland: number | null;
  onSelectIsland: (islandCode: number) => void;
  onHoverIsland: (islandCode: number | null) => void;
}

// SVG paths for each island (based on real geographic shapes from reference image)
const ISLAND_PATHS: Record<number, string> = {
  // El Hierro - pequeña, triangular/irregular en el extremo oeste
  7: 'M 45 190 L 38 195 L 42 205 L 50 208 L 58 205 L 60 198 L 55 188 Z',

  // La Gomera - circular/redonda, pequeña (entre El Hierro y Tenerife, más abajo)
  6: 'M 110 200 Q 100 203 100 213 Q 103 223 113 225 Q 123 223 125 213 Q 125 203 110 200 Z',

  // La Palma - alargada vertical (norte-sur), en forma de triángulo (movida más arriba y izquierda)
  5: 'M 80 95 L 73 100 L 70 115 L 73 130 L 80 137 L 87 133 L 93 120 L 90 105 Z',

  // Tenerife - triangular grande, más ancha en la base
  1: 'M 185 150 L 160 155 L 150 165 L 148 180 L 155 195 L 170 205 L 190 210 L 210 205 L 225 195 L 230 180 L 228 165 L 215 152 Z',

  // Gran Canaria - casi circular, mediana
  2: 'M 285 170 Q 270 172 265 185 Q 268 200 280 210 Q 295 215 310 210 Q 320 200 322 185 Q 318 172 285 170 Z',

  // Fuerteventura - alargada vertical (norte-sur), estrecha y larga
  4: 'M 430 155 L 420 160 L 415 175 L 413 190 L 415 210 L 420 225 L 430 235 L 445 238 L 460 235 L 470 225 L 475 210 L 478 190 L 475 175 L 470 162 L 460 157 Z',

  // Lanzarote - alargada horizontal (este-oeste), irregular
  3: 'M 520 105 L 510 108 L 505 115 L 503 125 L 505 135 L 515 142 L 530 145 L 545 142 L 555 135 L 558 125 L 555 115 L 545 108 Z'
};

// Label positions (below each island to avoid overlap with selection indicator)
const LABEL_POSITIONS: Record<number, { x: number; y: number }> = {
  7: { x: 50, y: 222 },     // El Hierro - más abajo
  6: { x: 113, y: 240 },    // La Gomera - ajustada a nueva posición (más abajo)
  5: { x: 80, y: 152 },     // La Palma - ajustada a nueva posición
  1: { x: 190, y: 230 },    // Tenerife - más abajo
  2: { x: 293, y: 230 },    // Gran Canaria - más abajo
  4: { x: 445, y: 255 },    // Fuerteventura - más abajo
  3: { x: 530, y: 163 }     // Lanzarote - más abajo
};

// Circle indicator positions (center of each island)
const INDICATOR_POSITIONS: Record<number, { x: number; y: number }> = {
  7: { x: 50, y: 198 },
  6: { x: 113, y: 213 },    // La Gomera - ajustada a nueva posición
  5: { x: 80, y: 116 },     // La Palma - ajustada a nueva posición
  1: { x: 190, y: 180 },
  2: { x: 293, y: 192 },
  4: { x: 445, y: 196 },
  3: { x: 530, y: 125 }
};

export const CanaryIslands2D: React.FC<CanaryIslands2DProps> = ({
  selectedIsland,
  hoveredIsland,
  onSelectIsland,
  onHoverIsland
}) => {
  const [localHover, setLocalHover] = useState<number | null>(null);

  const handleMouseEnter = (code: number) => {
    setLocalHover(code);
    onHoverIsland(code);
  };

  const handleMouseLeave = () => {
    setLocalHover(null);
    onHoverIsland(null);
  };

  const getIslandColor = (code: number) => {
    const island = ISLANDS_INFO.find(i => i.code === code);
    if (!island) return '#64748b';

    const isSelected = selectedIsland === code;
    const isHovered = hoveredIsland === code || localHover === code;

    if (isSelected) return island.color;
    if (isHovered) return island.color;
    return island.color;
  };

  const getIslandOpacity = (code: number) => {
    const isSelected = selectedIsland === code;
    const isHovered = hoveredIsland === code || localHover === code;

    if (isSelected) return 1;
    if (isHovered) return 0.9;
    return 0.7;
  };

  const getIslandStroke = (code: number) => {
    const isSelected = selectedIsland === code;
    const isHovered = hoveredIsland === code || localHover === code;

    if (isSelected) return '#fff';
    if (isHovered) return '#fff';
    return '#1e293b';
  };

  const getIslandStrokeWidth = (code: number) => {
    const isSelected = selectedIsland === code;
    const isHovered = hoveredIsland === code || localHover === code;

    if (isSelected) return 3;
    if (isHovered) return 2.5;
    return 1.5;
  };

  return (
    <div className="w-full h-full flex items-center justify-center bg-gradient-to-b from-slate-950 via-ocean-950 to-slate-900 relative overflow-hidden">
      {/* Ocean background pattern */}
      <div className="absolute inset-0 opacity-10">
        <svg width="100%" height="100%">
          <defs>
            <pattern id="waves" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <path d="M0 50 Q 25 40, 50 50 T 100 50" stroke="#38bdf8" fill="none" strokeWidth="1" opacity="0.3"/>
              <path d="M0 60 Q 25 50, 50 60 T 100 60" stroke="#38bdf8" fill="none" strokeWidth="1" opacity="0.2"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#waves)" />
        </svg>
      </div>

      {/* Main SVG Map */}
      <svg
        viewBox="0 0 600 300"
        className="w-full h-full max-w-5xl"
        style={{ filter: 'drop-shadow(0 10px 30px rgba(0, 0, 0, 0.5))' }}
      >
        <defs>
          {/* Glow filter for selected/hovered islands */}
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Islands */}
        {ISLANDS_INFO.map((island) => {
          const isSelected = selectedIsland === island.code;
          const isHovered = hoveredIsland === island.code || localHover === island.code;

          return (
            <g key={island.code}>
              {/* Island shape */}
              <path
                d={ISLAND_PATHS[island.code]}
                fill={getIslandColor(island.code)}
                fillOpacity={getIslandOpacity(island.code)}
                stroke={getIslandStroke(island.code)}
                strokeWidth={getIslandStrokeWidth(island.code)}
                className="cursor-pointer transition-all duration-300"
                style={{
                  filter: isSelected || isHovered ? 'url(#glow)' : 'none',
                  transform: isSelected ? 'scale(1.05)' : isHovered ? 'scale(1.02)' : 'scale(1)',
                  transformOrigin: 'center',
                }}
                onClick={() => onSelectIsland(island.code)}
                onMouseEnter={() => handleMouseEnter(island.code)}
                onMouseLeave={handleMouseLeave}
              />

              {/* Island label - always visible */}
              <text
                x={LABEL_POSITIONS[island.code].x}
                y={LABEL_POSITIONS[island.code].y}
                textAnchor="middle"
                className="text-xs font-semibold pointer-events-none select-none"
                fill="#ffffff"
                style={{
                  textShadow: '0 2px 4px rgba(0,0,0,0.8)',
                  fontSize: isSelected || isHovered ? '13px' : '11px',
                  fontWeight: isSelected ? 'bold' : 'normal'
                }}
              >
                {island.name}
              </text>

              {/* Selection indicator */}
              {isSelected && (
                <circle
                  cx={INDICATOR_POSITIONS[island.code].x}
                  cy={INDICATOR_POSITIONS[island.code].y}
                  r="8"
                  fill="none"
                  stroke="#fff"
                  strokeWidth="2"
                  className="animate-pulse"
                />
              )}
            </g>
          );
        })}

        {/* Compass Rose */}
        <g transform="translate(550, 30)">
          <circle cx="0" cy="0" r="20" fill="rgba(15, 23, 42, 0.8)" stroke="#38bdf8" strokeWidth="1"/>
          <text x="0" y="-12" textAnchor="middle" fill="#38bdf8" fontSize="10" fontWeight="bold">N</text>
          <polygon points="0,-15 -3,-5 3,-5" fill="#38bdf8"/>
        </g>

        {/* Scale indicator */}
        <g transform="translate(30, 270)">
          <line x1="0" y1="0" x2="50" y2="0" stroke="#64748b" strokeWidth="2"/>
          <line x1="0" y1="-3" x2="0" y2="3" stroke="#64748b" strokeWidth="2"/>
          <line x1="50" y1="-3" x2="50" y2="3" stroke="#64748b" strokeWidth="2"/>
          <text x="25" y="15" textAnchor="middle" fill="#94a3b8" fontSize="10">50 km</text>
        </g>
      </svg>

      {/* Legend */}
      <div className="absolute bottom-6 left-6 bg-slate-900/80 backdrop-blur-sm p-4 rounded-lg border border-slate-700">
        <p className="text-xs text-slate-300 mb-2 font-semibold">Canary Islands</p>
        <p className="text-xs text-slate-400">Click on an island to view details</p>
      </div>
    </div>
  );
};
