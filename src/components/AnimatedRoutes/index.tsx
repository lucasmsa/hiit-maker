import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { PageTransition } from '@steveeeie/react-page-transition';
import Home from '../../pages/Home';
import Workout from '../../pages/Workout';
import Settings from '../../pages/Settings';
import { AnimatePresence } from 'framer-motion/dist/framer-motion';

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/workout" element={<Workout />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </AnimatePresence>
  );
};

export default AnimatedRoutes;
