import { readLegacyImport } from '@/lib/legacy-migration';
import { translate } from '@/lib/i18n';
import { useLibraryStore } from '@/stores/library';

export function runLegacyMigration(storage: Storage = localStorage, now = Date.now()): boolean {
  const language = useLibraryStore.getState().settings.language;
  const result = readLegacyImport(storage, translate(language, 'migration.importedName'), now);
  if (!result) {
    return false;
  }
  useLibraryStore.getState().importLegacy(result);
  return true;
}
