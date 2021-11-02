import styled from 'styled-components'

export const Container = styled.div`
  height: 77.5vh;
  width: 580px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #FFFFFF;
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.25);
  margin-right: 8px;
  border-radius: 20px;
`

export const SetHeader = styled.h2`
  margin-top: 20px;
  margin-bottom: 12px;
  font-family: Montserrat;
  font-style: normal;
  font-weight: normal;
  font-size: 24px;
`

export const FooterContainer = styled.div`
  margin-top: auto;
  display: flex;
  flex-direction: column;
  width: 100%;
`

export const PlusInfoText = styled.h2`
  margin-top: 20px;
  font-family: Montserrat;
  user-select: none;
  opacity: 0.6;
  font-style: normal;
  font-weight: 300;
  font-size: 14px;
  line-height: 17px;
  letter-spacing: 0.02em;
  color: #282828;
`

export const PlusContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 24px;
`

export const SetCounter = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 18px;
  height: 54px;
  width: 100%;
  border-radius: 20px;
  background: #EE373F;
`

export const CounterText = styled.h2`
  font-family: Montserrat;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
  letter-spacing: 0.02em;
  user-select: none;
  color: #EBEBEB;
`

export const OperationContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  height: 100%;
  width: 30px;
`

export const ScrollableExercisesContainer = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  margin-bottom: 36px;
  ::-webkit-scrollbar {
    width: 5px;
  }

  ::-webkit-scrollbar-thumb {
    background: #908A8A;
    opacity: 0.8;
    border-radius: 20px;
  }
`;

export const ExercisesLimitText = styled.h2`
  align-self: center;
  font-family: Montserrat;
  font-style: normal;
  user-select: none;
  font-weight: normal;
  font-size: 24px;
  line-height: 29px;
  letter-spacing: 0.02em;
  color: rgba(0, 0, 0, 0.87);
  margin-bottom: 20px;
` 

export const ExercisesLimitCountText = styled.span`
  color: #EE373F;
`