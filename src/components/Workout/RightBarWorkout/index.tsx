import React from 'react';
import { connect, useSelector } from 'react-redux';
import { WORKOUT_EXECUTION_STATUS } from '../../../config/contants';
import {
  getNextExercises,
  getWorkoutExecutionStatus
} from '../../../store/workoutExecution/selectors';
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

  return (
    <Container>
      <NextExercisesContainer>
        <NextExercisesTitleText>NEXT EXERCISES</NextExercisesTitleText>
        <NextExercisesDivider />
        <NextExercisesWithImageOuterContainer>
          {nextExercises.length
            ? nextExercises.map(({ name, image }, index) => (
                <NextExercisesWithImageInnerContainer>
                  <ExerciseImage src={image} alt="Next Exercise" />
                  <ExerciseName>{name.toUpperCase()}</ExerciseName>
                </NextExercisesWithImageInnerContainer>
              ))
            : workoutExecutionStatus !== WORKOUT_EXECUTION_STATUS.NOT_STARTED && (
                <NoExercisesLeftText>NO MORE EXERCISES</NoExercisesLeftText>
              )}
        </NextExercisesWithImageOuterContainer>
      </NextExercisesContainer>
      <SetsProgreessContainer>
        <SetsProgress />
      </SetsProgreessContainer>
    </Container>
  );
};

export default connect()(RightBarWorkout);
