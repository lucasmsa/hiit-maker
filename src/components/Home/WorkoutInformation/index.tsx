import React, { useMemo, useState } from 'react';
import {
  Container,
  TargetMusclesContainer,
  MuscleGroupImagesContainer,
  TotalTimeContainer,
  TrainingDurationContainer,
  TrainingDurationText,
  StartTrainingContainer,
  TargetMusclesIcon,
  ClockIcon,
  ManRunningIcon
} from './styles';
import { toast } from 'react-hot-toast';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { getTotalTrainingTime, getTrainSetLoops } from '../../../store/training/selectors';
import { secondsToHourFormat } from '../../../utils/secondsToHourFormat';
import ErrorToast from '../../../toasts/ErrorToast';
import { Link } from 'react-router-dom';
import InformationHeaderSection from '../InformationHeaderSection';
import { PlayButton, PlayButtonHovered } from '../../PlayAndStopButtons/styles';
import {
  resetWorkoutExecution,
  startTraining
} from '../../../store/workoutExecution/actionCreators';
import { Dispatch } from 'redux';
import MuscleGroupsSection from '../MuscleGroupsSection';
import { getWorkoutExecutionStatus } from '../../../store/workoutExecution/selectors';
import { WORKOUT_EXECUTION_STATUS } from '../../../config/contants';
import { resetWorkout } from '../../../store/training/actionCreators';

const WorkoutInformation = () => {
  const dispatch: Dispatch<any> = useDispatch();
  const totalTrainingTime = useSelector(getTotalTrainingTime, shallowEqual) || 0;
  const trainSetLoops = useSelector(getTrainSetLoops, shallowEqual) || {};
  const workoutExecutionStatus = useSelector(getWorkoutExecutionStatus);
  const formattedTotalTrainingTime = useMemo(
    () => secondsToHourFormat(totalTrainingTime),
    [totalTrainingTime]
  );
  const [playButtonHovered, setPlayButtonHovered] = useState(false);

  const atLeastOneExerciseWasAddedOnEverySet = () => {
    return trainSetLoops.every((trainSetLoop: TrainSetLoop) => {
      return trainSetLoop.trainSet.exercises.length !== 0;
    });
  };

  const handlePlayButtonClick = () => {
    const workoutFinishedOrWasNotStartedYet =
      workoutExecutionStatus === WORKOUT_EXECUTION_STATUS.NOT_STARTED ||
      workoutExecutionStatus === WORKOUT_EXECUTION_STATUS.FINISH;

    if (!atLeastOneExerciseWasAddedOnEverySet()) {
      toast(
        ErrorToast({
          message: 'You must have at least one exercise on every set to start a new workout',
          cannotBuildWorkout: true
        })
      );
    } else if (workoutFinishedOrWasNotStartedYet) {
      if (workoutExecutionStatus === WORKOUT_EXECUTION_STATUS.FINISH) {
        dispatch(resetWorkoutExecution());
      }
      dispatch(startTraining());
    }
  };

  const playButtonWithoutLink = (
    <>
      {playButtonHovered ? (
        <PlayButtonHovered
          onClick={handlePlayButtonClick}
          onMouseLeave={() => setPlayButtonHovered(false)}
        />
      ) : (
        <PlayButton onMouseEnter={() => setPlayButtonHovered(true)} />
      )}
    </>
  );

  const playButtonWithLink = (
    <Link
      style={{ alignSelf: 'center' }}
      to={atLeastOneExerciseWasAddedOnEverySet() ? '/workout' : '/'}>
      {playButtonWithoutLink}
    </Link>
  );

  return (
    <Container>
      <TargetMusclesContainer>
        <InformationHeaderSection
          backgroundColor={'BLACK'}
          icon={<TargetMusclesIcon />}
          title={'Target muscles'}
        />
        <MuscleGroupImagesContainer>
          <MuscleGroupsSection />
        </MuscleGroupImagesContainer>
      </TargetMusclesContainer>
      <TotalTimeContainer>
        <InformationHeaderSection
          icon={<ClockIcon />}
          title={'Total Time'}
          backgroundColor={'BLACK'}
        />
        <TrainingDurationContainer>
          <TrainingDurationText>{formattedTotalTrainingTime}</TrainingDurationText>
        </TrainingDurationContainer>
      </TotalTimeContainer>
      <StartTrainingContainer>
        <InformationHeaderSection
          icon={<ManRunningIcon />}
          title={'Start now'}
          backgroundColor={'RED'}
        />
        {playButtonWithLink}
      </StartTrainingContainer>
    </Container>
  );
};

export default WorkoutInformation;
