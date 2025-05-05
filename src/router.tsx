import { lazy, Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Layout from './Components/Layout';
import LoadingFallback from './Components/LoadingFallback';

// Lazy load the route components
const PrescriptionList = lazy(() => import('./Pages/PrescriptionList'));
const PrescriptionDetails = lazy(() => import('./Pages/PrescriptionDetails'));

// Use exported router rather than default export for better Fast Refresh compatibility
export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '',
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <PrescriptionList />
          </Suspense>
        ),
      },
      {
        path: 'prescriptions/:id',
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <PrescriptionDetails />
          </Suspense>
        ),
      },
    ]
  },
  {
    path: '*',
    element: (
      <main>
        <h1>404 - Page Not Found</h1>
        <p>The page you are looking for does not exist.</p>
      </main>
    ),
  },
]); 