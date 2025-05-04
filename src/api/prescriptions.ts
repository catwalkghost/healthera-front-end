import mockPrescriptions from './prescriptions/prescriptionMocks';
import { Prescription } from '../types/Prescription';

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Fetch all prescriptions with optional filters
export const fetchPrescriptions = async (
  searchTerm: string = ''
): Promise<Prescription[]> => {
  // Simulate network request
  await delay(300);
  
  if (!searchTerm) {
    return mockPrescriptions;
  }
  
  const normalizedSearchTerm = searchTerm.toLowerCase();
  
  return mockPrescriptions.filter(prescription => {
    return (
      prescription.name.toLowerCase().includes(normalizedSearchTerm) ||
      prescription.prescribedBy.toLowerCase().includes(normalizedSearchTerm) ||
      prescription.pharmacy.toLowerCase().includes(normalizedSearchTerm)
    );
  });
};

// Fetch a single prescription by ID
export const fetchPrescriptionById = async (id: string): Promise<Prescription | undefined> => {
  // Simulate network request
  await delay(200);
  
  return mockPrescriptions.find(prescription => prescription.id === id);
};

// Request a prescription refill
export const requestRefill = async (id: string): Promise<{ success: boolean; message: string }> => {
  // Simulate network request
  await delay(500);
  
  const prescription = mockPrescriptions.find(p => p.id === id);
  
  if (!prescription) {
    return { 
      success: false, 
      message: 'Prescription not found' 
    };
  }
  
  if (prescription.remainingRefills <= 0) {
    return { 
      success: false, 
      message: 'No refills remaining for this prescription' 
    };
  }
  
  // In a real app, we would update the remaining refills count
  return { 
    success: true, 
    message: 'Refill request submitted successfully' 
  };
}; 