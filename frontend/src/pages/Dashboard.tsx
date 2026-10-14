import { useNavigate } from 'react-router-dom';
import { Activity, HeartPulse, CalendarClock, Gauge, Sparkles, Plus, Eye } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { KpiCard } from '@/components/ui/KpiCard';
import { Badge } from '@/components/ui/Badge';
import { ChartCard } from '@/components/charts/ChartCard';
import {
  PieChart, Pie, Cell,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RTooltip, Legend,
  LineChart, Line, ResponsiveContainer,
} from 'recharts';
import '@/pages/Dashboard.css';
import { kpiData, readmissionBinary, losDistribution, timeSeriesData, recentPredictions, modelComparison } from '@/data/mockData';

const PIE_COLORS = ['#4169E1', '#20B2AA', '#F59E0B', '#DC2626', '#16A34A', '#7B96EE'];
import type { LucideIcon } from 'lucide-react';

const iconMap: Record<string, LucideIcon> = {
  Activity, HeartPulse, CalendarClock, Gauge,
};

export function DashboardPage() {
  const navigate = useNavigate();
  const bestModel = modelComparison
    .filter((m) => m.task === 'classification')
    .reduce((best, m) => (m.accuracy > best.accuracy ? m : best));

  return (
    <div>
      <div className="dashboard-demo-banner">
        <Sparkles size={14} />
        Demonstration data — values shown are illustrative and do not represent real hospital statistics or model results.
      </div>

      <div className="dashboard-welcome">
        <div>
          <h2>Smart Healthcare Analytics</h2>
          <p>Transform healthcare data into meaningful predictive insights.</p>
        </div>
        <Button variant="primary" icon={<Plus size={16} />} onClick={() => navigate('/readmission')}>
          Start New Prediction
        </Button>
      </div>

      <div className="dashboard-kpi-grid">
        {kpiData.map((kpi) => {
          const Icon = iconMap[kpi.icon] ?? Activity;
          return <KpiCard key={kpi.id} data={kpi} icon={Icon} />;
        })}
      </div>

      <div className="dashboard-charts-grid">
        <ChartCard title="Readmission Distribution" subtitle="Yes/No prediction breakdown (demo)">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={readmissionBinary}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={90}
                innerRadius={50}
                label={({ name, percent }) => `${name} ${((percent ?? 0) * 100).toFixed(0)}%`}
                labelLine={false}
              >
                {readmissionBinary.map((_, i) => (
                  <Cell key={i} fill={PIE_COLORS[i]} />
                ))}
              </Pie>
              <RTooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Length-of-Stay Distribution" subtitle="Predicted stay buckets (demo)">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={losDistribution}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.15)" />
              <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#64748B' }} />
              <YAxis tick={{ fontSize: 11, fill: '#64748B' }} />
              <RTooltip />
              <Bar dataKey="value" fill="#20B2AA" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Prediction Activity Over Time" subtitle="Monthly prediction volume (demo)">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={timeSeriesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.15)" />
              <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#64748B' }} />
              <YAxis tick={{ fontSize: 11, fill: '#64748B' }} />
              <RTooltip />
              <Legend />
              <Line type="monotone" dataKey="readmission" stroke="#4169E1" strokeWidth={2} dot={{ r: 3 }} />
              <Line type="monotone" dataKey="lengthOfStay" stroke="#20B2AA" strokeWidth={2} dot={{ r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <Card className="dashboard-recent">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h3 style={{ fontSize: 'var(--font-size-lg)', fontWeight: 600 }}>Recent Predictions</h3>
          <Button variant="ghost" size="sm" icon={<Eye size={14} />} onClick={() => navigate('/prediction-history')}>
            View All
          </Button>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 'var(--font-size-sm)' }}>
            <thead>
              <tr>
                {['Prediction ID', 'Type', 'Outcome', 'Value', 'Model', 'Timestamp'].map((h) => (
                  <th key={h} style={{ textAlign: 'left', padding: '0.625rem 0.75rem', fontSize: 'var(--font-size-xs)', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.04em', borderBottom: '1px solid var(--border)' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {recentPredictions.map((pred) => (
                <tr key={pred.id} style={{ transition: 'background var(--transition-fast)' }} onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(148,163,184,0.06)')} onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}>
                  <td style={{ padding: '0.625rem 0.75rem', borderBottom: '1px solid var(--border-light)', fontFamily: 'monospace', fontSize: '0.8rem' }}>{pred.id}</td>
                  <td style={{ padding: '0.625rem 0.75rem', borderBottom: '1px solid var(--border-light)' }}>
                    <Badge variant={pred.type === 'Readmission' ? 'primary' : 'teal'}>{pred.type}</Badge>
                  </td>
                  <td style={{ padding: '0.625rem 0.75rem', borderBottom: '1px solid var(--border-light)' }}>
                    <Badge variant={pred.outcome === 'Yes' ? 'error' : pred.outcome === 'No' ? 'success' : 'neutral'} dot>
                      {pred.outcome}
                    </Badge>
                  </td>
                  <td style={{ padding: '0.625rem 0.75rem', borderBottom: '1px solid var(--border-light)', fontWeight: 500 }}>{pred.value}</td>
                  <td style={{ padding: '0.625rem 0.75rem', borderBottom: '1px solid var(--border-light)', color: 'var(--text-secondary)' }}>{pred.modelVersion}</td>
                  <td style={{ padding: '0.625rem 0.75rem', borderBottom: '1px solid var(--border-light)', color: 'var(--text-muted)', fontSize: '0.8rem' }}>{pred.timestamp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Card style={{ marginTop: 'var(--space-2)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Gauge size={18} color="var(--primary)" />
          <span style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-secondary)' }}>
            Best performing model: <strong>{bestModel.model}</strong> — Accuracy: {(bestModel.accuracy * 100).toFixed(1)}% (demonstration metric)
          </span>
        </div>
      </Card>
    </div>
  );
}
