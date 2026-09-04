import type { HiitWorkout } from '@/lib/types';

export function pickCurrentWorkoutId(workouts: HiitWorkout[], lastWorkoutId: string | null): string | null {
  if (lastWorkoutId && workouts.some((workout) => workout.id === lastWorkoutId)) {
    return lastWorkoutId;
  }
  return workouts[0]?.id ?? null;
}
