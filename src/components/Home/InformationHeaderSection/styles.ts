import styled from 'styled-components';
import { Rage, TransparentDarkBlack, White } from '../../../styles/global';

interface HeaderContainerProps {
  color: 'BLACK' | 'RED';
  small: boolean;
  medium: boolean;
}

interface InformationContainerProps {
  small: boolean;
  medium: boolean;
}

export const HeaderTexts = styled.h2`
  font-family: Montserrat;
  font-style: normal;
  font-weight: 600;
  font-size: 1.9vw;
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
  width: ${({ small, medium }) => (small ? '90%' : medium ? '100%' : '120%')};
  height: 2.875rem;
  padding-left: 3rem;
`;

export const InformationContainer = styled.div<InformationContainerProps>`
  display: flex;
  flex-direction: row;
  width: ${({ small, medium }) => (small ? '25%' : medium ? '40%' : '120%')};
  margin-right: 2.625rem;
`;

export const LeftTriangle = styled.div`
  position: absolute;
  width: 0;
  height: 0;
  border-bottom: 2.875rem solid white;
  border-right: 1.5rem solid transparent;
`;

export const RightTriangle = styled.div`
  position: relative;
  width: 0;
  height: 0;
  margin-left: -1.5rem;
  border-bottom: 2.875rem solid white;
  border-left: 1.5rem solid transparent;
`;
