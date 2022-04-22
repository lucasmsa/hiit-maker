export const getTrainingState = (state: TrainingState) => state;
export const getTrainSetLoops = (state: TrainingState) => state.trainSetLoops;
export const getCurrentSet = (state: TrainingState) => state.currentSet;

export const getTotalTrainingTime = (state: TrainingState) => {
  const training = getTrainSetLoops(state);
  const { warmupTime } = state.trainingDefaultValues;
  const totalExerciseTime = training.reduce(
    (accumulator, set) =>
      accumulator + set.totalSetTime + (set.trainSet.exercises.length ? set.setRestTime : 0),
    0
  );
  return totalExerciseTime > 0 ? warmupTime + totalExerciseTime : 0;
};

export const getAfflictedBodyParts = (state: TrainingState) => {
  return state.afflictedAreas;
};

export const getTrainingSetExercises = (state: TrainingState) => {
  const training = getTrainSetLoops(state);
  const set = getCurrentSet(state);
  const currentSetExercises = training[set].trainSet.exercises;
  return currentSetExercises;
};

export const getSetRestTime = (state: TrainingState) => {
  const training = getTrainSetLoops(state);
  const set = getCurrentSet(state);
  return training[set].setRestTime;
};

export const getTrainingDefaultValues = (state: TrainingState) => {
  return state.trainingDefaultValues;
};

export const getTrainingSetLoopQuantity = (state: TrainingState) => {
  const training = getTrainSetLoops(state);
  const set = getCurrentSet(state);
  const currentSetLoops = training[set].loops;

  return currentSetLoops;
};
