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
import { INITIAL_DEFAULT_VALUES } from '../../config/contants';
import { defaultTrainingValuesMock } from '../__mocks__/mockedDefaultTrainingValues';

describe('Training reducer functions', () => {
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

  describe('Update set rest time reducer function', () => {
    it('should successfully update set rest time', () => {
      expect(trainingInitialState.trainSetLoops[0].setRestTime).toEqual(
        INITIAL_DEFAULT_VALUES.setRestTime
      );

      const updatedState = trainingReducer(trainingInitialState, updateSetRest(0, 18));

      expect(updatedState.trainSetLoops[0].setRestTime).toEqual(18);
    });
  });

  describe('Update current set reducer function', () => {
    it('should successfully current set pointer on the training section', () => {
      expect(trainingInitialState.trainSetLoops[0].setRestTime).toEqual(
        INITIAL_DEFAULT_VALUES.setRestTime
      );

      let updatedState = trainingReducer(trainingInitialState, addSet());
      updatedState = trainingReducer(updatedState, updateCurrentSet(1));

      expect(updatedState.currentSet).toEqual(1);
    });

    it('should throw an error whenever the user tries to go to a set that does not exist', () => {
      try {
        trainingReducer(trainingInitialState, updateCurrentSet(1));
      } catch (error: any) {
        expect(error.message).toEqual('Invalid set index');
      }
    });
  });

  describe('Remove current set reducer function', () => {
    it('should successfully remove a set', () => {
      let updatedState = trainingReducer(trainingInitialState, addSet());
      expect(updatedState.trainSetLoops.length).toEqual(2);

      updatedState = trainingReducer(updatedState, updateCurrentSet(1));
      updatedState = trainingReducer(updatedState, removeSet(1));

      expect(updatedState.trainSetLoops.length).toEqual(1);
      expect(updatedState.currentSet).toEqual(0);
    });

    it('should throw an error whenever the user tries to go remove set that does not exist', () => {
      try {
        expect(trainingInitialState.trainSetLoops.length).toEqual(1);
        trainingReducer(trainingInitialState, removeSet(1));
      } catch (error: any) {
        expect(error.message).toEqual('Invalid set index');
      }
    });
  });

  describe('Update current set loop quantity reducer function', () => {
    it('should successfully update the current set loop quantity', () => {
      let updatedState = trainingReducer(trainingInitialState, addSet());
      expect(updatedState.trainSetLoops[1].loops).toEqual(INITIAL_DEFAULT_VALUES.setRepetitions);

      updatedState = trainingReducer(updatedState, updateCurrentSetLoopQuantity(3, 1));

      expect(updatedState.trainSetLoops[1].loops).toEqual(3);
    });

    it('should throw an error whenever the number of loops exceeds 5', () => {
      try {
        let updatedState = trainingReducer(trainingInitialState, addSet());

        expect(updatedState.trainSetLoops[1].loops).toEqual(INITIAL_DEFAULT_VALUES.setRepetitions);

        trainingReducer(updatedState, updateCurrentSetLoopQuantity(6, 1));
      } catch (error: any) {
        expect(error.message).toEqual('Amount of loops must stay between boundaries');
      }
    });
  });

  describe('Remove exercise reducer function', () => {
    it('should successfully remove an exercise', () => {
      let updatedState = trainingReducer(trainingInitialState, addExercise(exerciseMocks[0], 0));
      updatedState = trainingReducer(updatedState, addExercise(exerciseMocks[1], 0));
      expect(updatedState.trainSetLoops[0].trainSet.exercises.length).toEqual(2);

      updatedState = trainingReducer(updatedState, removeExercise(1, 0));

      expect(updatedState.trainSetLoops[0].trainSet.exercises.length).toEqual(1);
    });
  });

  describe('Update exercise rest time', () => {
    it('should successfully update an exercise rest time', () => {
      let updatedState = trainingReducer(trainingInitialState, addExercise(exerciseMocks[1], 0));
      expect(updatedState.trainSetLoops[0].trainSet.exercises[0].restTime).toEqual(
        INITIAL_DEFAULT_VALUES.exerciseRestTime
      );

      updatedState = trainingReducer(updatedState, updateExerciseRestTime(0, 0, 25));

      expect(updatedState.trainSetLoops[0].trainSet.exercises[0].restTime).toEqual(25);
    });
  });

  describe('Update exercise train time', () => {
    it('should successfully update an exercise train time', () => {
      let updatedState = trainingReducer(trainingInitialState, addExercise(exerciseMocks[1], 0));
      expect(updatedState.trainSetLoops[0].trainSet.exercises[0].trainTime).toEqual(
        INITIAL_DEFAULT_VALUES.exerciseTrainTime
      );

      updatedState = trainingReducer(updatedState, updateExerciseTrainTime(0, 0, 32));

      expect(updatedState.trainSetLoops[0].trainSet.exercises[0].trainTime).toEqual(32);
    });
  });

  describe('Reset training', () => {
    it('should successfully reset the training', () => {
      let updatedState = trainingReducer(trainingInitialState, addExercise(exerciseMocks[1], 0));
      updatedState = trainingReducer(updatedState, addSet());

      updatedState = trainingReducer(updatedState, resetTraining());

      expect(updatedState).toEqual(trainingInitialState);
    });
  });
});
