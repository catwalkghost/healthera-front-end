import { memo } from 'react';
import { Link } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Chip,
  Box,
  Button,
  Stack,
} from '@mui/material';
import type { PrescriptionCardProps } from '../Types/types';
import { getDateForComparison } from '../Lib/Utils/dateFormat';

const PrescriptionCard = ({ prescription }: PrescriptionCardProps) => {
  
  const isExpired = getDateForComparison(prescription.expiryDate) < new Date();
  const needsRefill = prescription.remainingRefills === 0;
  
  return (
    <Card
      component="article"
      tabIndex={0}
      aria-labelledby={`prescription-${prescription.id}-name`}
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        minHeight: { xs: 'auto', sm: 240 },
        transition: 'transform 0.15s ease-in-out, box-shadow 0.15s ease-in-out',
        '&:hover': {
          transform: 'translateY(-3px)',
          boxShadow: '0 6px 12px rgba(0, 0, 0, 0.08)'
        }
      }}
    >
      <CardContent sx={{ flexGrow: 1, p: { xs: 1.5, sm: 2 }, pb: 0 }}>
        <Typography 
          variant="subtitle1" 
          component="h3"
          id={`prescription-${prescription.id}-name`}
          align="center"
          sx={{ 
            fontSize: { xs: '1rem', md: '1.125rem' },
            fontWeight: 600,
            mb: 1,
            lineHeight: 1.3
          }}
        >
          {prescription.name}
        </Typography>
        
        <Stack spacing={0.75} sx={{ mb: 1.5, textAlign: 'left' }}>
          <Typography variant="body2" align="left">
            <Box component="span" sx={{ fontWeight: 600, color: 'text.secondary', fontSize: '0.8125rem' }}>Dosage:</Box> {prescription.dosage}
          </Typography>
          <Typography variant="body2" align="left">
            <Box component="span" sx={{ fontWeight: 600, color: 'text.secondary', fontSize: '0.8125rem' }}>Frequency:</Box> {prescription.frequency}
          </Typography>
          <Typography variant="body2" align="left">
            <Box component="span" sx={{ fontWeight: 600, color: 'text.secondary', fontSize: '0.8125rem' }}>Prescribed by:</Box> {prescription.prescribedBy}
          </Typography>
        </Stack>
        
        <Box sx={{ display: 'flex', gap: 0.75, mb: 1.5, flexWrap: 'wrap' }}>
          {isExpired && (
            <Chip 
              label="Expired"
              color="error"
              size="small"
              aria-label="Expired prescription"
              sx={{ height: 22, '& .MuiChip-label': { px: 1, fontSize: '0.6875rem' } }}
            />
          )}
          {needsRefill && (
            <Chip 
              label="Needs Refill"
              color="warning"
              size="small"
              aria-label="Needs refill"
              sx={{ height: 22, '& .MuiChip-label': { px: 1, fontSize: '0.6875rem' } }}
            />
          )}
        </Box>
      </CardContent>
      
      <CardActions sx={{ p: { xs: 1.5, sm: 2 }, pt: 0, mt: 'auto' }}>
        <Button
          component={Link}
          to={`/prescriptions/${prescription.id}`}
          variant="contained"
          color="primary"
          fullWidth
          size="small"
          aria-label={`View details for ${prescription.name}`}
          sx={{ py: 0.5 }}
        >
          View Details
        </Button>
      </CardActions>
    </Card>
  );
};

export default memo(PrescriptionCard);