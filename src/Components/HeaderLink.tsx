import { Link as RouterLink } from 'react-router-dom';
import { Box } from '@mui/material';
import type { HeaderLinkProps } from '../Types/types';

const HeaderLink = ({ to, children }: HeaderLinkProps) => (
  <Box
    component={RouterLink}
    to={to}
    sx={{
      display: 'flex',
      alignItems: 'center',
      textDecoration: 'none',
      color: 'inherit',
      flexGrow: 1,
      '&:hover': {
        cursor: 'pointer',
        opacity: 0.9,
      }
    }}
  >
    {children}
  </Box>
);

export default HeaderLink; 