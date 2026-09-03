import { describe, expect, it } from 'vitest';
import { clamp, parseNumberInput, stepValue } from '@/lib/number';

describe('stepValue', () => {
  it('steps and snaps to the grid', () => {
    expect(stepValue(30, 5, 0, 600)).toBe(35);
    expect(stepValue(32, 5, 0, 600)).toBe(35);
    expect(stepValue(30, -5, 0, 600)).toBe(25);
  });

  it('clamps at the bounds', () => {
    expect(stepValue(598, 5, 0, 600)).toBe(600);
    expect(stepValue(2, -5, 0, 600)).toBe(0);
    expect(clamp(-1, 0, 10)).toBe(0);
  });
});

describe('parseNumberInput', () => {
  it('falls back on garbage', () => {
    expect(parseNumberInput('12', 0)).toBe(12);
    expect(parseNumberInput('', 7)).toBe(7);
    expect(parseNumberInput('abc', 7)).toBe(7);
  });
});
