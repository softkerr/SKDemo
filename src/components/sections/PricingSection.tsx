'use client';

import { useTranslation } from 'react-i18next';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip,
  Stack,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Check } from '@mui/icons-material';
import { useCurrency } from '@/context/CurrencyContext';

const plans = [
  {
    key: 'starter',
    features: ['feature1', 'feature2', 'feature3', 'feature4', 'feature5', 'feature6'],
    highlighted: false,
  },
  {
    key: 'professional',
    features: [
      'feature1',
      'feature2',
      'feature3',
      'feature4',
      'feature5',
      'feature6',
      'feature7',
      'feature8',
    ],
    highlighted: true,
  },
  {
    key: 'enterprise',
    features: [
      'feature1',
      'feature2',
      'feature3',
      'feature4',
      'feature5',
      'feature6',
      'feature7',
      'feature8',
    ],
    highlighted: false,
  },
];

export function PricingSection() {
  const { t } = useTranslation('home');
  const theme = useTheme();
  const { formatPrice } = useCurrency();

  return (
    <Box
      component="section"
      data-section="pricing"
      sx={{
        py: { xs: 8, md: 12 },
        bgcolor: theme.palette.mode === 'dark' ? 'background.default' : 'grey.50',
      }}
    >
      <Container maxWidth="lg">
        {/* Section Header */}
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Chip
            label={t('pricing.badge')}
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
            {t('pricing.title')}
          </Typography>
          <Typography
            variant="h6"
            color="text.secondary"
            sx={{
              maxWidth: '42rem',
              mx: 'auto',
              fontSize: { xs: '1rem', md: '1.125rem' },
              mb: 4,
            }}
          >
            {t('pricing.description')}
          </Typography>

          {/* Billing Toggle */}
          <Stack
            direction="row"
            spacing={2}
            alignItems="center"
            justifyContent="center"
            sx={{
              display: 'inline-flex',
              p: 0.5,
              borderRadius: 2,
              bgcolor: theme.palette.mode === 'dark' ? 'background.paper' : 'background.paper',
              border: 1,
              borderColor: theme.palette.mode === 'dark' ? 'grey.800' : 'grey.200',
            }}
          >
            <Button variant="contained" size="small" sx={{ textTransform: 'none' }}>
              {t('pricing.monthly')}
            </Button>
            <Button variant="text" size="small" sx={{ textTransform: 'none' }}>
              {t('pricing.yearly')}
            </Button>
            <Chip
              label={t('pricing.yearlyDiscount')}
              size="small"
              color="success"
              sx={{ fontWeight: 500 }}
            />
          </Stack>
        </Box>

        {/* Pricing Cards */}
        <Grid container spacing={4} alignItems="stretch">
          {plans.map(({ key, features, highlighted }) => (
            <Grid size={{ xs: 12, md: 4 }} key={key}>
              <Card
                elevation={highlighted ? 8 : 0}
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                  border: highlighted ? 2 : 1,
                  borderColor: highlighted
                    ? 'primary.main'
                    : theme.palette.mode === 'dark'
                      ? 'grey.800'
                      : 'grey.200',
                  transition: 'all 0.3s ease',
                  transform: highlighted ? 'scale(1.05)' : 'scale(1)',
                  '&:hover': {
                    transform: highlighted ? 'scale(1.08)' : 'scale(1.02)',
                    boxShadow:
                      theme.palette.mode === 'dark'
                        ? '0 12px 24px rgba(59, 130, 246, 0.2)'
                        : '0 12px 24px rgba(37, 99, 235, 0.15)',
                  },
                }}
              >
                {highlighted && (
                  <Chip
                    label={t(`pricing.${key}.badge`)}
                    color="primary"
                    size="small"
                    sx={{
                      position: 'absolute',
                      top: 16,
                      right: 16,
                      fontWeight: 600,
                    }}
                  />
                )}

                <CardContent sx={{ p: 4, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                  {/* Plan Name */}
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: 600,
                      mb: 1,
                    }}
                  >
                    {t(`pricing.${key}.name`)}
                  </Typography>

                  {/* Description */}
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                    {t(`pricing.${key}.description`)}
                  </Typography>

                  {/* Price */}
                  <Box sx={{ mb: 4 }}>
                    <Typography
                      component="span"
                      sx={{
                        fontSize: '3rem',
                        fontWeight: 700,
                        lineHeight: 1,
                      }}
                    >
                      {key === 'enterprise'
                        ? t(`pricing.${key}.price`)
                        : formatPrice(
                            Number(t(`pricing.${key}.priceUSD`)),
                            Number(t(`pricing.${key}.priceEUR`))
                          )}
                    </Typography>
                    <Typography
                      component="span"
                      color="text.secondary"
                      sx={{
                        fontSize: '1.125rem',
                        ml: 0.5,
                      }}
                    >
                      {t(`pricing.${key}.period`)}
                    </Typography>
                  </Box>

                  {/* CTA Button */}
                  <Button
                    variant={highlighted ? 'contained' : 'outlined'}
                    size="large"
                    fullWidth
                    sx={{
                      mb: 4,
                      py: 1.5,
                      textTransform: 'none',
                      fontSize: '1rem',
                    }}
                  >
                    {t(`pricing.${key}.cta`)}
                  </Button>

                  {/* Features List */}
                  <List sx={{ flexGrow: 1 }}>
                    {features.map((feature) => (
                      <ListItem key={feature} disablePadding sx={{ mb: 1.5 }}>
                        <ListItemIcon sx={{ minWidth: 32 }}>
                          <Check
                            sx={{
                              fontSize: 20,
                              color: 'primary.main',
                            }}
                          />
                        </ListItemIcon>
                        <ListItemText
                          primary={t(`pricing.${key}.features.${feature}`)}
                          primaryTypographyProps={{
                            variant: 'body2',
                            sx: { fontSize: '0.9375rem' },
                          }}
                        />
                      </ListItem>
                    ))}
                  </List>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
