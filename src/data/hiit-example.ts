import type { HiitSet, HiitWorkout, PlacedExercise } from '@/lib/types';

const SEEDED_AT = Date.UTC(2026, 8, 3);

function placed(id: string, exerciseId: string, trainSeconds = 30, restSeconds = 15): PlacedExercise {
  return { id, ref: { kind: 'catalog', exerciseId }, trainSeconds, restSeconds };
}

function set(id: string, exercises: PlacedExercise[], loops = 3, setRestSeconds = 60): HiitSet {
  return { id, exercises, loops, setRestSeconds };
}

export const hiitExample: HiitWorkout = {
  id: 'example-full-body',
  name: 'Full body starter',
  warmupSeconds: 90,
  createdAt: SEEDED_AT,
  updatedAt: SEEDED_AT,
  sets: [
    set('example-set-1', [
      placed('example-1-1', 'push-up'),
      placed('example-1-2', 'squat'),
      placed('example-1-3', 'plank'),
    ]),
    set('example-set-2', [
      placed('example-2-1', 'mountain-climber'),
      placed('example-2-2', 'dead-bug'),
      placed('example-2-3', 'burpee'),
    ]),
    set('example-set-3', [
      placed('example-3-1', 'jumping-jack', 40, 20),
      placed('example-3-2', 'bicycle-crunch'),
      placed('example-3-3', 'pike-push-up'),
    ]),
  ],
};
