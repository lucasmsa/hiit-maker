import React from 'react';
import Home from '../pages/Home';
import Workout from '../pages/Workout';
import { Route, Routes, useLocation } from 'react-router-dom';
import { PageTransition } from '@steveeeie/react-page-transition';
import Settings from '../pages/Settings';
import AnimatedRoutes from '../components/AnimatedRoutes';

const AppRoutes: React.FC = () => {
  return <AnimatedRoutes />;
};

export default AppRoutes;
