'use client';

import React from 'react';
import { ThemeProvider } from '@/theme/ThemeProvider';
import { I18nProvider } from './I18nProvider';
import { CurrencyProvider } from '@/context/CurrencyContext';
import { ReduxProvider } from '@/store/ReduxProvider';

interface ProvidersProps {
  children: React.ReactNode;
}

export const Providers: React.FC<ProvidersProps> = ({ children }) => {
  return (
    <ReduxProvider>
      <I18nProvider>
        <ThemeProvider>
          <CurrencyProvider>
            {children}
          </CurrencyProvider>
        </ThemeProvider>
      </I18nProvider>
    </ReduxProvider>
  );
};
