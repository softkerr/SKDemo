'use client';

import React from 'react';
import { MenuItem, Select, FormControl, SelectChangeEvent, Box } from '@mui/material';
import { useCurrency } from '@/context/CurrencyContext';
import type { Currency } from '@/types';

const CURRENCY_OPTIONS = [
  { value: 'USD', label: 'USD', flag: '🇺🇸', name: 'US Dollar' },
  { value: 'EUR', label: 'EUR', flag: '🇪🇺', name: 'Euro' },
];

export default function CurrencySelector() {
  const { currency, setCurrency } = useCurrency();

  const handleChange = (event: SelectChangeEvent) => {
    setCurrency(event.target.value as Currency);
  };

  return (
    <FormControl size="small" sx={{ minWidth: 120 }}>
      <Select
        value={currency}
        onChange={handleChange}
        sx={{
          borderRadius: 2,
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: 'divider',
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: 'primary.main',
          },
        }}
      >
        {CURRENCY_OPTIONS.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <span>{option.flag}</span>
              <span>{option.label}</span>
            </Box>
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
