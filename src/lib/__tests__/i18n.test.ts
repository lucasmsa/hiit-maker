import { describe, expect, it } from 'vitest';
import { detectLanguage, translate } from '@/lib/i18n';

describe('detectLanguage', () => {
  it('maps any Portuguese tag to pt-BR and everything else to en', () => {
    expect(detectLanguage('pt-BR')).toBe('pt-BR');
    expect(detectLanguage('pt')).toBe('pt-BR');
    expect(detectLanguage('PT-pt')).toBe('pt-BR');
    expect(detectLanguage('en-US')).toBe('en');
    expect(detectLanguage('es')).toBe('en');
    expect(detectLanguage(undefined)).toBe('en');
  });
});

describe('translate', () => {
  it('interpolates named params', () => {
    expect(translate('en', 'run.setOf', { current: 2, total: 3 })).toBe('Set 2 of 3');
    expect(translate('pt-BR', 'run.setOf', { current: 2, total: 3 })).toBe('Série 2 de 3');
  });

  it('leaves unknown placeholders untouched', () => {
    expect(translate('en', 'run.setOf', { current: 1 })).toBe('Set 1 of {total}');
  });
});
