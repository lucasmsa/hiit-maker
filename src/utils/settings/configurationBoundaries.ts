import { PossibleConfigurations } from './possibleConfigurations';

export const configurationBoundaries = {
  warmupTime: { min: 5, max: 999 },
  exerciseRestTime: { min: 5, max: 999 },
  exerciseTrainTime: { min: 0, max: 999 },
  setRestTime: { min: 0, max: 999 },
  setRepetitions: { min: 1, max: 5 }
} as { [key in PossibleConfigurations]: { min: number; max: number } };
