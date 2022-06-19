import { WORKOUT_EXECUTION_STATUS } from '../../../config/contants';
import { getCurrentSetExercises } from '../../../store/training/selectors';
import { fetchCurrentNextExercise, IUpdatedValues } from '../nextExercises/fetchCurrentNextExecise';

export const updateCurrentAction = (getState: () => States) => {
  const { training } = getState();
  const { trainSetLoops } = training;

  const {
    currentSetExerciseIndex,
    currentSetIndex,
    currentSetLoopIndex,
    status,
    currentActionRemainingTime
  } = getState().workoutExecution;

  const updatedValues = {
    setExerciseIndex: currentSetExerciseIndex,
    setLoopIndex: currentSetLoopIndex,
    setIndex: currentSetIndex,
    actionRemainingTime: currentActionRemainingTime,
    trainSetExercises: getCurrentSetExercises(trainSetLoops, currentSetIndex),
    status
  } as IUpdatedValues;

  if (status === WORKOUT_EXECUTION_STATUS.WARMUP) {
    updatedValues['status'] = WORKOUT_EXECUTION_STATUS.TRAIN;
    updatedValues['actionRemainingTime'] =
      updatedValues['trainSetExercises'][currentSetExerciseIndex].trainTime;
  } else if (status === WORKOUT_EXECUTION_STATUS.TRAIN) {
    const lastExerciseOnTheLastLoopOfSet =
      updatedValues['setExerciseIndex'] === updatedValues['trainSetExercises'].length - 1 &&
      updatedValues['setLoopIndex'] === trainSetLoops[updatedValues['setIndex']].loops - 1;
    const lastTrainingExercise =
      lastExerciseOnTheLastLoopOfSet && updatedValues['setIndex'] === trainSetLoops.length - 1;

    const currentExerciseRestTime =
      updatedValues['trainSetExercises'][updatedValues['setExerciseIndex']].restTime;
    const finalSetRestTime = trainSetLoops[updatedValues['setIndex']].setRestTime;

    if (lastExerciseOnTheLastLoopOfSet) {
      updatedValues['actionRemainingTime'] = lastTrainingExercise
        ? 0
        : currentExerciseRestTime + finalSetRestTime;
    } else {
      updatedValues['actionRemainingTime'] = currentExerciseRestTime;
    }

    updatedValues['status'] = lastTrainingExercise
      ? WORKOUT_EXECUTION_STATUS.FINISH
      : WORKOUT_EXECUTION_STATUS.REST;
  } else if (status === WORKOUT_EXECUTION_STATUS.REST) {
    fetchCurrentNextExercise(updatedValues, trainSetLoops, true);
  }

  return updatedValues;
};
