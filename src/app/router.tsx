import { createBrowserRouter, type RouteObject } from 'react-router';
import { RoutePlaceholder } from '@/components/RoutePlaceholder';
import { AppShell } from '@/components/shell/AppShell';
import { Splash } from '@/routes/Splash';
import { DevUi } from '@/routes/DevUi';
import { Settings } from '@/routes/Settings';
import { NotFound } from '@/routes/NotFound';

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
  { path: routes.gymLibrary, element: <RoutePlaceholder name="gym library" /> },
  { path: routes.gymPlan, element: <RoutePlaceholder name="gym plan" /> },
  { path: routes.settings, element: <Settings /> },
  { path: '*', element: <NotFound /> },
];

if (import.meta.env.DEV) {
  shellRoutes.push({ path: '/dev/ui', element: <DevUi /> });
}

export const router = createBrowserRouter([
  { path: routes.splash, element: <Splash /> },
  { element: <AppShell />, children: shellRoutes },
  { path: routes.hiitRun, element: <RoutePlaceholder name="hiit run" /> },
  { path: routes.gymRun, element: <RoutePlaceholder name="gym run" /> },
]);
