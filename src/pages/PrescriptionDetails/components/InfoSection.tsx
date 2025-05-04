import { ReactNode } from 'react';
import { Paper, Typography, Divider, Stack } from '@mui/material';

interface InfoSectionProps {
  title: string;
  children: ReactNode;
}

const InfoSection = ({ title, children }: InfoSectionProps) => {
  return (
    <Paper elevation={1} sx={{ p: 2, height: '100%', borderRadius: 1 }}>
      <Typography 
        variant="subtitle1" 
        component="h2" 
        gutterBottom 
        color="primary"
        fontWeight={600}
        sx={{ fontSize: { xs: '1rem', md: '1.1rem' } }}
      >
        {title}
      </Typography>
      <Divider sx={{ mb: 1.5 }} />
      <Stack spacing={1.5}>
        {children}
      </Stack>
    </Paper>
  );
};

export default InfoSection; 