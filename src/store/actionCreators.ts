import { PossibleConfigurations } from '../utils/settings/possibleConfigurations';
import {
  ADD_SET,
  ADD_EXERCISE,
  REMOVE_EXERCISE,
  REMOVE_CURRENT_SET,
  UPDATE_CURRENT_SET,
  UPDATE_EXERCISE_REST_TIME,
  UPDATE_EXERCISE_TRAIN_TIME,
  UPDATE_CURRENT_SET_LOOP_QUANTITY,
  UPDATE_SET_REST_TIME,
  UPDATE_DEFAULT_TRAINING_VALUES
} from './actionTypes';

export function addExercise(exercise: Exercise, set: number) {
  const action: TrainingAction = {
    type: ADD_EXERCISE,
    payload: {
      exercise,
      set
    }
  };
  return action;
}

export function removeSet(set: number) {
  const action: TrainingAction = {
    type: REMOVE_CURRENT_SET,
    payload: {
      set
    }
  };
  return action;
}

export function updateCurrentSet(set: number) {
  const action: TrainingAction = {
    type: UPDATE_CURRENT_SET,
    payload: {
      set
    }
  };

  return action;
}

export function addSet(set: number) {
  const action: TrainingAction = {
    type: ADD_SET,
    payload: {
      set
    }
  };
  return action;
}

export function updateSetRest(set: number, setRestTime: number) {
  const action: TrainingAction = {
    type: UPDATE_SET_REST_TIME,
    payload: {
      set,
      setRestTime
    }
  };

  return action;
}

export function updateDefaultTrainingValues(defaultTrainingValues: {
  [key in PossibleConfigurations]: number;
}) {
  const action: TrainingAction = {
    type: UPDATE_DEFAULT_TRAINING_VALUES,
    payload: {
      defaultTrainingValues,
      set: 0
    }
  };

  return action;
}

export function updateCurrentSetLoopQuantity(loops: number, set: number) {
  const action: TrainingAction = {
    type: UPDATE_CURRENT_SET_LOOP_QUANTITY,
    payload: {
      loops,
      set
    }
  };
  return action;
}

export function updateExerciseRestTime(index: number, set: number, restTime: number) {
  const action: TrainingAction = {
    type: UPDATE_EXERCISE_REST_TIME,
    payload: {
      restTime,
      index,
      set
    }
  };
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
  };
  return action;
}

export function removeExercise(index: number, set: number) {
  const action: TrainingAction = {
    type: REMOVE_EXERCISE,
    payload: {
      index,
      set
    }
  };
  return action;
}
