import { PossibleConfigurations } from './possibleConfigurations';

export const configurationBoundaries = {
  exerciseRestTime: { min: 5, max: 999 },
  exerciseTrainTime: { min: 0, max: 999 },
  finalRestTime: { min: 0, max: 999 },
  setRepetitions: { min: 1, max: 5 }
} as { [key in PossibleConfigurations]: { min: number; max: number } };
