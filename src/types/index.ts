// App-wide type definitions

export type Language = 'en' | 'de' | 'es' | 'fr-FR';

export type Currency = 'USD' | 'EUR';

export type ThemeMode = 'light' | 'dark';

export interface CurrencyConfig {
  code: Currency;
  symbol: string;
  locale: string;
}

export interface LanguageConfig {
  code: Language;
  label: string;
  flag: string;
}

export interface Service {
  id: string;
  icon: string;
  category: string;
}

export interface PricingTier {
  id: string;
  popular?: boolean;
  features: string[];
  priceUSD: number;
  priceEUR: number;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
  bio?: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}
