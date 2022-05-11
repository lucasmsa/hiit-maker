import styled from 'styled-components';
import { DarkGray, Rage, TransparentDarkBlack, White } from '../../../styles/global';
import { ReactComponent as Clock } from '../../../assets/images/WorkoutInformation/icons/clock.svg';
import { ReactComponent as TargetMuscles } from '../../../assets/images/WorkoutInformation/icons/targetMuscles.svg';
import { ReactComponent as ManRunning } from '../../../assets/images/WorkoutInformation/icons/manRunning.svg';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${White};
  width: 20.3125rem;
  height: 100vh;
  padding-top: 2.625rem;
  overflow-x: hidden;
`;
export const TargetMusclesContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;

export const MuscleGroupImagesContainer = styled.div`
  margin-top: 2.625rem;
  display: flex;
  flex-direction: row;
  width: 60%;
  justify-content: space-around;
  align-self: center;
`;

export const TotalTimeContainer = styled.div`
  margin-top: 4rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;

export const FrontContainer = styled.div`
  display: flex;
  justify-content: center;
`;

export const BackContainer = styled.div`
  display: flex;
  justify-content: center;
`;

export const TotalTimeHeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const HeaderTexts = styled.h2`
  font-family: Montserrat;
  font-style: normal;
  font-weight: 600;
  font-size: 1.5rem;
  line-height: 1.8125rem;
  letter-spacing: 0.02em;
  align-items: center;
  margin-left: 0.75rem;
  color: ${White};
`;

export const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  background: ${TransparentDarkBlack};
  width: 130%;
  height: 2.875rem;
  margin-right: 2rem;
  padding-left: 3rem;
`;

export const InformationContianer = styled.div`
  display: flex;
  flex-direction: row;
  width: 130%;
  margin-right: 2.625rem;
`;

export const LemmeSee = styled.div`
  position: absolute;
  width: 0;
  height: 0;
  border-bottom: 2.875rem solid white;
  border-right: 1.5rem solid transparent;
`;

export const ClockText = styled.h2`
  margin-left: 0.875rem;
  font-family: Montserrat;
  font-style: normal;
  font-weight: 600;
  font-size: 1.5rem;
  line-height: 1.8125rem;
  letter-spacing: 0.02em;
  color: ${DarkGray};
`;

export const TrainingDurationContainer = styled.div`
  align-self: center;
`;

export const TrainingDurationText = styled.h3`
  font-family: Montserrat;
  margin-top: 0.75rem;
  font-style: normal;
  font-weight: 600;
  font-size: 3rem;
  letter-spacing: 0.02em;
  color: ${Rage};
`;

export const StartTrainingContainer = styled.div`
  margin-top: 4rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
`;

export const PlayButton = styled.div`
  cursor: pointer;
  width: 8vw;
  height: 14.5vh;
  background: radial-gradient(rgba(238, 55, 63, 0.8) 60%, rgba(255, 255, 255, 1) 62%);
  border-radius: 50%;
  position: relative;
  display: block;
  margin: 2.5rem auto 0 auto;
  box-shadow: 0rem 0rem 1.5625rem 0.1875rem rgba(245, 135, 140, 0.8);
  &:after {
    content: '';
    position: absolute;
    left: 50%;
    top: 50%;
    -webkit-transform: translateX(-40%) translateY(-50%);
    transform: translateX(-40%) translateY(-50%);
    transform-origin: center center;
    width: 0;
    height: 0;
    border-top: 0.9375rem solid transparent;
    border-bottom: 0.9375rem solid transparent;
    border-left: 1.5625rem solid #fff;
    z-index: 100;
    -webkit-transition: all 400ms cubic-bezier(0.55, 0.055, 0.675, 0.19);
    transition: all 400ms cubic-bezier(0.55, 0.055, 0.675, 0.19);
  }
`;

export const PlayButtonHovered = styled(PlayButton)`
  &:before {
    content: '';
    position: absolute;
    width: 12vw;
    height: 22vh;
    -webkit-animation-delay: 0s;
    animation-delay: 0s;
    -webkit-animation: pulsate1 2s;
    animation: pulsate1 2s;
    -webkit-animation-direction: forwards;
    animation-direction: forwards;
    -webkit-animation-iteration-count: infinite;
    animation-iteration-count: infinite;
    -webkit-animation-timing-function: steps;
    animation-timing-function: steps;
    opacity: 1;
    border-radius: 50%;
    border: 0.3125rem solid rgba(255, 255, 255, 0.75);
    top: -30%;
    left: -30%;
    background: rgba(198, 16, 0, 0);
  }

  @-webkit-keyframes pulsate1 {
    0% {
      -webkit-transform: scale(0.6);
      transform: scale(0.6);
      opacity: 1;
      box-shadow: inset 0rem 0rem 1.5625rem 0.1875rem rgba(255, 255, 255, 0.75),
        0rem 0rem 1.5625rem 0.625rem rgba(255, 255, 255, 0.75);
    }
    100% {
      -webkit-transform: scale(1);
      transform: scale(1);
      opacity: 0;
      box-shadow: none;
    }
  }

  @keyframes pulsate1 {
    0% {
      -webkit-transform: scale(0.6);
      transform: scale(0.6);
      opacity: 1;
      box-shadow: inset 0rem 0rem 1.5625rem 0.1875rem rgba(255, 255, 255, 0.75),
        0rem 0rem 1.5625rem 0.625rem rgba(255, 255, 255, 0.75);
    }
    100% {
      -webkit-transform: scale(1, 1);
      transform: scale(1);
      opacity: 0;
      box-shadow: none;
    }
  }
`;

export const ClockIcon = styled(Clock)`
  width: 2vw;
`;
export const TargetMusclesIcon = styled(TargetMuscles)`
  width: 2vw;
`;
export const ManRunningIcon = styled(ManRunning)`
  width: 2vw;
`;
