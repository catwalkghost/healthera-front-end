import { Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Theme } from '@mui/material/styles';

type BackButtonProps = {
  onClick: () => void;
  theme: Theme;
}

const BackButton = ({ onClick }: BackButtonProps) => {
  return (
    <Button
      variant="outlined"
      startIcon={<ArrowBackIcon />}
      onClick={onClick}
      aria-label="Back to prescriptions list"
      size="small"
      sx={{ 
        mr: 2,
        color: t => t.palette.primary.main,
        borderColor: t => t.palette.divider,
        backgroundColor: 'transparent',
        '&:hover': {
          backgroundColor: t => t.palette.action.hover,
          borderColor: t => t.palette.divider,
        },
        '&:active': {
          backgroundColor: '#e0e0e0',
        }
      }}
    >
      Back
    </Button>
  );
};

export default BackButton; 