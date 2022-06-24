import configureMockStore, { MockStoreEnhanced } from 'redux-mock-store';
import {
  addExercise,
  addSet,
  removeExercise,
  removeSet,
  resetTraining,
  updateCurrentSet,
  updateCurrentSetLoopQuantity,
  updateDefaultTrainingValues,
  updateExerciseRestTime,
  updateExerciseTrainTime,
  updateSetRest
} from '../training/actionCreators';
import trainingReducer, { trainingInitialState } from '../training/trainingReducer';
import { exerciseMocks } from '../__mocks__/mockedExercises';
import {
  INITIAL_DEFAULT_VALUES,
  PLAY_STATE,
  WORKOUT_EXECUTION_STATUS
} from '../../config/contants';
import { defaultTrainingValuesMock } from '../__mocks__/mockedDefaultTrainingValues';
import workoutExecutionReducer, {
  workoutExecutionInitialState
} from '../workoutExecution/workoutExecutionReducer';
import { startTraining } from '../workoutExecution/actionCreators';
import thunk from 'redux-thunk';

const mockStore = configureMockStore([thunk]);

describe('Workout execution reducer functions', () => {
  let store: MockStoreEnhanced<States, {}>;

  beforeEach(() => {
    store = mockStore({
      training: trainingInitialState,
      workoutExecution: workoutExecutionInitialState
    }) as MockStoreEnhanced<States, {}>;
  });

  describe('start workout reducer function', () => {
    it('should successfully start a new workout, changing the reducer status, play state and set the current remaining time to the warmup time', () => {
      let updatedState = workoutExecutionInitialState;
      expect(updatedState.status).toEqual(WORKOUT_EXECUTION_STATUS.WARMUP);
      const startTrainingAction = startTraining();
      const startTrainingActionDispatch = startTrainingAction(store.dispatch, () =>
        store.getState()
      );

      updatedState = workoutExecutionReducer(updatedState, startTrainingActionDispatch);

      expect(updatedState.status).toEqual(WORKOUT_EXECUTION_STATUS.WARMUP);
      expect(updatedState.playState).toEqual(PLAY_STATE.PLAY);
      // expect(updatedState.currentActionRemainingTime).toEqual();
    });

    it('should throw an error if the number of sets exceeds 5', () => {
      let updatedState: TrainingState = trainingInitialState;
      try {
        for (let i = 0; i < 5; i++) {
          updatedState = trainingReducer(updatedState, addSet());
        }
      } catch (error: any) {
        expect(error.message).toEqual('You can only have 5 sets at most!');
      }
    });
  });
});
