import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router';
import { clampDefault } from '@/lib/settings-bounds';
import type { Defaults, Language } from '@/lib/types';
import { clearAllData } from '@/stores/clear-all';
import { useLibraryStore } from '@/stores/library';

export function useSettings() {
  const navigate = useNavigate();
  const settings = useLibraryStore((state) => state.settings);
  const updateSettings = useLibraryStore((state) => state.updateSettings);
  const resetSettings = useLibraryStore((state) => state.resetSettings);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const setDefault = useCallback(
    (key: keyof Defaults, value: number) => {
      updateSettings({ defaults: { [key]: clampDefault(key, value) } });
    },
    [updateSettings],
  );

  const setLanguage = useCallback(
    (language: Language) => {
      updateSettings({ language });
    },
    [updateSettings],
  );

  const setSoundEnabled = useCallback(
    (enabled: boolean) => {
      updateSettings({ muted: !enabled });
    },
    [updateSettings],
  );

  const openConfirm = useCallback(() => setConfirmOpen(true), []);
  const closeConfirm = useCallback(() => setConfirmOpen(false), []);

  const deleteAllData = useCallback(() => {
    clearAllData(navigator.language);
    setConfirmOpen(false);
    navigate('/?pick=1');
  }, [navigate]);

  return {
    settings,
    setDefault,
    setLanguage,
    setSoundEnabled,
    resetSettings,
    confirmOpen,
    openConfirm,
    closeConfirm,
    deleteAllData,
    version: __APP_VERSION__,
  };
}
