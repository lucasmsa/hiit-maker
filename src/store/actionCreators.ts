import {
  ADD_EXERCISE,
  REMOVE_EXERCISE,
  UPDATE_EXERCISE_REST_TIME,
  UPDATE_EXERCISE_TRAIN_TIME,
  UPDATE_CURRENT_SET_LOOP_QUANTITY
} from './actionTypes';


export function addExercise(exercise: Exercise, set: number) {
  console.log("Action dispatched [Adding exercise]")
  const action: TrainingAction = { 
    type: ADD_EXERCISE,
    payload: {
      exercise,
      set
    }
  }
  return action;
}

export function updateCurrentSetLoopQuantity(loops: number, set: number) {
  console.log("Action dispatched [Updating current set loop quantity]")
  const action: TrainingAction = { 
    type: UPDATE_CURRENT_SET_LOOP_QUANTITY,
    payload: {
      loops,
      set
    }
  }
  return action;
}

export function removeExercise(index: number, set: number) {
  console.log("Action dispatched [Removing exercise]")
  const action: TrainingAction = { 
    type: REMOVE_EXERCISE,
    payload: {
      index,
      set
    }
  }
  return action;
}


