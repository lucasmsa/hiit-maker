import styled from 'styled-components';
import { TransparentDarkBlack, TransparentLightBlack } from '../../styles/global';

export const ExercisesLimitToastContainer = styled.div`
  padding: 1rem;
  font-family: Montserrat;
  font-size: 0.875rem;
  color: ${TransparentLightBlack};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const ExercisesLimitToastHeaderText = styled.h1`
  font-family: Montserrat;
  font-style: normal;
  font-weight: normal;
  font-size: 1rem;
  line-height: 1.8125rem;
  margin-bottom: 0.75rem;
  letter-spacing: 0.02em;
  color: ${TransparentDarkBlack};
`;

export const ExercisesLimitToastBottomText = styled.h1`
  font-family: Montserrat;
  font-style: normal;
  font-weight: 600;
  font-size: 0.75rem;
  line-height: 1.0625rem;
  text-align: center;
  letter-spacing: 0.02em;
  color: rgba(0, 0, 0, 0.6);
  margin-top: 0.75rem;
`;
