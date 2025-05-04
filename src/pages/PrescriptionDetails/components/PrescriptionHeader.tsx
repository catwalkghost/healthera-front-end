import { Box, Typography, Chip } from '@mui/material';

interface PrescriptionHeaderProps {
  name: string;
  isExpired: boolean;
  remainingRefills: number;
  canRefill: boolean;
}

const PrescriptionHeader = ({ name, isExpired, remainingRefills, canRefill }: PrescriptionHeaderProps) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
      <Typography 
        variant="h6" 
        component="h1" 
        fontWeight={600}
        sx={{ mr: 1, fontSize: { xs: '1.125rem', md: '1.25rem' } }}
      >
        {name}
      </Typography>
      {isExpired && (
        <Chip 
          label="Expired" 
          color="error" 
          size="small" 
          sx={{ height: 20, fontSize: '0.7rem' }} 
        />
      )}
      {remainingRefills === 0 && !isExpired && (
        <Chip 
          label="No Refills" 
          color="warning" 
          size="small" 
          sx={{ height: 20, fontSize: '0.7rem' }} 
        />
      )}
      {canRefill && (
        <Chip 
          label="Active" 
          color="success" 
          size="small" 
          sx={{ height: 20, fontSize: '0.7rem', ml: 0.5 }} 
        />
      )}
    </Box>
  );
};

export default PrescriptionHeader; 