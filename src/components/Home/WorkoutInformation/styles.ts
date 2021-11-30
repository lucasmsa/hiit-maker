import styled from 'styled-components'
import { DarkGray, Rage, White } from '../../../styles/global'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${White};
  width: 325px;
  height: 100vh;
  padding-top: 42px;
`
export const TargetMusclesContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`

export const MuscleGroupImagesContainer = styled.div`
  margin-top: 42px;
  display: flex;
  flex-direction: row;  
  width: 60%;
  justify-content: space-around;
  align-self: center;
`

export const TotalTimeContainer = styled.div`
  margin-top: 108px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export const FrontContainer = styled.div`
  display: flex;
  justify-content: center;
`

export const BackContainer = styled.div`
  display: flex;
  justify-content: center;
`

export const TotalTimeHeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`

export const HeaderTexts = styled.h2`
  font-family: Montserrat;
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 29px;
  letter-spacing: 0.02em;
  align-items: center;
  margin-left: 12px;
  color: ${DarkGray};
`

export const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
`

export const ClockText = styled.h2`
  margin-left: 14px;
  font-family: Montserrat;
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 29px;
  letter-spacing: 0.02em;
  color: ${DarkGray};
`

export const TrainingDurationContainer = styled.div``

export const TrainingDurationText = styled.h3`
  font-family: Montserrat;
  margin-top: 12px;
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  letter-spacing: 0.02em;
  color: ${Rage};
`

export const StartTrainingContainer = styled.div`
  margin-top: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const PlayButton = styled.div`
  cursor: pointer;
  width: 100px;
  height: 100px;
  background: radial-gradient( rgba(238, 55, 63, 0.8) 60%, rgba(255, 255, 255, 1) 62%);
  border-radius: 50%;
  position: relative;
  display: block;
  margin: 56px auto 0 auto;
  box-shadow: 0px 0px 25px 3px rgba(245, 135, 140, 0.8);
  &:after {
    content: "";
    position: absolute;
    left: 50%;
    top: 50%;
    -webkit-transform: translateX(-40%) translateY(-50%);
    transform: translateX(-40%) translateY(-50%);
    transform-origin: center center;
    width: 0;
    height: 0;
    border-top: 15px solid transparent;
    border-bottom: 15px solid transparent;
    border-left: 25px solid #fff;
    z-index: 100;
    -webkit-transition: all 400ms cubic-bezier(0.55, 0.055, 0.675, 0.19);
    transition: all 400ms cubic-bezier(0.55, 0.055, 0.675, 0.19);
  }
`

export const PlayButtonHovered = styled(PlayButton)`  
  &:before {
    content: "";
    position: absolute;
    width: 150%;
    height: 150%;
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
    border: 5px solid rgba(255, 255, 255, .75);
    top: -30%;
    left: -30%;
    background: rgba(198, 16, 0, 0);
  }

  @-webkit-keyframes pulsate1 {
    0% {
      -webkit-transform: scale(0.6);
      transform: scale(0.6);
      opacity: 1;
      box-shadow: inset 0px 0px 25px 3px rgba(255, 255, 255, 0.75), 0px 0px 25px 10px rgba(255, 255, 255, 0.75);
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
      box-shadow: inset 0px 0px 25px 3px rgba(255, 255, 255, 0.75), 0px 0px 25px 10px rgba(255, 255, 255, 0.75);
    }
    100% {
      -webkit-transform: scale(1, 1);
      transform: scale(1);
      opacity: 0;
      box-shadow: none;

    }
  }
`