import React, { useState } from 'react';
import {
  Container,
  ExerciseImage,
  ExerciseName,
  NextExercisesContainer,
  NextExercisesDivider,
  NextExercisesTitleText,
  NextExercisesWithImageInnerContainer,
  NextExercisesWithImageOuterContainer
} from './styles';

const RightBarWorkout = () => (
  <Container>
    <NextExercisesContainer>
      <NextExercisesTitleText>NEXT EXERCISES</NextExercisesTitleText>
      <NextExercisesDivider />
      <NextExercisesWithImageOuterContainer>
        <NextExercisesWithImageInnerContainer>
          <ExerciseImage
            src="https://media.self.com/photos/5f92e43c203d630746a35e0f/4:3/w_2560%2Cc_limit/Erica_Dead-stop-push-up.jpg"
            alt="Next Exercise"
          />
          <ExerciseName>PUSH UP</ExerciseName>
        </NextExercisesWithImageInnerContainer>
        <NextExercisesWithImageInnerContainer>
          <ExerciseImage
            src="https://qph.fs.quoracdn.net/main-qimg-4105302bd7ccde31124497ebf4b5ce52"
            alt="Next Exercise"
          />
          <ExerciseName>REGULAR SQUATS</ExerciseName>
        </NextExercisesWithImageInnerContainer>
      </NextExercisesWithImageOuterContainer>
    </NextExercisesContainer>
  </Container>
);

export default RightBarWorkout;
