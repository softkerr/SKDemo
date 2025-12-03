import type { Language, LanguageConfig } from '@/types';

// Language configurations
export const LANGUAGES: Record<Language, LanguageConfig> = {
  en: {
    code: 'en',
    label: 'English',
    flag: '🇬🇧',
  },
  de: {
    code: 'de',
    label: 'Deutsch',
    flag: '🇩🇪',
  },
  es: {
    code: 'es',
    label: 'Español',
    flag: '🇪🇸',
  },
  'fr-FR': {
    code: 'fr-FR',
    label: 'Français',
    flag: '🇫🇷',
  },
};

export const CURRENCIES = {
  USD: { code: 'USD', label: 'USD', symbol: '$' },
  EUR: { code: 'EUR', label: 'EUR', symbol: '€' },
} as const;

export const THEME_MODES = {
  LIGHT: 'light',
  DARK: 'dark',
} as const;

// Navigation routes
export const ROUTES = {
  HOME: '/',
  SHOP: '/shop',
  STUDIO: '/studio',
  ADMIN: '/admin',
  CONTACTS: '/contacts',
} as const;

// Company information
export const COMPANY_INFO = {
  name: 'WebDev Studio',
  tagline: 'Building Tomorrow\'s Web Today',
  email: 'hello@webdevstudio.com',
  phone: '+1 (555) 123-4567',
  address: '123 Tech Street, San Francisco, CA 94105',
  social: {
    github: 'https://github.com/softkerr',
    linkedin: 'https://www.linkedin.com/company/softkerr/',
    twitter: '#',
  },
};

// Default values
export const DEFAULTS = {
  LANGUAGE: 'en' as Language,
  THEME: 'light' as const,
  CURRENCY: 'USD' as const,
};

