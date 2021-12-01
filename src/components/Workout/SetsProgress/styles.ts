import styled from 'styled-components'
import { LightGray, Rage, TransparentBlackShadow, TransparentDarkBlack } from '../../../styles/global'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 64px;
  width: 65%;
  height: 100%;
`

export const ExerciseText = styled.h2`
  font-family: Montserrat;
  font-style: normal;
  font-weight: normal;
  font-size: 150%;
  line-height: 29px;
  margin-left: 15%;
  letter-spacing: 0.02em;
  color: ${TransparentDarkBlack};
`

export const HeaderTextContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: 28px 0;
`

export const RedExerciseText = styled.span`
  font-weight: 600;
  color: ${Rage};
`
  
export const TrainingTimeClockText = styled.h2`
  font-family: Montserrat;
  font-style: normal;
  font-weight: normal;
  font-size: 250%;
  line-height: 98px;
  letter-spacing: 0.02em;
  color: ${TransparentDarkBlack};
`

export const ExerciseImage = styled.img`
  width: 70%;
  height: 45%;
  filter: drop-shadow(0px 1px 2px ${TransparentBlackShadow});
  align-self: center;
  border-radius: 10px;
  margin-bottom: 24px;
`

export const BottomContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 36%;
`

export const TrainingTimeContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
  align-items: center;
  margin-left: 0;
  margin-bottom: 0;
`

export const TrainingProgressContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  align-items: flex-start;  
  margin-bottom: 0;
  justify-content: flex-start;
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

export const ProgressBlock = styled.div`
  display: flex;
  border-radius: 20px;
  align-self: flex-start;
  flex-direction: column;
  width: 65%;
  margin-left: 5%;
  height: 100%;
  box-shadow: 0px 1px 4px ${TransparentBlackShadow};
`

export const ProgressBlockTimesBottom = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background: ${Rage};
  width: 100%;
  height: 64px;
  box-shadow: 0px 1px 2px rgba(238, 55, 63, 0.5);
  border-radius: 20px;
  margin-top: auto; 
`

export const ProgressBlockBottomText = styled.h2`
  font-family: Montserrat;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
  letter-spacing: 0.02em;
  color: ${LightGray};
`

export const ProgressBlockHeaderText = styled.h2`
  font-family: Montserrat;
  font-style: normal;
  font-weight: 600;
  align-self: center;
  margin-top: 4%;
  font-size: 14px;
  line-height: 17px;
  letter-spacing: 0.02em;
  color: ${Rage};
  margin-bottom: 4%;
`

export const ExercisesOnSetContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 5%;
  margin-right: 5%;
  overflow-y: scroll;
  margin-bottom: 24px;
  ::-webkit-scrollbar {
    width: 5px;
  }

  ::-webkit-scrollbar-thumb {
    background: #908A8A;
    opacity: 0.8;
    border-radius: 20px;
  }
`

export const ExercisesOnSetText = styled.h2`
  font-family: Montserrat;
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 17px;
  letter-spacing: 0.02em;
  color: ${TransparentDarkBlack};
`

export const InsideSetContainer = styled.div`
  display: flex;
  flex-direction: row;
`

export const DotsContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: auto;
  align-items: center;
  margin-right: 5%;
`

export const ExercisesOnSetDots = styled.div`
  display: flex;
  flex-direction: column;
`