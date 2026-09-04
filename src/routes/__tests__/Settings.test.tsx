import { beforeEach, describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryRouter, RouterProvider } from 'react-router';
import { Settings } from '@/routes/Settings';
import { hiitExample } from '@/data/hiit-example';
import { LIBRARY_STORAGE_KEY, initialLibraryState, useLibraryStore } from '@/stores/library';
import { RUN_STORAGE_KEY, useRunStore } from '@/stores/run';

function renderSettings() {
  const router = createMemoryRouter(
    [
      { path: '/settings', element: <Settings /> },
      { path: '/', element: <h1>builder</h1> },
      { path: '/', element: <h1>splash</h1> },
    ],
    { initialEntries: ['/settings'] },
  );
  render(<RouterProvider router={router} />);
  return router;
}

beforeEach(() => {
  useLibraryStore.setState(initialLibraryState('en'));
  useRunStore.setState({ session: null });
});

describe('Settings', () => {
  it('switches the language right away and persists it', async () => {
    const user = userEvent.setup();
    renderSettings();

    await user.click(screen.getByRole('button', { name: 'Português (Brasil)' }));

    expect(useLibraryStore.getState().settings.language).toBe('pt-BR');
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Configurações');
    const persisted = JSON.parse(localStorage.getItem(LIBRARY_STORAGE_KEY) ?? '{}') as {
      state: { settings: { language: string } };
    };
    expect(persisted.state.settings.language).toBe('pt-BR');
  });

  it('keeps default edits in a draft until Save changes, clamped to the bound', async () => {
    const user = userEvent.setup();
    renderSettings();

    const save = screen.getByRole('button', { name: 'Save changes' });
    expect(save).toBeDisabled();

    const warmup = screen.getByLabelText('Warm-up');
    await user.clear(warmup);
    await user.type(warmup, '5000');

    expect(useLibraryStore.getState().settings.defaults.warmupSeconds).toBe(90);
    expect(save).toBeEnabled();

    await user.click(save);

    expect(useLibraryStore.getState().settings.defaults.warmupSeconds).toBe(600);
    expect(save).toBeDisabled();
  });

  it('restores the defaults into the draft and asks before leaving with unsaved edits', async () => {
    const user = userEvent.setup();
    useLibraryStore.getState().updateSettings({ defaults: { warmupSeconds: 45 } });
    const router = renderSettings();

    await user.click(screen.getByRole('button', { name: 'Restore settings' }));
    expect(screen.getByLabelText('Warm-up')).toHaveValue(90);
    expect(useLibraryStore.getState().settings.defaults.warmupSeconds).toBe(45);

    await user.click(screen.getByRole('button', { name: 'Back' }));
    expect(screen.getByRole('heading', { name: 'Discard changes?' })).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Discard' }));
    expect(router.state.location.pathname).toBe('/');
    expect(useLibraryStore.getState().settings.defaults.warmupSeconds).toBe(45);
  });

  it('deletes all data after confirmation and returns to the builder', async () => {
    const user = userEvent.setup();
    useLibraryStore.getState().createWorkout('Doomed');
    expect(useLibraryStore.getState().workouts).toHaveLength(2);
    const router = renderSettings();

    await user.click(screen.getByRole('button', { name: 'Delete all data' }));
    await user.click(screen.getByRole('button', { name: 'Delete everything' }));

    const state = useLibraryStore.getState();
    expect(state.workouts.map((workout) => workout.id)).toEqual([hiitExample.id]);
    expect(localStorage.getItem(LIBRARY_STORAGE_KEY)).toBeNull();
    expect(localStorage.getItem(RUN_STORAGE_KEY)).toBeNull();
    expect(router.state.location.pathname).toBe('/');
  });
});
