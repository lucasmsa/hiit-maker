import React from 'react'
import {
  Container,
  AddSetText,
  RemoveSetText,
  SetsContainer,
  HeaderTextStyle, 
  AddSetContainer,
  WorkoutContainer,
  RemoveSetContainer,
  ExercisesContainer, 
  CurrentTrainingSetsContainer,
} from './styles'
import { ReactComponent as AddSetIcon } from '../../assets/images/midSection/addSet.svg'
import { ReactComponent as SelectedSetIcon } from '../../assets/images/midSection/selected-set.svg'
import { ReactComponent as NotSelectedSetIcon } from '../../assets/images/midSection/not-selected-set.svg'
import { ReactComponent as ConnectingLine } from '../../assets/images/midSection/connecting-line.svg'
import {ReactComponent as RemoveSetIcon} from '../../assets/images/midSection/removeSet.svg'
import MountWorkout from '../mountWorkout'

export default function MidSection() {
  return (
    <Container>
      <HeaderTextStyle>Create your workout with a few steps</HeaderTextStyle>
      <ExercisesContainer>
      <SetsContainer>
        <CurrentTrainingSetsContainer>
            <SelectedSetIcon />
            <ConnectingLine />
            <NotSelectedSetIcon />
            <ConnectingLine />
            <NotSelectedSetIcon/>
        </CurrentTrainingSetsContainer>
        <AddSetContainer>
          <AddSetIcon />
          <AddSetText>Add set</AddSetText>
        </AddSetContainer>
        <RemoveSetContainer>
          <RemoveSetIcon />
          <RemoveSetText>Remove set</RemoveSetText>
        </RemoveSetContainer>
      </SetsContainer>
        <WorkoutContainer>
          <MountWorkout />
        </WorkoutContainer>
      </ExercisesContainer>
  </Container>
  )
}