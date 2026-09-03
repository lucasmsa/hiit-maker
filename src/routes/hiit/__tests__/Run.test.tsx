import { act, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { RouterProvider, createMemoryRouter } from 'react-router';
import { hiitExample } from '@/data/hiit-example';
import { formatClock } from '@/lib/digits';
import { scheduleDurationMs, startRun, type RunSession } from '@/lib/run-clock';
import { setsInSchedule } from '@/lib/run-view';
import { compileHiitSchedule } from '@/lib/schedule';
import { initialLibraryState, useLibraryStore } from '@/stores/library';
import { useRunStore } from '@/stores/run';
import { HiitRun } from '@/routes/hiit/Run';

const T0 = 1_700_000_000_000;
const schedule = compileHiitSchedule(hiitExample);
const totalClock = formatClock(scheduleDurationMs(schedule));
const setCount = setsInSchedule(schedule);
const firstSetLoops = hiitExample.sets[0]!.loops;

function renderRun(id = hiitExample.id) {
  const router = createMemoryRouter(
    [
      { path: '/hiit', element: <div>library</div> },
      { path: '/hiit/:id', element: <div>builder</div> },
      { path: '/hiit/:id/run', element: <HiitRun /> },
    ],
    { initialEntries: [`/hiit/${id}/run`] },
  );
  render(<RouterProvider router={router} />);
  return router;
}

function session(overrides: Partial<RunSession> = {}): RunSession {
  return { ...startRun({ kind: 'hiit', schedule, workoutId: hiitExample.id }, T0), ...overrides };
}

function timerText(): string {
  return screen.getByRole('timer').textContent ?? '';
}

function advance(ms: number) {
  act(() => {
    vi.advanceTimersByTime(ms);
  });
}

beforeEach(() => {
  vi.useFakeTimers();
  vi.setSystemTime(T0);
  vi.stubGlobal('matchMedia', () => ({
    matches: false,
    addEventListener: () => undefined,
    removeEventListener: () => undefined,
    addListener: () => undefined,
    removeListener: () => undefined,
  }));
  HTMLDialogElement.prototype.showModal = function showModal() {
    this.setAttribute('open', '');
  };
  HTMLDialogElement.prototype.close = function close() {
    this.removeAttribute('open');
  };
  useRunStore.setState({ session: null });
  useLibraryStore.setState(initialLibraryState('en-US'));
});

afterEach(() => {
  vi.useRealTimers();
  vi.unstubAllGlobals();
});

describe('HiitRun start screen', () => {
  it('shows the workout summary and starts a run on the warm-up', () => {
    renderRun();
    expect(screen.getByRole('heading', { name: hiitExample.name })).toBeInTheDocument();
    expect(timerText()).toBe(totalClock);
    expect(screen.getByText(`${setCount} sets`)).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Start workout' }));

    expect(screen.getByText('WARM-UP TIME')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'WARM-UP' })).toBeInTheDocument();
    expect(screen.getByText(`${firstSetLoops} SET REPETITIONS LEFT`)).toBeInTheDocument();
    expect(timerText()).toBe('01:30');
    expect(useRunStore.getState().session).toMatchObject({ workoutId: hiitExample.id, status: 'running' });
  });

  it('shows a way out when the workout does not exist', () => {
    const router = renderRun('missing-id');
    expect(screen.getByText('This workout does not exist.')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Back to library' }));
    expect(router.state.location.pathname).toBe('/hiit');
  });
});

describe('HiitRun live controls', () => {
  it('counts down, pauses, resumes and toggles with Space', () => {
    renderRun();
    fireEvent.click(screen.getByRole('button', { name: 'Start workout' }));
    advance(2_000);
    expect(timerText()).toBe('01:28');

    fireEvent.click(screen.getByRole('button', { name: 'Pause' }));
    advance(5_000);
    expect(timerText()).toBe('01:28');
    expect(screen.getByRole('button', { name: 'Resume' })).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Resume' }));
    advance(1_000);
    expect(timerText()).toBe('01:27');

    fireEvent.keyDown(window, { code: 'Space' });
    expect(screen.getByRole('button', { name: 'Resume' })).toBeInTheDocument();
    fireEvent.keyDown(window, { code: 'Space' });
    expect(screen.getByRole('button', { name: 'Pause' })).toBeInTheDocument();
  });

  it('skips to the first exercise and steps back to the warm-up', () => {
    renderRun();
    fireEvent.click(screen.getByRole('button', { name: 'Start workout' }));
    fireEvent.click(screen.getByRole('button', { name: 'Skip' }));

    expect(screen.getByText('TRAIN TIME')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Push-up/ })).toBeInTheDocument();
    expect(screen.getByText(`Set 1/${setCount}`)).toBeInTheDocument();
    expect(screen.getByText(`${firstSetLoops - 1} SET REPETITIONS LEFT`)).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'Push-up' })).toBeInTheDocument();
    expect(timerText()).toBe('00:30');

    fireEvent.click(screen.getByRole('button', { name: 'Back' }));
    expect(screen.getByText('WARM-UP TIME')).toBeInTheDocument();
    expect(timerText()).toBe('01:30');
  });

  it('announces the next exercise during rest', () => {
    useRunStore.setState({ session: session({ phaseIndex: 2, phaseStartedAt: T0 }) });
    renderRun();
    expect(screen.getByText('REST TIME', { selector: '.run-label' })).toBeInTheDocument();
    expect(screen.getByText('Next: Squat')).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'Squat' })).toBeInTheDocument();
    expect(screen.getAllByText('Squat', { selector: '.run-upcoming-name' }).length).toBeGreaterThan(0);
    expect(screen.getByRole('region', { name: 'PROGRESS' })).toBeInTheDocument();
  });

  it('stops after confirmation and returns to the builder', () => {
    const router = renderRun();
    fireEvent.click(screen.getByRole('button', { name: 'Start workout' }));
    fireEvent.click(screen.getByRole('button', { name: 'Stop' }));
    fireEvent.click(screen.getByRole('button', { name: 'Stop workout' }));
    expect(useRunStore.getState().session).toBeNull();
    expect(router.state.location.pathname).toBe(`/hiit/${hiitExample.id}`);
  });

  it('pauses when leaving mid-run', () => {
    const router = renderRun();
    fireEvent.click(screen.getByRole('button', { name: 'Start workout' }));
    fireEvent.click(screen.getByRole('button', { name: 'Exit' }));
    fireEvent.click(screen.getByRole('button', { name: 'Pause and leave' }));
    expect(useRunStore.getState().session?.status).toBe('paused');
    expect(router.state.location.pathname).toBe(`/hiit/${hiitExample.id}`);
  });
});

describe('HiitRun entry states', () => {
  it('resumes a paused run after a reload with the remaining total', () => {
    useRunStore.setState({
      session: session({ phaseIndex: 1, phaseStartedAt: T0 - 10_000, status: 'paused', pausedAt: T0 }),
    });
    renderRun();
    expect(screen.getByText('Paused')).toBeInTheDocument();
    const remaining = scheduleDurationMs(schedule) - hiitExample.warmupSeconds * 1000 - 10_000;
    expect(timerText()).toBe(formatClock(remaining));

    fireEvent.click(screen.getByRole('button', { name: 'Resume workout' }));
    expect(screen.getByText('TRAIN TIME')).toBeInTheDocument();
    expect(timerText()).toBe('00:20');
  });

  it('keeps counting through a reload while running', () => {
    useRunStore.setState({ session: session({ phaseStartedAt: T0 - 30_000 }) });
    renderRun();
    expect(timerText()).toBe('01:00');
    advance(1_000);
    expect(timerText()).toBe('00:59');
  });

  it('offers to resume another workout or start this one', () => {
    useLibraryStore.setState((state) => ({
      workouts: [...state.workouts, { ...hiitExample, id: 'other-id', name: 'Other one' }],
    }));
    useRunStore.setState({ session: session({ workoutId: 'other-id', status: 'paused', pausedAt: T0 }) });
    const router = renderRun();
    expect(screen.getByText('Other one is paused. Resume it, or start this one and drop it.')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Start this one' }));
    expect(useRunStore.getState().session?.workoutId).toBe(hiitExample.id);
    expect(router.state.location.pathname).toBe(`/hiit/${hiitExample.id}/run`);
  });

  it('navigates to the other run when asked', () => {
    useLibraryStore.setState((state) => ({
      workouts: [...state.workouts, { ...hiitExample, id: 'other-id', name: 'Other one' }],
    }));
    useRunStore.setState({ session: session({ workoutId: 'other-id' }) });
    const router = renderRun();
    fireEvent.click(screen.getByRole('button', { name: 'Resume that one' }));
    expect(router.state.location.pathname).toBe('/hiit/other-id/run');
  });

  it('finishes into the done screen and can run again', () => {
    const last = schedule[schedule.length - 1]!;
    useRunStore.setState({
      session: session({ phaseIndex: schedule.length - 1, phaseStartedAt: T0 - last.durationMs + 500 }),
    });
    renderRun();
    advance(1_000);
    expect(screen.getByText('Workout complete')).toBeInTheDocument();
    expect(screen.getByText(`${setCount} sets completed`)).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Run again' }));
    expect(screen.getByText('WARM-UP TIME')).toBeInTheDocument();
    expect(useRunStore.getState().session?.phaseIndex).toBe(0);
  });
});
