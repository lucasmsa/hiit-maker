import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { gymTemplate } from '@/data/gym-template';
import { hiitExample } from '@/data/hiit-example';
import { detectLanguage } from '@/lib/i18n';
import type { LegacyImport } from '@/lib/legacy-migration';
import * as routineEdit from '@/lib/routine-edit';
import * as sessionLog from '@/lib/session-log';
import { decodeWorkoutShare } from '@/lib/share';
import type {
  Defaults,
  ExerciseRef,
  GymDay,
  GymEntry,
  GymPrescription,
  GymRoutine,
  GymSessionLog,
  HiitSet,
  HiitWorkout,
  Mode,
  PlacedExercise,
  SetLog,
  Settings,
} from '@/lib/types';
import * as workoutEdit from '@/lib/workout-edit';

export const LIBRARY_STORAGE_KEY = 'hiit-maker/library';
export const LIBRARY_STORAGE_VERSION = 1;

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
    unit: 'kg',
    muted: false,
    defaults: { ...initialDefaults },
  };
}

export interface LibraryState {
  workouts: HiitWorkout[];
  routines: GymRoutine[];
  logs: GymSessionLog[];
  settings: Settings;
  lastMode: Mode | null;
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

  createRoutine(name: string, firstDayName: string): string;
  renameRoutine(id: string, name: string): void;
  deleteRoutine(id: string): void;
  duplicateRoutine(id: string, name: string): string | null;
  updateRoutine(id: string, patch: Partial<Pick<GymRoutine, 'restSeconds'>>): void;
  addDay(routineId: string, name: string): string;
  removeDay(routineId: string, dayId: string): void;
  updateDay(routineId: string, dayId: string, patch: Partial<Pick<GymDay, 'name' | 'notes'>>): void;
  moveDay(routineId: string, dayId: string, toIndex: number): void;
  addEntry(routineId: string, dayId: string, ref: ExerciseRef): string;
  removeEntry(routineId: string, dayId: string, entryId: string): void;
  moveEntry(routineId: string, dayId: string, entryId: string, toIndex: number): void;
  updatePrescription(
    routineId: string,
    dayId: string,
    entryId: string,
    patch: Partial<GymPrescription>,
  ): void;
  setPrescription(
    routineId: string,
    dayId: string,
    entryId: string,
    prescription: GymPrescription,
  ): void;

  startSession(routineId: string, dayId: string): string;
  logSet(logId: string, entryId: string, setIndex: number, setLog: SetLog): void;
  finishSession(logId: string): void;

  updateSettings(
    patch: Partial<Omit<Settings, 'defaults'>> & { defaults?: Partial<Defaults> },
  ): void;
  resetSettings(): void;
  setLastMode(mode: Mode): void;
}

export type LibraryStore = LibraryState & LibraryActions;

export function initialLibraryState(navigatorLanguage?: string): LibraryState {
  return {
    workouts: [hiitExample],
    routines: [gymTemplate],
    logs: [],
    settings: initialSettings(navigatorLanguage),
    lastMode: null,
  };
}

const navigatorLanguage = typeof navigator === 'undefined' ? undefined : navigator.language;

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

      const editRoutine = (id: string, edit: (routine: GymRoutine) => GymRoutine) => {
        set((state) => ({
          routines: state.routines.map((routine) =>
            routine.id === id ? { ...edit(routine), updatedAt: now() } : routine,
          ),
        }));
      };

      const editLog = (id: string, edit: (log: GymSessionLog) => GymSessionLog) => {
        set((state) => ({
          logs: state.logs.map((log) => (log.id === id ? edit(log) : log)),
        }));
      };

      const addWorkout = (workout: HiitWorkout) => {
        set((state) => ({ workouts: [workout, ...state.workouts] }));
        return workout.id;
      };

      const addRoutine = (routine: GymRoutine) => {
        set((state) => ({ routines: [routine, ...state.routines] }));
        return routine.id;
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
          editWorkout(workoutId, (workout) =>
            workoutEdit.updateExercise(workout, setId, placedId, patch),
          ),
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

        createRoutine: (name, firstDayName) =>
          addRoutine(routineEdit.createRoutine(name, firstDayName, now())),
        renameRoutine: (id, name) =>
          editRoutine(id, (routine) => routineEdit.updateRoutine(routine, { name })),
        deleteRoutine: (id) =>
          set((state) => ({ routines: state.routines.filter((routine) => routine.id !== id) })),
        duplicateRoutine: (id, name) => {
          const source = get().routines.find((routine) => routine.id === id);
          return source
            ? addRoutine(routineEdit.cloneRoutineWithNewIds(source, name, now()))
            : null;
        },
        updateRoutine: (id, patch) =>
          editRoutine(id, (routine) => routineEdit.updateRoutine(routine, patch)),
        addDay: (routineId, name) => {
          const day = routineEdit.newDay(name);
          editRoutine(routineId, (routine) => routineEdit.addDay(routine, day));
          return day.id;
        },
        removeDay: (routineId, dayId) =>
          editRoutine(routineId, (routine) => routineEdit.removeDay(routine, dayId)),
        updateDay: (routineId, dayId, patch) =>
          editRoutine(routineId, (routine) => routineEdit.updateDay(routine, dayId, patch)),
        moveDay: (routineId, dayId, toIndex) =>
          editRoutine(routineId, (routine) => routineEdit.moveDay(routine, dayId, toIndex)),
        addEntry: (routineId, dayId, ref) => {
          const entry: GymEntry = routineEdit.newEntry(ref);
          editRoutine(routineId, (routine) => routineEdit.addEntry(routine, dayId, entry));
          return entry.id;
        },
        removeEntry: (routineId, dayId, entryId) =>
          editRoutine(routineId, (routine) => routineEdit.removeEntry(routine, dayId, entryId)),
        moveEntry: (routineId, dayId, entryId, toIndex) =>
          editRoutine(routineId, (routine) =>
            routineEdit.moveEntry(routine, dayId, entryId, toIndex),
          ),
        updatePrescription: (routineId, dayId, entryId, patch) =>
          editRoutine(routineId, (routine) =>
            routineEdit.updateEntry(routine, dayId, entryId, patch),
          ),
        setPrescription: (routineId, dayId, entryId, prescription) =>
          editRoutine(routineId, (routine) =>
            routineEdit.replaceEntryPrescription(routine, dayId, entryId, prescription),
          ),

        startSession: (routineId, dayId) => {
          const log = sessionLog.startSessionLog(routineId, dayId, now());
          set((state) => ({ logs: [log, ...state.logs] }));
          return log.id;
        },
        logSet: (logId, entryId, setIndex, setLog) =>
          editLog(logId, (log) => sessionLog.recordSet(log, entryId, setIndex, setLog)),
        finishSession: (logId) => editLog(logId, (log) => sessionLog.finishSessionLog(log, now())),

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
        setLastMode: (mode) => set({ lastMode: mode }),
      };
    },
    {
      name: LIBRARY_STORAGE_KEY,
      version: LIBRARY_STORAGE_VERSION,
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        workouts: state.workouts,
        routines: state.routines,
        logs: state.logs,
        settings: state.settings,
        lastMode: state.lastMode,
      }),
      migrate: (persisted) => persisted as LibraryState,
    },
  ),
);
