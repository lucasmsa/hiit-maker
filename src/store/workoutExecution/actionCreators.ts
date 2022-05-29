import { START_WORKOUT_EXECUTION } from './actionTypes';

export function startTraining() {
  const action: TrainingAction = {
    type: START_WORKOUT_EXECUTION,
    payload: { set: 0 }
  };
  return action;
}
