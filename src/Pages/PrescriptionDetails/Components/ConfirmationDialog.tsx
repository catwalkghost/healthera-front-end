import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, CircularProgress } from '@mui/material';
import type { ConfirmationDialogProps } from '../../../Types/types';

const ConfirmationDialog = ({
  open,
  onClose,
  onConfirm,
  isLoading,
}: ConfirmationDialogProps) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
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
          onClick={onClose} 
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
          onClick={onConfirm} 
          color="primary" 
          variant="contained"
          autoFocus
          disabled={isLoading}
          startIcon={isLoading ? <CircularProgress size={16} color="inherit" /> : undefined}
        >
          {isLoading ? 'Processing...' : 'Confirm'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationDialog;
