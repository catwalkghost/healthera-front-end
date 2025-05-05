import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Container, 
  Box, 
  CircularProgress, 
  Alert, 
  Snackbar,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { fetchPrescriptionById } from '../../Lib/API/prescriptions';
import { useRefillRequest } from '../../Lib/Hooks/useRefillRequest';
import type { Prescription } from '../../Types/types';
import { getDateForComparison } from '../../Lib/Utils/dateFormat';

import BackButton from './Components/BackButton';
import PrescriptionHeader from './Components/PrescriptionHeader';
import MedicationDetails from './Components/MedicationDetails';
import PrescriptionInformation from './Components/PrescriptionInformation';
import RefillRequestSection from './Components/RefillRequestSection';
import ConfirmationDialog from './Components/ConfirmationDialog';

const PrescriptionDetails = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  // Prescription data state
  const [prescription, setPrescription] = useState<Prescription | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  
  // UI state
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  // Use the refill request hook
  const { requestRefill, loading: refillLoading, success, error: refillError } = useRefillRequest();

  // Fetch prescription details when the component mounts or ID changes
  useEffect(() => {
    const loadPrescription = async () => {
      if (!id) return;

      setLoading(true);
      try {
        const data = await fetchPrescriptionById(id);
        if (data) {
          setPrescription(data);
        } else {
          setError(new Error('Prescription not found'));
        }
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to load prescription'));
      } finally {
        setLoading(false);
      }
    }

    loadPrescription();
  }, [id]);

  // Show a success message when refill request succeeds
  useEffect(() => {
    if (success) {
      setSuccessMessage(`Refill request for ${prescription?.name} submitted successfully`);
      setSnackbarOpen(true);
    }
  }, [success, prescription]);

  // Event handlers
  const handleOpenRefillDialog = useCallback(() => {
    setConfirmDialogOpen(true);
  }, []);

  const handleCloseRefillDialog = useCallback(() => {
    setConfirmDialogOpen(false);
  }, []);

  const handleRefillRequest = useCallback(async () => {
    if (!id) return;
    setConfirmDialogOpen(false);
    await requestRefill(id);
  }, [id, requestRefill]);

  const handleBack = useCallback(() => {
    navigate('/');
  }, [navigate]);

  const handleSnackbarClose = useCallback(() => {
    setSnackbarOpen(false);
  }, []);

  // Render loading state
  if (loading) {
    return (
      <Container maxWidth="md" sx={{ mt: 8, mb: 2 }}>
        <Box 
          sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '30vh' }}
          aria-live="polite" 
          role="status"
        >
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  // Render error state
  if (error) {
    return (
      <Container maxWidth="md" sx={{ mt: 8, mb: 2 }}>
        <Box sx={{ maxWidth: 600, mx: 'auto', p: 2 }}>
          <Alert 
            severity="error" 
            aria-live="assertive" 
            role="alert"
            sx={{ mb: 2 }}
          >
            {error.message}
          </Alert>
          <BackButton onClick={handleBack} theme={theme} />
        </Box>
      </Container>
    );
  }

  if (!prescription) {
    return (
      <Container maxWidth="md" sx={{ mt: 8, mb: 2 }}>
        <Box sx={{ maxWidth: 600, mx: 'auto', p: 2 }}>
          <Alert 
            severity="warning" 
            aria-live="assertive" 
            role="alert"
            sx={{ mb: 2 }}
          >
            The prescription you are looking for does not exist.
          </Alert>
          <BackButton onClick={handleBack} theme={theme} />
        </Box>
      </Container>
    );
  }

  // Calculate derived state
  const isExpired = getDateForComparison(prescription.expiryDate) < new Date();
  const canRefill = prescription.remainingRefills > 0 && !isExpired;

  // Render main content
  return (
    <Container maxWidth="md" sx={{ mt: { xs: 8, md: 10 }, mb: 4 }}>
      {/* Header with Back Button */}
      <Box sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
        <BackButton onClick={handleBack} theme={theme} />
        <PrescriptionHeader 
          name={prescription.name}
          isExpired={isExpired}
          remainingRefills={prescription.remainingRefills}
          canRefill={canRefill}
        />
      </Box>
      
      <Box>
        <Box
          sx={{ 
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
            gap: 2
          }}
        >
          <MedicationDetails prescription={prescription} />
          
          <PrescriptionInformation prescription={prescription} isExpired={isExpired} />
        </Box>
        
        <RefillRequestSection 
          canRefill={canRefill}
          isExpired={isExpired}
          refillLoading={refillLoading}
          success={success}
          successMessage={successMessage}
          refillError={refillError}
          onOpenRefillDialog={handleOpenRefillDialog}
          isMobile={isMobile}
        />
      </Box>

      <ConfirmationDialog 
        open={confirmDialogOpen}
        onClose={handleCloseRefillDialog}
        onConfirm={handleRefillRequest}
        isLoading={refillLoading}
      />

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message={successMessage}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      />
    </Container>
  );
};

export default PrescriptionDetails; 