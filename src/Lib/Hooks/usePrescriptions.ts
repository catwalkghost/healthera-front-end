import { useState, useEffect, useCallback, useMemo } from 'react';
import { debounce } from 'lodash-es';
import { fetchPrescriptions } from '../API/prescriptions';
import type { Prescription, UsePrescriptionsOptions } from '../../Types/types';

export const usePrescriptions = ({ 
  initialSearchTerm = '', 
  debounceTime = 300 
}: UsePrescriptionsOptions = {}) => {
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);

  // Create a memoized debounced function for searching
  const debouncedFetchPrescriptions = useMemo(
    () => debounce(async (term: string) => {
      setLoading(true);
      try {
        const data = await fetchPrescriptions(term);
        setPrescriptions(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch prescriptions'));
      } finally {
        setLoading(false);
      }
    }, debounceTime),
    [debounceTime]
  );

  // Load prescriptions when component mounts or search term changes
  useEffect(() => {
    debouncedFetchPrescriptions(searchTerm);
    
    // Cleanup function to cancel debounced calls
    return () => {
      debouncedFetchPrescriptions.cancel();
    };
  }, [searchTerm, debouncedFetchPrescriptions]);

  // A memoized callback to update the search term
  const handleSearch = useCallback((term: string) => {
    setSearchTerm(term);
  }, []);

  return {
    prescriptions,
    loading,
    error,
    searchTerm,
    handleSearch,
  };
}; 