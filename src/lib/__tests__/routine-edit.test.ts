import { describe, expect, it } from 'vitest';
import { gymTemplate } from '@/data/gym-template';
import {
  addDay,
  addEntry,
  cloneRoutineWithNewIds,
  createRoutine,
  entryRestSeconds,
  moveEntry,
  newDay,
  newEntry,
  removeDay,
  removeEntry,
  updateEntry,
} from '@/lib/routine-edit';

describe('routine edits', () => {
  it('creates a routine with one named day and a 90 s rest', () => {
    const routine = createRoutine('Upper', 'Day 1', 0);
    expect(routine.days.map((day) => day.name)).toEqual(['Day 1']);
    expect(routine.restSeconds).toBe(90);
  });

  it('adds and removes days but never the last one', () => {
    const routine = createRoutine('R', 'A', 0);
    const withB = addDay(routine, newDay('B'));
    expect(withB.days).toHaveLength(2);
    const back = removeDay(withB, withB.days[1]!.id);
    expect(back.days).toHaveLength(1);
    expect(removeDay(back, back.days[0]!.id)).toBe(back);
  });

  it('adds, edits, reorders and removes entries', () => {
    const routine = createRoutine('R', 'A', 0);
    const dayId = routine.days[0]!.id;
    const squat = newEntry({ kind: 'catalog', exerciseId: 'squat' });
    const custom = newEntry({ kind: 'custom', name: 'Sled push' });
    const filled = addEntry(addEntry(routine, dayId, squat), dayId, custom);
    expect(filled.days[0]?.entries.map((entry) => entry.id)).toEqual([squat.id, custom.id]);

    const reordered = moveEntry(filled, dayId, custom.id, 0);
    expect(reordered.days[0]?.entries[0]?.id).toBe(custom.id);

    const tuned = updateEntry(reordered, dayId, squat.id, { perSide: true, restSeconds: 120 });
    const squatEntry = tuned.days[0]!.entries.find((entry) => entry.id === squat.id)!;
    expect(squatEntry.prescription.perSide).toBe(true);
    expect(entryRestSeconds(tuned, squatEntry)).toBe(120);
    expect(entryRestSeconds(tuned, tuned.days[0]!.entries[0]!)).toBe(90);

    const trimmed = removeEntry(tuned, dayId, custom.id);
    expect(trimmed.days[0]?.entries).toHaveLength(1);
  });

  it('clones the template with fresh ids', () => {
    const clone = cloneRoutineWithNewIds(gymTemplate, 'Mine', 1);
    expect(clone.id).not.toBe(gymTemplate.id);
    const templateIds = new Set(
      gymTemplate.days.flatMap((day) => [day.id, ...day.entries.map((entry) => entry.id)]),
    );
    for (const day of clone.days) {
      expect(templateIds.has(day.id)).toBe(false);
      for (const entry of day.entries) {
        expect(templateIds.has(entry.id)).toBe(false);
      }
    }
    expect(clone.days.map((day) => day.name)).toEqual(['Warm-up', 'Push', 'Pull', 'Legs', 'Daily']);
  });
});
