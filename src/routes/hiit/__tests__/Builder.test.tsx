import { fireEvent, screen, within } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';
import { hiitExample } from '@/data/hiit-example';
import { formatClock } from '@/lib/digits';
import { workoutTotalSeconds } from '@/lib/schedule';
import { initialLibraryState, useLibraryStore } from '@/stores/library';
import { installDialogPolyfill, renderHiitRoute } from '@/test/render-hiit-route';

const workoutId = hiitExample.id;

function currentWorkout() {
  const workout = useLibraryStore
    .getState()
    .workouts.find((candidate) => candidate.id === workoutId);
  if (!workout) {
    throw new Error('example workout missing');
  }
  return workout;
}

function totalTimeText() {
  return screen.getAllByRole('timer', { name: 'Total time' })[0]?.textContent;
}

function setCard(n: number) {
  return screen.getByRole('region', { name: `Set ${n}` });
}

function openOptions(name: string) {
  fireEvent.click(screen.getByRole('button', { name: `Options for ${name}` }));
  return screen.getByRole('dialog', { name: `Options for ${name}` });
}

describe('HIIT builder', () => {
  beforeEach(() => {
    installDialogPolyfill();
    useLibraryStore.setState(initialLibraryState('en-US'));
  });

  it('opens the current workout at /hiit and remembers it', () => {
    renderHiitRoute('/hiit');
    expect(screen.getByLabelText('Workout name')).toHaveValue('Full body starter');
    expect(setCard(1)).toBeInTheDocument();
    expect(screen.queryByRole('region', { name: 'Set 2' })).not.toBeInTheDocument();
    expect(useLibraryStore.getState().lastWorkoutId).toBe(workoutId);
    expect(totalTimeText()).toBe(formatClock(workoutTotalSeconds(hiitExample) * 1000));
  });

  it('creates a workout when none is saved', () => {
    useLibraryStore.setState({ ...initialLibraryState('en-US'), workouts: [] });
    renderHiitRoute('/hiit');
    expect(screen.getByLabelText('Workout name')).toHaveValue('Untitled workout');
    expect(useLibraryStore.getState().workouts).toHaveLength(1);
  });

  it('lets the name be cleared while typing and restores a name on blur', () => {
    renderHiitRoute(`/hiit/${workoutId}`);
    const name = screen.getByLabelText('Workout name');
    fireEvent.change(name, { target: { value: '' } });
    expect(name).toHaveValue('');
    expect(currentWorkout().name).toBe('Full body starter');
    fireEvent.change(name, { target: { value: 'Tuesday' } });
    expect(currentWorkout().name).toBe('Tuesday');
    fireEvent.change(name, { target: { value: '' } });
    fireEvent.blur(name);
    expect(currentWorkout().name).toBe('Untitled workout');
    expect(name).toHaveValue('Untitled workout');
  });

  it('adds a catalog tile to the visible set and updates the total', () => {
    renderHiitRoute(`/hiit/${workoutId}`);
    const before = workoutTotalSeconds(currentWorkout());
    fireEvent.click(screen.getByRole('button', { name: 'Burpee' }));

    const firstSet = currentWorkout().sets[0]!;
    expect(firstSet.exercises).toHaveLength(4);
    expect(firstSet.exercises[3]?.ref).toEqual({ kind: 'catalog', exerciseId: 'burpee' });
    expect(workoutTotalSeconds(currentWorkout())).toBe(before + 3 * (30 + 15));
    expect(totalTimeText()).toBe(formatClock(workoutTotalSeconds(currentWorkout()) * 1000));
    expect(within(setCard(1)).getByText('Burpee')).toBeInTheDocument();
  });

  it('switches sets with the stepper and adds to the chosen one', () => {
    renderHiitRoute(`/hiit/${workoutId}`);
    fireEvent.click(screen.getByRole('button', { name: 'Set 3' }));
    expect(setCard(3)).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Burpee' }));
    expect(currentWorkout().sets[0]?.exercises).toHaveLength(3);
    expect(currentWorkout().sets[2]?.exercises).toHaveLength(4);
  });

  it('edits train, rest and set rest through the pills', () => {
    renderHiitRoute(`/hiit/${workoutId}`);
    const card = setCard(1);
    fireEvent.change(within(card).getAllByLabelText('Train')[0]!, { target: { value: '45' } });
    fireEvent.change(within(card).getAllByLabelText('Rest')[0]!, { target: { value: '20' } });
    fireEvent.change(within(card).getByLabelText('Set rest'), { target: { value: '90' } });
    expect(currentWorkout().sets[0]?.exercises[0]).toMatchObject({
      trainSeconds: 45,
      restSeconds: 20,
    });
    expect(currentWorkout().sets[0]?.setRestSeconds).toBe(90);
  });

  it('changes set repetitions from the black bar', () => {
    renderHiitRoute(`/hiit/${workoutId}`);
    fireEvent.click(screen.getByRole('button', { name: 'One more set repetition' }));
    expect(currentWorkout().sets[0]?.loops).toBe(hiitExample.sets[0]!.loops + 1);
    fireEvent.click(screen.getByRole('button', { name: 'One less set repetition' }));
    expect(currentWorkout().sets[0]?.loops).toBe(hiitExample.sets[0]!.loops);
  });

  it('removes and reorders exercises through the row actions', () => {
    renderHiitRoute(`/hiit/${workoutId}`);
    fireEvent.click(screen.getByRole('button', { name: 'Remove: Push-up' }));
    expect(currentWorkout().sets[0]?.exercises.map((placed) => placed.ref)).toEqual([
      { kind: 'catalog', exerciseId: 'squat' },
      { kind: 'catalog', exerciseId: 'plank' },
    ]);

    fireEvent.click(within(openOptions('Squat')).getByRole('button', { name: 'Move down' }));
    expect(currentWorkout().sets[0]?.exercises.map((placed) => placed.ref)).toEqual([
      { kind: 'catalog', exerciseId: 'plank' },
      { kind: 'catalog', exerciseId: 'squat' },
    ]);
  });

  it('moves an exercise to another set', () => {
    renderHiitRoute(`/hiit/${workoutId}`);
    fireEvent.click(within(openOptions('Push-up')).getByRole('button', { name: 'Move to Set 2' }));
    expect(currentWorkout().sets[0]?.exercises).toHaveLength(2);
    expect(currentWorkout().sets[1]?.exercises.map((placed) => placed.ref)).toContainEqual({
      kind: 'catalog',
      exerciseId: 'push-up',
    });
  });

  it('adds and removes sets from the stepper and clears a set', () => {
    renderHiitRoute(`/hiit/${workoutId}`);
    fireEvent.click(screen.getByRole('button', { name: 'Add set' }));
    expect(currentWorkout().sets).toHaveLength(4);
    expect(setCard(4)).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Remove set' }));
    expect(currentWorkout().sets).toHaveLength(3);
    expect(setCard(3)).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Clear set: Set 3' }));
    fireEvent.click(
      within(screen.getByRole('dialog', { name: 'Clear Set 3?' })).getByRole('button', {
        name: 'Clear set',
      }),
    );
    expect(currentWorkout().sets[2]?.exercises).toHaveLength(0);
  });

  it('filters the catalog by name and group without moving other groups', () => {
    renderHiitRoute(`/hiit/${workoutId}`);
    const search = screen.getAllByLabelText('Search exercise or muscle')[0]!;
    fireEvent.change(search, { target: { value: 'cardio' } });
    expect(screen.getByRole('button', { name: 'Burpee' })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Squat' })).not.toBeInTheDocument();
    fireEvent.change(search, { target: { value: 'zzz' } });
    expect(screen.getByText('No exercise matches "zzz".')).toBeInTheDocument();
  });

  it('switches, creates, duplicates and deletes workouts from the switcher', () => {
    const { router } = renderHiitRoute(`/hiit/${workoutId}`);
    fireEvent.click(screen.getByRole('button', { name: 'Workouts' }));
    const dialog = screen.getByRole('dialog', { name: 'Workouts' });
    expect(within(dialog).getByText('Full body starter')).toBeInTheDocument();
    expect(within(dialog).getByText('Current')).toBeInTheDocument();

    fireEvent.click(within(dialog).getByRole('button', { name: 'Duplicate' }));
    const workouts = useLibraryStore.getState().workouts;
    expect(workouts).toHaveLength(2);
    expect(workouts[0]?.name).toBe('Full body starter copy');
    expect(router.state.location.pathname).toBe(`/hiit/${workouts[0]?.id}`);

    fireEvent.click(screen.getByRole('button', { name: 'Workouts' }));
    fireEvent.click(
      within(screen.getByRole('dialog', { name: 'Workouts' })).getByRole('button', {
        name: 'New workout',
      }),
    );
    expect(useLibraryStore.getState().workouts).toHaveLength(3);
    expect(screen.getByLabelText('Workout name')).toHaveValue('Untitled workout');

    fireEvent.click(screen.getByRole('button', { name: 'Workouts' }));
    const currentRow = within(screen.getByRole('dialog', { name: 'Workouts' }))
      .getAllByRole('listitem')
      .find((row) => row.getAttribute('aria-current') === 'true')!;
    fireEvent.click(within(currentRow).getByRole('button', { name: 'Delete' }));
    fireEvent.click(
      within(screen.getByRole('dialog', { name: 'Delete this workout?' })).getByRole('button', {
        name: 'Delete',
      }),
    );
    expect(useLibraryStore.getState().workouts).toHaveLength(2);
    expect(router.state.location.pathname).toBe('/hiit');
  });

  it('explains when the workout does not exist', () => {
    renderHiitRoute('/hiit/missing');
    expect(screen.getByText('This workout is not on this device.')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Go to your workouts' })).toHaveAttribute(
      'href',
      '/hiit',
    );
  });
});
