import { PLAY_STATE, WORKOUT_EXECUTION_STATUS } from '../../config/contants';
import {
  RESET_WORKOUT_EXECUTION,
  START_WORKOUT_EXECUTION,
  UPDATE_CURRENT_ACTION_REMAINING_TIME,
  UPDATE_PLAY_STATE,
  UPDATE_WORKOUT_EXECUTION_ACTION_TRANSITION,
  UPDATE_WORKOUT_EXECUTION_STATUS
} from './actionTypes';

export const workoutExecutionInitialState = {
  currentSetIndex: 0,
  currentSetLoopIndex: 0,
  currentSetExerciseIndex: 0,
  currentActionRemainingTime: 0,
  status: WORKOUT_EXECUTION_STATUS.NOT_STARTED,
  playState: PLAY_STATE.PAUSE
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
    const { warmupTime } = payload;

    return {
      ...state,
      currentActionRemainingTime: warmupTime!,
      playState: PLAY_STATE.PLAY,
      status: WORKOUT_EXECUTION_STATUS.WARMUP
    };
  },
  [UPDATE_PLAY_STATE]: ({ state }: IReducer): WorkoutExecutionState => {
    if (state.status === WORKOUT_EXECUTION_STATUS.NOT_STARTED) {
      throw new Error('Cannot update play state when workout was not started!');
    }

    return {
      ...state,
      playState: state.playState === PLAY_STATE.PLAY ? PLAY_STATE.PAUSE : PLAY_STATE.PLAY
    };
  },
  [UPDATE_WORKOUT_EXECUTION_STATUS]: ({ state, action }: IReducer): WorkoutExecutionState => {
    const { payload } = action;
    const { status } = payload;
    if (status! in WORKOUT_EXECUTION_STATUS) {
      return {
        ...state,
        status: status!
      };
    } else {
      throw new Error('Invalid workout execution status!');
    }
  },
  [UPDATE_CURRENT_ACTION_REMAINING_TIME]: ({ state, action }: IReducer): WorkoutExecutionState => {
    const { payload } = action;
    const { remainingTime } = payload;

    return {
      ...state,
      currentActionRemainingTime: remainingTime!
    };
  },
  [UPDATE_WORKOUT_EXECUTION_ACTION_TRANSITION]: ({
    state,
    action
  }: IReducer): WorkoutExecutionState => {
    const { payload } = action;

    return {
      ...state,
      currentSetExerciseIndex: payload.currentSetExerciseIndex!,
      currentSetIndex: payload.currentSetIndex!,
      currentSetLoopIndex: payload.currentSetLoopIndex!,
      status: payload.status!,
      currentActionRemainingTime: payload.currentActionRemainingTime!
    };
  },
  [RESET_WORKOUT_EXECUTION]: (): WorkoutExecutionState => {
    return workoutExecutionInitialState;
  }
} as IReducerFunctions;

const reducer = (
  state: WorkoutExecutionState = workoutExecutionInitialState,
  action: WorkoutExecutionAction
): WorkoutExecutionState => {
  return action.type in reducerFunctions ? reducerFunctions[action.type]({ state, action }) : state;
};

export default reducer;
