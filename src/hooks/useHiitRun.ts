import { useCallback, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { formatClock } from '@/lib/digits';
import { scheduleDurationMs } from '@/lib/run-clock';
import {
  entryState,
  exerciseName,
  exerciseVisual,
  groundKindOf,
  nextTrainPhase,
  phaseWordKey,
  setPosition,
  setsInSchedule,
  type EntryState,
  type ExerciseVisual,
  type GroundKind,
  type SetPosition,
} from '@/lib/run-view';
import { compileHiitSchedule } from '@/lib/schedule';
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
  workoutName: string;
  otherWorkoutName: string;
  totalClock: string;
  totalRemainingClock: string;
  remainingClock: string;
  setCount: number;
  ground: GroundKind;
  phaseKey: string;
  phaseWord: string;
  exercise: string | undefined;
  upcoming: string | undefined;
  upcomingVisual: ExerciseVisual | undefined;
  position: SetPosition | undefined;
  phaseProgress: number;
  workoutProgress: number;
  isPaused: boolean;
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

  const view: HiitRunView = {
    entry,
    screen,
    workoutName: workout?.name ?? '',
    otherWorkoutName: otherWorkout?.name ?? '',
    totalClock: formatClock(activeDurationMs),
    totalRemainingClock: formatClock(clock.totalRemainingSeconds * 1000),
    remainingClock: formatClock(clock.remainingSeconds * 1000),
    setCount: setsInSchedule(activeSchedule),
    ground,
    phaseKey: session ? `${session.startedAt}:${session.phaseIndex}:${session.status}` : 'none',
    phaseWord: t(phaseWordKey[ground]),
    exercise: exerciseName(phase?.ref, t),
    upcoming: exerciseName(upcomingPhase?.ref, t),
    upcomingVisual: exerciseVisual(upcomingPhase?.ref),
    position: session && phase ? setPosition(session.schedule, phase) : undefined,
    phaseProgress: clock.progress,
    workoutProgress: session ? remainingToProgress(clock.totalRemainingSeconds * 1000, activeDurationMs) : 0,
    isPaused,
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

function remainingToProgress(remainingMs: number, totalMs: number): number {
  if (totalMs === 0) {
    return 1;
  }
  return Math.min(1, Math.max(0, 1 - remainingMs / totalMs));
}
