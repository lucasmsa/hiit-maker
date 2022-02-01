import React from 'react'
import Home from '../pages/Home'
import Workout from '../pages/Workout'
import { Route, Switch } from 'react-router-dom'
import Settings from '../pages/Settings'

const AppRoutes: React.FC = () => (
  <Switch>
    <Route path='/' exact component={Home} />
    <Route path='/workout' exact component={Workout} />
    <Route path='/settings' exact component={Settings} />
  </Switch>
)

export default AppRoutes