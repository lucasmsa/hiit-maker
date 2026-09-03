import { createBrowserRouter, type RouteObject } from 'react-router';
import { RoutePlaceholder } from '@/components/RoutePlaceholder';
import { AppShell } from '@/components/shell/AppShell';
import { Splash } from '@/routes/Splash';
import { DevUi } from '@/routes/DevUi';
import { HiitLibrary } from '@/routes/hiit/Library';
import { HiitBuilder } from '@/routes/hiit/Builder';
import { HiitShared } from '@/routes/hiit/Shared';

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
  { path: routes.hiitLibrary, element: <HiitLibrary /> },
  { path: routes.hiitShared, element: <HiitShared /> },
  { path: routes.hiitBuilder, element: <HiitBuilder /> },
  { path: routes.gymLibrary, element: <RoutePlaceholder name="gym library" /> },
  { path: routes.gymPlan, element: <RoutePlaceholder name="gym plan" /> },
  { path: routes.settings, element: <RoutePlaceholder name="settings" /> },
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
