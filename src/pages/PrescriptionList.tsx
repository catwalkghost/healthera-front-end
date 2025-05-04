import { useMemo } from 'react';
import { Container, Typography, Box, CircularProgress, Alert } from '@mui/material';
import { usePrescriptions } from '../hooks/usePrescriptions';
import PrescriptionCard from '../components/PrescriptionCard';
import SearchInput from '../components/SearchInput';

/**
 * Accessibility features:
 * - Semantic HTML structure with proper heading levels
 * - ARIA live regions for dynamic content updates
 * - Screen reader announcements for loading and error states
 * - Responsive grid layout that adapts to different screen sizes
 * - Keyboard navigable interface
 */
const PrescriptionList = () => {

  // Custom hook to manage prescription data and search functionality
  const { 
    prescriptions, 
    loading, 
    error, 
    searchTerm, 
    handleSearch 
  } = usePrescriptions();

  // Memoize the prescription list to prevent unnecessary re-renders
  const prescriptionList = useMemo(() => {
    if (loading) {
      return (
        <Box 
          sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', py: { xs: 2, md: 3 }}}
          aria-live="polite" 
          role="status"
        >
          <CircularProgress size={28} />
        </Box>
      );
    }

    // Error handling
    if (error) {
      return (
        <Alert 
          severity="error" 
          aria-live="assertive" 
          role="alert"
          sx={{ mt: 1 }}
        >
          Error loading prescriptions: {error.message}
        </Alert>
      );
    }

    // Empty results state
    if (prescriptions.length === 0) {
      return (
        <Alert 
          severity="info" 
          aria-live="polite"
          sx={{ mt: 1 }}
        >
          No prescriptions found. Try adjusting your search.
        </Alert>
      );
    }

    // Prescription grid display
    return (
      <Box sx={{ mt: { xs: 1, sm: 2 } }}>
        <Box 
          sx={{ 
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(3, 1fr)',
              lg: 'repeat(4, 1fr)'
            },
            gap: { xs: 2, md: 2.5 }
          }}
          role="list"
          aria-label="Prescription list"
        >
          {prescriptions.map(prescription => (
            <Box key={prescription.id} role="listitem">
              <PrescriptionCard prescription={prescription} />
            </Box>
          ))}
        </Box>
      </Box>
    );
  }, [prescriptions, loading, error]);

  return (
    <Container 
      maxWidth="lg" 
      sx={{ 
        pt: { xs: 1, sm: 2 }, 
        pb: { xs: 3, md: 4 },
        px: { xs: 2, sm: 3 }
      }}
    >
      {/* Page header */}
      <Box sx={{ mb: { xs: 2, md: 3 } }}>
        <Typography 
          variant="h6" 
          component="h1" 
          align="center"
          sx={{ 
            fontWeight: 600,
            fontSize: { xs: '1.125rem', sm: '1.25rem', md: '1.5rem' },
            mb: { xs: 1.5, md: 2 }
          }}
        >
          My Prescriptions
        </Typography>
        
        {/* Search input with accessibility attributes */}
        <SearchInput 
          onSearch={handleSearch} 
          initialValue={searchTerm} 
        />
      </Box>
      
      {/* Prescription list content */}
      {prescriptionList}
    </Container>
  );
};

export default PrescriptionList;