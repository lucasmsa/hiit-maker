import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import {
  getCurrentSetExercises,
  getTrainingDefaultValues,
  getTrainSetLoops
} from '../../../../store/training/selectors';
import {
  getCurrentActionRemainingTime,
  getWorkoutExecutionCurrentExercise,
  getWorkoutExecutionCurrentSet,
  getWorkoutExecutionCurrentSetLoopIndex,
  getWorkoutExecutionStatus
} from '../../../../store/workoutExecution/selectors';
import {
  BottomContainer,
  Container,
  DotContainer,
  DotIconAndProgressLineContainer,
  EnlargingCircle,
  ExercisesOnSetContainer,
  ExercisesOnSetText,
  FilledDotIcon,
  InsideSetContainer,
  ProgressBlock,
  ProgressBlockBottomText,
  ProgressBlockHeaderText,
  ProgressBlockTimesBottom,
  ProgressCircle,
  ProgressLine,
  RightSideContainer,
  SelectedDotIcon,
  TrainingProgressContainer,
  UnfilledDotIcon
} from './styles';
import { WORKOUT_EXECUTION_STATUS } from '../../../../config/contants';
import { getCurrentActionTimePercentage } from '../../../../utils/workout/getCurrentActionTimePercentage';
import { LightGray, Rage } from '../../../../styles/global';

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
  const setLoopsLeft = setLoopsQuantity - (currentSetLoopIndex + 1);
  const filteredRestTime =
    currentExerciseIndex === setExercises.length - 1 && !setLoopsLeft
      ? setExercises[currentExerciseIndex].restTime + training[currentSet].setRestTime
      : setExercises[currentExerciseIndex].restTime;

  const actionTotalTime = {
    [WORKOUT_EXECUTION_STATUS.FINISH]: 100,
    [WORKOUT_EXECUTION_STATUS.NOT_STARTED]: 0,
    [WORKOUT_EXECUTION_STATUS.WARMUP]: warmupTime,
    [WORKOUT_EXECUTION_STATUS.TRAIN]: setExercises[currentExerciseIndex].trainTime || 0,
    [WORKOUT_EXECUTION_STATUS.REST]: filteredRestTime || 0
  };
  const currentActionTimePercentage = useMemo(() => {
    return getCurrentActionTimePercentage(
      actionTotalTime[workoutExecutionStatus],
      currentActionRemainingTime
    );
  }, [actionTotalTime, currentActionRemainingTime, workoutExecutionStatus]);
  const loopsPluralCheck = setLoopsLeft === 1 ? '' : 'S';
  const progressLine = {
    percent: (index: number) => {
      if (
        workoutExecutionStatus === WORKOUT_EXECUTION_STATUS.REST &&
        currentExerciseIndex === index
      ) {
        return currentActionTimePercentage;
      } else if (currentExerciseIndex > index) {
        return 100;
      }
    },
    strokeColor: (index: number) => {
      if (
        (workoutExecutionStatus === WORKOUT_EXECUTION_STATUS.REST &&
          currentExerciseIndex === index) ||
        currentExerciseIndex > index
      ) {
        return Rage;
      }
      return LightGray;
    },
    lastExerciseLine: (index: number) => {
      return setExercises.length > 1 && index === setExercises.length - 2;
    }
  };

  const progressCircle = {
    percent: () => {
      return workoutExecutionStatus === WORKOUT_EXECUTION_STATUS.TRAIN
        ? currentActionTimePercentage
        : 0;
    },
    dotConditionals: (index: number) => {
      const currentExerciseOnIndexAndTrainTime =
        currentExerciseIndex === index && workoutExecutionStatus === WORKOUT_EXECUTION_STATUS.TRAIN;
      if (currentExerciseOnIndexAndTrainTime) {
        return (
          <>
            <SelectedDotIcon />
            <ProgressCircle percent={progressCircle.percent()} />
          </>
        );
      } else {
        const exerciseIndexLargerThanCurrentExercise = currentExerciseIndex > index;
        const currentIndexRestAndBeforeLastExercise =
          currentExerciseIndex === index &&
          workoutExecutionStatus === WORKOUT_EXECUTION_STATUS.REST &&
          index < setExercises.length - 1;
        const currentIndexOnLastSetExercise = currentExerciseIndex === setExercises.length - 1;

        if (
          exerciseIndexLargerThanCurrentExercise ||
          currentIndexRestAndBeforeLastExercise ||
          workoutExecutionStatus === WORKOUT_EXECUTION_STATUS.FINISH
        ) {
          return <FilledDotIcon />;
        } else if (currentIndexOnLastSetExercise) {
          return (
            <>
              <EnlargingCircle scaleSum={1 + 0.005 * currentActionTimePercentage} />
              <ProgressCircle percent={100} />
            </>
          );
        } else return <UnfilledDotIcon />;
      }
    }
  };

  return (
    <Container>
      <BottomContainer>
        <TrainingProgressContainer>
          <ProgressBlock>
            <ProgressBlockHeaderText>PROGRESS</ProgressBlockHeaderText>
            <ExercisesOnSetContainer>
              {workoutExecutionStatus !== WORKOUT_EXECUTION_STATUS.WARMUP ? (
                setExercises.map(({ name }, index: number) => {
                  const setIcon = (
                    <DotContainer>{progressCircle.dotConditionals(index)}</DotContainer>
                  );
                  return (
                    <InsideSetContainer key={index}>
                      <ExercisesOnSetText style={{ marginTop: index > 0 ? '1.75rem' : 0 }}>
                        {name.toUpperCase()}
                      </ExercisesOnSetText>
                      <RightSideContainer>
                        <DotIconAndProgressLineContainer>
                          {setIcon}
                          {index < setExercises.length - 1 ? (
                            <ProgressLine
                              lastExerciseLine={progressLine.lastExerciseLine(index)}
                              strokeColor={progressLine.strokeColor(index)}
                              percent={progressLine.percent(index)}
                            />
                          ) : (
                            <></>
                          )}
                        </DotIconAndProgressLineContainer>
                      </RightSideContainer>
                    </InsideSetContainer>
                  );
                })
              ) : (
                <InsideSetContainer>
                  <ExercisesOnSetText style={{ marginTop: '1.75rem' }}>WARMUP</ExercisesOnSetText>
                  <RightSideContainer>
                    <DotContainer>
                      <SelectedDotIcon />
                      <ProgressCircle percent={currentActionTimePercentage} />
                    </DotContainer>
                  </RightSideContainer>
                </InsideSetContainer>
              )}
            </ExercisesOnSetContainer>
            <ProgressBlockTimesBottom>
              <ProgressBlockBottomText>
                {setLoopsLeft
                  ? `${setLoopsLeft} SET REPETITION${loopsPluralCheck} LEFT`
                  : 'LAST SET REPETITION'}
              </ProgressBlockBottomText>
            </ProgressBlockTimesBottom>
          </ProgressBlock>
        </TrainingProgressContainer>
      </BottomContainer>
    </Container>
  );
};

export default SetsProgress;
