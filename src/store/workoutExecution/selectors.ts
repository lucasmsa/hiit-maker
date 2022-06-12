import { WORKOUT_EXECUTION_STATUS } from '../../config/contants';
import {
  fetchCurrentNextExercise,
  IUpdatedValues
} from '../../utils/workout/nextExercises/fetchCurrentNextExecise';
import { getCurrentSetExercises, getTrainSetLoops } from '../training/selectors';

export const getWorkoutExecutionState = (state: States) => state.workoutExecution;
export const getWorkoutExecutionStatus = (state: States) => state.workoutExecution.status;
export const getWorkoutExecutionPlayState = (state: States) => state.workoutExecution.playState;
export const getCurrentActionRemainingTime = (state: States): number =>
  state.workoutExecution.currentActionRemainingTime;

export const getNextExercises = (state: States): ExerciseVisualization[] => {
  const { status, currentSetIndex, currentSetLoopIndex, currentSetExerciseIndex } =
    state.workoutExecution;

  const workoutDidNotStartOrFinished =
    status === WORKOUT_EXECUTION_STATUS.NOT_STARTED || status === WORKOUT_EXECUTION_STATUS.FINISH;
  if (workoutDidNotStartOrFinished) {
    return [];
  }

  const training = getTrainSetLoops(state);
  const currentTrainSetExercises = getCurrentSetExercises(training, currentSetIndex);

  const updatedValues = {
    setExerciseIndex: currentSetExerciseIndex,
    trainSetExercises: currentTrainSetExercises,
    setLoopIndex: currentSetLoopIndex,
    setIndex: currentSetIndex,
    nextExercises: [] as ExerciseVisualization[]
  } as IUpdatedValues;

  const nextStatus = fetchCurrentNextExercise(updatedValues, training);
  if (nextStatus !== 'TRAINING_FINISHED') {
    fetchCurrentNextExercise(updatedValues, training);
  }

  return updatedValues.nextExercises!;
};
