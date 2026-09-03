import { describe, expect, it } from 'vitest';
import { hiitExample } from '@/data/hiit-example';
import { translatorFor } from '@/lib/i18n';
import { backPhase, startRun, type RunSession } from '@/lib/run-clock';
import {
  entryState,
  exerciseName,
  exerciseVisual,
  groundKindOf,
  groundTone,
  nextTrainPhase,
  setPosition,
  setsInSchedule,
  workoutProgress,
} from '@/lib/run-view';
import { compileHiitSchedule } from '@/lib/schedule';

const T0 = 1_700_000_000_000;
const schedule = compileHiitSchedule(hiitExample);
const t = translatorFor('en');

function session(overrides: Partial<RunSession> = {}): RunSession {
  return { ...startRun({ kind: 'hiit', schedule, workoutId: hiitExample.id }, T0), ...overrides };
}

describe('entryState', () => {
  it('reports missing when the workout does not exist', () => {
    expect(entryState(null, 'nope', false)).toBe('missing');
  });

  it('reports fresh with no session or a finished foreign session', () => {
    expect(entryState(null, hiitExample.id, true)).toBe('fresh');
    expect(entryState(session({ workoutId: 'other', status: 'finished' }), hiitExample.id, true)).toBe('fresh');
    expect(entryState({ ...session(), kind: 'rest' }, hiitExample.id, true)).toBe('fresh');
  });

  it('reports live, paused, done and other', () => {
    expect(entryState(session(), hiitExample.id, true)).toBe('live');
    expect(entryState(session({ status: 'paused', pausedAt: T0 }), hiitExample.id, true)).toBe('paused');
    expect(entryState(session({ status: 'finished' }), hiitExample.id, true)).toBe('done');
    expect(entryState(session({ workoutId: 'other' }), hiitExample.id, true)).toBe('other');
  });
});

describe('ground', () => {
  it('maps the current phase to a ground kind and tone', () => {
    expect(groundKindOf(session())).toBe('warmup');
    expect(groundTone('warmup')).toBe('dark');
    expect(groundTone('train')).toBe('light');
    expect(groundKindOf(session({ status: 'finished' }))).toBe('done');
  });
});

describe('exercise lookups', () => {
  it('resolves catalog and custom names', () => {
    expect(exerciseName({ kind: 'catalog', exerciseId: 'push-up' }, t)).toBe('Push-up');
    expect(exerciseName({ kind: 'custom', name: 'Wall sit' }, t)).toBe('Wall sit');
    expect(exerciseName(undefined, t)).toBeUndefined();
  });

  it('resolves a photo for catalog refs only', () => {
    expect(exerciseVisual({ kind: 'catalog', exerciseId: 'plank' })).toEqual({ photo: 'plank', group: 'core' });
    expect(exerciseVisual({ kind: 'custom', name: 'Wall sit' })).toBeUndefined();
  });

  it('finds the next train phase after the current one', () => {
    const next = nextTrainPhase(session());
    expect(next?.kind).toBe('train');
    expect(next?.ref).toEqual({ kind: 'catalog', exerciseId: 'push-up' });
    expect(nextTrainPhase(session({ phaseIndex: schedule.length - 1 }))).toBeUndefined();
  });
});

describe('positions and progress', () => {
  it('computes set and round position from the schedule', () => {
    const populatedSets = hiitExample.sets.filter((set) => set.exercises.length > 0);
    const firstTrain = schedule.find((phase) => phase.kind === 'train')!;
    expect(setPosition(schedule, firstTrain)).toEqual({
      set: 1,
      setCount: populatedSets.length,
      loop: 1,
      loopCount: populatedSets[0]!.loops,
    });
    expect(setPosition(schedule, schedule[0]!)).toBeUndefined();
    expect(setsInSchedule(schedule)).toBe(populatedSets.length);
  });

  it('tracks whole-workout progress by elapsed time', () => {
    expect(workoutProgress(session(), T0)).toBe(0);
    expect(workoutProgress(session(), T0 + 45_000)).toBeCloseTo(45_000 / (hiitExample.warmupSeconds * 1000 + rest()), 5);
    expect(workoutProgress(session({ status: 'finished' }), T0)).toBe(1);
  });
});

describe('backPhase', () => {
  it('moves one phase back and restarts its clock', () => {
    const moved = backPhase(session({ phaseIndex: 3, phaseStartedAt: T0, pausedMs: 400 }), T0 + 10_000);
    expect(moved).toMatchObject({ phaseIndex: 2, phaseStartedAt: T0 + 10_000, pausedMs: 0, pausedAt: null });
  });

  it('restarts the first phase instead of going below zero and keeps a pause paused', () => {
    const moved = backPhase(session({ status: 'paused', pausedAt: T0 + 2_000 }), T0 + 5_000);
    expect(moved).toMatchObject({ phaseIndex: 0, status: 'paused', pausedAt: T0 + 5_000, phaseStartedAt: T0 + 5_000 });
    expect(backPhase(session({ status: 'finished' }), T0).status).toBe('finished');
  });
});

function rest(): number {
  return schedule.slice(1).reduce((total, phase) => total + phase.durationMs, 0);
}
