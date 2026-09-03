import type { Phase } from '@/lib/types';

export type RunKind = 'hiit' | 'rest';
export type RunStatus = 'running' | 'paused' | 'finished';

export interface RunSession {
  kind: RunKind;
  workoutId?: string;
  schedule: Phase[];
  phaseIndex: number;
  phaseStartedAt: number;
  pausedAt: number | null;
  pausedMs: number;
  status: RunStatus;
  startedAt: number;
}

export interface StartRunInput {
  kind: RunKind;
  schedule: Phase[];
  workoutId?: string;
}

export function startRun(input: StartRunInput, now: number): RunSession {
  const session: RunSession = {
    kind: input.kind,
    schedule: input.schedule,
    phaseIndex: 0,
    phaseStartedAt: now,
    pausedAt: null,
    pausedMs: 0,
    status: input.schedule.length === 0 ? 'finished' : 'running',
    startedAt: now,
  };
  return input.workoutId === undefined ? session : { ...session, workoutId: input.workoutId };
}

export function currentPhase(session: RunSession): Phase | undefined {
  return session.schedule[session.phaseIndex];
}

export function nextPhase(session: RunSession): Phase | undefined {
  return session.schedule[session.phaseIndex + 1];
}

export function elapsedInPhaseMs(session: RunSession, now: number): number {
  const reference = session.pausedAt ?? now;
  return Math.max(0, reference - session.phaseStartedAt - session.pausedMs);
}

export function remainingMs(session: RunSession, now: number): number {
  const phase = currentPhase(session);
  if (!phase || session.status === 'finished') {
    return 0;
  }
  return phase.durationMs - elapsedInPhaseMs(session, now);
}

export function phaseProgress(session: RunSession, now: number): number {
  const phase = currentPhase(session);
  if (!phase || phase.durationMs === 0) {
    return 1;
  }
  return Math.min(1, Math.max(0, elapsedInPhaseMs(session, now) / phase.durationMs));
}

export interface AdvanceResult {
  session: RunSession;
  advanced: number;
}

export function advanceDuePhases(session: RunSession, now: number): AdvanceResult {
  if (session.status !== 'running') {
    return { session, advanced: 0 };
  }
  let current = session;
  let advanced = 0;
  while (current.status === 'running') {
    const remaining = remainingMs(current, now);
    if (remaining > 0) {
      break;
    }
    const overshoot = -remaining;
    const isLast = current.phaseIndex >= current.schedule.length - 1;
    advanced += 1;
    if (isLast) {
      current = { ...current, status: 'finished', pausedMs: 0 };
      break;
    }
    current = {
      ...current,
      phaseIndex: current.phaseIndex + 1,
      phaseStartedAt: now - overshoot,
      pausedMs: 0,
    };
  }
  return { session: current, advanced };
}

export function pauseRun(session: RunSession, now: number): RunSession {
  if (session.status !== 'running') {
    return session;
  }
  return { ...session, status: 'paused', pausedAt: now };
}

export function resumeRun(session: RunSession, now: number): RunSession {
  if (session.status !== 'paused' || session.pausedAt === null) {
    return session;
  }
  return {
    ...session,
    status: 'running',
    pausedAt: null,
    pausedMs: session.pausedMs + (now - session.pausedAt),
  };
}

export function skipPhase(session: RunSession, now: number): RunSession {
  if (session.status === 'finished') {
    return session;
  }
  const isLast = session.phaseIndex >= session.schedule.length - 1;
  if (isLast) {
    return { ...session, status: 'finished', pausedAt: null, pausedMs: 0 };
  }
  return {
    ...session,
    phaseIndex: session.phaseIndex + 1,
    phaseStartedAt: now,
    pausedAt: session.status === 'paused' ? now : null,
    pausedMs: 0,
  };
}

export function totalRemainingMs(session: RunSession, now: number): number {
  const rest = session.schedule
    .slice(session.phaseIndex + 1)
    .reduce((total, phase) => total + phase.durationMs, 0);
  return remainingMs(session, now) + rest;
}

export function backPhase(session: RunSession, now: number): RunSession {
  if (session.status === 'finished') {
    return session;
  }
  return {
    ...session,
    phaseIndex: Math.max(0, session.phaseIndex - 1),
    phaseStartedAt: now,
    pausedAt: session.status === 'paused' ? now : null,
    pausedMs: 0,
  };
}

export function scheduleDurationMs(schedule: Phase[]): number {
  return schedule.reduce((total, phase) => total + phase.durationMs, 0);
}

export function elapsedTotalMs(session: RunSession, now: number): number {
  if (session.status === 'finished') {
    return scheduleDurationMs(session.schedule);
  }
  const before = scheduleDurationMs(session.schedule.slice(0, session.phaseIndex));
  return before + elapsedInPhaseMs(session, now);
}
