import React from 'react';
import { ISLANDS_INFO } from '../../types/tourism';

interface SidebarProps {
  selectedIsland: number | null;
  onSelectIsland: (islandCode: number) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ selectedIsland, onSelectIsland }) => {
  return (
    <aside className="w-64 bg-volcanic-800/50 backdrop-blur-sm border-r border-volcanic-700 p-6 overflow-y-auto">
      <div className="space-y-6">
        <div>
          <h2 className="text-lg font-semibold mb-4 text-ocean-300">
            Canary Islands
          </h2>
          <div className="space-y-2">
            {ISLANDS_INFO.map((island) => (
              <button
                key={island.code}
                onClick={() => onSelectIsland(island.code)}
                className={`
                  w-full text-left px-4 py-3 rounded-lg transition-all duration-200
                  ${
                    selectedIsland === island.code
                      ? 'bg-ocean-600 text-white shadow-lg glow'
                      : 'bg-volcanic-700/50 hover:bg-volcanic-700 text-volcanic-200'
                  }
                `}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: island.color }}
                  />
                  <span className="font-medium">{island.name}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="pt-6 border-t border-volcanic-700">
          <h3 className="text-sm font-semibold mb-3 text-volcanic-300 uppercase tracking-wider">
            Legend
          </h3>
          <div className="space-y-2 text-sm text-volcanic-300">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-ocean-500" />
              <span>High tourism volume</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-sand-400" />
              <span>Medium tourism volume</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-volcanic-500" />
              <span>Low tourism volume</span>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-volcanic-700">
          <p className="text-xs text-volcanic-400 leading-relaxed">
            Click on islands in the 3D map or use the list above to explore detailed tourism metrics for each island.
          </p>
        </div>
      </div>
    </aside>
  );
};
