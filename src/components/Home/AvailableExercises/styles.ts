import styled from 'styled-components';
import { LightGray, Rage } from '../../../styles/global';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 18px;
  background-color: ${Rage};
  width: 280px;
  height: 100vh;
  padding-top: 12px;
`;

export const ExerciseHeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const ExerciseAreaContainer = styled.div`
  margin-top: 6px;
`;

export const ExerciseAreaText = styled.h1`
  font-family: Montserrat;
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  letter-spacing: 0.02em;
  margin-left: 6px;
  color: ${LightGray};
`;

export const ExercisesImagesContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
`;
