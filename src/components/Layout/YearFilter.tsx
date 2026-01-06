import React from 'react';

interface YearFilterProps {
  years: number[];
  selectedYear: number | null;
  onYearChange: (year: number | null) => void;
}

export const YearFilter: React.FC<YearFilterProps> = ({
  years,
  selectedYear,
  onYearChange,
}) => {
  return (
    <div className="flex items-center">
      <select
        id="year-filter"
        value={selectedYear || 'all'}
        onChange={(e) => {
          const value = e.target.value;
          onYearChange(value === 'all' ? null : parseInt(value, 10));
        }}
        className="px-4 py-2 bg-white border border-volcanic-300 rounded-lg shadow-sm
                   hover:border-ocean-500 focus:border-ocean-500 focus:ring-2
                   focus:ring-ocean-200 transition-colors cursor-pointer
                   text-volcanic-700 font-medium"
      >
        <option value="all">All Years</option>
        {years.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
    </div>
  );
};
