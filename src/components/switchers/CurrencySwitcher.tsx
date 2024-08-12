'use client';

import React from 'react';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ToggleButton from '@mui/material/ToggleButton';
import { useCurrency } from '@/context/CurrencyContext';
import type { Currency } from '@/types';

export const CurrencySwitcher: React.FC = () => {
  const { currency, setCurrency } = useCurrency();

  const handleChange = (_event: React.MouseEvent<HTMLElement>, newCurrency: Currency | null) => {
    if (newCurrency) {
      setCurrency(newCurrency);
    }
  };

  return (
    <ToggleButtonGroup
      value={currency}
      exclusive
      onChange={handleChange}
      aria-label="currency selection"
      size="small"
      sx={{
        bgcolor: 'background.paper',
        '& .MuiToggleButton-root': {
          px: 2,
          py: 0.5,
          fontSize: '0.875rem',
          fontWeight: 600,
          border: 1,
          borderColor: 'divider',
          '&.Mui-selected': {
            bgcolor: 'primary.main',
            color: 'white',
            '&:hover': {
              bgcolor: 'primary.dark',
            },
          },
        },
      }}
    >
      <ToggleButton value="USD" aria-label="US Dollar">
        USD $
      </ToggleButton>
      <ToggleButton value="EUR" aria-label="Euro">
        EUR €
      </ToggleButton>
    </ToggleButtonGroup>
  );
};
