import React from 'react';
import { Box, Container, Typography, Chip, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';

export const AdminHero = () => {
  const theme = useTheme();
  const { t } = useTranslation('admin');

  return (
    <Box
      sx={{
        position: 'relative',
        overflow: 'hidden',
        py: { xs: 6, md: 8 },
        background:
          theme.palette.mode === 'dark'
            ? 'linear-gradient(135deg, #1e3a8a 0%, #7c3aed 100%)'
            : 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
      }}
    >
      {/* Decorative Elements */}
      <Box
        sx={{
          position: 'absolute',
          top: -50,
          right: -50,
          width: 300,
          height: 300,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
          animation: 'pulse 3s ease-in-out infinite',
          '@keyframes pulse': {
            '0%, 100%': { transform: 'scale(1)', opacity: 0.5 },
            '50%': { transform: 'scale(1.1)', opacity: 0.3 },
          },
        }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Box sx={{ textAlign: 'center' }}>
          <Chip
            label={t('hero.badge')}
            sx={{
              mb: 2,
              fontWeight: 600,
              bgcolor: 'rgba(255,255,255,0.2)',
              color: 'white',
              backdropFilter: 'blur(10px)',
            }}
          />
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: '2.5rem', md: '3.5rem' },
              fontWeight: 700,
              color: 'white',
              mb: 2,
              textShadow: '2px 2px 8px rgba(0,0,0,0.2)',
            }}
          >
            {t('hero.title')}
          </Typography>
          <Typography
            variant="h5"
            sx={{
              fontSize: { xs: '1.125rem', md: '1.25rem' },
              color: 'rgba(255,255,255,0.95)',
              maxWidth: '48rem',
              mx: 'auto',
              lineHeight: 1.6,
            }}
          >
            {t('hero.description')}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};
