import React from 'react';
import { ReactComponent as RedCircleToastIcon } from '../../assets/images/midSection/redCircle.svg';
import { ReactComponent as CannotBuildWorkoutIcon } from '../../assets/images/midSection/cannotBuildWorkout.svg';
import {
  ExercisesLimitToastHeaderText,
  ExercisesLimitToastContainer,
  ExercisesLimitToastBottomText
} from './styles';

interface ErrorToastProps {
  message: string;
  cannotBuildWorkout?: boolean;
}

const ErrorToast = ({ message, cannotBuildWorkout }: ErrorToastProps) => {
  return (
    <ExercisesLimitToastContainer>
      <ExercisesLimitToastHeaderText>This action is not possible</ExercisesLimitToastHeaderText>
      {cannotBuildWorkout! ? <CannotBuildWorkoutIcon /> : <RedCircleToastIcon />}
      <ExercisesLimitToastBottomText>{message}</ExercisesLimitToastBottomText>
    </ExercisesLimitToastContainer>
  );
};

export default ErrorToast;
