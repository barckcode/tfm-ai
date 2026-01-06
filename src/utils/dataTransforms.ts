import { TourismDataPoint, AggregatedData, IslandMetrics } from '../types/tourism';

export const aggregateData = (data: TourismDataPoint[]): AggregatedData => {
  if (data.length === 0) {
    return {
      total_tourists: 0,
      avg_occupancy: 0,
      total_revenue: 0,
      avg_spend_per_trip: 0,
      avg_stay_length: 0,
      top_origin_countries: [],
      monthly_data: [],
      time_series: []
    };
  }

  const total_tourists = data.reduce((sum, d) => sum + d.total_tourists, 0);
  const total_revenue = data.reduce((sum, d) => sum + d.revenue, 0);
  const avg_occupancy = data.reduce((sum, d) => sum + d.occupancy_rate, 0) / data.length;
  const avg_spend_per_trip = data.reduce((sum, d) => sum + d.avg_spend_per_trip, 0) / data.length;
  const avg_stay_length = data.reduce((sum, d) => sum + d.stay_length, 0) / data.length;

  // Country aggregation
  const countryMap = new Map<string, number>();
  data.forEach(d => {
    const country = d.most_common_intl_country;
    countryMap.set(country, (countryMap.get(country) || 0) + d.intl_passengers);
  });
  const top_origin_countries = Array.from(countryMap.entries())
    .map(([country, count]) => ({ country, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 8);

  // Monthly aggregation
  const monthMap = new Map<number, number>();
  data.forEach(d => {
    monthMap.set(d.month, (monthMap.get(d.month) || 0) + d.total_tourists);
  });
  const monthly_data = Array.from(monthMap.entries())
    .map(([month, tourists]) => ({ month, tourists }))
    .sort((a, b) => a.month - b.month);

  // Time series (weekly data, limited to last 52 weeks for performance)
  const sortedData = [...data].sort((a, b) =>
    new Date(a.week_start_date).getTime() - new Date(b.week_start_date).getTime()
  );

  const weekMap = new Map<string, { tourists: number; occupancy: number; count: number }>();
  sortedData.forEach(d => {
    const existing = weekMap.get(d.week_start_date);
    if (existing) {
      existing.tourists += d.total_tourists;
      existing.occupancy += d.occupancy_rate;
      existing.count += 1;
    } else {
      weekMap.set(d.week_start_date, {
        tourists: d.total_tourists,
        occupancy: d.occupancy_rate,
        count: 1
      });
    }
  });

  const time_series = Array.from(weekMap.entries())
    .map(([date, stats]) => ({
      date,
      tourists: stats.tourists,
      occupancy: stats.occupancy / stats.count
    }))
    .slice(-104); // Last 2 years of data

  return {
    total_tourists,
    avg_occupancy,
    total_revenue,
    avg_spend_per_trip,
    avg_stay_length,
    top_origin_countries,
    monthly_data,
    time_series
  };
};

export const aggregateByIsland = (data: TourismDataPoint[]): IslandMetrics[] => {
  const islandMap = new Map<number, {
    island_name: string;
    total_tourists: number;
    total_occupancy: number;
    total_revenue: number;
    total_spend: number;
    total_stay: number;
    total_nights: number;
    count: number;
  }>();

  data.forEach(d => {
    const existing = islandMap.get(d.island_code);
    if (existing) {
      existing.total_tourists += d.total_tourists;
      existing.total_occupancy += d.occupancy_rate;
      existing.total_revenue += d.revenue;
      existing.total_spend += d.avg_spend_per_trip;
      existing.total_stay += d.stay_length;
      existing.total_nights += d.nights;
      existing.count += 1;
    } else {
      islandMap.set(d.island_code, {
        island_name: d.island_name,
        total_tourists: d.total_tourists,
        total_occupancy: d.occupancy_rate,
        total_revenue: d.revenue,
        total_spend: d.avg_spend_per_trip,
        total_stay: d.stay_length,
        total_nights: d.nights,
        count: 1
      });
    }
  });

  return Array.from(islandMap.entries())
    .map(([island_code, stats]) => ({
      island_code,
      island_name: stats.island_name,
      total_tourists: stats.total_tourists,
      avg_occupancy: stats.total_occupancy / stats.count,
      total_revenue: stats.total_revenue,
      avg_spend_per_trip: stats.total_spend / stats.count,
      avg_stay_length: stats.total_stay / stats.count,
      total_nights: stats.total_nights
    }))
    .sort((a, b) => b.total_tourists - a.total_tourists);
};

export const filterDataByIsland = (
  data: TourismDataPoint[],
  islandCode: number | null
): TourismDataPoint[] => {
  if (islandCode === null) return data;
  return data.filter(d => d.island_code === islandCode);
};

export const filterDataByDateRange = (
  data: TourismDataPoint[],
  startYear?: number,
  endYear?: number,
  startMonth?: number,
  endMonth?: number
): TourismDataPoint[] => {
  let filtered = data;

  if (startYear !== undefined) {
    filtered = filtered.filter(d => d.year >= startYear);
  }

  if (endYear !== undefined) {
    filtered = filtered.filter(d => d.year <= endYear);
  }

  if (startMonth !== undefined && startYear !== undefined) {
    filtered = filtered.filter(d => {
      if (d.year === startYear) {
        return d.month >= startMonth;
      }
      return true;
    });
  }

  if (endMonth !== undefined && endYear !== undefined) {
    filtered = filtered.filter(d => {
      if (d.year === endYear) {
        return d.month <= endMonth;
      }
      return true;
    });
  }

  return filtered;
};
