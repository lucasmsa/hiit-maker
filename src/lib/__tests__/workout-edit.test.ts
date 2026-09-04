import { describe, expect, it } from 'vitest';
import { hiitExample } from '@/data/hiit-example';
import { initialDefaults } from '@/stores/library';
import {
  addExercise,
  addSet,
  cloneWorkoutWithNewIds,
  createWorkout,
  exerciseCount,
  groupCounts,
  moveExercise,
  moveSet,
  newPlacedExercise,
  removeExercise,
  removeSet,
  updateExercise,
  updateSet,
} from '@/lib/workout-edit';

describe('workout edits', () => {
  it('creates a workout with one empty set from defaults', () => {
    const workout = createWorkout('Fresh', initialDefaults, 5);
    expect(workout.sets).toHaveLength(1);
    expect(workout.sets[0]).toMatchObject({ loops: 3, setRestSeconds: 60, exercises: [] });
    expect(workout.warmupSeconds).toBe(90);
    expect(workout.createdAt).toBe(5);
  });

  it('adds, updates and removes exercises inside a set', () => {
    const base = createWorkout('W', initialDefaults, 0);
    const setId = base.sets[0]!.id;
    const placed = newPlacedExercise({ kind: 'catalog', exerciseId: 'plank' }, initialDefaults);
    const added = addExercise(base, setId, placed);
    expect(added.sets[0]?.exercises).toHaveLength(1);

    const updated = updateExercise(added, setId, placed.id, { trainSeconds: 45 });
    expect(updated.sets[0]?.exercises[0]?.trainSeconds).toBe(45);

    const removed = removeExercise(updated, setId, placed.id);
    expect(removed.sets[0]?.exercises).toHaveLength(0);
  });

  it('keeps the same exercise out of one set but allows it in another', () => {
    const base = createWorkout('W', initialDefaults, 0);
    const withSecondSet = addSet(base, initialDefaults);
    const [setOne, setTwo] = withSecondSet.sets;
    const first = newPlacedExercise({ kind: 'catalog', exerciseId: 'plank' }, initialDefaults);
    const again = newPlacedExercise({ kind: 'catalog', exerciseId: 'plank' }, initialDefaults);
    const elsewhere = newPlacedExercise({ kind: 'catalog', exerciseId: 'plank' }, initialDefaults);
    const placed = addExercise(withSecondSet, setOne!.id, first);
    const refused = addExercise(placed, setOne!.id, again);
    expect(refused.sets[0]?.exercises.map((exercise) => exercise.id)).toEqual([first.id]);
    const other = addExercise(refused, setTwo!.id, elsewhere);
    expect(other.sets[1]?.exercises.map((exercise) => exercise.id)).toEqual([elsewhere.id]);
  });

  it('moves an exercise between sets at a clamped index', () => {
    const [set1, set2] = hiitExample.sets;
    const moving = set1!.exercises[0]!;
    const moved = moveExercise(
      hiitExample,
      { setId: set1!.id, placedId: moving.id },
      { setId: set2!.id, index: 99 },
    );
    expect(moved.sets[0]?.exercises).toHaveLength(2);
    expect(moved.sets[1]?.exercises.at(-1)?.id).toBe(moving.id);
    expect(exerciseCount(moved)).toBe(exerciseCount(hiitExample));
  });

  it('never removes the last set, adds sets from defaults, reorders sets', () => {
    const single = createWorkout('W', initialDefaults, 0);
    expect(removeSet(single, single.sets[0]!.id)).toBe(single);

    const two = addSet(single, initialDefaults);
    expect(two.sets).toHaveLength(2);
    const reordered = moveSet(two, two.sets[1]!.id, 0);
    expect(reordered.sets[0]?.id).toBe(two.sets[1]!.id);

    const tuned = updateSet(reordered, reordered.sets[0]!.id, { loops: 5 });
    expect(tuned.sets[0]?.loops).toBe(5);
  });

  it('clones with fresh ids everywhere', () => {
    const clone = cloneWorkoutWithNewIds(hiitExample, 'Copy', 9);
    expect(clone.id).not.toBe(hiitExample.id);
    expect(clone.name).toBe('Copy');
    const originalIds = new Set(hiitExample.sets.flatMap((set) => [set.id, ...set.exercises.map((e) => e.id)]));
    for (const set of clone.sets) {
      expect(originalIds.has(set.id)).toBe(false);
      for (const exercise of set.exercises) {
        expect(originalIds.has(exercise.id)).toBe(false);
      }
    }
  });

  it('counts target muscle groups from the catalog', () => {
    expect(groupCounts(hiitExample)).toEqual({
      chest: 1,
      legs: 1,
      core: 3,
      cardio: 3,
      shoulders: 1,
    });
  });
});
