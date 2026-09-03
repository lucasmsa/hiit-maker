import { fireEvent, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';
import { hiitExample } from '@/data/hiit-example';
import { encodeWorkoutShare } from '@/lib/share';
import { initialLibraryState, useLibraryStore } from '@/stores/library';
import { renderHiitRoute } from '@/test/render-hiit-route';

describe('shared workout route', () => {
  beforeEach(() => {
    useLibraryStore.setState({ ...initialLibraryState('en-US'), workouts: [] });
  });

  it('decodes a valid hash and saves the workout to the library', () => {
    const { router } = renderHiitRoute(`/hiit/shared#${encodeWorkoutShare(hiitExample)}`);
    expect(screen.getByRole('heading', { name: 'Full body starter' })).toBeInTheDocument();
    expect(screen.getByText('Push-up')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Save to library' }));
    const workouts = useLibraryStore.getState().workouts;
    expect(workouts).toHaveLength(1);
    expect(workouts[0]?.name).toBe('Full body starter');
    expect(workouts[0]?.id).not.toBe(hiitExample.id);
    expect(router.state.location.pathname).toBe('/hiit');
  });

  it('opens the imported workout in the builder', () => {
    const { router } = renderHiitRoute(`/hiit/shared#${encodeWorkoutShare(hiitExample)}`);
    fireEvent.click(screen.getByRole('button', { name: 'Open' }));
    const imported = useLibraryStore.getState().workouts[0];
    expect(router.state.location.pathname).toBe(`/hiit/${imported?.id}`);
  });

  it('rejects an invalid hash with a way back', () => {
    renderHiitRoute('/hiit/shared#not-a-workout');
    expect(screen.getByText('This link does not contain a valid workout.')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Go to your workouts' })).toHaveAttribute('href', '/hiit');
    expect(useLibraryStore.getState().workouts).toHaveLength(0);
  });
});
