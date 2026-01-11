import React from 'react';
import { AggregatedData } from '../../types/tourism';
import { formatNumber, formatCurrency, formatPercentage, formatDecimal } from '../../utils/formatters';

interface KPICardsProps {
  data: AggregatedData;
  islandName?: string;
}

export const KPICards: React.FC<KPICardsProps> = ({ data, islandName }) => {
  const kpis = [
    {
      label: 'Total Turistas',
      value: formatNumber(data.total_tourists),
      icon: '👥',
      color: 'ocean'
    },
    {
      label: 'Ocupación Media',
      value: formatPercentage(data.avg_occupancy),
      icon: '🏨',
      color: 'sand'
    },
    {
      label: 'Ingresos Totales',
      value: formatCurrency(data.total_revenue),
      icon: '💰',
      color: 'ocean'
    },
    {
      label: 'Gasto Medio/Viaje',
      value: formatCurrency(data.avg_spend_per_trip),
      icon: '💳',
      color: 'sand'
    },
    {
      label: 'Estancia Media',
      value: `${formatDecimal(data.avg_stay_length)} días`,
      icon: '📅',
      color: 'ocean'
    }
  ];

  return (
    <div className="space-y-4">
      {islandName && (
        <div className="flex items-center gap-3">
          <h2 className="text-2xl font-bold text-ocean-300">
            Métricas de {islandName}
          </h2>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {kpis.map((kpi, index) => (
          <div
            key={index}
            className={`
              card card-hover
              ${kpi.color === 'ocean' ? 'border-ocean-600/30' : 'border-sand-600/30'}
            `}
          >
            <div className="flex items-start justify-between mb-2">
              <span className="text-2xl">{kpi.icon}</span>
              <div className={`
                w-2 h-2 rounded-full
                ${kpi.color === 'ocean' ? 'bg-ocean-500' : 'bg-sand-500'}
              `} />
            </div>

            <div className="space-y-1">
              <p className="text-sm text-volcanic-300 font-medium">
                {kpi.label}
              </p>
              <p className={`
                text-2xl font-bold
                ${kpi.color === 'ocean' ? 'text-ocean-300' : 'text-sand-300'}
              `}>
                {kpi.value}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
