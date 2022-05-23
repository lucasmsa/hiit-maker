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
import { White } from '../../../styles/global';
import { secondsToHourFormat } from '../../../utils/secondsToHourFormat';
import { PlayButtonHovered, PlayButton } from '../../PlayAndStopButtons/styles';

const WorkoutVisualization = () => {
  const statusInformations = {
    rest: { icon: 'fa6-solid:clock', bottomText: 'REST TIME' },
    pause: { icon: 'fa6-solid:circle-pause', bottomText: 'SET PAUSED' },
    finish: { icon: 'bi:check-circle-fill', bottomText: 'TRAINING IS OVER!!!' }
  };
  const formattedTotalTrainingTime = useMemo(() => secondsToHourFormat(0), []);

  const [playButtonHovered, setPlayButtonHovered] = useState(false);
  const [paused, setPaused] = useState(true);

  const playButton = (
    <>
      {playButtonHovered ? (
        <PlayButtonHovered
          paused={paused}
          onClick={() => {}}
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
          <InformationHeaderSection title="Set 1/3" backgroundColor="BLACK" small reverse />
          <BrandingIcon />
        </HeaderSetAndLogoContainer>
        <InformationHeaderSection title="Set 1/3" backgroundColor="BLACK" medium reverse />
      </HeaderContainer>
      <BannerContainer>
        <BannerIcon icon={statusInformations['rest'].icon} color={White} />
      </BannerContainer>
      <BottomContainer>
        <BottomStatusText>{statusInformations['rest'].bottomText}</BottomStatusText>
        <TimeCountdownText>{formattedTotalTrainingTime}</TimeCountdownText>
        {playButton}
      </BottomContainer>
    </Container>
  );
};

export default WorkoutVisualization;
