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

const firstDay = () => useLibraryStore.getState().routines[0]!.days[0]!;

describe('gym plan', () => {
  it('renders every day of the template', () => {
    renderGymAt(`/gym/${gymTemplate.id}`);
    for (const day of gymTemplate.days) {
      expect(screen.getByRole('heading', { name: day.name })).toBeInTheDocument();
    }
    expect(
      screen.getByRole('button', { name: 'Edit exercise: Banded W rotation' }),
    ).toBeInTheDocument();
  });

  it('adds a catalog exercise through the dialog', async () => {
    const user = userEvent.setup();
    renderGymAt(`/gym/${gymTemplate.id}`);
    const before = firstDay().entries.length;

    await user.click(screen.getAllByRole('button', { name: 'Add exercise' })[0]!);
    const dialog = screen.getByRole('dialog', { hidden: true, name: 'Add exercise' });
    await user.type(within(dialog).getByRole('textbox', { name: 'Search the catalog' }), 'squat');
    await user.click(within(dialog).getByRole('button', { name: 'Squat' }));
    await user.click(within(dialog).getByRole('button', { name: 'Save' }));

    const entries = firstDay().entries;
    expect(entries).toHaveLength(before + 1);
    expect(entries.at(-1)?.ref).toEqual({ kind: 'catalog', exerciseId: 'squat' });
    expect(entries.at(-1)?.prescription.sets).toEqual({ min: 3, max: 3 });
  });

  it('adds a custom exercise typed into the search box', async () => {
    const user = userEvent.setup();
    renderGymAt(`/gym/${gymTemplate.id}`);
    await user.click(screen.getAllByRole('button', { name: 'Add exercise' })[0]!);
    const dialog = screen.getByRole('dialog', { hidden: true, name: 'Add exercise' });
    await user.type(
      within(dialog).getByRole('textbox', { name: 'Search the catalog' }),
      'Sled push',
    );
    await user.click(
      within(dialog).getByRole('button', { name: 'Use "Sled push" as a custom exercise' }),
    );
    await user.click(within(dialog).getByRole('button', { name: 'Save' }));
    expect(firstDay().entries.at(-1)?.ref).toEqual({ kind: 'custom', name: 'Sled push' });
  });

  it('edits a prescription and clears optional fields', async () => {
    const user = userEvent.setup();
    renderGymAt(`/gym/${gymTemplate.id}`);
    await user.click(screen.getByRole('button', { name: 'Edit exercise: Banded W rotation' }));
    const dialog = screen.getByRole('dialog', { hidden: true, name: 'Banded W rotation' });
    expect(within(dialog).getByRole('heading', { name: 'Banded W rotation' })).toBeInTheDocument();

    await user.click(within(dialog).getAllByRole('button', { name: 'Increase' })[0]!);
    await user.clear(within(dialog).getByRole('textbox', { name: 'Tempo' }));
    await user.click(within(dialog).getByRole('switch', { name: 'Per side' }));
    await user.click(within(dialog).getByRole('button', { name: 'Save' }));

    const entry = firstDay().entries[0]!;
    expect(entry.prescription.sets).toEqual({ min: 3, max: 3 });
    expect(entry.prescription.tempo).toBeUndefined();
    expect(entry.prescription.perSide).toBe(true);
  });

  it('removes an exercise from the dialog and moves entries with the keyboard buttons', async () => {
    const user = userEvent.setup();
    renderGymAt(`/gym/${gymTemplate.id}`);
    const [first, second] = firstDay().entries;

    await user.click(screen.getAllByRole('button', { name: 'Move down' })[0]!);
    expect(firstDay().entries[0]?.id).toBe(second?.id);
    expect(firstDay().entries[1]?.id).toBe(first?.id);

    await user.click(screen.getByRole('button', { name: 'Edit exercise: Banded W rotation' }));
    const dialog = screen.getByRole('dialog', { hidden: true, name: 'Banded W rotation' });
    await user.click(within(dialog).getByRole('button', { name: 'Remove exercise' }));
    expect(firstDay().entries.some((entry) => entry.id === first?.id)).toBe(false);
  });

  it('adds a day and asks before removing one that has exercises', async () => {
    const user = userEvent.setup();
    renderGymAt(`/gym/${gymTemplate.id}`);
    await user.click(screen.getByRole('button', { name: 'Add day' }));
    expect(useLibraryStore.getState().routines[0]?.days).toHaveLength(6);

    await user.click(screen.getAllByRole('button', { name: 'Remove day' })[0]!);
    const dialog = screen.getByRole('dialog', { hidden: true, name: 'Remove day?' });
    expect(within(dialog).getByText(/"Warm-up" has 3 exercises/)).toBeInTheDocument();
    await user.click(within(dialog).getByRole('button', { name: 'Remove day' }));
    expect(useLibraryStore.getState().routines[0]?.days[0]?.name).toBe('Push');
  });
});
