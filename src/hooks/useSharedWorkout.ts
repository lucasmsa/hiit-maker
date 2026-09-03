import { useCallback, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { summarizeWorkout } from '@/lib/hiit-summary';
import { decodeWorkoutShare } from '@/lib/share';
import { useLibraryStore } from '@/stores/library';

export function useSharedWorkout() {
  const { hash } = useLocation();
  const navigate = useNavigate();
  const importFromShareHash = useLibraryStore((state) => state.importFromShareHash);

  const workout = useMemo(() => decodeWorkoutShare(hash), [hash]);
  const summary = useMemo(() => (workout ? summarizeWorkout(workout) : null), [workout]);

  const save = useCallback(() => {
    if (importFromShareHash(hash)) {
      navigate('/hiit');
    }
  }, [hash, importFromShareHash, navigate]);

  const open = useCallback(() => {
    const id = importFromShareHash(hash);
    if (id) {
      navigate(`/hiit/${id}`);
    }
  }, [hash, importFromShareHash, navigate]);

  return { workout, summary, save, open };
}
