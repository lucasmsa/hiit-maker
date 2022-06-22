import { Icon } from '@iconify/react';
import styled from 'styled-components';
import {
  LightGray,
  Rage,
  TransparentBlackShadow,
  TransparentDarkBlack,
  White
} from '../../../styles/global';

export const Container = styled.div`
  height: 77.5vh;
  width: 41vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: ${White};
  box-shadow: 0rem 0.0625rem 0.25rem ${TransparentBlackShadow};
  margin-right: 0.5rem;
  border-radius: 1.25rem;
`;

export const Header = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  width: 100%;
`;

export const SetHeaderText = styled.h2`
  margin-top: 1.25rem;
  margin-bottom: 0.75rem;
  font-family: Montserrat;
  font-style: normal;
  font-weight: normal;
  font-size: 1.5rem;
`;

export const FooterContainer = styled.div`
  margin-top: auto;
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const SetRestTest = styled.h2`
  margin-top: 1.25rem;
  margin-bottom: 0.5rem;
  user-select: none;
  font-family: Montserrat;
  font-style: normal;
  font-weight: 500;
  font-size: 0.875rem;
  line-height: 1.0625rem;
  letter-spacing: 0.02em;
  color: ${TransparentDarkBlack};
`;

export const SetRestContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 1.5rem;
`;

export const SetCounter = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 1.125rem;
  height: 3.375rem;
  width: 100%;
  border-radius: 1.25rem;
  background: ${TransparentDarkBlack};
`;

export const CounterText = styled.h2`
  font-family: Montserrat;
  font-style: normal;
  font-weight: 600;
  font-size: 0.875rem;
  line-height: 1.0625rem;
  letter-spacing: 0.02em;
  user-select: none;
  color: ${LightGray};
`;

export const OperationContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  height: 100%;
  width: 1.875rem;
`;

export const ScrollableExercisesContainer = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  overflow-x: hidden;
  margin-bottom: 1.5rem;
  ::-webkit-scrollbar {
    width: 0.3125rem;
  }

  ::-webkit-scrollbar-thumb {
    background: #908a8a;
    opacity: 0.8;
    border-radius: 1.25rem;
  }
`;

export const ExercisesLimitText = styled.h2`
  align-self: center;
  font-family: Montserrat;
  font-style: normal;
  user-select: none;
  font-weight: normal;
  font-size: 1.5rem;
  line-height: 1.8125rem;
  letter-spacing: 0.02em;
  color: ${TransparentDarkBlack};
  margin-bottom: 1.25rem;
`;

export const ExercisesLimitCountText = styled.span`
  color: ${Rage};
`;

export const CountTextContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: row;
  width: 10rem;
`;

export const ResetIcon = styled(Icon)`
  cursor: pointer;
  font-size: 2.25rem;
  transform: rotate(-90deg);
  color: ${Rage};
`;

export const BlankSpace = styled.div`
  width: 2.25rem;
`;
