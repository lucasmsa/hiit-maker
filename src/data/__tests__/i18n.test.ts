import { describe, expect, it } from 'vitest';
import { en } from '@/data/i18n/en';
import { ptBR } from '@/data/i18n/pt-BR';
import { hiitCatalog } from '@/data/hiit-catalog';

describe('i18n dictionaries', () => {
  it('have the same keys in en and pt-BR', () => {
    const enKeys = Object.keys(en).sort();
    const ptKeys = Object.keys(ptBR).sort();
    expect(ptKeys).toEqual(enKeys);
  });

  it('have no empty strings', () => {
    for (const dictionary of [en, ptBR]) {
      for (const [key, value] of Object.entries(dictionary)) {
        expect(value.trim(), key).not.toBe('');
      }
    }
  });

  it('name every catalog exercise', () => {
    for (const exercise of hiitCatalog) {
      expect(en).toHaveProperty(`hiit.exercise.${exercise.id}`);
    }
  });
});

describe('catalogs', () => {
  it('has 40 HIIT exercises across 7 groups with unique ids', () => {
    expect(hiitCatalog).toHaveLength(40);
    expect(new Set(hiitCatalog.map((exercise) => exercise.id)).size).toBe(40);
    expect(new Set(hiitCatalog.map((exercise) => exercise.group)).size).toBe(7);
  });
});
