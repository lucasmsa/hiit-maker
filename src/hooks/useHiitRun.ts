import { useCallback, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import type { FrameArt } from '@/components/run/RunFrame';
import type { UpcomingItem } from '@/components/run/RunSideBar';
import { formatClock } from '@/lib/digits';
import type { Translate } from '@/lib/i18n';
import { scheduleDurationMs, type RunSession } from '@/lib/run-clock';
import {
  entryState,
  exerciseName,
  exercisePositionInSet,
  exerciseVisual,
  frameColor,
  groundKindOf,
  labelColor,
  nextTrainPhase,
  phaseLabelKey,
  progressRows,
  repetitionsLeft,
  setPosition,
  setsInSchedule,
  upcomingTrainPhases,
  type EntryState,
  type GroundKind,
  type ProgressRow,
  type SetPosition,
} from '@/lib/run-view';
import { compileHiitSchedule } from '@/lib/schedule';
import type { Phase } from '@/lib/types';
import { useLibraryStore } from '@/stores/library';
import { useRunStore } from '@/stores/run';
import { runCues, useRunClock } from '@/hooks/useRunClock';
import { useSpaceToggle } from '@/hooks/useSpaceToggle';
import { useT } from '@/hooks/useT';
import { useWakeLock } from '@/hooks/useWakeLock';

export type RunScreen = 'missing' | 'start' | 'resume' | 'other' | 'done' | 'live';

export interface HiitRunView {
  entry: EntryState;
  screen: RunScreen;
  workoutId: string;
  workoutName: string;
  otherWorkoutName: string;
  totalClock: string;
  totalRemainingClock: string;
  remainingClock: string;
  setCount: number;
  ground: GroundKind;
  chipSet: string | undefined;
  chipPhase: string;
  label: string;
  labelColor: string;
  frameColor: string;
  frameArt: FrameArt;
  nextText: string | undefined;
  rows: ProgressRow[];
  upcoming: UpcomingItem[];
  repsText: string;
  position: SetPosition | undefined;
  isPaused: boolean;
  isLive: boolean;
  muted: boolean;
  stopOpen: boolean;
  exitOpen: boolean;
}

export interface HiitRunActions {
  start: () => void;
  togglePause: () => void;
  skip: () => void;
  back: () => void;
  setMuted: (muted: boolean) => void;
  requestStop: () => void;
  cancelStop: () => void;
  confirmStop: () => void;
  requestExit: () => void;
  cancelExit: () => void;
  confirmExit: () => void;
  resumeOther: () => void;
  goToWorkout: () => void;
  goToLibrary: () => void;
}

export function useHiitRun(): { view: HiitRunView; actions: HiitRunActions } {
  const { id = '' } = useParams();
  const navigate = useNavigate();
  const t = useT();
  const workout = useLibraryStore((state) => state.workouts.find((entry) => entry.id === id));
  const workouts = useLibraryStore((state) => state.workouts);
  const muted = useLibraryStore((state) => state.settings.muted);
  const updateSettings = useLibraryStore((state) => state.updateSettings);
  const startRun = useRunStore((state) => state.start);
  const backRun = useRunStore((state) => state.back);
  const clock = useRunClock();
  const [stopOpen, setStopOpen] = useState(false);
  const [exitOpen, setExitOpen] = useState(false);
  const [entered, setEntered] = useState(false);

  const session = clock.session;
  const entry = entryState(session, id, workout !== undefined);
  const isLive = entry === 'live';
  const isPaused = entry === 'paused';
  const screen = screenFor(entry, entered);

  useWakeLock(isLive);

  const start = useCallback(() => {
    if (!workout) {
      return;
    }
    runCues().unlock();
    setEntered(true);
    startRun({ kind: 'hiit', schedule: compileHiitSchedule(workout), workoutId: workout.id });
  }, [workout, startRun]);

  const togglePause = useCallback(() => {
    setEntered(true);
    if (isLive) {
      clock.pause();
    } else if (isPaused) {
      clock.resume();
    }
  }, [isLive, isPaused, clock]);

  useSpaceToggle(isLive || isPaused, togglePause);

  const goToWorkout = useCallback(() => navigate(`/hiit/${id}`), [navigate, id]);
  const goToLibrary = useCallback(() => navigate('/hiit'), [navigate]);

  const actions = useMemo<HiitRunActions>(
    () => ({
      start,
      togglePause,
      skip: () => {
        runCues().unlock();
        clock.skip();
      },
      back: () => backRun(Date.now()),
      setMuted: (next) => updateSettings({ muted: next }),
      requestStop: () => setStopOpen(true),
      cancelStop: () => setStopOpen(false),
      confirmStop: () => {
        setStopOpen(false);
        clock.stop();
        goToWorkout();
      },
      requestExit: () => {
        if (isLive || isPaused) {
          setExitOpen(true);
        } else {
          goToWorkout();
        }
      },
      cancelExit: () => setExitOpen(false),
      confirmExit: () => {
        setExitOpen(false);
        clock.pause();
        goToWorkout();
      },
      resumeOther: () => {
        if (session?.workoutId) {
          navigate(`/hiit/${session.workoutId}/run`);
        }
      },
      goToWorkout,
      goToLibrary,
    }),
    [start, togglePause, clock, backRun, updateSettings, isLive, isPaused, goToWorkout, goToLibrary, session, navigate],
  );

  const schedule = useMemo(() => (workout ? compileHiitSchedule(workout) : []), [workout]);
  const ground = session ? groundKindOf(session) : 'done';
  const phase = clock.phase;
  const upcomingPhase = session ? nextTrainPhase(session) : undefined;
  const otherWorkout = session?.workoutId ? workouts.find((entry) => entry.id === session.workoutId) : undefined;

  const activeSchedule = session && entry !== 'fresh' ? session.schedule : schedule;
  const activeDurationMs = scheduleDurationMs(activeSchedule);
  const position = session && phase ? setPosition(session.schedule, phase) : undefined;
  const currentName = exerciseName(phase?.ref, t);
  const upcomingName = exerciseName(upcomingPhase?.ref, t);

  const view: HiitRunView = {
    entry,
    screen,
    workoutId: id,
    workoutName: workout?.name ?? '',
    otherWorkoutName: otherWorkout?.name ?? '',
    totalClock: formatClock(activeDurationMs),
    totalRemainingClock: formatClock(clock.totalRemainingSeconds * 1000),
    remainingClock: formatClock(clock.remainingSeconds * 1000),
    setCount: setsInSchedule(activeSchedule),
    ground,
    chipSet: position ? t('hiit.run.chip.set', { current: position.set, total: position.setCount }) : undefined,
    chipPhase: chipPhaseText(ground, session, phase, currentName, t),
    label: t(phaseLabelKey[ground]),
    labelColor: labelColor[ground],
    frameColor: frameColor[ground],
    frameArt: frameArtFor(ground, phase, currentName, upcomingPhase, upcomingName),
    nextText: isRest(ground) && upcomingName ? `${t('run.next')}: ${upcomingName}` : undefined,
    rows: session ? progressRows(session, clock.progress, t) : [],
    upcoming: session ? upcomingItems(session, t) : [],
    repsText: session ? repsText(session, t) : '',
    position,
    isPaused,
    isLive,
    muted,
    stopOpen,
    exitOpen,
  };

  return { view, actions };
}

function screenFor(entry: EntryState, entered: boolean): RunScreen {
  switch (entry) {
    case 'fresh':
      return 'start';
    case 'live':
      return 'live';
    case 'paused':
      return entered ? 'live' : 'resume';
    default:
      return entry;
  }
}

function isRest(ground: GroundKind): boolean {
  return ground === 'rest' || ground === 'setRest';
}

function chipPhaseText(
  ground: GroundKind,
  session: RunSession | null,
  phase: Phase | undefined,
  currentName: string | undefined,
  t: Translate,
): string {
  switch (ground) {
    case 'train': {
      const inSet = session && phase ? exercisePositionInSet(session.schedule, phase) : undefined;
      if (!inSet) {
        return currentName ?? '';
      }
      return t('hiit.run.chip.exercise', { current: inSet.current, total: inSet.total, name: currentName ?? '' });
    }
    case 'rest':
      return t('hiit.run.chip.rest');
    case 'setRest':
      return t('hiit.run.chip.setRest');
    case 'warmup':
      return t('hiit.run.phase.warmup');
    default:
      return t('hiit.run.phase.done');
  }
}

function frameArtFor(
  ground: GroundKind,
  phase: Phase | undefined,
  currentName: string | undefined,
  upcomingPhase: Phase | undefined,
  upcomingName: string | undefined,
): FrameArt {
  switch (ground) {
    case 'warmup':
      return { kind: 'warmup' };
    case 'train':
      return photoOrText(exerciseVisual(phase?.ref)?.photo, currentName ?? '');
    case 'rest':
    case 'setRest':
      return photoOrText(exerciseVisual(upcomingPhase?.ref)?.photo, upcomingName ?? '');
    default:
      return { kind: 'done' };
  }
}

function photoOrText(photo: string | undefined, text: string): FrameArt {
  return photo ? { kind: 'photo', photo, alt: text } : { kind: 'text', text };
}

function upcomingItems(session: RunSession, t: Translate): UpcomingItem[] {
  return upcomingTrainPhases(session, 3).map((entry) => ({
    key: entry.id,
    name: exerciseName(entry.ref, t) ?? '',
    visual: exerciseVisual(entry.ref),
  }));
}

function repsText(session: RunSession, t: Translate): string {
  const left = repetitionsLeft(session.schedule, session.phaseIndex);
  if (left === 0) {
    return t('hiit.run.repsLeft.last');
  }
  if (left === 1) {
    return t('hiit.run.repsLeft.one');
  }
  return t('hiit.run.repsLeft.many', { count: left });
}
