'use client';

import React from 'react';
import { Box, Typography, TextField, InputAdornment, Chip, Divider, alpha } from '@mui/material';
import { Search } from '@mui/icons-material';
import { categories } from '@/data/products';
import { useTranslation } from 'react-i18next';

interface FilterSidebarProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  totalProducts: number;
  filteredProducts: number;
}

export default function FilterSidebar({
  selectedCategory,
  onCategoryChange,
  searchQuery,
  onSearchChange,
  totalProducts,
  filteredProducts,
}: FilterSidebarProps) {
  const { t } = useTranslation('shop');

  return (
    <Box
      sx={{
        position: 'sticky',
        top: 100,
        height: 'calc(100vh - 120px)',
        overflowY: 'auto',
        pr: 2,
        '&::-webkit-scrollbar': { width: 6 },
        '&::-webkit-scrollbar-thumb': {
          background: (theme) => alpha(theme.palette.primary.main, 0.3),
          borderRadius: 3,
        },
      }}
    >
      {/* Search */}
      <Box sx={{ mb: 4 }}>
        <TextField
          fullWidth
          size="small"
          placeholder={t('filters.search')}
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search fontSize="small" />
              </InputAdornment>
            ),
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: 2,
            },
          }}
        />
      </Box>

      <Divider sx={{ mb: 4 }} />

      {/* Categories */}
      <Box>
        <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
          📁 {t('filters.categories')}
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          {categories.map((category) => {
            const isSelected = selectedCategory === category.id;
            // Map category IDs to translation keys
            const categoryKey =
              category.id === 'all'
                ? 'all'
                : category.id === 'web-design'
                  ? 'webDesign'
                  : category.id === 'seo'
                    ? 'seo'
                    : category.id;

            return (
              <Chip
                key={category.id}
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, py: 0.5 }}>
                    <span style={{ fontSize: '1.2rem' }}>{category.icon}</span>
                    <span>{t(`categories.${categoryKey}`)}</span>
                  </Box>
                }
                onClick={() => onCategoryChange(category.id)}
                color={isSelected ? 'primary' : 'default'}
                variant={isSelected ? 'filled' : 'outlined'}
                sx={{
                  justifyContent: 'flex-start',
                  px: 2,
                  py: 2.5,
                  fontSize: '0.95rem',
                  fontWeight: isSelected ? 700 : 500,
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    transform: 'translateX(4px)',
                  },
                }}
              />
            );
          })}
        </Box>
      </Box>

      <Divider sx={{ my: 4 }} />

      {/* Results Count */}
      <Box
        sx={{
          p: 2,
          borderRadius: 2,
          background: (theme) => alpha(theme.palette.info.main, 0.1),
          border: 1,
          borderColor: (theme) => alpha(theme.palette.info.main, 0.2),
        }}
      >
        <Typography variant="body2" color="text.secondary" align="center">
          {t('filters.showing')} <strong>{filteredProducts}</strong> {t('filters.of')}{' '}
          <strong>{totalProducts}</strong> {t('filters.services')}
        </Typography>
      </Box>
    </Box>
  );
}
