import { useCallback } from 'react';
import { useLocation } from 'react-router';
import type { Mode } from '@/lib/types';
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

export function useShell() {
  const location = useLocation();
  const language = useLibraryStore((state) => state.settings.language);
  const updateSettings = useLibraryStore((state) => state.updateSettings);

  const toggleLanguage = useCallback(() => {
    updateSettings({ language: language === 'en' ? 'pt-BR' : 'en' });
  }, [language, updateSettings]);

  return { language, toggleLanguage, currentMode: modeFromPath(location.pathname) };
}
