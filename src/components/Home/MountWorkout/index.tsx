import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Dispatch } from 'redux';
import {
  Container,
  SetHeaderText,
  SetCounter,
  CounterText,
  SetRestTest,
  SetRestContainer,
  FooterContainer,
  ExercisesLimitText,
  OperationContainer,
  ExercisesLimitCountText,
  ScrollableExercisesContainer,
  CountTextContainer,
  Header,
  ResetIcon,
  BlankSpace
} from './styles';
import { connect, shallowEqual, useDispatch, useSelector } from 'react-redux';
import ExerciseSetCard from '../ExerciseSetCard';
import { ReactComponent as PlusIconCounter } from '../../../assets/images/midSection/plus-set-counter-icon.svg';
import { ReactComponent as MinusIconCounter } from '../../../assets/images/midSection/minus-set-counter-icon.svg';
import {
  getCurrentSet,
  getSetRestTime,
  getTrainingSetExercises,
  getTrainingSetLoopQuantity
} from '../../../store/training/selectors';
import {
  updateCurrentSetLoopQuantity,
  updateSetRest
} from '../../../store/training/actionCreators';
import toast from 'react-hot-toast';
import ErrorToast from '../../../toasts/ErrorToast';
import TimeInput from '../TimeInput';
import { configurationBoundaries } from '../../../utils/settings/configurationBoundaries';
import ResetWorkoutModal from '../ResetWorkoutModal';

const optionsOperation = {
  plus: 1,
  minus: -1
};

const MountWorkout = () => {
  const dispatch: Dispatch<any> = useDispatch();
  const scrollRef = useRef<any | null>(null);
  const currentSet = useSelector(getCurrentSet, shallowEqual);
  const setRestTime = useSelector(getSetRestTime);
  const currentSetLoopQuantity = useSelector(getTrainingSetLoopQuantity);
  const currentSetExercises = useSelector(getTrainingSetExercises, shallowEqual);
  const [resetChangesModalOpen, setResetChangesModalOpen] = useState(false);
  const [currentSetExercisesState, setCurrentSetExercisesState] = useState(currentSetExercises);
  const [setRestTimeInput, setSetRestTimeInput] = useState(setRestTime);
  const [currentSetState, setCurrentSetState] = useState(currentSet);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setSetRestTimeInput(setRestTime);
    if (currentSetState !== currentSet) {
      setTimeout(() => {
        setLoading(true);
        setCurrentSetState(currentSet);
        setCurrentSetExercisesState(currentSetExercises);
        setLoading(false);
      }, 250);
    } else {
      setCurrentSetExercisesState(currentSetExercises);
    }
  }, [currentSet, currentSetExercises, currentSetState, setRestTime]);

  const handleExerciseCounter = useCallback(
    (option: 'plus' | 'minus') => {
      if (currentSetExercises?.length) {
        try {
          dispatch(
            updateCurrentSetLoopQuantity(
              currentSetLoopQuantity + optionsOperation[option],
              currentSet
            )
          );
        } catch (error) {
          toast(ErrorToast({ message: 'Set Loops must stay between 1 and 5!' }));
        }
      }
    },
    [currentSet, currentSetExercises, currentSetLoopQuantity, dispatch]
  );

  return (
    <Container>
      <Header>
        <BlankSpace />
        <SetHeaderText>Set {currentSet + 1}</SetHeaderText>
        <ResetIcon
          onClick={() => {
            setResetChangesModalOpen(true);
          }}
          icon={'codicon:debug-restart'}
        />
      </Header>
      <ScrollableExercisesContainer ref={scrollRef}>
        {loading ? (
          <></>
        ) : (
          currentSetExercisesState.map((exercise: Exercise, index: number) => (
            <ExerciseSetCard
              set={currentSet}
              index={index}
              key={exercise.name}
              name={exercise.name}
              image={exercise.image}
              restTime={exercise.restTime}
              trainTime={exercise.trainTime}
            />
          ))
        )}
      </ScrollableExercisesContainer>
      <FooterContainer>
        <ExercisesLimitText>
          Exercises Limit{' '}
          <ExercisesLimitCountText>{currentSetExercises?.length}</ExercisesLimitCountText>/5
        </ExercisesLimitText>
        <SetRestContainer>
          {currentSetExercises.length ? (
            <>
              <SetRestTest>SET REST</SetRestTest>
              <TimeInput
                value={setRestTimeInput}
                onChange={(event: any) => {
                  const { value } = event.target;
                  if (isNaN(+value)) return;
                  return setSetRestTimeInput(value as any);
                }}
                onFocusOut={(event: any) => {
                  const { value } = event.target;
                  if (value === '' || Number(value) < configurationBoundaries.setRestTime.min) {
                    setSetRestTimeInput(configurationBoundaries.setRestTime.min);
                    dispatch(updateSetRest(currentSet, configurationBoundaries.setRestTime.min));
                  } else {
                    dispatch(updateSetRest(currentSet, Number(value)));
                  }
                }}
              />
            </>
          ) : (
            <></>
          )}
        </SetRestContainer>
        <SetCounter>
          <OperationContainer
            onClick={() => handleExerciseCounter('plus')}
            style={{ marginRight: '24px' }}>
            <PlusIconCounter style={{ cursor: 'pointer' }} />
          </OperationContainer>
          <CountTextContainer>
            <CounterText>
              {currentSetExercises?.length ? currentSetLoopQuantity : 0}{' '}
              {!currentSetExercises?.length || currentSetLoopQuantity !== 1
                ? 'SET REPETITIONS'
                : 'SET REPETITION '}
            </CounterText>
          </CountTextContainer>
          <OperationContainer
            onClick={() => handleExerciseCounter('minus')}
            style={{ marginLeft: '24px' }}>
            <MinusIconCounter style={{ cursor: 'pointer' }} />
          </OperationContainer>
        </SetCounter>
      </FooterContainer>
      <ResetWorkoutModal
        closeModal={() => {
          setResetChangesModalOpen(false);
        }}
        modalOpen={resetChangesModalOpen}
      />
    </Container>
  );
};

export default connect()(MountWorkout);
