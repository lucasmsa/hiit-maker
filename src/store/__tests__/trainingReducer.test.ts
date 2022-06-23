import { AnyAction, Store } from 'redux';
import configureMockStore, { MockStoreEnhanced } from 'redux-mock-store';
import thunk from 'redux-thunk';
import { addExercise, addSet, updateDefaultTrainingValues } from '../training/actionCreators';
import trainingReducer from '../training/trainingReducer';
import { ADD_SET } from '../training/actionTypes';
import { trainingInitialState } from '../training/trainingReducer';
import { exerciseMocks } from '../__mocks__/mockedExercises';
import { INITIAL_DEFAULT_VALUES } from '../../config/contants';
import { defaultTrainingValuesMock } from '../__mocks__/mockedDefaultTrainingValues';

const mockStore = configureMockStore([thunk]);

describe('Training actions creators', () => {
  let store: MockStoreEnhanced<{ training: TrainingState }, {}>;

  beforeEach(() => {
    store = mockStore({
      training: trainingInitialState
    }) as MockStoreEnhanced<{ training: TrainingState }, {}>;
  });

  describe('Add set reducer function', () => {
    it('should successfully add a new set to the training, it will start with 1', () => {
      expect(trainingInitialState.trainSetLoops.length).toEqual(1);
      const updatedState = trainingReducer(trainingInitialState, addSet());
      expect(updatedState.trainSetLoops.length).toEqual(2);
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

  describe('Add exercise reducer function', () => {
    it('should successfully add a new exercise to a set', () => {
      expect(trainingInitialState.trainSetLoops[0].trainSet.exercises.length).toEqual(0);

      const updatedState = trainingReducer(trainingInitialState, addExercise(exerciseMocks[0], 0));

      expect(updatedState.trainSetLoops[0].trainSet.exercises).toEqual([exerciseMocks[0]]);
    });

    it('should throw an error if the number of exercises on a given set exceeds 5', () => {
      let updatedState: TrainingState = trainingInitialState;
      try {
        for (let i = 0; i < 6; i++) {
          trainingReducer(updatedState, addExercise(exerciseMocks[0], 0));
        }
      } catch (error: any) {
        expect(error.message).toEqual('You can only have 5 exercises per set');
      }
    });
  });

  describe('Update training default values reducer function', () => {
    it('should successfully update training default values', () => {
      expect(trainingInitialState.trainingDefaultValues.warmupTime).toEqual(
        INITIAL_DEFAULT_VALUES.warmupTime
      );

      const updatedState = trainingReducer(
        trainingInitialState,
        updateDefaultTrainingValues(defaultTrainingValuesMock)
      );

      expect(updatedState.trainingDefaultValues.warmupTime).toEqual(
        defaultTrainingValuesMock.warmupTime
      );
    });
  });
});
