import { describe, expect, it } from 'vitest';
import { hiitExample } from '@/data/hiit-example';
import { regionFills, regionOpacity } from '@/lib/body-map';
import { filterCatalog, normalizeText, placedCatalogIds, shareUrl, summarizeWorkout } from '@/lib/hiit-summary';
import { translatorFor } from '@/lib/i18n';
import { decodeWorkoutShare } from '@/lib/share';
import { reorderExercises } from '@/lib/workout-edit';

const en = translatorFor('en');
const pt = translatorFor('pt-BR');

describe('summarizeWorkout', () => {
  it('counts sets, exercises, total seconds and worked groups in catalog order', () => {
    const summary = summarizeWorkout(hiitExample);
    expect(summary.setCount).toBe(3);
    expect(summary.exerciseCount).toBe(9);
    expect(summary.totalSeconds).toBe(23 * 60 + 45);
    expect(summary.groups).toEqual(['chest', 'legs', 'core', 'shoulders', 'cardio']);
  });
});

describe('filterCatalog', () => {
  it('returns the whole catalog for an empty query', () => {
    expect(filterCatalog('   ', en)).toHaveLength(40);
  });

  it('matches by exercise name and by group name, ignoring case and accents', () => {
    expect(filterCatalog('PUSH', en).map((exercise) => exercise.id)).toContain('push-up');
    expect(filterCatalog('push', en).map((exercise) => exercise.id)).not.toContain('squat');
    expect(filterCatalog('chest', en)).toHaveLength(6);
    expect(filterCatalog('flexao', pt).map((exercise) => exercise.id)).toContain('push-up');
  });
});

describe('normalizeText', () => {
  it('lowercases and strips diacritics', () => {
    expect(normalizeText('  Flexão Árabe ')).toBe('flexao arabe');
  });
});

describe('placedCatalogIds', () => {
  it('collects every catalog id placed in any set', () => {
    const ids = placedCatalogIds(hiitExample);
    expect(ids.has('push-up')).toBe(true);
    expect(ids.has('burpee')).toBe(true);
    expect(ids.has('dips')).toBe(false);
  });
});

describe('shareUrl', () => {
  it('produces a link whose fragment decodes back to the workout', () => {
    const url = new URL(shareUrl('https://hiit.example', hiitExample));
    expect(url.pathname).toBe('/hiit/shared');
    expect(decodeWorkoutShare(url.hash)).toEqual(hiitExample);
  });
});

describe('reorderExercises', () => {
  it('applies the given order and keeps unknown or missing ids stable', () => {
    const set = hiitExample.sets[0]!;
    const [a, b, c] = set.exercises.map((exercise) => exercise.id) as [string, string, string];
    const reordered = reorderExercises(hiitExample, set.id, [c, a, 'ghost']);
    expect(reordered.sets[0]?.exercises.map((exercise) => exercise.id)).toEqual([c, a, b]);
    expect(reordered.sets[1]).toBe(hiitExample.sets[1]);
  });
});

describe('body map fills', () => {
  it('scales opacity with the busiest region and leaves empty regions at zero', () => {
    expect(regionOpacity(0, 3)).toBe(0);
    expect(regionOpacity(3, 3)).toBe(1);
    expect(regionOpacity(1, 4)).toBe(0.48);
    const fills = regionFills({ chest: 2, legs: 4, cardio: 9 });
    expect(fills.find((fill) => fill.region === 'legs')?.opacity).toBe(1);
    expect(fills.find((fill) => fill.region === 'chest')?.opacity).toBe(0.65);
    expect(fills.find((fill) => fill.region === 'back')?.opacity).toBe(0);
  });
});
