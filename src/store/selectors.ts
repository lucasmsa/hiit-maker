import { DefaultRootState } from "react-redux";

export const getTrainingState = (state: any) => state;
export const getTrainSetLoops = (state: any) => state.trainSetLoops;
export const getCurrentTrainingSet = (state: any) => state.currentSet;
export const getTotalTrainingTime = (state: any) => state.totalTrainingTime;
export const getTrainingSetExercises = (state: any) => {
  const set = getCurrentTrainingSet(state)
  if (set <= getTrainSetLoops(state).length) {
    const currentSetExercises = getTrainSetLoops(state)[set].trainSet.exercises;
    return currentSetExercises;
  } else {
    return null;
  }
}