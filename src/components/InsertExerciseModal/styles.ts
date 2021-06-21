import styled from "styled-components"

interface ButtonProps {
  isHovered: boolean;
}


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


export const CancelButton = styled.div<ButtonProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 158px;
  height: 35px;
  border: 1px solid #282828;
  transform: ${props => props.isHovered && `translateY(-1.5px)`};
  transition: 0.3s ease;
  border-radius: 10px;
  cursor: pointer;
`

export const ConfirmButton = styled.div<ButtonProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 158px;
  height: 35px;
  background: #EE373F;
  box-shadow: 0px 1px 4px rgba(238, 55, 63, 0.25);
  transform: ${props => props.isHovered && `translateY(-1.5px)`};
  transition: 0.3s ease;
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
