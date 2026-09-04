import { describe, expect, it } from 'vitest';
import { splitHighlight } from '@/lib/highlight';

describe('splitHighlight', () => {
  it('splits the marked span out of a template', () => {
    expect(splitHighlight('Default {x}warm-up{/x} time')).toEqual(['Default ', 'warm-up', ' time']);
  });

  it('handles a marker at the end', () => {
    expect(splitHighlight('Tempo padrão de {x}aquecimento{/x}')).toEqual([
      'Tempo padrão de ',
      'aquecimento',
      '',
    ]);
  });

  it('returns the whole text when there is no marker', () => {
    expect(splitHighlight('Plain')).toEqual(['Plain', '', '']);
  });
});
