import type { LucideIcon } from 'lucide-react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import type { KpiCardData } from '@/types';

interface KpiCardProps {
  data: KpiCardData;
  icon: LucideIcon;
}

export function KpiCard({ data, icon: Icon }: KpiCardProps) {
  const TrendIcon = data.trend?.direction === 'up' ? TrendingUp : data.trend?.direction === 'down' ? TrendingDown : Minus;
  return (
    <div className="neu-kpi-card">
      <div className="neu-kpi-top">
        <div className={`neu-kpi-icon ${data.accent}`}>
          <Icon size={22} />
        </div>
        {data.trend && (
          <span className={`neu-kpi-trend ${data.trend.direction}`}>
            <TrendIcon size={14} />
            {data.trend.value}
          </span>
        )}
      </div>
      <div>
        <div className="neu-kpi-value">{data.value}</div>
        <div className="neu-kpi-title">{data.title}</div>
        <div className="neu-kpi-subtitle">{data.subtitle}</div>
      </div>
    </div>
  );
}
