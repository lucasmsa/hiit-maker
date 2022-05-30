import { PLAY_STATE, WORKOUT_EXECUTION_STATUS } from '../../config/contants';
import { getTrainingDefaultValues } from '../training/selectors';
import { START_WORKOUT_EXECUTION } from './actionTypes';

export const workoutExecutionInitialState = {
  currentSet: 0,
  currentSetLoop: 0,
  currentSetExercise: 0,
  currentActionRemainingTime: 0,
  playState: PLAY_STATE.NOT_STARTED,
  status: WORKOUT_EXECUTION_STATUS.WARMUP
} as WorkoutExecutionState;

interface IReducer {
  state: WorkoutExecutionState;
  action: WorkoutExecutionAction;
}

interface IReducerFunctions {
  [key: string]: ({ state, action }: IReducer) => WorkoutExecutionState;
}

const reducerFunctions = {
  [START_WORKOUT_EXECUTION]: ({ state, action }: IReducer): WorkoutExecutionState => {
    const { payload } = action;
    return {
      ...state,
      currentActionRemainingTime: payload.warmupTime,
      status: WORKOUT_EXECUTION_STATUS.WARMUP,
      playState: PLAY_STATE.PLAY
    };
  }
} as IReducerFunctions;

const reducer = (
  state: WorkoutExecutionState = workoutExecutionInitialState,
  action: WorkoutExecutionAction
): WorkoutExecutionState => {
  return action.type in reducerFunctions ? reducerFunctions[action.type]({ state, action }) : state;
};

export default reducer;
