'use client';

import { useTranslation } from 'react-i18next';
import { Box, Container, Typography, Grid } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const stats = [
  { key: 'stat1' },
  { key: 'stat2' },
  { key: 'stat3' },
  { key: 'stat4' },
];

export function StatsSection() {
  const { t } = useTranslation('home');
  const theme = useTheme();

  return (
    <Box
      component="section"
      data-section="stats"
      sx={{
        py: { xs: 8, md: 12 },
        position: 'relative',
        overflow: 'hidden',
        background: theme.palette.mode === 'dark'
          ? 'linear-gradient(135deg, #1e3a8a 0%, #7c3aed 100%)'
          : 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
      }}
    >
      {/* Decorative background */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: { xs: '200px', md: '400px' },
          height: { xs: '200px', md: '400px' },
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: '2rem', md: '2.5rem', lg: '3rem' },
              fontWeight: 700,
              color: 'white',
              mb: 2,
            }}
          >
            {t('stats.title')}
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {stats.map(({ key }) => (
            <Grid item xs={6} md={3} key={key}>
              <Box
                sx={{
                  textAlign: 'center',
                  p: 3,
                  borderRadius: 2,
                  backdropFilter: 'blur(10px)',
                  bgcolor: 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    bgcolor: 'rgba(255, 255, 255, 0.15)',
                  },
                }}
              >
                <Typography
                  variant="h3"
                  sx={{
                    fontSize: { xs: '2rem', md: '2.5rem', lg: '3rem' },
                    fontWeight: 700,
                    color: 'white',
                    mb: 1,
                  }}
                >
                  {t(`stats.${key}.value`)}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: 'rgba(255, 255, 255, 0.9)',
                    fontSize: { xs: '0.875rem', md: '1rem' },
                  }}
                >
                  {t(`stats.${key}.label`)}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
