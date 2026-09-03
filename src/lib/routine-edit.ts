import { newId } from '@/lib/id';
import type { ExerciseRef, GymDay, GymEntry, GymPrescription, GymRoutine } from '@/lib/types';

export const DEFAULT_ROUTINE_REST_SECONDS = 90;

export function defaultPrescription(): GymPrescription {
  return {
    sets: { min: 3, max: 3 },
    reps: { kind: 'reps', reps: { min: 8, max: 12 } },
    perSide: false,
    optional: false,
  };
}

export function newDay(name: string): GymDay {
  return { id: newId(), name, entries: [] };
}

export function newEntry(ref: ExerciseRef, prescription = defaultPrescription()): GymEntry {
  return { id: newId(), ref, prescription };
}

export function createRoutine(name: string, firstDayName: string, now: number): GymRoutine {
  return {
    id: newId(),
    name,
    restSeconds: DEFAULT_ROUTINE_REST_SECONDS,
    days: [newDay(firstDayName)],
    createdAt: now,
    updatedAt: now,
  };
}

function replaceDay(routine: GymRoutine, dayId: string, update: (day: GymDay) => GymDay): GymRoutine {
  return { ...routine, days: routine.days.map((day) => (day.id === dayId ? update(day) : day)) };
}

export function addDay(routine: GymRoutine, day: GymDay): GymRoutine {
  return { ...routine, days: [...routine.days, day] };
}

export function removeDay(routine: GymRoutine, dayId: string): GymRoutine {
  if (routine.days.length <= 1) {
    return routine;
  }
  return { ...routine, days: routine.days.filter((day) => day.id !== dayId) };
}

export function updateDay(
  routine: GymRoutine,
  dayId: string,
  patch: Partial<Pick<GymDay, 'name' | 'notes'>>,
): GymRoutine {
  return replaceDay(routine, dayId, (day) => ({ ...day, ...patch }));
}

export function moveDay(routine: GymRoutine, dayId: string, toIndex: number): GymRoutine {
  const fromIndex = routine.days.findIndex((day) => day.id === dayId);
  if (fromIndex === -1) {
    return routine;
  }
  const days = [...routine.days];
  const [moving] = days.splice(fromIndex, 1);
  if (!moving) {
    return routine;
  }
  days.splice(clampIndex(toIndex, days.length), 0, moving);
  return { ...routine, days };
}

export function addEntry(routine: GymRoutine, dayId: string, entry: GymEntry): GymRoutine {
  return replaceDay(routine, dayId, (day) => ({ ...day, entries: [...day.entries, entry] }));
}

export function removeEntry(routine: GymRoutine, dayId: string, entryId: string): GymRoutine {
  return replaceDay(routine, dayId, (day) => ({
    ...day,
    entries: day.entries.filter((entry) => entry.id !== entryId),
  }));
}

export function moveEntry(
  routine: GymRoutine,
  dayId: string,
  entryId: string,
  toIndex: number,
): GymRoutine {
  return replaceDay(routine, dayId, (day) => {
    const fromIndex = day.entries.findIndex((entry) => entry.id === entryId);
    if (fromIndex === -1) {
      return day;
    }
    const entries = [...day.entries];
    const [moving] = entries.splice(fromIndex, 1);
    if (!moving) {
      return day;
    }
    entries.splice(clampIndex(toIndex, entries.length), 0, moving);
    return { ...day, entries };
  });
}

export function updateEntry(
  routine: GymRoutine,
  dayId: string,
  entryId: string,
  patch: Partial<GymPrescription>,
): GymRoutine {
  return replaceDay(routine, dayId, (day) => ({
    ...day,
    entries: day.entries.map((entry) =>
      entry.id === entryId ? { ...entry, prescription: { ...entry.prescription, ...patch } } : entry,
    ),
  }));
}

export function updateRoutine(
  routine: GymRoutine,
  patch: Partial<Pick<GymRoutine, 'name' | 'restSeconds'>>,
): GymRoutine {
  return { ...routine, ...patch };
}

export function cloneRoutineWithNewIds(routine: GymRoutine, name: string, now: number): GymRoutine {
  return {
    ...routine,
    id: newId(),
    name,
    createdAt: now,
    updatedAt: now,
    days: routine.days.map((day) => ({
      ...day,
      id: newId(),
      entries: day.entries.map((entry) => ({ ...entry, id: newId() })),
    })),
  };
}

export function entryRestSeconds(routine: GymRoutine, entry: GymEntry): number {
  return entry.prescription.restSeconds ?? routine.restSeconds;
}

function clampIndex(index: number, length: number): number {
  return Math.max(0, Math.min(index, length));
}
