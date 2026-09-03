import { beforeEach, describe, expect, it } from 'vitest';
import { LEGACY_STORAGE_KEY } from '@/lib/legacy-migration';
import { clearAllData } from '@/stores/clear-all';
import { LIBRARY_STORAGE_KEY, initialLibraryState, useLibraryStore } from '@/stores/library';
import { RUN_STORAGE_KEY, useRunStore } from '@/stores/run';

beforeEach(() => {
  useLibraryStore.setState(initialLibraryState('en'));
  useRunStore.setState({ session: null });
});

describe('clearAllData', () => {
  it('resets both stores and removes every storage key', () => {
    useLibraryStore.getState().createWorkout('Gone');
    useLibraryStore.getState().updateSettings({ muted: true, language: 'pt-BR' });
    localStorage.setItem(LEGACY_STORAGE_KEY, '{}');
    expect(localStorage.getItem(LIBRARY_STORAGE_KEY)).not.toBeNull();

    clearAllData('en');

    const state = useLibraryStore.getState();
    expect(state.workouts).toHaveLength(1);
    expect(state.settings.muted).toBe(false);
    expect(state.settings.language).toBe('en');
    expect(useRunStore.getState().session).toBeNull();
    expect(localStorage.getItem(LIBRARY_STORAGE_KEY)).toBeNull();
    expect(localStorage.getItem(RUN_STORAGE_KEY)).toBeNull();
    expect(localStorage.getItem(LEGACY_STORAGE_KEY)).toBeNull();
  });
});
