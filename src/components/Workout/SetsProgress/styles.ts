import styled from 'styled-components'
import { Rage, TransparentDarkBlack } from '../../../styles/global'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 64px;
`

export const ExerciseText = styled.h2`
  font-family: Montserrat;
  font-style: normal;
  font-weight: normal;
  font-size: 24px;
  line-height: 29px;
  letter-spacing: 0.02em;
  color: ${TransparentDarkBlack};
`

export const HeaderTextContainer = styled.div`
  margin: 28px 0;
`

export const RedExerciseText = styled.span`
  font-weight: 600;
  color: ${Rage};
`

export const ExerciseImage = styled.img`
  width: 762px;
  height: 380px;
  filter: drop-shadow(0px 1px 2px rgba(0, 0, 0, 0.25));
  border-radius: 10px;
  margin-bottom: 36px;
`

export const BottomContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`

export const TrainingTimeContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  align-items: center;
`

export const TrainingProgressContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`

export const TrainingTimeRedText = styled.h2`
  font-family: Montserrat;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
  letter-spacing: 0.02em;
  color: ${Rage};
`