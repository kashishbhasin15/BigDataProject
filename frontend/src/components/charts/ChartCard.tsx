import type { ReactNode } from 'react';

interface ChartCardProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  action?: ReactNode;
  height?: number;
}

export function ChartCard({ title, subtitle, children, action, height = 280 }: ChartCardProps) {
  return (
    <div className="neu-card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
        <div>
          <h3 style={{ fontSize: 'var(--font-size-lg)', fontWeight: 600 }}>{title}</h3>
          {subtitle && <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-secondary)', marginTop: '0.125rem' }}>{subtitle}</p>}
        </div>
        {action}
      </div>
      <div style={{ height }}>
        {children}
      </div>
    </div>
  );
}
