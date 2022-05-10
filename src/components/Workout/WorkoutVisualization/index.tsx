import React, { useState } from 'react';
import {
  BannerContainer,
  BannerIcon,
  BottomContainer,
  BrandingIcon,
  Container,
  HeaderContainer,
  BottomStatusText,
  HeaderSetAndLogoContainer
} from './styles';
import InformationHeaderSection from '../../Home/InformationHeaderSection';
import { White } from '../../../styles/global';

const WorkoutVisualization = () => {
  const statusInformations = {
    rest: { icon: 'fa6-solid:clock', bottomText: 'REST TIME' },
    pause: { icon: 'fa6-solid:circle-pause', bottomText: 'SET PAUSED' },
    finish: { icon: 'bi:check-circle-fill', bottomText: 'TRAINING IS OVER!!!' }
  };

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
      </BottomContainer>
    </Container>
  );
};

export default WorkoutVisualization;
