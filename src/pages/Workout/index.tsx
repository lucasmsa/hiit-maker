import React, { useEffect } from 'react';
import { connect, useSelector } from 'react-redux';
import RightBarWorkout from '../../components/Workout/RightBarWorkout';
import TrainingNotCreatedModal from '../../components/Workout/TrainingNotCreatedModal';
import WorkoutVisualization from '../../components/Workout/WorkoutVisualization';
import { WORKOUT_EXECUTION_STATUS } from '../../config/contants';
import { getWorkoutExecutionStatus } from '../../store/workoutExecution/selectors';
import { Container } from './styles';

const Workout = () => {
  const workoutExecutionStatus = useSelector(getWorkoutExecutionStatus);
  const workoutDidNotStart = workoutExecutionStatus === WORKOUT_EXECUTION_STATUS.NOT_STARTED;

  return (
    <Container>
      <WorkoutVisualization />
      <RightBarWorkout />
      <TrainingNotCreatedModal modalOpen={workoutDidNotStart} />
    </Container>
  );
};

export default connect()(Workout);
