import type { SelectOption } from '@/types';

export const ageGroupOptions: SelectOption[] = [
  { label: '0-30 years', value: '0-30' },
  { label: '31-50 years', value: '31-50' },
  { label: '51-70 years', value: '51-70' },
  { label: '71-90 years', value: '71-90' },
  { label: '90+ years', value: '90+' },
];

export const genderOptions: SelectOption[] = [
  { label: 'Female', value: 'Female' },
  { label: 'Male', value: 'Male' },
  { label: 'Unknown/Other', value: 'Unknown' },
];

export const raceOptions: SelectOption[] = [
  { label: 'Caucasian', value: 'Caucasian' },
  { label: 'African American', value: 'AfricanAmerican' },
  { label: 'Asian', value: 'Asian' },
  { label: 'Hispanic', value: 'Hispanic' },
  { label: 'Other', value: 'Other' },
  { label: 'Unknown', value: 'Unknown' },
];

export const admissionTypeOptions: SelectOption[] = [
  { label: 'Emergency', value: 'Emergency' },
  { label: 'Urgent', value: 'Urgent' },
  { label: 'Elective', value: 'Elective' },
  { label: 'Newborn', value: 'Newborn' },
  { label: 'Not Available', value: 'NotAvailable' },
  { label: 'Trauma Center', value: 'Trauma' },
];

export const admissionSourceOptions: SelectOption[] = [
  { label: 'Emergency Room', value: 'EmergencyRoom' },
  { label: 'Physician Referral', value: 'PhysicianReferral' },
  { label: 'Clinic Referral', value: 'ClinicReferral' },
  { label: 'Transfer from Hospital', value: 'TransferHospital' },
  { label: 'Transfer from Skilled Nursing Facility', value: 'TransferSNF' },
  { label: 'Not Available', value: 'NotAvailable' },
];

export const dischargeDispositionOptions: SelectOption[] = [
  { label: 'Discharged to Home', value: 'Home' },
  { label: 'Discharged to SNF', value: 'SNF' },
  { label: 'Discharged to Home with Health Service', value: 'HomeHealth' },
  { label: 'Expired', value: 'Expired' },
  { label: 'Transfer to Another Facility', value: 'Transfer' },
];

export const diagnosisOptions: SelectOption[] = [
  { label: 'Circulatory', value: 'Circulatory' },
  { label: 'Diabetes', value: 'Diabetes' },
  { label: 'Respiratory', value: 'Respiratory' },
  { label: 'Digestive', value: 'Digestive' },
  { label: 'Injury', value: 'Injury' },
  { label: 'Musculoskeletal', value: 'Musculoskeletal' },
  { label: 'Genitourinary', value: 'Genitourinary' },
  { label: 'Neoplasms', value: 'Neoplasms' },
  { label: 'Other', value: 'Other' },
];

export const insulinOptions: SelectOption[] = [
  { label: 'No', value: 'No' },
  { label: 'Steady', value: 'Steady' },
  { label: 'Up', value: 'Up' },
  { label: 'Down', value: 'Down' },
];

export const medicationChangeOptions: SelectOption[] = [
  { label: 'No change', value: 'No' },
  { label: 'Changed', value: 'Ch' },
];
