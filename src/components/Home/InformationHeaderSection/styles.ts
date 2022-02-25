import styled from 'styled-components';
import { Rage, TransparentDarkBlack, White } from '../../../styles/global';

interface HeaderContainerProps {
  color: 'BLACK' | 'RED';
}

export const HeaderTexts = styled.h2`
  font-family: Montserrat;
  font-style: normal;
  font-weight: 600;
  font-size: 1.5rem;
  line-height: 1.8125rem;
  letter-spacing: 0.02em;
  align-items: center;
  margin-left: 0.75rem;
  color: ${White};
`;

export const HeaderContainer = styled.div<HeaderContainerProps>`
  display: flex;
  align-items: center;
  background: ${({ color }) => (color === 'BLACK' ? TransparentDarkBlack : Rage)};
  width: 120%;
  height: 2.875rem;
  margin-right: 2rem;
  padding-left: 3rem;
`;

export const InformationContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 120%;
  margin-right: 2.625rem;
`;

export const LeftTriangle = styled.div`
  position: absolute;
  width: 0;
  height: 0;
  border-bottom: 2.875rem solid white;
  border-right: 1.5rem solid transparent;
`;
