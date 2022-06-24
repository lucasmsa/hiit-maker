import { AnimatePresence, AnimateSharedLayout, motion } from 'framer-motion/dist/framer-motion';
import React, { useCallback } from 'react';
import { connect, useSelector } from 'react-redux';
import { WORKOUT_EXECUTION_STATUS } from '../../../../config/contants';
import {
  getNextExercises,
  getWorkoutExecutionStatus
} from '../../../../store/workoutExecution/selectors';
import SetsProgress from '../SetsProgress';
import {
  Container,
  ExerciseImage,
  ExerciseName,
  NextExercisesContainer,
  NextExercisesDivider,
  NextExercisesTitleText,
  NextExercisesWithImageInnerContainer,
  NextExercisesWithImageOuterContainer,
  NoExercisesLeftText,
  SetsProgreessContainer
} from './styles';

const RightBarWorkout = () => {
  const nextExercises = useSelector(getNextExercises);
  const workoutExecutionStatus = useSelector(getWorkoutExecutionStatus);
  const nextExercisesMotionStyles = {
    marginLeft: '0.5rem',
    marginRight: '0.5rem',
    alignItems: 'center',
    marginBottom: 'auto'
  };

  const nextExercisesMap = useCallback(() => {
    return nextExercises.map(({ name, image }, _index) => (
      <motion.div
        layout
        transition={{
          type: 'spring',
          stiffness: 350,
          damping: 25
        }}
        style={nextExercisesMotionStyles}>
        <NextExercisesWithImageInnerContainer>
          <ExerciseImage src={image} alt="Next Exercise" />
          <ExerciseName>{name.toUpperCase()}</ExerciseName>
        </NextExercisesWithImageInnerContainer>
      </motion.div>
    ));
  }, [nextExercises]);

  return (
    <Container>
      <NextExercisesContainer>
        <NextExercisesTitleText>NEXT EXERCISES</NextExercisesTitleText>
        <NextExercisesDivider />
        <NextExercisesWithImageOuterContainer>
          <AnimateSharedLayout>
            {nextExercises.length
              ? nextExercisesMap()
              : workoutExecutionStatus !== WORKOUT_EXECUTION_STATUS.NOT_STARTED && (
                  <NoExercisesLeftText>NO MORE EXERCISES</NoExercisesLeftText>
                )}
          </AnimateSharedLayout>
        </NextExercisesWithImageOuterContainer>
      </NextExercisesContainer>
      <SetsProgreessContainer>
        {workoutExecutionStatus !== WORKOUT_EXECUTION_STATUS.NOT_STARTED && <SetsProgress />}
      </SetsProgreessContainer>
    </Container>
  );
};

export default connect()(RightBarWorkout);
