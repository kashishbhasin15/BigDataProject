import type {
  ReadmissionInput,
  ReadmissionResult,
  LengthOfStayInput,
  LengthOfStayResult,
} from '@/types';
import {
  predictReadmission as mockPredictReadmission,
  predictLengthOfStay as mockPredictLengthOfStay,
} from './mockPredictionService';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? '';

export async function fetchReadmissionPrediction(input: ReadmissionInput): Promise<ReadmissionResult> {
  if (API_BASE_URL) {
  const response = await fetch(`${API_BASE_URL}/api/predict/readmission`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  });
  if (!response.ok) throw new Error(`Prediction request failed: ${response.status}`);
  return (await response.json()) as ReadmissionResult;
  }
  return mockPredictReadmission(input);
}

export async function fetchLengthOfStayPrediction(input: LengthOfStayInput): Promise<LengthOfStayResult> {
  if (API_BASE_URL) {
  const response = await fetch(`${API_BASE_URL}/api/predict/length-of-stay`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  });
  if (!response.ok) throw new Error(`Prediction request failed: ${response.status}`);
  return (await response.json()) as LengthOfStayResult;
  }
  return mockPredictLengthOfStay(input);
}
