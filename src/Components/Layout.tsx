import { AppBar, Toolbar, Typography, Container, Box, Chip, Tooltip } from '@mui/material';
import { Outlet } from 'react-router-dom';
import LocalPharmacyIcon from '@mui/icons-material/LocalPharmacy';
import HeaderLink from './HeaderLink';

const Layout = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', width: '100%', overflowX: 'hidden' }}>
      <AppBar 
        position="fixed" 
        color="primary" 
        elevation={1} 
        sx={{ 
          zIndex: theme => theme.zIndex.drawer + 1,
          boxShadow: '0 1px 4px rgba(0, 0, 0, 0.1)',
          width: '100vw',
          left: 0,
          right: 0,
          borderRadius: 0
        }}
      >
        <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3 } }}>
          <Toolbar disableGutters>
            <HeaderLink to="/">
              <LocalPharmacyIcon sx={{ mr: 1.5, fontSize: 26 }} />
              <Typography
                variant="h6"
                component="h1"
                fontWeight={600}
                letterSpacing={0.5}
              >
                Healthera Prescriptions
              </Typography>
            </HeaderLink>
            
            {/* Mock API indicator */}
            {import.meta.env.DEV && (
              <Tooltip title="Mock API active" arrow>
                <Chip
                  label="🧪 Mock API"
                  size="small"
                  variant="outlined"
                  sx={{
                    opacity: 0.6,
                    color: 'white',
                    borderColor: 'rgba(255, 255, 255, 0.5)',
                    '& .MuiChip-label': {
                      px: 1,
                    },
                    ml: 2
                  }}
                />
              </Tooltip>
            )}
          </Toolbar>
        </Container>
      </AppBar>
      
      {/* Toolbar placeholder to prevent content from hiding under AppBar */}
      <Toolbar />
      
      <Box 
        component="main" 
        sx={{ 
          flexGrow: 1, 
          width: '100%', 
          pb: { xs: 2, sm: 3, md: 4 }
        }}
      >
        <Outlet />
      </Box>
      
      <Box
        component="footer"
        sx={{
          py: 2,
          px: 2,
          mt: 'auto',
          backgroundColor: theme => theme.palette.grey[100]
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="body2" color="text.secondary" align="center">
            Made with 💙 in {new Date().getFullYear()}
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default Layout; 