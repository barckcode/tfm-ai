import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { AggregatedData } from '../../types/tourism';
import { formatNumber, getMonthName } from '../../utils/formatters';

interface SeasonalityChartProps {
  data: AggregatedData;
}

export const SeasonalityChart: React.FC<SeasonalityChartProps> = ({ data }) => {
  const chartData = data.monthly_data.map(point => ({
    month: getMonthName(point.month),
    tourists: point.tourists
  }));

  return (
    <div className="card">
      <h3 className="text-lg font-semibold mb-4 text-ocean-300">
        Distribución Estacional de Turistas
      </h3>

      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={chartData}>
          <defs>
            <linearGradient id="colorTourists" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0.1}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
          <XAxis
            dataKey="month"
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
          <Area
            type="monotone"
            dataKey="tourists"
            stroke="#0ea5e9"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorTourists)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
