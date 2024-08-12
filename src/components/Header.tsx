'use client';

import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Badge from '@mui/material/Badge';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { ThemeSwitcher } from './ThemeSwitcher';
import { LanguageSwitcher } from './LanguageSwitcher';
import { CurrencySwitcher } from './CurrencySwitcher';


export const Header: React.FC = () => {
  const { t } = useTranslation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { label: t('common.home'), href: '/' },
    { label: t('common.features'), href: '/features' },
    { label: t('common.pricing'), href: '/pricing' },
    { label: t('common.admin'), href: '/admin', badge: 'New' },
    { label: t('common.services'), href: '/services' },
    { label: t('common.contact'), href: '/contact' },
  ];

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box 
      sx={{ 
        width: '100vw',
        maxWidth: 380,
        height: '100%', 
        bgcolor: 'background.default',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Modern Header Section */}
      <Box
        sx={{
          background: (theme) =>
            theme.palette.mode === 'light'
              ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
              : 'linear-gradient(135deg, #4a5568 0%, #2d3748 100%)',
          p: 3,
          pb: 4,
          color: 'white',
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: -50,
            right: -50,
            width: 200,
            height: 200,
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.1)',
          },
          '&::after': {
            content: '""',
            position: 'absolute',
            bottom: -30,
            left: -30,
            width: 150,
            height: 150,
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.05)',
          },
        }}
      >
        <Box sx={{ position: 'relative', zIndex: 1 }}>
          <Typography 
            variant="h3" 
            sx={{ 
              fontWeight: 900, 
              mb: 0.5,
              fontSize: '2rem',
              textShadow: '2px 2px 4px rgba(0,0,0,0.2)',
            }}
          >
            Company
          </Typography>
          <Typography 
            variant="body2" 
            sx={{ 
              opacity: 0.95,
              fontSize: '0.95rem',
              fontWeight: 300,
              mb: 3,
            }}
          >
            Your trusted partner in innovation
          </Typography>
          
          {/* Quick Switchers */}
          <Stack direction="row" spacing={1.5}>
            <Box
              sx={{
                flex: 1,
                p: 1,
                borderRadius: 2,
                backgroundColor: 'rgba(255,255,255,0.15)',
                backdropFilter: 'blur(10px)',
              }}
            >
              <LanguageSwitcher />
            </Box>
            
            <Box
              sx={{
                flex: 1,
                p: 1,
                borderRadius: 2,
                backgroundColor: 'rgba(255,255,255,0.15)',
                backdropFilter: 'blur(10px)',
              }}
            >
              <CurrencySwitcher />
            </Box>
          </Stack>
        </Box>
      </Box>

      {/* Navigation Section */}
      <Box sx={{ flex: 1, overflowY: 'auto', py: 2 }}>
        <Typography 
          variant="overline" 
          sx={{ 
            px: 3, 
            color: 'text.secondary',
            fontWeight: 700,
            fontSize: '0.75rem',
            letterSpacing: 1,
          }}
        >
          Navigation
        </Typography>
        <List sx={{ px: 2, pt: 1 }}>
          {navItems.map((item, index) => (
            <ListItem key={item.href} disablePadding sx={{ mb: 0.5 }}>
              <ListItemButton
                component={Link}
                href={item.href}
                onClick={handleDrawerToggle}
                sx={{
                  borderRadius: 2,
                  py: 2,
                  px: 2,
                  position: 'relative',
                  overflow: 'hidden',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    height: '100%',
                    width: 4,
                    backgroundColor: 'primary.main',
                    transform: 'scaleY(0)',
                    transition: 'transform 0.3s ease',
                  },
                  '&:hover': {
                    backgroundColor: (theme) => 
                      theme.palette.mode === 'light' 
                        ? 'rgba(102, 126, 234, 0.08)'
                        : 'rgba(144, 202, 249, 0.08)',
                    '&::before': {
                      transform: 'scaleY(1)',
                    },
                    '& .nav-number': {
                      color: 'primary.main',
                      transform: 'scale(1.2)',
                    },
                    '& .arrow-icon': {
                      opacity: 1,
                      transform: 'translateX(0)',
                    },
                  },
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                }}
              >
                <Typography
                  className="nav-number"
                  variant="caption"
                  sx={{
                    mr: 2,
                    color: 'text.secondary',
                    fontWeight: 700,
                    minWidth: 24,
                    transition: 'all 0.3s ease',
                  }}
                >
                  0{index + 1}
                </Typography>
                <ListItemText
                  primary={item.label}
                  primaryTypographyProps={{
                    fontSize: '1.05rem',
                    fontWeight: 600,
                  }}
                />
                {item.badge && (
                  <Badge
                    badgeContent={item.badge}
                    color="error"
                    sx={{ 
                      mr: 1,
                      '& .MuiBadge-badge': {
                        fontSize: '0.65rem',
                        height: 18,
                        minWidth: 18,
                        padding: '0 4px',
                      }
                    }}
                  />
                )}
                <ArrowForwardIcon
                  className="arrow-icon"
                  sx={{
                    fontSize: '1.2rem',
                    opacity: 0,
                    transform: 'translateX(-10px)',
                    transition: 'all 0.3s ease',
                    color: 'primary.main',
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        {/* Footer Info */}
        <Box 
          sx={{ 
            mt: 'auto',
            p: 3, 
            borderTop: 1, 
            borderColor: 'divider',
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? 'rgba(0,0,0,0.02)'
                : 'rgba(255,255,255,0.02)',
          }}
        >
          <Typography variant="caption" color="text.secondary" align="center" display="block">
            © 2025 Company. All rights reserved.
          </Typography>
        </Box>
      </Box>
    </Box>
  );

  return (
    <>
      <AppBar
        position="sticky"
        elevation={4}
        sx={{
          background: (theme) =>
            theme.palette.mode === 'light'
              ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
              : 'linear-gradient(135deg, #1a202c 0%, #2d3748 100%)',
        }}
      >
        <Container maxWidth="lg">
          <Toolbar
            disableGutters
            sx={{
              minHeight: { xs: 70, md: 80 },
            }}
          >
            {/* Logo */}
            <Typography
              variant="h5"
              component={Link}
              href="/"
              sx={{
                mr: 6,
                fontWeight: 900,
                fontSize: { xs: '1.5rem', md: '1.75rem' },
                color: 'white',
                textDecoration: 'none',
                textShadow: '2px 2px 4px rgba(0,0,0,0.2)',
                letterSpacing: '0.5px',
              }}
            >
              COMPANY
            </Typography>

            {/* Desktop Navigation */}
            <Box
              sx={{
                flexGrow: 1,
                display: { xs: 'none', md: 'flex' },
                gap: 1,
              }}
            >
              {navItems.map((item) => (
                <Button
                  key={item.href}
                  component={Link}
                  href={item.href}
                  endIcon={item.badge && <Badge badgeContent={item.badge} color="error" />}
                  sx={{
                    color: 'white',
                    px: 2.5,
                    py: 1,
                    borderRadius: 2,
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    fontSize: '0.875rem',
                    letterSpacing: '0.5px',
                    border: '2px solid transparent',
                    '&:hover': {
                      backgroundColor: 'rgba(255,255,255,0.15)',
                      borderColor: 'rgba(255,255,255,0.3)',
                      transform: 'translateY(-2px)',
                    },
                    transition: 'all 0.3s ease',
                  }}
                >
                  {item.label}
                </Button>
              ))}
            </Box>

            {/* Desktop Switchers */}
            <Stack
              direction="row"
              spacing={1}
              alignItems="center"
              sx={{ display: { xs: 'none', md: 'flex' } }}
            >
              <Box sx={{ color: 'white' }}>
                <CurrencySwitcher />
              </Box>
              <Box sx={{ color: 'white' }}>
                <LanguageSwitcher />
              </Box>
              <ThemeSwitcher />
            </Stack>

            {/* Mobile Controls */}
            <Box sx={{ display: { xs: 'flex', md: 'none' }, ml: 'auto', gap: 1, alignItems: 'center' }}>
              <ThemeSwitcher />
              <IconButton
                onClick={handleDrawerToggle}
                size="large"
                aria-label="open navigation menu"
                sx={{
                  color: 'white',
                  backgroundColor: 'rgba(255,255,255,0.15)',
                  backdropFilter: 'blur(8px)',
                  width: 48,
                  height: 48,
                  '&:hover': {
                    backgroundColor: 'rgba(255,255,255,0.25)',
                    transform: 'scale(1.05)',
                  },
                  '&:active': {
                    transform: 'scale(0.95)',
                  },
                  transition: 'all 0.2s ease',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                }}
              >
                <MenuIcon sx={{ fontSize: 28 }} />
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
            width: '100vw',
            maxWidth: 380,
            boxShadow: '-8px 0 24px rgba(0,0,0,0.12)',
          },
        }}
        SlideProps={{
          timeout: {
            enter: 400,
            exit: 300,
          },
        }}
      >
        {/* Close Button */}
        <IconButton
          onClick={handleDrawerToggle}
          sx={{
            position: 'absolute',
            right: 12,
            top: 12,
            color: 'white',
            zIndex: 2,
            backgroundColor: 'rgba(0,0,0,0.2)',
            backdropFilter: 'blur(4px)',
            '&:hover': {
              backgroundColor: 'rgba(0,0,0,0.3)',
              transform: 'rotate(90deg)',
            },
            transition: 'all 0.3s ease',
          }}
        >
          <CloseIcon />
        </IconButton>
        {drawer}
      </Drawer>
    </>
  );
};
