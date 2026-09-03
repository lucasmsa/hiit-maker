import { describe, expect, it } from 'vitest';
import { draftFromPrescription, prescriptionFromDraft } from '@/lib/gym-draft';
import {
  exerciseName,
  formatPrescription,
  formatSetLog,
  plannedSetCount,
  sessionVolumeKg,
} from '@/lib/gym-format';
import { translatorFor } from '@/lib/i18n';
import { reorderMoves } from '@/lib/reorder';
import type { GymPrescription, GymSessionLog } from '@/lib/types';

const t = translatorFor('en');

function prescription(overrides: Partial<GymPrescription>): GymPrescription {
  return { reps: { kind: 'unspecified' }, perSide: false, optional: false, ...overrides };
}

describe('formatPrescription', () => {
  it('renders sets x reps ranges', () => {
    expect(
      formatPrescription(
        prescription({
          sets: { min: 3, max: 3 },
          reps: { kind: 'reps', reps: { min: 8, max: 10 } },
        }),
        t,
      ),
    ).toBe('3 x 8-10');
  });

  it('renders holds per side', () => {
    const text = formatPrescription(
      prescription({
        sets: { min: 2, max: 2 },
        reps: { kind: 'time', seconds: { min: 30, max: 30 } },
        perSide: true,
      }),
      t,
    );
    expect(text).toBe('2 x 30 s hold per side');
  });

  it('renders sets alone when the measure is open', () => {
    expect(formatPrescription(prescription({ sets: { min: 3, max: 4 } }), t)).toBe('3-4 sets');
  });

  it('renders nothing but the side marker when neither is set', () => {
    expect(formatPrescription(prescription({ perSide: true }), t)).toBe('per side');
  });
});

describe('exerciseName and set counts', () => {
  it('translates catalog refs and passes custom names through', () => {
    expect(exerciseName({ kind: 'catalog', exerciseId: 'squat' }, t)).toBe('Squat');
    expect(exerciseName({ kind: 'custom', name: 'Sled push' }, t)).toBe('Sled push');
  });

  it('plans the upper bound of the sets range', () => {
    expect(plannedSetCount(prescription({ sets: { min: 2, max: 3 } }))).toBe(3);
    expect(plannedSetCount(prescription({}))).toBe(1);
  });
});

describe('session volume', () => {
  it('sums weight times reps for done sets only', () => {
    const log: GymSessionLog = {
      id: 'log',
      routineId: 'r',
      dayId: 'd',
      startedAt: 0,
      entries: {
        a: [
          { done: true, at: 1, weightKg: 20, reps: 10 },
          { done: false, at: 2, weightKg: 20, reps: 10 },
          { done: true, at: 3, reps: 10 },
        ],
        b: [{ done: true, at: 4, weightKg: 2.5, reps: 4 }],
      },
    };
    expect(sessionVolumeKg(log)).toBe(210);
  });

  it('formats a logged set for the previous-session hint', () => {
    expect(formatSetLog({ done: true, at: 0, weightKg: 22.5, reps: 8 }, t, false)).toBe(
      '22.5 kg x 8 reps',
    );
    expect(formatSetLog({ done: true, at: 0, reps: 45 }, t, true)).toBe('45 s');
  });
});

describe('draft round trip', () => {
  it('drops empty tempo and notes and only keeps rest when custom', () => {
    const source = prescription({
      sets: { min: 3, max: 4 },
      reps: { kind: 'reps', reps: { min: 8, max: 12 } },
      tempo: '3 s down',
      notes: 'Light',
      restSeconds: 120,
    });
    const draft = draftFromPrescription(null, source, 90);
    expect(prescriptionFromDraft(draft)).toEqual(source);

    const cleared = prescriptionFromDraft({ ...draft, tempo: '  ', notes: '', customRest: false });
    expect(cleared).toEqual({
      sets: { min: 3, max: 4 },
      reps: { kind: 'reps', reps: { min: 8, max: 12 } },
      perSide: false,
      optional: false,
    });
  });

  it('never lets max fall below min', () => {
    const draft = draftFromPrescription(null, prescription({}), 90);
    const result = prescriptionFromDraft({
      ...draft,
      measure: 'reps',
      repsMin: 12,
      repsMax: 8,
      setsMin: 4,
      setsMax: 2,
    });
    expect(result.sets).toEqual({ min: 4, max: 4 });
    expect(result.reps).toEqual({ kind: 'reps', reps: { min: 12, max: 12 } });
  });
});

describe('reorderMoves', () => {
  it('produces the moves that turn one order into another', () => {
    const current = ['a', 'b', 'c', 'd'];
    const next = ['c', 'a', 'd', 'b'];
    const working = [...current];
    for (const move of reorderMoves(current, next)) {
      const from = working.indexOf(move.id);
      working.splice(from, 1);
      working.splice(move.toIndex, 0, move.id);
    }
    expect(working).toEqual(next);
  });

  it('is empty when nothing changed', () => {
    expect(reorderMoves(['a', 'b'], ['a', 'b'])).toEqual([]);
  });
});
