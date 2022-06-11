import React, { useState } from 'react';
import { connect, useSelector } from 'react-redux';
import { getNextExercises } from '../../../store/workoutExecution/selectors';
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
  SetsProgreessContainer
} from './styles';

const RightBarWorkout = () => {
  const nextExercises = useSelector(getNextExercises);

  return (
    <Container>
      <NextExercisesContainer>
        <NextExercisesTitleText>NEXT EXERCISES</NextExercisesTitleText>
        <NextExercisesDivider />
        <NextExercisesWithImageOuterContainer>
          {nextExercises.map(({ name, image }, index) => (
            <NextExercisesWithImageInnerContainer>
              <ExerciseImage src={image} alt="Next Exercise" />
              <ExerciseName>{name.toUpperCase()}</ExerciseName>
            </NextExercisesWithImageInnerContainer>
          ))}
        </NextExercisesWithImageOuterContainer>
      </NextExercisesContainer>
      <SetsProgreessContainer>
        <SetsProgress />
      </SetsProgreessContainer>
    </Container>
  );
};

export default connect()(RightBarWorkout);
