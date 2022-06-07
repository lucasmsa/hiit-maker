import { WORKOUT_EXECUTION_STATUS } from '../../config/contants';
import { START_WORKOUT_EXECUTION, UPDATE_CURRENT_ACTION_REMAINING_TIME, UPDATE_WORKOUT_EXECUTION_STATUS } from './actionTypes';

export const workoutExecutionInitialState = {
  currentSetIndex: 0,
  currentSetLoopIndex: 0,
  currentSetExerciseIndex: 0,
  currentActionRemainingTime: 0,
  nextExercises: [],
  status: WORKOUT_EXECUTION_STATUS.NOT_STARTED
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
      status: WORKOUT_EXECUTION_STATUS.WARMUP
    };
  },
  [UPDATE_WORKOUT_EXECUTION_STATUS]: ({ state, action }: IReducer): WorkoutExecutionState => { 
    const { payload } = action;
    const { status } = payload;
    if (status! in WORKOUT_EXECUTION_STATUS) {
      return { 
        ...state,
        status: status!
      }
    } else {
      throw new Error('Invalid workout execution status');
    }
  },
  [UPDATE_CURRENT_ACTION_REMAINING_TIME]: ({ state, action }: IReducer): WorkoutExecutionState => {
    const { payload } = action;
    const { remainingTime } = payload;

    return {
      ...state,
      currentActionRemainingTime: remainingTime!,
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
