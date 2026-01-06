import { useState, useCallback } from 'react';

export const useIslandSelection = () => {
  const [selectedIsland, setSelectedIsland] = useState<number | null>(null);
  const [hoveredIsland, setHoveredIsland] = useState<number | null>(null);

  const selectIsland = useCallback((islandCode: number | null) => {
    setSelectedIsland(islandCode);
  }, []);

  const hoverIsland = useCallback((islandCode: number | null) => {
    setHoveredIsland(islandCode);
  }, []);

  const clearSelection = useCallback(() => {
    setSelectedIsland(null);
  }, []);

  return {
    selectedIsland,
    hoveredIsland,
    selectIsland,
    hoverIsland,
    clearSelection,
    isSelected: (islandCode: number) => selectedIsland === islandCode,
    isHovered: (islandCode: number) => hoveredIsland === islandCode
  };
};
