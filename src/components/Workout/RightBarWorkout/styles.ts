import styled from 'styled-components';
import { Rage, White } from '../../../styles/global';

export const Container = styled.div`
  width: 40vw;
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
  width: 80%;
  height: 0.125rem;
  background: ${White};
  margin: 1.5rem 0 2rem 0;
`;

export const NextExercisesWithImageOuterContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 5%;
  margin-bottom: 5%;
  justify-content: center;
  height: 20vh;
  width: 100%;
`;

export const NextExercisesWithImageInnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 0.5rem;
  align-items: center;
  margin-bottom: auto;
`;

export const ExerciseImage = styled.img`
  width: 9vw;
  height: 12vh;
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

export const SetsProgreessContainer = styled.div`
  margin-top: 2rem;
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

export const NoExercisesLeftText = styled.h3`
  font-family: Montserrat;
  font-style: normal;
  font-weight: 600;
  font-size: 1rem;
  line-height: 1.25rem;
  letter-spacing: 0.02em;
  color: ${White};
`;
