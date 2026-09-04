import { describe, expect, it } from 'vitest';
import fixture from '@/lib/__fixtures__/legacy-persist.json';
import {
  LEGACY_STORAGE_KEY,
  convertLegacyTraining,
  legacyNameToRef,
  parseLegacyRoot,
  readLegacyImport,
} from '@/lib/legacy-migration';

describe('legacy migration', () => {
  it('parses the redux-persist root captured from the live app', () => {
    const training = parseLegacyRoot(fixture.value);
    expect(training?.trainSetLoops).toHaveLength(3);
    expect(training?.trainingDefaultValues.setRepetitions).toBe(2);
  });

  it('maps old exercise names onto catalog ids', () => {
    expect(legacyNameToRef('Regular push up')).toEqual({ kind: 'catalog', exerciseId: 'push-up' });
    expect(legacyNameToRef('Pull ups')).toEqual({ kind: 'catalog', exerciseId: 'pull-up' });
    expect(legacyNameToRef('Bent-over Lat pulldown')).toEqual({
      kind: 'catalog',
      exerciseId: 'bent-over-lat-pulldown',
    });
    expect(legacyNameToRef('Jumping squats')).toEqual({ kind: 'catalog', exerciseId: 'jump-squat' });
    expect(legacyNameToRef('Kettlebell swing')).toEqual({ kind: 'custom', name: 'Kettlebell swing' });
  });

  it('converts sets, times and defaults, dropping empty sets', () => {
    const training = parseLegacyRoot(fixture.value);
    if (!training) {
      throw new Error('fixture did not parse');
    }
    const { workout, defaults } = convertLegacyTraining(training, 'Imported workout', 123);
    expect(defaults).toEqual({
      warmupSeconds: 60,
      trainSeconds: 40,
      restSeconds: 20,
      setRestSeconds: 45,
      setRepetitions: 2,
    });
    expect(workout?.name).toBe('Imported workout');
    expect(workout?.warmupSeconds).toBe(60);
    expect(workout?.sets).toHaveLength(2);
    expect(workout?.sets[0]).toMatchObject({ loops: 3, setRestSeconds: 60 });
    expect(workout?.sets[0]?.exercises.map((exercise) => exercise.ref)).toEqual([
      { kind: 'catalog', exerciseId: 'push-up' },
      { kind: 'catalog', exerciseId: 'dead-bug' },
    ]);
    expect(workout?.sets[1]?.exercises[1]).toMatchObject({
      ref: { kind: 'catalog', exerciseId: 'pistol-squat' },
      trainSeconds: 20,
      restSeconds: 10,
    });
  });

  it('returns no workout when every set is empty but still carries defaults', () => {
    const training = parseLegacyRoot(fixture.value);
    if (!training) {
      throw new Error('fixture did not parse');
    }
    const emptied = { ...training, trainSetLoops: [training.trainSetLoops[2]!] };
    const { workout, defaults } = convertLegacyTraining(emptied, 'Imported workout', 0);
    expect(workout).toBeNull();
    expect(defaults.warmupSeconds).toBe(60);
  });

  it('reads from storage once and removes the key', () => {
    localStorage.setItem(LEGACY_STORAGE_KEY, fixture.value);
    const first = readLegacyImport(localStorage, 'Imported workout', 0);
    expect(first?.workout?.sets).toHaveLength(2);
    expect(localStorage.getItem(LEGACY_STORAGE_KEY)).toBeNull();
    expect(readLegacyImport(localStorage, 'Imported workout', 0)).toBeNull();
  });

  it('ignores unparseable roots but still clears the key', () => {
    localStorage.setItem(LEGACY_STORAGE_KEY, '{"training": "not json"}');
    expect(readLegacyImport(localStorage, 'Imported workout', 0)).toBeNull();
    expect(localStorage.getItem(LEGACY_STORAGE_KEY)).toBeNull();
  });
});
