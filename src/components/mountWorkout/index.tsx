import React, { useCallback, useRef, useState } from 'react'
import { Dispatch } from 'redux'
import {
  Container,
  SetHeader,
  SetCounter,
  CounterText,
  PlusInfoText,
  PlusContainer,
  FooterContainer,
  ExercisesLimitText,
  OperationContainer,
  ExercisesLimitCountText,
  ScrollableExercisesContainer
} from './styles'
import { connect, shallowEqual, useDispatch, useSelector } from 'react-redux'
import ExerciseSetCard from '../ExerciseSetCard'
import { ReactComponent as PlusIconCounter } from '../../assets/images/midSection/plus-set-counter-icon.svg'
import { ReactComponent as MinusIconCounter } from '../../assets/images/midSection/minus-set-counter-icon.svg'
import { getTrainingSetExercises, getTrainingSetLoopQuantity } from '../../store/selectors' 
import { addExercise, removeExercise, updateCurrentSetLoopQuantity } from '../../store/actionCreators'
import toast from 'react-hot-toast'
import ErrorToast from '../../toasts/ErrorToast'

interface WorkoutProps {
  id?: string
}

const optionsOperation = {
  plus: 1,
  minus: -1
}

const MountWorkout = ({ id }: WorkoutProps) => {
  const dispatch: Dispatch<any> = useDispatch();
  const scrollRef = useRef<any|null>(null)
  
  const currentSetExercises = useSelector(getTrainingSetExercises, shallowEqual)
  const currentSetLoopQuantity = useSelector(getTrainingSetLoopQuantity, shallowEqual)
  const [trainingSetCounter, setTrainingSetCounter] = useState<number>(0)

  const handleExerciseCounter = useCallback((option: 'plus' | 'minus') => {
    if (currentSetExercises?.length) {
      try {
        dispatch(updateCurrentSetLoopQuantity(currentSetLoopQuantity + optionsOperation[option], 0));
      } catch (error) {
        toast(ErrorToast({message: "Set Loops must stay between 1 and 5!"}))
      }
    }
  }, [currentSetExercises, currentSetLoopQuantity, dispatch])

  return (
    <Container>
      <SetHeader>Set 1</SetHeader>
        <ScrollableExercisesContainer ref={scrollRef}>
        {currentSetExercises?.map((exercise: Exercise, index: number) => (
          <ExerciseSetCard
            key={exercise.name}
            name={exercise.name}
            image={exercise.image}
            restTime={exercise.restTime}
            trainTime={exercise.trainTime}
            removeExerseFromSet={() => dispatch(removeExercise(index, 0))}
            />            
        ))}
        </ScrollableExercisesContainer>
      <FooterContainer>
        <ExercisesLimitText>
          Exercises Limit <ExercisesLimitCountText>{currentSetExercises?.length}</ExercisesLimitCountText>/5
        </ExercisesLimitText>
        <PlusContainer>
          <PlusInfoText>Click on an exercise to add it to your training set</PlusInfoText>
        </PlusContainer>
        <SetCounter>
          <OperationContainer
            onClick={() => handleExerciseCounter('plus')}
            style={{ marginRight: '24px' }}
          >
            <PlusIconCounter
              style={{ cursor: 'pointer' }}
            />
          </OperationContainer>
          <CounterText>
            {currentSetExercises?.length ? currentSetLoopQuantity : 0} {( !currentSetExercises?.length || currentSetLoopQuantity !== 1) ? 'TIMES' : 'TIME'}
          </CounterText>
          <OperationContainer
            onClick={() => handleExerciseCounter('minus')}
            style={{ marginLeft: '24px' }}
          >
            <MinusIconCounter
              style={{ cursor: 'pointer' }}
            />
          </OperationContainer>
        </SetCounter>
      </FooterContainer>
    </Container>
  )
}


export default connect()(MountWorkout)