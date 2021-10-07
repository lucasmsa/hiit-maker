import React, { useCallback, useState } from 'react'
import { Dispatch } from 'redux'
import {
  Container,
  SetHeader,
  FooterContainer,
  PlusContainer,
  PlusInfoText,
  CounterText,
  SetCounter
} from './styles'
import { connect, shallowEqual, useDispatch, useSelector } from 'react-redux'
import ExerciseSetCard from '../ExerciseSetCard'
import { ReactComponent as PlusIcon } from '../../assets/images/midSection/plus-icon.svg'
import { ReactComponent as PlusIconCounter } from '../../assets/images/midSection/plus-set-counter-icon.svg'
import { ReactComponent as MinusIconCounter } from '../../assets/images/midSection/minus-set-counter-icon.svg'
import { getTrainingSetExercises } from '../../store/selectors' 
import { removeExercise } from '../../store/actionCreators'

interface WorkoutProps {
  id?: string
}

const MountWorkout = ({ id }: WorkoutProps) => {
  const dispatch: Dispatch<any> = useDispatch();
  const currentSetExercises = useSelector(getTrainingSetExercises, shallowEqual)
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
      {currentSetExercises.map((exercise: Exercise, index: number) => (
        <ExerciseSetCard
          key={exercise.name}
          name={exercise.name}
          image={exercise.image}
          restTime={exercise.restTime}
          trainTime={exercise.trainTime}
          removeExerseFromSet={() => dispatch(removeExercise(index, 0))}
        />
      ))}
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


export default connect()(MountWorkout)