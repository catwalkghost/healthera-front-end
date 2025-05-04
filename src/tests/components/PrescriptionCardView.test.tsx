import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import PrescriptionCard from '../../components/PrescriptionCard';
import { Prescription } from '../../types/Prescription';

// Create a mock prescription for testing
const mockPrescription: Prescription = {
  id: 'test-123',
  name: 'Test Medication',
  dosage: '100mg',
  frequency: 'Once daily',
  dateIssued: '2023-01-01',
  expiryDate: '2023-12-31',
  medicationType: 'tablet',
  remainingRefills: 2,
  instructions: 'Take with water',
  prescribedBy: 'Dr. Test',
  pharmacy: 'Test Pharmacy',
};

describe('PrescriptionCard', () => {
  it('renders prescription information correctly', () => {
    render(
      <MemoryRouter>
        <PrescriptionCard prescription={mockPrescription} />
      </MemoryRouter>
    );
    
    // Check if basic prescription information is displayed
    expect(screen.getByText('Test Medication')).toBeInTheDocument();
    expect(screen.getByText('100mg', { exact: false })).toBeInTheDocument();
    expect(screen.getByText('Once daily', { exact: false })).toBeInTheDocument();
    expect(screen.getByText('Dr. Test', { exact: false })).toBeInTheDocument();
    
    // Check if the View Details link has the correct link
    const detailsLink = screen.getByRole('link', { name: /view details/i });
    expect(detailsLink).toHaveAttribute('href', '/prescriptions/test-123');
  });

  it('displays expired status correctly for expired prescriptions', () => {
    // Create an expired prescription (past expiry date)
    const expiredPrescription = {
      ...mockPrescription,
      expiryDate: '2020-01-01', // Past date to ensure it's expired
    };

    render(
      <MemoryRouter>
        <PrescriptionCard prescription={expiredPrescription} />
      </MemoryRouter>
    );
    
    expect(screen.getByText('Expired')).toBeInTheDocument();
  });

  it('displays needs refill status when remaining refills is zero', () => {
    // Create a prescription with no remaining refills
    const noRefillsPrescription = {
      ...mockPrescription,
      remainingRefills: 0,
    };

    render(
      <MemoryRouter>
        <PrescriptionCard prescription={noRefillsPrescription} />
      </MemoryRouter>
    );
    
    expect(screen.getByText('Needs Refill')).toBeInTheDocument();
  });
}); 