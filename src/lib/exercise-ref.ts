import type { ExerciseRef } from '@/lib/types';

export function refKey(ref: ExerciseRef): string {
  return ref.kind === 'catalog' ? `catalog:${ref.exerciseId}` : `custom:${ref.name.trim().toLowerCase()}`;
}

export function sameRef(a: ExerciseRef, b: ExerciseRef): boolean {
  return refKey(a) === refKey(b);
}
