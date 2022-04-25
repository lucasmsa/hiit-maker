import styled from 'styled-components';
import { Rage, White } from '../../../styles/global';

export const Container = styled.div`
  width: 30vw;
  height: 100vh;
  background: ${Rage};
  margin-left: auto;
`;

export const NextExercisesContainer = styled.div`
  margin-top: 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const NextExercisesTitleText = styled.h2`
  font-family: Montserrat;
  font-style: normal;
  font-weight: 600;
  font-size: 1.5rem;
  letter-spacing: 0.02em;
  color: ${White};
`;

export const NextExercisesDivider = styled.div`
  width: 25vw;
  height: 0.125rem;
  background: ${White};
  margin: 1.5rem 0 2rem 0;
`;

export const NextExercisesWithImageOuterContainer = styled.div`
  display: flex;
  width: 25vw;
  height: 25vh;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const NextExercisesWithImageInnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 1rem;
  align-items: center;
`;

export const ExerciseImage = styled.img`
  width: 9rem;
  height: 8rem;
  border-radius: 0.625rem;
  margin-bottom: 1rem;
`;

export const ExerciseName = styled.h3`
  width: 9rem;
  font-family: Montserrat;
  text-align: center;
  font-style: normal;
  font-weight: 600;
  font-size: 0.875rem;
  line-height: 1.0625rem;
  letter-spacing: 0.02em;
  color: #ffffff;
`;
