import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import {
  advanceDuePhases,
  backPhase,
  pauseRun,
  resumeRun,
  skipPhase,
  startRun,
  type RunSession,
  type StartRunInput,
} from '@/lib/run-clock';

export const RUN_STORAGE_KEY = 'hiit-maker/run';
export const RUN_STORAGE_VERSION = 1;

export interface RunState {
  session: RunSession | null;
}

export interface RunActions {
  start(input: StartRunInput, now?: number): void;
  pause(now?: number): void;
  resume(now?: number): void;
  skip(now?: number): void;
  back(now?: number): void;
  sync(now?: number): number;
  stop(): void;
}

export type RunStore = RunState & RunActions;

export const useRunStore = create<RunStore>()(
  persist(
    (set, get) => {
      const withSession = (update: (session: RunSession, now: number) => RunSession, now: number) => {
        const session = get().session;
        if (session) {
          set({ session: update(session, now) });
        }
      };

      return {
        session: null,
        start: (input, now = Date.now()) => set({ session: startRun(input, now) }),
        pause: (now = Date.now()) => withSession(pauseRun, now),
        resume: (now = Date.now()) => withSession(resumeRun, now),
        skip: (now = Date.now()) => withSession(skipPhase, now),
        back: (now = Date.now()) => withSession(backPhase, now),
        sync: (now = Date.now()) => {
          const session = get().session;
          if (!session) {
            return 0;
          }
          const result = advanceDuePhases(session, now);
          if (result.advanced > 0) {
            set({ session: result.session });
          }
          return result.advanced;
        },
        stop: () => set({ session: null }),
      };
    },
    {
      name: RUN_STORAGE_KEY,
      version: RUN_STORAGE_VERSION,
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ session: state.session }),
      migrate: (persisted) => persisted as RunState,
    },
  ),
);
