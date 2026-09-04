import { clamp } from '@/lib/number';
import type { Defaults } from '@/lib/types';

export interface Bound {
  min: number;
  max: number;
  step: number;
}

export const defaultBounds: Record<keyof Defaults, Bound> = {
  warmupSeconds: { min: 0, max: 600, step: 5 },
  trainSeconds: { min: 5, max: 600, step: 5 },
  restSeconds: { min: 0, max: 300, step: 5 },
  setRestSeconds: { min: 0, max: 600, step: 5 },
  setRepetitions: { min: 1, max: 20, step: 1 },
};

export function clampDefault(key: keyof Defaults, value: number): number {
  const bound = defaultBounds[key];
  if (Number.isNaN(value)) {
    return bound.min;
  }
  return clamp(Math.round(value), bound.min, bound.max);
}

export function clampDefaults(defaults: Defaults): Defaults {
  return {
    warmupSeconds: clampDefault('warmupSeconds', defaults.warmupSeconds),
    trainSeconds: clampDefault('trainSeconds', defaults.trainSeconds),
    restSeconds: clampDefault('restSeconds', defaults.restSeconds),
    setRestSeconds: clampDefault('setRestSeconds', defaults.setRestSeconds),
    setRepetitions: clampDefault('setRepetitions', defaults.setRepetitions),
  };
}
