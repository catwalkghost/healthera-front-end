import { useState } from 'react';

/**
 * Custom hook to handle prescription refill requests
 */
export const useRefillRequest = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, _setError] = useState<string | null>(null);

  /**
   * Request a refill for the given prescription ID
   */
  const requestRefill = async (_prescriptionId: string) => {
    setLoading(true);
    setSuccess(false);
    _setError(null);
    
    // Simulate API call with timeout
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        setLoading(false);
        setSuccess(true);
        resolve();
      }, 1000);
    });
  };

  return {
    requestRefill,
    loading,
    success,
    error
  };
}; 