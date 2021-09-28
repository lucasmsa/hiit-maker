import {
  ADD_EXERCISE,
  REMOVE_EXERCISE,
  UPDATE_EXERCISE_REST_TIME,
  UPDATE_EXERCISE_TRAIN_TIME
} from './actionTypes';


export function addExercise(exercise: Exercise, set: number) {
  const action: TrainingAction = { 
    type: ADD_EXERCISE,
    payload: {
      exercise,
      set
    }
  }

  return action;
}



