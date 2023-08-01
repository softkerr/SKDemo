'use client';

import React, { useState, useEffect } from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import { useTranslation } from 'react-i18next';
import type { Currency } from '@/types/app';

export default function ServicesPage() {
  const { t } = useTranslation();
  const [currency, setCurrency] = useState<Currency>('USD');

  useEffect(() => {
    const savedCurrency = localStorage.getItem('currency') as Currency;
    if (savedCurrency) {
      setCurrency(savedCurrency);
    }

    const handleCurrencyChange = (event: any) => {
      setCurrency(event.detail);
    };

    window.addEventListener('currencyChange', handleCurrencyChange);
    return () => {
      window.removeEventListener('currencyChange', handleCurrencyChange);
    };
  }, []);

  const services = [
    {
      title: t('services.service1Title'),
      description: t('services.service1Description'),
      priceUSD: 5000,
      priceEUR: 4500,
    },
    {
      title: t('services.service2Title'),
      description: t('services.service2Description'),
      priceUSD: 7500,
      priceEUR: 6800,
    },
    {
      title: t('services.service3Title'),
      description: t('services.service3Description'),
      priceUSD: 10000,
      priceEUR: 9000,
    },
  ];

  const formatPrice = (priceUSD: number, priceEUR: number) => {
    if (currency === 'USD') {
      return `$${priceUSD.toLocaleString()}`;
    } else {
      return `€${priceEUR.toLocaleString()}`;
    }
  };

  return (
    <Box>
      {/* Header Section */}
      <Box
        sx={{
          bgcolor: 'background.paper',
          py: { xs: 6, md: 8 },
          borderBottom: 1,
          borderColor: 'divider',
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="h2"
            component="h1"
            textAlign="center"
            gutterBottom
          >
            {t('services.title')}
          </Typography>
          <Typography
            variant="h5"
            textAlign="center"
            color="text.secondary"
            sx={{ maxWidth: 800, mx: 'auto' }}
          >
            {t('services.subtitle')}
          </Typography>
        </Container>
      </Box>

      {/* Services Grid */}
      <Container maxWidth="lg" sx={{ py: { xs: 8, md: 12 } }}>
        <Grid container spacing={4}>
          {services.map((service, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                  },
                }}
              >
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h5" component="h3" gutterBottom>
                    {service.title}
                  </Typography>
                  <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{ mb: 3 }}
                  >
                    {service.description}
                  </Typography>
                  <Typography
                    variant="h4"
                    color="primary"
                    sx={{ mb: 2, fontWeight: 600 }}
                  >
                    {formatPrice(service.priceUSD, service.priceEUR)}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Starting price
                  </Typography>
                </CardContent>
                <Box sx={{ p: 2, pt: 0 }}>
                  <Button variant="contained" fullWidth>
                    {t('common.learnMore')}
                  </Button>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
