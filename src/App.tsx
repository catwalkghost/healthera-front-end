import { ThemeProvider, CssBaseline } from '@mui/material';
import { useEffect } from 'react';
import { router } from './router';
import theme from './Lib/Theme/Theme';
import { loadInterFont } from './Lib/Theme/Typography';
import { RouterProvider } from 'react-router-dom';

const App = () => {
  // Load the Inter font when the app initializes
  useEffect(() => {
    loadInterFont();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      {/* CssBaseline normalizes styles across browsers */}
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
};

export default App;
