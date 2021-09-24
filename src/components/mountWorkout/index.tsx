import React, { useCallback, useState } from 'react'
import {
  Container,
  SetHeader,
  FooterContainer,
  PlusContainer,
  PlusInfoText,
  CounterText,
  SetCounter
} from './styles'
import ExerciseSetCard from '../ExerciseSetCard'
import Squat from '../../assets/images/ExercisesMedia/legs/squat-challenge2.jpg'
import { ReactComponent as PlusIcon } from '../../assets/images/midSection/plus-icon.svg'
import { ReactComponent as PlusIconCounter } from '../../assets/images/midSection/plus-set-counter-icon.svg'
import { ReactComponent as MinusIconCounter } from '../../assets/images/midSection/minus-set-counter-icon.svg'
import PushUp from '../../assets/images/ExercisesMedia/chest/young-man-doing-push-ups-fitness-club_23-2147949580.jpg'

interface WorkoutProps {
  id?: string
}

export default function MountWorkout({ id }: WorkoutProps) {
  const [trainingSetCounter, setTrainingSetCounter] = useState<number>(0)

  const handleExerciseCounter = useCallback((option: 'plus' | 'minus') => {
    if (option === 'plus') {
      trainingSetCounter < 5 && setTrainingSetCounter(trainingSetCounter + 1)
    } else {
      trainingSetCounter > 0 && setTrainingSetCounter(trainingSetCounter - 1)
    }
  }, [trainingSetCounter])

  return (
    <Container>
      <SetHeader>Set 1</SetHeader>

      <FooterContainer>
        <PlusContainer>
          <PlusIcon />
          <PlusInfoText>Click on an exercise to add it to your training set</PlusInfoText>
        </PlusContainer>
        <SetCounter>
          <PlusIconCounter
            onClick={() => handleExerciseCounter('plus')}
            style={{ marginRight: '48px', cursor: 'pointer' }}
          />
          <CounterText>
            {trainingSetCounter} TIMES
          </CounterText>
          <MinusIconCounter
            onClick={() => handleExerciseCounter('minus')}
            style={{ marginLeft: '48px', cursor: 'pointer' }} />
        </SetCounter>
      </FooterContainer>
    </Container>
  )
}