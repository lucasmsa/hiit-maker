import React from 'react';
import { useSelector } from 'react-redux';
import {
  getCurrentSetExercises,
  getTrainingDefaultValues,
  getTrainSetLoops
} from '../../../store/training/selectors';
import {
  getCurrentActionRemainingTime,
  getWorkoutExecutionCurrentExercise,
  getWorkoutExecutionCurrentSet,
  getWorkoutExecutionCurrentSetLoopIndex,
  getWorkoutExecutionStatus
} from '../../../store/workoutExecution/selectors';
import {
  BottomContainer,
  Container,
  DotContainer,
  DotIconAndProgressLineContainer,
  ExercisesOnSetContainer,
  ExercisesOnSetText,
  InsideSetContainer,
  ProgressBlock,
  ProgressBlockBottomText,
  ProgressBlockHeaderText,
  ProgressBlockTimesBottom,
  ProgressCircle,
  ProgressCircleContainer,
  ProgressLine,
  RightSideContainer,
  SelectedDotIcon,
  StyledNotSelectedSetIcon,
  StyledSelectedSetIcon,
  TrainingProgressContainer
} from './styles';
import { WORKOUT_EXECUTION_STATUS } from '../../../config/contants';
import { getCurrentActionTimePercentage } from '../../../utils/workout/getCurrentActionTimePercentage';

const SetsProgress = () => {
  const training = useSelector(getTrainSetLoops);
  const currentSet = useSelector(getWorkoutExecutionCurrentSet);
  const workoutExecutionStatus = useSelector(getWorkoutExecutionStatus);
  const currentExerciseIndex = useSelector(getWorkoutExecutionCurrentExercise);
  const currentSetLoopIndex = useSelector(getWorkoutExecutionCurrentSetLoopIndex);
  const currentActionRemainingTime = useSelector(getCurrentActionRemainingTime);
  const warmupTime = useSelector(getTrainingDefaultValues).warmupTime;
  const setExercises = useSelector(() => getCurrentSetExercises(training, currentSet));
  const setLoopsQuantity = training[currentSet].loops;

  const actionTotalTime = {
    [WORKOUT_EXECUTION_STATUS.FINISH]: 100,
    [WORKOUT_EXECUTION_STATUS.NOT_STARTED]: 0,
    [WORKOUT_EXECUTION_STATUS.WARMUP]: warmupTime,
    [WORKOUT_EXECUTION_STATUS.TRAIN]: setExercises[currentExerciseIndex].trainTime,
    [WORKOUT_EXECUTION_STATUS.REST]: setExercises[currentExerciseIndex].restTime
  };
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
                    <DotContainer>
                      <SelectedDotIcon />
                      <ProgressCircle
                        percent={getCurrentActionTimePercentage(
                          actionTotalTime[workoutExecutionStatus],
                          currentActionRemainingTime
                        )}></ProgressCircle>
                    </DotContainer>
                  ) : (
                    <StyledNotSelectedSetIcon />
                  );
                return (
                  <InsideSetContainer>
                    <ExercisesOnSetText style={{ marginTop: index > 0 ? '1.75rem' : 0 }}>
                      {name.toUpperCase()}
                    </ExercisesOnSetText>
                    <RightSideContainer>
                      <DotIconAndProgressLineContainer>
                        {setIcon}
                        {index < setExercises.length - 1 && (
                          <ProgressLine
                            percent={getCurrentActionTimePercentage(
                              actionTotalTime[workoutExecutionStatus],
                              currentActionRemainingTime
                            )}
                          />
                        )}
                      </DotIconAndProgressLineContainer>
                    </RightSideContainer>
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
