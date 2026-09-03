import type { GymDay, GymEntry, GymPrescription, GymRoutine, Range, RepScheme } from '@/lib/types';

const SEEDED_AT = Date.UTC(2026, 8, 3);

function range(min: number, max = min): Range {
  return { min, max };
}

function reps(min: number, max = min): RepScheme {
  return { kind: 'reps', reps: range(min, max) };
}

function time(minSeconds: number, maxSeconds = minSeconds): RepScheme {
  return { kind: 'time', seconds: range(minSeconds, maxSeconds) };
}

const unspecified: RepScheme = { kind: 'unspecified' };

type PrescriptionInput = Partial<GymPrescription> & Pick<GymPrescription, 'reps'>;

function entry(id: string, exerciseId: string, input: PrescriptionInput): GymEntry {
  const prescription: GymPrescription = {
    perSide: false,
    optional: false,
    ...input,
  };
  return { id, ref: { kind: 'catalog', exerciseId }, prescription };
}

function day(id: string, name: string, entries: GymEntry[], notes?: string): GymDay {
  return notes === undefined ? { id, name, entries } : { id, name, notes, entries };
}

export const gymTemplate: GymRoutine = {
  id: 'template-push-pull-legs-prehab',
  name: 'Push / Pull / Legs + prehab',
  restSeconds: 90,
  createdAt: SEEDED_AT,
  updatedAt: SEEDED_AT,
  days: [
    day(
      'template-warmup',
      'Warm-up',
      [
        entry('template-warmup-1', 'banded-w-rotation', {
          sets: range(2),
          reps: reps(15),
          tempo: 'slow',
        }),
        entry('template-warmup-2', 'quadruped-external-rotation-hold', {
          sets: range(2),
          reps: reps(5, 6),
          perSide: true,
          notes: 'Kneeling, light dumbbell, rotate out, hold 5 s each',
        }),
        entry('template-warmup-3', 'seated-plate-rotation', {
          sets: range(1, 2),
          reps: reps(15),
          tempo: 'slow',
          perSide: true,
        }),
      ],
      'All gym days, 5 to 8 min',
    ),
    day(
      'template-push',
      'Push',
      [
        entry('template-push-1', 'incline-dumbbell-press', {
          sets: range(3),
          reps: reps(8, 10),
          notes: 'Incline or flat',
        }),
        entry('template-push-2', 'machine-chest-press', {
          sets: range(2, 3),
          reps: reps(10, 12),
          notes: 'Machine or cable press, or fly',
        }),
        entry('template-push-3', 'lateral-raise', { sets: range(3), reps: reps(12, 15) }),
        entry('template-push-4', 'trap-3-raise', {
          sets: range(2, 3),
          reps: reps(12, 15),
          notes: 'Prone Y. Very light, after presses',
        }),
        entry('template-push-5', 'cable-pushdown', {
          sets: range(3),
          reps: reps(10, 12),
          notes: 'Last set slow eccentric',
        }),
        entry('template-push-6', 'hollow-body-hold', {
          sets: range(3),
          reps: unspecified,
          notes: 'Or ab wheel',
        }),
      ],
      'Chest, triceps, shoulders, abs',
    ),
    day(
      'template-pull',
      'Pull',
      [
        entry('template-pull-1', 'weighted-pull-up', {
          sets: range(3, 4),
          reps: reps(3, 5),
          notes: 'Heavy',
        }),
        entry('template-pull-2', 'face-pull', {
          sets: range(3),
          reps: reps(12, 15),
          notes: 'With external rotation',
        }),
        entry('template-pull-3', 'dumbbell-shrug', {
          sets: range(2),
          reps: reps(10, 12),
          tempo: '3 s up / 3 s down',
        }),
        entry('template-pull-4', 'wrist-curl', {
          sets: range(3),
          reps: reps(10, 15),
          tempo: '3 s',
          notes: 'Palm-down only',
        }),
        entry('template-pull-5', 'forearm-rotation', {
          sets: range(2),
          reps: reps(10, 12),
          tempo: 'slow',
          perSide: true,
          notes: 'Light',
        }),
        entry('template-pull-6', 'cable-row', {
          sets: range(2),
          reps: unspecified,
          optional: true,
          notes: 'One horizontal row, elbows permitting',
        }),
      ],
      'Back and prehab. Cable external rotation dropped, the warm-up W covers it',
    ),
    day('template-legs', 'Legs', [
      entry('template-legs-1', 'squat', {
        sets: range(3, 4),
        reps: reps(6, 10),
        notes: 'Or leg press',
      }),
      entry('template-legs-2', 'romanian-deadlift', { sets: range(3), reps: reps(8, 10) }),
      entry('template-legs-3', 'bulgarian-split-squat', {
        sets: range(2, 3),
        reps: reps(8, 10),
        perSide: true,
        notes: 'Or lunges',
      }),
      entry('template-legs-4', 'calf-raise', { sets: range(3), reps: reps(12, 15) }),
      entry('template-legs-5', 'hip-thrust', { reps: unspecified, optional: true }),
    ]),
    day(
      'template-daily',
      'Daily',
      [
        entry('template-daily-1', 'thoracic-extension', {
          sets: range(1),
          reps: time(60, 120),
        }),
        entry('template-daily-2', 'levator-scapulae-stretch', {
          sets: range(1),
          reps: time(30),
          perSide: true,
        }),
      ],
      'Anytime',
    ),
  ],
};
