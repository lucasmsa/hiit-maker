import { newId } from '@/lib/id';
import { findHiitExercise } from '@/data/hiit-catalog';
import type { Defaults, ExerciseRef, HiitWorkout } from '@/lib/types';

export const LEGACY_STORAGE_KEY = 'persist:hiit-maker';

interface LegacyExercise {
  name: string;
  restTime: number;
  trainTime: number;
}

interface LegacyTrainSetLoop {
  loops: number;
  setRestTime: number;
  trainSet: { exercises: LegacyExercise[] };
}

interface LegacyDefaults {
  warmupTime: number;
  exerciseRestTime: number;
  exerciseTrainTime: number;
  setRestTime: number;
  setRepetitions: number;
}

export interface LegacyTraining {
  trainingDefaultValues: LegacyDefaults;
  trainSetLoops: LegacyTrainSetLoop[];
}

export interface LegacyImport {
  workout: HiitWorkout | null;
  defaults: Defaults;
}

const irregularNames: Record<string, string> = {
  'regular push up': 'push-up',
  'pull ups': 'pull-up',
  'wide arms push up': 'wide-push-up',
  'regular squats': 'squat',
  'archer squats': 'archer-squat',
  'pistol squats': 'pistol-squat',
  'jumping squats': 'jump-squat',
  'alternating lunges': 'alternating-lunge',
};

export function parseLegacyRoot(raw: string): LegacyTraining | null {
  try {
    const root: unknown = JSON.parse(raw);
    if (!isRecord(root) || typeof root.training !== 'string') {
      return null;
    }
    const training: unknown = JSON.parse(root.training);
    return isLegacyTraining(training) ? training : null;
  } catch {
    return null;
  }
}

export function legacyNameToRef(name: string): ExerciseRef {
  const normalized = name.trim().toLowerCase();
  const candidate = irregularNames[normalized] ?? slugify(normalized);
  return findHiitExercise(candidate)
    ? { kind: 'catalog', exerciseId: candidate }
    : { kind: 'custom', name: name.trim() };
}

export function convertLegacyTraining(
  training: LegacyTraining,
  importedName: string,
  now: number,
): LegacyImport {
  const legacyDefaults = training.trainingDefaultValues;
  const defaults: Defaults = {
    warmupSeconds: legacyDefaults.warmupTime,
    trainSeconds: legacyDefaults.exerciseTrainTime,
    restSeconds: legacyDefaults.exerciseRestTime,
    setRestSeconds: legacyDefaults.setRestTime,
    setRepetitions: legacyDefaults.setRepetitions,
  };

  const sets = training.trainSetLoops
    .filter((loop) => loop.trainSet.exercises.length > 0)
    .map((loop) => ({
      id: newId(),
      loops: loop.loops,
      setRestSeconds: loop.setRestTime,
      exercises: loop.trainSet.exercises.map((exercise) => ({
        id: newId(),
        ref: legacyNameToRef(exercise.name),
        trainSeconds: exercise.trainTime,
        restSeconds: exercise.restTime,
      })),
    }));

  if (sets.length === 0) {
    return { workout: null, defaults };
  }

  return {
    defaults,
    workout: {
      id: newId(),
      name: importedName,
      warmupSeconds: legacyDefaults.warmupTime,
      sets,
      createdAt: now,
      updatedAt: now,
    },
  };
}

export function readLegacyImport(storage: Storage, importedName: string, now: number): LegacyImport | null {
  const raw = storage.getItem(LEGACY_STORAGE_KEY);
  if (raw === null) {
    return null;
  }
  storage.removeItem(LEGACY_STORAGE_KEY);
  const training = parseLegacyRoot(raw);
  return training ? convertLegacyTraining(training, importedName, now) : null;
}

function slugify(text: string): string {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function isLegacyTraining(value: unknown): value is LegacyTraining {
  if (!isRecord(value) || !isRecord(value.trainingDefaultValues) || !Array.isArray(value.trainSetLoops)) {
    return false;
  }
  const defaults = value.trainingDefaultValues;
  const numericDefaults = [
    defaults.warmupTime,
    defaults.exerciseRestTime,
    defaults.exerciseTrainTime,
    defaults.setRestTime,
    defaults.setRepetitions,
  ].every((entry) => typeof entry === 'number');
  return numericDefaults && value.trainSetLoops.every(isLegacyLoop);
}

function isLegacyLoop(value: unknown): value is LegacyTrainSetLoop {
  return (
    isRecord(value) &&
    typeof value.loops === 'number' &&
    typeof value.setRestTime === 'number' &&
    isRecord(value.trainSet) &&
    Array.isArray(value.trainSet.exercises) &&
    value.trainSet.exercises.every(
      (exercise: unknown) =>
        isRecord(exercise) &&
        typeof exercise.name === 'string' &&
        typeof exercise.restTime === 'number' &&
        typeof exercise.trainTime === 'number',
    )
  );
}
