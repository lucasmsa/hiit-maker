import { useCallback } from 'react';
import type { Language } from '@/lib/types';
import { useLibraryStore } from '@/stores/library';

const languageLabels: Record<Language, string> = { en: 'en', 'pt-BR': 'pt' };

export function useShell() {
  const language = useLibraryStore((state) => state.settings.language);
  const updateSettings = useLibraryStore((state) => state.updateSettings);

  const toggleLanguage = useCallback(() => {
    updateSettings({ language: language === 'en' ? 'pt-BR' : 'en' });
  }, [language, updateSettings]);

  return {
    language,
    languageLabel: languageLabels[language],
    toggleLanguage,
  };
}
