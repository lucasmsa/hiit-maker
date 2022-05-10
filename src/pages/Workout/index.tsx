import React from 'react';
import RightBarWorkout from '../../components/Workout/RightBarWorkout';
import WorkoutVisualization from '../../components/Workout/WorkoutVisualization';
import { Container } from './styles';

const Workout = () => {
  return (
    <Container>
      <WorkoutVisualization />
      <RightBarWorkout />
    </Container>
  );
};

export default Workout;
