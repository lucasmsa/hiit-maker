import type { ExerciseRef, HiitSet, HiitWorkout, PlacedExercise } from '@/lib/types';

const SHARE_VERSION = 1;

interface SharePayload {
  v: number;
  workout: HiitWorkout;
}

export function encodeWorkoutShare(workout: HiitWorkout): string {
  const payload: SharePayload = { v: SHARE_VERSION, workout };
  return toBase64Url(JSON.stringify(payload));
}

export function decodeWorkoutShare(fragment: string): HiitWorkout | null {
  const encoded = fragment.startsWith('#') ? fragment.slice(1) : fragment;
  if (!encoded) {
    return null;
  }
  try {
    const parsed: unknown = JSON.parse(fromBase64Url(encoded));
    if (!isRecord(parsed) || parsed.v !== SHARE_VERSION || !isWorkout(parsed.workout)) {
      return null;
    }
    return parsed.workout;
  } catch {
    return null;
  }
}

function toBase64Url(text: string): string {
  const bytes = new TextEncoder().encode(text);
  let binary = '';
  for (const byte of bytes) {
    binary += String.fromCharCode(byte);
  }
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function fromBase64Url(encoded: string): string {
  const padded = encoded.replace(/-/g, '+').replace(/_/g, '/').padEnd(Math.ceil(encoded.length / 4) * 4, '=');
  const binary = atob(padded);
  const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
  return new TextDecoder().decode(bytes);
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function isRef(value: unknown): value is ExerciseRef {
  if (!isRecord(value)) {
    return false;
  }
  if (value.kind === 'catalog') {
    return typeof value.exerciseId === 'string';
  }
  return value.kind === 'custom' && typeof value.name === 'string';
}

function isPlacedExercise(value: unknown): value is PlacedExercise {
  return (
    isRecord(value) &&
    typeof value.id === 'string' &&
    isRef(value.ref) &&
    typeof value.trainSeconds === 'number' &&
    typeof value.restSeconds === 'number'
  );
}

function isSet(value: unknown): value is HiitSet {
  return (
    isRecord(value) &&
    typeof value.id === 'string' &&
    Array.isArray(value.exercises) &&
    value.exercises.every(isPlacedExercise) &&
    typeof value.loops === 'number' &&
    typeof value.setRestSeconds === 'number'
  );
}

function isWorkout(value: unknown): value is HiitWorkout {
  return (
    isRecord(value) &&
    typeof value.id === 'string' &&
    typeof value.name === 'string' &&
    typeof value.warmupSeconds === 'number' &&
    Array.isArray(value.sets) &&
    value.sets.every(isSet) &&
    typeof value.createdAt === 'number' &&
    typeof value.updatedAt === 'number'
  );
}
