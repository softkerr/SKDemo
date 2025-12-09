'use client';

import { useTranslation } from 'react-i18next';
import { Box, Container, Typography, Grid, Card, CardContent, Chip } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import {
  Dashboard,
  People,
  Schedule,
  Chat,
  BarChart,
  Extension,
} from '@mui/icons-material';

const features = [
  { key: 'feature1', icon: Dashboard },
  { key: 'feature2', icon: People },
  { key: 'feature3', icon: Schedule },
  { key: 'feature4', icon: Chat },
  { key: 'feature5', icon: BarChart },
  { key: 'feature6', icon: Extension },
];

export function FeaturesSection() {
  const { t } = useTranslation('home');
  const theme = useTheme();

  return (
    <Box
      component="section"
      data-section="features"
      sx={{
        py: { xs: 8, md: 12 },
        bgcolor: theme.palette.mode === 'dark'
          ? 'background.default'
          : 'grey.50',
      }}
    >
      <Container maxWidth="lg">
        {/* Section Header */}
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Chip
            label={t('features.badge')}
            color="primary"
            variant="outlined"
            sx={{ mb: 2, fontWeight: 500 }}
          />
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: '2rem', md: '2.5rem', lg: '3rem' },
              fontWeight: 700,
              mb: 2,
            }}
          >
            {t('features.title')}
          </Typography>
          <Typography
            variant="h6"
            color="text.secondary"
            sx={{
              maxWidth: '42rem',
              mx: 'auto',
              fontSize: { xs: '1rem', md: '1.125rem' },
            }}
          >
            {t('features.description')}
          </Typography>
        </Box>

        {/* Features Grid */}
        <Grid container spacing={4}>
          {features.map(({ key, icon: Icon }) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={key}>
              <Card
                elevation={0}
                sx={{
                  height: '100%',
                  bgcolor: theme.palette.mode === 'dark'
                    ? 'background.paper'
                    : 'background.paper',
                  border: 1,
                  borderColor: theme.palette.mode === 'dark'
                    ? 'grey.800'
                    : 'grey.200',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: theme.palette.mode === 'dark'
                      ? '0 12px 24px rgba(59, 130, 246, 0.15)'
                      : '0 12px 24px rgba(37, 99, 235, 0.1)',
                    borderColor: 'primary.main',
                  },
                }}
              >
                <CardContent sx={{ p: 4 }}>
                  {/* Icon */}
                  <Box
                    sx={{
                      width: 56,
                      height: 56,
                      borderRadius: 2,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mb: 3,
                      background: theme.palette.mode === 'dark'
                        ? 'linear-gradient(135deg, rgba(59, 130, 246, 0.2) 0%, rgba(168, 85, 247, 0.2) 100%)'
                        : 'linear-gradient(135deg, rgba(96, 165, 250, 0.2) 0%, rgba(192, 132, 252, 0.2) 100%)',
                    }}
                  >
                    <Icon
                      sx={{
                        fontSize: 32,
                        color: 'primary.main',
                      }}
                    />
                  </Box>

                  {/* Title */}
                  <Typography
                    variant="h5"
                    sx={{
                      fontSize: '1.25rem',
                      fontWeight: 600,
                      mb: 1.5,
                    }}
                  >
                    {t(`features.${key}.title`)}
                  </Typography>

                  {/* Description */}
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      lineHeight: 1.6,
                    }}
                  >
                    {t(`features.${key}.description`)}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
