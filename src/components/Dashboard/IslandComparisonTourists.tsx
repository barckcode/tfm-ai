import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { IslandMetrics } from '../../types/tourism';
import { formatNumber } from '../../utils/formatters';
import { ISLAND_COLORS } from '../../types/tourism';

interface IslandComparisonTouristsProps {
  islandMetrics: IslandMetrics[];
}

export const IslandComparisonTourists: React.FC<IslandComparisonTouristsProps> = ({ islandMetrics }) => {
  const chartData = islandMetrics.map(island => ({
    name: island.island_name,
    tourists: island.total_tourists,
    fill: ISLAND_COLORS[island.island_name] || '#64748b'
  }));

  return (
    <div className="card">
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <span className="text-2xl">📊</span>
        Total de Turistas por Isla
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
          <XAxis
            dataKey="name"
            stroke="#94a3b8"
            angle={-45}
            textAnchor="end"
            height={80}
            style={{ fontSize: '12px' }}
          />
          <YAxis
            stroke="#94a3b8"
            tickFormatter={(value) => formatNumber(value)}
            style={{ fontSize: '12px' }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#1e293b',
              border: '1px solid #334155',
              borderRadius: '8px',
              color: '#f1f5f9'
            }}
            formatter={(value: number) => [formatNumber(value), 'Turistas']}
          />
          <Bar
            dataKey="tourists"
            radius={[8, 8, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
