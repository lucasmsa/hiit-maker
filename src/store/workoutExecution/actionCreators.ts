import { Dispatch } from 'redux';
import { RootState } from '../..';
import { START_WORKOUT_EXECUTION } from './actionTypes';

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
