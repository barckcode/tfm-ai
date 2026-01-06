import React from 'react';
import { ISLANDS_INFO } from '../../types/tourism';

interface FilterBarProps {
  selectedIsland: number | null;
  onSelectIsland: (islandCode: number | null) => void;
  years: number[];
  selectedYear: number | null;
  onYearChange: (year: number | null) => void;
  selectedMonth: number | null;
  onMonthChange: (month: number | null) => void;
}

const MONTHS = [
  { value: 1, label: 'January' },
  { value: 2, label: 'February' },
  { value: 3, label: 'March' },
  { value: 4, label: 'April' },
  { value: 5, label: 'May' },
  { value: 6, label: 'June' },
  { value: 7, label: 'July' },
  { value: 8, label: 'August' },
  { value: 9, label: 'September' },
  { value: 10, label: 'October' },
  { value: 11, label: 'November' },
  { value: 12, label: 'December' }
];

export const FilterBar: React.FC<FilterBarProps> = ({
  selectedIsland,
  onSelectIsland,
  years,
  selectedYear,
  onYearChange,
  selectedMonth,
  onMonthChange
}) => {
  return (
    <div className="card" data-exclude-pdf="true">
      <div className="flex flex-col gap-6">
        {/* Title */}
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Filters</h3>
          {(selectedIsland !== null || selectedYear !== null || selectedMonth !== null) && (
            <button
              onClick={() => {
                onSelectIsland(null);
                onYearChange(null);
                onMonthChange(null);
              }}
              className="text-sm text-ocean-400 hover:text-ocean-300 transition-colors"
            >
              Clear All Filters
            </button>
          )}
        </div>

        {/* Island Selector */}
        <div>
          <label className="block text-sm font-medium text-volcanic-300 mb-3">
            Select Island
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3">
            <button
              onClick={() => onSelectIsland(null)}
              className={`px-4 py-2 rounded-lg border-2 transition-all ${
                selectedIsland === null
                  ? 'border-ocean-500 bg-ocean-500/20 text-ocean-300 font-semibold'
                  : 'border-volcanic-600 bg-volcanic-700/50 text-volcanic-300 hover:border-volcanic-500'
              }`}
            >
              All Islands
            </button>
            {ISLANDS_INFO.map((island) => (
              <button
                key={island.code}
                onClick={() => onSelectIsland(island.code)}
                className={`px-4 py-2 rounded-lg border-2 transition-all ${
                  selectedIsland === island.code
                    ? 'border-ocean-500 bg-ocean-500/20 text-ocean-300 font-semibold'
                    : 'border-volcanic-600 bg-volcanic-700/50 text-volcanic-300 hover:border-volcanic-500'
                }`}
                style={{
                  borderColor: selectedIsland === island.code ? island.color : undefined
                }}
              >
                <div className="flex items-center gap-2 justify-center">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: island.color }}
                  ></div>
                  <span className="text-sm">{island.name}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Year and Month Selectors */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Year Filter */}
          <div>
            <label htmlFor="year-filter" className="block text-sm font-medium text-volcanic-300 mb-2">
              Year
            </label>
            <select
              id="year-filter"
              value={selectedYear || 'all'}
              onChange={(e) => {
                const value = e.target.value;
                onYearChange(value === 'all' ? null : parseInt(value, 10));
              }}
              className="w-full px-4 py-2 bg-volcanic-700 border border-volcanic-600
                         rounded-lg text-volcanic-100
                         hover:border-ocean-500 focus:border-ocean-500 focus:ring-2
                         focus:ring-ocean-200/20 transition-colors cursor-pointer"
            >
              <option value="all">All Years</option>
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>

          {/* Month Filter */}
          <div>
            <label htmlFor="month-filter" className="block text-sm font-medium text-volcanic-300 mb-2">
              Month
            </label>
            <select
              id="month-filter"
              value={selectedMonth || 'all'}
              onChange={(e) => {
                const value = e.target.value;
                onMonthChange(value === 'all' ? null : parseInt(value, 10));
              }}
              disabled={!selectedYear}
              className="w-full px-4 py-2 bg-volcanic-700 border border-volcanic-600
                         rounded-lg text-volcanic-100
                         hover:border-ocean-500 focus:border-ocean-500 focus:ring-2
                         focus:ring-ocean-200/20 transition-colors cursor-pointer
                         disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <option value="all">All Months</option>
              {MONTHS.map((month) => (
                <option key={month.value} value={month.value}>
                  {month.label}
                </option>
              ))}
            </select>
            {!selectedYear && (
              <p className="text-xs text-volcanic-400 mt-1">
                Select a year first to filter by month
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
