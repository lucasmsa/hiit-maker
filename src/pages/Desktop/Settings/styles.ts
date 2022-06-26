import styled from 'styled-components';
import { TransparentDarkBlack } from '../../../styles/global';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
`;

export const BackButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin-top: 2vw;
  margin-left: 5%;
  height: 3.5rem;
`;

export const BackButtonText = styled.h2`
  font-family: Montserrat;
  font-style: normal;
  font-weight: 500;
  font-size: 1.5rem;
  line-height: 1.8125rem;
  letter-spacing: 0.02em;
  color: ${TransparentDarkBlack};
  margin-left: 0.5rem;
`;
