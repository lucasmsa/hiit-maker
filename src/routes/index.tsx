import React, { useMemo } from 'react';
import AnimatedDesktopRoutes from '../components/AnimatedRoutes';
import useWindowSize from '../hooks/useWindowSize';
import MobileHome from '../pages/Mobile/Home';

interface ICurrentWindowSize {
  width: number;
  height: number;
}

const AppRoutes: React.FC = () => {
  const windowSizeHook = useWindowSize();
  const WINDOW_WIDTH_BREAKPOINT = 1070;
  const WINDOW_HEIGHT_BREAKPOINT = 615;

  const currentWindowSize = useMemo<ICurrentWindowSize>(() => {
    return {
      width: windowSizeHook.width || WINDOW_WIDTH_BREAKPOINT,
      height: windowSizeHook.height || WINDOW_HEIGHT_BREAKPOINT
    };
  }, [windowSizeHook.width, windowSizeHook.height]);

  return currentWindowSize.width >= WINDOW_WIDTH_BREAKPOINT &&
    currentWindowSize.height >= WINDOW_HEIGHT_BREAKPOINT ? (
    <AnimatedDesktopRoutes />
  ) : (
    <MobileHome />
  );
};

export default AppRoutes;
