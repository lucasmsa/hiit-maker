import { DefaultRootState } from "react-redux";

export const getTrainingState = (state: TrainingState) => state;
export const getTrainSetLoops = (state: TrainingState) => state.trainSetLoops;
export const getCurrentTrainingSet = (state: TrainingState) => state.currentSet;
export const getTotalTrainingTime = (state: TrainingState) => state.totalTrainingTime;
export const getTrainingSetExercises = (state: TrainingState) => {
  const training = getTrainSetLoops(state)
  const set = getCurrentTrainingSet(state)
  const currentSetExercises = training[set].trainSet.exercises;

  return currentSetExercises;
}
export const getTrainingSetLoopQuantity = (state: TrainingState) => {
  const training = getTrainSetLoops(state)
  const set = getCurrentTrainingSet(state)
  const currentSetLoops = training[set].loops;
  
  return currentSetLoops;
}