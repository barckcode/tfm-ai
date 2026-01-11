import React from 'react';
import { DownloadMenu } from './DownloadMenu';

interface HeaderProps {
  selectedIsland: number | null;
  selectedYear: number | null;
  selectedMonth: number | null;
  filteredData: any[];
  aggregatedData: any;
}

export const Header: React.FC<HeaderProps> = ({
  selectedIsland,
  selectedYear,
  selectedMonth,
  filteredData,
  aggregatedData
}) => {
  return (
    <header className="bg-volcanic-800/70 backdrop-blur-md border-b border-volcanic-700 px-6 py-4 shadow-lg sticky top-0 z-50">
      <div className="max-w-8xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold text-shadow">
            Analítica de Turismo de Canarias
          </h1>
          <span className="text-sm text-ocean-300 bg-ocean-900/30 px-3 py-1 rounded-full">
            TFM 2025
          </span>
        </div>

        <DownloadMenu
          selectedIsland={selectedIsland}
          selectedYear={selectedYear}
          selectedMonth={selectedMonth}
          filteredData={filteredData}
          aggregatedData={aggregatedData}
        />
      </div>
    </header>
  );
};
