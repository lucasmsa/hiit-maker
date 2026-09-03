import { createBrowserRouter, type RouteObject } from 'react-router';
import { RoutePlaceholder } from '@/components/RoutePlaceholder';
import { AppShell } from '@/components/shell/AppShell';
import { Splash } from '@/routes/Splash';
import { DevUi } from '@/routes/DevUi';
import { GymLibrary } from '@/routes/gym/Library';
import { GymPlan } from '@/routes/gym/Plan';
import { GymRun } from '@/routes/gym/Run';

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

const shellRoutes: RouteObject[] = [
  { path: routes.hiitLibrary, element: <RoutePlaceholder name="hiit library" /> },
  { path: routes.hiitShared, element: <RoutePlaceholder name="hiit shared" /> },
  { path: routes.hiitBuilder, element: <RoutePlaceholder name="hiit builder" /> },
  { path: routes.gymLibrary, element: <GymLibrary /> },
  { path: routes.gymPlan, element: <GymPlan /> },
  { path: routes.settings, element: <RoutePlaceholder name="settings" /> },
];

if (import.meta.env.DEV) {
  shellRoutes.push({ path: '/dev/ui', element: <DevUi /> });
}

export const router = createBrowserRouter([
  { path: routes.splash, element: <Splash /> },
  { element: <AppShell />, children: shellRoutes },
  { path: routes.hiitRun, element: <RoutePlaceholder name="hiit run" /> },
  { path: routes.gymRun, element: <GymRun /> },
]);
