'use client';

import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import { useTranslation } from 'react-i18next';

export const Footer: React.FC = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        py: 6,
        px: 2,
        mt: 'auto',
        backgroundColor: (theme) =>
          theme.palette.mode === 'light'
            ? theme.palette.grey[200]
            : theme.palette.grey[900],
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 4 }}>
            <Typography variant="h6" gutterBottom>
              Company
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Innovative solutions for your business needs.
            </Typography>
          </Grid>
          
          <Grid size={{ xs: 12, md: 4 }}>
            <Typography variant="h6" gutterBottom>
              Quick Links
            </Typography>
            <Stack spacing={1}>
              <Link href="/" underline="hover" color="text.secondary">
                {t('common.home')}
              </Link>
              <Link href="/services" underline="hover" color="text.secondary">
                {t('common.services')}
              </Link>
              <Link href="/about" underline="hover" color="text.secondary">
                {t('common.about')}
              </Link>
              <Link href="/contact" underline="hover" color="text.secondary">
                {t('common.contact')}
              </Link>
            </Stack>
          </Grid>
          
          <Grid size={{ xs: 12, md: 4 }}>
            <Typography variant="h6" gutterBottom>
              {t('contact.contactUs')}
            </Typography>
            <Stack spacing={1}>
              <Typography variant="body2" color="text.secondary">
                {t('contact.email')}: info@company.com
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {t('contact.phone')}: +1 (555) 123-4567
              </Typography>
            </Stack>
          </Grid>
        </Grid>
        
        <Box mt={4}>
          <Typography variant="body2" color="text.secondary" align="center">
            © {currentYear} Company. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};
