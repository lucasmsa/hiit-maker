import React from 'react';
import LeftBarWorkout from '../../components/Workout/LeftBarWorkout';
import SetsProgress from '../../components/Workout/SetsProgress';
import { Container } from './styles';

const Workout = () => {
  return (
    <Container>
      <LeftBarWorkout />
      <SetsProgress />
    </Container>
  );
};

export default Workout;
