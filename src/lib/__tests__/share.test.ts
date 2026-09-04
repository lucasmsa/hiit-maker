import { describe, expect, it } from 'vitest';
import { hiitExample } from '@/data/hiit-example';
import { decodeWorkoutShare, encodeWorkoutShare } from '@/lib/share';

describe('share codec', () => {
  it('round-trips a workout through a URL-safe fragment', () => {
    const encoded = encodeWorkoutShare({ ...hiitExample, name: 'Treino de sábado à noite' });
    expect(encoded).toMatch(/^[A-Za-z0-9_-]+$/);
    expect(decodeWorkoutShare(`#${encoded}`)).toEqual({ ...hiitExample, name: 'Treino de sábado à noite' });
  });

  it('rejects garbage, wrong versions and malformed workouts', () => {
    expect(decodeWorkoutShare('')).toBeNull();
    expect(decodeWorkoutShare('#not-base64!!')).toBeNull();
    expect(decodeWorkoutShare(btoa(JSON.stringify({ v: 99, workout: hiitExample })))).toBeNull();
    expect(decodeWorkoutShare(btoa(JSON.stringify({ v: 1, workout: { id: 'x' } })))).toBeNull();
  });
});
