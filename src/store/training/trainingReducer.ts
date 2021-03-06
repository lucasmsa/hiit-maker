import { INITIAL_DEFAULT_VALUES } from '../../config/contants';
import {
  ADD_EXERCISE,
  REMOVE_EXERCISE,
  UPDATE_EXERCISE_REST_TIME,
  UPDATE_EXERCISE_TRAIN_TIME,
  UPDATE_CURRENT_SET_LOOP_QUANTITY,
  ADD_SET,
  UPDATE_CURRENT_SET,
  REMOVE_CURRENT_SET,
  UPDATE_SET_REST_TIME,
  UPDATE_DEFAULT_TRAINING_VALUES,
  RESET_TRAINING
} from './actionTypes';

const trainSetInitialState = {
  loops: INITIAL_DEFAULT_VALUES.setRepetitions,
  totalSetTime: 0,
  trainSet: {
    exercises: [],
    setLoopTime: 0
  },
  setRestTime: INITIAL_DEFAULT_VALUES.setRestTime
};

const configurableTrainSetInitialState = (loops: number, setRestTime: number) => ({
  ...trainSetInitialState,
  loops,
  setRestTime
});

export const trainingInitialState = {
  currentSet: 0,
  afflictedAreas: {
    Chest: 0,
    Legs: 0,
    Back: 0,
    Core: 0
  },
  trainingDefaultValues: {
    warmupTime: INITIAL_DEFAULT_VALUES.warmupTime,
    exerciseRestTime: INITIAL_DEFAULT_VALUES.exerciseRestTime,
    exerciseTrainTime: INITIAL_DEFAULT_VALUES.exerciseTrainTime,
    setRestTime: INITIAL_DEFAULT_VALUES.setRestTime,
    setRepetitions: INITIAL_DEFAULT_VALUES.setRepetitions
  },
  totalTrainingTime: 0,
  trainSetLoops: [trainSetInitialState]
} as TrainingState;

interface IReducer {
  state: TrainingState;
  action: TrainingAction;
}

interface IReducerFunctions {
  [key: string]: ({ state, action }: IReducer) => TrainingState;
}

const reducerFunctions = {
  [ADD_SET]: ({ state }: IReducer): TrainingState => {
    const setsQuantity = state.trainSetLoops.length;

    if (setsQuantity <= 4) {
      const { setRepetitions, setRestTime } = state.trainingDefaultValues;
      const newSetState = configurableTrainSetInitialState(setRepetitions, setRestTime);
      const updatedSets = state.trainSetLoops.concat(newSetState);

      return {
        ...state,
        trainSetLoops: updatedSets
      };
    } else throw new Error('You can only have 5 sets at most!');
  },

  [ADD_EXERCISE]: ({ state, action }: IReducer): TrainingState => {
    const currentSet = action.payload.set!;
    const newExercise = action.payload.exercise!;
    const setExercises = state.trainSetLoops[currentSet].trainSet.exercises;

    if (setExercises.length <= 4) {
      const updatedSetExercises =
        state.trainSetLoops[currentSet].trainSet.exercises.concat(newExercise);
      const addedTime = newExercise.restTime + newExercise.trainTime;
      return {
        ...state,
        currentSet,
        afflictedAreas: {
          ...state.afflictedAreas,
          [newExercise.afflictedBodyPart!]: state.afflictedAreas[newExercise.afflictedBodyPart] + 1
        },
        trainSetLoops: state.trainSetLoops.map((content, index) =>
          index === currentSet
            ? {
                ...content,
                trainSet: {
                  ...content.trainSet,
                  exercises: updatedSetExercises,
                  setLoopTime: content.trainSet.setLoopTime + addedTime
                },
                totalSetTime: content.totalSetTime + addedTime * content.loops
              }
            : content
        )
      };
    } else throw new Error('You can only have 5 exercises per set');
  },

  [UPDATE_DEFAULT_TRAINING_VALUES]: ({ state, action }: IReducer): TrainingState => {
    const { defaultTrainingValues } = action.payload;

    const updatedTrainSetLoops = state.trainSetLoops.map((content) => {
      const setContainsExercise = content.trainSet.exercises.length > 0;
      return setContainsExercise
        ? content
        : {
            ...content,
            loops: defaultTrainingValues!.setRepetitions,
            setRestTime: defaultTrainingValues!.setRestTime
          };
    });

    return {
      ...state,
      trainSetLoops: updatedTrainSetLoops,
      trainingDefaultValues: defaultTrainingValues as TrainingDefaultValues
    };
  },

  [UPDATE_SET_REST_TIME]: ({ state, action }: IReducer): TrainingState => {
    const currentSet = action.payload.set;
    const setRestTime = action.payload.setRestTime || 0;

    return {
      ...state,
      trainSetLoops: state.trainSetLoops.map((content, index) =>
        index === currentSet
          ? {
              ...content,
              setRestTime
            }
          : content
      )
    };
  },

  [UPDATE_CURRENT_SET]: ({ state, action }: IReducer): TrainingState => {
    const selectedSet = action.payload.set || 0;

    if (selectedSet >= 0 && selectedSet < state.trainSetLoops.length) {
      return {
        ...state,
        currentSet: selectedSet
      };
    } else throw new Error('Invalid set index');
  },

  [REMOVE_CURRENT_SET]: ({ state, action }: IReducer): TrainingState => {
    const selectedSet = action.payload.set || 0;
    const currentSet = state.currentSet;
    const updatedTrainSetLoops = state.trainSetLoops.filter(
      (_trainSetLoop, index) => index !== selectedSet
    );
    if (selectedSet >= 0 && selectedSet < state.trainSetLoops.length) {
      return {
        ...state,
        currentSet: selectedSet === 0 ? currentSet + 1 : currentSet - 1,
        trainSetLoops: updatedTrainSetLoops
      };
    } else throw new Error('Invalid set index');
  },

  [UPDATE_CURRENT_SET_LOOP_QUANTITY]: ({ state, action }: IReducer): TrainingState => {
    const currentSet = action.payload.set!;
    const amountOfLoops = action.payload.loops || 0;
    const updatedTrainSetLoops = state.trainSetLoops.map((content, index) =>
      index === currentSet
        ? {
            ...content,
            loops: amountOfLoops,
            totalSetTime: amountOfLoops * content.trainSet.setLoopTime
          }
        : content
    );
    if (amountOfLoops <= 5 && amountOfLoops >= 1) {
      return {
        ...state,
        currentSet,
        trainSetLoops: updatedTrainSetLoops
      };
    } else throw new Error('Amount of loops must stay between boundaries');
  },

  [REMOVE_EXERCISE]: ({ state, action }: IReducer): TrainingState => {
    const currentSet = action.payload.set!;
    const removeExerciseIndex = action.payload.index;
    const currentSetExercises = state.trainSetLoops[currentSet].trainSet.exercises;
    const exerciseToBeRemoved = currentSetExercises[removeExerciseIndex!];
    const removedExerciseTimes =
      currentSetExercises[removeExerciseIndex || 0].restTime +
      currentSetExercises[removeExerciseIndex || 0].trainTime;
    const updatedSetExercises = currentSetExercises.filter(
      (_exercise, index) => index !== removeExerciseIndex
    );
    const updatedTrainSetLoops = state.trainSetLoops.map((content, index) =>
      index === currentSet
        ? {
            ...content,
            trainSet: {
              ...content.trainSet,
              exercises: updatedSetExercises,
              setLoopTime: content.trainSet.setLoopTime - removedExerciseTimes
            },
            totalSetTime: content.totalSetTime - removedExerciseTimes * content.loops
          }
        : content
    );

    return {
      ...state,
      currentSet,
      afflictedAreas: {
        ...state.afflictedAreas,
        [exerciseToBeRemoved.afflictedBodyPart!]:
          state.afflictedAreas[exerciseToBeRemoved.afflictedBodyPart] - 1
      },
      trainSetLoops: updatedTrainSetLoops
    };
  },

  [UPDATE_EXERCISE_REST_TIME]: ({ state, action }: IReducer): TrainingState => {
    const currentSet = action.payload.set!;
    const updateExerciseIndex = action.payload.index || 0;
    const timeAdded = action.payload.restTime || 0;
    const updatedSetExercises = state.trainSetLoops[currentSet].trainSet.exercises.map(
      (exercise, index) => {
        if (index === updateExerciseIndex)
          return { ...exercise, restTime: action.payload.restTime };
        return exercise;
      }
    ) as Exercise[];

    const updatedTrainSetLoops = state.trainSetLoops.map((content, index) =>
      index === currentSet
        ? {
            ...content,
            trainSet: {
              ...content.trainSet,
              exercises: updatedSetExercises,
              setLoopTime:
                content.trainSet.setLoopTime -
                content.trainSet.exercises[updateExerciseIndex].restTime +
                timeAdded
            },
            totalSetTime:
              content.totalSetTime -
              content.trainSet.exercises[updateExerciseIndex].restTime * content.loops +
              timeAdded * content.loops
          }
        : content
    );

    return {
      ...state,
      currentSet,
      trainSetLoops: updatedTrainSetLoops
    };
  },

  [UPDATE_EXERCISE_TRAIN_TIME]: ({ state, action }: IReducer): TrainingState => {
    const currentSet = action.payload.set!;
    const updateExerciseIndex = action.payload.index || 0;
    const timeAdded = action.payload.trainTime || 0;
    const updatedSetExercises = state.trainSetLoops[currentSet].trainSet.exercises.map(
      (exercise, index) => {
        if (index === updateExerciseIndex)
          return { ...exercise, trainTime: action.payload.trainTime };
        return exercise;
      }
    ) as Exercise[];

    return {
      ...state,
      currentSet,
      trainSetLoops: state.trainSetLoops.map((content, index) =>
        index === currentSet
          ? {
              ...content,
              trainSet: {
                ...content.trainSet,
                exercises: updatedSetExercises,
                setLoopTime:
                  content.trainSet.setLoopTime -
                  content.trainSet.exercises[updateExerciseIndex].trainTime +
                  timeAdded
              },
              totalSetTime:
                content.totalSetTime -
                content.trainSet.exercises[updateExerciseIndex].trainTime * content.loops +
                timeAdded * content.loops
            }
          : content
      )
    };
  },

  [RESET_TRAINING]: (): TrainingState => {
    return trainingInitialState;
  }
} as IReducerFunctions;

const reducer = (
  state: TrainingState = trainingInitialState,
  action: TrainingAction
): TrainingState => {
  return action.type in reducerFunctions ? reducerFunctions[action.type]({ state, action }) : state;
};

export default reducer;
