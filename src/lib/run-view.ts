import type { I18nKey } from '@/data/i18n';
import { findHiitExercise } from '@/data/hiit-catalog';
import type { Translate } from '@/lib/i18n';
import { elapsedTotalMs, scheduleDurationMs, type RunSession } from '@/lib/run-clock';
import type { ExerciseRef, HiitGroup, Phase, PhaseKind } from '@/lib/types';

export type GroundKind = PhaseKind | 'done';
export type GroundTone = 'light' | 'dark';
export type EntryState = 'missing' | 'fresh' | 'live' | 'paused' | 'other' | 'done';

export const phaseWordKey: Record<GroundKind, I18nKey> = {
  warmup: 'hiit.run.phase.warmup',
  train: 'hiit.run.phase.train',
  rest: 'hiit.run.phase.rest',
  setRest: 'hiit.run.phase.rest',
  done: 'hiit.run.phase.done',
};

export const groundColor: Record<GroundKind, string> = {
  warmup: 'var(--color-warmup)',
  train: 'var(--color-brand)',
  rest: 'var(--color-recover)',
  setRest: 'var(--color-recover)',
  done: '#000000',
};

export function groundTone(kind: GroundKind): GroundTone {
  return kind === 'warmup' ? 'dark' : 'light';
}

export function groundKindOf(session: RunSession): GroundKind {
  if (session.status === 'finished') {
    return 'done';
  }
  return session.schedule[session.phaseIndex]?.kind ?? 'done';
}

export function entryState(session: RunSession | null, workoutId: string, workoutExists: boolean): EntryState {
  if (!workoutExists) {
    return 'missing';
  }
  if (!session || session.kind !== 'hiit') {
    return 'fresh';
  }
  if (session.workoutId !== workoutId) {
    return session.status === 'finished' ? 'fresh' : 'other';
  }
  if (session.status === 'finished') {
    return 'done';
  }
  return session.status === 'paused' ? 'paused' : 'live';
}

export function exerciseName(ref: ExerciseRef | undefined, t: Translate): string | undefined {
  if (!ref) {
    return undefined;
  }
  if (ref.kind === 'custom') {
    return ref.name;
  }
  return t(`hiit.exercise.${ref.exerciseId}` as I18nKey);
}

export interface ExerciseVisual {
  photo: string;
  group: HiitGroup;
}

export function exerciseVisual(ref: ExerciseRef | undefined): ExerciseVisual | undefined {
  if (!ref || ref.kind !== 'catalog') {
    return undefined;
  }
  const exercise = findHiitExercise(ref.exerciseId);
  return exercise ? { photo: exercise.photo, group: exercise.group } : undefined;
}

export function nextTrainPhase(session: RunSession): Phase | undefined {
  return session.schedule.slice(session.phaseIndex + 1).find((phase) => phase.kind === 'train');
}

export interface SetPosition {
  set: number;
  setCount: number;
  loop: number;
  loopCount: number;
}

export function setPosition(schedule: Phase[], phase: Phase): SetPosition | undefined {
  if (phase.setIndex === undefined) {
    return undefined;
  }
  const setIndexes = new Set(schedule.map((entry) => entry.setIndex).filter(isDefined));
  const loopIndexes = new Set(
    schedule.filter((entry) => entry.setIndex === phase.setIndex).map((entry) => entry.loopIndex).filter(isDefined),
  );
  return {
    set: phase.setIndex + 1,
    setCount: setIndexes.size,
    loop: (phase.loopIndex ?? 0) + 1,
    loopCount: Math.max(1, loopIndexes.size),
  };
}

export function setsInSchedule(schedule: Phase[]): number {
  return new Set(schedule.map((entry) => entry.setIndex).filter(isDefined)).size;
}

export function workoutProgress(session: RunSession, now: number): number {
  const total = scheduleDurationMs(session.schedule);
  if (total === 0) {
    return 1;
  }
  return Math.min(1, Math.max(0, elapsedTotalMs(session, now) / total));
}

function isDefined<T>(value: T | undefined): value is T {
  return value !== undefined;
}
