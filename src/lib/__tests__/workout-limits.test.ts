import { describe, expect, it } from 'vitest';
import { addExercise, addSet } from '@/lib/workout-edit';
import { MAX_EXERCISES_PER_SET, MAX_SETS } from '@/lib/workout-limits';
import type { HiitWorkout, PlacedExercise } from '@/lib/types';

const defaults = {
  warmupSeconds: 90,
  trainSeconds: 30,
  restSeconds: 15,
  setRestSeconds: 60,
  setRepetitions: 3,
};

function placed(exerciseId: string, id: string): PlacedExercise {
  return { id, ref: { kind: 'catalog', exerciseId }, trainSeconds: 30, restSeconds: 15 };
}

function workoutWith(exerciseIds: string[]): HiitWorkout {
  return {
    id: 'w1',
    name: 'Test',
    warmupSeconds: 90,
    createdAt: 0,
    updatedAt: 0,
    sets: [
      {
        id: 's1',
        loops: 3,
        setRestSeconds: 60,
        exercises: exerciseIds.map((exerciseId, index) => placed(exerciseId, `p${index}`)),
      },
    ],
  };
}

describe('builder limits', () => {
  it(`refuses more than ${MAX_EXERCISES_PER_SET} exercises in a set`, () => {
    const full = workoutWith(['push-up', 'squat', 'plank', 'burpee', 'crunch']);
    const after = addExercise(full, 's1', placed('dips', 'p9'));
    expect(after.sets[0]?.exercises).toHaveLength(MAX_EXERCISES_PER_SET);
  });

  it('refuses the same catalog exercise twice in one set', () => {
    const workout = workoutWith(['push-up']);
    const after = addExercise(workout, 's1', placed('push-up', 'p9'));
    expect(after.sets[0]?.exercises).toHaveLength(1);
  });

  it('allows a different exercise while the set has room', () => {
    const workout = workoutWith(['push-up']);
    const after = addExercise(workout, 's1', placed('squat', 'p9'));
    expect(after.sets[0]?.exercises).toHaveLength(2);
  });

  it(`refuses more than ${MAX_SETS} sets`, () => {
    let workout = workoutWith(['push-up']);
    for (let index = 0; index < MAX_SETS + 3; index += 1) {
      workout = addSet(workout, defaults);
    }
    expect(workout.sets).toHaveLength(MAX_SETS);
  });
});
