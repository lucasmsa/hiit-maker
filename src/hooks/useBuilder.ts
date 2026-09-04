import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useCopyLink } from '@/hooks/useCopyLink';
import { useT } from '@/hooks/useT';
import { pickCurrentWorkoutId } from '@/lib/current-workout';
import { filterCatalog, groupExercises, placedCatalogIds, shareUrl, summarizeWorkout } from '@/lib/hiit-summary';
import { setIsFull } from '@/lib/workout-limits';
import type { HiitSet, HiitWorkout } from '@/lib/types';
import { groupCounts, type ExerciseLocation, type ExerciseTarget } from '@/lib/workout-edit';
import { useLibraryStore } from '@/stores/library';

const FLASH_MS = 900;
const MAX_LOOPS = 20;

const actions = () => useLibraryStore.getState();

function clampIndex(index: number, length: number): number {
  if (length === 0) {
    return 0;
  }
  return Math.min(Math.max(index, 0), length - 1);
}

export function useBuilder(routeId: string | undefined) {
  const t = useT();
  const workouts = useLibraryStore((state) => state.workouts);
  const lastWorkoutId = useLibraryStore((state) => state.lastWorkoutId);
  const resolvedId = routeId ?? pickCurrentWorkoutId(workouts, lastWorkoutId);
  const workout: HiitWorkout | null = workouts.find((candidate) => candidate.id === resolvedId) ?? null;
  const missing = routeId !== undefined && workout === null;

  const [setSelection, setSetSelection] = useState<{ workoutId: string; index: number } | null>(null);
  const [nameDraft, setNameDraft] = useState<{ workoutId: string; text: string } | null>(null);
  const [query, setQuery] = useState('');
  const [sheetOpen, setSheetOpen] = useState(false);
  const [optionsFor, setOptionsFor] = useState<string | null>(null);
  const [clearing, setClearing] = useState(false);
  const [flashId, setFlashId] = useState<string | null>(null);
  const flashTimer = useRef<number | null>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (routeId === undefined && workouts.length === 0) {
      const id = actions().createWorkout(t('label.untitledWorkout'));
      actions().setLastWorkoutId(id);
    }
  }, [routeId, workouts.length, t]);

  useEffect(() => {
    if (workout && workout.id !== lastWorkoutId) {
      actions().setLastWorkoutId(workout.id);
    }
  }, [workout, lastWorkoutId]);

  useEffect(() => {
    return () => {
      if (flashTimer.current !== null) {
        window.clearTimeout(flashTimer.current);
      }
    };
  }, []);

  const selectedIndex = setSelection && setSelection.workoutId === workout?.id ? setSelection.index : 0;
  const currentSetIndex = clampIndex(selectedIndex, workout?.sets.length ?? 0);
  const selectSet = useCallback(
    (index: number) => {
      if (workout) {
        setSetSelection({ workoutId: workout.id, index });
      }
    },
    [workout],
  );
  const currentSet: HiitSet | null = workout?.sets[currentSetIndex] ?? null;

  const summary = useMemo(() => (workout ? summarizeWorkout(workout) : null), [workout]);
  const counts = useMemo(() => (workout ? groupCounts(workout) : {}), [workout]);
  const placedIds = useMemo(() => placedCatalogIds(currentSet), [currentSet]);
  const setFull = setIsFull(currentSet?.exercises.length ?? 0);
  const catalog = useMemo(() => groupExercises(filterCatalog(query, t)), [query, t]);

  const flash = useCallback((id: string) => {
    setFlashId(id);
    if (flashTimer.current !== null) {
      window.clearTimeout(flashTimer.current);
    }
    flashTimer.current = window.setTimeout(() => setFlashId(null), FLASH_MS);
  }, []);

  const addFromCatalog = useCallback(
    (exerciseId: string) => {
      if (!workout || !currentSet) {
        return;
      }
      actions().addExercise(workout.id, currentSet.id, { kind: 'catalog', exerciseId });
      const updatedSet = actions()
        .workouts.find((candidate) => candidate.id === workout.id)
        ?.sets.find((set) => set.id === currentSet.id);
      const last = updatedSet?.exercises[updatedSet.exercises.length - 1];
      if (last) {
        flash(last.id);
      }
    },
    [currentSet, flash, workout],
  );

  const activeDraft = nameDraft && nameDraft.workoutId === workout?.id ? nameDraft.text : null;
  const nameValue = activeDraft ?? workout?.name ?? '';

  const changeName = useCallback(
    (value: string) => {
      if (!workout) {
        return;
      }
      setNameDraft({ workoutId: workout.id, text: value });
      if (value.trim() !== '') {
        actions().renameWorkout(workout.id, value);
      }
    },
    [workout],
  );

  const commitName = useCallback(() => {
    if (workout && nameValue.trim() === '') {
      actions().renameWorkout(workout.id, t('label.untitledWorkout'));
    }
    setNameDraft(null);
  }, [nameValue, t, workout]);

  const focusName = useCallback(() => {
    const input = nameInputRef.current;
    if (input) {
      input.focus();
      input.select();
    }
  }, []);

  const setWarmup = useCallback(
    (seconds: number) => workout && actions().updateWorkout(workout.id, { warmupSeconds: seconds }),
    [workout],
  );

  const setLoops = useCallback(
    (loops: number) => {
      if (workout && currentSet) {
        actions().updateSet(workout.id, currentSet.id, { loops: Math.min(Math.max(loops, 1), MAX_LOOPS) });
      }
    },
    [currentSet, workout],
  );

  const setSetRest = useCallback(
    (seconds: number) => workout && currentSet && actions().updateSet(workout.id, currentSet.id, { setRestSeconds: seconds }),
    [currentSet, workout],
  );

  const setTrain = useCallback(
    (placedId: string, seconds: number) =>
      workout && currentSet && actions().updateExercise(workout.id, currentSet.id, placedId, { trainSeconds: seconds }),
    [currentSet, workout],
  );

  const setRest = useCallback(
    (placedId: string, seconds: number) =>
      workout && currentSet && actions().updateExercise(workout.id, currentSet.id, placedId, { restSeconds: seconds }),
    [currentSet, workout],
  );

  const removeExercise = useCallback(
    (placedId: string) => {
      if (workout && currentSet) {
        actions().removeExercise(workout.id, currentSet.id, placedId);
      }
      setOptionsFor(null);
    },
    [currentSet, workout],
  );

  const reorder = useCallback(
    (orderedIds: string[]) => workout && currentSet && actions().reorderExercises(workout.id, currentSet.id, orderedIds),
    [currentSet, workout],
  );

  const move = useCallback(
    (from: ExerciseLocation, to: ExerciseTarget) => {
      if (!workout) {
        return;
      }
      actions().moveExercise(workout.id, from, to);
      setOptionsFor(null);
    },
    [workout],
  );

  const moveBy = useCallback(
    (placedId: string, delta: -1 | 1) => {
      if (!currentSet) {
        return;
      }
      const index = currentSet.exercises.findIndex((exercise) => exercise.id === placedId);
      const target = index + delta;
      if (index === -1 || target < 0 || target >= currentSet.exercises.length) {
        return;
      }
      move({ setId: currentSet.id, placedId }, { setId: currentSet.id, index: target });
    },
    [currentSet, move],
  );

  const moveToSet = useCallback(
    (placedId: string, toSetId: string) => {
      const target = workout?.sets.find((set) => set.id === toSetId);
      if (!currentSet || !target) {
        return;
      }
      move({ setId: currentSet.id, placedId }, { setId: toSetId, index: target.exercises.length });
    },
    [currentSet, move, workout],
  );

  const addSet = useCallback(() => {
    if (!workout) {
      return;
    }
    actions().addSet(workout.id);
    setSetSelection({ workoutId: workout.id, index: workout.sets.length });
  }, [workout]);

  const removeCurrentSet = useCallback(() => {
    if (!workout || !currentSet || workout.sets.length <= 1) {
      return;
    }
    actions().removeSet(workout.id, currentSet.id);
    setSetSelection({ workoutId: workout.id, index: Math.max(currentSetIndex - 1, 0) });
  }, [currentSet, currentSetIndex, workout]);

  const confirmClearSet = useCallback(() => {
    if (workout && currentSet) {
      actions().clearSet(workout.id, currentSet.id);
    }
    setClearing(false);
  }, [currentSet, workout]);

  const getShareUrl = useCallback(() => (workout ? shareUrl(window.location.origin, workout) : ''), [workout]);
  const share = useCopyLink(getShareUrl);

  const optionsExercise = currentSet?.exercises.find((exercise) => exercise.id === optionsFor) ?? null;

  return {
    workout,
    missing,
    summary,
    counts,
    placedIds,
    setFull,
    catalog,
    query,
    setQuery,
    currentSet,
    currentSetIndex,
    selectSet,
    flashId,
    nameValue,
    nameInputRef,
    changeName,
    commitName,
    focusName,
    sheetOpen,
    openSheet: () => setSheetOpen(true),
    closeSheet: () => setSheetOpen(false),
    addFromCatalog,
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
    removeCurrentSet,
    clearing,
    requestClearSet: () => setClearing(true),
    cancelClearSet: () => setClearing(false),
    confirmClearSet,
    optionsExercise,
    openOptions: setOptionsFor,
    closeOptions: () => setOptionsFor(null),
    share,
  };
}

export type BuilderApi = ReturnType<typeof useBuilder>;
