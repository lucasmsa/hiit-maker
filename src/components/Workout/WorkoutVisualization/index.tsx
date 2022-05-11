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

const WorkoutVisualization = () => {
  const statusInformations = {
    rest: { icon: 'fa6-solid:clock', bottomText: 'REST TIME' },
    pause: { icon: 'fa6-solid:circle-pause', bottomText: 'SET PAUSED' },
    finish: { icon: 'bi:check-circle-fill', bottomText: 'TRAINING IS OVER!!!' }
  };
  const formattedTotalTrainingTime = useMemo(() => secondsToHourFormat(0), []);

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
        <BannerIcon icon={statusInformations['finish'].icon} color={White} />
      </BannerContainer>
      <BottomContainer>
        <BottomStatusText>{statusInformations['finish'].bottomText}</BottomStatusText>
        <TimeCountdownText>{formattedTotalTrainingTime}</TimeCountdownText>
      </BottomContainer>
    </Container>
  );
};

export default WorkoutVisualization;
