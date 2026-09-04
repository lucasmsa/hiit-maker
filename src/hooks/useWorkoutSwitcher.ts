import { useCallback, useMemo, useState } from 'react';
import { useNavigate } from 'react-router';
import { useT } from '@/hooks/useT';
import { summarizeWorkout } from '@/lib/hiit-summary';
import { useLibraryStore } from '@/stores/library';

export function useWorkoutSwitcher(currentId: string | null, focusName: () => void) {
  const navigate = useNavigate();
  const t = useT();
  const workouts = useLibraryStore((state) => state.workouts);
  const createWorkout = useLibraryStore((state) => state.createWorkout);
  const duplicateWorkout = useLibraryStore((state) => state.duplicateWorkout);
  const deleteWorkout = useLibraryStore((state) => state.deleteWorkout);
  const [open, setOpen] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const rows = useMemo(
    () =>
      workouts.map((workout) => ({
        workout,
        summary: summarizeWorkout(workout),
        current: workout.id === currentId,
      })),
    [currentId, workouts],
  );

  const close = useCallback(() => setOpen(false), []);

  const select = useCallback(
    (id: string) => {
      setOpen(false);
      navigate(`/w/${id}`);
    },
    [navigate],
  );

  const createNew = useCallback(() => {
    const id = createWorkout(t('label.untitledWorkout'));
    setOpen(false);
    navigate(`/w/${id}`);
  }, [createWorkout, navigate, t]);

  const duplicate = useCallback(
    (id: string) => {
      const source = workouts.find((workout) => workout.id === id);
      if (!source) {
        return;
      }
      const copyId = duplicateWorkout(id, t('hiit.builder.copyOf', { name: source.name }));
      if (copyId) {
        setOpen(false);
        navigate(`/w/${copyId}`);
      }
    },
    [duplicateWorkout, navigate, t, workouts],
  );

  const renameCurrent = useCallback(() => {
    setOpen(false);
    window.setTimeout(focusName, 0);
  }, [focusName]);

  const confirmDelete = useCallback(() => {
    if (!deletingId) {
      return;
    }
    const wasCurrent = deletingId === currentId;
    deleteWorkout(deletingId);
    setDeletingId(null);
    if (wasCurrent) {
      setOpen(false);
      navigate('/');
    }
  }, [currentId, deleteWorkout, deletingId, navigate]);

  const deleting = workouts.find((workout) => workout.id === deletingId) ?? null;

  return {
    open,
    show: () => setOpen(true),
    close,
    rows,
    select,
    createNew,
    duplicate,
    renameCurrent,
    deleting,
    requestDelete: setDeletingId,
    cancelDelete: () => setDeletingId(null),
    confirmDelete,
  };
}

export type WorkoutSwitcherApi = ReturnType<typeof useWorkoutSwitcher>;
