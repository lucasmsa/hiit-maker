import styled from 'styled-components';
import { TransparentDarkBlack, TransparentLightBlack } from '../../styles/global';

export const ExercisesLimitToastContainer = styled.div`
  padding: 16px;
  font-family: Montserrat;
  font-size: 14px;
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
  font-size: 16px;
  line-height: 29px;
  margin-bottom: 12px;
  letter-spacing: 0.02em;
  color: ${TransparentDarkBlack};
`;

export const ExercisesLimitToastBottomText = styled.h1`
  font-family: Montserrat;
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 17px;
  text-align: center;
  letter-spacing: 0.02em;
  color: rgba(0, 0, 0, 0.6);
  margin-top: 12px;
`;
