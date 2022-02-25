import styled from 'styled-components';
import { DarkGray } from '../../../styles/global';

export const Container = styled.div`
  width: 480px;
  height: 100px;
  margin-top: 30px;
  font-family: Montserrat;
  font-weight: 600;
  font-size: 14px;
`;

export const ExerciseNameTrainRestContainer = styled.div``;

export const RestContainer = styled.div``;

export const HeaderText = styled.h2`
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;
  letter-spacing: 0.02em;
  margin-top: 0;
  margin-bottom: 0;
  color: ${DarkGray};
`;

export const HeaderTrainRest = styled.h2`
  font-family: Montserrat;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;
  letter-spacing: 0.02em;
  color: ${DarkGray};
  margin-top: 0;
  margin-bottom: 0;
`;

export const SecondsText = styled.h3`
  font-family: Montserrat;
  font-style: normal;
  font-weight: 300;
  font-size: 14px;
  line-height: 17px;
  letter-spacing: 0.02em;
  color: ${DarkGray};
`;

export const TrainRestContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 180px;
  justify-content: space-between;
`;

export const TrainContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const InputSurroundings = styled.div`
  background: #ebebeb;
  border-radius: 10px;
  width: 32px;
  height: 23px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 4px;
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const TextAndDeleteContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 280px;
  margin-bottom: 16px;
`;

export const ContentsContainer = styled.div`
  display: flex;
  flex-direction: row;
`;
