import configureMockStore, { MockStoreEnhanced } from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
  addExercise,
  addSet,
  removeExercise,
  removeSet,
  updateCurrentSet,
  updateCurrentSetLoopQuantity,
  updateDefaultTrainingValues,
  updateExerciseRestTime,
  updateExerciseTrainTime,
  updateSetRest
} from '../training/actionCreators';
import {
  ADD_EXERCISE,
  ADD_SET,
  REMOVE_CURRENT_SET,
  REMOVE_EXERCISE,
  UPDATE_CURRENT_SET,
  UPDATE_CURRENT_SET_LOOP_QUANTITY,
  UPDATE_DEFAULT_TRAINING_VALUES,
  UPDATE_EXERCISE_REST_TIME,
  UPDATE_EXERCISE_TRAIN_TIME,
  UPDATE_SET_REST_TIME
} from '../training/actionTypes';
import { trainingInitialState } from '../training/trainingReducer';
import { defaultTrainingValuesMock } from '../__mocks__/mockedDefaultTrainingValues';
import { exerciseMocks } from '../__mocks__/mockedExercises';

const mockStore = configureMockStore([thunk]);

describe('Training actions creators', () => {
  let store: MockStoreEnhanced<{ training: TrainingState }, {}>;

  beforeEach(() => {
    store = mockStore({
      training: trainingInitialState
    }) as MockStoreEnhanced<{ training: TrainingState }, {}>;
  });

  describe('Add set action creator', () => {
    it('should dispatch add set action type', () => {
      store.dispatch(addSet());
      const actions = store.getActions();

      expect(actions[0].type).toEqual(ADD_SET);
    });
  });

  describe('Add exercise action creator', () => {
    it('should dispatch add exercise action type and call the reducer with the exercise and set as its payload', () => {
      const exercise = exerciseMocks[0];
      store.dispatch(addExercise(exercise, 0));

      const actions = store.getActions();

      expect(actions[0].type).toEqual(ADD_EXERCISE);
      expect(actions[0].payload.exercise).toEqual(exercise);
      expect(actions[0].payload.set).toEqual(0);
    });
  });

  describe('Remove set action creator', () => {
    it('should dispatch remove set action type with the set to be removed as its payload', () => {
      store.dispatch(removeSet(0));

      const actions = store.getActions();

      expect(actions[0].type).toEqual(REMOVE_CURRENT_SET);
      expect(actions[0].payload.set).toEqual(0);
    });
  });

  describe('Update current set action creator', () => {
    it('should dispatch update current set action type with the payload as the set to be updated', () => {
      store.dispatch(updateCurrentSet(0));

      const actions = store.getActions();

      expect(actions[0].type).toEqual(UPDATE_CURRENT_SET);
      expect(actions[0].payload.set).toEqual(0);
    });
  });

  describe('Update set rest action creator', () => {
    it('should dispatch update set rest action type with the set and the new set rest as its payload', () => {
      store.dispatch(updateSetRest(0, 20));

      const actions = store.getActions();

      expect(actions[0].type).toEqual(UPDATE_SET_REST_TIME);
      expect(actions[0].payload.set).toEqual(0);
      expect(actions[0].payload.setRestTime).toEqual(20);
    });
  });

  describe('Update training default values action creator', () => {
    it('should dispatch update default training values action type with the new default values as the payload', () => {
      store.dispatch(updateDefaultTrainingValues(defaultTrainingValuesMock));

      const actions = store.getActions();

      expect(actions[0].type).toEqual(UPDATE_DEFAULT_TRAINING_VALUES);
      expect(actions[0].payload.defaultTrainingValues).toEqual(defaultTrainingValuesMock);
    });
  });

  describe('Update current set loop quantity action creator', () => {
    it('should dispatch update current set loop quantity action type receiving the set and the new amount of loops for the given set', () => {
      store.dispatch(updateCurrentSetLoopQuantity(3, 0));

      const actions = store.getActions();

      expect(actions[0].type).toEqual(UPDATE_CURRENT_SET_LOOP_QUANTITY);
      expect(actions[0].payload.loops).toEqual(3);
      expect(actions[0].payload.set).toEqual(0);
    });
  });

  describe('Update exercise rest time action creator', () => {
    it('should dispatch update update exercise rest time action type receiving the new set rest, index and set to be added', () => {
      store.dispatch(updateExerciseRestTime(0, 0, 15));

      const actions = store.getActions();

      expect(actions[0].type).toEqual(UPDATE_EXERCISE_REST_TIME);
      expect(actions[0].payload.restTime).toEqual(15);
      expect(actions[0].payload.index).toEqual(0);
      expect(actions[0].payload.set).toEqual(0);
    });
  });

  describe('Update exercise train time action creator', () => {
    it('should dispatch update update exercise train time action type receiving the new set rest, index and set to be added', () => {
      store.dispatch(updateExerciseTrainTime(0, 0, 20));

      const actions = store.getActions();

      expect(actions[0].type).toEqual(UPDATE_EXERCISE_TRAIN_TIME);
      expect(actions[0].payload.trainTime).toEqual(20);
      expect(actions[0].payload.index).toEqual(0);
      expect(actions[0].payload.set).toEqual(0);
    });
  });

  describe('Remove exercise action creator', () => {
    it('should dispatch remove exercise action type receiving the exercise index and the set', () => {
      store.dispatch(removeExercise(0, 0));

      const actions = store.getActions();

      expect(actions[0].type).toEqual(REMOVE_EXERCISE);
      expect(actions[0].payload.index).toEqual(0);
      expect(actions[0].payload.set).toEqual(0);
    });
  });
});
