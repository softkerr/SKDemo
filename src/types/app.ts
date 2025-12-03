export type Language = 'en' | 'de' | 'es' | 'fr-FR';
export type Currency = 'USD' | 'EUR';
export type ThemeMode = 'light' | 'dark';

export interface AppSettings {
  language: Language;
  currency: Currency;
  theme: ThemeMode;
}
