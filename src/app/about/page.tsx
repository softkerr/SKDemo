'use client';

import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Container, Typography, Grid, Card, CardContent, Avatar, Stack, Chip } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { 
  Rocket, 
  EmojiEvents, 
  People, 
  TrendingUp, 
  Lightbulb, 
  Shield, 
  Favorite, 
  Speed,
  CheckCircle,
  Star,
  WorkspacePremium,
  Group,
  Business,
  Psychology,
  Handshake
} from '@mui/icons-material';

const values = [
  { id: 'innovation', icon: Lightbulb, color: '#3b82f6' },
  { id: 'integrity', icon: Shield, color: '#10b981' },
  { id: 'excellence', icon: EmojiEvents, color: '#f59e0b' },
  { id: 'collaboration', icon: Handshake, color: '#8b5cf6' },
  { id: 'customerFocus', icon: Favorite, color: '#ec4899' },
  { id: 'agility', icon: Speed, color: '#06b6d4' },
];

const stats = [
  { id: 'yearsExperience', icon: Star, color: '#3b82f6' },
  { id: 'projectsCompleted', icon: CheckCircle, color: '#10b981' },
  { id: 'happyClients', icon: People, color: '#f59e0b' },
  { id: 'teamMembers', icon: Group, color: '#8b5cf6' },
];

const timeline = [
  { id: 'year2020', year: '2020', icon: Rocket },
  { id: 'year2021', year: '2021', icon: TrendingUp },
  { id: 'year2022', year: '2022', icon: Business },
  { id: 'year2023', year: '2023', icon: WorkspacePremium },
  { id: 'year2024', year: '2024', icon: Psychology },
  { id: 'year2025', year: '2025', icon: EmojiEvents },
];

const team = [
  { id: 'ceo', role: 'CEO & Founder', avatar: 'JS', color: '#3b82f6' },
  { id: 'cto', role: 'CTO', avatar: 'MK', color: '#8b5cf6' },
  { id: 'coo', role: 'COO', avatar: 'SL', color: '#10b981' },
  { id: 'designer', role: 'Lead Designer', avatar: 'AR', color: '#f59e0b' },
  { id: 'developer', role: 'Lead Developer', avatar: 'TC', color: '#ec4899' },
  { id: 'marketing', role: 'Marketing Director', avatar: 'NP', color: '#06b6d4' },
];

export default function AboutPage() {
  const { t } = useTranslation('about');
  const theme = useTheme();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          position: 'relative',
          overflow: 'hidden',
          py: { xs: 8, md: 12 },
          background: theme.palette.mode === 'dark'
            ? 'linear-gradient(135deg, #1e3a8a 0%, #7c3aed 100%)'
            : 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
        }}
      >
        {/* Decorative Elements */}
        <Box
          sx={{
            position: 'absolute',
            top: -100,
            right: -100,
            width: 400,
            height: 400,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
            animation: 'pulse 4s ease-in-out infinite',
            '@keyframes pulse': {
              '0%, 100%': { transform: 'scale(1)', opacity: 0.5 },
              '50%': { transform: 'scale(1.1)', opacity: 0.3 },
            },
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            bottom: -80,
            left: -80,
            width: 300,
            height: 300,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
            animation: 'pulse 3s ease-in-out infinite',
          }}
        />

        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Box sx={{ textAlign: 'center' }}>
            <Chip
              label={t('hero.badge')}
              sx={{
                mb: 2,
                fontWeight: 600,
                bgcolor: 'rgba(255,255,255,0.2)',
                color: 'white',
                backdropFilter: 'blur(10px)',
              }}
            />
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: '2.5rem', md: '3.5rem' },
                fontWeight: 700,
                color: 'white',
                mb: 2,
                textShadow: '2px 2px 8px rgba(0,0,0,0.2)',
              }}
            >
              {t('hero.title')}
            </Typography>
            <Typography
              variant="h5"
              sx={{
                fontSize: { xs: '1.125rem', md: '1.25rem' },
                color: 'rgba(255,255,255,0.95)',
                mb: 4,
                maxWidth: '48rem',
                mx: 'auto',
                lineHeight: 1.6,
              }}
            >
              {t('hero.description')}
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* Stats Section */}
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 8 }, mt: -6 }}>
        <Grid container spacing={3}>
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Grid item xs={6} md={3} key={stat.id}>
                <Card
                  elevation={0}
                  sx={{
                    height: '100%',
                    textAlign: 'center',
                    border: 1,
                    borderColor: theme.palette.mode === 'dark' ? 'grey.800' : 'grey.200',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: theme.palette.mode === 'dark'
                        ? '0 12px 24px rgba(59, 130, 246, 0.3)'
                        : '0 12px 24px rgba(37, 99, 235, 0.15)',
                      borderColor: stat.color,
                    },
                  }}
                >
                  <CardContent sx={{ p: { xs: 2, md: 3 } }}>
                    <Box
                      sx={{
                        width: 56,
                        height: 56,
                        borderRadius: '50%',
                        bgcolor: `${stat.color}20`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mx: 'auto',
                        mb: 2,
                      }}
                    >
                      <Icon sx={{ fontSize: 28, color: stat.color }} />
                    </Box>
                    <Typography
                      variant="h3"
                      sx={{
                        fontSize: { xs: '2rem', md: '2.5rem' },
                        fontWeight: 700,
                        color: stat.color,
                        mb: 0.5,
                      }}
                    >
                      {t(`stats.${stat.id}.value`)}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ fontWeight: 500 }}
                    >
                      {t(`stats.${stat.id}.label`)}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Container>

      {/* Story Section */}
      <Box sx={{ bgcolor: theme.palette.mode === 'dark' ? 'background.paper' : 'grey.50', py: { xs: 8, md: 12 } }}>
        <Container maxWidth="md">
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: '2rem', md: '2.5rem' },
              fontWeight: 700,
              textAlign: 'center',
              mb: 6,
            }}
          >
            {t('story.title')}
          </Typography>
          <Stack spacing={4}>
            <Typography
              variant="body1"
              sx={{
                fontSize: '1.125rem',
                lineHeight: 1.8,
                color: 'text.secondary',
              }}
            >
              {t('story.paragraph1')}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontSize: '1.125rem',
                lineHeight: 1.8,
                color: 'text.secondary',
              }}
            >
              {t('story.paragraph2')}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontSize: '1.125rem',
                lineHeight: 1.8,
                color: 'text.secondary',
              }}
            >
              {t('story.paragraph3')}
            </Typography>
          </Stack>
        </Container>
      </Box>

      {/* Timeline Section */}
      {isMounted && (
        <Container maxWidth="lg" sx={{ py: { xs: 8, md: 12 } }}>
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: '2rem', md: '2.5rem' },
              fontWeight: 700,
              textAlign: 'center',
              mb: 8,
            }}
          >
            {t('timeline.title')}
          </Typography>
          <Box sx={{ position: 'relative' }}>
            {/* Timeline Line */}
            <Box
              sx={{
                position: 'absolute',
                left: '50%',
                top: 0,
                bottom: 0,
                width: 4,
                bgcolor: 'primary.main',
                transform: 'translateX(-50%)',
                display: { xs: 'none', md: 'block' },
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '100%',
                  background: 'linear-gradient(to bottom, transparent, rgba(59, 130, 246, 0.2))',
                },
              }}
            />

            <Stack spacing={6}>
              {timeline.map((item, index) => {
                const Icon = item.icon;
                const isEven = index % 2 === 0;

                return (
                  <Box
                    key={item.id}
                    sx={{
                      display: 'flex',
                      flexDirection: { xs: 'column', md: isEven ? 'row' : 'row-reverse' },
                      alignItems: 'center',
                      gap: 4,
                    }}
                  >
                    <Box
                      sx={{
                        flex: 1,
                        textAlign: { xs: 'center', md: isEven ? 'right' : 'left' },
                      }}
                    >
                      <Card
                        elevation={0}
                        sx={{
                          border: 1,
                          borderColor: theme.palette.mode === 'dark' ? 'grey.800' : 'grey.200',
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            transform: 'translateY(-4px)',
                            borderColor: 'primary.main',
                            boxShadow: theme.palette.mode === 'dark'
                              ? '0 8px 16px rgba(59, 130, 246, 0.3)'
                              : '0 8px 16px rgba(37, 99, 235, 0.15)',
                          },
                        }}
                      >
                        <CardContent sx={{ p: 3 }}>
                          <Typography
                            variant="h4"
                            sx={{
                              fontWeight: 700,
                              color: 'primary.main',
                              mb: 1,
                            }}
                          >
                            {item.year}
                          </Typography>
                          <Typography
                            variant="h6"
                            sx={{ fontWeight: 600, mb: 1 }}
                          >
                            {t(`timeline.${item.id}.title`)}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {t(`timeline.${item.id}.description`)}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Box>

                    {/* Timeline Icon */}
                    <Box
                      sx={{
                        position: 'relative',
                        zIndex: 1,
                        width: 80,
                        height: 80,
                        borderRadius: '50%',
                        bgcolor: 'primary.main',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: 4,
                        borderColor: 'background.default',
                        boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)',
                      }}
                    >
                      <Icon sx={{ fontSize: 36, color: 'white' }} />
                    </Box>

                    <Box sx={{ flex: 1, display: { xs: 'none', md: 'block' } }} />
                  </Box>
                );
              })}
            </Stack>
          </Box>
        </Container>
      )}

      {/* Values Section */}
      <Box sx={{ bgcolor: theme.palette.mode === 'dark' ? 'background.paper' : 'grey.50', py: { xs: 8, md: 12 } }}>
        <Container maxWidth="lg">
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: '2rem', md: '2.5rem' },
              fontWeight: 700,
              textAlign: 'center',
              mb: 2,
            }}
          >
            {t('values.title')}
          </Typography>
          <Typography
            variant="h6"
            color="text.secondary"
            sx={{
              textAlign: 'center',
              mb: 6,
              maxWidth: '42rem',
              mx: 'auto',
            }}
          >
            {t('values.subtitle')}
          </Typography>
          <Grid container spacing={3}>
            {values.map((value) => {
              const Icon = value.icon;
              return (
                <Grid item xs={12} sm={6} md={4} key={value.id}>
                  <Card
                    elevation={0}
                    sx={{
                      height: '100%',
                      border: 1,
                      borderColor: theme.palette.mode === 'dark' ? 'grey.800' : 'grey.200',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-8px)',
                        borderColor: value.color,
                        boxShadow: `0 12px 24px ${value.color}40`,
                        '& .value-icon': {
                          transform: 'scale(1.1) rotate(5deg)',
                          bgcolor: value.color,
                        },
                      },
                    }}
                  >
                    <CardContent sx={{ p: 3 }}>
                      <Box
                        className="value-icon"
                        sx={{
                          width: 64,
                          height: 64,
                          borderRadius: 2,
                          bgcolor: `${value.color}20`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          mb: 2,
                          transition: 'all 0.3s ease',
                        }}
                      >
                        <Icon sx={{ fontSize: 32, color: value.color }} />
                      </Box>
                      <Typography
                        variant="h6"
                        sx={{ fontWeight: 600, mb: 1 }}
                      >
                        {t(`values.${value.id}.title`)}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                        {t(`values.${value.id}.description`)}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        </Container>
      </Box>

      {/* Team Section */}
      {isMounted && (
        <Container maxWidth="lg" sx={{ py: { xs: 8, md: 12 } }}>
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: '2rem', md: '2.5rem' },
              fontWeight: 700,
              textAlign: 'center',
              mb: 2,
            }}
          >
            {t('team.title')}
          </Typography>
          <Typography
            variant="h6"
            color="text.secondary"
            sx={{
              textAlign: 'center',
              mb: 6,
              maxWidth: '42rem',
              mx: 'auto',
            }}
          >
            {t('team.subtitle')}
          </Typography>
          <Grid container spacing={4}>
            {team.map((member) => (
              <Grid item xs={12} sm={6} md={4} key={member.id}>
                <Card
                  elevation={0}
                  sx={{
                    textAlign: 'center',
                    border: 1,
                    borderColor: theme.palette.mode === 'dark' ? 'grey.800' : 'grey.200',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      borderColor: member.color,
                      boxShadow: `0 12px 24px ${member.color}30`,
                      '& .team-avatar': {
                        transform: 'scale(1.1)',
                        boxShadow: `0 8px 24px ${member.color}60`,
                      },
                    },
                  }}
                >
                  <CardContent sx={{ p: 4 }}>
                    <Avatar
                      className="team-avatar"
                      sx={{
                        width: 96,
                        height: 96,
                        mx: 'auto',
                        mb: 2,
                        bgcolor: member.color,
                        fontSize: '2rem',
                        fontWeight: 700,
                        transition: 'all 0.3s ease',
                      }}
                    >
                      {member.avatar}
                    </Avatar>
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
                      {t(`team.members.${member.id}.name`)}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: member.color,
                        fontWeight: 600,
                        mb: 2,
                      }}
                    >
                      {member.role}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                      {t(`team.members.${member.id}.bio`)}
                    </Typography>
                    
                    {/* Skills */}
                    <Stack
                      direction="row"
                      spacing={1}
                      flexWrap="wrap"
                      gap={1}
                      justifyContent="center"
                      sx={{ mt: 2 }}
                    >
                      {(() => {
                        const skills = t(`team.members.${member.id}.skills`, { returnObjects: true });
                        if (Array.isArray(skills)) {
                          return skills.slice(0, 3).map((skill, index) => (
                            <Chip
                              key={index}
                              label={String(skill)}
                              size="small"
                              sx={{
                                bgcolor: `${member.color}20`,
                                color: member.color,
                                fontWeight: 500,
                              }}
                            />
                          ));
                        }
                        return null;
                      })()}
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      )}

      {/* CTA Section */}
      <Box
        sx={{
          background: theme.palette.mode === 'dark'
            ? 'linear-gradient(135deg, #1e3a8a 0%, #7c3aed 100%)'
            : 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
          py: { xs: 8, md: 12 },
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1 }}>
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
              <Box
                component="button"
                sx={{
                  bgcolor: 'white',
                  color: 'primary.main',
                  px: 4,
                  py: 1.5,
                  borderRadius: 2,
                  fontSize: '1.125rem',
                  fontWeight: 600,
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    bgcolor: 'grey.100',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
                  },
                }}
              >
                {t('cta.primary')}
              </Box>
              <Box
                component="button"
                sx={{
                  bgcolor: 'transparent',
                  color: 'white',
                  px: 4,
                  py: 1.5,
                  borderRadius: 2,
                  fontSize: '1.125rem',
                  fontWeight: 600,
                  border: '2px solid white',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    bgcolor: 'rgba(255, 255, 255, 0.1)',
                    transform: 'translateY(-2px)',
                  },
                }}
              >
                {t('cta.secondary')}
              </Box>
            </Stack>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}
