'use client';
// @ts-expect-error - We know that `translations` exists
import * as translations from './translations';
import {useStoredState} from './useStoredState';

// Define types for your translations structure
export type Language = keyof typeof translations;
export type TranslationKey = string; // You might want to make this more specific
export type TranslationValue = string;

// Helper type to ensure type safety when accessing nested translations
export type NestedTranslations = {
  [key: string]: TranslationValue | NestedTranslations;
};

export type TranslationReturn = {
  language: Language | undefined;
  setLanguage: (lang: Language | undefined) => void;
  fallbackLanguage: Language | undefined;
  setFallbackLanguage: (lang: Language | undefined) => void;
  t: (key: TranslationKey) => TranslationValue;
};

const useTranslation = (): TranslationReturn => {
  const [language, setLanguage] = useStoredState<Language>('en', {
    key: 'language',
  });

  const [fallbackLanguage, setFallbackLanguage] = useStoredState<Language>(
    'en',
    {
      key: 'fallbackLanguage',
    }
  );

  const translate = (key: TranslationKey): TranslationValue => {
    const keys = key.split('.');

    return (
      getNestedTranslation(language, keys) ??
      getNestedTranslation(fallbackLanguage, keys) ??
      key
    );
  };

  return {
    language,
    setLanguage,
    fallbackLanguage,
    setFallbackLanguage,
    t: translate,
  };
};

function getNestedTranslation(
  language: Language | undefined,
  keys: string[]
): TranslationValue | undefined {
  if (!language) return undefined;
  // @ts-expect-error - We know that `translations` has a key for every `Language`
  return keys.reduce((obj: NestedTranslations | undefined, key: string) => {
    if (obj === undefined) return undefined;
    return obj[key] as NestedTranslations | TranslationValue | undefined;
  }, translations[language] as NestedTranslations);
}

export default useTranslation;
