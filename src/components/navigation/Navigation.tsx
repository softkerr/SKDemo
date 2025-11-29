'use client';

import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { ThemeToggle } from '../switchers/ThemeToggle';
import { LanguageSwitcher } from '../switchers/LanguageSwitcher';
import { CurrencySwitcher } from '../switchers/CurrencySwitcher';
import { ROUTES, COMPANY_INFO } from '@/constants';

export const Navigation: React.FC = () => {
  const { t } = useTranslation('common');
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { label: t('navigation.home'), href: ROUTES.HOME },
    { label: t('navigation.shop'), href: ROUTES.SHOP },
    { label: t('navigation.studio'), href: ROUTES.STUDIO },
    { label: t('navigation.admin'), href: ROUTES.ADMIN },
    { label: t('navigation.contacts'), href: ROUTES.CONTACTS },
  ];

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const isActive = (href: string) => pathname === href;

  return (
    <>
      <AppBar
        position="sticky"
        color="default"
        elevation={0}
        sx={{
          bgcolor: 'background.paper',
          backdropFilter: 'blur(20px)',
        }}
      >
        <Container maxWidth="lg">
          <Toolbar disableGutters>
            {/* Logo */}
            <Typography
              variant="h6"
              component={Link}
              href={ROUTES.HOME}
              sx={{
                mr: 4,
                fontWeight: 800,
                background: (theme) =>
                  theme.palette.mode === 'light'
                    ? 'linear-gradient(135deg, #2F80ED 0%, #56CCF2 100%)'
                    : 'linear-gradient(135deg, #4D9FFF 0%, #8DD6FF 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textDecoration: 'none',
                cursor: 'pointer',
              }}
            >
              {COMPANY_INFO.name}
            </Typography>

            {/* Desktop Navigation */}
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, gap: 1 }}>
              {navItems.map((item) => (
                <Button
                  key={item.href}
                  component={Link}
                  href={item.href}
                  sx={{
                    color: 'text.primary',
                    position: 'relative',
                    fontWeight: isActive(item.href) ? 700 : 500,
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      bottom: 0,
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: isActive(item.href) ? '80%' : '0%',
                      height: 3,
                      bgcolor: 'primary.main',
                      borderRadius: '3px 3px 0 0',
                      transition: 'width 0.3s ease',
                    },
                    '&:hover::after': {
                      width: '80%',
                    },
                  }}
                >
                  {item.label}
                </Button>
              ))}
            </Box>

            {/* Desktop Controls */}
            <Stack
              direction="row"
              spacing={2}
              alignItems="center"
              sx={{ display: { xs: 'none', md: 'flex' } }}
            >
              <CurrencySwitcher />
              <LanguageSwitcher />
              <ThemeToggle />
            </Stack>

            {/* Mobile Menu Button */}
            <Box sx={{ display: { xs: 'flex', md: 'none' }, ml: 'auto', gap: 1 }}>
              <ThemeToggle />
              <IconButton onClick={handleDrawerToggle} size="large" edge="end" color="inherit">
                <MenuIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': {
            width: '100%',
            maxWidth: 360,
          },
        }}
      >
        <Box sx={{ p: 2 }}>
          <Box
            sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}
          >
            <Typography variant="h6" fontWeight={700}>
              Menu
            </Typography>
            <IconButton onClick={handleDrawerToggle}>
              <CloseIcon />
            </IconButton>
          </Box>

          <Divider sx={{ mb: 2 }} />

          <List>
            {navItems.map((item) => (
              <ListItem key={item.href} disablePadding>
                <ListItemButton
                  component={Link}
                  href={item.href}
                  onClick={handleDrawerToggle}
                  selected={isActive(item.href)}
                  sx={{
                    borderRadius: 2,
                    mb: 0.5,
                    '&.Mui-selected': {
                      bgcolor: 'primary.main',
                      color: 'white',
                      '&:hover': {
                        bgcolor: 'primary.dark',
                      },
                    },
                  }}
                >
                  <ListItemText primary={item.label} primaryTypographyProps={{ fontWeight: 600 }} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>

          <Divider sx={{ my: 2 }} />

          <Stack spacing={2} sx={{ px: 2 }}>
            <Box>
              <Typography variant="caption" color="text.secondary" gutterBottom display="block">
                {t('currency.label')}
              </Typography>
              <CurrencySwitcher />
            </Box>
            <Box>
              <Typography variant="caption" color="text.secondary" gutterBottom display="block">
                {t('language.label')}
              </Typography>
              <LanguageSwitcher />
            </Box>
          </Stack>
        </Box>
      </Drawer>
    </>
  );
};
