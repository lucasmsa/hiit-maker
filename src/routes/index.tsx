import React, { useMemo } from 'react';
import AnimatedDesktopRoutes from '../components/AnimatedRoutes';
import useWindowSize from '../hooks/useWindowSize';
import MobileHome from '../pages/Mobile/Home';

const AppRoutes: React.FC = () => {
  const windowSize = useWindowSize();
  const WINDOW_BREAKPOINT = 1070;

  const windowWidth = useMemo<number>(() => {
    return windowSize.width || WINDOW_BREAKPOINT;
  }, [windowSize.width]);

  return windowWidth >= WINDOW_BREAKPOINT ? <AnimatedDesktopRoutes /> : <MobileHome />;
};

export default AppRoutes;
