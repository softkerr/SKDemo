'use client';

import { useTranslation } from 'react-i18next';
import { Box, Container, Typography, Button, Stack, Chip } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { ArrowForward, CalendarMonth, Check } from '@mui/icons-material';
import Link from 'next/link';

const benefits = [
  { key: 'noCredit', icon: Check },
  { key: 'freeTrial', icon: Check },
  { key: 'cancelAnytime', icon: Check },
];

export function CTASection() {
  const { t } = useTranslation('home');
  const theme = useTheme();

  return (
    <Box
      component="section"
      data-section="cta"
      sx={{
        py: { xs: 8, md: 12 },
        position: 'relative',
        overflow: 'hidden',
        background: theme.palette.mode === 'dark'
          ? 'linear-gradient(135deg, #1e3a8a 0%, #7c3aed 100%)'
          : 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
      }}
    >
      {/* Decorative elements */}
      <Box
        sx={{
          position: 'absolute',
          top: '-50%',
          right: '-10%',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: '-50%',
          left: '-10%',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />

      <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1 }}>
        <Box sx={{ textAlign: 'center' }}>
          {/* Title */}
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: '2rem', md: '2.5rem', lg: '3rem' },
              fontWeight: 700,
              color: 'white',
              mb: 2,
            }}
          >
            {t('cta.title')}
          </Typography>

          {/* Description */}
          <Typography
            variant="h6"
            sx={{
              fontSize: { xs: '1.125rem', md: '1.25rem' },
              color: 'rgba(255, 255, 255, 0.9)',
              mb: 5,
              maxWidth: '42rem',
              mx: 'auto',
            }}
          >
            {t('cta.description')}
          </Typography>

          {/* CTA Buttons */}
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={2}
            justifyContent="center"
            sx={{ mb: 5 }}
          >
            <Button
              component={Link}
              href="/signup"
              variant="contained"
              size="large"
              endIcon={<ArrowForward />}
              sx={{
                bgcolor: 'white',
                color: theme.palette.mode === 'dark' ? 'primary.dark' : 'primary.main',
                fontSize: '1.125rem',
                px: 4,
                py: 1.5,
                textTransform: 'none',
                '&:hover': {
                  bgcolor: 'grey.100',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 12px 24px rgba(0, 0, 0, 0.2)',
                },
                transition: 'all 0.3s ease',
              }}
            >
              {t('cta.primaryCta')}
            </Button>

            <Button
              component={Link}
              href="/demo"
              variant="outlined"
              size="large"
              startIcon={<CalendarMonth />}
              sx={{
                borderColor: 'rgba(255, 255, 255, 0.5)',
                color: 'white',
                fontSize: '1.125rem',
                px: 4,
                py: 1.5,
                textTransform: 'none',
                '&:hover': {
                  borderColor: 'white',
                  bgcolor: 'rgba(255, 255, 255, 0.1)',
                  transform: 'translateY(-2px)',
                },
                transition: 'all 0.3s ease',
              }}
            >
              {t('cta.secondaryCta')}
            </Button>
          </Stack>

          {/* Benefits */}
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={{ xs: 1, sm: 3 }}
            justifyContent="center"
            alignItems="center"
          >
            {benefits.map(({ key }) => (
              <Chip
                key={key}
                icon={<Check sx={{ color: 'white !important' }} />}
                label={t(`cta.${key}`)}
                sx={{
                  bgcolor: 'rgba(255, 255, 255, 0.2)',
                  color: 'white',
                  fontWeight: 500,
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  '& .MuiChip-icon': {
                    color: 'white',
                  },
                }}
              />
            ))}
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}
