import { newId } from '@/lib/id';
import type { Defaults, ExerciseRef, HiitGroup, HiitSet, HiitWorkout, PlacedExercise } from '@/lib/types';
import { findHiitExercise } from '@/data/hiit-catalog';

export function newPlacedExercise(ref: ExerciseRef, defaults: Defaults): PlacedExercise {
  return {
    id: newId(),
    ref,
    trainSeconds: defaults.trainSeconds,
    restSeconds: defaults.restSeconds,
  };
}

export function newSet(defaults: Defaults): HiitSet {
  return {
    id: newId(),
    exercises: [],
    loops: defaults.setRepetitions,
    setRestSeconds: defaults.setRestSeconds,
  };
}

export function createWorkout(name: string, defaults: Defaults, now: number): HiitWorkout {
  return {
    id: newId(),
    name,
    warmupSeconds: defaults.warmupSeconds,
    sets: [newSet(defaults)],
    createdAt: now,
    updatedAt: now,
  };
}

function replaceSet(workout: HiitWorkout, setId: string, update: (set: HiitSet) => HiitSet): HiitWorkout {
  return {
    ...workout,
    sets: workout.sets.map((set) => (set.id === setId ? update(set) : set)),
  };
}

export function addExercise(workout: HiitWorkout, setId: string, placed: PlacedExercise): HiitWorkout {
  return replaceSet(workout, setId, (set) => ({ ...set, exercises: [...set.exercises, placed] }));
}

export function removeExercise(workout: HiitWorkout, setId: string, placedId: string): HiitWorkout {
  return replaceSet(workout, setId, (set) => ({
    ...set,
    exercises: set.exercises.filter((exercise) => exercise.id !== placedId),
  }));
}

export function updateExercise(
  workout: HiitWorkout,
  setId: string,
  placedId: string,
  patch: Partial<Pick<PlacedExercise, 'trainSeconds' | 'restSeconds'>>,
): HiitWorkout {
  return replaceSet(workout, setId, (set) => ({
    ...set,
    exercises: set.exercises.map((exercise) =>
      exercise.id === placedId ? { ...exercise, ...patch } : exercise,
    ),
  }));
}

export interface ExerciseLocation {
  setId: string;
  placedId: string;
}

export interface ExerciseTarget {
  setId: string;
  index: number;
}

export function moveExercise(
  workout: HiitWorkout,
  from: ExerciseLocation,
  to: ExerciseTarget,
): HiitWorkout {
  const sourceSet = workout.sets.find((set) => set.id === from.setId);
  const moving = sourceSet?.exercises.find((exercise) => exercise.id === from.placedId);
  if (!sourceSet || !moving) {
    return workout;
  }
  const withoutMoving = removeExercise(workout, from.setId, from.placedId);
  return replaceSet(withoutMoving, to.setId, (set) => {
    const exercises = [...set.exercises];
    const index = clampIndex(to.index, exercises.length);
    exercises.splice(index, 0, moving);
    return { ...set, exercises };
  });
}

export function addSet(workout: HiitWorkout, defaults: Defaults): HiitWorkout {
  return { ...workout, sets: [...workout.sets, newSet(defaults)] };
}

export function removeSet(workout: HiitWorkout, setId: string): HiitWorkout {
  if (workout.sets.length <= 1) {
    return workout;
  }
  return { ...workout, sets: workout.sets.filter((set) => set.id !== setId) };
}

export function moveSet(workout: HiitWorkout, setId: string, toIndex: number): HiitWorkout {
  const fromIndex = workout.sets.findIndex((set) => set.id === setId);
  if (fromIndex === -1) {
    return workout;
  }
  const sets = [...workout.sets];
  const [moving] = sets.splice(fromIndex, 1);
  if (!moving) {
    return workout;
  }
  sets.splice(clampIndex(toIndex, sets.length), 0, moving);
  return { ...workout, sets };
}

export function updateSet(
  workout: HiitWorkout,
  setId: string,
  patch: Partial<Pick<HiitSet, 'loops' | 'setRestSeconds'>>,
): HiitWorkout {
  return replaceSet(workout, setId, (set) => ({ ...set, ...patch }));
}

export function updateWorkout(
  workout: HiitWorkout,
  patch: Partial<Pick<HiitWorkout, 'name' | 'warmupSeconds'>>,
): HiitWorkout {
  return { ...workout, ...patch };
}

export function cloneWorkoutWithNewIds(workout: HiitWorkout, name: string, now: number): HiitWorkout {
  return {
    ...workout,
    id: newId(),
    name,
    createdAt: now,
    updatedAt: now,
    sets: workout.sets.map((set) => ({
      ...set,
      id: newId(),
      exercises: set.exercises.map((exercise) => ({ ...exercise, id: newId() })),
    })),
  };
}

export function exerciseCount(workout: HiitWorkout): number {
  return workout.sets.reduce((total, set) => total + set.exercises.length, 0);
}

export function groupCounts(workout: HiitWorkout): Partial<Record<HiitGroup, number>> {
  const counts: Partial<Record<HiitGroup, number>> = {};
  for (const set of workout.sets) {
    for (const placed of set.exercises) {
      if (placed.ref.kind !== 'catalog') {
        continue;
      }
      const group = findHiitExercise(placed.ref.exerciseId)?.group;
      if (group) {
        counts[group] = (counts[group] ?? 0) + 1;
      }
    }
  }
  return counts;
}

function clampIndex(index: number, length: number): number {
  return Math.max(0, Math.min(index, length));
}

export function reorderExercises(workout: HiitWorkout, setId: string, orderedIds: string[]): HiitWorkout {
  return replaceSet(workout, setId, (set) => {
    const byId = new Map(set.exercises.map((exercise) => [exercise.id, exercise]));
    const ordered = orderedIds.flatMap((id) => {
      const exercise = byId.get(id);
      if (!exercise) {
        return [];
      }
      byId.delete(id);
      return [exercise];
    });
    return { ...set, exercises: [...ordered, ...byId.values()] };
  });
}
