import type { Language } from '@/lib/types';
import { en } from './en';
import { ptBR } from './pt-BR';

export type { I18nKey } from './en';

export const dictionaries: Record<Language, Record<string, string>> = {
  en,
  'pt-BR': ptBR,
};
