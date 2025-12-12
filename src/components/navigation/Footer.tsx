'use client';

import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import NextLink from 'next/link';
import { useTranslation } from 'react-i18next';
import { ROUTES, COMPANY_INFO } from '@/constants';

export const Footer: React.FC = () => {
  const { t } = useTranslation('common');

  const footerLinks = {
    company: [
      { label: t('navigation.shop'), href: ROUTES.SHOP },
      { label: t('navigation.studio'), href: ROUTES.STUDIO },
      { label: t('navigation.admin'), href: ROUTES.ADMIN },
      { label: t('navigation.contacts'), href: ROUTES.CONTACTS },
    ],
    legal: [
      { label: t('footer.links.privacy'), href: '#' },
      { label: t('footer.links.terms'), href: '#' },
      { label: 'Cookies', href: '#' },
    ],
  };

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: 'background.paper',
        borderTop: 1,
        borderColor: 'divider',
        py: 6,
        mt: 'auto',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 4 }}>
            <Typography variant="h6" fontWeight={800} gutterBottom>
              {COMPANY_INFO.name}
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              {COMPANY_INFO.tagline}
            </Typography>
            <Stack direction="row" spacing={1}>
              <IconButton
                size="small"
                component="a"
                href={COMPANY_INFO.social.github}
                target="_blank"
                rel="noopener"
              >
                <GitHubIcon />
              </IconButton>
              <IconButton
                size="small"
                component="a"
                href={COMPANY_INFO.social.linkedin}
                target="_blank"
                rel="noopener"
              >
                <LinkedInIcon />
              </IconButton>
              <IconButton
                size="small"
                component="a"
                href={COMPANY_INFO.social.twitter}
                target="_blank"
                rel="noopener"
              >
                <TwitterIcon />
              </IconButton>
            </Stack>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <Typography variant="h6" fontWeight={700} gutterBottom>
              {t('footer.company')}
            </Typography>
            <Stack spacing={1}>
              {footerLinks.company.map((link) => (
                <Link
                  key={link.href}
                  component={NextLink}
                  href={link.href}
                  color="text.secondary"
                  underline="hover"
                  sx={{ display: 'block' }}
                >
                  {link.label}
                </Link>
              ))}
            </Stack>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <Typography variant="h6" fontWeight={700} gutterBottom>
              {t('footer.legal')}
            </Typography>
            <Stack spacing={1}>
              {footerLinks.legal.map((link, index) => (
                <Link
                  key={index}
                  component={NextLink}
                  href={link.href}
                  color="text.secondary"
                  underline="hover"
                  sx={{ display: 'block' }}
                >
                  {link.label}
                </Link>
              ))}
            </Stack>
          </Grid>
        </Grid>

        <Box sx={{ mt: 4, pt: 3, borderTop: 1, borderColor: 'divider' }}>
          <Typography variant="body2" color="text.secondary" align="center">
            © {new Date().getFullYear()} {COMPANY_INFO.name}.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};
