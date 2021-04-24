import React from 'react'
import { Container, HeaderTextStyle, WorkoutContainer } from './styles'
import MountWorkout from '../mountWorkout'

export default function MidSection() {
  return (
    <Container>
      <HeaderTextStyle>Create your workout with a few steps</HeaderTextStyle>
      <WorkoutContainer>
        <MountWorkout />
      </WorkoutContainer>
    </Container>
  )
}