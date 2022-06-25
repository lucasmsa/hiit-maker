import styled from 'styled-components';
import { Icon } from '@iconify/react';
import { LightGray, Rage, TransparentDarkBlack } from '../../../../styles/global';
import { ReactComponent as Branding } from '../../../../assets/images/WorkoutScreen/logo-workout.svg';
import { Link } from 'react-router-dom';

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-right: 4%;
  overflow: hidden;
`;

export const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 2.5%;
  margin-bottom: 4%;
  height: 15vh;
`;

export const HeaderSetAndLogoContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2%;
`;

export const BannerContainer = styled.div`
  display: flex;
  height: 40vh;
  width: 40vw;
  align-self: center;
  justify-content: center;
  align-items: center;
  border-radius: 0.625rem;
  background: ${Rage};
  filter: drop-shadow(0px 1px 2px rgba(0, 0, 0, 0.25));
  margin-bottom: 2.5%;
  overflow: hidden;
  background-size: contain;
`;

export const BannerExerciseImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: 0.625rem;
`;

export const BannerIcon = styled(Icon)`
  font-size: 10vw;
`;

export const BrandingIcon = styled(Branding)`
  width: 16vw;
`;

export const BottomContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 1%;
  margin-bottom: 2.5%;
`;

export const BottomStatusText = styled.h2`
  font-family: Montserrat;
  font-style: normal;
  font-weight: 600;
  font-size: 1.5vw;
  line-height: 17px;
  letter-spacing: 0.02em;
  color: ${Rage};
`;

export const TimeCountdownText = styled.h3`
  font-family: Montserrat;
  margin-top: 2vh;
  font-style: normal;
  font-weight: 600;
  font-size: 2vw;
  letter-spacing: 0.02em;
  color: ${TransparentDarkBlack};
`;

export const BackToHomeButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  align-self: center;
  width: 16vw;
  height: 2.5vw;
  cursor: pointer;
  background: ${TransparentDarkBlack};
  border-radius: 1.25rem;
`;

export const BackToHomeText = styled.h3`
  font-family: Montserrat;
  font-style: normal;
  font-weight: 600;
  font-size: 1vw;
  line-height: 1.0625rem;
  letter-spacing: 0.02em;
  color: ${LightGray};
`;

export const BackToHomeButtonContainer = styled(Link)`
  margin-top: 2.5%;
  text-decoration: none;
`;
