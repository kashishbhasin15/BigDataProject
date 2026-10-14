import { useState, useMemo } from 'react';
import { Sparkles, Filter, RotateCcw } from 'lucide-react';
import { PageHeader } from '@/components/ui/PageHeader';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Select } from '@/components/ui/Select';
import { ChartCard } from '@/components/charts/ChartCard';
import { Tabs } from '@/components/ui/Tabs';
import {
  PieChart, Pie, Cell,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RTooltip, Legend,
  ResponsiveContainer,
} from 'recharts';
import '@/pages/Analytics.css';
import {
  readmissionBinary, losDistribution, ageGroupDistribution,
  admissionTypeBreakdown, admissionSourceBreakdown,
  missingValueSummary, diagnosisAnalysis,
} from '@/data/mockData';
import { ageGroupOptions, admissionTypeOptions, admissionSourceOptions } from '@/data/formOptions';

const PIE_COLORS = ['#4169E1', '#20B2AA', '#F59E0B', '#DC2626', '#16A34A', '#7B96EE', '#5FCFCA'];
const BAR_COLORS = ['#4169E1', '#20B2AA', '#F59E0B', '#DC2626', '#16A34A', '#7B96EE', '#5FCFCA', '#7B96EE'];

export function AnalyticsPage() {
  const [ageFilter, setAgeFilter] = useState('');
  const [admissionTypeFilter, setAdmissionTypeFilter] = useState('');
  const [admissionSourceFilter, setAdmissionSourceFilter] = useState('');
  const [activeTab, setActiveTab] = useState('distribution');

  const filteredDiagnosis = useMemo(() => {
    let data = [...diagnosisAnalysis];
    if (ageFilter) data = data.filter((d) => d.readmissionRate > 0.3);
    return data;
  }, [ageFilter]);

  const handleReset = () => {
    setAgeFilter('');
    setAdmissionTypeFilter('');
    setAdmissionSourceFilter('');
  };

  const hasActiveFilter = ageFilter || admissionTypeFilter || admissionSourceFilter;

  return (
    <div>
      <PageHeader
        title="Healthcare Data Analytics"
        subtitle="Explore the underlying dataset distributions and patterns (demonstration data)."
      />

      <div className="analytics-demo-label">
        <Sparkles size={12} />
        Illustrative data — does not represent actual dataset statistics
      </div>

      <div className="analytics-filters">
        <Filter size={18} color="var(--text-secondary)" />
        <Select placeholder="Filter by age group" value={ageFilter} options={ageGroupOptions} onChange={setAgeFilter} />
        <Select placeholder="Filter by admission type" value={admissionTypeFilter} options={admissionTypeOptions} onChange={setAdmissionTypeFilter} />
        <Select placeholder="Filter by admission source" value={admissionSourceFilter} options={admissionSourceOptions} onChange={setAdmissionSourceFilter} />
        {hasActiveFilter && (
          <Button variant="ghost" size="sm" icon={<RotateCcw size={14} />} onClick={handleReset}>Reset Filters</Button>
        )}
      </div>

      <div style={{ marginBottom: 'var(--space-2)' }}>
        <Tabs
          active={activeTab}
          onChange={setActiveTab}
          tabs={[
            { label: 'Distributions', value: 'distribution' },
            { label: 'Missing Values', value: 'missing' },
            { label: 'Diagnosis Analysis', value: 'diagnosis' },
          ]}
        />
      </div>

      {activeTab === 'distribution' && (
        <div className="analytics-charts-grid">
          <ChartCard title="Readmission Distribution" subtitle="Yes/No breakdown (demo)">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={readmissionBinary} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={90} innerRadius={50} label={({ name, percent }) => `${name} ${((percent ?? 0) * 100).toFixed(0)}%`} labelLine={false}>
                  {readmissionBinary.map((_, i) => <Cell key={i} fill={PIE_COLORS[i]} />)}
                </Pie>
                <RTooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard title="Length-of-Stay Distribution" subtitle="Stay duration buckets (demo)">
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

          <ChartCard title="Age Group Distribution" subtitle="Patient demographics (demo)">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={ageGroupDistribution}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.15)" />
                <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#64748B' }} />
                <YAxis tick={{ fontSize: 11, fill: '#64748B' }} />
                <RTooltip />
                <Bar dataKey="value" fill="#4169E1" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard title="Admission Type Breakdown" subtitle="Encounter categories (demo)">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={admissionTypeBreakdown} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={90} label={({ name, percent }) => `${name} ${((percent ?? 0) * 100).toFixed(0)}%`} labelLine={false}>
                  {admissionTypeBreakdown.map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}
                </Pie>
                <RTooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard title="Admission Source Breakdown" subtitle="Patient origin (demo)">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={admissionSourceBreakdown} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.15)" />
                <XAxis type="number" tick={{ fontSize: 11, fill: '#64748B' }} />
                <YAxis type="category" dataKey="name" tick={{ fontSize: 11, fill: '#64748B' }} width={100} />
                <RTooltip />
                <Bar dataKey="value" fill="#F59E0B" radius={[0, 8, 8, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>
      )}

      {activeTab === 'missing' && (
        <Card>
          <h3 style={{ fontSize: 'var(--font-size-lg)', fontWeight: 600, marginBottom: '1rem' }}>Missing Value Summary</h3>
          <div style={{ overflowX: 'auto' }}>
            <table className="analytics-missing-table">
              <thead>
                <tr>
                  <th>Column</th>
                  <th>Missing Values</th>
                  <th>Total Records</th>
                  <th>Missing %</th>
                  <th>Visual</th>
                </tr>
              </thead>
              <tbody>
                {missingValueSummary.map((row) => {
                  const pct = ((row.missing / row.total) * 100).toFixed(1);
                  return (
                    <tr key={row.column}>
                      <td style={{ fontWeight: 500 }}>{row.column}</td>
                      <td>{row.missing.toLocaleString()}</td>
                      <td>{row.total.toLocaleString()}</td>
                      <td>{pct}%</td>
                      <td>
                        <div className="missing-bar">
                          <div className="missing-bar-fill" style={{ width: `${Math.min(Number(pct), 100)}%` }} />
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {activeTab === 'diagnosis' && (
        <div className="analytics-charts-grid">
          <ChartCard title="Diagnosis Count by Category" subtitle="Number of encounters (demo)" height={320}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={filteredDiagnosis} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.15)" />
                <XAxis type="number" tick={{ fontSize: 11, fill: '#64748B' }} />
                <YAxis type="category" dataKey="diagnosis" tick={{ fontSize: 11, fill: '#64748B' }} width={120} />
                <RTooltip />
                <Bar dataKey="count" fill="#4169E1" radius={[0, 8, 8, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard title="Readmission Rate by Diagnosis" subtitle="Proportion readmitted (demo)" height={320}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={filteredDiagnosis} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.15)" />
                <XAxis type="number" domain={[0, 0.6]} tickFormatter={(v) => `${(v * 100).toFixed(0)}%`} tick={{ fontSize: 11, fill: '#64748B' }} />
                <YAxis type="category" dataKey="diagnosis" tick={{ fontSize: 11, fill: '#64748B' }} width={120} />
                <RTooltip formatter={(v) => `${(Number(v) * 100).toFixed(1)}%`} />
                <Bar dataKey="readmissionRate" fill="#20B2AA" radius={[0, 8, 8, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>
      )}
    </div>
  );
}
