import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useTranslation } from 'react-i18next';

interface NoResultsProps {
  onClearFilters: () => void;
}

export const NoResults: React.FC<NoResultsProps> = ({ onClearFilters }) => {
  const { t } = useTranslation('shop');

  return (
    <Box sx={{ textAlign: 'center', py: 8 }}>
      <Typography variant="h6" color="text.secondary" gutterBottom>
        {t('noResults.title')}
      </Typography>
      <Typography variant="body2" color="text.disabled" sx={{ mb: 3 }}>
        {t('noResults.message')}
      </Typography>
      <Button variant="outlined" onClick={onClearFilters}>
        {t('noResults.clearFilters')}
      </Button>
    </Box>
  );
};
