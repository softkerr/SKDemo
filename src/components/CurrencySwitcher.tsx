'use client';

import React, { useState, useEffect } from 'react';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Box from '@mui/material/Box';
import type { Currency } from '@/types/app';

const currencies: { code: Currency; label: string; symbol: string }[] = [
  { code: 'USD', label: 'USD', symbol: '$' },
  { code: 'EUR', label: 'EUR', symbol: '€' },
];

export const CurrencySwitcher: React.FC = () => {
  const [currentCurrency, setCurrentCurrency] = useState<Currency>('USD');

  useEffect(() => {
    const savedCurrency = localStorage.getItem('currency') as Currency;
    if (savedCurrency) {
      setCurrentCurrency(savedCurrency);
    }
  }, []);

  const handleCurrencyChange = (event: any) => {
    const newCurrency = event.target.value as Currency;
    setCurrentCurrency(newCurrency);
    localStorage.setItem('currency', newCurrency);
    // Trigger a custom event to notify other components
    window.dispatchEvent(new CustomEvent('currencyChange', { detail: newCurrency }));
  };

  return (
    <FormControl size="small" sx={{ minWidth: 80 }}>
      <Select
        value={currentCurrency}
        onChange={handleCurrencyChange}
        sx={{
          color: 'inherit',
          '.MuiOutlinedInput-notchedOutline': { border: 0 },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': { border: 0 },
        }}
      >
        {currencies.map((currency) => (
          <MenuItem key={currency.code} value={currency.code}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <span>{currency.symbol}</span>
              <span>{currency.label}</span>
            </Box>
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
