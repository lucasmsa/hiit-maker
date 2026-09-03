import { screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeAll, beforeEach, describe, expect, it } from 'vitest';
import { gymTemplate } from '@/data/gym-template';
import type { GymSessionLog } from '@/lib/types';
import { useGymSessionStore } from '@/stores/gym-session';
import { initialLibraryState, useLibraryStore } from '@/stores/library';
import { useRunStore } from '@/stores/run';
import { installDialogPolyfill, renderGymAt } from './harness';

beforeAll(installDialogPolyfill);

const pushDay = gymTemplate.days.find((day) => day.name === 'Push')!;
const inclinePress = pushDay.entries[0]!;

const previousSession: GymSessionLog = {
  id: 'previous',
  routineId: gymTemplate.id,
  dayId: pushDay.id,
  startedAt: Date.UTC(2026, 8, 1, 10),
  finishedAt: Date.UTC(2026, 8, 1, 11),
  entries: {
    [inclinePress.id]: [
      { done: true, at: 1, weightKg: 30, reps: 10 },
      { done: true, at: 2, weightKg: 32.5, reps: 8 },
    ],
  },
};

beforeEach(() => {
  useLibraryStore.setState({ ...initialLibraryState('en'), logs: [previousSession] });
  useGymSessionStore.setState({ active: null });
  useRunStore.setState({ session: null });
});

describe('gym session', () => {
  it('picks a day, prefills last values, logs a set with a rest timer and finishes', async () => {
    const user = userEvent.setup();
    renderGymAt(`/gym/${gymTemplate.id}/run`);

    expect(screen.getByRole('heading', { name: 'Which day?' })).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: /^Push/ }));

    const active = useGymSessionStore.getState().active;
    expect(active).toMatchObject({ routineId: gymTemplate.id, dayId: pushDay.id });

    const section = screen.getByRole('region', { name: 'Incline dumbbell press' });
    expect(within(section).getByLabelText('Weight for set 1')).toHaveValue(30);
    expect(within(section).getByLabelText('Reps for set 2')).toHaveValue(8);
    expect(within(section).getByText('Last time 30 kg x 10 reps')).toBeInTheDocument();

    await user.clear(within(section).getByLabelText('Weight for set 1'));
    await user.type(within(section).getByLabelText('Weight for set 1'), '35');
    await user.click(within(section).getByRole('button', { name: 'Mark set 1 done' }));

    const log = useLibraryStore.getState().logs.find((item) => item.id === active?.logId)!;
    expect(log.entries[inclinePress.id]?.[0]).toMatchObject({ done: true, weightKg: 35, reps: 10 });
    expect(useRunStore.getState().session).toMatchObject({ kind: 'rest', status: 'running' });
    expect(screen.getByRole('status')).toHaveTextContent('Rest');
    expect(within(section).getByLabelText('Weight for set 1')).toBeDisabled();

    await user.click(screen.getByRole('button', { name: 'Skip rest' }));
    expect(useRunStore.getState().session).toBeNull();

    await user.click(within(section).getByRole('button', { name: 'Undo set 1' }));
    expect(
      useLibraryStore.getState().logs.find((item) => item.id === log.id)?.entries[
        inclinePress.id
      ]?.[0]?.done,
    ).toBe(false);
    await user.click(within(section).getByRole('button', { name: 'Mark set 1 done' }));

    await user.click(screen.getByRole('button', { name: 'Finish session' }));
    const dialog = screen.getByRole('dialog', { hidden: true });
    expect(within(dialog).getByText(/1 sets logged/)).toBeInTheDocument();
    await user.click(within(dialog).getByRole('button', { name: 'Finish session' }));

    const finished = useLibraryStore.getState().logs.find((item) => item.id === log.id)!;
    expect(finished.finishedAt).toBeDefined();
    expect(useGymSessionStore.getState().active).toBeNull();
    expect(screen.getByRole('heading', { name: 'Session complete' })).toBeInTheDocument();
    expect(screen.getByText('350 kg')).toBeInTheDocument();
  });

  it('adds an extra set row beyond the prescription', async () => {
    const user = userEvent.setup();
    renderGymAt(`/gym/${gymTemplate.id}/run`);
    await user.click(screen.getByRole('button', { name: /^Push/ }));
    const section = screen.getByRole('region', { name: 'Incline dumbbell press' });
    expect(within(section).queryByLabelText('Weight for set 4')).not.toBeInTheDocument();
    await user.click(within(section).getByRole('button', { name: 'Add set' }));
    expect(within(section).getByLabelText('Weight for set 4')).toBeInTheDocument();
  });

  it('resumes an unfinished session after a reload', () => {
    const logId = useLibraryStore.getState().startSession(gymTemplate.id, pushDay.id);
    useGymSessionStore.setState({
      active: { logId, routineId: gymTemplate.id, dayId: pushDay.id },
    });
    renderGymAt(`/gym/${gymTemplate.id}/run`);
    expect(screen.queryByRole('heading', { name: 'Which day?' })).not.toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Push', level: 1 })).toBeInTheDocument();
  });
});
