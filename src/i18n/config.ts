import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpBackend from 'i18next-http-backend';

const isDevelopment = process.env.NODE_ENV === 'development';

// Get saved language from localStorage or use browser language
const getSavedLanguage = (): string => {
  if (typeof window === 'undefined') return 'en';
  
  const savedLanguage = localStorage.getItem('language');
  if (savedLanguage) return savedLanguage;
  
  // Fallback to browser language
  const browserLanguage = navigator.language.split('-')[0];
  const supportedLanguages = ['en', 'de', 'es', 'fr'];
  return supportedLanguages.includes(browserLanguage) ? browserLanguage : 'en';
};

// Initialize i18next with local translation files
// Translations are downloaded from Locize during dev/build via npm scripts
if (typeof window !== 'undefined') {
  i18n
    // Load translations from local files
    .use(HttpBackend)
    // Pass i18n instance to react-i18next
    .use(initReactI18next)
    // Initialize
    .init({
      lng: getSavedLanguage(), // Use saved language or browser default
      fallbackLng: 'en',
      supportedLngs: ['en', 'de', 'es', 'fr'],
      load: 'languageOnly',
      
      // Namespaces for better organization
      ns: ['common', 'home', 'services', 'pricing', 'about', 'contact', 'contact-form', 'sanity', 'admin'],
      defaultNS: 'common',
      
      // Debugging (only in development)
      debug: isDevelopment,
      
      // React specific options
      react: {
        useSuspense: true, // Enable Suspense to wait for translations to load
        bindI18n: 'languageChanged loaded',
        bindI18nStore: 'added removed',
      },
      
      // HTTP Backend configuration - load from public/locales
      backend: {
        loadPath: '/locales/{{lng}}/{{ns}}.json',
        addPath: '/locales/{{lng}}/{{ns}}.missing.json', // Optional: for saving missing keys
      },
      
      // Caching
      cache: {
        enabled: true,
        expirationTime: 7 * 24 * 60 * 60 * 1000, // 7 days
      },
      
      // Interpolation
      interpolation: {
        escapeValue: false, // React already escapes values
      },
    });
}

export default i18n;

