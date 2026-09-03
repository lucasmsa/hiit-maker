import { describe, expect, it } from 'vitest';
import {
  advanceDuePhases,
  pauseRun,
  phaseProgress,
  remainingMs,
  resumeRun,
  skipPhase,
  startRun,
  totalRemainingMs,
} from '@/lib/run-clock';
import type { Phase } from '@/lib/types';

const schedule: Phase[] = [
  { id: 'p0', kind: 'warmup', durationMs: 5_000 },
  { id: 'p1', kind: 'train', durationMs: 10_000 },
  { id: 'p2', kind: 'rest', durationMs: 3_000 },
  { id: 'p3', kind: 'train', durationMs: 10_000 },
];

const T0 = 1_700_000_000_000;

describe('run clock', () => {
  it('derives remaining time from wall clock', () => {
    const session = startRun({ kind: 'hiit', schedule }, T0);
    expect(remainingMs(session, T0)).toBe(5_000);
    expect(remainingMs(session, T0 + 1_234)).toBe(3_766);
    expect(phaseProgress(session, T0 + 2_500)).toBe(0.5);
    expect(totalRemainingMs(session, T0 + 1_000)).toBe(27_000);
  });

  it('advances one phase and keeps the overshoot', () => {
    const session = startRun({ kind: 'hiit', schedule }, T0);
    const { session: next, advanced } = advanceDuePhases(session, T0 + 5_400);
    expect(advanced).toBe(1);
    expect(next.phaseIndex).toBe(1);
    expect(remainingMs(next, T0 + 5_400)).toBe(9_600);
  });

  it('catches up across three phases after a suspension', () => {
    const session = startRun({ kind: 'hiit', schedule }, T0);
    const resumedAt = T0 + 5_000 + 10_000 + 3_000 + 2_000;
    const { session: next, advanced } = advanceDuePhases(session, resumedAt);
    expect(advanced).toBe(3);
    expect(next.phaseIndex).toBe(3);
    expect(remainingMs(next, resumedAt)).toBe(8_000);
  });

  it('finishes when the last phase runs out', () => {
    const session = startRun({ kind: 'hiit', schedule }, T0);
    const { session: done } = advanceDuePhases(session, T0 + 60_000);
    expect(done.status).toBe('finished');
    expect(remainingMs(done, T0 + 60_000)).toBe(0);
  });

  it('freezes while paused and resumes without losing time', () => {
    const started = startRun({ kind: 'hiit', schedule }, T0);
    const paused = pauseRun(started, T0 + 2_000);
    expect(remainingMs(paused, T0 + 50_000)).toBe(3_000);
    expect(advanceDuePhases(paused, T0 + 50_000).advanced).toBe(0);

    const resumed = resumeRun(paused, T0 + 50_000);
    expect(remainingMs(resumed, T0 + 50_000)).toBe(3_000);
    expect(remainingMs(resumed, T0 + 51_000)).toBe(2_000);
  });

  it('skips to the next phase and finishes on the last one', () => {
    const started = startRun({ kind: 'hiit', schedule }, T0);
    const skipped = skipPhase(started, T0 + 1_000);
    expect(skipped.phaseIndex).toBe(1);
    expect(remainingMs(skipped, T0 + 1_000)).toBe(10_000);

    const last = { ...skipped, phaseIndex: 3, phaseStartedAt: T0 + 1_000 };
    expect(skipPhase(last, T0 + 2_000).status).toBe('finished');
  });

  it('starts finished on an empty schedule', () => {
    expect(startRun({ kind: 'rest', schedule: [] }, T0).status).toBe('finished');
  });
});
