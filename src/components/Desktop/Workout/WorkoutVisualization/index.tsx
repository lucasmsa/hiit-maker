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
import { White } from '../../../../styles/global';
import { secondsToHourFormat } from '../../../../utils/secondsToHourFormat';
import {
  PlayButtonHovered,
  PlayButton,
  PausedButton,
  PausedButtonHovered
} from '../../../PlayAndStopButtons/styles';
import { statusInformations } from '../../../../utils/workout/statusInformations';
import {
  getCurrentActionRemainingTime,
  getWorkoutExecutionCurrentExercise,
  getWorkoutExecutionCurrentSet,
  getWorkoutExecutionPlayState,
  getWorkoutExecutionStatus
} from '../../../../store/workoutExecution/selectors';
import { ReactComponent as WarmupIcon } from '../../../../assets/images/WorkoutScreen/warmup.svg';
import { PLAY_STATE, WORKOUT_EXECUTION_STATUS } from '../../../../config/contants';
import { getCurrentSetExercises, getTrainSetLoops } from '../../../../store/training/selectors';
import { Link } from 'react-router-dom';
import {
  updateCurrentActionRemainingTime,
  updatePlayState,
  updateWorkoutExecutionActionTransition
} from '../../../../store/workoutExecution/actionCreators';
import { AnimatePresence, motion } from 'framer-motion/dist/framer-motion';

const WorkoutVisualization = () => {
  const dispatch = useDispatch();
  const workoutExecutionStatus = useSelector(getWorkoutExecutionStatus);
  const currentRemainingTime = useSelector(getCurrentActionRemainingTime);
  const currentSet = useSelector(getWorkoutExecutionCurrentSet);
  const currentExerciseIndex = useSelector(getWorkoutExecutionCurrentExercise);
  const training = useSelector(getTrainSetLoops);
  const setExercises = useSelector(() => getCurrentSetExercises(training, currentSet));
  const playState = useSelector(getWorkoutExecutionPlayState);
  const [playButtonHovered, setPlayButtonHovered] = useState(false);
  const iconAnimation = {
    initial: { scale: 1.3 },
    animate: { scale: 1.1 },
    exit: { scale: 0 },
    transition: { duration: 0.3 }
  };

  const otherIconAnimation = {
    initial: { scale: 1.3 },
    animate: { scale: 1 },
    exit: { scale: 0 },
    transition: { duration: 0.3 }
  };

  const statusHeaderTitle = {
    [WORKOUT_EXECUTION_STATUS.WARMUP]: 'WARMUP',
    [WORKOUT_EXECUTION_STATUS.TRAIN]:
      workoutExecutionStatus !== WORKOUT_EXECUTION_STATUS.NOT_STARTED
        ? `EXERCISE ${currentExerciseIndex + 1}/${setExercises.length}: ${setExercises[
            currentExerciseIndex
          ].name.toUpperCase()}`
        : '',
    [WORKOUT_EXECUTION_STATUS.REST]: 'REST TIME',
    [WORKOUT_EXECUTION_STATUS.FINISH]: 'TRAINING FINISHED'
  };

  const informationHeaderTitleText = () => {
    if (workoutExecutionStatus === WORKOUT_EXECUTION_STATUS.WARMUP) {
      return WORKOUT_EXECUTION_STATUS.WARMUP;
    } else if (workoutExecutionStatus === WORKOUT_EXECUTION_STATUS.NOT_STARTED) {
      return 'NOT STARTED';
    } else {
      return `Set ${currentSet + 1}/${training.length}`;
    }
  };

  const handleBannerInformations = useCallback(() => {
    const currentStatus = playState === 'PAUSE' ? playState : workoutExecutionStatus;

    if (statusInformations[currentStatus].icon === 'WARMUP_ICON') {
      return (
        <motion.div
          initial={iconAnimation.initial}
          animate={iconAnimation.animate}
          exit={iconAnimation.exit}
          transition={iconAnimation.transition}>
          <WarmupIcon width={'8vw'} />
        </motion.div>
      );
    } else if (statusInformations[currentStatus].icon === 'EXERCISE_IMAGE') {
      return (
        <BannerExerciseImage
          src={setExercises[currentExerciseIndex].image}
          alt={setExercises[currentExerciseIndex].name}
        />
      );
    } else {
      const animationFromRest =
        currentStatus === WORKOUT_EXECUTION_STATUS.REST ? iconAnimation : otherIconAnimation;
      return (
        <motion.div
          initial={animationFromRest.initial}
          animate={animationFromRest.animate}
          exit={animationFromRest.exit}
          transition={animationFromRest.transition}>
          <BannerIcon icon={statusInformations[currentStatus].icon} color={White} />
        </motion.div>
      );
    }
  }, [
    workoutExecutionStatus,
    playState,
    currentExerciseIndex,
    setExercises,
    iconAnimation,
    otherIconAnimation
  ]);

  const playButton = () => {
    let hoveredState, buttonState;
    const workoutPlaying = playState === PLAY_STATE.PLAY;
    if (playButtonHovered) {
      hoveredState = workoutPlaying ? (
        <PausedButtonHovered
          onClick={() => {
            dispatch(updatePlayState());
          }}
          onMouseLeave={() => setPlayButtonHovered(false)}
        />
      ) : (
        <PlayButtonHovered
          onClick={() => {
            dispatch(updatePlayState());
          }}
          onMouseLeave={() => setPlayButtonHovered(false)}
        />
      );
    } else {
      buttonState = workoutPlaying ? (
        <PausedButton onMouseEnter={() => setPlayButtonHovered(true)} />
      ) : (
        <PlayButton onMouseEnter={() => setPlayButtonHovered(true)} />
      );
    }

    return <>{playButtonHovered ? hoveredState : buttonState}</>;
  };

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
  }, [currentRemainingTime, workoutExecutionStatus, dispatch, playState]);

  const formattedStatusTime = useMemo(
    () => secondsToHourFormat(currentRemainingTime || 0),
    [currentRemainingTime]
  );

  return (
    <Container>
      <HeaderContainer>
        <HeaderSetAndLogoContainer>
          <InformationHeaderSection
            title={informationHeaderTitleText()}
            backgroundColor="BLACK"
            small
            reverse
          />
          <Link to="/">
            <BrandingIcon />
          </Link>
        </HeaderSetAndLogoContainer>
        {workoutExecutionStatus !== WORKOUT_EXECUTION_STATUS.WARMUP &&
          workoutExecutionStatus !== WORKOUT_EXECUTION_STATUS.NOT_STARTED && (
            <InformationHeaderSection
              title={statusHeaderTitle[workoutExecutionStatus]}
              backgroundColor="BLACK"
              medium
              reverse
            />
          )}
      </HeaderContainer>
      <BannerContainer>
        <AnimatePresence>{handleBannerInformations()}</AnimatePresence>
      </BannerContainer>
      <BottomContainer>
        <BottomStatusText>
          {
            statusInformations[playState === 'PAUSE' ? playState : workoutExecutionStatus]
              .bottomText
          }
        </BottomStatusText>
        {workoutExecutionStatus !== WORKOUT_EXECUTION_STATUS.FINISH && (
          <TimeCountdownText>{formattedStatusTime}</TimeCountdownText>
        )}
        {workoutExecutionStatus === WORKOUT_EXECUTION_STATUS.FINISH ? (
          <BackToHomeButtonContainer to={'/'}>
            <BackToHomeButton>
              <BackToHomeText>BACK TO HOME</BackToHomeText>
            </BackToHomeButton>
          </BackToHomeButtonContainer>
        ) : (
          playButton()
        )}
      </BottomContainer>
    </Container>
  );
};

export default connect()(WorkoutVisualization);
