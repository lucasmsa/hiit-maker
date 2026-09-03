import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export const GYM_SESSION_STORAGE_KEY = 'hiit-maker/gym-session';

export interface ActiveGymSession {
  logId: string;
  routineId: string;
  dayId: string;
}

interface GymSessionState {
  active: ActiveGymSession | null;
  begin(active: ActiveGymSession): void;
  end(): void;
}

export const useGymSessionStore = create<GymSessionState>()(
  persist(
    (set) => ({
      active: null,
      begin: (active) => set({ active }),
      end: () => set({ active: null }),
    }),
    {
      name: GYM_SESSION_STORAGE_KEY,
      version: 1,
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ active: state.active }),
    },
  ),
);
