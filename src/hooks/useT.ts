import { useMemo } from 'react';
import { translatorFor, type Translate } from '@/lib/i18n';
import { useLibraryStore } from '@/stores/library';

export function useT(): Translate {
  const language = useLibraryStore((state) => state.settings.language);
  return useMemo(() => translatorFor(language), [language]);
}
