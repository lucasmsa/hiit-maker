export type Language = 'en' | 'pt-BR';

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

export interface Defaults {
  warmupSeconds: number;
  trainSeconds: number;
  restSeconds: number;
  setRestSeconds: number;
  setRepetitions: number;
}

export interface Settings {
  language: Language;
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
