import { describe, expect, it } from 'vitest';
import { hiitExample } from '@/data/hiit-example';
import { translatorFor } from '@/lib/i18n';
import { backPhase, startRun, type RunSession } from '@/lib/run-clock';
import {
  entryState,
  exerciseName,
  exercisePositionInSet,
  exerciseVisual,
  groundKindOf,
  groundTone,
  nextTrainPhase,
  progressRows,
  repetitionsLeft,
  setExercisesOf,
  setPosition,
  setsInSchedule,
  upcomingTrainPhases,
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

describe('progress card rows', () => {
  const firstSet = hiitExample.sets.filter((set) => set.exercises.length > 0)[0]!;
  const firstTrainIndex = schedule.findIndex((phase) => phase.kind === 'train');
  const firstRestIndex = schedule.findIndex((phase) => phase.kind === 'rest');

  it('lists the current set once and marks the active exercise with a ring during train', () => {
    const rows = progressRows(session({ phaseIndex: firstTrainIndex }), 0.4, t);
    expect(rows).toHaveLength(firstSet.exercises.length);
    expect(rows[0]).toMatchObject({ name: 'Push-up', dot: 'train', ringProgress: 0.4, lineProgress: 0, hasLine: true });
    expect(rows[1]?.dot).toBe('todo');
    expect(rows[rows.length - 1]?.hasLine).toBe(false);
  });

  it('fills the dot and animates the line below it during rest', () => {
    const rows = progressRows(session({ phaseIndex: firstRestIndex }), 0.25, t);
    expect(rows[0]).toMatchObject({ dot: 'rest', lineProgress: 0.25 });
    expect(rows[1]).toMatchObject({ dot: 'todo', lineProgress: 0 });
  });

  it('grows the last dot during the rest that follows the last exercise', () => {
    const lastOfLoop = schedule.findIndex(
      (phase) => phase.kind === 'rest' && phase.exerciseIndex === firstSet.exercises.length - 1,
    );
    const rows = progressRows(session({ phaseIndex: lastOfLoop }), 0.5, t);
    expect(rows[rows.length - 1]).toMatchObject({ dot: 'lastRest', ringProgress: 0.5 });
    expect(rows.slice(0, -1).every((row) => row.dot === 'done' && row.lineProgress === 1)).toBe(true);
  });

  it('shows a single warm-up row before the sets and nothing once finished', () => {
    expect(progressRows(session(), 0.1, t)).toEqual([
      { key: 'warmup', name: 'WARM-UP', dot: 'train', ringProgress: 0.1, lineProgress: 0, hasLine: false },
    ]);
    expect(progressRows(session({ status: 'finished' }), 1, t)).toEqual([]);
  });

  it('resolves the exercises of the set a phase belongs to, including set rest', () => {
    const setRest = schedule.find((phase) => phase.kind === 'setRest');
    if (setRest) {
      expect(setExercisesOf(schedule, setRest)).toHaveLength(firstSet.exercises.length);
    }
    expect(setExercisesOf(schedule, schedule[0]!)).toEqual([]);
  });

  it('counts repetitions left and the exercise position in its set', () => {
    const firstTrain = schedule[firstTrainIndex]!;
    expect(repetitionsLeft(schedule, firstTrainIndex)).toBe(firstSet.loops - 1);
    expect(repetitionsLeft(schedule, 0)).toBe(firstSet.loops);
    expect(repetitionsLeft(schedule, schedule.length)).toBe(0);
    expect(exercisePositionInSet(schedule, firstTrain)).toEqual({ current: 1, total: firstSet.exercises.length });
    expect(exercisePositionInSet(schedule, schedule[0]!)).toBeUndefined();
  });

  it('lists up to three upcoming train phases', () => {
    const upcoming = upcomingTrainPhases(session(), 3);
    expect(upcoming).toHaveLength(3);
    expect(upcoming.every((phase) => phase.kind === 'train')).toBe(true);
    expect(upcomingTrainPhases(session({ phaseIndex: schedule.length - 1 }), 3)).toEqual([]);
  });
});

function rest(): number {
  return schedule.slice(1).reduce((total, phase) => total + phase.durationMs, 0);
}
