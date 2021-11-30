import styled from "styled-components"
import { DarkGray, LightGray, Rage } from "../../../styles/global"

export const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  z-index: 3;
  position: relative;
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
  background: ${Rage};
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
  color: ${DarkGray};
`

export const ConfirmButtonText = styled.h4`
  font-family: Montserrat;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
  letter-spacing: 0.02em;
  color: ${LightGray};
`

export const ExerciseSelectionText = styled.h1`
  font-family: Montserrat;
  font-style: normal;
  font-weight: normal;
  font-size: 24px;
  line-height: 29px;
  letter-spacing: 0.02em;
  color: ${DarkGray};
`

export const ExerciseDescriptionText = styled.h3`
  font-family: Montserrat;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 17px;
  letter-spacing: 0.02em;
  color: ${DarkGray};
  margin-bottom: 16px;
`

export const ConfirmExerciseBoldText = styled.h2`
  font-family: Montserrat;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
  letter-spacing: 0.02em;
  color: ${DarkGray};
  margin-bottom: 32px;
`

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`