import styled from 'styled-components';
import { LightGray, Rage } from '../../../styles/global';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 1.125rem;
  background-color: ${Rage};
  width: 21vw;
  height: 100vh;
  padding-top: 0.75rem;
`;

export const ExerciseHeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const ExerciseAreaContainer = styled.div`
  margin-top: 0.375rem;
`;

export const ExerciseAreaText = styled.h1`
  font-family: Montserrat;
  font-style: normal;
  font-weight: 600;
  font-size: 1.25rem;
  letter-spacing: 0.02em;
  margin-left: 0.375rem;
  color: ${LightGray};
`;

export const ExercisesImagesContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
`;
