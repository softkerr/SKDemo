'use client';

import React from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Stack,
  Chip,
  alpha,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Card,
  CardContent,
  CardActions,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@mui/material/styles';
import Link from 'next/link';
import {
  AdminPanelSettings,
  ContactMail,
  Brush,
  ShoppingCart,
  ArrowForward,
  Dashboard,
  Settings,
  People,
  Email,
  LocationOn,
  BarChart,
  Security,
  Edit,
  Image,
  Article,
  Store,
  Payment,
  FilterList,
  CheckCircle,
  Speed,
  CloudUpload,
  Notifications,
  Timeline,
  Lock,
  Public,
  LocalShipping,
  Phone,
  Map,
} from '@mui/icons-material';

export default function HomePage() {
  const { t } = useTranslation(['home', 'common']);
  const theme = useTheme();

  // Modern color palette with sophisticated gradients
  const colors = {
    admin: {
      primary: '#6366f1', // Indigo
      secondary: '#8b5cf6', // Purple
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      light: 'rgba(99, 102, 241, 0.1)',
      glow: 'rgba(99, 102, 241, 0.2)',
    },
    studio: {
      primary: '#ec4899', // Pink
      secondary: '#f43f5e', // Rose
      gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      light: 'rgba(236, 72, 153, 0.1)',
      glow: 'rgba(236, 72, 153, 0.2)',
    },
    shop: {
      primary: '#14b8a6', // Teal
      secondary: '#06b6d4', // Cyan
      gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      light: 'rgba(20, 184, 166, 0.1)',
      glow: 'rgba(20, 184, 166, 0.2)',
    },
    contact: {
      primary: '#f59e0b', // Amber
      secondary: '#f97316', // Orange
      gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
      light: 'rgba(245, 158, 11, 0.1)',
      glow: 'rgba(245, 158, 11, 0.2)',
    },
  };

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          position: 'relative',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          overflow: 'hidden',
          background:
            theme.palette.mode === 'dark'
              ? 'radial-gradient(ellipse at top, #1e1b4b 0%, #0f172a 50%, #000000 100%)'
              : 'radial-gradient(ellipse at top, #e0e7ff 0%, #ffffff 50%, #fef3c7 100%)',
        }}
      >
        {/* Animated Background Elements */}
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            overflow: 'hidden',
            pointerEvents: 'none',
          }}
        >
          {/* Purple Blob */}
          <Box
            sx={{
              position: 'absolute',
              top: '5%',
              right: '5%',
              width: '600px',
              height: '600px',
              borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%',
              background: 'radial-gradient(circle, rgba(139, 92, 246, 0.3) 0%, transparent 70%)',
              filter: 'blur(60px)',
              animation: 'morph 20s ease-in-out infinite, float 8s ease-in-out infinite',
            }}
          />
          {/* Teal Blob */}
          <Box
            sx={{
              position: 'absolute',
              bottom: '10%',
              left: '5%',
              width: '500px',
              height: '500px',
              borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
              background: 'radial-gradient(circle, rgba(20, 184, 166, 0.25) 0%, transparent 70%)',
              filter: 'blur(60px)',
              animation:
                'morph 15s ease-in-out infinite reverse, float 10s ease-in-out infinite 2s',
            }}
          />
          {/* Pink Blob */}
          <Box
            sx={{
              position: 'absolute',
              top: '40%',
              left: '50%',
              width: '400px',
              height: '400px',
              borderRadius: '70% 30% 50% 50% / 60% 60% 40% 40%',
              background: 'radial-gradient(circle, rgba(236, 72, 153, 0.2) 0%, transparent 70%)',
              filter: 'blur(60px)',
              animation: 'morph 18s ease-in-out infinite, float 12s ease-in-out infinite 4s',
            }}
          />
        </Box>

        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1, py: 8 }}>
          <Stack spacing={5} alignItems="center" textAlign="center">
            <Chip
              label="Next.js 15 • TypeScript • Material-UI • Sanity CMS"
              sx={{
                background:
                  theme.palette.mode === 'dark'
                    ? 'rgba(255, 255, 255, 0.1)'
                    : 'rgba(255, 255, 255, 0.8)',
                backdropFilter: 'blur(10px)',
                border: '1px solid',
                borderColor:
                  theme.palette.mode === 'dark'
                    ? 'rgba(255, 255, 255, 0.2)'
                    : 'rgba(139, 92, 246, 0.3)',
                color: theme.palette.mode === 'dark' ? '#a78bfa' : '#6366f1',
                fontWeight: 600,
                px: 3,
                py: 2.5,
                fontSize: '0.95rem',
                boxShadow: '0 8px 32px rgba(139, 92, 246, 0.15)',
              }}
            />

            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: '3rem', sm: '4.5rem', md: '6rem' },
                fontWeight: 900,
                background:
                  theme.palette.mode === 'dark'
                    ? 'linear-gradient(135deg, #ffffff 0%, #c4b5fd 40%, #86efac 70%, #fcd34d 100%)'
                    : 'linear-gradient(135deg, #1e293b 0%, #6366f1 40%, #14b8a6 70%, #f59e0b 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                lineHeight: 1.1,
                letterSpacing: '-0.03em',
                textShadow:
                  theme.palette.mode === 'dark' ? '0 0 80px rgba(139, 92, 246, 0.3)' : 'none',
              }}
            >
              Full-Stack Platform
              <br />
              Demo Showcase
            </Typography>

            <Typography
              variant="h5"
              sx={{
                maxWidth: '800px',
                fontSize: { xs: '1.1rem', md: '1.4rem' },
                fontWeight: 400,
                lineHeight: 1.7,
                color:
                  theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)',
              }}
            >
              A comprehensive demonstration of modern web development featuring Admin Dashboard,
              Content Management System, E-commerce Shop, and Contact System
            </Typography>

            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} sx={{ mt: 3 }}>
              <Button
                component={Link}
                href="#features"
                variant="contained"
                size="large"
                endIcon={<ArrowForward />}
                sx={{
                  px: 5,
                  py: 2,
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  borderRadius: 3,
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  boxShadow: '0 8px 32px rgba(102, 126, 234, 0.35)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #5568d3 0%, #6a3f91 100%)',
                    boxShadow: '0 12px 48px rgba(102, 126, 234, 0.45)',
                    transform: 'translateY(-2px)',
                  },
                }}
              >
                Explore Features
              </Button>
              <Button
                component={Link}
                href="/shop"
                variant="outlined"
                size="large"
                endIcon={<ShoppingCart />}
                sx={{
                  px: 5,
                  py: 2,
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  borderRadius: 3,
                  borderWidth: 2,
                  borderColor:
                    theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.3)' : '#6366f1',
                  color: theme.palette.mode === 'dark' ? 'white' : '#6366f1',
                  background:
                    theme.palette.mode === 'dark'
                      ? 'rgba(255, 255, 255, 0.05)'
                      : 'rgba(99, 102, 241, 0.05)',
                  backdropFilter: 'blur(10px)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    borderWidth: 2,
                    borderColor:
                      theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.5)' : '#8b5cf6',
                    background:
                      theme.palette.mode === 'dark'
                        ? 'rgba(255, 255, 255, 0.1)'
                        : 'rgba(99, 102, 241, 0.1)',
                    transform: 'translateY(-2px)',
                  },
                }}
              >
                Visit Shop
              </Button>
            </Stack>
          </Stack>
        </Container>
      </Box>

      {/* Admin Panel Section */}
      <Box
        id="features"
        sx={{
          py: { xs: 10, md: 15 },
          position: 'relative',
          overflow: 'hidden',
          background:
            theme.palette.mode === 'dark'
              ? 'linear-gradient(180deg, #0f172a 0%, #1e1b4b 100%)'
              : 'linear-gradient(180deg, #ffffff 0%, #f5f3ff 100%)',
        }}
      >
        {/* Background decoration */}
        <Box
          sx={{
            position: 'absolute',
            top: '-20%',
            right: '-10%',
            width: '600px',
            height: '600px',
            borderRadius: '50%',
            background: `radial-gradient(circle, ${colors.admin.glow} 0%, transparent 70%)`,
            filter: 'blur(100px)',
            opacity: 0.6,
          }}
        />

        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Grid container spacing={8} alignItems="center">
            <Grid item xs={12} md={6}>
              <Stack spacing={4}>
                <Box>
                  <Chip
                    icon={<AdminPanelSettings />}
                    label="Admin Dashboard"
                    sx={{
                      background: colors.admin.gradient,
                      color: 'white',
                      fontWeight: 600,
                      px: 3,
                      py: 2.5,
                      mb: 3,
                      boxShadow: `0 8px 24px ${colors.admin.glow}`,
                    }}
                  />
                  <Typography
                    variant="h2"
                    sx={{
                      fontSize: { xs: '2.5rem', md: '3.5rem' },
                      fontWeight: 800,
                      mb: 2,
                      lineHeight: 1.2,
                    }}
                  >
                    Powerful Admin Panel
                  </Typography>
                  <Typography
                    variant="h6"
                    color="text.secondary"
                    sx={{ fontSize: '1.25rem', lineHeight: 1.7 }}
                  >
                    Complete control center for managing users, monitoring analytics, and
                    configuring system settings. Built with role-based access control for security.
                  </Typography>
                </Box>

                <Box>
                  <Typography variant="h5" sx={{ fontWeight: 700, mb: 3, color: '#9333ea' }}>
                    Key Benefits
                  </Typography>
                  <Grid container spacing={2}>
                    {[
                      {
                        icon: <Dashboard />,
                        title: 'Comprehensive Dashboard',
                        desc: 'Real-time metrics, charts, and insights at a glance',
                      },
                      {
                        icon: <People />,
                        title: 'User Management',
                        desc: 'Full CRUD operations for managing team members and roles',
                      },
                      {
                        icon: <BarChart />,
                        title: 'Analytics & Reports',
                        desc: 'Detailed analytics with interactive charts and data visualization',
                      },
                      {
                        icon: <Settings />,
                        title: 'System Configuration',
                        desc: 'Customize settings, notifications, and system preferences',
                      },
                      {
                        icon: <Security />,
                        title: 'Role-Based Security',
                        desc: 'Granular permissions and access control for enhanced security',
                      },
                    ].map((item, idx) => (
                      <Grid item xs={12} sm={6} key={idx}>
                        <Stack direction="row" spacing={2} alignItems="flex-start">
                          <Box
                            sx={{
                              width: 40,
                              height: 40,
                              minWidth: 40,
                              borderRadius: 2,
                              background: alpha('#9333ea', 0.1),
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              color: '#9333ea',
                            }}
                          >
                            {item.icon}
                          </Box>
                          <Box sx={{ flex: 1 }}>
                            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 0.5 }}>
                              {item.title}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {item.desc}
                            </Typography>
                          </Box>
                        </Stack>
                      </Grid>
                    ))}
                  </Grid>
                </Box>

                <Button
                  component={Link}
                  href="/admin"
                  variant="contained"
                  size="large"
                  endIcon={<ArrowForward />}
                  sx={{
                    alignSelf: 'flex-start',
                    px: 4,
                    py: 1.5,
                    fontSize: '1rem',
                    fontWeight: 600,
                    background: 'linear-gradient(135deg, #9333ea 0%, #c084fc 100%)',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #7e22ce 0%, #a855f7 100%)',
                    },
                  }}
                >
                  Open Admin Dashboard
                </Button>
              </Stack>
            </Grid>

            <Grid item xs={12} md={6}>
              <Paper
                elevation={0}
                sx={{
                  p: 4,
                  borderRadius: 4,
                  background:
                    theme.palette.mode === 'dark'
                      ? 'linear-gradient(135deg, rgba(147, 51, 234, 0.1) 0%, rgba(192, 132, 252, 0.05) 100%)'
                      : 'linear-gradient(135deg, rgba(147, 51, 234, 0.05) 0%, rgba(192, 132, 252, 0.02) 100%)',
                  border: '1px solid',
                  borderColor: alpha('#9333ea', 0.2),
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <Box
                  sx={{
                    width: '100%',
                    height: '400px',
                    borderRadius: 3,
                    background:
                      theme.palette.mode === 'dark'
                        ? 'linear-gradient(135deg, #1e293b 0%, #312e81 100%)'
                        : 'linear-gradient(135deg, #f8fafc 0%, #e9d5ff 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '2px solid',
                    borderColor: alpha('#9333ea', 0.3),
                    position: 'relative',
                  }}
                >
                  <Stack spacing={2} alignItems="center">
                    <AdminPanelSettings sx={{ fontSize: 80, color: '#9333ea', opacity: 0.8 }} />
                    <Typography variant="h6" color="text.secondary">
                      Admin Dashboard Preview
                    </Typography>
                    <Stack direction="row" spacing={1}>
                      <Chip label="Charts" size="small" />
                      <Chip label="Tables" size="small" />
                      <Chip label="Forms" size="small" />
                    </Stack>
                  </Stack>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Studio CMS Section */}
      <Box
        sx={{
          py: { xs: 10, md: 15 },
          background:
            theme.palette.mode === 'dark' ? alpha('#f43f5e', 0.03) : alpha('#f43f5e', 0.02),
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={8} alignItems="center">
            <Grid item xs={12} md={6} order={{ xs: 2, md: 1 }}>
              <Paper
                elevation={0}
                sx={{
                  p: 4,
                  borderRadius: 4,
                  background:
                    theme.palette.mode === 'dark'
                      ? 'linear-gradient(135deg, rgba(244, 63, 94, 0.1) 0%, rgba(251, 113, 133, 0.05) 100%)'
                      : 'linear-gradient(135deg, rgba(244, 63, 94, 0.05) 0%, rgba(251, 113, 133, 0.02) 100%)',
                  border: '1px solid',
                  borderColor: alpha('#f43f5e', 0.2),
                }}
              >
                <Box
                  sx={{
                    width: '100%',
                    height: '400px',
                    borderRadius: 3,
                    background:
                      theme.palette.mode === 'dark'
                        ? 'linear-gradient(135deg, #1e293b 0%, #7f1d1d 100%)'
                        : 'linear-gradient(135deg, #fef2f2 0%, #ffe4e6 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '2px solid',
                    borderColor: alpha('#f43f5e', 0.3),
                  }}
                >
                  <Stack spacing={2} alignItems="center">
                    <Brush sx={{ fontSize: 80, color: '#f43f5e', opacity: 0.8 }} />
                    <Typography variant="h6" color="text.secondary">
                      Sanity Studio Interface
                    </Typography>
                    <Stack direction="row" spacing={1}>
                      <Chip label="Visual Editor" size="small" />
                      <Chip label="Media Library" size="small" />
                      <Chip label="Publishing" size="small" />
                    </Stack>
                  </Stack>
                </Box>
              </Paper>
            </Grid>

            <Grid item xs={12} md={6} order={{ xs: 1, md: 2 }}>
              <Stack spacing={4}>
                <Box>
                  <Chip
                    icon={<Brush />}
                    label="Content Management"
                    sx={{
                      background: 'linear-gradient(135deg, #f43f5e 0%, #fb7185 100%)',
                      color: 'white',
                      fontWeight: 600,
                      px: 2,
                      py: 2.5,
                      mb: 3,
                    }}
                  />
                  <Typography
                    variant="h2"
                    sx={{
                      fontSize: { xs: '2.5rem', md: '3.5rem' },
                      fontWeight: 800,
                      mb: 2,
                      lineHeight: 1.2,
                    }}
                  >
                    Sanity Studio CMS
                  </Typography>
                  <Typography
                    variant="h6"
                    color="text.secondary"
                    sx={{ fontSize: '1.25rem', lineHeight: 1.7 }}
                  >
                    Professional content management system powered by Sanity. Create, edit, and
                    publish blog posts, articles, and media with an intuitive visual interface.
                  </Typography>
                </Box>

                <Box>
                  <Typography variant="h5" sx={{ fontWeight: 700, mb: 3, color: '#f43f5e' }}>
                    Key Benefits
                  </Typography>
                  <Grid container spacing={2}>
                    {[
                      {
                        icon: <Edit />,
                        title: 'Visual Content Editor',
                        desc: 'Rich text editing with real-time preview and formatting',
                      },
                      {
                        icon: <Image />,
                        title: 'Media Management',
                        desc: 'Upload, organize, and optimize images and documents',
                      },
                      {
                        icon: <Article />,
                        title: 'Structured Content',
                        desc: 'Create blog posts, articles, and pages with custom schemas',
                      },
                      {
                        icon: <CloudUpload />,
                        title: 'Cloud-Based',
                        desc: 'Access your content from anywhere with automatic backups',
                      },
                      {
                        icon: <Timeline />,
                        title: 'Version Control',
                        desc: 'Track changes and revert to previous versions easily',
                      },
                    ].map((item, idx) => (
                      <Grid item xs={12} sm={6} key={idx}>
                        <Stack direction="row" spacing={2} alignItems="flex-start">
                          <Box
                            sx={{
                              width: 40,
                              height: 40,
                              minWidth: 40,
                              borderRadius: 2,
                              background: alpha('#f43f5e', 0.1),
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              color: '#f43f5e',
                            }}
                          >
                            {item.icon}
                          </Box>
                          <Box sx={{ flex: 1 }}>
                            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 0.5 }}>
                              {item.title}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {item.desc}
                            </Typography>
                          </Box>
                        </Stack>
                      </Grid>
                    ))}
                  </Grid>
                </Box>

                <Button
                  component={Link}
                  href="/studio"
                  variant="contained"
                  size="large"
                  endIcon={<ArrowForward />}
                  sx={{
                    alignSelf: 'flex-start',
                    px: 4,
                    py: 1.5,
                    fontSize: '1rem',
                    fontWeight: 600,
                    background: 'linear-gradient(135deg, #f43f5e 0%, #fb7185 100%)',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #e11d48 0%, #f43f5e 100%)',
                    },
                  }}
                >
                  Open Sanity Studio
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* E-commerce Shop Section */}
      <Box
        sx={{
          py: { xs: 10, md: 15 },
          background:
            theme.palette.mode === 'dark' ? alpha('#10b981', 0.03) : alpha('#10b981', 0.02),
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={8} alignItems="center">
            <Grid item xs={12} md={6}>
              <Stack spacing={4}>
                <Box>
                  <Chip
                    icon={<ShoppingCart />}
                    label="E-commerce Platform"
                    sx={{
                      background: 'linear-gradient(135deg, #10b981 0%, #34d399 100%)',
                      color: 'white',
                      fontWeight: 600,
                      px: 2,
                      py: 2.5,
                      mb: 3,
                    }}
                  />
                  <Typography
                    variant="h2"
                    sx={{
                      fontSize: { xs: '2.5rem', md: '3.5rem' },
                      fontWeight: 800,
                      mb: 2,
                      lineHeight: 1.2,
                    }}
                  >
                    Service Shop
                  </Typography>
                  <Typography
                    variant="h6"
                    color="text.secondary"
                    sx={{ fontSize: '1.25rem', lineHeight: 1.7 }}
                  >
                    Full-featured e-commerce platform for browsing and purchasing services.
                    Multi-currency support, advanced filtering, shopping cart, and seamless
                    checkout.
                  </Typography>
                </Box>

                <Box>
                  <Typography variant="h5" sx={{ fontWeight: 700, mb: 3, color: '#10b981' }}>
                    Key Benefits
                  </Typography>
                  <Grid container spacing={2}>
                    {[
                      {
                        icon: <Store />,
                        title: 'Product Catalog',
                        desc: 'Browse services with detailed descriptions and pricing',
                      },
                      {
                        icon: <FilterList />,
                        title: 'Advanced Filters',
                        desc: 'Filter by category, price, features, and more',
                      },
                      {
                        icon: <Payment />,
                        title: 'Multi-Currency',
                        desc: 'Support for USD, EUR, GBP with real-time conversion',
                      },
                      {
                        icon: <ShoppingCart />,
                        title: 'Shopping Cart',
                        desc: 'Add items, manage quantities, and checkout seamlessly',
                      },
                      {
                        icon: <LocalShipping />,
                        title: 'Order Management',
                        desc: 'Track orders and manage delivery preferences',
                      },
                    ].map((item, idx) => (
                      <Grid item xs={12} sm={6} key={idx}>
                        <Stack direction="row" spacing={2} alignItems="flex-start">
                          <Box
                            sx={{
                              width: 40,
                              height: 40,
                              minWidth: 40,
                              borderRadius: 2,
                              background: alpha('#10b981', 0.1),
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              color: '#10b981',
                            }}
                          >
                            {item.icon}
                          </Box>
                          <Box sx={{ flex: 1 }}>
                            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 0.5 }}>
                              {item.title}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {item.desc}
                            </Typography>
                          </Box>
                        </Stack>
                      </Grid>
                    ))}
                  </Grid>
                </Box>

                <Button
                  component={Link}
                  href="/shop"
                  variant="contained"
                  size="large"
                  endIcon={<ArrowForward />}
                  sx={{
                    alignSelf: 'flex-start',
                    px: 4,
                    py: 1.5,
                    fontSize: '1rem',
                    fontWeight: 600,
                    background: 'linear-gradient(135deg, #10b981 0%, #34d399 100%)',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #059669 0%, #10b981 100%)',
                    },
                  }}
                >
                  Browse Shop
                </Button>
              </Stack>
            </Grid>

            <Grid item xs={12} md={6}>
              <Paper
                elevation={0}
                sx={{
                  p: 4,
                  borderRadius: 4,
                  background:
                    theme.palette.mode === 'dark'
                      ? 'linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(52, 211, 153, 0.05) 100%)'
                      : 'linear-gradient(135deg, rgba(16, 185, 129, 0.05) 0%, rgba(52, 211, 153, 0.02) 100%)',
                  border: '1px solid',
                  borderColor: alpha('#10b981', 0.2),
                }}
              >
                <Box
                  sx={{
                    width: '100%',
                    height: '400px',
                    borderRadius: 3,
                    background:
                      theme.palette.mode === 'dark'
                        ? 'linear-gradient(135deg, #1e293b 0%, #064e3b 100%)'
                        : 'linear-gradient(135deg, #f0fdf4 0%, #d1fae5 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '2px solid',
                    borderColor: alpha('#10b981', 0.3),
                  }}
                >
                  <Stack spacing={2} alignItems="center">
                    <ShoppingCart sx={{ fontSize: 80, color: '#10b981', opacity: 0.8 }} />
                    <Typography variant="h6" color="text.secondary">
                      Shop Interface Preview
                    </Typography>
                    <Stack direction="row" spacing={1}>
                      <Chip label="Products" size="small" />
                      <Chip label="Cart" size="small" />
                      <Chip label="Checkout" size="small" />
                    </Stack>
                  </Stack>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Contact Section */}
      <Box
        sx={{
          py: { xs: 10, md: 15 },
          background:
            theme.palette.mode === 'dark' ? alpha('#0ea5e9', 0.03) : alpha('#0ea5e9', 0.02),
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={8} alignItems="center">
            <Grid item xs={12} md={6} order={{ xs: 2, md: 1 }}>
              <Paper
                elevation={0}
                sx={{
                  p: 4,
                  borderRadius: 4,
                  background:
                    theme.palette.mode === 'dark'
                      ? 'linear-gradient(135deg, rgba(14, 165, 233, 0.1) 0%, rgba(56, 189, 248, 0.05) 100%)'
                      : 'linear-gradient(135deg, rgba(14, 165, 233, 0.05) 0%, rgba(56, 189, 248, 0.02) 100%)',
                  border: '1px solid',
                  borderColor: alpha('#0ea5e9', 0.2),
                }}
              >
                <Box
                  sx={{
                    width: '100%',
                    height: '400px',
                    borderRadius: 3,
                    background:
                      theme.palette.mode === 'dark'
                        ? 'linear-gradient(135deg, #1e293b 0%, #0c4a6e 100%)'
                        : 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '2px solid',
                    borderColor: alpha('#0ea5e9', 0.3),
                  }}
                >
                  <Stack spacing={2} alignItems="center">
                    <ContactMail sx={{ fontSize: 80, color: '#0ea5e9', opacity: 0.8 }} />
                    <Typography variant="h6" color="text.secondary">
                      Contact Form Preview
                    </Typography>
                    <Stack direction="row" spacing={1}>
                      <Chip label="Form" size="small" />
                      <Chip label="Map" size="small" />
                      <Chip label="Info" size="small" />
                    </Stack>
                  </Stack>
                </Box>
              </Paper>
            </Grid>

            <Grid item xs={12} md={6} order={{ xs: 1, md: 2 }}>
              <Stack spacing={4}>
                <Box>
                  <Chip
                    icon={<ContactMail />}
                    label="Get in Touch"
                    sx={{
                      background: 'linear-gradient(135deg, #0ea5e9 0%, #38bdf8 100%)',
                      color: 'white',
                      fontWeight: 600,
                      px: 2,
                      py: 2.5,
                      mb: 3,
                    }}
                  />
                  <Typography
                    variant="h2"
                    sx={{
                      fontSize: { xs: '2.5rem', md: '3.5rem' },
                      fontWeight: 800,
                      mb: 2,
                      lineHeight: 1.2,
                    }}
                  >
                    Contact System
                  </Typography>
                  <Typography
                    variant="h6"
                    color="text.secondary"
                    sx={{ fontSize: '1.25rem', lineHeight: 1.7 }}
                  >
                    Professional contact page with form validation, location information, and
                    interactive map. Get in touch easily and receive prompt responses.
                  </Typography>
                </Box>

                <Box>
                  <Typography variant="h5" sx={{ fontWeight: 700, mb: 3, color: '#0ea5e9' }}>
                    Key Benefits
                  </Typography>
                  <Grid container spacing={2}>
                    {[
                      {
                        icon: <Email />,
                        title: 'Contact Form',
                        desc: 'Validated form with real-time feedback and error handling',
                      },
                      {
                        icon: <Map />,
                        title: 'Location Map',
                        desc: 'Interactive map showing business location and directions',
                      },
                      {
                        icon: <Phone />,
                        title: 'Contact Details',
                        desc: 'Phone, email, and address information readily available',
                      },
                      {
                        icon: <Notifications />,
                        title: 'Instant Notifications',
                        desc: 'Receive immediate email notifications for new inquiries',
                      },
                      {
                        icon: <CheckCircle />,
                        title: 'Form Validation',
                        desc: 'Smart validation ensures quality submissions',
                      },
                    ].map((item, idx) => (
                      <Grid item xs={12} sm={6} key={idx}>
                        <Stack direction="row" spacing={2} alignItems="flex-start">
                          <Box
                            sx={{
                              width: 40,
                              height: 40,
                              minWidth: 40,
                              borderRadius: 2,
                              background: alpha('#0ea5e9', 0.1),
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              color: '#0ea5e9',
                            }}
                          >
                            {item.icon}
                          </Box>
                          <Box sx={{ flex: 1 }}>
                            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 0.5 }}>
                              {item.title}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {item.desc}
                            </Typography>
                          </Box>
                        </Stack>
                      </Grid>
                    ))}
                  </Grid>
                </Box>

                <Button
                  component={Link}
                  href="/contacts"
                  variant="contained"
                  size="large"
                  endIcon={<ArrowForward />}
                  sx={{
                    alignSelf: 'flex-start',
                    px: 4,
                    py: 1.5,
                    fontSize: '1rem',
                    fontWeight: 600,
                    background: 'linear-gradient(135deg, #0ea5e9 0%, #38bdf8 100%)',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #0284c7 0%, #0ea5e9 100%)',
                    },
                  }}
                >
                  Contact Us
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Technology Stack Section */}
      <Box
        sx={{
          py: { xs: 10, md: 15 },
          background:
            theme.palette.mode === 'dark'
              ? 'linear-gradient(180deg, #0f172a 0%, #1e293b 100%)'
              : 'linear-gradient(180deg, #f8fafc 0%, #eff6ff 100%)',
        }}
      >
        <Container maxWidth="lg">
          <Stack spacing={6} alignItems="center" textAlign="center">
            <Box>
              <Typography
                variant="h2"
                sx={{
                  fontSize: { xs: '2.5rem', md: '3.5rem' },
                  fontWeight: 800,
                  mb: 2,
                }}
              >
                Built with Modern Technology
              </Typography>
              <Typography variant="h6" color="text.secondary" sx={{ maxWidth: '700px' }}>
                Leveraging the latest web technologies for performance, security, and scalability
              </Typography>
            </Box>

            <Grid container spacing={4}>
              {[
                {
                  icon: <Speed />,
                  title: 'Lightning Fast',
                  desc: 'Next.js 15 with App Router and React Server Components',
                },
                {
                  icon: <Public />,
                  title: 'Internationalized',
                  desc: 'Full i18n support with 4 languages (EN, DE, ES, FR)',
                },
                {
                  icon: <Lock />,
                  title: 'Secure & Reliable',
                  desc: 'Enterprise-grade security with role-based access control',
                },
              ].map((feature, idx) => {
                const Icon = feature.icon;
                return (
                  <Grid item xs={12} md={4} key={idx}>
                    <Paper
                      elevation={0}
                      sx={{
                        p: 5,
                        height: '100%',
                        textAlign: 'center',
                        border: '1px solid',
                        borderColor: 'divider',
                        borderRadius: 3,
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          transform: 'translateY(-8px)',
                          boxShadow: 8,
                          borderColor: 'primary.main',
                        },
                      }}
                    >
                      <Box
                        sx={{
                          width: 80,
                          height: 80,
                          borderRadius: '50%',
                          background: alpha(theme.palette.primary.main, 0.1),
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          mx: 'auto',
                          mb: 3,
                        }}
                      >
                        {React.cloneElement(Icon, {
                          sx: { fontSize: 40, color: 'primary.main' },
                        })}
                      </Box>
                      <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
                        {feature.title}
                      </Typography>
                      <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                        {feature.desc}
                      </Typography>
                    </Paper>
                  </Grid>
                );
              })}
            </Grid>
          </Stack>
        </Container>
      </Box>

      {/* Final CTA Section */}
      <Box
        sx={{
          py: 15,
          background:
            theme.palette.mode === 'dark'
              ? 'linear-gradient(135deg, #1e293b 0%, #312e81 50%, #1e293b 100%)'
              : 'linear-gradient(135deg, #eff6ff 0%, #e0e7ff 50%, #dbeafe 100%)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Background Elements */}
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '800px',
            height: '800px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(147, 51, 234, 0.1) 0%, transparent 70%)',
            filter: 'blur(100px)',
          }}
        />

        <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1 }}>
          <Stack spacing={5} alignItems="center" textAlign="center">
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: '2.5rem', md: '3.5rem' },
                fontWeight: 900,
                lineHeight: 1.2,
              }}
            >
              Ready to Explore?
            </Typography>
            <Typography
              variant="h6"
              color="text.secondary"
              sx={{
                fontSize: '1.25rem',
                maxWidth: '600px',
                lineHeight: 1.7,
              }}
            >
              Start exploring our platform features. Browse the shop, check out the admin panel, or
              get in touch with us today.
            </Typography>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3}>
              <Button
                component={Link}
                href="/shop"
                variant="contained"
                size="large"
                endIcon={<ShoppingCart />}
                sx={{
                  px: 5,
                  py: 2,
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  borderRadius: 2,
                  background: 'linear-gradient(135deg, #9333ea 0%, #7c3aed 100%)',
                  boxShadow: '0 8px 24px rgba(147, 51, 234, 0.3)',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #7e22ce 0%, #6d28d9 100%)',
                  },
                }}
              >
                Browse Shop
              </Button>
              <Button
                component={Link}
                href="/admin"
                variant="outlined"
                size="large"
                endIcon={<AdminPanelSettings />}
                sx={{
                  px: 5,
                  py: 2,
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  borderRadius: 2,
                  borderWidth: 2,
                  '&:hover': {
                    borderWidth: 2,
                    background: alpha(theme.palette.primary.main, 0.05),
                  },
                }}
              >
                Try Admin
              </Button>
            </Stack>
          </Stack>
        </Container>
      </Box>

      {/* Animations */}
      <style jsx global>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        @keyframes morph {
          0%,
          100% {
            borderradius: 60% 40% 30% 70% / 60% 30% 70% 40%;
          }
          50% {
            borderradius: 30% 60% 70% 40% / 50% 60% 30% 60%;
          }
        }
      `}</style>
    </Box>
  );
}
