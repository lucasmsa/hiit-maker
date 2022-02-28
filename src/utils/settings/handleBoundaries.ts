import { PossibleConfigurations } from './possibleConfigurations';

export const handleBoundaries = (
  value: string,
  label: PossibleConfigurations,
  configurationBoundaries: { [key in PossibleConfigurations]: { min: number; max: number } }
) => {
  const { min, max } = configurationBoundaries[label];
  if (isNaN(+value)) return min;
  let newValue = value !== '' ? Number(value) : min;
  newValue < min && (newValue = min);
  newValue > max && (newValue = max);

  return newValue;
};
