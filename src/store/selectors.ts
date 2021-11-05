export const getTrainingState = (state: TrainingState) => state;
export const getTrainSetLoops = (state: TrainingState) => state.trainSetLoops;
export const getCurrentSet = (state: TrainingState) => state.currentSet;

export const getTotalTrainingTime = (state: TrainingState) => {
  const training = getTrainSetLoops(state)
  return training.reduce((accumulator, set) => accumulator + set.totalSetTime + set.setRestTime, 0)
};

export const getTrainingSetExercises = (state: TrainingState) => {
  const training = getTrainSetLoops(state)
  const set = getCurrentSet(state)
  const currentSetExercises = training[set].trainSet.exercises;
  return currentSetExercises;
}

export const getSetRestTime = (state: TrainingState) => { 
  const training = getTrainSetLoops(state)
  const set = getCurrentSet(state)

  return training[set].setRestTime;
}

export const getTrainingSetLoopQuantity = (state: TrainingState) => {
  const training = getTrainSetLoops(state)
  const set = getCurrentSet(state)
  const currentSetLoops = training[set].loops;
  
  return currentSetLoops;
}