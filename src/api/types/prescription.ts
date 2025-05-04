export type Prescription = {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  dateIssued: string;
  expiryDate: string;
  medicationType: 'tablet' | 'capsule' | 'liquid' | 'inhaler' | 'injection';
  remainingRefills: number;
  instructions: string;
  prescribedBy: string;
  pharmacy: string;
};

export type RefillResponse = {
  success: boolean;
  message: string;
}; 