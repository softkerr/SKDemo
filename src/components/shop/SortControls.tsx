import React from 'react';
import { Box, ButtonGroup, Button } from '@mui/material';
import { Star, TrendingUp } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { SortOption } from '@/utils/productFilters';

interface SortControlsProps {
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;
}

export const SortControls: React.FC<SortControlsProps> = ({ sortBy, onSortChange }) => {
  const { t } = useTranslation('shop');

  return (
    <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 3 }}>
      <ButtonGroup variant="outlined" size="small">
        <Button
          variant={sortBy === 'popular' ? 'contained' : 'outlined'}
          onClick={() => onSortChange('popular')}
          startIcon={<Star />}
        >
          {t('sort.popular')}
        </Button>
        <Button
          variant={sortBy === 'price-asc' ? 'contained' : 'outlined'}
          onClick={() => onSortChange('price-asc')}
          startIcon={<TrendingUp sx={{ transform: 'rotate(180deg)' }} />}
        >
          {t('sort.lowToHigh')}
        </Button>
        <Button
          variant={sortBy === 'price-desc' ? 'contained' : 'outlined'}
          onClick={() => onSortChange('price-desc')}
          startIcon={<TrendingUp />}
        >
          {t('sort.highToLow')}
        </Button>
      </ButtonGroup>
    </Box>
  );
};
