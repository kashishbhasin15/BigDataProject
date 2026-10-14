import type {
  KpiCardData,
  PredictionRecord,
  ModelMetrics,
  ConfusionMatrixData,
  FeatureImportance,
  ChartSeriesData,
  TimeSeriesData,
} from '@/types';

export const kpiData: KpiCardData[] = [
  {
    id: 'total-predictions',
    title: 'Total Predictions',
    value: '1,842',
    subtitle: 'All-time predictions',
    trend: { direction: 'up', value: '+12.3% this month' },
    icon: 'Activity',
    accent: 'primary',
  },
  {
    id: 'readmission-predictions',
    title: 'Readmission Predictions',
    value: '1,067',
    subtitle: 'Binary classification',
    trend: { direction: 'up', value: '+8.1% this month' },
    icon: 'HeartPulse',
    accent: 'teal',
  },
  {
    id: 'avg-los',
    title: 'Avg. Predicted Length of Stay',
    value: '4.2 days',
    subtitle: 'Regression estimate',
    trend: { direction: 'down', value: '-0.3 days vs last month' },
    icon: 'CalendarClock',
    accent: 'warning',
  },
  {
    id: 'model-performance',
    title: 'Model Performance',
    value: '87.3%',
    subtitle: 'Overall accuracy',
    trend: { direction: 'up', value: '+2.1% after retraining' },
    icon: 'Gauge',
    accent: 'success',
  },
];

export const readmissionDistribution: ChartSeriesData[] = [
  { name: 'No Readmission', value: 5560 },
  { name: 'Readmission (<30 days)', value: 1490 },
  { name: 'Readmission (>30 days)', value: 1950 },
];

export const readmissionBinary: ChartSeriesData[] = [
  { name: 'No', value: 5560 },
  { name: 'Yes', value: 3440 },
];

export const losDistribution: ChartSeriesData[] = [
  { name: '1-3 days', value: 4200 },
  { name: '4-7 days', value: 3100 },
  { name: '8-14 days', value: 1500 },
  { name: '15+ days', value: 650 },
];

export const ageGroupDistribution: ChartSeriesData[] = [
  { name: '0-30', value: 480 },
  { name: '31-50', value: 1850 },
  { name: '51-70', value: 5320 },
  { name: '71-90', value: 3260 },
];

export const admissionTypeBreakdown: ChartSeriesData[] = [
  { name: 'Emergency', value: 4100 },
  { name: 'Urgent', value: 2100 },
  { name: 'Elective', value: 2800 },
  { name: 'Newborn', value: 320 },
  { name: 'Trauma', value: 180 },
];

export const admissionSourceBreakdown: ChartSeriesData[] = [
  { name: 'Emergency Room', value: 3800 },
  { name: 'Physician Referral', value: 3100 },
  { name: 'Transfer from Hospital', value: 920 },
  { name: 'Transfer from SNF', value: 480 },
  { name: 'Clinic Referral', value: 360 },
];

export const timeSeriesData: TimeSeriesData[] = [
  { date: 'Jan', readmission: 142, lengthOfStay: 198 },
  { date: 'Feb', readmission: 158, lengthOfStay: 210 },
  { date: 'Mar', readmission: 171, lengthOfStay: 224 },
  { date: 'Apr', readmission: 165, lengthOfStay: 219 },
  { date: 'May', readmission: 189, lengthOfStay: 248 },
  { date: 'Jun', readmission: 203, lengthOfStay: 261 },
  { date: 'Jul', readmission: 211, lengthOfStay: 274 },
  { date: 'Aug', readmission: 198, lengthOfStay: 258 },
  { date: 'Sep', readmission: 224, lengthOfStay: 289 },
  { date: 'Oct', readmission: 236, lengthOfStay: 302 },
];

export const recentPredictions: PredictionRecord[] = [
  {
    id: 'PRD-2024-1842',
    type: 'Readmission',
    outcome: 'Yes',
    value: '0.72',
    modelVersion: 'v2.1.0',
    timestamp: '2024-10-13 14:32:18',
  },
  {
    id: 'PRD-2024-1841',
    type: 'Length of Stay',
    outcome: '4 days',
    value: '4.2',
    modelVersion: 'v1.8.3',
    timestamp: '2024-10-13 11:08:44',
  },
  {
    id: 'PRD-2024-1840',
    type: 'Readmission',
    outcome: 'No',
    value: '0.31',
    modelVersion: 'v2.1.0',
    timestamp: '2024-10-13 09:15:02',
  },
  {
    id: 'PRD-2024-1839',
    type: 'Readmission',
    outcome: 'Yes',
    value: '0.68',
    modelVersion: 'v2.1.0',
    timestamp: '2024-10-12 16:44:51',
  },
  {
    id: 'PRD-2024-1838',
    type: 'Length of Stay',
    outcome: '9 days',
    value: '8.7',
    modelVersion: 'v1.8.3',
    timestamp: '2024-10-12 14:22:10',
  },
  {
    id: 'PRD-2024-1837',
    type: 'Readmission',
    outcome: 'No',
    value: '0.22',
    modelVersion: 'v2.1.0',
    timestamp: '2024-10-12 10:48:33',
  },
];

export const modelComparison: ModelMetrics[] = [
  {
    model: 'Random Forest',
    task: 'classification',
    accuracy: 0.873,
    precision: 0.851,
    recall: 0.882,
    f1Score: 0.866,
    rocAuc: 0.912,
    prAuc: 0.874,
  },
  {
    model: 'Gradient Boosting (XGBoost)',
    task: 'classification',
    accuracy: 0.881,
    precision: 0.867,
    recall: 0.879,
    f1Score: 0.873,
    rocAuc: 0.921,
    prAuc: 0.889,
  },
  {
    model: 'Logistic Regression',
    task: 'classification',
    accuracy: 0.792,
    precision: 0.771,
    recall: 0.803,
    f1Score: 0.787,
    rocAuc: 0.842,
    prAuc: 0.801,
  },
  {
    model: 'Random Forest (LOS Regression)',
    task: 'regression',
    accuracy: 0,
    precision: 0,
    recall: 0,
    f1Score: 0,
    mae: 1.42,
    rmse: 2.08,
    r2: 0.681,
  },
  {
    model: 'Gradient Boosting (LOS Regression)',
    task: 'regression',
    accuracy: 0,
    precision: 0,
    recall: 0,
    f1Score: 0,
    mae: 1.28,
    rmse: 1.89,
    r2: 0.724,
  },
];

export const confusionMatrix: ConfusionMatrixData = {
  truePositive: 742,
  falsePositive: 98,
  trueNegative: 856,
  falseNegative: 104,
};

export const featureImportance: FeatureImportance[] = [
  { feature: 'Number Inpatient Visits', importance: 0.182 },
  { feature: 'Discharge Disposition', importance: 0.151 },
  { feature: 'Number Diagnoses', importance: 0.134 },
  { feature: 'Time in Hospital', importance: 0.118 },
  { feature: 'Number Emergency Visits', importance: 0.097 },
  { feature: 'Number Medications', importance: 0.082 },
  { feature: 'Age Group', importance: 0.071 },
  { feature: 'Admission Type', importance: 0.063 },
  { feature: 'Primary Diagnosis', importance: 0.054 },
  { feature: 'HbA1c Test Result', importance: 0.048 },
];

export const missingValueSummary: { column: string; missing: number; total: number }[] = [
  { column: 'Medical Specialty', missing: 2482, total: 9000 },
  { column: 'Primary Diagnosis', missing: 458, total: 9000 },
  { column: 'Max Glu Serum', missing: 1820, total: 9000 },
  { column: 'A1C Result', missing: 3520, total: 9000 },
  { column: 'Payer Code', missing: 3120, total: 9000 },
  { column: 'Race', missing: 195, total: 9000 },
  { column: 'Weight', missing: 7820, total: 9000 },
];

export const diagnosisAnalysis: { diagnosis: string; count: number; readmissionRate: number }[] = [
  { diagnosis: 'Circulatory', count: 2840, readmissionRate: 0.41 },
  { diagnosis: 'Diabetes', count: 2120, readmissionRate: 0.47 },
  { diagnosis: 'Respiratory', count: 1860, readmissionRate: 0.38 },
  { diagnosis: 'Digestive', count: 1430, readmissionRate: 0.35 },
  { diagnosis: 'Injury', count: 1180, readmissionRate: 0.33 },
  { diagnosis: 'Musculoskeletal', count: 920, readmissionRate: 0.29 },
  { diagnosis: 'Genitourinary', count: 880, readmissionRate: 0.36 },
  { diagnosis: 'Neoplasms', count: 770, readmissionRate: 0.25 },
];

export const historyData: PredictionRecord[] = Array.from({ length: 37 }, (_, i) => {
  const types: ('Readmission' | 'Length of Stay')[] = ['Readmission', 'Length of Stay'];
  const type = types[i % 2];
  const isReadmission = type === 'Readmission';
  const isYes = Math.random() > 0.5;
  const outcome = isReadmission ? (isYes ? 'Yes' : 'No') : `${Math.floor(Math.random() * 12) + 1} days`;
  const value = isReadmission ? (isYes ? (Math.random() * 0.3 + 0.5).toFixed(2) : (Math.random() * 0.35).toFixed(2)) : (Math.random() * 10 + 1).toFixed(1);
  const day = String(Math.floor(i / 4) + 1).padStart(2, '0');
  const hour = String((i % 24)).padStart(2, '0');
  return {
    id: `PRD-2024-${String(1842 - i).padStart(4, '0')}`,
    type,
    outcome,
    value,
    modelVersion: isReadmission ? 'v2.1.0' : 'v1.8.3',
    timestamp: `2024-10-${day} ${hour}:${String((i * 7) % 60).padStart(2, '0')}:${String((i * 13) % 60).padStart(2, '0')}`,
  };
});
