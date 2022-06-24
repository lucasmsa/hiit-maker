import { Dispatch } from 'redux';
import { updateCurrentAction } from '../../utils/workout/actionTransition/updateCurrentAction';
import {
  RESET_WORKOUT_EXECUTION,
  START_WORKOUT_EXECUTION,
  UPDATE_CURRENT_ACTION_REMAINING_TIME,
  UPDATE_PLAY_STATE,
  UPDATE_WORKOUT_EXECUTION_ACTION_TRANSITION,
  UPDATE_WORKOUT_EXECUTION_STATUS
} from './actionTypes';

export function startTraining() {
  return (dispatch: Dispatch, getState: () => States) => {
    const { warmupTime } = getState().training.trainingDefaultValues;
    const action: WorkoutExecutionAction = {
      type: START_WORKOUT_EXECUTION,
      payload: { warmupTime }
    };

    console.log('before dispatching', action);
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
}

export function updateWorkoutExecutionStatus(status: WORKOUT_EXECUTION_STATUS) {
  const action: WorkoutExecutionAction = {
    type: UPDATE_WORKOUT_EXECUTION_STATUS,
    payload: {
      status
    }
  };

  return action;
}

export function updatePlayState() {
  const action: WorkoutExecutionAction = {
    type: UPDATE_PLAY_STATE,
    payload: {}
  };

  return action;
}

export function updateWorkoutExecutionActionTransition() {
  return (dispatch: Dispatch, getState: () => States) => {
    const { setExerciseIndex, setIndex, setLoopIndex, status, actionRemainingTime } =
      updateCurrentAction(getState);

    const action: WorkoutExecutionAction = {
      type: UPDATE_WORKOUT_EXECUTION_ACTION_TRANSITION,
      payload: {
        currentSetExerciseIndex: setExerciseIndex,
        currentSetIndex: setIndex,
        currentSetLoopIndex: setLoopIndex,
        currentActionRemainingTime: actionRemainingTime,
        status
      }
    };

    return dispatch(action);
  };
}

export function resetWorkoutExecution() {
  const action: WorkoutExecutionAction = {
    type: RESET_WORKOUT_EXECUTION,
    payload: {}
  };

  return action;
}
