import { 
  ACTION_TYPES,
  ADD_EXERCISE,
  REMOVE_EXERCISE,
  UPDATE_EXERCISE_REST_TIME,
  UPDATE_EXERCISE_TRAIN_TIME,
  UPDATE_CURRENT_SET_LOOP_QUANTITY
} from './actionTypes'

const trainSetInitialState = {
  loops: 1,
  totalSetTime: 0,
  trainSet: {
    exercises: [],
    setLoopTime: 0
  }
}

const initialState = {
  currentSet: 0,
  afflictedAreas: [],
  totalTrainingTime: 0,
  trainSetLoops: [trainSetInitialState],
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

    if (setExercises.length <= 4) {
      const updatedSetExercises = state.trainSetLoops[currentSet].trainSet.exercises.concat(newExercise)
      const addedTime = newExercise.restTime + newExercise.trainTime
      return {
        ...state,
        currentSet,
        trainSetLoops: state.trainSetLoops.map(
          (content, index) => index === currentSet
            ? { ...content, trainSet: { 
                  ...content.trainSet, 
                  exercises: updatedSetExercises, 
                  setLoopTime: content.trainSet.setLoopTime + addedTime
              },
              totalSetTime: content.totalSetTime + addedTime 
            }
            : content
        )
      }
    } else throw new Error('You can only have 5 exercises per set');
  },
  
  [UPDATE_CURRENT_SET_LOOP_QUANTITY]: ({ state, action }: IReducer): TrainingState => {
    const currentSet = action.payload.set
    const amountOfLoops = action.payload.loops || 0
    const updatedTrainSetLoops = state.trainSetLoops.map(
      (content, index) => index === currentSet
        ? {
          ...content,
          loops: amountOfLoops,
          totalSetTime: amountOfLoops * content.trainSet.setLoopTime
        }
        : content
    )
    console.log(`At the reducer, amount of loops here: ${amountOfLoops}`)
    if (amountOfLoops <= 5 && amountOfLoops >= 1) {
      return {
        ...state,
        currentSet,
        trainSetLoops: updatedTrainSetLoops
      }
    } else throw new Error('Amount of loops must stay between boundaries');
  },


  [REMOVE_EXERCISE]: ({ state, action }: IReducer): TrainingState => {
    const currentSet = action.payload.set
    const removeExerciseIndex = action.payload.index
    const currentSetExercises = state.trainSetLoops[currentSet].trainSet.exercises
    const removedExerciseTimes = currentSetExercises[removeExerciseIndex || 0].restTime +
                                              currentSetExercises[removeExerciseIndex || 0].trainTime
    const updatedSetExercises = currentSetExercises
      .filter((exercise, index) => index !== removeExerciseIndex)
    const updatedTrainSetLoops = state.trainSetLoops.map(
      (content, index) => index === currentSet
        ? {
          ...content, trainSet: {
            ...content.trainSet,
            exercises: updatedSetExercises,
            setLoopTime: content.trainSet.setLoopTime - removedExerciseTimes
          },
          totalSetTime: content.totalSetTime - removedExerciseTimes
        }
        : content
    )

    return {
      ...state,
      currentSet,
      trainSetLoops: updatedTrainSetLoops,
    }
  },

  [UPDATE_EXERCISE_REST_TIME]: ({ state, action }: IReducer): TrainingState => {
    const currentSet = action.payload.set
    const updateExerciseIndex = action.payload.index || 0
    const timeAdded = action.payload.restTime || 0
    const updatedSetExercises = state.trainSetLoops[currentSet].trainSet.exercises.map((exercise, index) => {
      if (index === updateExerciseIndex) return { ...exercise, restTime: action.payload.restTime }
      return exercise
    }) as Exercise[]

    const updatedTrainSetLoops = state.trainSetLoops.map(
      (content, index) => index === currentSet
        ? {
          ...content, trainSet: {
            ...content.trainSet,
            exercises: updatedSetExercises,
            setLoopTime: content.trainSet.setLoopTime - content.trainSet.exercises[updateExerciseIndex].restTime + timeAdded
          },
          totalSetTime: content.totalSetTime - content.trainSet.exercises[updateExerciseIndex].restTime + timeAdded
        }
        : content
    )

    return {
      ...state,
      currentSet,
      trainSetLoops: updatedTrainSetLoops,
    }
  },

  [UPDATE_EXERCISE_TRAIN_TIME]: ({ state, action }: IReducer): TrainingState => {
    const currentSet = action.payload.set
    const updateExerciseIndex = action.payload.index || 0
    const timeAdded = action.payload.trainTime || 0
    const updatedSetExercises = state.trainSetLoops[currentSet].trainSet.exercises.map((exercise, index) => {
      if (index === updateExerciseIndex) return { ...exercise, trainTime: action.payload.trainTime }
      return exercise
    }) as Exercise[]

    return {
      ...state,
      currentSet,
      trainSetLoops: state.trainSetLoops.map(
        (content, index) => index === currentSet
          ? {
            ...content,
            trainSet: {
              ...content.trainSet,
              exercises: updatedSetExercises,
              setLoopTime: content.trainSet.setLoopTime - content.trainSet.exercises[updateExerciseIndex].trainTime + timeAdded
            },
            totalSetTime: content.totalSetTime - content.trainSet.exercises[updateExerciseIndex].trainTime + timeAdded
          }
          : content
      )
    }
  }
} as IReducerFunctions

const reducer = (state: TrainingState = initialState, action: TrainingAction): TrainingState => {
  return action.type in reducerFunctions ? reducerFunctions[action.type]({state, action}) : state
}

export default reducer