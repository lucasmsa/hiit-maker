import { useCallback, useMemo, useState } from 'react';
import { useNavigate } from 'react-router';
import { useT } from '@/hooks/useT';
import { routineEntryCount } from '@/lib/gym-format';
import type { GymRoutine, GymSessionLog } from '@/lib/types';
import { useLibraryStore } from '@/stores/library';

export interface RoutineRowData {
  routine: GymRoutine;
  dayCount: number;
  entryCount: number;
  lastSessionAt: number | null;
}

interface Renaming {
  id: string;
  value: string;
}

function lastFinishedAt(logs: GymSessionLog[], routineId: string): number | null {
  let latest: number | null = null;
  for (const log of logs) {
    if (log.routineId === routineId && log.finishedAt !== undefined) {
      latest = latest === null ? log.finishedAt : Math.max(latest, log.finishedAt);
    }
  }
  return latest;
}

export function useGymLibrary() {
  const t = useT();
  const navigate = useNavigate();
  const routines = useLibraryStore((state) => state.routines);
  const logs = useLibraryStore((state) => state.logs);
  const language = useLibraryStore((state) => state.settings.language);
  const createRoutine = useLibraryStore((state) => state.createRoutine);
  const duplicateRoutine = useLibraryStore((state) => state.duplicateRoutine);
  const renameRoutine = useLibraryStore((state) => state.renameRoutine);
  const deleteRoutine = useLibraryStore((state) => state.deleteRoutine);

  const [renaming, setRenaming] = useState<Renaming | null>(null);
  const [deleting, setDeleting] = useState<GymRoutine | null>(null);

  const rows = useMemo<RoutineRowData[]>(
    () =>
      routines.map((routine) => ({
        routine,
        dayCount: routine.days.length,
        entryCount: routineEntryCount(routine.days),
        lastSessionAt: lastFinishedAt(logs, routine.id),
      })),
    [routines, logs],
  );

  const create = useCallback(() => {
    const id = createRoutine(t('label.untitledRoutine'), t('label.untitledDay'));
    navigate(`/gym/${id}`);
  }, [createRoutine, navigate, t]);

  const duplicate = useCallback(
    (routine: GymRoutine) => {
      duplicateRoutine(routine.id, `${routine.name} ${t('gym.library.copySuffix')}`);
    },
    [duplicateRoutine, t],
  );

  const startRename = useCallback((routine: GymRoutine) => {
    setRenaming({ id: routine.id, value: routine.name });
  }, []);

  const changeRename = useCallback((value: string) => {
    setRenaming((current) => (current ? { ...current, value } : current));
  }, []);

  const commitRename = useCallback(() => {
    if (renaming && renaming.value.trim() !== '') {
      renameRoutine(renaming.id, renaming.value.trim());
    }
    setRenaming(null);
  }, [renaming, renameRoutine]);

  const cancelRename = useCallback(() => setRenaming(null), []);

  const requestDelete = useCallback((routine: GymRoutine) => setDeleting(routine), []);

  const confirmDelete = useCallback(() => {
    if (deleting) {
      deleteRoutine(deleting.id);
    }
    setDeleting(null);
  }, [deleting, deleteRoutine]);

  const cancelDelete = useCallback(() => setDeleting(null), []);

  return {
    rows,
    language,
    renaming,
    deleting,
    create,
    duplicate,
    startRename,
    changeRename,
    commitRename,
    cancelRename,
    requestDelete,
    confirmDelete,
    cancelDelete,
  };
}
