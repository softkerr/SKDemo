import React from 'react';
import { Box, Container, Typography, Button, Stack, Grid, Chip } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Link from 'next/link';
import { Business, TrendingUp, Insights, ArrowForward } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

const businessCardsList = [
  {
    icon: <Business />,
    labelKey: 'enterprise',
    color: '#10b981',
  },
  {
    icon: <TrendingUp />,
    labelKey: 'ecommerce',
    color: '#3b82f6',
  },
  {
    icon: <Insights />,
    labelKey: 'analytics',
    color: '#f59e0b',
  },
];

export const HeroSection: React.FC = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const { t } = useTranslation('home');

  return (
    <Box
      sx={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        bgcolor: isDark ? '#000' : '#fff',
        borderBottom: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={6} alignItems="center">
          {/* Left: Content */}
          <Grid item xs={12} md={7}>
            <Stack spacing={5}>
              <Box>
                <Typography
                  variant="overline"
                  sx={{
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    letterSpacing: 4,
                    color: 'text.secondary',
                    mb: 2,
                  }}
                >
                  {t('hero.badge')}
                </Typography>

                <Typography
                  variant="h1"
                  sx={{
                    fontSize: { xs: '3.5rem', md: '6rem' },
                    fontWeight: 900,

                    mb: 3,
                    color: 'text.primary',
                  }}
                >
                  {t('hero.title.line1')}
                  <br />
                  {t('hero.title.line2')}
                  <br />
                  {t('hero.title.line3')}
                  <br />
                  {t('hero.title.line4')}
                </Typography>

                <Typography
                  variant="h5"
                  color="text.secondary"
                  sx={{
                    maxWidth: '540px',
                    fontWeight: 400,
                    lineHeight: 1.6,
                    fontSize: { xs: '1.1rem', md: '1.25rem' },
                  }}
                >
                  {t('hero.description')}
                </Typography>
              </Box>

              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <Button
                  component={Link}
                  href="/admin"
                  variant="contained"
                  size="large"
                  endIcon={<ArrowForward />}
                  sx={{
                    bgcolor: isDark ? 'white' : 'black',
                    color: isDark ? 'black' : 'white',
                    px: 4,
                    py: 2,
                    fontSize: '1.1rem',
                    fontWeight: 700,
                    borderRadius: 0,
                    textTransform: 'none',
                    '&:hover': {
                      bgcolor: isDark ? '#f5f5f5' : '#333',
                    },
                  }}
                >
                  {t('hero.buttons.primary')}
                </Button>
                <Button
                  component={Link}
                  href="/shop"
                  variant="outlined"
                  size="large"
                  sx={{
                    borderColor: 'divider',
                    color: 'text.primary',
                    px: 4,
                    py: 2,
                    fontSize: '1.1rem',
                    fontWeight: 700,
                    borderRadius: 0,
                    textTransform: 'none',
                    borderWidth: 2,
                    '&:hover': {
                      borderWidth: 2,
                      borderColor: 'text.primary',
                    },
                  }}
                >
                  {t('hero.buttons.secondary')}
                </Button>
              </Stack>
            </Stack>
          </Grid>

          <Grid item xs={12} md={5}>
            <Stack spacing={3}>
              {businessCardsList.map((metric, idx) => (
                <Box
                  key={idx}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 3,
                    p: 3,
                    border: '1px solid',
                    borderColor: 'divider',
                    bgcolor: 'background.paper',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      borderColor: metric.color,
                      transform: 'translateX(8px)',
                    },
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 56,
                      height: 56,
                      bgcolor: `${metric.color}15`,
                      color: metric.color,
                    }}
                  >
                    {React.cloneElement(metric.icon, { sx: { fontSize: 28 } })}
                  </Box>
                  <Box>
                    <Typography variant="h6" fontWeight={700} sx={{ mb: 0.5 }}>
                      {t(`hero.businessCards.${metric.labelKey}.label`)}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" fontWeight={500}>
                      {t(`hero.businessCards.${metric.labelKey}.value`)}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};
