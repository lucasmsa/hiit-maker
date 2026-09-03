import { fireEvent, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';
import { initialLibraryState, useLibraryStore } from '@/stores/library';
import { installDialogPolyfill, renderHiitRoute } from '@/test/render-hiit-route';

describe('HIIT library', () => {
  beforeEach(() => {
    installDialogPolyfill();
    useLibraryStore.setState(initialLibraryState('en-US'));
  });

  it('lists the seeded example with its set count and total time', () => {
    renderHiitRoute('/hiit');
    expect(screen.getByRole('link', { name: 'Full body starter' })).toBeInTheDocument();
    expect(screen.getByText('3 sets')).toBeInTheDocument();
    expect(screen.getByText('9 exercises')).toBeInTheDocument();
    expect(screen.getByText('23:45')).toBeInTheDocument();
  });

  it('creates a workout from the defaults and opens its builder', () => {
    const { router } = renderHiitRoute('/hiit');
    fireEvent.click(screen.getByRole('button', { name: 'New workout' }));
    const workouts = useLibraryStore.getState().workouts;
    expect(workouts).toHaveLength(2);
    expect(workouts[0]?.name).toBe('Untitled workout');
    expect(workouts[0]?.sets).toHaveLength(1);
    expect(router.state.location.pathname).toBe(`/hiit/${workouts[0]?.id}`);
  });

  it('duplicates and renames a workout in place', () => {
    renderHiitRoute('/hiit');
    fireEvent.click(screen.getByRole('button', { name: 'Duplicate' }));
    expect(useLibraryStore.getState().workouts.map((workout) => workout.name)).toEqual([
      'Full body starter copy',
      'Full body starter',
    ]);

    fireEvent.click(screen.getAllByRole('button', { name: 'Rename' })[0]!);
    const input = screen.getByLabelText('Workout name');
    fireEvent.change(input, { target: { value: 'Monday burner' } });
    fireEvent.submit(input.closest('form')!);
    expect(useLibraryStore.getState().workouts[0]?.name).toBe('Monday burner');
  });

  it('deletes a workout after confirming and shows the empty state', () => {
    renderHiitRoute('/hiit');
    fireEvent.click(screen.getByRole('button', { name: 'Delete' }));
    expect(screen.getByRole('heading', { name: 'Delete this workout?' })).toBeInTheDocument();
    fireEvent.click(screen.getAllByRole('button', { name: 'Delete' }).at(-1)!);
    expect(useLibraryStore.getState().workouts).toHaveLength(0);
    expect(screen.getByText('No workouts yet. Build your first one.')).toBeInTheDocument();
  });
});
