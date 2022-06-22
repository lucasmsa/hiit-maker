import styled from 'styled-components';
import { DarkGray } from '../../../styles/global';

export const Container = styled.div`
  width: 30vw;
  height: 12vh;
  margin-top: 1.875rem;
  font-family: Montserrat;
  font-weight: 600;
  font-size: 0.875rem;
  overflow: hidden;
`;

export const ExerciseNameTrainRestContainer = styled.div``;

export const RestContainer = styled.div``;

export const HeaderText = styled.h2`
  font-style: normal;
  font-weight: 500;
  font-size: 0.875rem;
  line-height: 1.0625rem;
  letter-spacing: 0.02em;
  margin-top: 0;
  margin-bottom: 0;
  color: ${DarkGray};
`;

export const HeaderTrainRest = styled.h2`
  font-family: Montserrat;
  font-style: normal;
  font-weight: 500;
  font-size: 0.875rem;
  line-height: 1.0625rem;
  letter-spacing: 0.02em;
  color: ${DarkGray};
  margin-top: 0;
  margin-bottom: 0;
`;

export const SecondsText = styled.h3`
  font-family: Montserrat;
  font-style: normal;
  font-weight: 300;
  font-size: 0.875rem;
  line-height: 1.0625rem;
  letter-spacing: 0.02em;
  color: ${DarkGray};
`;

export const TrainRestContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 11.25rem;
  justify-content: space-between;
`;

export const TrainContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const InputSurroundings = styled.div`
  background: #ebebeb;
  border-radius: 0.625rem;
  width: 2rem;
  height: 1.4375rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 0.25rem;
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const TextAndDeleteContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 18vw;
  margin-bottom: 1rem;
`;

export const ContentsContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

export const LeftSideImage = styled.img`
  width: 7vw;
  height: 10vh;
  border-radius: 0.625rem;
  margin-right: 1.5rem;
`;
