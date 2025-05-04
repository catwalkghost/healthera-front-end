import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Container, 
  Box, 
  Paper, 
  Button, 
  CircularProgress, 
  Alert, 
  Divider,
  Stack,
  Typography,
  useTheme,
  useMediaQuery,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Snackbar
} from '@mui/material';
import { fetchPrescriptionById } from '../../api/prescriptions';
import { useRefillRequest } from '../../hooks/useRefillRequest';
import { Prescription } from '../../types/Prescription';
import { formatDate, getDateForComparison } from '../../utils/dateFormat';

// Import extracted components
import BackButton from './components/BackButton';
import PrescriptionHeader from './components/PrescriptionHeader';
import InfoSection from './components/InfoSection';
import InfoItem from './components/InfoItem';

/**
 * Accessibility features:
 * - Proper heading hierarchy (h1, h2)
 * - ARIA live regions for dynamic content
 * - ARIA labels for interactive elements
 * - Status indicators for loading and errors
 * - Keyboard navigable interface
 * - Responsive design for various screen sizes
 */
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
  const isRefillButtonDisabled = !canRefill || refillLoading || success;

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
          {/* Medication Details Section */}
          <InfoSection title="Medication Details">
            <InfoItem label="Dosage" value={prescription.dosage} />
            <InfoItem 
              label="Type" 
              value={prescription.medicationType} 
              sx={{ textTransform: 'capitalize' }}
            />
            <InfoItem label="Frequency" value={prescription.frequency} />
            <InfoItem label="Instructions" value={prescription.instructions} />
          </InfoSection>
          
          {/* Prescription Information Section */}
          <InfoSection title="Prescription Information">
            <InfoItem label="Date Issued" value={formatDate(prescription.dateIssued)} />
            <InfoItem 
              label="Expiry Date" 
              value={`${formatDate(prescription.expiryDate)}${isExpired ? ' (Expired)' : ''}`}
              color={isExpired ? 'error.main' : 'text.primary'}
            />
            <InfoItem label="Remaining Refills" value={String(prescription.remainingRefills)} />
            <InfoItem label="Prescribed By" value={prescription.prescribedBy} />
            <InfoItem label="Pharmacy" value={prescription.pharmacy} />
          </InfoSection>
        </Box>
        
        {/* Refill Request Section */}
        <Paper elevation={1} sx={{ p: 2, borderRadius: 1, mt: 2 }}>
          <Typography 
            variant="subtitle1" 
            component="h2" 
            gutterBottom 
            color="primary"
            fontWeight={600}
            sx={{ fontSize: { xs: '1rem', md: '1.1rem' } }}
          >
            Refill Request
          </Typography>
          <Divider sx={{ mb: 1.5 }} />
          
          <Stack spacing={2}>
            {refillError && (
              <Box mt={1}>
                <Alert severity="error" aria-live="assertive" role="alert">
                  <Typography fontWeight={500}>{refillError}</Typography>
                </Alert>
              </Box>
            )}
            
            {success ? (
              <Alert severity="success" aria-live="polite" sx={{ mb: 2 }}>
                <Typography fontWeight={500}>{successMessage}</Typography>
              </Alert>
            ) : (
              <>
                <Box 
                  display="flex" 
                  justifyContent={isMobile ? "stretch" : "flex-start"} 
                  width={isMobile ? "100%" : "auto"}
                >
                  <Button
                    onClick={handleOpenRefillDialog}
                    disabled={isRefillButtonDisabled}
                    variant="contained"
                    color="primary"
                    size="medium"
                    fullWidth={isMobile}
                    startIcon={refillLoading ? <CircularProgress size={16} color="inherit" /> : undefined}
                  >
                    {refillLoading ? 'Requesting...' : 'Request Refill'}
                  </Button>
                </Box>
                
                {!canRefill && (
                  <Box mt={1}>
                    <Alert severity="error" variant="outlined">
                      {isExpired 
                        ? 'This prescription has expired. Contact your doctor for a new prescription.'
                        : 'No refills remaining. Contact your doctor for a new prescription.'}
                    </Alert>
                  </Box>
                )}
              </>
            )}
          </Stack>
        </Paper>
      </Box>

      {/* Confirmation Dialog */}
      <Dialog
        open={confirmDialogOpen}
        onClose={handleCloseRefillDialog}
        aria-labelledby="refill-dialog-title"
        aria-describedby="refill-dialog-description"
      >
        <DialogTitle id="refill-dialog-title">
          Confirm Refill Request
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="refill-dialog-description">
            Are you sure you want to request a refill for this prescription?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={handleCloseRefillDialog} 
            color="primary"
            variant="outlined"
            sx={{ 
              color: theme => theme.palette.text.primary,
              borderColor: theme => theme.palette.divider,
            }}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleRefillRequest} 
            color="primary" 
            variant="contained"
            autoFocus
            disabled={refillLoading}
            startIcon={refillLoading ? <CircularProgress size={16} color="inherit" /> : undefined}
          >
            {refillLoading ? 'Processing...' : 'Confirm'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Success Snackbar */}
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