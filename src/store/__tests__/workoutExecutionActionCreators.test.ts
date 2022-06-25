import configureMockStore, { MockStoreEnhanced } from 'redux-mock-store';
import thunk from 'redux-thunk';
import { WORKOUT_EXECUTION_STATUS } from '../../config/contants';
import { trainingInitialState } from '../training/trainingReducer';
import {
  startTraining,
  updateCurrentActionRemainingTime,
  updatePlayState,
  updateWorkoutExecutionActionTransition,
  updateWorkoutExecutionStatus
} from '../workoutExecution/actionCreators';
import {
  START_WORKOUT_EXECUTION,
  UPDATE_CURRENT_ACTION_REMAINING_TIME,
  UPDATE_PLAY_STATE,
  UPDATE_WORKOUT_EXECUTION_ACTION_TRANSITION,
  UPDATE_WORKOUT_EXECUTION_STATUS
} from '../workoutExecution/actionTypes';
import { workoutExecutionInitialState } from '../workoutExecution/workoutExecutionReducer';

const mockStore = configureMockStore([thunk]);

describe('Workout Execution actions creators', () => {
  let store: MockStoreEnhanced<States, {}>;

  beforeEach(() => {
    store = mockStore({
      training: trainingInitialState,
      workoutExecution: workoutExecutionInitialState
    }) as MockStoreEnhanced<States, {}>;
  });

  describe('Add set action creator', () => {
    it('should dispatch start training action type with the warmup time as the payload', () => {
      const startTrainingAction = startTraining();
      startTrainingAction(store.dispatch, () => store.getState());
      const actions = store.getActions();
      const { warmupTime } = store.getState().training.trainingDefaultValues;

      expect(actions[0].type).toEqual(START_WORKOUT_EXECUTION);
      expect(actions[0].payload.warmupTime).toEqual(warmupTime);
    });
  });

  describe('Update current action remaining time action creator', () => {
    it('should dispatch update current action remaining time action type with the current action remaining time as the payload', () => {
      store.dispatch(updateCurrentActionRemainingTime(10));

      const actions = store.getActions();

      expect(actions[0].type).toEqual(UPDATE_CURRENT_ACTION_REMAINING_TIME);
      expect(actions[0].payload.remainingTime).toEqual(10);
    });
  });

  describe('Update workout execution status action creator', () => {
    it('should dispatch update workout execution action type with a workout execution status', () => {
      store.dispatch(updateWorkoutExecutionStatus(WORKOUT_EXECUTION_STATUS.TRAIN));

      const actions = store.getActions();

      expect(actions[0].type).toEqual(UPDATE_WORKOUT_EXECUTION_STATUS);
      expect(actions[0].payload.status).toEqual(WORKOUT_EXECUTION_STATUS.TRAIN);
    });
  });

  describe('Update play state action creator', () => {
    it('should dispatch update play state action type', () => {
      store.dispatch(updatePlayState());

      const actions = store.getActions();

      expect(actions[0].type).toEqual(UPDATE_PLAY_STATE);
    });
  });

  describe('Update workout execution action transition', () => {
    it('should dispatch update workout execution action transition action type with the updated values ', () => {
      const updateWorkoutExecutionActionTransitionAction = updateWorkoutExecutionActionTransition();
      updateWorkoutExecutionActionTransitionAction(store.dispatch, () => store.getState());

      const actions = store.getActions();

      expect(actions[0].type).toEqual(UPDATE_WORKOUT_EXECUTION_ACTION_TRANSITION);
      expect(actions[0].payload).toEqual({
        currentActionRemainingTime: 0,
        currentSetExerciseIndex: 0,
        currentSetIndex: 0,
        currentSetLoopIndex: 0,
        status: 'NOT_STARTED'
      });
    });
  });
});
