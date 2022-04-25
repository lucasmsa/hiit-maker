export const getTrainingState = (state: States) => state.training;
export const getTrainSetLoops = (state: States) => state.training.trainSetLoops;
export const getCurrentSet = (state: States) => state.training.currentSet;

export const getTotalTrainingTime = (state: States) => {
  const training = getTrainSetLoops(state);
  const { warmupTime } = state.training.trainingDefaultValues;
  const totalExerciseTime = training.reduce(
    (accumulator: number, set: TrainSetLoop) =>
      accumulator + set.totalSetTime + (set.trainSet.exercises.length ? set.setRestTime : 0),
    0
  );
  return totalExerciseTime > 0 ? warmupTime + totalExerciseTime : 0;
};

export const getAfflictedBodyParts = (state: States) => {
  return state.training.afflictedAreas;
};

export const getTrainingSetExercises = (state: States) => {
  const training = getTrainSetLoops(state);
  const set = getCurrentSet(state);
  const currentSetExercises = training[set].trainSet.exercises;
  return currentSetExercises;
};

export const getSetRestTime = (state: States) => {
  const training = getTrainSetLoops(state);
  const set = getCurrentSet(state);
  return training[set].setRestTime;
};

export const getTrainingDefaultValues = (state: States) => {
  return state.training.trainingDefaultValues;
};

export const getTrainingSetLoopQuantity = (state: States) => {
  const training = getTrainSetLoops(state);
  const set = getCurrentSet(state);
  const currentSetLoops = training[set].loops;

  return currentSetLoops;
};
