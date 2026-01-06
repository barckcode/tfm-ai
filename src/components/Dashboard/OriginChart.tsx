import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { AggregatedData } from '../../types/tourism';
import { formatNumber, getCountryName } from '../../utils/formatters';

interface OriginChartProps {
  data: AggregatedData;
}

export const OriginChart: React.FC<OriginChartProps> = ({ data }) => {
  const chartData = data.top_origin_countries.map(country => ({
    country: getCountryName(country.country),
    passengers: country.count
  }));

  return (
    <div className="card">
      <h3 className="text-lg font-semibold mb-4 text-ocean-300">
        Top Origin Countries
      </h3>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
          <XAxis
            dataKey="country"
            stroke="#94a3b8"
            tick={{ fill: '#94a3b8', fontSize: 11 }}
            tickLine={{ stroke: '#475569' }}
            angle={-45}
            textAnchor="end"
            height={80}
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
            formatter={(value: number) => [formatNumber(value), 'Passengers']}
          />
          <Bar
            dataKey="passengers"
            fill="#facc15"
            radius={[8, 8, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
