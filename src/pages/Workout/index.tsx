import React from 'react';
import LeftBarWorkout from '../../components/Workout/LeftBarWorkout';
import RightBarWorkout from '../../components/Workout/RightBarWorkout';
import SetsProgress from '../../components/Workout/SetsProgress';
import { Container } from './styles';

const Workout = () => {
  return (
    <Container>
      <RightBarWorkout />
    </Container>
  );
};

export default Workout;
