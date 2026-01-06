import { useState } from 'react';
import { Header } from './components/Layout/Header';
import { Sidebar } from './components/Layout/Sidebar';
import { CanaryIslands2D } from './components/Map3D/CanaryIslands2D';
import { KPICards } from './components/Dashboard/KPICards';
import { TouristChart } from './components/Dashboard/TouristChart';
import { OriginChart } from './components/Dashboard/OriginChart';
import { SeasonalityChart } from './components/Dashboard/SeasonalityChart';
import { OccupancyChart } from './components/Dashboard/OccupancyChart';
import { IslandComparisonTourists } from './components/Dashboard/IslandComparisonTourists';
import { IslandComparisonRevenue } from './components/Dashboard/IslandComparisonRevenue';
import { useTourismData } from './hooks/useTourismData';
import { useIslandSelection } from './hooks/useIslandSelection';
import { ISLANDS_INFO } from './types/tourism';

function App() {
  const {
    selectedIsland,
    hoveredIsland,
    selectIsland,
    hoverIsland,
    clearSelection
  } = useIslandSelection();

  const [selectedYear, setSelectedYear] = useState<number | null>(null);

  const { aggregatedData, islandMetrics, loading, error, years } = useTourismData(
    selectedIsland,
    selectedYear || undefined,
    selectedYear || undefined
  );

  const selectedIslandInfo = ISLANDS_INFO.find(i => i.code === selectedIsland);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-ocean-500 mx-auto"></div>
          <p className="text-volcanic-300">Loading tourism data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="card max-w-md text-center space-y-4">
          <p className="text-red-400 text-lg font-semibold">Error loading data</p>
          <p className="text-volcanic-300">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header
        selectedIsland={selectedIsland}
        onClearSelection={clearSelection}
        years={years}
        selectedYear={selectedYear}
        onYearChange={setSelectedYear}
      />

      <div className="flex-1 flex overflow-hidden">
        <Sidebar
          selectedIsland={selectedIsland}
          onSelectIsland={selectIsland}
        />

        <main className="flex-1 overflow-y-auto">
          <div className="p-6 space-y-6">
            {/* 2D Map Section */}
            <div className="card h-[500px]">
              <CanaryIslands2D
                selectedIsland={selectedIsland}
                hoveredIsland={hoveredIsland}
                onSelectIsland={selectIsland}
                onHoverIsland={hoverIsland}
              />
            </div>

            {/* KPI Cards */}
            <KPICards
              data={aggregatedData}
              islandName={selectedIslandInfo?.name}
            />

            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <TouristChart data={aggregatedData} />
              <OccupancyChart data={aggregatedData} />
              <OriginChart data={aggregatedData} />
              <SeasonalityChart data={aggregatedData} />
            </div>

            {/* Island Comparison Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <IslandComparisonTourists islandMetrics={islandMetrics} />
              <IslandComparisonRevenue islandMetrics={islandMetrics} />
            </div>

            {/* Footer Info */}
            <div className="card text-center text-sm text-volcanic-300">
              <p>
                Data Source: Official Canary Islands Tourism Statistics (2015-2025)
                • TFM Generative AI • 2025
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
