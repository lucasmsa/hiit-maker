import { useCallback, useEffect, useMemo, useState } from 'react';
import { runCues, useRunClock } from '@/hooks/useRunClock';
import { useWakeLock } from '@/hooks/useWakeLock';
import { doneSets, plannedSetCount, sessionDurationMs, sessionVolumeKg } from '@/lib/gym-format';
import { parseNumberInput } from '@/lib/number';
import { entryRestSeconds } from '@/lib/routine-edit';
import { compileRestSchedule } from '@/lib/schedule';
import { lastSetsFor } from '@/lib/session-log';
import type { GymEntry, GymSessionLog, SetLog } from '@/lib/types';
import { useGymSessionStore } from '@/stores/gym-session';
import { useLibraryStore } from '@/stores/library';
import { useRunStore } from '@/stores/run';

export type SessionStage = 'pickDay' | 'session' | 'summary';

export interface SetInput {
  weight: string;
  reps: string;
}

export interface SetRow {
  index: number;
  input: SetInput;
  previous: SetLog | undefined;
  done: boolean;
}

export interface SessionSummaryData {
  setsDone: number;
  volumeKg: number;
  durationMs: number;
}

const REST_DISMISS_MS = 1500;

function inputKey(entryId: string, index: number): string {
  return `${entryId}:${index}`;
}

function asInputValue(value: number | undefined): string {
  return value === undefined ? '' : String(value);
}

function parseOptional(raw: string): number | undefined {
  if (raw.trim() === '') {
    return undefined;
  }
  const parsed = parseNumberInput(raw, Number.NaN);
  return Number.isNaN(parsed) ? undefined : parsed;
}

export function useGymSession(routineId: string) {
  const active = useGymSessionStore((state) => state.active);
  const begin = useGymSessionStore((state) => state.begin);
  const end = useGymSessionStore((state) => state.end);
  const routine = useLibraryStore((state) => state.routines.find((item) => item.id === routineId));
  const routines = useLibraryStore((state) => state.routines);
  const logs = useLibraryStore((state) => state.logs);
  const startSession = useLibraryStore((state) => state.startSession);
  const logSet = useLibraryStore((state) => state.logSet);
  const finishSession = useLibraryStore((state) => state.finishSession);
  const startRun = useRunStore((state) => state.start);
  const clock = useRunClock();

  const [summaryLogId, setSummaryLogId] = useState<string | null>(null);
  const [confirmingFinish, setConfirmingFinish] = useState(false);
  const [inputs, setInputs] = useState<Record<string, SetInput>>({});
  const [extraSets, setExtraSets] = useState<Record<string, number>>({});

  const log = useMemo<GymSessionLog | undefined>(() => {
    if (!active || active.routineId !== routineId) {
      return undefined;
    }
    return logs.find((item) => item.id === active.logId);
  }, [active, routineId, logs]);

  const day = routine?.days.find((item) => item.id === active?.dayId);
  const summaryLog = summaryLogId ? logs.find((item) => item.id === summaryLogId) : undefined;

  const stage: SessionStage = summaryLog
    ? 'summary'
    : log && !log.finishedAt && day
      ? 'session'
      : 'pickDay';

  useWakeLock(stage === 'session');

  const restSession = clock.session?.kind === 'rest' ? clock.session : null;
  const restVisible = restSession !== null;

  useEffect(() => {
    if (!restSession || restSession.status !== 'finished') {
      return;
    }
    const id = window.setTimeout(clock.stop, REST_DISMISS_MS);
    return () => window.clearTimeout(id);
  }, [restSession, clock.stop]);

  const pickDay = useCallback(
    (dayId: string) => {
      if (!routine) {
        return;
      }
      const logId = startSession(routine.id, dayId);
      begin({ logId, routineId: routine.id, dayId });
      setInputs({});
      setExtraSets({});
    },
    [routine, startSession, begin],
  );

  const previousSets = useCallback(
    (entry: GymEntry) => {
      const finished = logs.filter((item) => item.id !== log?.id && item.finishedAt !== undefined);
      return lastSetsFor(finished, routines, entry.ref);
    },
    [logs, log, routines],
  );

  const rowsFor = useCallback(
    (entry: GymEntry): SetRow[] => {
      const previous = previousSets(entry);
      const count = plannedSetCount(entry.prescription) + (extraSets[entry.id] ?? 0);
      return Array.from({ length: count }, (_, index) => {
        const logged = log?.entries[entry.id]?.[index];
        const prior = previous?.[index];
        const input = inputs[inputKey(entry.id, index)] ?? {
          weight: asInputValue(logged?.weightKg ?? prior?.weightKg),
          reps: asInputValue(logged?.reps ?? prior?.reps),
        };
        return { index, input, previous: prior, done: logged?.done ?? false };
      });
    },
    [previousSets, extraSets, log, inputs],
  );

  const setInput = useCallback(
    (entryId: string, row: SetRow, field: keyof SetInput, value: string) => {
      setInputs((current) => ({
        ...current,
        [inputKey(entryId, row.index)]: { ...row.input, [field]: value },
      }));
    },
    [],
  );

  const writeSet = useCallback(
    (entry: GymEntry, row: SetRow, done: boolean) => {
      if (!log) {
        return;
      }
      const weightKg = parseOptional(row.input.weight);
      const reps = parseOptional(row.input.reps);
      const setLog: SetLog = {
        done,
        at: Date.now(),
        ...(weightKg === undefined ? {} : { weightKg }),
        ...(reps === undefined ? {} : { reps }),
      };
      setInputs((current) => ({
        ...current,
        [inputKey(entry.id, row.index)]: {
          weight: asInputValue(weightKg),
          reps: asInputValue(reps),
        },
      }));
      logSet(log.id, entry.id, row.index, setLog);
    },
    [log, logSet],
  );

  const markDone = useCallback(
    (entry: GymEntry, row: SetRow) => {
      if (!routine) {
        return;
      }
      writeSet(entry, row, true);
      const rest = entryRestSeconds(routine, entry);
      if (rest > 0) {
        runCues().unlock();
        startRun({ kind: 'rest', schedule: compileRestSchedule(rest) });
      }
    },
    [routine, writeSet, startRun],
  );

  const undoDone = useCallback(
    (entry: GymEntry, row: SetRow) => writeSet(entry, row, false),
    [writeSet],
  );

  const addSet = useCallback((entryId: string) => {
    setExtraSets((current) => ({ ...current, [entryId]: (current[entryId] ?? 0) + 1 }));
  }, []);

  const requestFinish = useCallback(() => setConfirmingFinish(true), []);
  const cancelFinish = useCallback(() => setConfirmingFinish(false), []);

  const confirmFinish = useCallback(() => {
    if (log) {
      finishSession(log.id);
      setSummaryLogId(log.id);
    }
    clock.stop();
    end();
    setConfirmingFinish(false);
  }, [log, finishSession, clock, end]);

  const leaveSummary = useCallback(() => setSummaryLogId(null), []);

  const summary = useMemo<SessionSummaryData | null>(() => {
    if (!summaryLog) {
      return null;
    }
    return {
      setsDone: doneSets(summaryLog).length,
      volumeKg: sessionVolumeKg(summaryLog),
      durationMs: sessionDurationMs(summaryLog, summaryLog.finishedAt ?? summaryLog.startedAt),
    };
  }, [summaryLog]);

  const doneCount = log ? doneSets(log).length : 0;

  return {
    routine,
    day,
    stage,
    log,
    doneCount,
    rowsFor,
    setInput,
    markDone,
    undoDone,
    addSet,
    pickDay,
    confirmingFinish,
    requestFinish,
    cancelFinish,
    confirmFinish,
    summary,
    leaveSummary,
    rest: {
      visible: restVisible,
      remainingSeconds: clock.remainingSeconds,
      progress: clock.progress,
      finished: restSession?.status === 'finished',
      skip: clock.stop,
    },
  };
}

export type GymSession = ReturnType<typeof useGymSession>;
