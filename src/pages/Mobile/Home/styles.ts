import styled from 'styled-components';
import { Rage } from '../../../styles/global';

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${Rage};
`;

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 80%;
  height: 80%;
  margin: auto;
`;

export const ResponsivityExplanationText = styled.h3`
  font-family: Montserrat;
  font-style: normal;
  font-weight: 700;
  font-size: 120%;
  line-height: 1.8125rem;
  text-align: center;
  letter-spacing: 0.02em;
  color: #ffffff;
`;
