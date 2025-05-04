import { Stack, Typography, SxProps, Theme } from '@mui/material';

interface InfoItemProps {
  label: string;
  value: string;
  color?: string;
  sx?: SxProps<Theme>;
}

const InfoItem = ({ label, value, color = 'text.primary', sx = {} }: InfoItemProps) => {
  return (
    <Stack spacing={0.5}>
      <Typography variant="body2" color="text.secondary">
        {label}
      </Typography>
      <Typography variant="body1" fontWeight={500} color={color} sx={sx}>
        {value}
      </Typography>
    </Stack>
  );
};

export default InfoItem; 