'use client';

import React from 'react';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Box from '@mui/material/Box';
import { useTranslation } from 'react-i18next';
import { LANGUAGES } from '@/constants';

export const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();

  const handleChange = (event: { target: { value: string } }) => {
    const newLanguage = event.target.value;
    i18n.changeLanguage(newLanguage);
    // Save selected language to localStorage
    localStorage.setItem('language', newLanguage);
  };

  return (
    <FormControl size="small" sx={{ minWidth: 120 }}>
      <Select
        value={i18n.language}
        onChange={handleChange}
        sx={{
          bgcolor: 'background.paper',
          '& .MuiSelect-select': {
            py: 1,
            display: 'flex',
            alignItems: 'center',
            gap: 1,
          },
        }}
      >
        {Object.values(LANGUAGES).map((lang) => (
          <MenuItem key={lang.code} value={lang.code}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Box component="span">{lang.flag}</Box>
              <Box component="span">{lang.label}</Box>
            </Box>
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
