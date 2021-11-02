import {
  ADD_EXERCISE,
  REMOVE_EXERCISE,
  UPDATE_EXERCISE_REST_TIME,
  UPDATE_EXERCISE_TRAIN_TIME,
  UPDATE_CURRENT_SET_LOOP_QUANTITY,
  ADD_SET,
  UPDATE_CURRENT_SET,
  REMOVE_CURRENT_SET
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

export function removeSet(set: number) {
  console.log("Action dispatched [Removing set]")
  const action: TrainingAction = { 
    type: REMOVE_CURRENT_SET,
    payload: {
      set
    }
  }
  return action;
}

export function updateCurrentSet(set: number) {
  console.log("Action dispatched [Update current set]")
  const action: TrainingAction = { 
    type: UPDATE_CURRENT_SET,
    payload: {
      set
    }
  }
  return action;
}

export function addSet(set: number) {
  console.log("Action dispatched [Adding set]")
  const action: TrainingAction = { 
    type: ADD_SET,
    payload: {
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

export function updateExerciseRestTime(index: number, set: number, restTime: number) {
  console.log("Action dispatched [Updating exercise Rest Time]")
  const action: TrainingAction = { 
    type: UPDATE_EXERCISE_REST_TIME,
    payload: {
      restTime,
      index,
      set
    }
  }
  return action;
}

export function updateExerciseTrainTime(index: number, set: number, trainTime: number) {
  const action: TrainingAction = { 
    type: UPDATE_EXERCISE_TRAIN_TIME,
    payload: {
      trainTime,
      index,
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


