'use client';

import React, { useEffect, Suspense } from 'react';
import { I18nextProvider } from 'react-i18next';
import i18n from '@/i18n/config';
import { Box, CircularProgress } from '@mui/material';

interface I18nProviderProps {
  children: React.ReactNode;
}

// Loading component to show while translations are loading
const TranslationLoader = () => (
  <Box
    sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      width: '100%',
    }}
  >
    <CircularProgress />
  </Box>
);

export const I18nProvider: React.FC<I18nProviderProps> = ({ children }) => {
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage) {
      i18n.changeLanguage(savedLanguage);
    }
  }, []);

  return (
    <I18nextProvider i18n={i18n}>
      <Suspense fallback={<TranslationLoader />}>{children}</Suspense>
    </I18nextProvider>
  );
};
