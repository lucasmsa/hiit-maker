import React from 'react'
import { ReactComponent as RedCircleToastIcon } from '../../assets/images/midSection/redCircle.svg'
import {
  ExercisesLimitToastHeaderText,
  ExercisesLimitToastContainer,
  ExercisesLimitToastBottomText
} from './styles'

interface ErrorToastProps {
  message: string
}

const ErrorToast = ({ message }: ErrorToastProps) => {
  return (
    <ExercisesLimitToastContainer>
      <ExercisesLimitToastHeaderText>This action is not possible</ExercisesLimitToastHeaderText>
      <RedCircleToastIcon />
      <ExercisesLimitToastBottomText>{ message }</ExercisesLimitToastBottomText>
    </ExercisesLimitToastContainer>
  )
}

export default ErrorToast