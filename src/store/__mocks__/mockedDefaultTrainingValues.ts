export const defaultTrainingValuesMockCreator = ({
  exerciseRestTime,
  exerciseTrainTime,
  setRepetitions,
  setRestTime,
  warmupTime
}: TrainingDefaultValues) => ({
  exerciseRestTime,
  exerciseTrainTime,
  setRepetitions,
  setRestTime,
  warmupTime
});

export const defaultTrainingValuesMock = defaultTrainingValuesMockCreator({
  exerciseRestTime: 18,
  exerciseTrainTime: 18,
  setRepetitions: 18,
  setRestTime: 18,
  warmupTime: 18
});
