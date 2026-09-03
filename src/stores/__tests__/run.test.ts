import { beforeEach, describe, expect, it } from 'vitest';
import { hiitExample } from '@/data/hiit-example';
import { compileHiitSchedule, compileRestSchedule } from '@/lib/schedule';
import { remainingMs } from '@/lib/run-clock';
import { RUN_STORAGE_KEY, useRunStore } from '@/stores/run';

const store = () => useRunStore.getState();
const T0 = 1_700_000_000_000;

beforeEach(() => {
  useRunStore.setState({ session: null });
});

describe('run store', () => {
  it('starts a workout run and persists the session', () => {
    store().start({ kind: 'hiit', schedule: compileHiitSchedule(hiitExample), workoutId: hiitExample.id }, T0);
    expect(store().session).toMatchObject({ kind: 'hiit', workoutId: hiitExample.id, phaseIndex: 0, status: 'running' });
    const raw = JSON.parse(localStorage.getItem(RUN_STORAGE_KEY)!) as { version: number; state: { session: unknown } };
    expect(raw.version).toBe(1);
    expect(raw.state.session).toMatchObject({ phaseIndex: 0 });
  });

  it('syncs due phases and reports how many advanced', () => {
    store().start({ kind: 'hiit', schedule: compileHiitSchedule(hiitExample) }, T0);
    expect(store().sync(T0 + 1_000)).toBe(0);
    expect(store().sync(T0 + 90_000 + 30_000 + 15_000 + 500)).toBe(3);
    expect(store().session?.phaseIndex).toBe(3);
    expect(remainingMs(store().session!, T0 + 90_000 + 30_000 + 15_000 + 500)).toBe(29_500);
  });

  it('pauses, resumes and skips', () => {
    store().start({ kind: 'rest', schedule: compileRestSchedule(60) }, T0);
    store().pause(T0 + 10_000);
    expect(store().session?.status).toBe('paused');
    expect(remainingMs(store().session!, T0 + 40_000)).toBe(50_000);
    store().resume(T0 + 40_000);
    expect(remainingMs(store().session!, T0 + 41_000)).toBe(49_000);
    store().skip(T0 + 41_000);
    expect(store().session?.status).toBe('finished');
  });

  it('does nothing without a session and clears on stop', () => {
    expect(store().sync(T0)).toBe(0);
    store().pause(T0);
    expect(store().session).toBeNull();
    store().start({ kind: 'rest', schedule: compileRestSchedule(5) }, T0);
    store().stop();
    expect(store().session).toBeNull();
  });
});
