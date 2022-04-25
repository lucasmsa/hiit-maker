import React, { useMemo, useState } from 'react';
import { ReactComponent as TargetMusclesFront } from '../../../assets/images/WorkoutInformation/targetMusclesFront.svg';
import { ReactComponent as TargetMusclesBack } from '../../../assets/images/WorkoutInformation/targetMusclesBack.svg';
import { ReactComponent as ClockIcon } from '../../../assets/images/WorkoutInformation/icons/clock.svg';
import { ReactComponent as TargetMusclesIcon } from '../../../assets/images/WorkoutInformation/icons/targetMuscles.svg';
import { ReactComponent as ColoredChestIcon } from '../../../assets/images/WorkoutInformation/coloredChest.svg';
import { ReactComponent as ColoredAbsIcon } from '../../../assets/images/WorkoutInformation/coloredAbs.svg';
import { ReactComponent as ColoredBackIcon } from '../../../assets/images/WorkoutInformation/coloredBack.svg';
import { ReactComponent as ColoredLegsIcon } from '../../../assets/images/WorkoutInformation/coloredLegs.svg';
import { ReactComponent as ManRunningIcon } from '../../../assets/images/WorkoutInformation/icons/manRunning.svg';
import {
  Container,
  TargetMusclesContainer,
  MuscleGroupImagesContainer,
  TotalTimeContainer,
  TrainingDurationContainer,
  TrainingDurationText,
  StartTrainingContainer,
  FrontContainer,
  BackContainer,
  PlayButton,
  PlayButtonHovered
} from './styles';
import { toast } from 'react-hot-toast';
import { shallowEqual, useSelector } from 'react-redux';
import {
  getTotalTrainingTime,
  getAfflictedBodyParts,
  getTrainSetLoops,
  getTrainingDefaultValues
} from '../../../store/training/selectors';
import { secondsToHourFormat } from '../../../utils/secondsToHourFormat';
import ErrorToast from '../../../toasts/ErrorToast';
import { Link } from 'react-router-dom';
import InformationHeaderSection from '../InformationHeaderSection';

const WorkoutInformation = () => {
  const totalTrainingTime = useSelector(getTotalTrainingTime, shallowEqual) || 0;
  const afflictedBodyParts = useSelector(getAfflictedBodyParts, shallowEqual) || {};
  const trainSetLoops = useSelector(getTrainSetLoops, shallowEqual) || {};
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
    if (!atLeastOneExerciseWasAddedOnEverySet()) {
      toast(
        ErrorToast({
          message: 'You must have at least one exercise on every set to start a new workout',
          cannotBuildWorkout: true
        })
      );
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
          <FrontContainer>
            <ColoredChestIcon
              style={{
                zIndex: 2,
                position: 'relative',
                top: '22%',
                left: '68%',
                opacity: afflictedBodyParts.Chest
              }}
            />
            <ColoredAbsIcon
              style={{
                zIndex: 2,
                position: 'relative',
                top: '38%',
                left: '50%',
                opacity: afflictedBodyParts.Core
              }}
            />
            <ColoredLegsIcon
              style={{
                zIndex: 2,
                position: 'relative',
                top: '55%',
                left: '32%',
                opacity: afflictedBodyParts.Legs
              }}
            />
            <TargetMusclesFront style={{ zIndex: 0 }} />
          </FrontContainer>
          <BackContainer>
            <ColoredBackIcon
              style={{
                zIndex: 2,
                position: 'relative',
                top: '18%',
                left: '50%',
                opacity: afflictedBodyParts.Back
              }}
            />
            <TargetMusclesBack />
          </BackContainer>
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
