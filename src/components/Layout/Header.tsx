import React from 'react';
import { YearFilter } from './YearFilter';

interface HeaderProps {
  selectedIsland: number | null;
  onClearSelection: () => void;
  years: number[];
  selectedYear: number | null;
  onYearChange: (year: number | null) => void;
}

export const Header: React.FC<HeaderProps> = ({
  selectedIsland,
  onClearSelection,
  years,
  selectedYear,
  onYearChange
}) => {
  return (
    <header className="bg-volcanic-800/70 backdrop-blur-md border-b border-volcanic-700 px-6 py-4 shadow-lg">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold text-shadow">
            Canarias Tourism Analytics
          </h1>
          <span className="text-sm text-ocean-300 bg-ocean-900/30 px-3 py-1 rounded-full">
            TFM 2025
          </span>
        </div>

        <div className="flex items-center gap-4">
          <YearFilter
            years={years}
            selectedYear={selectedYear}
            onYearChange={onYearChange}
          />

          {selectedIsland !== null && (
            <button
              onClick={onClearSelection}
              className="btn-secondary flex items-center gap-2"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              View All Islands
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
