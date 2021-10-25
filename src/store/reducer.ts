import { 
  ACTION_TYPES,
  ADD_EXERCISE,
  REMOVE_EXERCISE,
  UPDATE_EXERCISE_REST_TIME,
  UPDATE_EXERCISE_TRAIN_TIME
} from './actionTypes'

const initialState = {
  currentSet: 0,
  afflictedAreas: [],
  totalTrainingTime: 0,
  trainSetLoops: [{
    loops: 0,
    totalSetTime: 0,
    trainSet: { 
      exercises: [],
      setLoopTime: 0
    }
  }],
} as TrainingState

interface IReducer {
  state: TrainingState,
  action: TrainingAction
}

interface IReducerFunctions {
  [key: string]: ({ state, action }: IReducer) => TrainingState
}

const reducerFunctions = {
  [ADD_EXERCISE]: ({ state, action }: IReducer): TrainingState => {
    const currentSet = action.payload.set
    const newExercise = action.payload.exercise
    const setExercises = state.trainSetLoops[currentSet].trainSet.exercises
    console.log("At the reducer :)")
    if (setExercises.length <= 4) {
    const updatedSetExercises = state.trainSetLoops[currentSet].trainSet.exercises.concat(newExercise)
      return {
        ...state,
        currentSet,
        trainSetLoops: state.trainSetLoops.map(
          (content, index) => index === currentSet
            ? { ...content, trainSet: { ...content.trainSet, exercises: updatedSetExercises } }
            : content
        )
      }
    } else throw new Error('You can only have 5 exercises per set');
  },

  [REMOVE_EXERCISE]: ({ state, action }: IReducer): TrainingState => {
    const currentSet = action.payload.set
    const removeExerciseIndex = action.payload.index
    const updatedSetExercises = state.trainSetLoops[currentSet].trainSet.exercises
                                .filter((exercise, index) => index !== removeExerciseIndex)
    console.log("At the Remove reducer :)", { updatedSetExercises })

    return {
      ...state,
      currentSet,
      trainSetLoops: state.trainSetLoops.map(
        (content, index) => index === currentSet
          ? { ...content, trainSet: { ...content.trainSet, exercises: updatedSetExercises }}
          : content
      )
    }
  }
} as IReducerFunctions

const reducer = (state: TrainingState = initialState, action: TrainingAction): TrainingState => {
  return action.type in reducerFunctions ? reducerFunctions[action.type]({state, action}) : state
}

export default reducer