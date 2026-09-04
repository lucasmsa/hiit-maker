import { Navigate, useLocation } from 'react-router';

export function legacyTarget(pathname: string): string {
  if (pathname === '/hiit/shared') {
    return '/shared';
  }
  const workout = /^\/hiit\/([^/]+)(\/run)?$/.exec(pathname);
  if (workout) {
    return `/w/${workout[1]}${workout[2] ?? ''}`;
  }
  return '/';
}

export function LegacyPathRedirect() {
  const location = useLocation();
  return (
    <Navigate
      to={{
        pathname: legacyTarget(location.pathname),
        search: location.search,
        hash: location.hash,
      }}
      replace
    />
  );
}
