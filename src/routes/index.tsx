import React from 'react'
import Home from '../pages/Home'
import Workout from '../pages/Workout'
import { Route, Routes } from 'react-router-dom'

const AppRoutes: React.FC = () => (
  <Routes>
    <Route path='/' element={<Home />} />
    <Route path='/workout' element={<Workout />} />
  </Routes>
)

export default AppRoutes