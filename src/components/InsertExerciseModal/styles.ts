import styled from "styled-components"

export const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
`

export const ModalTopContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`

export const ModalContentContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 30px;
`

export const ModalExerciseImage = styled.img`
  display: block;
  max-width:120px;
  max-height:100px;
  width: auto;
  height: auto;
  border-radius: 10px;
`

export const ModalTextAndButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 20px;
`


export const CancelButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 158px;
  height: 35px;
  border: 1px solid #282828;
  transition: 0.3s ease;
  &:hover {
    transform: translateY(-1.5px);
  }
  border-radius: 10px;
  cursor: pointer;
`

export const ConfirmButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 158px;
  height: 35px;
  background: #EE373F;
  box-shadow: 0px 1px 4px rgba(238, 55, 63, 0.25);
  transition: 0.3s ease;
  &:hover {
    transform: translateY(-1.5px);
  }
  border-radius: 10px;
  cursor: pointer;
`

export const CancelButtonText = styled.h4`
  font-family: Montserrat;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
  letter-spacing: 0.02em;
  color: #282828;
`

export const ConfirmButtonText = styled.h4`
  font-family: Montserrat;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
  letter-spacing: 0.02em;
  color: #EBEBEB;
`



export const ExerciseSelectionText = styled.h1`
  font-family: Montserrat;
  font-style: normal;
  font-weight: normal;
  font-size: 24px;
  line-height: 29px;
  letter-spacing: 0.02em;
  color: #282828;
`



export const ExerciseDescriptionText = styled.h3`
  font-family: Montserrat;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 17px;
  letter-spacing: 0.02em;
  color: #282828;
  margin-bottom: 16px;
`

export const ConfirmExerciseBoldText = styled.h2`
  font-family: Montserrat;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
  letter-spacing: 0.02em;
  color: #282828;
  margin-bottom: 32px;
`


export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`

export const ExercisesLimitToastContainer = styled.div`
  padding: 16px;
  font-family: Montserrat;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.6);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

export const ExercisesLimitToastHeaderText = styled.h1`
  font-family: Montserrat;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 29px;
  letter-spacing: 0.02em;
  color: rgba(0, 0, 0, 0.87);
`;

export const ExercisesLimitToastBottomText = styled.h1`
  font-family: Montserrat;
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 17px;
  text-align: center;
  letter-spacing: 0.02em;
  color: rgba(0, 0, 0, 0.6);
  margin-top: 8px;
`;