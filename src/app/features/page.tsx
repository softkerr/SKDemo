'use client';

import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Container, Typography, Grid, Card, CardContent, Button, Chip, Stack, Tabs, Tab } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import {
  Search,
  Code,
  ViewKanban,
  Calculate,
  CheckCircle,
  Speed,
  Chat,
  Accessibility,
  Email,
  Settings,
} from '@mui/icons-material';

interface Feature {
  id: string;
  icon: React.ElementType;
  priority?: number;
  color: string;
}

const features: Feature[] = [
  { id: 'seo', icon: Search, priority: 1, color: '#3b82f6' },
  { id: 'api', icon: Code, priority: 2, color: '#8b5cf6' },
  { id: 'kanban', icon: ViewKanban, priority: 1, color: '#10b981' },
  { id: 'calculator', icon: Calculate, priority: 2, color: '#f97316' },
  { id: 'forms', icon: CheckCircle, priority: 3, color: '#06b6d4' },
  { id: 'performance', icon: Speed, priority: 3, color: '#ec4899' },
  { id: 'chat', icon: Chat, color: '#14b8a6' },
  { id: 'accessibility', icon: Accessibility, color: '#8b5cf6' },
  { id: 'email', icon: Email, color: '#f59e0b' },
  { id: 'admin', icon: Settings, color: '#6366f1' },
];

export default function FeaturesPage() {
  const { t } = useTranslation('features');
  const theme = useTheme();
  const [selectedTab, setSelectedTab] = useState(0);
  const [hoveredFeature, setHoveredFeature] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  // Fix hydration by only rendering interactive parts after mount
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const filterFeatures = (priority?: number) => {
    if (priority === undefined) return features;
    return features.filter(f => f.priority === priority);
  };

  const currentFeatures = selectedTab === 0 
    ? features 
    : selectedTab === 1 
    ? filterFeatures(1)
    : selectedTab === 2
    ? filterFeatures(2)
    : filterFeatures(3);

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          position: 'relative',
          overflow: 'hidden',
          background: theme.palette.mode === 'dark'
            ? 'linear-gradient(135deg, #1e3a8a 0%, #7c3aed 100%)'
            : 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
          py: { xs: 8, md: 12 },
        }}
      >
        {/* Decorative background */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: { xs: '300px', md: '600px' },
            height: { xs: '300px', md: '600px' },
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
            filter: 'blur(60px)',
          }}
        />

        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Box sx={{ textAlign: 'center' }}>
            <Chip
              label={t('hero.badge')}
              sx={{
                mb: 3,
                bgcolor: 'rgba(255, 255, 255, 0.2)',
                color: 'white',
                fontWeight: 600,
                border: '1px solid rgba(255, 255, 255, 0.3)',
              }}
            />
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: '2.5rem', md: '3.5rem', lg: '4rem' },
                fontWeight: 700,
                color: 'white',
                mb: 3,
              }}
            >
              {t('hero.title')}
            </Typography>
            <Typography
              variant="h5"
              sx={{
                fontSize: { xs: '1.125rem', md: '1.25rem' },
                color: 'rgba(255, 255, 255, 0.9)',
                mb: 5,
                maxWidth: '48rem',
                mx: 'auto',
              }}
            >
              {t('hero.description')}
            </Typography>

            {/* Feature Count Stats */}
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={4}
              justifyContent="center"
              sx={{ mt: 6 }}
            >
              <Box>
                <Typography
                  variant="h3"
                  sx={{ fontWeight: 700, color: 'white', mb: 0.5 }}
                >
                  10
                </Typography>
                <Typography sx={{ color: 'rgba(255, 255, 255, 0.9)' }}>
                  {t('hero.stats.features')}
                </Typography>
              </Box>
              <Box>
                <Typography
                  variant="h3"
                  sx={{ fontWeight: 700, color: 'white', mb: 0.5 }}
                >
                  3
                </Typography>
                <Typography sx={{ color: 'rgba(255, 255, 255, 0.9)' }}>
                  {t('hero.stats.priorities')}
                </Typography>
              </Box>
              <Box>
                <Typography
                  variant="h3"
                  sx={{ fontWeight: 700, color: 'white', mb: 0.5 }}
                >
                  100%
                </Typography>
                <Typography sx={{ color: 'rgba(255, 255, 255, 0.9)' }}>
                  {t('hero.stats.coverage')}
                </Typography>
              </Box>
            </Stack>
          </Box>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: { xs: 8, md: 12 } }}>
        {/* Filter Tabs */}
        <Box sx={{ mb: 6 }}>
          <Tabs
            value={selectedTab}
            onChange={(_, newValue) => setSelectedTab(newValue)}
            centered
            sx={{
              '& .MuiTab-root': {
                textTransform: 'none',
                fontSize: '1rem',
                fontWeight: 500,
              },
            }}
          >
            <Tab label={t('filters.all')} />
            <Tab 
              label={
                <Stack direction="row" spacing={1} alignItems="center">
                  <span>{t('filters.priority1')}</span>
                  <Chip label="High" size="small" color="error" />
                </Stack>
              } 
            />
            <Tab 
              label={
                <Stack direction="row" spacing={1} alignItems="center">
                  <span>{t('filters.priority2')}</span>
                  <Chip label="Medium" size="small" color="warning" />
                </Stack>
              } 
            />
            <Tab 
              label={
                <Stack direction="row" spacing={1} alignItems="center">
                  <span>{t('filters.priority3')}</span>
                  <Chip label="Low" size="small" color="info" />
                </Stack>
              } 
            />
          </Tabs>
        </Box>

        {/* Feature Cards Grid */}
        <Grid container spacing={4}>
          {currentFeatures.map((feature) => {
            const Icon = feature.icon;
            const isHovered = hoveredFeature === feature.id;

            return (
              <Grid item xs={12} sm={6} md={4} key={feature.id}>
                <Card
                  onMouseEnter={() => setHoveredFeature(feature.id)}
                  onMouseLeave={() => setHoveredFeature(null)}
                  elevation={isHovered ? 8 : 0}
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    border: 1,
                    borderColor: isHovered ? feature.color : theme.palette.mode === 'dark' ? 'grey.800' : 'grey.200',
                    transition: 'all 0.3s ease',
                    transform: isHovered ? 'translateY(-8px)' : 'translateY(0)',
                    cursor: 'pointer',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  {/* Priority Badge */}
                  {feature.priority && (
                    <Chip
                      label={`Priority ${feature.priority}`}
                      size="small"
                      color={
                        feature.priority === 1 ? 'error' : 
                        feature.priority === 2 ? 'warning' : 
                        'info'
                      }
                      sx={{
                        position: 'absolute',
                        top: 16,
                        right: 16,
                        zIndex: 1,
                      }}
                    />
                  )}

                  <CardContent sx={{ p: 4, flexGrow: 1 }}>
                    {/* Icon */}
                    <Box
                      sx={{
                        width: 64,
                        height: 64,
                        borderRadius: 2,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mb: 3,
                        background: `linear-gradient(135deg, ${feature.color}20 0%, ${feature.color}40 100%)`,
                        transition: 'all 0.3s ease',
                        transform: isHovered ? 'scale(1.1) rotate(5deg)' : 'scale(1) rotate(0deg)',
                      }}
                    >
                      <Icon
                        sx={{
                          fontSize: 32,
                          color: feature.color,
                        }}
                      />
                    </Box>

                    {/* Title */}
                    <Typography
                      variant="h5"
                      sx={{
                        fontSize: '1.25rem',
                        fontWeight: 600,
                        mb: 2,
                      }}
                    >
                      {t(`features.${feature.id}.title`)}
                    </Typography>

                    {/* Description */}
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        lineHeight: 1.7,
                        mb: 3,
                      }}
                    >
                      {t(`features.${feature.id}.description`)}
                    </Typography>

                    {/* Tech Stack Tags */}
                    {isMounted && (
                      <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
                        {(() => {
                          const techStack = t(`features.${feature.id}.tech`, { returnObjects: true });
                          if (Array.isArray(techStack)) {
                            return techStack.map((tech, index: number) => (
                              <Chip
                                key={index}
                                label={String(tech)}
                                size="small"
                                variant="outlined"
                                sx={{
                                  fontSize: '0.75rem',
                                  borderColor: feature.color,
                                  color: feature.color,
                                }}
                              />
                            ));
                          }
                          return null;
                        })()}
                      </Stack>
                    )}
                  </CardContent>

                  {/* Action Button */}
                  <Box sx={{ p: 2, pt: 0 }}>
                    <Button
                      fullWidth
                      variant={isHovered ? 'contained' : 'outlined'}
                      sx={{
                        textTransform: 'none',
                        borderColor: feature.color,
                        color: isHovered ? 'white' : feature.color,
                        bgcolor: isHovered ? feature.color : 'transparent',
                        '&:hover': {
                          bgcolor: feature.color,
                          color: 'white',
                        },
                      }}
                    >
                      {t(`features.${feature.id}.cta`)}
                    </Button>
                  </Box>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Container>

      {/* CTA Section */}
      <Box
        sx={{
          bgcolor: theme.palette.mode === 'dark' ? 'background.paper' : 'grey.50',
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
                mb: 2,
              }}
            >
              {t('cta.title')}
            </Typography>
            <Typography
              variant="h6"
              color="text.secondary"
              sx={{ mb: 4 }}
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
                  px: 4,
                  py: 1.5,
                  textTransform: 'none',
                  fontSize: '1.125rem',
                }}
              >
                {t('cta.primary')}
              </Button>
              <Button
                variant="outlined"
                size="large"
                sx={{
                  px: 4,
                  py: 1.5,
                  textTransform: 'none',
                  fontSize: '1.125rem',
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
