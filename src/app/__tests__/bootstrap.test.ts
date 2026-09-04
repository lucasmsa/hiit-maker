import { beforeEach, describe, expect, it } from 'vitest';
import { runLegacyMigration } from '@/app/bootstrap';
import fixture from '@/lib/__fixtures__/legacy-persist.json';
import { LEGACY_STORAGE_KEY } from '@/lib/legacy-migration';
import { initialLibraryState, useLibraryStore } from '@/stores/library';

beforeEach(() => {
  useLibraryStore.setState(initialLibraryState('en'));
});

describe('runLegacyMigration', () => {
  it('imports the old redux-persist state once into the library', () => {
    localStorage.setItem(LEGACY_STORAGE_KEY, fixture.value);
    expect(runLegacyMigration(localStorage, 42)).toBe(true);

    const { workouts, settings } = useLibraryStore.getState();
    expect(workouts[0]).toMatchObject({ name: 'Imported workout', warmupSeconds: 60, createdAt: 42 });
    expect(workouts[0]?.sets).toHaveLength(2);
    expect(settings.defaults.setRepetitions).toBe(2);
    expect(localStorage.getItem(LEGACY_STORAGE_KEY)).toBeNull();

    expect(runLegacyMigration(localStorage, 43)).toBe(false);
    expect(useLibraryStore.getState().workouts).toHaveLength(2);
  });

  it('uses the active language for the imported name', () => {
    useLibraryStore.getState().updateSettings({ language: 'pt-BR' });
    localStorage.setItem(LEGACY_STORAGE_KEY, fixture.value);
    runLegacyMigration(localStorage, 1);
    expect(useLibraryStore.getState().workouts[0]?.name).toBe('Treino importado');
  });
});
