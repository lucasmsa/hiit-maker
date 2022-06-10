import { WORKOUT_EXECUTION_STATUS } from '../../config/contants';
import { getCurrentSetExercises, getTrainSetLoops } from '../training/selectors';

const MAX_NEXT_EXERCISES = 2;

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
  const nextExercisesWithinCurrentSetLoop =
    currentSetLoopIndex + MAX_NEXT_EXERCISES < currentTrainSetExercises.length;
  if (nextExercisesWithinCurrentSetLoop) {
    return fetchCurrentTrainSetLoopNextExercises(currentTrainSetExercises, currentSetLoopIndex);
  }

  return [];
  // TODO:  Start on one set repetition, then jump to another one on the same set
  // TODO:  Start on one set repetition, then jump to another one on the other set
  // TODO:  No exercises left, hence the next will be empty
};

// const { workout } = state.workout;
// const { sets } = workout;
// const { exercises } = sets[currentSet];
// const nextTwoExercises = exercises.slice(currentSetExercise, currentSetExercise + 2);
// return nextTwoExercises;

const fetchCurrentTrainSetLoopNextExercises = (
  currentTrainSetExercises: Exercise[],
  currentSetLoopIndex: number
) => {
  return currentTrainSetExercises
    .slice(currentSetLoopIndex + 1, currentSetLoopIndex + 1 + MAX_NEXT_EXERCISES)
    .map(({ name, image }) => ({
      name,
      image
    }));
};
