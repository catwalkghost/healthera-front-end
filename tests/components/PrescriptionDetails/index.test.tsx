import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import PrescriptionDetails from '../../../src/pages/PrescriptionDetails';
import * as prescriptionsApi from '../../../src/api/prescriptions';
import { Prescription } from '../../../src/types/Prescription';

// Mock the API module
vi.mock('../../../src/api/prescriptions');

// Create a mock prescription
const mockPrescription: Prescription = {
  id: 'test-123',
  name: 'Test Medication',
  dosage: '100mg',
  frequency: 'Once daily',
  dateIssued: '2023-05-15',
  expiryDate: '2024-05-15',
  medicationType: 'tablet',
  remainingRefills: 2,
  instructions: 'Take with water',
  prescribedBy: 'Dr. Test',
  pharmacy: 'Test Pharmacy',
};

describe('PrescriptionDetails', () => {
  it('renders loading state initially', async () => {
    // Mock the API to delay resolution
    vi.mocked(prescriptionsApi.fetchPrescriptionById).mockImplementation(
      () => new Promise((resolve) => setTimeout(() => resolve(mockPrescription), 100))
    );

    render(
      <MemoryRouter initialEntries={['/prescriptions/test-123']}>
        <Routes>
          <Route path="/prescriptions/:id" element={<PrescriptionDetails />} />
        </Routes>
      </MemoryRouter>
    );

    // Check if loading indicator is displayed
    expect(screen.getByRole('status')).toBeInTheDocument();
    
    // Wait for data to load
    await waitFor(() => {
      expect(screen.getByText('Test Medication')).toBeInTheDocument();
    });
  });

  it('displays prescription details correctly', async () => {
    // Mock the API to return data immediately
    vi.mocked(prescriptionsApi.fetchPrescriptionById).mockResolvedValue(mockPrescription);

    render(
      <MemoryRouter initialEntries={['/prescriptions/test-123']}>
        <Routes>
          <Route path="/prescriptions/:id" element={<PrescriptionDetails />} />
        </Routes>
      </MemoryRouter>
    );

    // Wait for data to load and details to be displayed
    await waitFor(() => {
      expect(screen.getByText('Test Medication')).toBeInTheDocument();
    });

    // Test medication details section
    expect(screen.getByText('Dosage')).toBeInTheDocument();
    expect(screen.getByText('100mg')).toBeInTheDocument();
    expect(screen.getByText('Frequency')).toBeInTheDocument();
    expect(screen.getByText('Once daily')).toBeInTheDocument();
    expect(screen.getByText('Instructions')).toBeInTheDocument();
    expect(screen.getByText('Take with water')).toBeInTheDocument();

    // Test prescription information section
    expect(screen.getByText('Prescribed By')).toBeInTheDocument();
    expect(screen.getByText('Dr. Test')).toBeInTheDocument();
    expect(screen.getByText('Pharmacy')).toBeInTheDocument();
    expect(screen.getByText('Test Pharmacy')).toBeInTheDocument();
    
    // Test refill request section
    expect(screen.getByText('Refill Request')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /request refill/i })).toBeInTheDocument();
  });

  it('displays error state when prescription is not found', async () => {
    // Mock the API to return undefined (not found)
    vi.mocked(prescriptionsApi.fetchPrescriptionById).mockResolvedValue(undefined);

    render(
      <MemoryRouter initialEntries={['/prescriptions/not-found']}>
        <Routes>
          <Route path="/prescriptions/:id" element={<PrescriptionDetails />} />
        </Routes>
      </MemoryRouter>
    );

    // Wait for error state to be displayed
    await waitFor(() => {
      expect(screen.getByRole('alert')).toBeInTheDocument();
      expect(screen.getByText('Prescription not found')).toBeInTheDocument();
    });

    // Back button should be present
    expect(screen.getByRole('button', { name: /back to prescriptions list/i })).toBeInTheDocument();
  });
}); 