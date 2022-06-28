export const getTrainingState = (state: States) => state.training;
export const getTrainSetLoops = (state: States) => state.training.trainSetLoops;
export const getCurrentSet = (state: States) => state.training.currentSet;

export const getTotalTrainingTime = (state: States) => {
  let totalTrainingTime = 0;
  const training = getTrainSetLoops(state);
  const { warmupTime } = state.training.trainingDefaultValues;
  const totalExerciseTime = training.reduce(
    (accumulator: number, set: TrainSetLoop) =>
      accumulator + set.totalSetTime + (set.trainSet.exercises.length ? set.setRestTime : 0),
    0
  );
  const currentSetExercises = getCurrentSetExercises(training, training.length - 1);

  if (totalExerciseTime) {
    let lastExerciseOnTrainingRestValues = 0;
    if (currentSetExercises.length) {
      lastExerciseOnTrainingRestValues =
        training[training.length - 1].setRestTime +
        currentSetExercises[currentSetExercises.length - 1].restTime;
    } else if (training.length - 2 >= 0) {
      const lastSet = training.length - 2;
      const lastSetExercises = getCurrentSetExercises(training, lastSet);
      lastExerciseOnTrainingRestValues =
        training[lastSet].setRestTime + lastSetExercises[lastSetExercises.length - 1].restTime;
    }

    totalTrainingTime = warmupTime + totalExerciseTime - lastExerciseOnTrainingRestValues;
  }

  return totalTrainingTime;
};

export const getAfflictedBodyParts = (state: States) => {
  return state.training.afflictedAreas;
};

export const getTrainingSetExercises = (state: States) => {
  const training = getTrainSetLoops(state);
  const set = getCurrentSet(state);
  return getCurrentSetExercises(training, set);
};

export const getCurrentSetExercises = (training: TrainSetLoop[], set: number) => {
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
