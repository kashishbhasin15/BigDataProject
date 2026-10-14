import { useState } from 'react';
import { HeartPulse, User, Hospital, FlaskConical, RotateCcw, Eye, Sparkles, CheckCircle2, AlertTriangle } from 'lucide-react';
import { PageHeader } from '@/components/ui/PageHeader';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Select } from '@/components/ui/Select';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { FormSection } from '@/components/ui/FormSection';
import { Spinner } from '@/components/ui/Spinner';
import { useToast } from '@/components/ui/Toast';
import { Modal } from '@/components/ui/Modal';
import '@/pages/Prediction.css';
import type { ReadmissionInput, ReadmissionResult } from '@/types';
import { fetchReadmissionPrediction } from '@/services/api';
import {
  ageGroupOptions, genderOptions, raceOptions,
  admissionTypeOptions, admissionSourceOptions,
  diagnosisOptions, insulinOptions, medicationChangeOptions,
} from '@/data/formOptions';

const initialForm: ReadmissionInput = {
  ageGroup: '',
  gender: '',
  race: '',
  admissionType: '',
  admissionSource: '',
  numOutpatientVisits: 0,
  numEmergencyVisits: 0,
  numInpatientVisits: 0,
  numDiagnoses: 0,
  numProcedures: 0,
  numMedications: 0,
  primaryDiagnosis: '',
  insulinUsed: '',
  changeInMedication: '',
};

export function ReadmissionPage() {
  const { showToast } = useToast();
  const [form, setForm] = useState<ReadmissionInput>(initialForm);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ReadmissionResult | null>(null);
  const [showDetails, setShowDetails] = useState(false);

  const update = (key: keyof ReadmissionInput, value: string | number) => {
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
      const res = await fetchReadmissionPrediction(form);
      setResult(res);
      showToast('success', 'Readmission risk analysis complete (demonstration).');
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
        title="Readmission Prediction"
        subtitle="Enter patient encounter data to estimate readmission likelihood."
      />

      <div className="target-explanation">
        <strong>Prediction target:</strong> The model predicts whether a patient will be readmitted.
        Both original <code>&lt;30</code> and <code>&gt;30</code> day readmission categories map to <strong>Yes</strong>,
        while <code>NO</code> maps to <strong>No</strong>. This is a binary classification, not a specific 30-day prediction.
      </div>

      {!result && !loading && (
        <div className="prediction-form-container">
          <FormSection title="Patient Information" icon={User}>
            <Select label="Age Group" required placeholder="Select age group" value={form.ageGroup} options={ageGroupOptions} onChange={(v) => update('ageGroup', v)} error={errors.ageGroup} id="ageGroup" />
            <Select label="Gender" required placeholder="Select gender" value={form.gender} options={genderOptions} onChange={(v) => update('gender', v)} error={errors.gender} id="gender" />
            <Select label="Race" placeholder="Select race" value={form.race ?? ''} options={raceOptions} onChange={(v) => update('race', v)} />
          </FormSection>

          <FormSection title="Admission Information" icon={Hospital}>
            <Select label="Admission Type" required placeholder="Select type" value={form.admissionType} options={admissionTypeOptions} onChange={(v) => update('admissionType', v)} error={errors.admissionType} id="admissionType" />
            <Select label="Admission Source" required placeholder="Select source" value={form.admissionSource} options={admissionSourceOptions} onChange={(v) => update('admissionSource', v)} error={errors.admissionSource} id="admissionSource" />
            <Input label="Previous Outpatient Visits" type="number" value={numValue(form.numOutpatientVisits)} onChange={(v) => update('numOutpatientVisits', Number(v))} min={0} helperText="Visits in prior year" />
            <Input label="Previous Emergency Visits" type="number" value={numValue(form.numEmergencyVisits)} onChange={(v) => update('numEmergencyVisits', Number(v))} min={0} helperText="Visits in prior year" />
            <Input label="Previous Inpatient Visits" type="number" value={numValue(form.numInpatientVisits)} onChange={(v) => update('numInpatientVisits', Number(v))} min={0} helperText="Visits in prior year" />
          </FormSection>

          <FormSection title="Additional Clinical Fields" icon={FlaskConical}>
            <Input label="Number of Diagnoses" type="number" value={numValue(form.numDiagnoses ?? 0)} onChange={(v) => update('numDiagnoses', Number(v))} min={0} />
            <Input label="Number of Procedures" type="number" value={numValue(form.numProcedures ?? 0)} onChange={(v) => update('numProcedures', Number(v))} min={0} />
            <Input label="Number of Medications" type="number" value={numValue(form.numMedications ?? 0)} onChange={(v) => update('numMedications', Number(v))} min={0} />
            <Select label="Primary Diagnosis" placeholder="Select diagnosis" value={form.primaryDiagnosis ?? ''} options={diagnosisOptions} onChange={(v) => update('primaryDiagnosis', v)} />
            <Select label="Insulin Usage" placeholder="Select" value={form.insulinUsed ?? ''} options={insulinOptions} onChange={(v) => update('insulinUsed', v)} />
            <Select label="Change in Medication" placeholder="Select" value={form.changeInMedication ?? ''} options={medicationChangeOptions} onChange={(v) => update('changeInMedication', v)} />
          </FormSection>

          <div className="prediction-actions">
            <Button variant="ghost" icon={<RotateCcw size={16} />} onClick={handleReset}>Reset</Button>
            <Button variant="primary" icon={<HeartPulse size={16} />} onClick={handleSubmit}>Analyze Readmission Risk</Button>
          </div>
        </div>
      )}

      {loading && (
        <Card>
          <div className="prediction-loading">
            <Spinner label="Analyzing encounter data…" />
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
            <div className={`prediction-result-icon ${result.readmission === 'Yes' ? 'yes' : 'no'}`}>
              {result.readmission === 'Yes' ? <AlertTriangle size={28} /> : <CheckCircle2 size={28} />}
            </div>
            <div>
              <div className="prediction-result-title">
                Predicted Readmission: <span style={{ color: result.readmission === 'Yes' ? 'var(--error)' : 'var(--success)' }}>{result.readmission}</span>
              </div>
              <div className="prediction-result-subtitle">Binary classification result (demonstration)</div>
            </div>
          </div>

          <div className="prediction-metrics">
            <div className="prediction-metric">
              <div className="metric-label">Positive-Class Probability</div>
              <div className="metric-value">{(result.probability * 100).toFixed(1)}%</div>
            </div>
            <div className="prediction-metric">
              <div className="metric-label">Decision Threshold</div>
              <div className="metric-value">{(result.threshold * 100).toFixed(0)}%</div>
            </div>
            <div className="prediction-metric">
              <div className="metric-label">Prediction</div>
              <div className="metric-value" style={{ fontSize: 'var(--font-size-lg)' }}>
                <Badge variant={result.readmission === 'Yes' ? 'error' : 'success'} dot>{result.readmission}</Badge>
              </div>
            </div>
          </div>

          <div className="prediction-explanation">{result.explanation}</div>

          <div className="prediction-actions">
            <Button variant="ghost" icon={<RotateCcw size={16} />} onClick={handleReset}>New Prediction</Button>
            <Button variant="primary" icon={<Eye size={16} />} onClick={() => setShowDetails(true)}>View Details</Button>
          </div>

          <Modal
            open={showDetails}
            onClose={() => setShowDetails(false)}
            title="Prediction Details"
            footer={<Button variant="primary" onClick={() => setShowDetails(false)}>Close</Button>}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <p><strong>Prediction type:</strong> Readmission (Binary Classification)</p>
              <p><strong>Target definition:</strong> Both &lt;30 and &gt;30 day readmissions map to "Yes"; "NO" maps to "No".</p>
              <p><strong>Positive-class probability:</strong> {(result.probability * 100).toFixed(1)}%</p>
              <p><strong>Decision threshold:</strong> {(result.threshold * 100).toFixed(0)}%</p>
              <p><strong>Model version:</strong> v2.1.0 (demonstration)</p>
              <div style={{ padding: '0.75rem', background: 'var(--warning-light)', borderRadius: 'var(--radius-sm)', fontSize: 'var(--font-size-xs)', color: 'var(--warning)' }}>
                This is a simulated prediction for frontend demonstration. It does not use the actual trained model.
              </div>
            </div>
          </Modal>
        </Card>
      )}
    </div>
  );
}
