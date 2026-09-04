import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { hiitExample } from '@/data/hiit-example';
import { detectLanguage } from '@/lib/i18n';
import type { LegacyImport } from '@/lib/legacy-migration';
import { decodeWorkoutShare } from '@/lib/share';
import type {
  Defaults,
  ExerciseRef,
  HiitSet,
  HiitWorkout,
  PlacedExercise,
  Settings,
} from '@/lib/types';
import * as workoutEdit from '@/lib/workout-edit';

export const LIBRARY_STORAGE_KEY = 'hiit-maker/library';
export const LIBRARY_STORAGE_VERSION = 2;

export const initialDefaults: Defaults = {
  warmupSeconds: 90,
  trainSeconds: 30,
  restSeconds: 15,
  setRestSeconds: 60,
  setRepetitions: 3,
};

export function initialSettings(navigatorLanguage?: string): Settings {
  return {
    language: detectLanguage(navigatorLanguage),
    muted: false,
    defaults: { ...initialDefaults },
  };
}

export interface LibraryState {
  workouts: HiitWorkout[];
  settings: Settings;
  lastWorkoutId: string | null;
}

export interface LibraryActions {
  createWorkout(name: string): string;
  renameWorkout(id: string, name: string): void;
  deleteWorkout(id: string): void;
  duplicateWorkout(id: string, name: string): string | null;
  updateWorkout(id: string, patch: Partial<Pick<HiitWorkout, 'warmupSeconds'>>): void;
  addExercise(workoutId: string, setId: string, ref: ExerciseRef): void;
  removeExercise(workoutId: string, setId: string, placedId: string): void;
  moveExercise(
    workoutId: string,
    from: workoutEdit.ExerciseLocation,
    to: workoutEdit.ExerciseTarget,
  ): void;
  updateExercise(
    workoutId: string,
    setId: string,
    placedId: string,
    patch: Partial<Pick<PlacedExercise, 'trainSeconds' | 'restSeconds'>>,
  ): void;
  reorderExercises(workoutId: string, setId: string, orderedIds: string[]): void;
  addSet(workoutId: string): void;
  removeSet(workoutId: string, setId: string): void;
  moveSet(workoutId: string, setId: string, toIndex: number): void;
  updateSet(
    workoutId: string,
    setId: string,
    patch: Partial<Pick<HiitSet, 'loops' | 'setRestSeconds'>>,
  ): void;
  importFromShareHash(fragment: string): string | null;
  importLegacy(result: LegacyImport): void;

  updateSettings(
    patch: Partial<Omit<Settings, 'defaults'>> & { defaults?: Partial<Defaults> },
  ): void;
  resetSettings(): void;
  setLastWorkoutId(id: string | null): void;
  clearSet(workoutId: string, setId: string): void;
}

export type LibraryStore = LibraryState & LibraryActions;

export function initialLibraryState(navigatorLanguage?: string): LibraryState {
  return {
    workouts: [hiitExample],
    settings: initialSettings(navigatorLanguage),
    lastWorkoutId: null,
  };
}

const navigatorLanguage = typeof navigator === 'undefined' ? undefined : navigator.language;

export function dropGymState(persisted: unknown): LibraryState {
  const state = (persisted ?? {}) as Partial<LibraryState> & { settings?: Partial<Settings> };
  const settings: Partial<Settings> = state.settings ?? {};
  return {
    workouts: state.workouts ?? [],
    settings: {
      language: settings.language ?? detectLanguage(navigatorLanguage),
      muted: settings.muted ?? false,
      defaults: { ...initialDefaults, ...settings.defaults },
    },
    lastWorkoutId: state.lastWorkoutId ?? null,
  };
}

export const useLibraryStore = create<LibraryStore>()(
  persist(
    (set, get) => {
      const now = () => Date.now();

      const editWorkout = (id: string, edit: (workout: HiitWorkout) => HiitWorkout) => {
        set((state) => ({
          workouts: state.workouts.map((workout) =>
            workout.id === id ? { ...edit(workout), updatedAt: now() } : workout,
          ),
        }));
      };

      const addWorkout = (workout: HiitWorkout) => {
        set((state) => ({ workouts: [workout, ...state.workouts] }));
        return workout.id;
      };

      return {
        ...initialLibraryState(navigatorLanguage),

        createWorkout: (name) =>
          addWorkout(workoutEdit.createWorkout(name, get().settings.defaults, now())),
        renameWorkout: (id, name) =>
          editWorkout(id, (workout) => workoutEdit.updateWorkout(workout, { name })),
        deleteWorkout: (id) =>
          set((state) => ({ workouts: state.workouts.filter((workout) => workout.id !== id) })),
        duplicateWorkout: (id, name) => {
          const source = get().workouts.find((workout) => workout.id === id);
          return source
            ? addWorkout(workoutEdit.cloneWorkoutWithNewIds(source, name, now()))
            : null;
        },
        updateWorkout: (id, patch) =>
          editWorkout(id, (workout) => workoutEdit.updateWorkout(workout, patch)),
        addExercise: (workoutId, setId, ref) =>
          editWorkout(workoutId, (workout) =>
            workoutEdit.addExercise(
              workout,
              setId,
              workoutEdit.newPlacedExercise(ref, get().settings.defaults),
            ),
          ),
        removeExercise: (workoutId, setId, placedId) =>
          editWorkout(workoutId, (workout) => workoutEdit.removeExercise(workout, setId, placedId)),
        moveExercise: (workoutId, from, to) =>
          editWorkout(workoutId, (workout) => workoutEdit.moveExercise(workout, from, to)),
        updateExercise: (workoutId, setId, placedId, patch) =>
          editWorkout(workoutId, (workout) => workoutEdit.updateExercise(workout, setId, placedId, patch)),
        reorderExercises: (workoutId, setId, orderedIds) =>
          editWorkout(workoutId, (workout) => workoutEdit.reorderExercises(workout, setId, orderedIds)),
        addSet: (workoutId) =>
          editWorkout(workoutId, (workout) => workoutEdit.addSet(workout, get().settings.defaults)),
        removeSet: (workoutId, setId) =>
          editWorkout(workoutId, (workout) => workoutEdit.removeSet(workout, setId)),
        moveSet: (workoutId, setId, toIndex) =>
          editWorkout(workoutId, (workout) => workoutEdit.moveSet(workout, setId, toIndex)),
        updateSet: (workoutId, setId, patch) =>
          editWorkout(workoutId, (workout) => workoutEdit.updateSet(workout, setId, patch)),
        importFromShareHash: (fragment) => {
          const shared = decodeWorkoutShare(fragment);
          return shared
            ? addWorkout(workoutEdit.cloneWorkoutWithNewIds(shared, shared.name, now()))
            : null;
        },
        importLegacy: ({ workout, defaults }) => {
          set((state) => ({ settings: { ...state.settings, defaults } }));
          if (workout) {
            addWorkout(workout);
          }
        },

        updateSettings: ({ defaults, ...patch }) =>
          set((state) => ({
            settings: {
              ...state.settings,
              ...patch,
              defaults: { ...state.settings.defaults, ...defaults },
            },
          })),
        resetSettings: () =>
          set((state) => ({
            settings: { ...initialSettings(navigatorLanguage), language: state.settings.language },
          })),
        setLastWorkoutId: (id) => set({ lastWorkoutId: id }),
        clearSet: (workoutId, setId) =>
          editWorkout(workoutId, (workout) => workoutEdit.clearSet(workout, setId)),
      };
    },
    {
      name: LIBRARY_STORAGE_KEY,
      version: LIBRARY_STORAGE_VERSION,
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        workouts: state.workouts,
        settings: state.settings,
        lastWorkoutId: state.lastWorkoutId,
      }),
      migrate: (persisted, version) =>
        version < 2 ? dropGymState(persisted) : (persisted as LibraryState),
    },
  ),
);
