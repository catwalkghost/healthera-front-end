import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Theme } from '@mui/material/styles';
import { createTheme } from '@mui/material';
import BackButton from '../../../src/pages/PrescriptionDetails/components/BackButton';
import InfoItem from '../../../src/pages/PrescriptionDetails/components/InfoItem';
import InfoSection from '../../../src/pages/PrescriptionDetails/components/InfoSection';
import PrescriptionHeader from '../../../src/pages/PrescriptionDetails/components/PrescriptionHeader';

describe('PrescriptionDetails Components', () => {
  const theme = createTheme();
  
  describe('BackButton', () => {
    it('renders correctly with required props', () => {
      const handleClick = vi.fn();
      
      render(<BackButton onClick={handleClick} theme={theme as Theme} />);
      
      const button = screen.getByRole('button', { name: /back to prescriptions list/i });
      expect(button).toBeInTheDocument();
      
      // Test the onClick handler
      button.click();
      expect(handleClick).toHaveBeenCalledTimes(1);
    });
  });
  
  describe('InfoItem', () => {
    it('renders label and value correctly', () => {
      render(<InfoItem label="Test Label" value="Test Value" />);
      
      expect(screen.getByText('Test Label')).toBeInTheDocument();
      expect(screen.getByText('Test Value')).toBeInTheDocument();
    });
    
    it('applies custom color when provided', () => {
      render(<InfoItem label="Status" value="Expired" color="error.main" />);
      
      expect(screen.getByText('Status')).toBeInTheDocument();
      expect(screen.getByText('Expired')).toBeInTheDocument();
    });
  });
  
  describe('InfoSection', () => {
    it('renders title and children correctly', () => {
      render(
        <InfoSection title="Test Section">
          <div data-testid="test-child">Child Content</div>
        </InfoSection>
      );
      
      expect(screen.getByText('Test Section')).toBeInTheDocument();
      expect(screen.getByTestId('test-child')).toBeInTheDocument();
      expect(screen.getByText('Child Content')).toBeInTheDocument();
    });
  });
  
  describe('PrescriptionHeader', () => {
    it('renders prescription name', () => {
      render(
        <PrescriptionHeader 
          name="Test Medication" 
          isExpired={false} 
          remainingRefills={2}
          canRefill={true}
        />
      );
      
      expect(screen.getByText('Test Medication')).toBeInTheDocument();
      expect(screen.getByText('Active')).toBeInTheDocument();
    });
    
    it('shows expired status when prescription is expired', () => {
      render(
        <PrescriptionHeader 
          name="Test Medication" 
          isExpired={true} 
          remainingRefills={2}
          canRefill={false}
        />
      );
      
      expect(screen.getByText('Test Medication')).toBeInTheDocument();
      expect(screen.getByText('Expired')).toBeInTheDocument();
    });
    
    it('shows no refills status when prescription has no refills', () => {
      render(
        <PrescriptionHeader 
          name="Test Medication" 
          isExpired={false} 
          remainingRefills={0}
          canRefill={false}
        />
      );
      
      expect(screen.getByText('Test Medication')).toBeInTheDocument();
      expect(screen.getByText('No Refills')).toBeInTheDocument();
    });
  });
}); 