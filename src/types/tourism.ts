export interface TourismDataPoint {
  week_start_date: string;
  year: number;
  month: number;
  calendar_week: number;
  island_code: number;
  island_name: string;
  total_tourists: number;
  intl_passengers: number;
  most_common_intl_country: string;
  dom_passengers: number;
  occupancy_rate: number;
  avg_daily_rate_eur: number;
  nights: number;
  guests: number;
  revenue: number;
  avg_spend_per_trip: number;
  stay_length: number;
  total_expenditure: number;
  events_count: number;
  event_attendance: number;
}

export interface IslandMetrics {
  island_code: number;
  island_name: string;
  total_tourists: number;
  avg_occupancy: number;
  total_revenue: number;
  avg_spend_per_trip: number;
  avg_stay_length: number;
  total_nights: number;
}

export interface AggregatedData {
  total_tourists: number;
  avg_occupancy: number;
  total_revenue: number;
  avg_spend_per_trip: number;
  avg_stay_length: number;
  top_origin_countries: { country: string; count: number }[];
  monthly_data: { month: number; tourists: number }[];
  time_series: { date: string; tourists: number; occupancy: number }[];
}

export interface IslandInfo {
  code: number;
  name: string;
  position: { x: number; y: number; z: number };
  scale: number;
  color: string;
}

export const ISLAND_COLORS: Record<string, string> = {
  'Tenerife': '#0ea5e9',        // Ocean blue
  'Gran Canaria': '#38bdf8',    // Light ocean blue
  'Lanzarote': '#fde047',       // Sand yellow
  'Fuerteventura': '#facc15',   // Sand yellow-orange
  'La Palma': '#64748b',        // Volcanic gray-blue
  'La Gomera': '#475569',       // Dark volcanic gray
  'El Hierro': '#334155'        // Darkest volcanic gray
};

// Islands positioned on top of the globe (globe center at y=-5.5, radius=5, so surface at y=-0.5)
export const ISLANDS_INFO: IslandInfo[] = [
  { code: 7, name: 'El Hierro', position: { x: -2.0, y: -0.4, z: -0.5 }, scale: 0.3, color: ISLAND_COLORS['El Hierro'] },
  { code: 5, name: 'La Palma', position: { x: -1.5, y: -0.4, z: 0.8 }, scale: 0.4, color: ISLAND_COLORS['La Palma'] },
  { code: 6, name: 'La Gomera', position: { x: -1.0, y: -0.4, z: 0.0 }, scale: 0.3, color: ISLAND_COLORS['La Gomera'] },
  { code: 1, name: 'Tenerife', position: { x: 0.0, y: -0.4, z: 0.0 }, scale: 1.0, color: ISLAND_COLORS['Tenerife'] },
  { code: 2, name: 'Gran Canaria', position: { x: 1.2, y: -0.4, z: -0.3 }, scale: 0.9, color: ISLAND_COLORS['Gran Canaria'] },
  { code: 4, name: 'Fuerteventura', position: { x: 2.2, y: -0.4, z: -0.2 }, scale: 0.7, color: ISLAND_COLORS['Fuerteventura'] },
  { code: 3, name: 'Lanzarote', position: { x: 2.5, y: -0.4, z: 0.6 }, scale: 0.5, color: ISLAND_COLORS['Lanzarote'] }
];
