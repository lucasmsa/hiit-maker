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

export const frameColor: Record<GroundKind, string> = {
  warmup: 'var(--color-warmup)',
  train: 'var(--color-brand)',
  rest: 'var(--color-go)',
  setRest: 'var(--color-go)',
  done: 'var(--color-go)',
};

export const labelColor: Record<GroundKind, string> = {
  warmup: 'var(--run-warmup-text)',
  train: 'var(--color-brand)',
  rest: 'var(--color-go-deep)',
  setRest: 'var(--color-go-deep)',
  done: 'var(--color-go-deep)',
};

export const phaseLabelKey: Record<GroundKind, I18nKey> = {
  warmup: 'hiit.run.label.warmup',
  train: 'hiit.run.label.train',
  rest: 'hiit.run.label.rest',
  setRest: 'hiit.run.label.setRest',
  done: 'hiit.run.phase.done',
};

export function setExercisesOf(schedule: Phase[], phase: Phase): Phase[] {
  if (phase.setIndex === undefined) {
    return [];
  }
  const loopIndex = phase.loopIndex ?? lastLoopIndex(schedule, phase.setIndex);
  return schedule.filter(
    (entry) => entry.kind === 'train' && entry.setIndex === phase.setIndex && entry.loopIndex === loopIndex,
  );
}

function lastLoopIndex(schedule: Phase[], setIndex: number): number {
  return schedule
    .filter((entry) => entry.setIndex === setIndex)
    .reduce((max, entry) => Math.max(max, entry.loopIndex ?? 0), 0);
}

export type DotState = 'done' | 'train' | 'rest' | 'lastRest' | 'todo';

export interface ProgressRow {
  key: string;
  name: string;
  dot: DotState;
  ringProgress: number;
  lineProgress: number;
  hasLine: boolean;
}

export function progressRows(session: RunSession, progress: number, t: Translate): ProgressRow[] {
  const phase = session.schedule[session.phaseIndex];
  if (!phase || session.status === 'finished') {
    return [];
  }
  if (phase.kind === 'warmup') {
    return [
      {
        key: phase.id,
        name: t('hiit.run.phase.warmup'),
        dot: 'train',
        ringProgress: progress,
        lineProgress: 0,
        hasLine: false,
      },
    ];
  }
  const exercises = setExercisesOf(session.schedule, phase);
  const lastIndex = exercises.length - 1;
  const activeIndex = phase.kind === 'setRest' ? lastIndex : (phase.exerciseIndex ?? 0);

  return exercises.map((exercise, index) => ({
    key: exercise.id,
    name: exerciseName(exercise.ref, t) ?? '',
    dot: dotState(phase.kind, index, activeIndex, lastIndex),
    ringProgress: ringProgress(index, activeIndex, progress),
    lineProgress: lineProgress(phase.kind, index, activeIndex, progress),
    hasLine: index < lastIndex,
  }));
}

function dotState(kind: PhaseKind, index: number, activeIndex: number, lastIndex: number): DotState {
  if (index < activeIndex) {
    return 'done';
  }
  if (index > activeIndex) {
    return 'todo';
  }
  if (kind === 'train') {
    return 'train';
  }
  return index === lastIndex ? 'lastRest' : 'rest';
}

function ringProgress(index: number, activeIndex: number, progress: number): number {
  if (index < activeIndex) {
    return 1;
  }
  return index === activeIndex ? progress : 0;
}

function lineProgress(kind: PhaseKind, index: number, activeIndex: number, progress: number): number {
  if (index < activeIndex) {
    return 1;
  }
  if (index === activeIndex && kind === 'rest') {
    return progress;
  }
  return 0;
}

export function repetitionsLeft(schedule: Phase[], phaseIndex: number): number {
  const phase = schedule[phaseIndex];
  if (!phase) {
    return 0;
  }
  if (phase.loopIndex === undefined) {
    const nextTrain = schedule.slice(phaseIndex + 1).find((entry) => entry.kind === 'train');
    return nextTrain ? (setPosition(schedule, nextTrain)?.loopCount ?? 0) : 0;
  }
  const position = setPosition(schedule, phase);
  return position ? position.loopCount - position.loop : 0;
}

export function upcomingTrainPhases(session: RunSession, count: number): Phase[] {
  return session.schedule
    .slice(session.phaseIndex + 1)
    .filter((entry) => entry.kind === 'train')
    .slice(0, count);
}

export interface ExercisePosition {
  current: number;
  total: number;
}

export function exercisePositionInSet(schedule: Phase[], phase: Phase): ExercisePosition | undefined {
  if (phase.exerciseIndex === undefined) {
    return undefined;
  }
  return { current: phase.exerciseIndex + 1, total: setExercisesOf(schedule, phase).length };
}
