export type Mode = 'hiit' | 'gym';
export type Language = 'en' | 'pt-BR';
export type WeightUnit = 'kg';

export type HiitGroup = 'chest' | 'back' | 'legs' | 'core' | 'shoulders' | 'arms' | 'cardio';

export interface HiitExercise {
  id: string;
  group: HiitGroup;
  photo: string;
}

export type ExerciseRef =
  | { kind: 'catalog'; exerciseId: string }
  | { kind: 'custom'; name: string };

export interface PlacedExercise {
  id: string;
  ref: ExerciseRef;
  trainSeconds: number;
  restSeconds: number;
}

export interface HiitSet {
  id: string;
  exercises: PlacedExercise[];
  loops: number;
  setRestSeconds: number;
}

export interface HiitWorkout {
  id: string;
  name: string;
  warmupSeconds: number;
  sets: HiitSet[];
  createdAt: number;
  updatedAt: number;
}

export type GymMuscleGroup =
  | 'chest'
  | 'back'
  | 'shoulders'
  | 'arms'
  | 'forearms'
  | 'legs'
  | 'glutes'
  | 'calves'
  | 'core'
  | 'rotator-cuff'
  | 'mobility';

export type GymEquipment =
  | 'barbell'
  | 'dumbbell'
  | 'cable'
  | 'machine'
  | 'band'
  | 'bodyweight'
  | 'plate'
  | 'foam-roller';

export interface GymExercise {
  id: string;
  muscleGroup: GymMuscleGroup;
  equipment: GymEquipment[];
}

export interface Range {
  min: number;
  max: number;
}

export type RepScheme =
  | { kind: 'reps'; reps: Range }
  | { kind: 'time'; seconds: Range }
  | { kind: 'unspecified' };

export interface GymPrescription {
  sets?: Range;
  reps: RepScheme;
  tempo?: string;
  perSide: boolean;
  notes?: string;
  optional: boolean;
  restSeconds?: number;
}

export interface GymEntry {
  id: string;
  ref: ExerciseRef;
  prescription: GymPrescription;
}

export interface GymDay {
  id: string;
  name: string;
  notes?: string;
  entries: GymEntry[];
}

export interface GymRoutine {
  id: string;
  name: string;
  restSeconds: number;
  days: GymDay[];
  createdAt: number;
  updatedAt: number;
}

export interface SetLog {
  weightKg?: number;
  reps?: number;
  done: boolean;
  at: number;
}

export interface GymSessionLog {
  id: string;
  routineId: string;
  dayId: string;
  startedAt: number;
  finishedAt?: number;
  entries: Record<string, SetLog[]>;
}

export interface Defaults {
  warmupSeconds: number;
  trainSeconds: number;
  restSeconds: number;
  setRestSeconds: number;
  setRepetitions: number;
}

export interface Settings {
  language: Language;
  unit: WeightUnit;
  muted: boolean;
  defaults: Defaults;
}

export type PhaseKind = 'warmup' | 'train' | 'rest' | 'setRest';

export interface Phase {
  id: string;
  kind: PhaseKind;
  durationMs: number;
  ref?: ExerciseRef;
  placedExerciseId?: string;
  setIndex?: number;
  loopIndex?: number;
  exerciseIndex?: number;
}
