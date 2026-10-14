export interface NavItem {
  label: string;
  path: string;
  icon: string;
}

export interface KpiCardData {
  id: string;
  title: string;
  value: string;
  subtitle: string;
  trend?: { direction: 'up' | 'down' | 'neutral'; value: string };
  icon: string;
  accent: 'primary' | 'teal' | 'warning' | 'success';
}

export interface PredictionRecord {
  id: string;
  type: 'Readmission' | 'Length of Stay';
  outcome: string;
  value: string;
  modelVersion: string;
  timestamp: string;
}

export interface ReadmissionInput {
  ageGroup: string;
  gender: string;
  race?: string;
  admissionType: string;
  admissionSource: string;
  timeInHospital?: number;
  numOutpatientVisits: number;
  numEmergencyVisits: number;
  numInpatientVisits: number;
  numDiagnoses?: number;
  numProcedures?: number;
  numMedications?: number;
  primaryDiagnosis?: string;
  insulinUsed?: string;
  changeInMedication?: string;
}

export interface ReadmissionResult {
  readmission: 'Yes' | 'No';
  probability: number;
  threshold: number;
  explanation: string;
}

export interface LengthOfStayInput {
  ageGroup: string;
  gender: string;
  admissionType: string;
  admissionSource: string;
  numOutpatientVisits: number;
  numEmergencyVisits: number;
  numInpatientVisits: number;
  numDiagnoses?: number;
  numProcedures?: number;
}

export interface LengthOfStayResult {
  predictedDays: number;
  rangeLow: number;
  rangeHigh: number;
  explanation: string;
}

export interface ModelMetrics {
  model: string;
  task: 'classification' | 'regression';
  accuracy: number;
  precision: number;
  recall: number;
  f1Score: number;
  rocAuc?: number;
  prAuc?: number;
  mae?: number;
  rmse?: number;
  r2?: number;
}

export interface ConfusionMatrixData {
  truePositive: number;
  falsePositive: number;
  trueNegative: number;
  falseNegative: number;
}

export interface FeatureImportance {
  feature: string;
  importance: number;
}

export interface ChartSeriesData {
  name: string;
  value: number;
}

export interface TimeSeriesData {
  date: string;
  readmission: number;
  lengthOfStay: number;
}

export interface ToastMessage {
  id: string;
  type: 'success' | 'warning' | 'error' | 'info';
  message: string;
}

export interface TableColumn {
  key: string;
  label: string;
  sortable?: boolean;
  render?: (row: Record<string, unknown>) => React.ReactNode;
}

export interface SelectOption {
  label: string;
  value: string;
}
