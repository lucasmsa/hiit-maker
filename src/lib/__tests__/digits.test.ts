import { describe, expect, it } from 'vitest';
import { formatClock, splitGlyphs } from '@/lib/digits';

describe('formatClock', () => {
  it('rounds partial seconds up so the display never shows zero early', () => {
    expect(formatClock(1)).toBe('00:01');
    expect(formatClock(29_400)).toBe('00:30');
  });

  it('formats minutes and hours', () => {
    expect(formatClock(0)).toBe('00:00');
    expect(formatClock(675_000)).toBe('11:15');
    expect(formatClock(3_600_000)).toBe('1:00:00');
  });

  it('never goes negative', () => {
    expect(formatClock(-5000)).toBe('00:00');
  });
});

describe('splitGlyphs', () => {
  it('gives every glyph a stable key including the colon', () => {
    expect(splitGlyphs('1:05').map((g) => g.char)).toEqual(['1', ':', '0', '5']);
    expect(new Set(splitGlyphs('00:00').map((g) => g.key)).size).toBe(5);
  });
});
