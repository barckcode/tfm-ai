import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { AggregatedData } from '../../types/tourism';
import { formatDate } from '../../utils/formatters';

interface OccupancyChartProps {
  data: AggregatedData;
}

export const OccupancyChart: React.FC<OccupancyChartProps> = ({ data }) => {
  const chartData = data.time_series.map(point => ({
    date: formatDate(point.date),
    occupancy: point.occupancy * 100
  }));

  return (
    <div className="card">
      <h3 className="text-lg font-semibold mb-4 text-ocean-300">
        Tendencias de Ocupación Hotelera
      </h3>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
          <XAxis
            dataKey="date"
            stroke="#94a3b8"
            tick={{ fill: '#94a3b8', fontSize: 12 }}
            tickLine={{ stroke: '#475569' }}
          />
          <YAxis
            stroke="#94a3b8"
            tick={{ fill: '#94a3b8', fontSize: 12 }}
            tickLine={{ stroke: '#475569' }}
            tickFormatter={(value) => `${value}%`}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#1e293b',
              border: '1px solid #475569',
              borderRadius: '8px',
              color: '#f1f5f9'
            }}
            formatter={(value: number) => [`${value.toFixed(1)}%`, 'Ocupación']}
          />
          <Line
            type="monotone"
            dataKey="occupancy"
            stroke="#facc15"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
