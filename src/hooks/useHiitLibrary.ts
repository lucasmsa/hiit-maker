import { useCallback, useMemo, useState } from 'react';
import { useNavigate } from 'react-router';
import { useT } from '@/hooks/useT';
import { summarizeWorkout } from '@/lib/hiit-summary';
import { useLibraryStore } from '@/stores/library';

export function useHiitLibrary() {
  const navigate = useNavigate();
  const t = useT();
  const workouts = useLibraryStore((state) => state.workouts);
  const createWorkout = useLibraryStore((state) => state.createWorkout);
  const duplicateWorkout = useLibraryStore((state) => state.duplicateWorkout);
  const renameWorkout = useLibraryStore((state) => state.renameWorkout);
  const deleteWorkout = useLibraryStore((state) => state.deleteWorkout);
  const [renamingId, setRenamingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const rows = useMemo(
    () => workouts.map((workout) => ({ workout, summary: summarizeWorkout(workout) })),
    [workouts],
  );

  const createNew = useCallback(() => {
    const id = createWorkout(t('label.untitledWorkout'));
    navigate(`/hiit/${id}`);
  }, [createWorkout, navigate, t]);

  const duplicate = useCallback(
    (id: string) => {
      const source = workouts.find((workout) => workout.id === id);
      if (source) {
        duplicateWorkout(id, t('hiit.library.copyOf', { name: source.name }));
      }
    },
    [duplicateWorkout, t, workouts],
  );

  const commitRename = useCallback(
    (id: string, name: string) => {
      const trimmed = name.trim();
      if (trimmed !== '') {
        renameWorkout(id, trimmed);
      }
      setRenamingId(null);
    },
    [renameWorkout],
  );

  const cancelRename = useCallback(() => setRenamingId(null), []);
  const cancelDelete = useCallback(() => setDeletingId(null), []);

  const confirmDelete = useCallback(() => {
    if (deletingId) {
      deleteWorkout(deletingId);
    }
    setDeletingId(null);
  }, [deleteWorkout, deletingId]);

  const deleting = workouts.find((workout) => workout.id === deletingId) ?? null;

  return {
    rows,
    createNew,
    duplicate,
    renamingId,
    startRename: setRenamingId,
    cancelRename,
    commitRename,
    deleting,
    requestDelete: setDeletingId,
    cancelDelete,
    confirmDelete,
  };
}
