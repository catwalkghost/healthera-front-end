import type { ReactNode } from "react";
import type { SxProps, Theme } from "@mui/material";

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

export type PrescriptionsApi = {
  fetchPrescriptions: (searchTerm?: string) => Promise<Prescription[]>;
  fetchPrescriptionById: (id: string) => Promise<Prescription | undefined>;
  requestRefill: (id: string) => Promise<RefillResponse>;
};

export type PrescriptionCardProps = {
  prescription: Prescription;
};

export type SearchInputProps = {
  onSearch: (searchTerm: string) => void;
  initialValue?: string;
  placeholder?: string;
  ariaLabel?: string;
};

export type UsePrescriptionsOptions = {
  initialSearchTerm?: string;
  debounceTime?: number;
};

// Component types
export type PrescriptionHeaderProps  = {
  name: string;
  isExpired: boolean;
  remainingRefills: number;
  canRefill: boolean;
};

export type InfoSectionProps = {
  title: string;
  children: ReactNode;
};

export type InfoItemProps = {
  label: string;
  value: string;
  color?: string;
  sx?: SxProps<Theme>;
};

export type BackButtonProps = {
  onClick: () => void;
  theme: Theme;
};

export type HeaderLinkProps = {
  to: string;
  children: ReactNode;
};

export type ConfirmationDialogProps = {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isLoading: boolean;
};

export type MedicationDetailsProps = {
  prescription: Prescription;
};

export type PrescriptionInformationProps = {
  prescription: Prescription;
  isExpired: boolean;
};

export type RefillRequestSectionProps = {
  canRefill: boolean;
  isExpired: boolean;
  refillLoading: boolean;
  success: boolean;
  successMessage: string;
  refillError: string | null;
  onOpenRefillDialog: () => void;
  isMobile: boolean;
};
