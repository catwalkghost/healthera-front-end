import { Prescription, RefillResponse, PrescriptionsApi } from '../../types/Prescription';
import prescriptionMocks from './prescriptionMocks';

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// For tracking refill history in the mock implementation
const refillHistory: { prescriptionId: string, timestamp: Date }[] = [];

// Helper for robust date handling
const isExpired = (expiryDateStr: string): boolean => {
  const formatDate = (dateString: string) => {
    // Ensure proper date format YYYY-MM-DD
    const parts = dateString.split('-');
    if (parts.length === 3) {
      return `${parts[0]}-${parts[1].padStart(2, '0')}-${parts[2].padStart(2, '0')}`;
    }
    return dateString;
  };

  const today = new Date();
  today.setHours(0, 0, 0, 0); // Reset time portion

  const expiryDate = new Date(formatDate(expiryDateStr));
  expiryDate.setHours(0, 0, 0, 0); // Reset time portion

  return expiryDate < today;
};

// Fetch all prescriptions with optional filters
const fetchPrescriptions = async (
  searchTerm: string = ''
): Promise<Prescription[]> => {
  // Simulate network request
  await delay(300);
  
  if (!searchTerm) {
    return prescriptionMocks;
  }
  
  const normalizedSearchTerm = searchTerm.toLowerCase();
  
  return prescriptionMocks.filter(prescription => {
    return (
      prescription.name.toLowerCase().includes(normalizedSearchTerm) ||
      prescription.prescribedBy.toLowerCase().includes(normalizedSearchTerm) ||
      prescription.pharmacy.toLowerCase().includes(normalizedSearchTerm)
    );
  });
};

// Fetch a single prescription by ID
const fetchPrescriptionById = async (id: string): Promise<Prescription | undefined> => {
  // Simulate network request
  await delay(200);
  
  return prescriptionMocks.find(prescription => prescription.id === id);
};

// Request a prescription refill
const requestRefill = async (id: string): Promise<RefillResponse> => {
  // Simulate network request with a longer delay (1 second)
  console.log(`[API] Requesting refill for prescription ID: ${id}`);
  await delay(1000);
  
  const prescription = prescriptionMocks.find(p => p.id === id);
  
  if (!prescription) {
    console.log(`[API] Refill request failed: Prescription not found (ID: ${id})`);
    return { 
      success: false, 
      message: 'Prescription not found' 
    };
  }
  
  if (prescription.remainingRefills <= 0) {
    console.log(`[API] Refill request failed: No refills remaining for ${prescription.name}`);
    return { 
      success: false, 
      message: 'No refills remaining for this prescription' 
    };
  }

  if (isExpired(prescription.expiryDate)) {
    console.log(`[API] Refill request failed: Prescription has expired (${prescription.name}, expiry: ${prescription.expiryDate})`);
    return {
      success: false,
      message: 'Cannot refill an expired prescription'
    };
  }
  
  // Track this refill request in history
  refillHistory.push({
    prescriptionId: id,
    timestamp: new Date()
  });
  
  // Log the successful refill
  console.log(`[API] Refill request successful for ${prescription.name}`);
  console.log(`[API] Refill history:`, refillHistory);
  
  // In a real app, we would update the remaining refill count
  // prescription.remainingRefills--;
  
  return { 
    success: true, 
    message: `Refill request for ${prescription.name} submitted successfully. Your pharmacy will be notified.` 
  };
};

// Export as a single API object
export const api: PrescriptionsApi = {
  fetchPrescriptions,
  fetchPrescriptionById,
  requestRefill,
}; 