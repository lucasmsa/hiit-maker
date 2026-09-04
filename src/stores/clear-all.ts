import { LEGACY_STORAGE_KEY } from '@/lib/legacy-migration';
import { initialLibraryState, useLibraryStore } from '@/stores/library';
import { useRunStore } from '@/stores/run';

export function clearAllData(navigatorLanguage?: string, storage: Storage = localStorage): void {
  useRunStore.getState().stop();
  useLibraryStore.setState(initialLibraryState(navigatorLanguage));
  useRunStore.persist.clearStorage();
  useLibraryStore.persist.clearStorage();
  storage.removeItem(LEGACY_STORAGE_KEY);
}
