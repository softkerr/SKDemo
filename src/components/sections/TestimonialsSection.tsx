'use client';

import { useTranslation } from 'react-i18next';
import { Box, Container, Typography, Grid, Card, CardContent, Avatar, Chip } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { FormatQuote } from '@mui/icons-material';

const testimonials = [
  { key: 'testimonial1' },
  { key: 'testimonial2' },
  { key: 'testimonial3' },
];

export function TestimonialsSection() {
  const { t } = useTranslation('home');
  const theme = useTheme();

  return (
    <Box
      component="section"
      data-section="testimonials"
      sx={{
        py: { xs: 8, md: 12 },
        bgcolor: theme.palette.mode === 'dark'
          ? 'background.paper'
          : 'background.default',
      }}
    >
      <Container maxWidth="lg">
        {/* Section Header */}
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Chip
            label={t('testimonials.badge')}
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
            {t('testimonials.title')}
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
            {t('testimonials.description')}
          </Typography>
        </Box>

        {/* Testimonials Grid */}
        <Grid container spacing={4}>
          {testimonials.map(({ key }) => (
            <Grid item xs={12} md={4} key={key}>
              <Card
                elevation={0}
                sx={{
                  height: '100%',
                  border: 1,
                  borderColor: theme.palette.mode === 'dark'
                    ? 'grey.800'
                    : 'grey.200',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: theme.palette.mode === 'dark'
                      ? '0 12px 24px rgba(0, 0, 0, 0.3)'
                      : '0 12px 24px rgba(0, 0, 0, 0.1)',
                    borderColor: 'primary.main',
                  },
                }}
              >
                <CardContent sx={{ p: 4 }}>
                  {/* Quote Icon */}
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      bgcolor: theme.palette.mode === 'dark'
                        ? 'rgba(59, 130, 246, 0.1)'
                        : 'rgba(96, 165, 250, 0.1)',
                      mb: 3,
                    }}
                  >
                    <FormatQuote
                      sx={{
                        fontSize: 24,
                        color: 'primary.main',
                      }}
                    />
                  </Box>

                  {/* Quote */}
                  <Typography
                    variant="body1"
                    sx={{
                      mb: 4,
                      lineHeight: 1.7,
                      fontSize: '1rem',
                    }}
                  >
                    "{t(`testimonials.${key}.quote`)}"
                  </Typography>

                  {/* Author Info */}
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Avatar
                      sx={{
                        width: 48,
                        height: 48,
                        bgcolor: 'primary.main',
                        fontSize: '1.125rem',
                        fontWeight: 600,
                      }}
                    >
                      {t(`testimonials.${key}.author`).charAt(0)}
                    </Avatar>
                    <Box>
                      <Typography
                        variant="subtitle2"
                        sx={{
                          fontWeight: 600,
                          fontSize: '0.9375rem',
                        }}
                      >
                        {t(`testimonials.${key}.author`)}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ fontSize: '0.875rem' }}
                      >
                        {t(`testimonials.${key}.role`)}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
