import { useCallback, useMemo, useState } from 'react';
import { useIsNarrow } from '@/hooks/useMediaQuery';
import { useT } from '@/hooks/useT';
import {
  draftFromEntry,
  emptyDraft,
  prescriptionFromDraft,
  type EntryDraft,
} from '@/lib/gym-draft';
import { searchGymCatalog } from '@/lib/gym-search';
import { reorderMoves } from '@/lib/reorder';
import type { ExerciseRef, GymDay, GymEntry } from '@/lib/types';
import { useLibraryStore } from '@/stores/library';

interface EditorTarget {
  dayId: string;
  entryId: string | null;
}

interface DayRename {
  dayId: string;
  value: string;
}

export function useRoutinePlan(routineId: string) {
  const t = useT();
  const isNarrow = useIsNarrow();
  const routine = useLibraryStore((state) => state.routines.find((item) => item.id === routineId));
  const renameRoutine = useLibraryStore((state) => state.renameRoutine);
  const updateRoutine = useLibraryStore((state) => state.updateRoutine);
  const addDay = useLibraryStore((state) => state.addDay);
  const removeDay = useLibraryStore((state) => state.removeDay);
  const updateDay = useLibraryStore((state) => state.updateDay);
  const moveDay = useLibraryStore((state) => state.moveDay);
  const addEntry = useLibraryStore((state) => state.addEntry);
  const removeEntry = useLibraryStore((state) => state.removeEntry);
  const moveEntry = useLibraryStore((state) => state.moveEntry);
  const setPrescription = useLibraryStore((state) => state.setPrescription);

  const defaultRest = routine?.restSeconds ?? 90;

  const [editor, setEditor] = useState<EditorTarget | null>(null);
  const [draft, setDraft] = useState<EntryDraft>(() => emptyDraft(defaultRest));
  const [query, setQuery] = useState('');
  const [dayRename, setDayRename] = useState<DayRename | null>(null);
  const [dayToRemove, setDayToRemove] = useState<GymDay | null>(null);

  const results = useMemo(() => searchGymCatalog(query, t), [query, t]);

  const openAdd = useCallback(
    (dayId: string) => {
      setDraft(emptyDraft(defaultRest));
      setQuery('');
      setEditor({ dayId, entryId: null });
    },
    [defaultRest],
  );

  const openEdit = useCallback(
    (dayId: string, entry: GymEntry) => {
      setDraft(draftFromEntry(entry, defaultRest));
      setQuery('');
      setEditor({ dayId, entryId: entry.id });
    },
    [defaultRest],
  );

  const closeEditor = useCallback(() => setEditor(null), []);

  const updateDraft = useCallback((patch: Partial<EntryDraft>) => {
    setDraft((current) => ({ ...current, ...patch }));
  }, []);

  const pickExercise = useCallback((ref: ExerciseRef) => {
    setDraft((current) => ({ ...current, ref }));
  }, []);

  const saveEntry = useCallback(() => {
    if (!routine || !editor || !draft.ref) {
      return;
    }
    const prescription = prescriptionFromDraft(draft);
    const entryId = editor.entryId ?? addEntry(routine.id, editor.dayId, draft.ref);
    setPrescription(routine.id, editor.dayId, entryId, prescription);
    setEditor(null);
  }, [routine, editor, draft, addEntry, setPrescription]);

  const removeEditingEntry = useCallback(() => {
    if (routine && editor?.entryId) {
      removeEntry(routine.id, editor.dayId, editor.entryId);
    }
    setEditor(null);
  }, [routine, editor, removeEntry]);

  const reorderEntries = useCallback(
    (day: GymDay, orderedIds: string[]) => {
      if (!routine) {
        return;
      }
      const current = day.entries.map((entry) => entry.id);
      for (const move of reorderMoves(current, orderedIds)) {
        moveEntry(routine.id, day.id, move.id, move.toIndex);
      }
    },
    [routine, moveEntry],
  );

  const moveEntryBy = useCallback(
    (day: GymDay, entryId: string, delta: number) => {
      if (!routine) {
        return;
      }
      const index = day.entries.findIndex((entry) => entry.id === entryId);
      if (index !== -1) {
        moveEntry(routine.id, day.id, entryId, index + delta);
      }
    },
    [routine, moveEntry],
  );

  const changeName = useCallback(
    (name: string) => {
      if (routine) {
        renameRoutine(routine.id, name);
      }
    },
    [routine, renameRoutine],
  );

  const commitName = useCallback(() => {
    if (routine && routine.name.trim() === '') {
      renameRoutine(routine.id, t('label.untitledRoutine'));
    }
  }, [routine, renameRoutine, t]);

  const changeRest = useCallback(
    (restSeconds: number) => {
      if (routine) {
        updateRoutine(routine.id, { restSeconds });
      }
    },
    [routine, updateRoutine],
  );

  const createDay = useCallback(() => {
    if (routine) {
      const dayId = addDay(routine.id, t('label.untitledDay'));
      setDayRename({ dayId, value: t('label.untitledDay') });
    }
  }, [routine, addDay, t]);

  const startDayRename = useCallback(
    (day: GymDay) => setDayRename({ dayId: day.id, value: day.name }),
    [],
  );

  const changeDayRename = useCallback((value: string) => {
    setDayRename((current) => (current ? { ...current, value } : current));
  }, []);

  const commitDayRename = useCallback(() => {
    if (routine && dayRename && dayRename.value.trim() !== '') {
      updateDay(routine.id, dayRename.dayId, { name: dayRename.value.trim() });
    }
    setDayRename(null);
  }, [routine, dayRename, updateDay]);

  const cancelDayRename = useCallback(() => setDayRename(null), []);

  const requestRemoveDay = useCallback(
    (day: GymDay) => {
      if (!routine) {
        return;
      }
      if (day.entries.length === 0) {
        removeDay(routine.id, day.id);
      } else {
        setDayToRemove(day);
      }
    },
    [routine, removeDay],
  );

  const confirmRemoveDay = useCallback(() => {
    if (routine && dayToRemove) {
      removeDay(routine.id, dayToRemove.id);
    }
    setDayToRemove(null);
  }, [routine, dayToRemove, removeDay]);

  const cancelRemoveDay = useCallback(() => setDayToRemove(null), []);

  const moveDayBy = useCallback(
    (day: GymDay, delta: number) => {
      if (!routine) {
        return;
      }
      const index = routine.days.findIndex((item) => item.id === day.id);
      if (index !== -1) {
        moveDay(routine.id, day.id, index + delta);
      }
    },
    [routine, moveDay],
  );

  return {
    routine,
    isNarrow,
    editor,
    draft,
    query,
    results,
    dayRename,
    dayToRemove,
    openAdd,
    openEdit,
    closeEditor,
    updateDraft,
    pickExercise,
    setQuery,
    saveEntry,
    removeEditingEntry,
    reorderEntries,
    moveEntryBy,
    changeName,
    commitName,
    changeRest,
    createDay,
    startDayRename,
    changeDayRename,
    commitDayRename,
    cancelDayRename,
    requestRemoveDay,
    confirmRemoveDay,
    cancelRemoveDay,
    moveDayBy,
  };
}

export type RoutinePlan = ReturnType<typeof useRoutinePlan>;
