import type { Language, Currency, ThemeMode } from '@/types/app';

export const STORAGE_KEYS = {
  LANGUAGE: 'language',
  CURRENCY: 'currency',
  THEME: 'theme-mode',
} as const;

export const DEFAULT_SETTINGS = {
  language: 'en' as Language,
  currency: 'USD' as Currency,
  theme: 'light' as ThemeMode,
} as const;

export const getStoredLanguage = (): Language => {
  if (typeof window === 'undefined') return DEFAULT_SETTINGS.language;
  return (localStorage.getItem(STORAGE_KEYS.LANGUAGE) as Language) || DEFAULT_SETTINGS.language;
};

export const getStoredCurrency = (): Currency => {
  if (typeof window === 'undefined') return DEFAULT_SETTINGS.currency;
  return (localStorage.getItem(STORAGE_KEYS.CURRENCY) as Currency) || DEFAULT_SETTINGS.currency;
};

export const getStoredTheme = (): ThemeMode => {
  if (typeof window === 'undefined') return DEFAULT_SETTINGS.theme;
  return (localStorage.getItem(STORAGE_KEYS.THEME) as ThemeMode) || DEFAULT_SETTINGS.theme;
};

export const setStoredLanguage = (language: Language): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEYS.LANGUAGE, language);
  }
};

export const setStoredCurrency = (currency: Currency): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEYS.CURRENCY, currency);
  }
};

export const setStoredTheme = (theme: ThemeMode): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEYS.THEME, theme);
  }
};
