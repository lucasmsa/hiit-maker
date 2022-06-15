import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  BannerContainer,
  BannerIcon,
  BottomContainer,
  BrandingIcon,
  Container,
  HeaderContainer,
  BottomStatusText,
  HeaderSetAndLogoContainer,
  TimeCountdownText,
  BackToHomeButtonContainer,
  BackToHomeText,
  BackToHomeButton,
  BannerExerciseImage
} from './styles';
import InformationHeaderSection from '../../Home/InformationHeaderSection';
import { connect, useDispatch, useSelector } from 'react-redux';
import { White } from '../../../styles/global';
import { secondsToHourFormat } from '../../../utils/secondsToHourFormat';
import { PlayButtonHovered, PlayButton } from '../../PlayAndStopButtons/styles';
import { statusInformations } from '../../../utils/workout/statusInformations';
import {
  getCurrentActionRemainingTime,
  getWorkoutExecutionCurrentExercise,
  getWorkoutExecutionCurrentSet,
  getWorkoutExecutionPlayState,
  getWorkoutExecutionStatus
} from '../../../store/workoutExecution/selectors';
import { ReactComponent as WarmupIcon } from '../../../assets/images/WorkoutScreen/warmup.svg';
import { PLAY_STATE, WORKOUT_EXECUTION_STATUS } from '../../../config/contants';
import {
  getCurrentSetExercises,
  getTrainingDefaultValues,
  getTrainSetLoops
} from '../../../store/training/selectors';
import { Link } from 'react-router-dom';
import {
  updateCurrentActionRemainingTime,
  updatePlayState,
  updateWorkoutExecutionActionTransition
} from '../../../store/workoutExecution/actionCreators';

const WorkoutVisualization = () => {
  const dispatch = useDispatch();
  const workoutExecutionStatus = useSelector(getWorkoutExecutionStatus);
  const currentRemainingTime = useSelector(getCurrentActionRemainingTime);
  const currentSet = useSelector(getWorkoutExecutionCurrentSet);
  const currentExercise = useSelector(getWorkoutExecutionCurrentExercise);
  const training = useSelector(getTrainSetLoops);
  const setExercises = useSelector(() => getCurrentSetExercises(training, currentSet));
  const playState = useSelector(getWorkoutExecutionPlayState);
  const { warmupTime } = useSelector(getTrainingDefaultValues);
  const [playButtonHovered, setPlayButtonHovered] = useState(false);

  const statusTime = {
    [WORKOUT_EXECUTION_STATUS.WARMUP]: warmupTime
  };

  const statusHeaderTitle = {
    [WORKOUT_EXECUTION_STATUS.WARMUP]: 'WARMUP',
    [WORKOUT_EXECUTION_STATUS.TRAIN]: 'TRAIN',
    [WORKOUT_EXECUTION_STATUS.REST]: 'REST TIME',
    [WORKOUT_EXECUTION_STATUS.FINISH]: 'FINISH'
  };

  const handleBannerInformations = useCallback(() => {
    const currentStatus = playState === 'PAUSE' ? playState : workoutExecutionStatus;
    if (statusInformations[currentStatus].icon === 'WARMUP_ICON') {
      return <WarmupIcon width={'10vw'} />;
    } else if (statusInformations[currentStatus].icon === 'EXERCISE_IMAGE') {
      return (
        <BannerExerciseImage
          src={setExercises[currentExercise].image}
          alt={setExercises[currentExercise].name}
        />
      );
    } else {
      return <BannerIcon icon={statusInformations[currentStatus].icon} color={White} />;
    }
  }, [workoutExecutionStatus, playState]);

  const playButton = (
    <>
      {playButtonHovered ? (
        <PlayButtonHovered
          paused={playState === PLAY_STATE.PAUSE}
          onClick={() => {
            dispatch(updatePlayState());
          }}
          onMouseLeave={() => setPlayButtonHovered(false)}
        />
      ) : (
        <PlayButton
          paused={playState === PLAY_STATE.PAUSE}
          onMouseEnter={() => setPlayButtonHovered(true)}
        />
      )}
    </>
  );

  useEffect(() => {
    const timerRunning =
      workoutExecutionStatus !== WORKOUT_EXECUTION_STATUS.NOT_STARTED &&
      workoutExecutionStatus !== WORKOUT_EXECUTION_STATUS.FINISH &&
      playState !== PLAY_STATE.PAUSE;

    if (timerRunning) {
      if (!currentRemainingTime) {
        dispatch(updateWorkoutExecutionActionTransition());
      }
      const interval = setInterval(() => {
        dispatch(updateCurrentActionRemainingTime(currentRemainingTime - 1));
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [currentRemainingTime, workoutExecutionStatus, playState]);

  const formattedStatusTime = useMemo(
    () => secondsToHourFormat(currentRemainingTime || 0),
    [currentRemainingTime]
  );

  return (
    <Container>
      <HeaderContainer>
        <HeaderSetAndLogoContainer>
          <InformationHeaderSection
            title={statusHeaderTitle[workoutExecutionStatus]}
            backgroundColor="BLACK"
            small
            reverse
          />
          <Link to="/">
            <BrandingIcon />
          </Link>
        </HeaderSetAndLogoContainer>
        {workoutExecutionStatus !== WORKOUT_EXECUTION_STATUS.WARMUP && (
          <InformationHeaderSection
            title={`Set ${currentSet + 1}/${training.length}`}
            backgroundColor="BLACK"
            medium
            reverse
          />
        )}
      </HeaderContainer>
      <BannerContainer>{handleBannerInformations()}</BannerContainer>
      <BottomContainer>
        <BottomStatusText>
          {
            statusInformations[playState === 'PAUSE' ? playState : workoutExecutionStatus]
              .bottomText
          }
        </BottomStatusText>
        <TimeCountdownText>{formattedStatusTime}</TimeCountdownText>
        {workoutExecutionStatus === WORKOUT_EXECUTION_STATUS.FINISH ? (
          <BackToHomeButtonContainer to={'/'}>
            <BackToHomeButton>
              <BackToHomeText>BACK TO HOME</BackToHomeText>
            </BackToHomeButton>
          </BackToHomeButtonContainer>
        ) : (
          playButton
        )}
      </BottomContainer>
    </Container>
  );
};

export default connect()(WorkoutVisualization);
