import { useState } from 'react';
import { Sparkles, Target, TrendingUp, Gauge } from 'lucide-react';
import { PageHeader } from '@/components/ui/PageHeader';
import { Card } from '@/components/ui/Card';
import { Tabs } from '@/components/ui/Tabs';
import { ChartCard } from '@/components/charts/ChartCard';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RTooltip, Legend,
  ResponsiveContainer, RadialBarChart, RadialBar,
} from 'recharts';
import '@/pages/ModelPerformance.css';
import {
  modelComparison, confusionMatrix, featureImportance,
} from '@/data/mockData';

export function ModelPerformancePage() {
  const [activeTab, setActiveTab] = useState('classification');

  const classificationModels = modelComparison.filter((m) => m.task === 'classification');
  const regressionModels = modelComparison.filter((m) => m.task === 'regression');
  const bestClassification = classificationModels.reduce((best, m) => (m.accuracy > best.accuracy ? m : best));
  const bestRegression = regressionModels.reduce((best, m) => ((m.r2 ?? 0) > (best.r2 ?? 0) ? m : best));

  const featureChartData = featureImportance.map((f) => ({
    feature: f.feature.length > 25 ? f.feature.slice(0, 25) + '…' : f.feature,
    importance: f.importance,
  }));

  const confusionData = [
    { name: 'TP', value: confusionMatrix.truePositive, fill: '#16A34A' },
    { name: 'TN', value: confusionMatrix.trueNegative, fill: '#4169E1' },
    { name: 'FP', value: confusionMatrix.falsePositive, fill: '#F59E0B' },
    { name: 'FN', value: confusionMatrix.falseNegative, fill: '#DC2626' },
  ];

  const accuracyGauge = [
    { name: 'Accuracy', value: bestClassification.accuracy * 100, fill: '#4169E1' },
  ];

  return (
    <div>
      <PageHeader
        title="Model Performance"
        subtitle="Evaluation metrics for the trained prediction models (demonstration metrics)."
      />

      <div className="model-demo-label">
        <Sparkles size={12} />
        Demonstration metrics — not actual evaluation results from the trained model
      </div>

      <div style={{ marginBottom: 'var(--space-2)' }}>
        <Tabs
          active={activeTab}
          onChange={setActiveTab}
          tabs={[
            { label: 'Classification (Readmission)', value: 'classification' },
            { label: 'Regression (Length of Stay)', value: 'regression' },
          ]}
        />
      </div>

      {activeTab === 'classification' && (
        <>
          <div className="model-metric-grid">
            <div className="model-metric-card">
              <div className="metric-label">Accuracy</div>
              <div className="metric-value">{(bestClassification.accuracy * 100).toFixed(1)}%</div>
            </div>
            <div className="model-metric-card">
              <div className="metric-label">Precision</div>
              <div className="metric-value">{(bestClassification.precision * 100).toFixed(1)}%</div>
            </div>
            <div className="model-metric-card teal">
              <div className="metric-label">Recall</div>
              <div className="metric-value">{(bestClassification.recall * 100).toFixed(1)}%</div>
            </div>
            <div className="model-metric-card">
              <div className="metric-label">F1-Score</div>
              <div className="metric-value">{(bestClassification.f1Score * 100).toFixed(1)}%</div>
            </div>
            <div className="model-metric-card teal">
              <div className="metric-label">ROC-AUC</div>
              <div className="metric-value">{(bestClassification.rocAuc ?? 0).toFixed(3)}</div>
            </div>
            <div className="model-metric-card">
              <div className="metric-label">PR-AUC</div>
              <div className="metric-value">{(bestClassification.prAuc ?? 0).toFixed(3)}</div>
            </div>
          </div>

          <div className="model-charts-grid">
            <ChartCard title="Confusion Matrix" subtitle={`Best model: ${bestClassification.model} (demo)`} height={300}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', height: '100%', justifyContent: 'center' }}>
                <div className="confusion-matrix-grid">
                  <div className="confusion-matrix-cell tp">
                    <div className="cm-label">True Positive</div>
                    <div className="cm-value">{confusionMatrix.truePositive}</div>
                  </div>
                  <div className="confusion-matrix-cell tn">
                    <div className="cm-label">True Negative</div>
                    <div className="cm-value">{confusionMatrix.trueNegative}</div>
                  </div>
                  <div className="confusion-matrix-cell fp">
                    <div className="cm-label">False Positive</div>
                    <div className="cm-value">{confusionMatrix.falsePositive}</div>
                  </div>
                  <div className="confusion-matrix-cell fn">
                    <div className="cm-label">False Negative</div>
                    <div className="cm-value">{confusionMatrix.falseNegative}</div>
                  </div>
                </div>
                <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-secondary)' }}>
                  Total samples: {confusionMatrix.truePositive + confusionMatrix.trueNegative + confusionMatrix.falsePositive + confusionMatrix.falseNegative}
                </div>
              </div>
            </ChartCard>

            <ChartCard title="Accuracy Gauge" subtitle="Best classification model (demo)" height={300}>
              <ResponsiveContainer width="100%" height="100%">
                <RadialBarChart data={accuracyGauge} startAngle={90} endAngle={-270} innerRadius="65%" outerRadius="100%">
                  <RadialBar dataKey="value" cornerRadius={20} background={{ fill: 'rgba(148,163,184,0.1)' }} />
                </RadialBarChart>
              </ResponsiveContainer>
              <div style={{ textAlign: 'center', marginTop: '-100px', position: 'relative', zIndex: 1 }}>
                <div style={{ fontSize: 'var(--font-size-3xl)', fontWeight: 700, color: 'var(--primary)' }}>
                  {(bestClassification.accuracy * 100).toFixed(1)}%
                </div>
                <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-secondary)' }}>Accuracy</div>
              </div>
            </ChartCard>

            <ChartCard title="Feature Importance" subtitle="Top features driving predictions (demo)" height={320}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={featureChartData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.15)" />
                  <XAxis type="number" tick={{ fontSize: 11, fill: '#64748B' }} tickFormatter={(v) => `${(v * 100).toFixed(0)}%`} />
                  <YAxis type="category" dataKey="feature" tick={{ fontSize: 10, fill: '#64748B' }} width={140} />
                  <RTooltip formatter={(v) => `${(Number(v) * 100).toFixed(1)}%`} />
                  <Bar dataKey="importance" fill="#4169E1" radius={[0, 8, 8, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>
          </div>

          <Card>
            <h3 style={{ fontSize: 'var(--font-size-lg)', fontWeight: 600, marginBottom: '1rem' }}>Model Comparison Table</h3>
            <div style={{ overflowX: 'auto' }}>
              <table className="model-comparison-table">
                <thead>
                  <tr>
                    <th>Model</th>
                    <th>Accuracy</th>
                    <th>Precision</th>
                    <th>Recall</th>
                    <th>F1-Score</th>
                    <th>ROC-AUC</th>
                    <th>PR-AUC</th>
                  </tr>
                </thead>
                <tbody>
                  {classificationModels.map((m) => (
                    <tr key={m.model}>
                      <td>
                        {m.model}
                        {m.model === bestClassification.model && <span className="model-best-tag">Best</span>}
                      </td>
                      <td>{(m.accuracy * 100).toFixed(1)}%</td>
                      <td>{(m.precision * 100).toFixed(1)}%</td>
                      <td>{(m.recall * 100).toFixed(1)}%</td>
                      <td>{(m.f1Score * 100).toFixed(1)}%</td>
                      <td>{(m.rocAuc ?? 0).toFixed(3)}</td>
                      <td>{(m.prAuc ?? 0).toFixed(3)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          <Card style={{ marginTop: 'var(--space-2)' }}>
            <h3 style={{ fontSize: 'var(--font-size-lg)', fontWeight: 600, marginBottom: '0.75rem' }}>Evaluation Summary</h3>
            <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              The best-performing classification model is <strong>{bestClassification.model}</strong> with an accuracy of
              {(bestClassification.accuracy * 100).toFixed(1)}%, F1-score of {(bestClassification.f1Score * 100).toFixed(1)}%, and ROC-AUC of
              {(bestClassification.rocAuc ?? 0).toFixed(3)}. The most important features for predicting readmission are
              number of inpatient visits, discharge disposition, and number of diagnoses. These are demonstration metrics
              and will be replaced with actual evaluation results when the backend is connected.
            </p>
          </Card>
        </>
      )}

      {activeTab === 'regression' && (
        <>
          <div className="model-metric-grid">
            <div className="model-metric-card teal">
              <div className="metric-label">MAE</div>
              <div className="metric-value">{(bestRegression.mae ?? 0).toFixed(2)}</div>
            </div>
            <div className="model-metric-card">
              <div className="metric-label">RMSE</div>
              <div className="metric-value">{(bestRegression.rmse ?? 0).toFixed(2)}</div>
            </div>
            <div className="model-metric-card teal">
              <div className="metric-label">R²</div>
              <div className="metric-value">{(bestRegression.r2 ?? 0).toFixed(3)}</div>
            </div>
          </div>

          <Card>
            <h3 style={{ fontSize: 'var(--font-size-lg)', fontWeight: 600, marginBottom: '1rem' }}>Regression Model Comparison</h3>
            <div style={{ overflowX: 'auto' }}>
              <table className="model-comparison-table">
                <thead>
                  <tr>
                    <th>Model</th>
                    <th>MAE</th>
                    <th>RMSE</th>
                    <th>R²</th>
                  </tr>
                </thead>
                <tbody>
                  {regressionModels.map((m) => (
                    <tr key={m.model}>
                      <td>
                        {m.model}
                        {(m.r2 ?? 0) === (bestRegression.r2 ?? 0) && <span className="model-best-tag">Best</span>}
                      </td>
                      <td>{(m.mae ?? 0).toFixed(2)}</td>
                      <td>{(m.rmse ?? 0).toFixed(2)}</td>
                      <td>{(m.r2 ?? 0).toFixed(3)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          <Card style={{ marginTop: 'var(--space-2)' }}>
            <h3 style={{ fontSize: 'var(--font-size-lg)', fontWeight: 600, marginBottom: '0.75rem' }}>Regression Evaluation Summary</h3>
            <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              The best-performing regression model is <strong>{bestRegression.model}</strong> with an MAE of
              {(bestRegression.mae ?? 0).toFixed(2)} days, RMSE of {(bestRegression.rmse ?? 0).toFixed(2)} days, and R² of
              {(bestRegression.r2 ?? 0).toFixed(3)}. Lower MAE/RMSE values indicate better prediction accuracy. These are
              demonstration metrics for frontend illustration.
            </p>
          </Card>
        </>
      )}
    </div>
  );
}
