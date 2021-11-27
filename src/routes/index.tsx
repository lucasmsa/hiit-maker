import React from 'react'
import Home from '../pages/Home'
import Workout from '../pages/Workout'
import { Route, Switch } from 'react-router-dom'

const AppRoutes: React.FC = () => (
  <Switch>
    <Route path='/' exact component={Home} />
    <Route path='/workout' exact component={Workout} />
  </Switch>
)

export default AppRoutes