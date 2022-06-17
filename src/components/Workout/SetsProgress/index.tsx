import React from 'react';
import { useSelector } from 'react-redux';
import {
  getCurrentSet,
  getCurrentSetExercises,
  getTrainSetLoops
} from '../../../store/training/selectors';
import {
  getWorkoutExecutionCurrentExercise,
  getWorkoutExecutionCurrentSet,
  getWorkoutExecutionCurrentSetLoopIndex
} from '../../../store/workoutExecution/selectors';
import {
  BottomContainer,
  Container,
  DotsContainer,
  ExercisesOnSetContainer,
  ExercisesOnSetText,
  InsideSetContainer,
  ProgressBlock,
  ProgressBlockBottomText,
  ProgressBlockHeaderText,
  ProgressBlockTimesBottom,
  StyledConnectingLine,
  StyledNotSelectedSetIcon,
  StyledSelectedSetIcon,
  TrainingProgressContainer
} from './styles';

const SetsProgress = () => {
  const training = useSelector(getTrainSetLoops);
  const currentSet = useSelector(getWorkoutExecutionCurrentSet);
  const setLoopsQuantity = training[currentSet].loops;
  const currentExerciseIndex = useSelector(getWorkoutExecutionCurrentExercise);
  const setExercises = useSelector(() => getCurrentSetExercises(training, currentSet));
  const currentSetLoopIndex = useSelector(getWorkoutExecutionCurrentSetLoopIndex);
  const setLoopsLeft = setLoopsQuantity - (currentSetLoopIndex + 1);

  return (
    <Container>
      <BottomContainer>
        <TrainingProgressContainer>
          <ProgressBlock>
            <ProgressBlockHeaderText>PROGRESS</ProgressBlockHeaderText>
            <ExercisesOnSetContainer>
              {setExercises.map(({ name }, index) => {
                const setIcon =
                  currentExerciseIndex === index ? (
                    <StyledSelectedSetIcon />
                  ) : (
                    <StyledNotSelectedSetIcon onClick={() => {}} />
                  );
                return (
                  <InsideSetContainer>
                    <ExercisesOnSetText style={{ marginTop: index > 0 ? '1.75rem' : 0 }}>
                      {name.toUpperCase()}
                    </ExercisesOnSetText>
                    <DotsContainer>
                      {index !== 0 && <StyledConnectingLine />}
                      {setIcon}
                    </DotsContainer>
                  </InsideSetContainer>
                );
              })}
            </ExercisesOnSetContainer>
            <ProgressBlockTimesBottom>
              <ProgressBlockBottomText>
                {setLoopsLeft ? `${setLoopsLeft} SET REPETITIONS LEFT` : 'LAST SET REPETITION'}
              </ProgressBlockBottomText>
            </ProgressBlockTimesBottom>
          </ProgressBlock>
        </TrainingProgressContainer>
      </BottomContainer>
    </Container>
  );
};

export default SetsProgress;
