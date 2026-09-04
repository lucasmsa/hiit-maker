import { describe, expect, it } from 'vitest';
import { compileHiitSchedule, compileRestSchedule, scheduleTotalMs, workoutTotalSeconds } from '@/lib/schedule';
import type { HiitWorkout } from '@/lib/types';

function workout(overrides: Partial<HiitWorkout> = {}): HiitWorkout {
  return {
    id: 'w',
    name: 'Test',
    warmupSeconds: 10,
    createdAt: 0,
    updatedAt: 0,
    sets: [
      {
        id: 's1',
        loops: 2,
        setRestSeconds: 30,
        exercises: [
          { id: 'a', ref: { kind: 'catalog', exerciseId: 'push-up' }, trainSeconds: 20, restSeconds: 5 },
          { id: 'b', ref: { kind: 'custom', name: 'Shadow boxing' }, trainSeconds: 15, restSeconds: 5 },
        ],
      },
      {
        id: 's2',
        loops: 1,
        setRestSeconds: 30,
        exercises: [{ id: 'c', ref: { kind: 'catalog', exerciseId: 'plank' }, trainSeconds: 40, restSeconds: 10 }],
      },
    ],
    ...overrides,
  };
}

describe('compileHiitSchedule', () => {
  it('orders warmup, loops, rests and set rests, dropping the trailing rest', () => {
    const kinds = compileHiitSchedule(workout()).map((phase) => phase.kind);
    expect(kinds).toEqual([
      'warmup',
      'train', 'rest', 'train', 'rest',
      'train', 'rest', 'train',
      'setRest',
      'train',
    ]);
  });

  it('totals every phase', () => {
    const total = 10 + (20 + 5 + 15 + 5) + (20 + 5 + 15) + 30 + 40;
    expect(workoutTotalSeconds(workout())).toBe(total);
  });

  it('skips empty sets and zero-length phases', () => {
    const emptyFirst = workout({
      warmupSeconds: 0,
      sets: [
        { id: 'empty', loops: 3, setRestSeconds: 60, exercises: [] },
        {
          id: 's',
          loops: 1,
          setRestSeconds: 60,
          exercises: [{ id: 'x', ref: { kind: 'catalog', exerciseId: 'squat' }, trainSeconds: 30, restSeconds: 0 }],
        },
      ],
    });
    const schedule = compileHiitSchedule(emptyFirst);
    expect(schedule.map((phase) => phase.kind)).toEqual(['train']);
    expect(scheduleTotalMs(schedule)).toBe(30_000);
  });

  it('carries set, loop and exercise positions', () => {
    const [, first, , , , thirdTrain] = compileHiitSchedule(workout());
    expect(first).toMatchObject({ setIndex: 0, loopIndex: 0, exerciseIndex: 0, placedExerciseId: 'a' });
    expect(thirdTrain).toMatchObject({ setIndex: 0, loopIndex: 1, exerciseIndex: 0, placedExerciseId: 'a' });
  });
});

describe('compileRestSchedule', () => {
  it('is a single rest phase', () => {
    expect(compileRestSchedule(90)).toEqual([{ id: 'rest', kind: 'rest', durationMs: 90_000 }]);
  });
});
