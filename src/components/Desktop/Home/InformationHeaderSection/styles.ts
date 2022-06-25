import styled from 'styled-components';
import { Rage, TransparentDarkBlack, White } from '../../../../styles/global';

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
  font-size: 120%;
  line-height: 1.8125rem;
  letter-spacing: 0.02em;
  align-items: center;
  margin-left: 1rem;
  color: ${White};
`;
const headerContainerMediumSizeConditional = (medium: boolean) => (medium ? '110%' : '120%');
const informationContainerMediumSizeConditional = (medium: boolean) => (medium ? '50%' : '120%');

export const HeaderContainer = styled.div<HeaderContainerProps>`
  display: flex;
  align-items: center;
  background: ${({ color }) => (color === 'BLACK' ? TransparentDarkBlack : Rage)};
  width: ${({ small, medium }) => (small ? '100%' : headerContainerMediumSizeConditional(medium))};
  height: 6vh;
  padding-left: 3rem;
`;

export const InformationContainer = styled.div<InformationContainerProps>`
  display: flex;
  flex-direction: row;
  width: ${({ small, medium }) =>
    small ? '25%' : informationContainerMediumSizeConditional(medium)};
  margin-right: 2.625rem;
`;

export const LeftTriangle = styled.div`
  position: absolute;
  width: 0;
  height: 0;
  z-index: 5;
  border-bottom: 6.1vh solid white;
  margin-left: -0.08vw;
  border-right: 2.1vw solid transparent;
`;

export const RightTriangle = styled.div`
  position: relative;
  z-index: 5;
  width: 0;
  height: 0;
  margin-left: -2.1vw;
  border-bottom: 6.1vh solid white;
  border-left: 2.1vw solid transparent;
`;
