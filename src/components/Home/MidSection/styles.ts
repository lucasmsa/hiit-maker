import styled from 'styled-components'
import { DarkGray, FennelFiesta, Rage, TransparentLightBlack, White } from '../../../styles/global'
import { ReactComponent as HorizontalDumbellIcon} from '../../../assets/images/midSection/horizontal-dumbell.svg'


export const Container = styled.div`
  display: flex;
  flex-direction: column;
`

export const SetsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 16px;
`

export const CurrentTrainingSetsContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
`

export const AddSetText = styled.h3`
  font-family: Montserrat;
  font-style: normal;
  font-weight: 600;
  font-size: 9px;
  line-height: 11px;
  letter-spacing: 0.02em;
  color: ${FennelFiesta};
  margin-top: 4px;
`

export const HorizontalDumbell = styled(HorizontalDumbellIcon)`
  margin-left: auto;
  margin-right: -36px;
`

export const SetsLimitText = styled.h3`
  font-family: Montserrat;
  font-style: normal;
  font-weight: 600;
  font-size: 9px;
  line-height: 11px;
  letter-spacing: 0.02em;
  color: ${TransparentLightBlack};
  margin-bottom: 8px;
  align-self: center;
`

export const SetsLimitCountText = styled.span`
  color: ${Rage}
`

export const AddSetContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 26px;
  cursor: pointer;
  width: 56.4px;
`

export const RemoveSetContainer = styled.div`
  margin-top: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`


export const HeaderTextContainer = styled.div`
  display: flex;
  align-items: center;
  background: ${Rage};
  height: 46px;
  width: 90%;
  margin-left: -56px;
  margin-top: 42px;
`

export const HeaderInfoContainer = styled.div`
  display: flex;
  flex-direction: row;
`

export const RightTriangle = styled.div`
  width: 0;
  height: 0;
  border-bottom: 46px solid white;
  border-left: 24px solid transparent;
  align-self: flex-end;
  margin-left: -24px;
`

export const RemoveSetText = styled.h3`
  font-family: Montserrat;
  font-style: normal;
  font-weight: 600;
  font-size: 9px;
  line-height: 11px;
  letter-spacing: 0.02em;
  color: ${Rage};
  margin-top: 4px;
`


export const ExercisesContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  flex: 1;
  height: 100vh;
  margin-left: 34px;
`

export const WorkoutContainer = styled.div``

export const HeaderTextStyle = styled.h1`
  font-family: Montserrat;
  align-self: center;
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 29px;
  letter-spacing: 0.02em;
  color: ${White};
  margin-left: auto;
  margin-right: 36px;
`