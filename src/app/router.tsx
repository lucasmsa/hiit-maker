import { createBrowserRouter } from 'react-router';
import { RoutePlaceholder } from '@/components/RoutePlaceholder';

export const routes = {
  splash: '/',
  hiitLibrary: '/hiit',
  hiitBuilder: '/hiit/:id',
  hiitRun: '/hiit/:id/run',
  hiitShared: '/hiit/shared',
  gymLibrary: '/gym',
  gymPlan: '/gym/:id',
  gymRun: '/gym/:id/run',
  settings: '/settings',
} as const;

export const router = createBrowserRouter([
  { path: routes.splash, element: <RoutePlaceholder name="splash" /> },
  { path: routes.hiitLibrary, element: <RoutePlaceholder name="hiit library" /> },
  { path: routes.hiitShared, element: <RoutePlaceholder name="hiit shared" /> },
  { path: routes.hiitBuilder, element: <RoutePlaceholder name="hiit builder" /> },
  { path: routes.hiitRun, element: <RoutePlaceholder name="hiit run" /> },
  { path: routes.gymLibrary, element: <RoutePlaceholder name="gym library" /> },
  { path: routes.gymPlan, element: <RoutePlaceholder name="gym plan" /> },
  { path: routes.gymRun, element: <RoutePlaceholder name="gym run" /> },
  { path: routes.settings, element: <RoutePlaceholder name="settings" /> },
]);
