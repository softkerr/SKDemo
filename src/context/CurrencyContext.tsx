'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { Currency, CurrencyConfig } from '@/types';

interface CurrencyContextType {
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  formatPrice: (priceUSD: number, priceEUR: number) => string;
  currencyConfig: CurrencyConfig;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

const CURRENCY_CONFIGS: Record<Currency, CurrencyConfig> = {
  USD: {
    code: 'USD',
    symbol: '$',
    locale: 'en-US',
  },
  EUR: {
    code: 'EUR',
    symbol: '€',
    locale: 'de-DE',
  },
};

const STORAGE_KEY = 'preferred-currency';

export const CurrencyProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currency, setCurrencyState] = useState<Currency>('USD');

  // Load currency from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY) as Currency | null;
    if (saved && CURRENCY_CONFIGS[saved]) {
      setCurrencyState(saved);
    }
  }, []);

  // Save currency to localStorage when it changes
  const setCurrency = (newCurrency: Currency) => {
    setCurrencyState(newCurrency);
    localStorage.setItem(STORAGE_KEY, newCurrency);
  };

  // Format price based on current currency
  const formatPrice = (priceUSD: number, priceEUR: number): string => {
    const config = CURRENCY_CONFIGS[currency];
    const price = currency === 'USD' ? priceUSD : priceEUR;

    return new Intl.NumberFormat(config.locale, {
      style: 'currency',
      currency: config.code,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const value: CurrencyContextType = {
    currency,
    setCurrency,
    formatPrice,
    currencyConfig: CURRENCY_CONFIGS[currency],
  };

  return <CurrencyContext.Provider value={value}>{children}</CurrencyContext.Provider>;
};

export const useCurrency = (): CurrencyContextType => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
};
