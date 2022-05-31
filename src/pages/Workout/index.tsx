import React from 'react';
import { connect, useSelector } from 'react-redux';
import RightBarWorkout from '../../components/Workout/RightBarWorkout';
import TrainingNotCreatedModal from '../../components/Workout/TrainingNotCreatedModal';
import WorkoutVisualization from '../../components/Workout/WorkoutVisualization';
import { WORKOUT_EXECUTION_STATUS } from '../../config/contants';
import { getWorkoutExecutionStatus } from '../../store/workoutExecution/selectors';
import { Container } from './styles';

const Workout = () => {
  const workoutExecutionStatus = useSelector(getWorkoutExecutionStatus);
  console.log('workoutExecutionStatus', workoutExecutionStatus);
  
  return (
    <Container>
      <WorkoutVisualization />
      <RightBarWorkout />
      <TrainingNotCreatedModal modalOpen={workoutExecutionStatus === WORKOUT_EXECUTION_STATUS.NOT_STARTED} />
    </Container>
  );
};

export default connect()(Workout);
