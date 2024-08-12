'use client';

import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Container, Typography, Grid, Card, CardContent, Button, List, ListItem, ListItemIcon, ListItemText, Chip, Stack, Switch, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Check, Close } from '@mui/icons-material';
import { useCurrency } from '@/context/CurrencyContext';

const plans = [
  { 
    id: 'starter',
    highlighted: false,
  },
  { 
    id: 'professional',
    highlighted: true,
  },
  { 
    id: 'enterprise',
    highlighted: false,
  },
];

const comparisonFeatures = [
  'teamMembers',
  'projects',
  'storage',
  'timeTracking',
  'clientPortal',
  'kanbanBoards',
  'analytics',
  'apiAccess',
  'customBranding',
  'prioritySupport',
  'whiteLabel',
  'dedicatedManager',
  'sla',
];

export default function PricingPage() {
  const { t } = useTranslation('pricing');
  const theme = useTheme();
  const { formatPrice } = useCurrency();
  const [isAnnual, setIsAnnual] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const getPrice = (planId: string) => {
    if (planId === 'enterprise') return null;
    
    const monthlyUSD = Number(t(`plans.${planId}.priceMonthlyUSD`));
    const monthlyEUR = Number(t(`plans.${planId}.priceMonthlyEUR`));
    const yearlyUSD = Number(t(`plans.${planId}.priceYearlyUSD`));
    const yearlyEUR = Number(t(`plans.${planId}.priceYearlyEUR`));

    if (isAnnual) {
      return formatPrice(yearlyUSD, yearlyEUR);
    }
    return formatPrice(monthlyUSD, monthlyEUR);
  };

  const getSavings = () => {
    const starterMonthlyUSD = Number(t('plans.starter.priceMonthlyUSD'));
    const starterYearlyUSD = Number(t('plans.starter.priceYearlyUSD'));
    const savingsPercent = Math.round(((starterMonthlyUSD * 12 - starterYearlyUSD) / (starterMonthlyUSD * 12)) * 100);
    return savingsPercent;
  };

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          position: 'relative',
          overflow: 'hidden',
          py: { xs: 8, md: 12 },
          bgcolor: theme.palette.mode === 'dark' ? 'background.paper' : 'grey.50',
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Chip
              label={t('hero.badge')}
              color="primary"
              variant="outlined"
              sx={{ mb: 2, fontWeight: 500 }}
            />
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: '2.5rem', md: '3.5rem' },
                fontWeight: 700,
                mb: 2,
              }}
            >
              {t('hero.title')}
            </Typography>
            <Typography
              variant="h5"
              color="text.secondary"
              sx={{
                fontSize: { xs: '1.125rem', md: '1.25rem' },
                mb: 4,
                maxWidth: '42rem',
                mx: 'auto',
              }}
            >
              {t('hero.description')}
            </Typography>

            {/* Billing Toggle */}
            <Stack
              direction="row"
              spacing={2}
              alignItems="center"
              justifyContent="center"
              sx={{ mt: 4 }}
            >
              <Typography
                sx={{
                  fontWeight: !isAnnual ? 600 : 400,
                  color: !isAnnual ? 'primary.main' : 'text.secondary',
                }}
              >
                {t('hero.monthly')}
              </Typography>
              <Switch
                checked={isAnnual}
                onChange={(e) => setIsAnnual(e.target.checked)}
                color="primary"
              />
              <Stack direction="row" spacing={1} alignItems="center">
                <Typography
                  sx={{
                    fontWeight: isAnnual ? 600 : 400,
                    color: isAnnual ? 'primary.main' : 'text.secondary',
                  }}
                >
                  {t('hero.yearly')}
                </Typography>
                {isAnnual && (
                  <Chip
                    label={t('hero.savePercent', { percent: getSavings() })}
                    size="small"
                    color="success"
                    sx={{ fontWeight: 600 }}
                  />
                )}
              </Stack>
            </Stack>
          </Box>
        </Container>
      </Box>

      {/* Pricing Cards */}
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 8 } }}>
        <Grid container spacing={4} alignItems="stretch">
          {plans.map((plan) => {
            const price = getPrice(plan.id);
            
            return (
              <Grid item xs={12} md={4} key={plan.id}>
                <Card
                  elevation={plan.highlighted ? 12 : 0}
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    position: 'relative',
                    border: plan.highlighted ? 3 : 1,
                    borderColor: plan.highlighted ? 'primary.main' : theme.palette.mode === 'dark' ? 'grey.800' : 'grey.200',
                    transform: plan.highlighted ? 'scale(1.05)' : 'scale(1)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: plan.highlighted ? 'scale(1.08)' : 'scale(1.03)',
                      boxShadow: theme.palette.mode === 'dark'
                        ? '0 12px 24px rgba(59, 130, 246, 0.3)'
                        : '0 12px 24px rgba(37, 99, 235, 0.2)',
                    },
                  }}
                >
                  {plan.highlighted && (
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bgcolor: 'primary.main',
                        color: 'white',
                        py: 1,
                        textAlign: 'center',
                        fontWeight: 600,
                        fontSize: '0.875rem',
                      }}
                    >
                      {t(`plans.${plan.id}.badge`)}
                    </Box>
                  )}

                  <CardContent sx={{ p: 4, pt: plan.highlighted ? 7 : 4, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                    {/* Plan Name */}
                    <Typography
                      variant="h4"
                      sx={{
                        fontWeight: 700,
                        mb: 1,
                        color: plan.highlighted ? 'primary.main' : 'text.primary',
                      }}
                    >
                      {t(`plans.${plan.id}.name`)}
                    </Typography>

                    {/* Description */}
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mb: 4, minHeight: '3rem' }}
                    >
                      {t(`plans.${plan.id}.description`)}
                    </Typography>

                    {/* Price */}
                    <Box sx={{ mb: 4 }}>
                      {price ? (
                        <>
                          <Typography
                            component="span"
                            sx={{
                              fontSize: '3.5rem',
                              fontWeight: 700,
                              lineHeight: 1,
                              color: plan.highlighted ? 'primary.main' : 'text.primary',
                            }}
                          >
                            {price}
                          </Typography>
                          <Typography
                            component="span"
                            color="text.secondary"
                            sx={{
                              fontSize: '1.125rem',
                              ml: 0.5,
                            }}
                          >
                            {isAnnual ? t('hero.perYear') : t('hero.perMonth')}
                          </Typography>
                          {isAnnual && (
                            <Typography
                              variant="caption"
                              color="success.main"
                              sx={{ display: 'block', mt: 1, fontWeight: 600 }}
                            >
                              {t('plans.yearlyNote')}
                            </Typography>
                          )}
                        </>
                      ) : (
                        <Typography
                          sx={{
                            fontSize: '2.5rem',
                            fontWeight: 700,
                            color: plan.highlighted ? 'primary.main' : 'text.primary',
                          }}
                        >
                          {t('plans.enterprise.customPrice')}
                        </Typography>
                      )}
                    </Box>

                    {/* CTA Button */}
                    <Button
                      variant={plan.highlighted ? 'contained' : 'outlined'}
                      size="large"
                      fullWidth
                      sx={{
                        mb: 4,
                        py: 1.5,
                        textTransform: 'none',
                        fontSize: '1.125rem',
                        fontWeight: 600,
                      }}
                    >
                      {t(`plans.${plan.id}.cta`)}
                    </Button>

                    {/* Features List */}
                    <Typography
                      variant="subtitle2"
                      sx={{ fontWeight: 600, mb: 2 }}
                    >
                      {t('plans.featuresIncluded')}
                    </Typography>
                    <List sx={{ flexGrow: 1 }}>
                      {(() => {
                        const features = t(`plans.${plan.id}.features`, { returnObjects: true });
                        if (Array.isArray(features)) {
                          return features.map((feature, index: number) => (
                            <ListItem key={index} disablePadding sx={{ mb: 1.5 }}>
                              <ListItemIcon sx={{ minWidth: 32 }}>
                                <Check
                                  sx={{
                                    fontSize: 20,
                                    color: plan.highlighted ? 'primary.main' : 'success.main',
                                  }}
                                />
                              </ListItemIcon>
                              <ListItemText
                                primary={String(feature)}
                                primaryTypographyProps={{
                                  variant: 'body2',
                                  sx: { fontSize: '0.9375rem' },
                                }}
                              />
                            </ListItem>
                          ));
                        }
                        return null;
                      })()}
                    </List>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Container>

      {/* Feature Comparison Table */}
      {isMounted && (
        <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: theme.palette.mode === 'dark' ? 'background.paper' : 'grey.50' }}>
          <Container maxWidth="lg">
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: '2rem', md: '2.5rem' },
                fontWeight: 700,
                textAlign: 'center',
                mb: 6,
              }}
            >
              {t('comparison.title')}
            </Typography>

            <TableContainer
              component={Paper}
              elevation={0}
              sx={{
                border: 1,
                borderColor: theme.palette.mode === 'dark' ? 'grey.800' : 'grey.200',
              }}
            >
              <Table>
                <TableHead>
                  <TableRow sx={{ bgcolor: theme.palette.mode === 'dark' ? 'grey.900' : 'grey.100' }}>
                    <TableCell sx={{ fontWeight: 700, fontSize: '1rem' }}>
                      {t('comparison.feature')}
                    </TableCell>
                    {plans.map((plan) => (
                      <TableCell
                        key={plan.id}
                        align="center"
                        sx={{
                          fontWeight: 700,
                          fontSize: '1rem',
                          color: plan.highlighted ? 'primary.main' : 'text.primary',
                        }}
                      >
                        {t(`plans.${plan.id}.name`)}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {comparisonFeatures.map((feature, index) => (
                    <TableRow
                      key={feature}
                      sx={{
                        '&:nth-of-type(odd)': {
                          bgcolor: theme.palette.mode === 'dark' ? 'grey.900' : 'grey.50',
                        },
                      }}
                    >
                      <TableCell sx={{ fontWeight: 500 }}>
                        {t(`comparison.features.${feature}`)}
                      </TableCell>
                      {plans.map((plan) => {
                        const value = t(`comparison.values.${plan.id}.${feature}`);
                        const isBoolean = value === 'true' || value === 'false';
                        
                        return (
                          <TableCell key={plan.id} align="center">
                            {isBoolean ? (
                              value === 'true' ? (
                                <Check sx={{ color: 'success.main' }} />
                              ) : (
                                <Close sx={{ color: 'text.disabled' }} />
                              )
                            ) : (
                              <Typography sx={{ fontWeight: 500 }}>
                                {value}
                              </Typography>
                            )}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Container>
        </Box>
      )}

      {/* FAQ Section */}
      <Container maxWidth="md" sx={{ py: { xs: 8, md: 12 } }}>
        <Typography
          variant="h2"
          sx={{
            fontSize: { xs: '2rem', md: '2.5rem' },
            fontWeight: 700,
            textAlign: 'center',
            mb: 6,
          }}
        >
          {t('faq.title')}
        </Typography>

        <Grid container spacing={3}>
          {[1, 2, 3, 4].map((num) => (
            <Grid item xs={12} key={num}>
              <Card
                elevation={0}
                sx={{
                  border: 1,
                  borderColor: theme.palette.mode === 'dark' ? 'grey.800' : 'grey.200',
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                    {t(`faq.question${num}`)}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                    {t(`faq.answer${num}`)}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* CTA Section */}
      <Box
        sx={{
          bgcolor: theme.palette.mode === 'dark'
            ? 'linear-gradient(135deg, #1e3a8a 0%, #7c3aed 100%)'
            : 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
          background: theme.palette.mode === 'dark'
            ? 'linear-gradient(135deg, #1e3a8a 0%, #7c3aed 100%)'
            : 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
          py: { xs: 8, md: 12 },
        }}
      >
        <Container maxWidth="md">
          <Box sx={{ textAlign: 'center' }}>
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: '2rem', md: '2.5rem' },
                fontWeight: 700,
                color: 'white',
                mb: 2,
              }}
            >
              {t('cta.title')}
            </Typography>
            <Typography
              variant="h6"
              sx={{
                color: 'rgba(255, 255, 255, 0.9)',
                mb: 4,
              }}
            >
              {t('cta.description')}
            </Typography>
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={2}
              justifyContent="center"
            >
              <Button
                variant="contained"
                size="large"
                sx={{
                  bgcolor: 'white',
                  color: 'primary.main',
                  px: 4,
                  py: 1.5,
                  fontSize: '1.125rem',
                  textTransform: 'none',
                  '&:hover': {
                    bgcolor: 'grey.100',
                  },
                }}
              >
                {t('cta.primary')}
              </Button>
              <Button
                variant="outlined"
                size="large"
                sx={{
                  borderColor: 'white',
                  color: 'white',
                  px: 4,
                  py: 1.5,
                  fontSize: '1.125rem',
                  textTransform: 'none',
                  '&:hover': {
                    borderColor: 'white',
                    bgcolor: 'rgba(255, 255, 255, 0.1)',
                  },
                }}
              >
                {t('cta.secondary')}
              </Button>
            </Stack>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}
