import React from 'react'
import { Container, SetHeader } from './styles'
import ExerciseSetCard from '../ExerciseSetCard'
import Squat from '../../assets/images/ExercisesMedia/legs/squat-challenge2.jpg'
import PushUp from '../../assets/images/ExercisesMedia/chest/young-man-doing-push-ups-fitness-club_23-2147949580.jpg'

export default function MountWorkout() {
  return (
    <Container>
      <SetHeader>Set 1</SetHeader>
      <ExerciseSetCard
        name={'SQUAT WITHOUT DUMBELLS'}
        image={Squat}
      />
      <ExerciseSetCard
        name={'REGULAR PUSH UPS'}
        image={PushUp}
      />
    </Container>
  )
}