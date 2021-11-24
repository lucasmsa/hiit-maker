import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Dispatch } from 'redux'
import {
  Container,
  SetHeader,
  SetCounter,
  CounterText,
  SetRestTest,
  SetRestContainer,
  FooterContainer,
  ExercisesLimitText,
  OperationContainer,
  ExercisesLimitCountText,
  ScrollableExercisesContainer,
} from './styles'
import { connect, shallowEqual, useDispatch, useSelector } from 'react-redux'
import ExerciseSetCard from '../ExerciseSetCard'
import { ReactComponent as PlusIconCounter } from '../../../assets/images/midSection/plus-set-counter-icon.svg'
import { ReactComponent as MinusIconCounter } from '../../../assets/images/midSection/minus-set-counter-icon.svg'
import { getCurrentSet, getSetRestTime, getTrainingSetExercises, getTrainingSetLoopQuantity } from '../../../store/selectors'
import { updateCurrentSetLoopQuantity, updateSetRest } from '../../../store/actionCreators'
import toast from 'react-hot-toast'
import ErrorToast from '../../../toasts/ErrorToast'
import TimeInput from '../TimeInput'
import isNumeric from '../../../utils/isNumeric'

interface WorkoutProps {
  id?: string
}

const optionsOperation = {
  plus: 1,
  minus: -1
}

const MountWorkout = ({ id }: WorkoutProps) => {
  const dispatch: Dispatch<any> = useDispatch();
  const scrollRef = useRef<any | null>(null)

  const setRestTime = useSelector(getSetRestTime)
  const currentSet = useSelector(getCurrentSet, shallowEqual);
  const currentSetLoopQuantity = useSelector(getTrainingSetLoopQuantity)
  const currentSetExercises = useSelector(getTrainingSetExercises, shallowEqual)

  const [currentSetExercisesState, setCurrentSetExercisesState] = useState(currentSetExercises)
  const [setRestTimeInput, setSetRestTimeInput] = useState(setRestTime)
  const [currentSetState, setCurrentSetState] = useState(currentSet)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (currentSetState !== currentSet) {
      setTimeout(() => {
        setLoading(true)
        setCurrentSetState(currentSet)
        setCurrentSetExercisesState(currentSetExercises)
        setLoading(false)
      }, 250)
    } else {
      setCurrentSetExercisesState(currentSetExercises)
    }

  }, [currentSet, currentSetExercises, currentSetState])

  const handleExerciseCounter = useCallback((option: 'plus' | 'minus') => {
    if (currentSetExercises?.length) {
      try {
        dispatch(updateCurrentSetLoopQuantity(currentSetLoopQuantity + optionsOperation[option], currentSet));
      } catch (error) {
        toast(ErrorToast({ message: "Set Loops must stay between 1 and 5!" }))
      }
    }
  }, [currentSet, currentSetExercises, currentSetLoopQuantity, dispatch])

  return (
    <Container>
      <SetHeader>Set {currentSet + 1}</SetHeader>
      <ScrollableExercisesContainer ref={scrollRef}>
        {loading ? <></> : currentSetExercisesState.map((exercise: Exercise, index: number) => (
          <ExerciseSetCard
            set={currentSet}
            index={index}
            key={exercise.name}
            name={exercise.name}
            image={exercise.image}
            restTime={exercise.restTime}
            trainTime={exercise.trainTime}
          />))
        }
      </ScrollableExercisesContainer>
      <FooterContainer>
        <ExercisesLimitText>
          Exercises Limit <ExercisesLimitCountText>{currentSetExercises?.length}</ExercisesLimitCountText>/5
        </ExercisesLimitText>
        <SetRestContainer>
          {currentSetExercises.length ? (
            <>
              <SetRestTest>SET REST</SetRestTest>
              <TimeInput
                value={setRestTimeInput}
                onChange={(event: any) => {
                  if (isNumeric(event.target.value)) {
                    const updatedValue = Number(event.target.value)
                    setSetRestTimeInput(updatedValue);
                    dispatch(updateSetRest(currentSet, updatedValue))
                  } else if (event.target.value === '') {
                    setSetRestTimeInput(0);
                    dispatch(updateSetRest(currentSet, 0))
                  }
                }}
              />
            </>
          ) : <></>}
        </SetRestContainer>
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
            {currentSetExercises?.length ? currentSetLoopQuantity : 0} {(!currentSetExercises?.length || currentSetLoopQuantity !== 1) ? 'TIMES' : 'TIME '}
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