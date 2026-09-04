import { useEffect, useMemo, useRef, useState } from 'react';
import { createCues, type Cues } from '@/lib/audio';
import {
  currentPhase,
  nextPhase,
  phaseProgress,
  remainingMs,
  totalRemainingMs,
  type RunSession,
} from '@/lib/run-clock';
import type { Phase } from '@/lib/types';
import { useLibraryStore } from '@/stores/library';
import { useRunStore } from '@/stores/run';

const TICK_MS = 250;
const COUNTDOWN_FROM_SECONDS = 3;

export interface RunClock {
  session: RunSession | null;
  phase: Phase | undefined;
  upcoming: Phase | undefined;
  remainingSeconds: number;
  totalRemainingSeconds: number;
  progress: number;
  isRunning: boolean;
  isPaused: boolean;
  isFinished: boolean;
  pause: () => void;
  resume: () => void;
  skip: () => void;
  stop: () => void;
}

let sharedCues: Cues | null = null;

export function runCues(): Cues {
  sharedCues ??= createCues();
  return sharedCues;
}

export function useRunClock(): RunClock {
  const session = useRunStore((state) => state.session);
  const sync = useRunStore((state) => state.sync);
  const pause = useRunStore((state) => state.pause);
  const resume = useRunStore((state) => state.resume);
  const skip = useRunStore((state) => state.skip);
  const stop = useRunStore((state) => state.stop);
  const muted = useLibraryStore((state) => state.settings.muted);

  const [now, setNow] = useState(() => Date.now());
  const lastPhaseIndex = useRef<number | null>(null);
  const lastCountdownSecond = useRef<number | null>(null);

  const isRunning = session?.status === 'running';
  const isPaused = session?.status === 'paused';
  const isFinished = session?.status === 'finished';

  useEffect(() => {
    if (!isRunning) {
      return;
    }
    const tick = () => {
      const current = Date.now();
      setNow(current);
      sync(current);
    };
    tick();
    const id = window.setInterval(tick, TICK_MS);
    return () => window.clearInterval(id);
  }, [isRunning, sync]);

  const remaining = session ? remainingMs(session, now) : 0;
  const remainingSeconds = Math.max(0, Math.ceil(remaining / 1000));

  useEffect(() => {
    if (!session) {
      lastPhaseIndex.current = null;
      lastCountdownSecond.current = null;
      return;
    }
    const cues = runCues();
    const phaseChanged = lastPhaseIndex.current !== null && lastPhaseIndex.current !== session.phaseIndex;
    lastPhaseIndex.current = session.phaseIndex;

    if (muted) {
      return;
    }
    if (session.status === 'finished') {
      if (lastCountdownSecond.current !== -1) {
        lastCountdownSecond.current = -1;
        cues.finish();
      }
      return;
    }
    if (phaseChanged) {
      lastCountdownSecond.current = null;
      cues.chime();
      return;
    }
    const countdownDue =
      session.status === 'running' &&
      remainingSeconds > 0 &&
      remainingSeconds <= COUNTDOWN_FROM_SECONDS &&
      lastCountdownSecond.current !== remainingSeconds;
    if (countdownDue) {
      lastCountdownSecond.current = remainingSeconds;
      cues.tick();
    }
  }, [session, remainingSeconds, muted]);

  return useMemo(
    () => ({
      session,
      phase: session ? currentPhase(session) : undefined,
      upcoming: session ? nextPhase(session) : undefined,
      remainingSeconds,
      totalRemainingSeconds: session ? Math.ceil(totalRemainingMs(session, now) / 1000) : 0,
      progress: session ? phaseProgress(session, now) : 0,
      isRunning,
      isPaused,
      isFinished,
      pause: () => pause(Date.now()),
      resume: () => {
        runCues().unlock();
        resume(Date.now());
      },
      skip: () => skip(Date.now()),
      stop,
    }),
    [session, remainingSeconds, now, isRunning, isPaused, isFinished, pause, resume, skip, stop],
  );
}
