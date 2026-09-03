import { screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeAll, beforeEach, describe, expect, it } from 'vitest';
import { gymTemplate } from '@/data/gym-template';
import { initialLibraryState, useLibraryStore } from '@/stores/library';
import { installDialogPolyfill, renderGymAt } from './harness';

beforeAll(installDialogPolyfill);

beforeEach(() => {
  useLibraryStore.setState(initialLibraryState('en'));
});

describe('gym library', () => {
  it('lists the seeded template with its day and exercise counts', () => {
    renderGymAt('/gym');
    expect(screen.getByRole('link', { name: gymTemplate.name })).toBeInTheDocument();
    expect(screen.getByText(/5 days, 22 exercises/)).toBeInTheDocument();
    expect(screen.getByText(/No sessions yet/)).toBeInTheDocument();
  });

  it('creates a routine and opens its plan', async () => {
    const user = userEvent.setup();
    const { router } = renderGymAt('/gym');
    await user.click(screen.getByRole('button', { name: 'New routine' }));
    const created = useLibraryStore
      .getState()
      .routines.find((routine) => routine.id !== gymTemplate.id);
    expect(created).toMatchObject({ name: 'Untitled routine' });
    expect(created?.days).toHaveLength(1);
    expect(router.state.location.pathname).toBe(`/gym/${created?.id}`);
  });

  it('renames inline and deletes after confirmation', async () => {
    const user = userEvent.setup();
    renderGymAt('/gym');
    await user.click(screen.getByRole('button', { name: 'Rename' }));
    const input = screen.getByRole('textbox', { name: 'Rename' });
    await user.clear(input);
    await user.type(input, 'Upper / Lower{Enter}');
    expect(useLibraryStore.getState().routines[0]?.name).toBe('Upper / Lower');

    await user.click(screen.getByRole('button', { name: 'Delete' }));
    const dialog = screen.getByRole('dialog', { hidden: true });
    await user.click(within(dialog).getByRole('button', { name: 'Delete' }));
    expect(useLibraryStore.getState().routines).toHaveLength(0);
    expect(screen.getByText(/No routines yet/)).toBeInTheDocument();
  });
});
