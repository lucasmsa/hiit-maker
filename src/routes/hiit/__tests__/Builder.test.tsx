import { fireEvent, screen, within } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';
import { hiitExample } from '@/data/hiit-example';
import { formatClock } from '@/lib/digits';
import { workoutTotalSeconds } from '@/lib/schedule';
import { initialLibraryState, useLibraryStore } from '@/stores/library';
import { installDialogPolyfill, renderHiitRoute } from '@/test/render-hiit-route';

const workoutId = hiitExample.id;

function currentWorkout() {
  const workout = useLibraryStore.getState().workouts.find((candidate) => candidate.id === workoutId);
  if (!workout) {
    throw new Error('example workout missing');
  }
  return workout;
}

function totalTimeText() {
  return screen.getAllByRole('timer', { name: 'Total time' })[0]?.textContent;
}

describe('HIIT builder', () => {
  beforeEach(() => {
    installDialogPolyfill();
    useLibraryStore.setState(initialLibraryState('en-US'));
  });

  it('shows the workout with its sets and total time', () => {
    renderHiitRoute(`/hiit/${workoutId}`);
    expect(screen.getByLabelText('Workout name')).toHaveValue('Full body starter');
    expect(screen.getByRole('region', { name: 'Set 1' })).toBeInTheDocument();
    expect(screen.getByRole('region', { name: 'Set 3' })).toBeInTheDocument();
    expect(totalTimeText()).toBe(formatClock(workoutTotalSeconds(hiitExample) * 1000));
  });

  it('adds a catalog tile to the current set and updates the total', () => {
    renderHiitRoute(`/hiit/${workoutId}`);
    const before = workoutTotalSeconds(currentWorkout());
    fireEvent.click(screen.getByRole('button', { name: /^Burpee/ }));

    const firstSet = currentWorkout().sets[0]!;
    expect(firstSet.exercises).toHaveLength(4);
    expect(firstSet.exercises[3]?.ref).toEqual({ kind: 'catalog', exerciseId: 'burpee' });
    expect(firstSet.exercises[3]?.trainSeconds).toBe(30);
    expect(workoutTotalSeconds(currentWorkout())).toBe(before + 3 * (30 + 15));
    expect(totalTimeText()).toBe(formatClock(workoutTotalSeconds(currentWorkout()) * 1000));
    expect(within(screen.getByRole('region', { name: 'Set 1' })).getByText('Burpee')).toBeInTheDocument();
  });

  it('adds to the set that was last focused', () => {
    renderHiitRoute(`/hiit/${workoutId}`);
    const thirdSet = screen.getByRole('region', { name: 'Set 3' });
    fireEvent.focus(within(thirdSet).getAllByLabelText('Train')[0]!);
    fireEvent.click(screen.getByRole('button', { name: /^Burpee/ }));
    expect(currentWorkout().sets[0]?.exercises).toHaveLength(3);
    expect(currentWorkout().sets[2]?.exercises).toHaveLength(4);
  });

  it('edits train and rest seconds through the fields', () => {
    renderHiitRoute(`/hiit/${workoutId}`);
    const firstSet = screen.getByRole('region', { name: 'Set 1' });
    fireEvent.change(within(firstSet).getAllByLabelText('Train')[0]!, { target: { value: '45' } });
    fireEvent.change(within(firstSet).getAllByLabelText('Rest')[0]!, { target: { value: '20' } });
    expect(currentWorkout().sets[0]?.exercises[0]).toMatchObject({ trainSeconds: 45, restSeconds: 20 });
  });

  it('removes an exercise, moves one, and adds or removes sets', () => {
    renderHiitRoute(`/hiit/${workoutId}`);
    fireEvent.click(screen.getByRole('button', { name: 'Remove: Push-up' }));
    expect(currentWorkout().sets[0]?.exercises.map((placed) => placed.ref)).toEqual([
      { kind: 'catalog', exerciseId: 'squat' },
      { kind: 'catalog', exerciseId: 'plank' },
    ]);

    fireEvent.click(screen.getByRole('button', { name: 'Move down: Squat' }));
    expect(currentWorkout().sets[0]?.exercises.map((placed) => placed.ref)).toEqual([
      { kind: 'catalog', exerciseId: 'plank' },
      { kind: 'catalog', exerciseId: 'squat' },
    ]);

    fireEvent.click(screen.getByRole('button', { name: 'Add set' }));
    expect(currentWorkout().sets).toHaveLength(4);
    expect(screen.getByRole('region', { name: 'Set 4' })).toHaveAttribute('aria-current', 'true');

    fireEvent.click(within(screen.getByRole('region', { name: 'Set 4' })).getByRole('button', { name: 'Remove set' }));
    expect(currentWorkout().sets).toHaveLength(3);
  });

  it('moves an exercise to another set', () => {
    renderHiitRoute(`/hiit/${workoutId}`);
    const firstSet = screen.getByRole('region', { name: 'Set 1' });
    const select = within(firstSet).getAllByRole('combobox', { name: 'Move to set' })[0]!;
    fireEvent.change(select, { target: { value: hiitExample.sets[1]!.id } });
    expect(currentWorkout().sets[0]?.exercises).toHaveLength(2);
    expect(currentWorkout().sets[1]?.exercises.map((placed) => placed.ref)).toContainEqual({
      kind: 'catalog',
      exerciseId: 'push-up',
    });
  });

  it('filters the catalog by name and group', () => {
    renderHiitRoute(`/hiit/${workoutId}`);
    const search = screen.getByLabelText('Search exercise or muscle');
    fireEvent.change(search, { target: { value: 'cardio' } });
    expect(screen.getByRole('button', { name: /^Burpee/ })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /^Squat/ })).not.toBeInTheDocument();
    fireEvent.change(search, { target: { value: 'zzz' } });
    expect(screen.getByText('No exercise matches "zzz".')).toBeInTheDocument();
  });

  it('explains when the workout does not exist', () => {
    renderHiitRoute('/hiit/missing');
    expect(screen.getByText('This workout is not on this device.')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'All workouts' })).toHaveAttribute('href', '/hiit');
  });
});
