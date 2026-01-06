import { useState, useEffect, useMemo } from 'react';
import { TourismDataPoint, AggregatedData, IslandMetrics } from '../types/tourism';
import { aggregateData, aggregateByIsland, filterDataByIsland, filterDataByDateRange } from '../utils/dataTransforms';
import tourismData from '../data/tourism_data.json';

export const useTourismData = (
  selectedIsland: number | null = null,
  startYear?: number,
  endYear?: number,
  month?: number
) => {
  const [data, setData] = useState<TourismDataPoint[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      setLoading(true);
      // Type assertion since we know the structure of the JSON
      const loadedData = tourismData as TourismDataPoint[];
      setData(loadedData);
      setError(null);
    } catch (err) {
      setError('Error loading tourism data');
      console.error('Error loading data:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const filteredData = useMemo(() => {
    let filtered = data;

    // Filter by island
    filtered = filterDataByIsland(filtered, selectedIsland);

    // Filter by date range
    if (startYear || endYear) {
      filtered = filterDataByDateRange(filtered, startYear, endYear);
    }

    // Filter by month
    if (month !== undefined && month !== null) {
      filtered = filtered.filter(d => d.month === month);
    }

    return filtered;
  }, [data, selectedIsland, startYear, endYear, month]);

  const aggregatedData: AggregatedData = useMemo(() => {
    return aggregateData(filteredData);
  }, [filteredData]);

  const years = useMemo(() => {
    const yearSet = new Set(data.map(d => d.year));
    return Array.from(yearSet).sort();
  }, [data]);

  // Aggregate by island for comparison charts (only when not filtering by island)
  const islandMetrics: IslandMetrics[] = useMemo(() => {
    // For island comparison, we want to use data filtered by year/month but NOT by island
    let comparisonData = data;
    if (startYear || endYear) {
      comparisonData = filterDataByDateRange(comparisonData, startYear, endYear);
    }
    if (month !== undefined && month !== null) {
      comparisonData = comparisonData.filter(d => d.month === month);
    }
    return aggregateByIsland(comparisonData);
  }, [data, startYear, endYear, month]);

  return {
    data: filteredData,
    aggregatedData,
    islandMetrics,
    loading,
    error,
    years,
    totalDataPoints: data.length,
    filteredDataPoints: filteredData.length
  };
};
