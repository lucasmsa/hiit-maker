import styled, { keyframes } from 'styled-components';
import { ReactComponent as Arrow } from '../../../assets/images/WorkoutScreen/arrow-collapse.svg';
import { fadeInLeft, fadeIn } from 'react-animations';
import { Rage, White } from '../../../styles/global';

const workoutContainerAnimation = keyframes`${fadeInLeft}`;

const collapsedContainerAnimation = keyframes`${fadeIn}`;

export const CollapsedContainerWrapper = styled.div`
  width: 20.3125rem;
`;

export const WorkoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${Rage};
  animation: 0.2s ${workoutContainerAnimation};
  animation-timing-function: linear;
  justify-content: flex-start;
  width: 20.3125rem;
  height: 100vh;
  padding-top: 2.625rem;
`;

export const CollapsedContainer = styled.div`
  display: flex;
  flex-direction: column;
  animation: 0.2s ${collapsedContainerAnimation};
  align-items: flex-end;
  justify-content: center;
  background-color: ${Rage};
  width: 2.25rem;
  height: 100vh;
  padding-top: 2.625rem;
  border-radius: 0rem 1.25rem 1.25rem 0rem;
`;

export const CollapsedArrowContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  justify-self: center;
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  margin-top: auto;
  margin-bottom: auto;
  background: white;
  margin-right: -2.25rem;
  cursor: pointer;
  align-self: flex-end;
`;

export const CollapsedArrowRight = styled(Arrow)``;

export const CollapsedArrowLeft = styled(Arrow)`
  transform: scaleX(-1);
`;

export const Header = styled.div`
  padding: 0;
  display: flex;
  flex-direction: row;
`;

export const HeaderWorkout = styled.div`
  padding: 0;
  display: flex;
  flex-direction: row;
  margin-bottom: -2.625rem;
`;

export const Dumbell = styled.img`
  margin: 0;
  width: 2rem;
  height: 2rem;
`;

export const HeaderLeftText = styled.h1`
  color: ${White};
  font-style: normal;
  font-family: Montserrat;
  text-shadow: 0.0063rem 0.0063rem 0.3125rem #541612;
  font-weight: 600;
  font-size: 2.25rem;
  line-height: 2.6875rem;
  letter-spacing: 0.02em;
`;

export const IconsContainer = styled.div`
  margin-top: 1.75rem;
  margin-bottom: 1rem;
  display: flex;
  flex-direction: row;
  width: 6.25rem;
  justify-content: space-evenly;
`;
