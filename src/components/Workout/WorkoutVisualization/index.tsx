import React, { useEffect, useMemo, useState } from 'react';
import {
  BannerContainer,
  BannerIcon,
  BottomContainer,
  BrandingIcon,
  Container,
  HeaderContainer,
  BottomStatusText,
  HeaderSetAndLogoContainer,
  TimeCountdownText
} from './styles';
import InformationHeaderSection from '../../Home/InformationHeaderSection';
import { connect, useDispatch, useSelector } from 'react-redux';
import { White } from '../../../styles/global';
import { secondsToHourFormat } from '../../../utils/secondsToHourFormat';
import { PlayButtonHovered, PlayButton } from '../../PlayAndStopButtons/styles';
import { statusInformations } from '../../../utils/workout/statusInformations';
import { getCurrentActionRemainingTime, getWorkoutExecutionStatus } from '../../../store/workoutExecution/selectors';
import { ReactComponent as WarmupIcon } from '../../../assets/images/WorkoutScreen/warmup.svg';
import { WORKOUT_EXECUTION_STATUS } from '../../../config/contants';
import { getTrainingDefaultValues } from '../../../store/training/selectors';
import { Link } from 'react-router-dom';
import { updateCurrentActionRemainingTime, updateWorkoutExecutionStatus } from '../../../store/workoutExecution/actionCreators';

const WorkoutVisualization = () => {
  const dispatch = useDispatch();
  const workoutExecutionStatus = useSelector(getWorkoutExecutionStatus);
  const currentRemainingTime = useSelector(getCurrentActionRemainingTime);
  const { warmupTime } = useSelector(getTrainingDefaultValues);
  const [playButtonHovered, setPlayButtonHovered] = useState(false);
  const [play, setPlay] = useState(true);

  const statusTime = {
    [WORKOUT_EXECUTION_STATUS.WARMUP]: warmupTime
  };

  const statusHeaderTitle = {
    [WORKOUT_EXECUTION_STATUS.WARMUP]: 'Warmup'
  };

  const playButton = (
    <>
      {playButtonHovered ? (
        <PlayButtonHovered
          paused={play}
          onClick={() => {
            setPlay((oldState) => (!oldState))
            const oldStatus = workoutExecutionStatus;
            dispatch(updateWorkoutExecutionStatus(!play ? oldStatus : WORKOUT_EXECUTION_STATUS.PAUSE));
          }}
          onMouseLeave={() => setPlayButtonHovered(false)}
        />
      ) : (
        <PlayButton paused={play} onMouseEnter={() => setPlayButtonHovered(true)} />
      )}
    </>
  );

  useEffect(() => {
    if (workoutExecutionStatus !== WORKOUT_EXECUTION_STATUS.NOT_STARTED
        &&  workoutExecutionStatus !== WORKOUT_EXECUTION_STATUS.PAUSE) { 
          console.log('I am over here, inside useEffect', { workoutExecutionStatus, currentRemainingTime });
      if (!currentRemainingTime) {
        // Interval reached the end
      };
      const interval = setInterval(() => {
        dispatch(updateCurrentActionRemainingTime(currentRemainingTime - 1));
      }, 1000);
  
      return () => clearInterval(interval);
    }
  }, [currentRemainingTime, workoutExecutionStatus]);


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
          <Link to='/'>
            <BrandingIcon />
          </Link>
        </HeaderSetAndLogoContainer>
        {(workoutExecutionStatus !== WORKOUT_EXECUTION_STATUS.WARMUP) && (
          <InformationHeaderSection title="Set 1/3" backgroundColor="BLACK" medium reverse />
        )}
      </HeaderContainer>
      <BannerContainer>
        {workoutExecutionStatus === WORKOUT_EXECUTION_STATUS.WARMUP ? (
          <WarmupIcon width={'10vw'} />
        ) : (
          <BannerIcon icon={statusInformations[workoutExecutionStatus].icon} color={White} />
        )}
      </BannerContainer>
      <BottomContainer>
        <BottomStatusText>{statusInformations[workoutExecutionStatus].bottomText}</BottomStatusText>
        <TimeCountdownText>{formattedStatusTime}</TimeCountdownText>
        {playButton}
      </BottomContainer>
    </Container>
  );
};

export default connect()(WorkoutVisualization);
