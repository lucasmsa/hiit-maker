import { findHiitExercise, hiitCatalog, hiitGroups } from '@/data/hiit-catalog';
import type { I18nKey } from '@/data/i18n';
import type { Translate } from '@/lib/i18n';
import { workoutTotalSeconds } from '@/lib/schedule';
import { encodeWorkoutShare } from '@/lib/share';
import type { ExerciseRef, HiitExercise, HiitGroup, HiitSet, HiitWorkout } from '@/lib/types';
import { exerciseCount, groupCounts } from '@/lib/workout-edit';

export interface WorkoutSummary {
  setCount: number;
  exerciseCount: number;
  totalSeconds: number;
  groups: HiitGroup[];
}

export function summarizeWorkout(workout: HiitWorkout): WorkoutSummary {
  const counts = groupCounts(workout);
  return {
    setCount: workout.sets.length,
    exerciseCount: exerciseCount(workout),
    totalSeconds: workoutTotalSeconds(workout),
    groups: hiitGroups.filter((group) => (counts[group] ?? 0) > 0),
  };
}

export function exerciseName(ref: ExerciseRef, t: Translate): string {
  if (ref.kind === 'custom') {
    return ref.name;
  }
  return t(`hiit.exercise.${ref.exerciseId}` as I18nKey);
}

export function groupName(group: HiitGroup, t: Translate): string {
  return t(`group.${group}` as I18nKey);
}

export function normalizeText(text: string): string {
  return text
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .trim();
}

export function filterCatalog(query: string, t: Translate): HiitExercise[] {
  const needle = normalizeText(query);
  if (needle === '') {
    return hiitCatalog;
  }
  return hiitCatalog.filter((exercise) => {
    const name = normalizeText(exerciseName({ kind: 'catalog', exerciseId: exercise.id }, t));
    const group = normalizeText(groupName(exercise.group, t));
    return name.includes(needle) || group.includes(needle);
  });
}

export function groupExercises(exercises: HiitExercise[]): Array<{ group: HiitGroup; exercises: HiitExercise[] }> {
  return hiitGroups
    .map((group) => ({ group, exercises: exercises.filter((exercise) => exercise.group === group) }))
    .filter((entry) => entry.exercises.length > 0);
}

export function placedCatalogIds(set: HiitSet | null): Set<string> {
  const ids = new Set<string>();
  for (const placed of set?.exercises ?? []) {
    if (placed.ref.kind === 'catalog') {
      ids.add(placed.ref.exerciseId);
    }
  }
  return ids;
}

export function groupOf(ref: ExerciseRef): HiitGroup | null {
  if (ref.kind !== 'catalog') {
    return null;
  }
  return findHiitExercise(ref.exerciseId)?.group ?? null;
}

export function photoOf(ref: ExerciseRef): string | null {
  if (ref.kind !== 'catalog') {
    return null;
  }
  return findHiitExercise(ref.exerciseId)?.photo ?? null;
}

export function shareUrl(origin: string, workout: HiitWorkout): string {
  return `${origin}/shared#${encodeWorkoutShare(workout)}`;
}
