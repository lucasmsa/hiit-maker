import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useCopyLink } from '@/hooks/useCopyLink';
import { useT } from '@/hooks/useT';
import { filterCatalog, groupExercises, placedCatalogIds, shareUrl, summarizeWorkout } from '@/lib/hiit-summary';
import type { HiitWorkout } from '@/lib/types';
import { groupCounts, type ExerciseLocation, type ExerciseTarget } from '@/lib/workout-edit';
import { useLibraryStore } from '@/stores/library';

const FLASH_MS = 900;

const actions = () => useLibraryStore.getState();

export function useBuilder(workoutId: string | undefined) {
  const t = useT();
  const workout: HiitWorkout | null =
    useLibraryStore((state) => state.workouts.find((candidate) => candidate.id === workoutId)) ?? null;
  const [selectedSetId, setSelectedSetId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sheetOpen, setSheetOpen] = useState(false);
  const [flashId, setFlashId] = useState<string | null>(null);
  const flashTimer = useRef<number | null>(null);

  const currentSetId = useMemo(() => {
    if (!workout) {
      return null;
    }
    if (selectedSetId && workout.sets.some((set) => set.id === selectedSetId)) {
      return selectedSetId;
    }
    return workout.sets[0]?.id ?? null;
  }, [workout, selectedSetId]);

  const summary = useMemo(() => (workout ? summarizeWorkout(workout) : null), [workout]);
  const counts = useMemo(() => (workout ? groupCounts(workout) : {}), [workout]);
  const placedIds = useMemo(() => (workout ? placedCatalogIds(workout) : new Set<string>()), [workout]);
  const catalog = useMemo(() => groupExercises(filterCatalog(query, t)), [query, t]);

  useEffect(() => {
    return () => {
      if (flashTimer.current !== null) {
        window.clearTimeout(flashTimer.current);
      }
    };
  }, []);

  const flash = useCallback((id: string) => {
    setFlashId(id);
    if (flashTimer.current !== null) {
      window.clearTimeout(flashTimer.current);
    }
    flashTimer.current = window.setTimeout(() => setFlashId(null), FLASH_MS);
  }, []);

  const addFromCatalog = useCallback(
    (exerciseId: string) => {
      if (!workout || !currentSetId) {
        return;
      }
      actions().addExercise(workout.id, currentSetId, { kind: 'catalog', exerciseId });
      const updatedSet = actions()
        .workouts.find((candidate) => candidate.id === workout.id)
        ?.sets.find((set) => set.id === currentSetId);
      const last = updatedSet?.exercises[updatedSet.exercises.length - 1];
      if (last) {
        flash(last.id);
      }
    },
    [currentSetId, flash, workout],
  );

  const openSheetFor = useCallback((setId: string) => {
    setSelectedSetId(setId);
    setSheetOpen(true);
  }, []);
  const closeSheet = useCallback(() => setSheetOpen(false), []);

  const rename = useCallback(
    (name: string) => {
      if (workout && name.trim() !== '') {
        actions().renameWorkout(workout.id, name);
      }
    },
    [workout],
  );

  const setWarmup = useCallback(
    (seconds: number) => workout && actions().updateWorkout(workout.id, { warmupSeconds: seconds }),
    [workout],
  );

  const setLoops = useCallback(
    (setId: string, loops: number) => workout && actions().updateSet(workout.id, setId, { loops }),
    [workout],
  );

  const setSetRest = useCallback(
    (setId: string, seconds: number) =>
      workout && actions().updateSet(workout.id, setId, { setRestSeconds: seconds }),
    [workout],
  );

  const setTrain = useCallback(
    (setId: string, placedId: string, seconds: number) =>
      workout && actions().updateExercise(workout.id, setId, placedId, { trainSeconds: seconds }),
    [workout],
  );

  const setRest = useCallback(
    (setId: string, placedId: string, seconds: number) =>
      workout && actions().updateExercise(workout.id, setId, placedId, { restSeconds: seconds }),
    [workout],
  );

  const removeExercise = useCallback(
    (setId: string, placedId: string) => workout && actions().removeExercise(workout.id, setId, placedId),
    [workout],
  );

  const reorder = useCallback(
    (setId: string, orderedIds: string[]) => workout && actions().reorderExercises(workout.id, setId, orderedIds),
    [workout],
  );

  const move = useCallback(
    (from: ExerciseLocation, to: ExerciseTarget) => {
      if (!workout) {
        return;
      }
      actions().moveExercise(workout.id, from, to);
      setSelectedSetId(to.setId);
    },
    [workout],
  );

  const moveBy = useCallback(
    (setId: string, placedId: string, delta: -1 | 1) => {
      const set = workout?.sets.find((candidate) => candidate.id === setId);
      const index = set?.exercises.findIndex((exercise) => exercise.id === placedId) ?? -1;
      if (!set || index === -1) {
        return;
      }
      const target = index + delta;
      if (target < 0 || target >= set.exercises.length) {
        return;
      }
      move({ setId, placedId }, { setId, index: target });
    },
    [move, workout],
  );

  const moveToSet = useCallback(
    (fromSetId: string, placedId: string, toSetId: string) => {
      const target = workout?.sets.find((set) => set.id === toSetId);
      if (!target) {
        return;
      }
      move({ setId: fromSetId, placedId }, { setId: toSetId, index: target.exercises.length });
    },
    [move, workout],
  );

  const addSet = useCallback(() => {
    if (!workout) {
      return;
    }
    actions().addSet(workout.id);
    const sets = actions().workouts.find((candidate) => candidate.id === workout.id)?.sets ?? [];
    const created = sets[sets.length - 1];
    if (created) {
      setSelectedSetId(created.id);
    }
  }, [workout]);

  const removeSet = useCallback(
    (setId: string) => workout && actions().removeSet(workout.id, setId),
    [workout],
  );

  const getShareUrl = useCallback(
    () => (workout ? shareUrl(window.location.origin, workout) : ''),
    [workout],
  );
  const share = useCopyLink(getShareUrl);

  return {
    workout,
    summary,
    counts,
    placedIds,
    catalog,
    query,
    setQuery,
    currentSetId,
    selectSet: setSelectedSetId,
    flashId,
    sheetOpen,
    openSheetFor,
    closeSheet,
    addFromCatalog,
    rename,
    setWarmup,
    setLoops,
    setSetRest,
    setTrain,
    setRest,
    removeExercise,
    reorder,
    moveBy,
    moveToSet,
    addSet,
    removeSet,
    share,
  };
}

export type BuilderApi = ReturnType<typeof useBuilder>;
