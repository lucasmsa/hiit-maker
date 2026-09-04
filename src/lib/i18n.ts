import { dictionaries, type I18nKey } from '@/data/i18n';
import type { Language } from '@/lib/types';

export type TranslateParams = Record<string, string | number>;

export function detectLanguage(navigatorLanguage: string | undefined): Language {
  return navigatorLanguage?.toLowerCase().startsWith('pt') ? 'pt-BR' : 'en';
}

export function translate(language: Language, key: I18nKey, params?: TranslateParams): string {
  const template = dictionaries[language][key] ?? dictionaries.en[key] ?? key;
  if (!params) {
    return template;
  }
  return template.replace(/\{(\w+)\}/g, (match, name: string) => {
    const value = params[name];
    return value === undefined ? match : String(value);
  });
}

export type Translate = (key: I18nKey, params?: TranslateParams) => string;

export function translatorFor(language: Language): Translate {
  return (key, params) => translate(language, key, params);
}
