import type {
  ReadmissionInput,
  ReadmissionResult,
  LengthOfStayInput,
  LengthOfStayResult,
} from '@/types';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function predictReadmission(input: ReadmissionInput): Promise<ReadmissionResult> {
  await delay(1600);

  let score = 0.35;
  if (input.numInpatientVisits > 2) score += 0.15;
  if (input.numEmergencyVisits > 3) score += 0.12;
  if (input.numDiagnoses && input.numDiagnoses > 7) score += 0.1;
  if (input.ageGroup === '71-90' || input.ageGroup === '90+') score += 0.08;
  if (input.admissionType === 'Emergency') score += 0.06;
  if (input.insulinUsed === 'Steady') score += 0.04;

  score = Math.min(score + Math.random() * 0.1, 0.95);
  const threshold = 0.5;
  const readmission = score >= threshold ? 'Yes' : 'No';

  return {
    readmission,
    probability: Number(score.toFixed(2)),
    threshold,
    explanation:
      readmission === 'Yes'
        ? 'Based on the provided encounter data, the model identifies elevated readmission risk driven primarily by prior inpatient visits, emergency utilization, and diagnostic complexity. This is a simulated result for demonstration purposes.'
        : 'Based on the provided encounter data, the model indicates a lower likelihood of readmission. Contributing factors include fewer prior inpatient visits and lower emergency utilization. This is a simulated result for demonstration purposes.',
  };
}

export async function predictLengthOfStay(input: LengthOfStayInput): Promise<LengthOfStayResult> {
  await delay(1400);

  let days = 2.5;
  if (input.admissionType === 'Emergency') days += 2.1;
  if (input.admissionType === 'Urgent') days += 1.5;
  if (input.numInpatientVisits > 2) days += 1.8;
  if (input.numEmergencyVisits > 3) days += 1.2;
  if (input.numDiagnoses && input.numDiagnoses > 7) days += 1.4;
  if (input.ageGroup === '71-90' || input.ageGroup === '90+') days += 1.0;

  days = Math.max(1, days + Math.random() * 1.5);
  const predictedDays = Number(days.toFixed(1));
  const rangeLow = Math.max(1, Number((predictedDays - 1.5).toFixed(1)));
  const rangeHigh = Number((predictedDays + 2.5).toFixed(1));

  return {
    predictedDays,
    rangeLow,
    rangeHigh,
    explanation: `The model estimates a hospital stay of approximately ${predictedDays} days, with a likely range of ${rangeLow}–${rangeHigh} days based on admission type, prior utilization, and diagnostic factors. This is a simulated result for demonstration purposes.`,
  };
}
