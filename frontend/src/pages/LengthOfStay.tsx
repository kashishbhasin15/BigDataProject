import { useState } from 'react';
import { CalendarClock, User, Hospital, RotateCcw, Sparkles, CheckCircle2 } from 'lucide-react';
import { PageHeader } from '@/components/ui/PageHeader';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Select } from '@/components/ui/Select';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { FormSection } from '@/components/ui/FormSection';
import { Spinner } from '@/components/ui/Spinner';
import { useToast } from '@/components/ui/Toast';
import '@/pages/Prediction.css';
import type { LengthOfStayInput, LengthOfStayResult } from '@/types';
import { fetchLengthOfStayPrediction } from '@/services/api';
import { ageGroupOptions, genderOptions, admissionTypeOptions, admissionSourceOptions } from '@/data/formOptions';

const initialForm: LengthOfStayInput = {
  ageGroup: '',
  gender: '',
  admissionType: '',
  admissionSource: '',
  numOutpatientVisits: 0,
  numEmergencyVisits: 0,
  numInpatientVisits: 0,
  numDiagnoses: 0,
  numProcedures: 0,
};

export function LengthOfStayPage() {
  const { showToast } = useToast();
  const [form, setForm] = useState<LengthOfStayInput>(initialForm);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<LengthOfStayResult | null>(null);

  const update = (key: keyof LengthOfStayInput, value: string | number) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: '' }));
  };

  const validate = (): boolean => {
    const e: Record<string, string> = {};
    if (!form.ageGroup) e.ageGroup = 'Age group is required';
    if (!form.gender) e.gender = 'Gender is required';
    if (!form.admissionType) e.admissionType = 'Admission type is required';
    if (!form.admissionSource) e.admissionSource = 'Admission source is required';
    if (form.numOutpatientVisits < 0) e.numOutpatientVisits = 'Cannot be negative';
    if (form.numEmergencyVisits < 0) e.numEmergencyVisits = 'Cannot be negative';
    if (form.numInpatientVisits < 0) e.numInpatientVisits = 'Cannot be negative';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) {
      showToast('warning', 'Please fix the highlighted fields before submitting.');
      return;
    }
    setLoading(true);
    setResult(null);
    try {
      const res = await fetchLengthOfStayPrediction(form);
      setResult(res);
      showToast('success', 'Length-of-stay estimation complete (demonstration).');
    } catch {
      showToast('error', 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setForm(initialForm);
    setResult(null);
    setErrors({});
  };

  const numValue = (v: number) => String(v);

  return (
    <div className="prediction-page">
      <PageHeader
        title="Length-of-Stay Prediction"
        subtitle="Estimate a patient's hospital length of stay based on encounter data."
      />

      {!result && !loading && (
        <div className="prediction-form-container">
          <FormSection title="Patient Information" icon={User}>
            <Select label="Age Group" required placeholder="Select age group" value={form.ageGroup} options={ageGroupOptions} onChange={(v) => update('ageGroup', v)} error={errors.ageGroup} id="los-ageGroup" />
            <Select label="Gender" required placeholder="Select gender" value={form.gender} options={genderOptions} onChange={(v) => update('gender', v)} error={errors.gender} id="los-gender" />
          </FormSection>

          <FormSection title="Admission Information" icon={Hospital}>
            <Select label="Admission Type" required placeholder="Select type" value={form.admissionType} options={admissionTypeOptions} onChange={(v) => update('admissionType', v)} error={errors.admissionType} id="los-admissionType" />
            <Select label="Admission Source" required placeholder="Select source" value={form.admissionSource} options={admissionSourceOptions} onChange={(v) => update('admissionSource', v)} error={errors.admissionSource} id="los-admissionSource" />
            <Input label="Previous Outpatient Visits" type="number" value={numValue(form.numOutpatientVisits)} onChange={(v) => update('numOutpatientVisits', Number(v))} min={0} helperText="Visits in prior year" />
            <Input label="Previous Emergency Visits" type="number" value={numValue(form.numEmergencyVisits)} onChange={(v) => update('numEmergencyVisits', Number(v))} min={0} helperText="Visits in prior year" />
            <Input label="Previous Inpatient Visits" type="number" value={numValue(form.numInpatientVisits)} onChange={(v) => update('numInpatientVisits', Number(v))} min={0} helperText="Visits in prior year" />
          </FormSection>

          <FormSection title="Additional Clinical Fields" icon={CalendarClock}>
            <Input label="Number of Diagnoses" type="number" value={numValue(form.numDiagnoses ?? 0)} onChange={(v) => update('numDiagnoses', Number(v))} min={0} />
            <Input label="Number of Procedures" type="number" value={numValue(form.numProcedures ?? 0)} onChange={(v) => update('numProcedures', Number(v))} min={0} />
          </FormSection>

          <div className="prediction-actions">
            <Button variant="ghost" icon={<RotateCcw size={16} />} onClick={handleReset}>Reset</Button>
            <Button variant="teal" icon={<CalendarClock size={16} />} onClick={handleSubmit}>Estimate Length of Stay</Button>
          </div>
        </div>
      )}

      {loading && (
        <Card>
          <div className="prediction-loading">
            <Spinner label="Estimating length of stay…" />
            <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-secondary)' }}>Running simulated prediction…</p>
          </div>
        </Card>
      )}

      {result && !loading && (
        <Card className="prediction-result">
          <div className="prediction-demo-label">
            <Sparkles size={12} />
            Simulated result — not generated by the trained model
          </div>

          <div className="prediction-result-header">
            <div className="prediction-result-icon no">
              <CheckCircle2 size={28} />
            </div>
            <div>
              <div className="prediction-result-title">
                Predicted Length of Stay: <span style={{ color: 'var(--teal)' }}>{result.predictedDays} days</span>
              </div>
              <div className="prediction-result-subtitle">Regression estimate (demonstration)</div>
            </div>
          </div>

          <div className="prediction-metrics">
            <div className="prediction-metric">
              <div className="metric-label">Predicted Days</div>
              <div className="metric-value">{result.predictedDays}</div>
            </div>
            <div className="prediction-metric">
              <div className="metric-label">Range (Low)</div>
              <div className="metric-value">{result.rangeLow}</div>
            </div>
            <div className="prediction-metric">
              <div className="metric-label">Range (High)</div>
              <div className="metric-value">{result.rangeHigh}</div>
            </div>
          </div>

          <div className="prediction-explanation">{result.explanation}</div>

          <div className="prediction-actions">
            <Button variant="ghost" icon={<RotateCcw size={16} />} onClick={handleReset}>New Prediction</Button>
          </div>
        </Card>
      )}
    </div>
  );
}
