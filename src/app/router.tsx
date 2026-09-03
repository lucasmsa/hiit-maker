import { createBrowserRouter, type RouteObject } from 'react-router';
import { AppShell } from '@/components/shell/AppShell';
import { Splash } from '@/routes/Splash';
import { HiitRun } from '@/routes/hiit/Run';
import { DevUi } from '@/routes/DevUi';
import { Settings } from '@/routes/Settings';
import { NotFound } from '@/routes/NotFound';
import { HiitLibrary } from '@/routes/hiit/Library';
import { HiitBuilder } from '@/routes/hiit/Builder';
import { HiitShared } from '@/routes/hiit/Shared';
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
  { path: routes.hiitLibrary, element: <HiitLibrary /> },
  { path: routes.hiitShared, element: <HiitShared /> },
  { path: routes.hiitBuilder, element: <HiitBuilder /> },
  { path: routes.settings, element: <Settings /> },
  { path: '*', element: <NotFound /> },
  { path: routes.gymLibrary, element: <GymLibrary /> },
  { path: routes.gymPlan, element: <GymPlan /> },
];

if (import.meta.env.DEV) {
  shellRoutes.push({ path: '/dev/ui', element: <DevUi /> });
}

export const router = createBrowserRouter([
  { path: routes.splash, element: <Splash /> },
  { element: <AppShell />, children: shellRoutes },
  { path: routes.hiitRun, element: <HiitRun /> },
  { path: routes.gymRun, element: <GymRun /> },
]);
