import { useState } from 'react';
import { ChevronDown, Palette, Monitor, LayoutGrid, Sliders, HelpCircle, BookOpen, HeartPulse, CalendarClock, BarChart3, Gauge, Database, Code } from 'lucide-react';
import { PageHeader } from '@/components/ui/PageHeader';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useToast } from '@/components/ui/Toast';
import '@/pages/Settings.css';

interface ToggleProps {
  on: boolean;
  onToggle: () => void;
}

function Toggle({ on, onToggle }: ToggleProps) {
  return (
    <div
      className={`settings-toggle ${on ? 'on' : ''}`}
      onClick={onToggle}
      role="switch"
      aria-checked={on}
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onToggle(); } }}
    >
      <div className="toggle-knob" />
    </div>
  );
}

interface AccordionItemProps {
  question: string;
  children: React.ReactNode;
}

function AccordionItem({ question, children }: AccordionItemProps) {
  const [open, setOpen] = useState(false);
  return (
    <div className="help-accordion-item">
      <button className="help-accordion-header" onClick={() => setOpen((v) => !v)} aria-expanded={open}>
        <span>{question}</span>
        <ChevronDown size={18} style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform var(--transition-fast)', color: 'var(--text-muted)' }} />
      </button>
      {open && <div className="help-accordion-content">{children}</div>}
    </div>
  );
}

export function SettingsPage() {
  const { showToast } = useToast();
  const [compactCards, setCompactCards] = useState(false);
  const [showTooltips, setShowTooltips] = useState(true);
  const [animations, setAnimations] = useState(true);
  const [autoRefresh, setAutoRefresh] = useState(false);
  const [chartStyle, setChartStyle] = useState('neumorphic');

  return (
    <div className="settings-page">
      <PageHeader
        title="Settings & Help"
        subtitle="Manage display preferences and learn how to use the system."
      />

      <div className="settings-sections">
        {/* Display Preferences */}
        <div className="settings-section">
          <div className="settings-section-title">
            <Monitor size={20} color="var(--primary)" />
            Display Preferences
          </div>

          <div className="settings-row">
            <div className="settings-row-label">
              <span className="row-title">Compact cards</span>
              <span className="row-desc">Reduce card padding for denser layouts</span>
            </div>
            <Toggle on={compactCards} onToggle={() => { setCompactCards((v) => !v); showToast('info', 'Preference saved (browser only).'); }} />
          </div>

          <div className="settings-row">
            <div className="settings-row-label">
              <span className="row-title">Show chart tooltips</span>
              <span className="row-desc">Display hover tooltips on charts and graphs</span>
            </div>
            <Toggle on={showTooltips} onToggle={() => { setShowTooltips((v) => !v); showToast('info', 'Preference saved (browser only).'); }} />
          </div>

          <div className="settings-row">
            <div className="settings-row-label">
              <span className="row-title">Enable animations</span>
              <span className="row-desc">Smooth transitions and micro-interactions</span>
            </div>
            <Toggle on={animations} onToggle={() => { setAnimations((v) => !v); showToast('info', 'Preference saved (browser only).'); }} />
          </div>

          <div className="settings-row">
            <div className="settings-row-label">
              <span className="row-title">Auto-refresh dashboard</span>
              <span className="row-desc">Update KPI cards every 30 seconds</span>
            </div>
            <Toggle on={autoRefresh} onToggle={() => { setAutoRefresh((v) => !v); showToast('info', 'Preference saved (browser only).'); }} />
          </div>
        </div>

        {/* Theme Selection */}
        <div className="settings-section">
          <div className="settings-section-title">
            <Palette size={20} color="var(--primary)" />
            Theme Selection
          </div>
          <div className="settings-row">
            <div className="settings-row-label">
              <span className="row-title">Chart style</span>
              <span className="row-desc">Visual style for data visualizations</span>
            </div>
            <div className="settings-radio-group">
              {['neumorphic', 'flat', 'classic'].map((style) => (
                <button
                  key={style}
                  className={`settings-radio ${chartStyle === style ? 'active' : ''}`}
                  onClick={() => { setChartStyle(style); showToast('info', `Chart style set to ${style} (browser only).`); }}
                >
                  {style.charAt(0).toUpperCase() + style.slice(1)}
                </button>
              ))}
            </div>
          </div>
          <div className="settings-row">
            <div className="settings-row-label">
              <span className="row-title">Color scheme</span>
              <span className="row-desc">The app currently uses a fixed light neumorphic theme</span>
            </div>
            <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-muted)' }}>Light (default)</span>
          </div>
        </div>

        {/* Dashboard Layout */}
        <div className="settings-section">
          <div className="settings-section-title">
            <LayoutGrid size={20} color="var(--primary)" />
            Dashboard Layout
          </div>
          <div className="settings-row">
            <div className="settings-row-label">
              <span className="row-title">KPI card columns</span>
              <span className="row-desc">Number of KPI cards per row on desktop</span>
            </div>
            <div className="settings-radio-group">
              {['2', '3', '4'].map((n) => (
                <button
                  key={n}
                  className={`settings-radio ${n === '4' ? 'active' : ''}`}
                  onClick={() => showToast('info', `Layout preference saved (browser only).`)}
                >
                  {n}
                </button>
              ))}
            </div>
          </div>
          <div className="settings-row">
            <div className="settings-row-label">
              <span className="row-title">Default chart height</span>
              <span className="row-desc">Height of charts in pixels</span>
            </div>
            <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-muted)' }}>280px (default)</span>
          </div>
        </div>

        {/* Help Section */}
        <div className="settings-section">
          <div className="settings-section-title">
            <HelpCircle size={20} color="var(--primary)" />
            Help & Documentation
          </div>

          <div className="help-cards">
            <div className="help-card">
              <div className="help-icon-circle"><HeartPulse size={18} /></div>
              <div>
                <div className="help-card-title">Readmission Prediction</div>
                <div className="help-card-text">Enter patient encounter data to estimate readmission risk.</div>
              </div>
            </div>
            <div className="help-card">
              <div className="help-icon-circle"><CalendarClock size={18} /></div>
              <div>
                <div className="help-card-title">Length-of-Stay</div>
                <div className="help-card-text">Estimate hospital stay duration from encounter data.</div>
              </div>
            </div>
            <div className="help-card">
              <div className="help-icon-circle"><BarChart3 size={18} /></div>
              <div>
                <div className="help-card-title">Data Analytics</div>
                <div className="help-card-text">Explore dataset distributions and patterns with filters.</div>
              </div>
            </div>
            <div className="help-card">
              <div className="help-icon-circle"><Gauge size={18} /></div>
              <div>
                <div className="help-card-title">Model Performance</div>
                <div className="help-card-text">Review classification and regression evaluation metrics.</div>
              </div>
            </div>
          </div>

          <AccordionItem question="How do the prediction forms work?">
            <p>The Readmission Prediction and Length-of-Stay Prediction pages accept patient encounter data through structured forms. Fill in the required fields (marked with an asterisk) and optional clinical fields, then click the analyze button. The system validates your input and displays a result panel with the prediction outcome, probability or estimated days, and an explanation.</p>
            <ul>
              <li>Readmission uses a binary target: both &lt;30 and &gt;30 day readmissions map to "Yes"; "NO" maps to "No".</li>
              <li>Length-of-Stay produces a numeric estimate in days with a likely range.</li>
              <li>All results shown are simulated for demonstration. They are not generated by the actual trained model.</li>
            </ul>
          </AccordionItem>

          <AccordionItem question="What does the Analytics dashboard show?">
            <p>The Healthcare Data Analytics page provides visual exploration of the underlying dataset. You can view distributions for readmission, length of stay, age groups, admission types, and admission sources. The Missing Values tab shows data completeness per column, and the Diagnosis Analysis tab breaks down encounters and readmission rates by diagnosis category.</p>
            <p>Use the filter dropdowns at the top to narrow the view. Click "Reset Filters" to clear all active filters.</p>
          </AccordionItem>

          <AccordionItem question="How should I interpret the Model Performance page?">
            <p>The Model Performance page displays evaluation metrics for the prediction models, split into classification (readmission) and regression (length of stay) tabs.</p>
            <ul>
              <li><strong>Classification:</strong> Accuracy, Precision, Recall, F1-Score, ROC-AUC, and PR-AUC. A confusion matrix and feature importance chart are also shown.</li>
              <li><strong>Regression:</strong> MAE (Mean Absolute Error), RMSE (Root Mean Square Error), and R² (coefficient of determination). Lower MAE/RMSE and higher R² indicate better performance.</li>
            </ul>
            <p>All metrics shown are demonstration values and will be replaced with real evaluation results when the backend is connected.</p>
          </AccordionItem>

          <AccordionItem question="Can I search and filter prediction history?">
            <p>Yes. The Prediction History page supports full-text search across prediction IDs, types, outcomes, and model versions. You can filter by prediction type and outcome, sort by any column, and paginate through results. Click the eye icon on any row to view full details in a modal.</p>
          </AccordionItem>

          <AccordionItem question="How do I connect the real ML model backend?">
            <p>The frontend is structured to accept a backend API without redesign. The prediction service in <code>src/services/api.ts</code> checks for an API base URL. When <code>VITE_API_BASE_URL</code> is set in your environment, prediction requests are sent to the configured endpoints instead of returning mock data.</p>
            <ul>
              <li>Readmission endpoint: <code>POST /api/predict/readmission</code></li>
              <li>Length-of-Stay endpoint: <code>POST /api/predict/length-of-stay</code></li>
              <li>Chart and table data in <code>src/data/mockData.ts</code> can be replaced with API-fetched datasets.</li>
            </ul>
          </AccordionItem>

          <AccordionItem question="Are the predictions real medical advice?">
            <p>No. This is an academic MCA capstone project for demonstration purposes. All predictions, metrics, and data shown are simulated. The system is not intended for clinical decision-making and should not be treated as medical advice.</p>
          </AccordionItem>
        </div>

        {/* About Section */}
        <div className="settings-section">
          <div className="settings-section-title">
            <BookOpen size={20} color="var(--primary)" />
            About This Project
          </div>
          <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            <strong>Smart Healthcare Analytics System Using Big Data</strong> is an MCA capstone project that demonstrates
            a healthcare analytics frontend with predictive insights. The application features a neumorphic design system,
            interactive data visualizations, and structured forms for readmission and length-of-stay prediction.
            It is built with React, TypeScript, and Recharts, and is ready for future backend integration.
          </p>
          <div style={{ display: 'flex', gap: '0.75rem', marginTop: 'var(--space-2)', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', fontSize: 'var(--font-size-xs)', color: 'var(--text-secondary)' }}>
              <Code size={14} /> React + TypeScript
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', fontSize: 'var(--font-size-xs)', color: 'var(--text-secondary)' }}>
              <Database size={14} /> Frontend only (mock data)
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', fontSize: 'var(--font-size-xs)', color: 'var(--text-secondary)' }}>
              <Sliders size={14} /> Neumorphism UI
            </div>
          </div>
        </div>
      </div>

      <div style={{ textAlign: 'center', marginTop: 'var(--space-3)' }}>
        <Button variant="ghost" size="sm" onClick={() => showToast('success', 'All preferences saved (browser only).')}>
          Save Preferences
        </Button>
      </div>
    </div>
  );
}
