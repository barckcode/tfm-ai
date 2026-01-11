import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { AggregatedData } from '../../types/tourism';
import { formatNumber, formatDate } from '../../utils/formatters';

interface TouristChartProps {
  data: AggregatedData;
}

export const TouristChart: React.FC<TouristChartProps> = ({ data }) => {
  const chartData = data.time_series.map(point => ({
    date: formatDate(point.date),
    tourists: point.tourists,
    occupancy: point.occupancy * 100
  }));

  return (
    <div className="card">
      <h3 className="text-lg font-semibold mb-4 text-ocean-300">
        Llegada de Turistas en el Tiempo
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
            tickFormatter={(value) => formatNumber(value)}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#1e293b',
              border: '1px solid #475569',
              borderRadius: '8px',
              color: '#f1f5f9'
            }}
            formatter={(value: number) => [formatNumber(value), 'Turistas']}
          />
          <Legend
            wrapperStyle={{ color: '#94a3b8' }}
            iconType="line"
          />
          <Line
            type="monotone"
            dataKey="tourists"
            stroke="#0ea5e9"
            strokeWidth={2}
            dot={false}
            name="Total Turistas"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
