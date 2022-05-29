import React, { useMemo, useState } from 'react';
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
import { connect, useSelector } from 'react-redux';
import { White } from '../../../styles/global';
import { secondsToHourFormat } from '../../../utils/secondsToHourFormat';
import { PlayButtonHovered, PlayButton } from '../../PlayAndStopButtons/styles';
import { statusInformations } from '../../../utils/workout/statusInformations';
import { getWorkoutExecutionStatus } from '../../../store/workoutExecution/selectors';
import { ReactComponent as WarmupIcon } from '../../../assets/images/WorkoutScreen/warmup.svg';
import { WORKOUT_EXECUTION_STATUS } from '../../../config/contants';
import { getTrainingDefaultValues } from '../../../store/training/selectors';
import useCountDown from 'react-countdown-hook';

const WorkoutVisualization = () => {
  const workoutExecutionStatus = useSelector(getWorkoutExecutionStatus);

  const { warmupTime } = useSelector(getTrainingDefaultValues);
  const [playButtonHovered, setPlayButtonHovered] = useState(false);
  const [paused, setPaused] = useState(true);

  const statusTime = {
    [WORKOUT_EXECUTION_STATUS.WARMUP]: warmupTime
  };

  const statusHeaderTitle = {
    [WORKOUT_EXECUTION_STATUS.WARMUP]: 'Warmup'
  };

  const formattedStatusTime = useMemo(
    () => secondsToHourFormat(statusTime[workoutExecutionStatus]),
    []
  );

  const playButton = (
    <>
      {playButtonHovered ? (
        <PlayButtonHovered
          paused={paused}
          onClick={() => setPaused((oldState) => !oldState)}
          onMouseLeave={() => setPlayButtonHovered(false)}
        />
      ) : (
        <PlayButton paused={paused} onMouseEnter={() => setPlayButtonHovered(true)} />
      )}
    </>
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
          <BrandingIcon />
        </HeaderSetAndLogoContainer>
        {workoutExecutionStatus !== WORKOUT_EXECUTION_STATUS.WARMUP && (
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
        <BottomStatusText>{statusInformations['rest'].bottomText}</BottomStatusText>
        <TimeCountdownText>{formattedStatusTime}</TimeCountdownText>
        {playButton}
      </BottomContainer>
    </Container>
  );
};

export default connect()(WorkoutVisualization);
