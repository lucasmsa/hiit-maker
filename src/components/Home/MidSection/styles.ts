import styled from 'styled-components';
import { FennelFiesta, Rage, TransparentLightBlack, White } from '../../../styles/global';
import { ReactComponent as HorizontalDumbellIcon } from '../../../assets/images/midSection/horizontal-dumbell.svg';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export const SetsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 1rem;
`;

export const CurrentTrainingSetsContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
`;

export const AddSetText = styled.h3`
  font-family: Montserrat;
  font-style: normal;
  font-weight: 600;
  font-size: 0.5625rem;
  line-height: 0.6875rem;
  letter-spacing: 0.02em;
  color: ${FennelFiesta};
  margin-top: 0.25rem;
`;

export const HorizontalDumbell = styled(HorizontalDumbellIcon)`
  width: 3.5vw;
`;

export const SetsLimitText = styled.h3`
  font-family: Montserrat;
  font-style: normal;
  font-weight: 600;
  font-size: 0.5625rem;
  line-height: 0.6875rem;
  letter-spacing: 0.02em;
  color: ${TransparentLightBlack};
  margin-bottom: 0.5rem;
  align-self: center;
`;

export const SetsLimitCountText = styled.span`
  color: ${Rage};
`;

export const AddSetContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 1.625rem;
  cursor: pointer;
  width: 3.525rem;
`;

export const RemoveSetContainer = styled.div`
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

export const HeaderTextContainer = styled.div`
  display: flex;
  align-items: center;
  background: ${Rage};
  height: 2.875rem;
  width: 90%;
  margin-left: -3.5rem;
  margin-top: 2.625rem;
`;

export const HeaderInfoContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 2.5vh;
  margin-left: -12vw;
`;

export const RightTriangle = styled.div`
  width: 0;
  height: 0;
  border-bottom: 2.875rem solid white;
  border-left: 1.5rem solid transparent;
  align-self: flex-end;
  margin-left: -1.5rem;
`;

export const RemoveSetText = styled.h3`
  font-family: Montserrat;
  font-style: normal;
  font-weight: 600;
  font-size: 0.5625rem;
  line-height: 0.6875rem;
  letter-spacing: 0.02em;
  color: ${Rage};
  margin-top: 0.25rem;
`;

export const ExercisesContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  flex: 1;
  height: 100vh;
  margin-left: 2.125rem;
`;

export const WorkoutContainer = styled.div``;

export const HeaderTextStyle = styled.h1`
  font-family: Montserrat;
  align-self: center;
  font-style: normal;
  font-weight: 600;
  font-size: 1.5rem;
  line-height: 1.8125rem;
  letter-spacing: 0.02em;
  color: ${White};
  margin-left: auto;
  margin-right: 2.25rem;
`;
