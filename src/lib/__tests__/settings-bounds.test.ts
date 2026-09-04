import { describe, expect, it } from 'vitest';
import { clampDefault, clampDefaults, defaultBounds } from '@/lib/settings-bounds';

describe('clampDefault', () => {
  it('keeps values inside the bound and rounds to integers', () => {
    expect(clampDefault('trainSeconds', 5000)).toBe(defaultBounds.trainSeconds.max);
    expect(clampDefault('trainSeconds', -3)).toBe(defaultBounds.trainSeconds.min);
    expect(clampDefault('setRepetitions', 2.6)).toBe(3);
  });

  it('falls back to the minimum for NaN and clamps infinities', () => {
    expect(clampDefault('restSeconds', Number.NaN)).toBe(defaultBounds.restSeconds.min);
    expect(clampDefault('warmupSeconds', Number.POSITIVE_INFINITY)).toBe(defaultBounds.warmupSeconds.max);
  });
});

describe('clampDefaults', () => {
  it('clamps every field independently', () => {
    expect(
      clampDefaults({
        warmupSeconds: 10_000,
        trainSeconds: 1,
        restSeconds: 15,
        setRestSeconds: -1,
        setRepetitions: 99,
      }),
    ).toEqual({
      warmupSeconds: 600,
      trainSeconds: 5,
      restSeconds: 15,
      setRestSeconds: 0,
      setRepetitions: 20,
    });
  });
});
