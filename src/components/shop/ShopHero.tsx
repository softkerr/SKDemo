import React from 'react';
import { Box, Typography, Alert } from '@mui/material';
import { useTranslation } from 'react-i18next';
import CurrencySelector from '@/components/CurrencySelector';

interface ShopHeroProps {
  sanityError: boolean;
}

export const ShopHero: React.FC<ShopHeroProps> = ({ sanityError }) => {
  const { t } = useTranslation('shop');

  return (
    <Box sx={{ mb: 6, textAlign: 'center' }}>
      <Typography
        variant="h2"
        component="h1"
        gutterBottom
        sx={{
          fontWeight: 800,
          background: (theme) =>
            `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          mb: 2,
        }}
      >
        🛍️ {t('hero.title')}
      </Typography>
      <Typography variant="h5" color="text.secondary" sx={{ mb: 2, maxWidth: 800, mx: 'auto' }}>
        {t('hero.subtitle')}
      </Typography>

      {/* Sanity Status Banner */}
      {sanityError && (
        <Alert severity="info" sx={{ mt: 3, maxWidth: 800, mx: 'auto' }}>
          {t('banner.sanityDisabled')} <code>{t('banner.sanityCommand')}</code>
        </Alert>
      )}

      {/* Currency Selector */}
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
        <CurrencySelector />
      </Box>
    </Box>
  );
};
