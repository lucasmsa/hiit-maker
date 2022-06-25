import { PLAY_STATE, WORKOUT_EXECUTION_STATUS } from '../../config/contants';
import workoutExecutionReducer, {
  workoutExecutionInitialState
} from '../workoutExecution/workoutExecutionReducer';
import {
  RESET_WORKOUT_EXECUTION,
  START_WORKOUT_EXECUTION,
  UPDATE_CURRENT_ACTION_REMAINING_TIME,
  UPDATE_PLAY_STATE,
  UPDATE_WORKOUT_EXECUTION_ACTION_TRANSITION,
  UPDATE_WORKOUT_EXECUTION_STATUS
} from '../workoutExecution/actionTypes';

describe('Workout execution reducer functions', () => {
  describe('start workout reducer function', () => {
    it('should successfully start a new workout, changing the reducer status, play state and set the current remaining time to the warmup time', () => {
      let updatedState = workoutExecutionInitialState;
      expect(updatedState.status).toEqual(WORKOUT_EXECUTION_STATUS.NOT_STARTED);

      updatedState = workoutExecutionReducer(updatedState, {
        type: START_WORKOUT_EXECUTION,
        payload: { warmupTime: 20 }
      });

      expect(updatedState.status).toEqual(WORKOUT_EXECUTION_STATUS.WARMUP);
      expect(updatedState.playState).toEqual(PLAY_STATE.PLAY);
      expect(updatedState.currentActionRemainingTime).toEqual(20);
    });
  });

  describe('Update play state reducer function', () => {
    const updatePlayStateAction = {
      type: UPDATE_PLAY_STATE,
      payload: {}
    };
    it('should successfully update the play state, if it is paused, it should be altered to play and vice-versa', () => {
      let updatedState = workoutExecutionInitialState;
      expect(updatedState.playState).toEqual(PLAY_STATE.PAUSE);

      updatedState = workoutExecutionReducer(updatedState, {
        type: START_WORKOUT_EXECUTION,
        payload: { warmupTime: 20 }
      });
      expect(updatedState.playState).toEqual(PLAY_STATE.PLAY);

      updatedState = workoutExecutionReducer(updatedState, updatePlayStateAction);

      expect(updatedState.playState).toEqual(PLAY_STATE.PAUSE);
    });

    it('should throw an error whenever the user tries to change the play state if the workout was not started yet', () => {
      try {
        let updatedState = workoutExecutionInitialState;
        expect(updatedState.status).toEqual(WORKOUT_EXECUTION_STATUS.NOT_STARTED);

        workoutExecutionReducer(updatedState, {
          type: UPDATE_PLAY_STATE,
          payload: {}
        });
      } catch (error: any) {
        expect(error.message).toEqual('Cannot update play state when workout was not started!');
      }
    });
  });

  describe('Update workout execution status reducer function', () => {
    it('should successfully update the workout execution status if a valid status is provided', () => {
      let updatedState = workoutExecutionInitialState;
      expect(updatedState.status).toEqual(WORKOUT_EXECUTION_STATUS.NOT_STARTED);

      updatedState = workoutExecutionReducer(updatedState, {
        type: START_WORKOUT_EXECUTION,
        payload: { warmupTime: 20 }
      });

      expect(updatedState.status).toEqual(WORKOUT_EXECUTION_STATUS.WARMUP);

      updatedState = workoutExecutionReducer(updatedState, {
        type: UPDATE_WORKOUT_EXECUTION_STATUS,
        payload: { status: WORKOUT_EXECUTION_STATUS.TRAIN }
      });

      expect(updatedState.status).toEqual(WORKOUT_EXECUTION_STATUS.TRAIN);
    });

    it('should throw an error whenever an invalided status is provided', () => {
      try {
        workoutExecutionReducer(workoutExecutionInitialState, {
          type: START_WORKOUT_EXECUTION,
          payload: { warmupTime: 20 }
        });
      } catch (error: any) {
        expect(error.message).toEqual('Invalid workout execution status!');
      }
    });
  });

  describe('Update current action remaining time reducer function', () => {
    it('should successfully update the current action remaining time', () => {
      let updatedState = workoutExecutionInitialState;
      expect(updatedState.status).toEqual(WORKOUT_EXECUTION_STATUS.NOT_STARTED);

      updatedState = workoutExecutionReducer(updatedState, {
        type: START_WORKOUT_EXECUTION,
        payload: { warmupTime: 20 }
      });

      expect(updatedState.status).toEqual(WORKOUT_EXECUTION_STATUS.WARMUP);
      expect(updatedState.currentActionRemainingTime).toEqual(20);

      updatedState = workoutExecutionReducer(updatedState, {
        type: UPDATE_CURRENT_ACTION_REMAINING_TIME,
        payload: { remainingTime: 19 }
      });

      expect(updatedState.currentActionRemainingTime).toEqual(19);
    });
  });

  describe('Update workout execution action transition reducer function', () => {
    it('should successfully update the workout execution action transition', () => {
      let updatedState = workoutExecutionInitialState;
      expect(updatedState.status).toEqual(WORKOUT_EXECUTION_STATUS.NOT_STARTED);

      updatedState = workoutExecutionReducer(updatedState, {
        type: START_WORKOUT_EXECUTION,
        payload: { warmupTime: 20 }
      });

      expect(updatedState.status).toEqual(WORKOUT_EXECUTION_STATUS.WARMUP);

      updatedState = workoutExecutionReducer(updatedState, {
        type: UPDATE_WORKOUT_EXECUTION_ACTION_TRANSITION,
        payload: {
          currentSetExerciseIndex: 1,
          currentSetIndex: 0,
          currentSetLoopIndex: 0,
          status: WORKOUT_EXECUTION_STATUS.TRAIN,
          currentActionRemainingTime: 30
        }
      });

      expect(updatedState.currentSetIndex).toEqual(0);
      expect(updatedState.currentSetLoopIndex).toEqual(0);
      expect(updatedState.currentSetExerciseIndex).toEqual(1);
      expect(updatedState.currentActionRemainingTime).toEqual(30);
      expect(updatedState.status).toEqual(WORKOUT_EXECUTION_STATUS.TRAIN);
    });
  });

  describe('Reset workout execution reducer function', () => {
    it('should successfully reset the workout execution state', () => {
      let updatedState = workoutExecutionInitialState;
      expect(updatedState.status).toEqual(WORKOUT_EXECUTION_STATUS.NOT_STARTED);

      updatedState = workoutExecutionReducer(updatedState, {
        type: START_WORKOUT_EXECUTION,
        payload: { warmupTime: 20 }
      });

      expect(updatedState).not.toEqual(workoutExecutionInitialState);

      updatedState = workoutExecutionReducer(updatedState, {
        type: RESET_WORKOUT_EXECUTION,
        payload: {}
      });

      expect(updatedState).toEqual(workoutExecutionInitialState);
    });
  });
});
