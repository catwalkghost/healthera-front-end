/**
 * Prescription
 */
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

/**
 * API responses
 */
export type RefillResponse = {
  success: boolean;
  message: string;
};

/**
 * API interfaces
 */
export type PrescriptionsApi = {
  fetchPrescriptions: (searchTerm?: string) => Promise<Prescription[]>;
  fetchPrescriptionById: (id: string) => Promise<Prescription | undefined>;
  requestRefill: (id: string) => Promise<RefillResponse>;
};

/**
 * Component Props
 */
export type PrescriptionCardProps = {
  prescription: Prescription;
};

export type SearchInputProps = {
  onSearch: (searchTerm: string) => void;
  initialValue?: string;
  placeholder?: string;
  ariaLabel?: string;
};

/**
 * Hook Options
 */
export type UsePrescriptionsOptions = {
  initialSearchTerm?: string;
  debounceTime?: number;
}; 