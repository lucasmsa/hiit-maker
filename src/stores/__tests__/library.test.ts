import { beforeEach, describe, expect, it } from 'vitest';
import { gymTemplate } from '@/data/gym-template';
import { hiitExample } from '@/data/hiit-example';
import { encodeWorkoutShare } from '@/lib/share';
import { lastSetsFor } from '@/lib/session-log';
import { LIBRARY_STORAGE_KEY, initialLibraryState, useLibraryStore } from '@/stores/library';

const store = () => useLibraryStore.getState();

beforeEach(() => {
  useLibraryStore.setState(initialLibraryState('en'));
});

describe('library store: seeds and persistence', () => {
  it('starts with the example workout and the template routine', () => {
    expect(store().workouts.map((workout) => workout.id)).toEqual([hiitExample.id]);
    expect(store().routines.map((routine) => routine.id)).toEqual([gymTemplate.id]);
    expect(store().lastMode).toBeNull();
    expect(store().settings.language).toBe('en');
  });

  it('persists state under a versioned key without functions', () => {
    store().setLastMode('gym');
    const raw = localStorage.getItem(LIBRARY_STORAGE_KEY);
    expect(raw).not.toBeNull();
    const parsed = JSON.parse(raw!) as { version: number; state: Record<string, unknown> };
    expect(parsed.version).toBe(1);
    expect(parsed.state.lastMode).toBe('gym');
    expect(Object.keys(parsed.state).sort()).toEqual(['lastMode', 'logs', 'routines', 'settings', 'workouts']);
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

describe('library store: routines and sessions', () => {
  it('creates, edits and deletes routines', () => {
    const id = store().createRoutine('Upper', 'Day A');
    expect(store().routines[0]).toMatchObject({ id, name: 'Upper', restSeconds: 90 });

    store().renameRoutine(id, 'Upper body');
    store().updateRoutine(id, { restSeconds: 120 });
    expect(store().routines[0]).toMatchObject({ name: 'Upper body', restSeconds: 120 });

    const dayA = store().routines[0]!.days[0]!.id;
    const dayB = store().addDay(id, 'Day B');
    store().updateDay(id, dayB, { notes: 'Light' });
    store().moveDay(id, dayB, 0);
    expect(store().routines[0]?.days.map((day) => day.name)).toEqual(['Day B', 'Day A']);
    expect(store().routines[0]?.days[0]?.notes).toBe('Light');

    const entryId = store().addEntry(id, dayA, { kind: 'catalog', exerciseId: 'squat' });
    const secondEntry = store().addEntry(id, dayA, { kind: 'custom', name: 'Sled push' });
    store().moveEntry(id, dayA, secondEntry, 0);
    store().updatePrescription(id, dayA, entryId, { sets: { min: 5, max: 5 }, optional: true });
    const day = store().routines[0]!.days.find((entry) => entry.id === dayA)!;
    expect(day.entries.map((entry) => entry.id)).toEqual([secondEntry, entryId]);
    expect(day.entries[1]?.prescription).toMatchObject({ sets: { min: 5, max: 5 }, optional: true });

    store().removeEntry(id, dayA, secondEntry);
    store().removeDay(id, dayB);
    expect(store().routines[0]?.days).toHaveLength(1);
    expect(store().routines[0]?.days[0]?.entries).toHaveLength(1);

    const copy = store().duplicateRoutine(id, 'Copy');
    expect(copy).not.toBeNull();
    store().deleteRoutine(id);
    store().deleteRoutine(copy!);
    expect(store().routines.map((routine) => routine.id)).toEqual([gymTemplate.id]);
  });

  it('logs sets and surfaces the last logged values per exercise', () => {
    const pushDay = gymTemplate.days.find((day) => day.name === 'Push')!;
    const lateralRaise = pushDay.entries.find(
      (entry) => entry.ref.kind === 'catalog' && entry.ref.exerciseId === 'lateral-raise',
    )!;

    const logId = store().startSession(gymTemplate.id, pushDay.id);
    store().logSet(logId, lateralRaise.id, 0, { weightKg: 8, reps: 14, done: true, at: 1 });
    store().logSet(logId, lateralRaise.id, 1, { weightKg: 8, reps: 12, done: true, at: 2 });
    store().finishSession(logId);

    const log = store().logs[0]!;
    expect(log.finishedAt).toBeDefined();
    expect(log.entries[lateralRaise.id]).toHaveLength(2);

    const last = lastSetsFor(store().logs, store().routines, { kind: 'catalog', exerciseId: 'lateral-raise' });
    expect(last?.map((set) => set.reps)).toEqual([14, 12]);
    expect(lastSetsFor(store().logs, store().routines, { kind: 'catalog', exerciseId: 'squat' })).toBeUndefined();
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

  it('remembers the last mode', () => {
    store().setLastMode('hiit');
    expect(store().lastMode).toBe('hiit');
  });
});
