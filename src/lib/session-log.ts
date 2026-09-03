import { newId } from '@/lib/id';
import { sameRef } from '@/lib/exercise-ref';
import type { ExerciseRef, GymRoutine, GymSessionLog, SetLog } from '@/lib/types';

export function startSessionLog(routineId: string, dayId: string, now: number): GymSessionLog {
  return { id: newId(), routineId, dayId, startedAt: now, entries: {} };
}

export function recordSet(
  log: GymSessionLog,
  entryId: string,
  setIndex: number,
  setLog: SetLog,
): GymSessionLog {
  const sets = [...(log.entries[entryId] ?? [])];
  sets[setIndex] = setLog;
  return { ...log, entries: { ...log.entries, [entryId]: sets } };
}

export function finishSessionLog(log: GymSessionLog, now: number): GymSessionLog {
  return { ...log, finishedAt: now };
}

export function entryIdsFor(routines: GymRoutine[], ref: ExerciseRef): Set<string> {
  const ids = new Set<string>();
  for (const routine of routines) {
    for (const day of routine.days) {
      for (const entry of day.entries) {
        if (sameRef(entry.ref, ref)) {
          ids.add(entry.id);
        }
      }
    }
  }
  return ids;
}

export function lastSetsFor(
  logs: GymSessionLog[],
  routines: GymRoutine[],
  ref: ExerciseRef,
): SetLog[] | undefined {
  const entryIds = entryIdsFor(routines, ref);
  const newestFirst = [...logs].sort((a, b) => b.startedAt - a.startedAt);
  for (const log of newestFirst) {
    for (const entryId of entryIds) {
      const sets = log.entries[entryId];
      if (sets && sets.some((set) => set.done)) {
        return sets;
      }
    }
  }
  return undefined;
}
