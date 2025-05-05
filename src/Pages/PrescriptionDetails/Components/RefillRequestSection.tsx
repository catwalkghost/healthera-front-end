import { Box, Paper, Typography, Button, Alert, Divider, Stack, CircularProgress } from '@mui/material';
import type { RefillRequestSectionProps } from '../../../Types/types';

const RefillRequestSection = ({
  canRefill,
  isExpired,
  refillLoading,
  success,
  successMessage,
  refillError,
  onOpenRefillDialog,
  isMobile
}: RefillRequestSectionProps) => {
  const isRefillButtonDisabled = !canRefill || refillLoading || success;

  return (
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
                onClick={onOpenRefillDialog}
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
  );
};

export default RefillRequestSection; 