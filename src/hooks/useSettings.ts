import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router';
import { clampDefault } from '@/lib/settings-bounds';
import type { Defaults, Language, Settings } from '@/lib/types';
import { clearAllData } from '@/stores/clear-all';
import { initialSettings, useLibraryStore } from '@/stores/library';

interface SettingsDraft {
  defaults: Defaults;
  muted: boolean;
}

const defaultKeys: Array<keyof Defaults> = [
  'warmupSeconds',
  'trainSeconds',
  'restSeconds',
  'setRestSeconds',
  'setRepetitions',
];

function draftOf(settings: Settings): SettingsDraft {
  return { defaults: { ...settings.defaults }, muted: settings.muted };
}

function sameDraft(a: SettingsDraft, b: SettingsDraft): boolean {
  return a.muted === b.muted && defaultKeys.every((key) => a.defaults[key] === b.defaults[key]);
}

export function useSettings() {
  const navigate = useNavigate();
  const settings = useLibraryStore((state) => state.settings);
  const updateSettings = useLibraryStore((state) => state.updateSettings);
  const [draft, setDraft] = useState<SettingsDraft>(() => draftOf(settings));
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [discardOpen, setDiscardOpen] = useState(false);

  const dirty = !sameDraft(draft, draftOf(settings));
  const backTarget = '/';

  const setDefault = useCallback((key: keyof Defaults, value: number) => {
    setDraft((current) => ({
      ...current,
      defaults: { ...current.defaults, [key]: clampDefault(key, value) },
    }));
  }, []);

  const setSoundEnabled = useCallback((enabled: boolean) => {
    setDraft((current) => ({ ...current, muted: !enabled }));
  }, []);

  const setLanguage = useCallback(
    (language: Language) => {
      updateSettings({ language });
    },
    [updateSettings],
  );

  const restore = useCallback(() => {
    setDraft(draftOf(initialSettings(navigator.language)));
  }, []);

  const save = useCallback(() => {
    updateSettings({ defaults: draft.defaults, muted: draft.muted });
  }, [draft, updateSettings]);

  const back = useCallback(() => {
    if (dirty) {
      setDiscardOpen(true);
      return;
    }
    navigate(backTarget);
  }, [dirty, navigate, backTarget]);

  const discard = useCallback(() => {
    setDiscardOpen(false);
    navigate(backTarget);
  }, [navigate, backTarget]);

  const keepEditing = useCallback(() => setDiscardOpen(false), []);
  const openConfirm = useCallback(() => setConfirmOpen(true), []);
  const closeConfirm = useCallback(() => setConfirmOpen(false), []);

  const deleteAllData = useCallback(() => {
    clearAllData(navigator.language);
    setConfirmOpen(false);
    navigate('/');
  }, [navigate]);

  return {
    settings,
    draft,
    dirty,
    setDefault,
    setSoundEnabled,
    setLanguage,
    restore,
    save,
    back,
    discardOpen,
    discard,
    keepEditing,
    confirmOpen,
    openConfirm,
    closeConfirm,
    deleteAllData,
    version: __APP_VERSION__,
  };
}
