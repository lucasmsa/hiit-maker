import { beforeEach, describe, expect, it } from 'vitest';
import { hiitExample } from '@/data/hiit-example';
import { encodeWorkoutShare } from '@/lib/share';
import {
  LIBRARY_STORAGE_KEY,
  dropGymState,
  initialLibraryState,
  useLibraryStore,
} from '@/stores/library';

const store = () => useLibraryStore.getState();

beforeEach(() => {
  useLibraryStore.setState(initialLibraryState('en'));
});

describe('library store: seeds and persistence', () => {
  it('starts with the example workout', () => {
    expect(store().workouts.map((workout) => workout.id)).toEqual([hiitExample.id]);
    expect(store().lastWorkoutId).toBeNull();
    expect(store().settings.language).toBe('en');
  });

  it('persists state under a versioned key without functions', () => {
    store().setLastWorkoutId(hiitExample.id);
    const raw = localStorage.getItem(LIBRARY_STORAGE_KEY);
    expect(raw).not.toBeNull();
    const parsed = JSON.parse(raw!) as { version: number; state: Record<string, unknown> };
    expect(parsed.version).toBe(2);
    expect(parsed.state.lastWorkoutId).toBe(hiitExample.id);
    expect(Object.keys(parsed.state).sort()).toEqual(['lastWorkoutId', 'settings', 'workouts']);
  });
});

describe('library store: workouts', () => {
  it('creates, renames, duplicates and deletes', () => {
    const id = store().createWorkout('Leg day');
    expect(store().workouts[0]).toMatchObject({ id, name: 'Leg day', warmupSeconds: 90 });

    store().renameWorkout(id, 'Leg day 2');
    expect(store().workouts[0]?.name).toBe('Leg day 2');

    const copyId = store().duplicateWorkout(id, 'Copy');
    expect(copyId).not.toBeNull();
    expect(store().workouts.map((workout) => workout.name)).toEqual(['Copy', 'Leg day 2', hiitExample.name]);
    expect(store().duplicateWorkout('missing', 'x')).toBeNull();

    store().deleteWorkout(id);
    store().deleteWorkout(copyId!);
    expect(store().workouts).toHaveLength(1);
  });

  it('edits sets and exercises and bumps updatedAt', () => {
    const id = store().createWorkout('W');
    const before = store().workouts[0]!.updatedAt;
    const setId = store().workouts[0]!.sets[0]!.id;

    store().addExercise(id, setId, { kind: 'catalog', exerciseId: 'burpee' });
    store().addExercise(id, setId, { kind: 'custom', name: 'Sprint' });
    let workout = store().workouts[0]!;
    expect(workout.sets[0]?.exercises.map((exercise) => exercise.ref)).toEqual([
      { kind: 'catalog', exerciseId: 'burpee' },
      { kind: 'custom', name: 'Sprint' },
    ]);
    expect(workout.sets[0]?.exercises[0]).toMatchObject({ trainSeconds: 30, restSeconds: 15 });
    expect(workout.updatedAt).toBeGreaterThanOrEqual(before);

    const placedId = workout.sets[0]!.exercises[0]!.id;
    store().updateExercise(id, setId, placedId, { trainSeconds: 45, restSeconds: 10 });
    expect(store().workouts[0]?.sets[0]?.exercises[0]).toMatchObject({ trainSeconds: 45, restSeconds: 10 });

    store().addSet(id);
    workout = store().workouts[0]!;
    expect(workout.sets).toHaveLength(2);
    const secondSetId = workout.sets[1]!.id;

    store().moveExercise(id, { setId, placedId }, { setId: secondSetId, index: 0 });
    workout = store().workouts[0]!;
    expect(workout.sets[0]?.exercises).toHaveLength(1);
    expect(workout.sets[1]?.exercises[0]?.id).toBe(placedId);

    store().updateSet(id, secondSetId, { loops: 4, setRestSeconds: 20 });
    expect(store().workouts[0]?.sets[1]).toMatchObject({ loops: 4, setRestSeconds: 20 });

    store().moveSet(id, secondSetId, 0);
    expect(store().workouts[0]?.sets[0]?.id).toBe(secondSetId);

    store().removeExercise(id, secondSetId, placedId);
    store().removeSet(id, secondSetId);
    expect(store().workouts[0]?.sets).toHaveLength(1);
    store().removeSet(id, setId);
    expect(store().workouts[0]?.sets).toHaveLength(1);

    store().updateWorkout(id, { warmupSeconds: 0 });
    expect(store().workouts[0]?.warmupSeconds).toBe(0);
  });

  it('imports a shared workout with fresh ids and rejects junk', () => {
    const imported = store().importFromShareHash(`#${encodeWorkoutShare(hiitExample)}`);
    expect(imported).not.toBeNull();
    expect(imported).not.toBe(hiitExample.id);
    expect(store().workouts).toHaveLength(2);
    expect(store().workouts[0]?.name).toBe(hiitExample.name);
    expect(store().importFromShareHash('#nope')).toBeNull();
    expect(store().workouts).toHaveLength(2);
  });

  it('applies a legacy import to defaults and workouts', () => {
    const defaults = { warmupSeconds: 1, trainSeconds: 2, restSeconds: 3, setRestSeconds: 4, setRepetitions: 5 };
    store().importLegacy({ workout: null, defaults });
    expect(store().settings.defaults).toEqual(defaults);
    expect(store().workouts).toHaveLength(1);

    store().importLegacy({ workout: { ...hiitExample, id: 'legacy', name: 'Imported workout' }, defaults });
    expect(store().workouts[0]).toMatchObject({ id: 'legacy', name: 'Imported workout' });
  });
});

describe('library store: settings', () => {
  it('merges partial defaults and other settings', () => {
    store().updateSettings({ muted: true, defaults: { trainSeconds: 45 } });
    expect(store().settings.muted).toBe(true);
    expect(store().settings.defaults).toMatchObject({ trainSeconds: 45, restSeconds: 15 });

    store().updateSettings({ language: 'pt-BR' });
    store().resetSettings();
    expect(store().settings.language).toBe('pt-BR');
    expect(store().settings.muted).toBe(false);
    expect(store().settings.defaults.trainSeconds).toBe(30);
  });

  it('remembers the last workout opened', () => {
    store().setLastWorkoutId('abc');
    expect(store().lastWorkoutId).toBe('abc');
  });
});

describe('library store: migration to v2', () => {
  it('drops gym state from a v1 payload and keeps the workouts', () => {
    const v1 = {
      workouts: [hiitExample],
      routines: [{ id: 'r1', name: 'Push / Pull / Legs', restSeconds: 90, days: [] }],
      logs: [{ id: 'l1', routineId: 'r1', dayId: 'd1', startedAt: 1, entries: {} }],
      settings: {
        language: 'pt-BR',
        unit: 'kg',
        muted: true,
        defaults: { warmupSeconds: 60, trainSeconds: 40, restSeconds: 20, setRestSeconds: 45, setRepetitions: 2 },
      },
      lastMode: 'gym',
      lastWorkoutId: hiitExample.id,
    };

    const migrated = dropGymState(v1) as unknown as Record<string, unknown>;

    expect(migrated.workouts).toEqual([hiitExample]);
    expect(migrated.lastWorkoutId).toBe(hiitExample.id);
    expect(migrated.settings).toEqual({
      language: 'pt-BR',
      muted: true,
      defaults: { warmupSeconds: 60, trainSeconds: 40, restSeconds: 20, setRestSeconds: 45, setRepetitions: 2 },
    });
    expect(Object.keys(migrated).sort()).toEqual(['lastWorkoutId', 'settings', 'workouts']);
  });

  it('falls back to defaults when a v1 payload is empty', () => {
    const migrated = dropGymState({});
    expect(migrated.workouts).toEqual([]);
    expect(migrated.lastWorkoutId).toBeNull();
    expect(migrated.settings.defaults.trainSeconds).toBe(30);
  });
});
