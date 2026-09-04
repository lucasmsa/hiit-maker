import { createBrowserRouter, type RouteObject } from 'react-router';
import { AppShell } from '@/components/shell/AppShell';
import { HiitRun } from '@/routes/hiit/Run';
import { DevUi } from '@/routes/DevUi';
import { Settings } from '@/routes/Settings';
import { NotFound } from '@/routes/NotFound';
import { HiitBuilder } from '@/routes/hiit/Builder';
import { HiitShared } from '@/routes/hiit/Shared';
import { LegacyPathRedirect } from '@/routes/LegacyPathRedirect';

export const routes = {
  builder: '/',
  workout: '/w/:id',
  run: '/w/:id/run',
  shared: '/shared',
  settings: '/settings',
} as const;

const legacyPaths = ['/hiit', '/hiit/shared', '/hiit/:id', '/hiit/:id/run', '/gym', '/gym/*'];

const shellRoutes: RouteObject[] = [
  { path: routes.shared, element: <HiitShared /> },
  { path: routes.settings, element: <Settings /> },
  { path: '*', element: <NotFound /> },
];

if (import.meta.env.DEV) {
  shellRoutes.push({ path: '/dev/ui', element: <DevUi /> });
}

export const router = createBrowserRouter([
  { path: routes.builder, element: <HiitBuilder /> },
  { path: routes.workout, element: <HiitBuilder /> },
  { path: routes.run, element: <HiitRun /> },
  ...legacyPaths.map((path) => ({ path, element: <LegacyPathRedirect /> })),
  { element: <AppShell />, children: shellRoutes },
]);
