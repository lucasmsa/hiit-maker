import { PossibleConfigurations } from './possibleConfigurations';

export const configurationBoundaries = {
  warmupTime: { min: 1, max: 999 },
  exerciseRestTime: { min: 1, max: 999 },
  exerciseTrainTime: { min: 1, max: 999 },
  setRestTime: { min: 1, max: 999 },
  setRepetitions: { min: 1, max: 5 }
} as { [key in PossibleConfigurations]: { min: number; max: number } };
