import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act, waitFor } from '@testing-library/react';
import { usePrescriptions } from '../../src/hooks/usePrescriptions';
import * as prescriptionsApi from '../../src/api/prescriptions';
import mockPrescriptions from '../../src/api/prescriptions/prescriptionMocks';

// Mock the API module
vi.mock('../../src/api/prescriptions');

describe('usePrescriptions', () => {
  beforeEach(() => {
    // Mock the fetch function to return test data
    vi.mocked(prescriptionsApi.fetchPrescriptions).mockResolvedValue(mockPrescriptions);
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it('should return prescriptions data on successful load', async () => {
    const { result } = renderHook(() => usePrescriptions());

    // Initial state should be loading
    expect(result.current.loading).toBe(true);
    expect(result.current.prescriptions).toEqual([]);

    // Wait for the async operation to complete
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    // After loading, should have prescriptions data
    expect(result.current.prescriptions).toEqual(mockPrescriptions);
    expect(result.current.error).toBe(null);
  });

  it('should filter prescriptions when search term is provided', async () => {
    // Mock the fetch function to return filtered results
    const filteredPrescriptions = [mockPrescriptions[0]]; // Just the first prescription
    vi.mocked(prescriptionsApi.fetchPrescriptions).mockResolvedValue(filteredPrescriptions);

    const { result } = renderHook(() => usePrescriptions({ initialSearchTerm: 'amox' }));

    // Wait for the async operation to complete
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    // Should have called the API with the search term
    expect(prescriptionsApi.fetchPrescriptions).toHaveBeenCalledWith('amox');
    
    // Should have filtered prescriptions
    expect(result.current.prescriptions).toEqual(filteredPrescriptions);
  });

  it('should update search results when handleSearch is called', async () => {
    // Initial empty result
    vi.mocked(prescriptionsApi.fetchPrescriptions).mockResolvedValueOnce(mockPrescriptions);
    
    // Mock result for search term "test"
    const filteredPrescriptions = [mockPrescriptions[2]];
    vi.mocked(prescriptionsApi.fetchPrescriptions).mockResolvedValueOnce(filteredPrescriptions);

    const { result } = renderHook(() => usePrescriptions());

    // Wait for initial load
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    
    // Call handleSearch with a search term
    act(() => {
      result.current.handleSearch('test');
    });
    
    // Wait for search results (don't check loading state as it's debounced)
    await waitFor(() => {
      expect(result.current.prescriptions).toEqual(filteredPrescriptions);
    });
    
    // Should have updated the search results
    expect(prescriptionsApi.fetchPrescriptions).toHaveBeenCalledWith('test');
    expect(result.current.searchTerm).toBe('test');
  });
}); 