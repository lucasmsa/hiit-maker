import { AnimatePresence, motion } from 'framer-motion/dist/framer-motion';
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
  const nextExercisesMotionAnimations = {
    initial: { opacity: 0, x: 10 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.4 }
  };

  const nextExercisesMap = useCallback(() => {
    return nextExercises.map(({ name, image }, index) => (
      <motion.div
        key={`${name}-${index}`}
        initial={nextExercisesMotionAnimations.initial}
        animate={nextExercisesMotionAnimations.animate}
        transition={nextExercisesMotionAnimations.transition}
        style={nextExercisesMotionStyles}>
        <NextExercisesWithImageInnerContainer key={index}>
          <ExerciseImage src={image} alt="Next Exercise" />
          <ExerciseName>{name.toUpperCase()}</ExerciseName>
        </NextExercisesWithImageInnerContainer>
      </motion.div>
    ));
  }, [nextExercises, nextExercisesMotionAnimations, nextExercisesMotionStyles]);

  return (
    <Container>
      <NextExercisesContainer>
        <NextExercisesTitleText>NEXT EXERCISES</NextExercisesTitleText>
        <NextExercisesDivider />
        <NextExercisesWithImageOuterContainer>
          <AnimatePresence presenceAffectsLayout>
            {nextExercises.length
              ? nextExercisesMap()
              : workoutExecutionStatus !== WORKOUT_EXECUTION_STATUS.NOT_STARTED && (
                  <NoExercisesLeftText>NO MORE EXERCISES</NoExercisesLeftText>
                )}
          </AnimatePresence>
        </NextExercisesWithImageOuterContainer>
      </NextExercisesContainer>
      <SetsProgreessContainer>
        {workoutExecutionStatus !== WORKOUT_EXECUTION_STATUS.NOT_STARTED && <SetsProgress />}
      </SetsProgreessContainer>
    </Container>
  );
};

export default connect()(RightBarWorkout);
