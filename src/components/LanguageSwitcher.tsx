'use client';

import React, { useState, useEffect } from 'react';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Box from '@mui/material/Box';
import { useTranslation } from 'react-i18next';
import type { Language } from '@/types/app';

const languages: { code: Language; label: string; flag: string }[] = [
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
  { code: 'es', label: 'Español', flag: '🇪🇸' },
  { code: 'fr', label: 'Français', flag: '🇫🇷' },
];

export const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();
  const [currentLang, setCurrentLang] = useState<Language>('en');

  useEffect(() => {
    const savedLang = localStorage.getItem('language') as Language;
    if (savedLang) {
      i18n.changeLanguage(savedLang);
      setCurrentLang(savedLang);
    }
  }, [i18n]);

  const handleLanguageChange = (event: any) => {
    const newLang = event.target.value as Language;
    setCurrentLang(newLang);
    i18n.changeLanguage(newLang);
    localStorage.setItem('language', newLang);
  };

  return (
    <FormControl size="small" sx={{ minWidth: 120 }}>
      <Select
        value={currentLang}
        onChange={handleLanguageChange}
        sx={{
          color: 'inherit',
          '.MuiOutlinedInput-notchedOutline': { border: 0 },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': { border: 0 },
        }}
      >
        {languages.map((lang) => (
          <MenuItem key={lang.code} value={lang.code}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <span>{lang.flag}</span>
              <span>{lang.label}</span>
            </Box>
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
