import { useCallback } from 'react';
import { useLocation } from 'react-router';
import type { Language, Mode } from '@/lib/types';
import { useLibraryStore } from '@/stores/library';

export function modeFromPath(pathname: string): Mode | null {
  if (pathname.startsWith('/gym')) {
    return 'gym';
  }
  if (pathname.startsWith('/hiit')) {
    return 'hiit';
  }
  return null;
}

const languageLabels: Record<Language, string> = { en: 'en', 'pt-BR': 'pt' };

export function useShell() {
  const location = useLocation();
  const language = useLibraryStore((state) => state.settings.language);
  const updateSettings = useLibraryStore((state) => state.updateSettings);

  const toggleLanguage = useCallback(() => {
    updateSettings({ language: language === 'en' ? 'pt-BR' : 'en' });
  }, [language, updateSettings]);

  return {
    language,
    languageLabel: languageLabels[language],
    toggleLanguage,
    currentMode: modeFromPath(location.pathname),
  };
}
