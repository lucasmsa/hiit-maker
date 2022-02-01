import React, { useCallback, useState } from 'react'
import { Dispatch } from 'redux'
import {
  Container,
  SettingsHeaderContainer,
  SettingsHeaderText,
  SetCounter,
  CounterText,
  SetRestTest,
  SetRestContainer,
  FooterContainer,
  ExercisesLimitText,
  OperationContainer,
  ExercisesLimitCountText,
  SettingsHeaderIcon,
} from './styles'
import { connect, shallowEqual, useDispatch, useSelector } from 'react-redux'
import { ReactComponent as PlusIconCounter } from '../../../assets/images/midSection/plus-set-counter-icon.svg'
import { ReactComponent as MinusIconCounter } from '../../../assets/images/midSection/minus-set-counter-icon.svg'
import { getCurrentSet, getSetRestTime, getTrainingSetExercises, getTrainingSetLoopQuantity } from '../../../store/selectors'
import { updateCurrentSetLoopQuantity } from '../../../store/actionCreators'
import toast from 'react-hot-toast'
import ErrorToast from '../../../toasts/ErrorToast'

interface WorkoutProps {
  id?: string
}

const optionsOperation = {
  plus: 1,
  minus: -1
}

const SettingsMenu = ({ id }: WorkoutProps) => {
  const dispatch: Dispatch<any> = useDispatch();
  const setRestTime = useSelector(getSetRestTime)
  const currentSet = useSelector(getCurrentSet, shallowEqual);
  const currentSetLoopQuantity = useSelector(getTrainingSetLoopQuantity)
  const currentSetExercises = useSelector(getTrainingSetExercises, shallowEqual)
  const [setRestTimeInput, setSetRestTimeInput] = useState(setRestTime)

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
      <SettingsHeaderContainer>
        <SettingsHeaderIcon />
        <SettingsHeaderText>Settings</SettingsHeaderText>
      </SettingsHeaderContainer>
      <FooterContainer>
        <ExercisesLimitText>
          Exercises Limit <ExercisesLimitCountText>{currentSetExercises?.length}</ExercisesLimitCountText>/5
        </ExercisesLimitText>
        <SetRestContainer>
          {currentSetExercises.length ? (
            <>
              <SetRestTest>SET REST</SetRestTest>
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
              {currentSetExercises?.length ? currentSetLoopQuantity : 0} {(!currentSetExercises?.length || currentSetLoopQuantity !== 1) ? 'SET REPETITIONS' : 'SET REPETITION '}
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


export default connect()(SettingsMenu)