import { Dispatch } from 'redux';
import { RootState } from '../..';
import { START_WORKOUT_EXECUTION, UPDATE_CURRENT_ACTION_REMAINING_TIME, UPDATE_WORKOUT_EXECUTION_STATUS } from './actionTypes';

export function startTraining() {
  return (dispatch: Dispatch, getState: RootState) => {
    const { warmupTime } = getState().training.trainingDefaultValues;
    const action: WorkoutExecutionAction = {
      type: START_WORKOUT_EXECUTION,
      payload: { warmupTime }
    };

    return dispatch(action);
  };
}

export function updateCurrentActionRemainingTime(remainingTime: number) {
  const action: WorkoutExecutionAction = {
    type: UPDATE_CURRENT_ACTION_REMAINING_TIME,
    payload: {
      remainingTime
    }
  };

  return action;
};


export function updateWorkoutExecutionStatus(status: WORKOUT_EXECUTION_STATUS) {
  const action: WorkoutExecutionAction = {
    type: UPDATE_WORKOUT_EXECUTION_STATUS,
    payload: {
      status
    }
  };

  return action;
};
