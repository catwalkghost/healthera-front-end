import { lazy, Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';

// Lazy load the route components
const PrescriptionList = lazy(() => import('./pages/PrescriptionList'));
const PrescriptionDetails = lazy(() => import('./pages/PrescriptionDetails'));

// Loading fallback for lazy-loaded routes
const LoadingFallback = () => (
  <div aria-live="polite" role="status">
    <p>Loading...</p>
  </div>
);

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <PrescriptionList />
      </Suspense>
    ),
  },
  {
    path: '/prescriptions/:id',
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <PrescriptionDetails />
      </Suspense>
    ),
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

export default router; 