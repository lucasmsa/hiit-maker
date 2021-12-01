import styled, { keyframes } from 'styled-components'
import { ReactComponent as Arrow } from '../../../assets/images/WorkoutScreen/arrow-collapse.svg'
import { fadeInLeft, fadeIn } from 'react-animations';
import { Rage, White } from '../../../styles/global';

const workoutContainerAnimation = keyframes`${fadeInLeft}`;

const collapsedContainerAnimation = keyframes`${fadeIn}`;

export const CollapsedContainerWrapper = styled.div`
  width: 325px;
`

export const WorkoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${Rage};
  animation: 0.2s ${workoutContainerAnimation};
  animation-timing-function: linear;
  justify-content: flex-start;
  width: 325px;
  height: 100vh;
  padding-top: 42px;
`

export const CollapsedContainer = styled.div`
  display: flex;
  flex-direction: column;
  animation: 0.2s ${collapsedContainerAnimation};
  align-items: flex-end;
  justify-content: center;
  background-color: ${Rage};
  width: 36px;
  height: 100vh;
  padding-top: 42px;
  border-radius: 0px 20px 20px 0px;
`

export const CollapsedArrowContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  justify-self: center;
  width: 64px;
  height: 64px;
  border-radius: 50%;
  margin-top: auto;
  margin-bottom: auto;
  background: white;
  margin-right: -36px;
  cursor: pointer;
  align-self: flex-end;
`

export const CollapsedArrowRight = styled(Arrow)`
`

export const CollapsedArrowLeft = styled(Arrow)`
  transform: scaleX(-1);
`

export const Header = styled.div`
  padding: 0;
  display: flex;
  flex-direction: row;
`

export const HeaderWorkout = styled.div`
  padding: 0;
  display: flex;
  flex-direction: row;
  margin-bottom: -42px;
`

export const Dumbell = styled.img`
  margin: 0;
  width: 32px;
  height: 32px;
`

export const HeaderLeftText = styled.h1`
  color: ${White};
  font-style: normal;
  font-family: Montserrat;
  text-shadow: 0.1px 0.1px 5px #541612;
  font-weight: 600;
  font-size: 36px;
  line-height: 43px;
  letter-spacing: 0.02em;
`

export const IconsContainer = styled.div`
  margin-top: 28px;
  margin-bottom: 16px;
  display: flex;
  flex-direction: row;
  width: 100px;
  justify-content: space-evenly;
`