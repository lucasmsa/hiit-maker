import React from 'react';
import { connect, useSelector } from 'react-redux';
import { motion } from 'framer-motion/dist/framer-motion';
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
    <motion.div
      initial={{ x: window.innerWidth, overflow: 'hidden' }}
      animate={{ x: 0, overflow: 'hidden' }}
      transition={{
        type: 'spring',
        duration: 1,
        overflow: 'hidden'
      }}>
      <Container>
        <WorkoutVisualization />
        <RightBarWorkout />
        <TrainingNotCreatedModal modalOpen={workoutDidNotStart} />
      </Container>
    </motion.div>
  );
};

export default connect()(Workout);
