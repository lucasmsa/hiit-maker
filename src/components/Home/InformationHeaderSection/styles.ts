import styled from 'styled-components'
import { Rage, TransparentDarkBlack, White } from '../../../styles/global'

interface HeaderContainerProps {
  color: 'BLACK' | 'RED';
}

export const HeaderTexts = styled.h2`
  font-family: Montserrat;
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 29px;
  letter-spacing: 0.02em;
  align-items: center;
  margin-left: 12px;
  color: ${White};
`

export const HeaderContainer = styled.div<HeaderContainerProps>`
  display: flex;
  align-items: center;
  background: ${({ color }) => color === 'BLACK' ? TransparentDarkBlack : Rage};
  width: 120%;
  height: 46px;
  margin-right: 32px;
  padding-left: 48px;
`

export const InformationContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 120%;
  margin-right: 42px;
`

export const LeftTriangle = styled.div`
  position: absolute;
  width: 0;
  height: 0;
  border-bottom: 46px solid white;
  border-right: 24px solid transparent;
`
