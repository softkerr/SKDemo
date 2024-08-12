'use client';

import { useTranslation } from 'react-i18next';
import { Box, Container, Typography, Button, Stack, Chip } from '@mui/material';
import { ArrowForward, PlayArrow } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import Link from 'next/link';

export function HeroSection() {
  const { t } = useTranslation('home');
  const theme = useTheme();

  return (
    <Box
      component="section"
      data-section="hero"
      sx={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        background: theme.palette.mode === 'dark'
          ? 'linear-gradient(180deg, #0f172a 0%, #1e3a5f 50%, #0f172a 100%)'
          : 'linear-gradient(180deg, #eff6ff 0%, #ffffff 50%, #f3e8ff 100%)',
        transition: 'background 0.3s ease',
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
        <Box
          sx={{
            position: 'absolute',
            top: '-10rem',
            right: '-10rem',
            width: '24rem',
            height: '24rem',
            borderRadius: '50%',
            background: theme.palette.mode === 'dark'
              ? 'radial-gradient(circle, rgba(59, 130, 246, 0.2) 0%, transparent 70%)'
              : 'radial-gradient(circle, rgba(96, 165, 250, 0.3) 0%, transparent 70%)',
            filter: 'blur(60px)',
            animation: 'pulse 3s ease-in-out infinite',
            '@keyframes pulse': {
              '0%, 100%': { opacity: 1 },
              '50%': { opacity: 0.5 },
            },
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            bottom: '-10rem',
            left: '-10rem',
            width: '24rem',
            height: '24rem',
            borderRadius: '50%',
            background: theme.palette.mode === 'dark'
              ? 'radial-gradient(circle, rgba(168, 85, 247, 0.2) 0%, transparent 70%)'
              : 'radial-gradient(circle, rgba(192, 132, 252, 0.3) 0%, transparent 70%)',
            filter: 'blur(60px)',
            animation: 'pulse 3s ease-in-out infinite',
            animationDelay: '1s',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '16rem',
            height: '16rem',
            borderRadius: '50%',
            background: theme.palette.mode === 'dark'
              ? 'radial-gradient(circle, rgba(6, 182, 212, 0.1) 0%, transparent 70%)'
              : 'radial-gradient(circle, rgba(103, 232, 249, 0.2) 0%, transparent 70%)',
            filter: 'blur(60px)',
            animation: 'pulse 3s ease-in-out infinite',
            animationDelay: '2s',
          }}
        />
      </Box>

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Box sx={{ maxWidth: '64rem', mx: 'auto', textAlign: 'center' }}>
          {/* Badge */}
          <Box sx={{ mb: 4 }}>
            <Chip
              icon={
                <Box
                  sx={{
                    position: 'relative',
                    width: 8,
                    height: 8,
                  }}
                >
                  <Box
                    sx={{
                      position: 'absolute',
                      width: '100%',
                      height: '100%',
                      borderRadius: '50%',
                      bgcolor: 'primary.main',
                      animation: 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite',
                      '@keyframes ping': {
                        '0%': { transform: 'scale(1)', opacity: 0.75 },
                        '75%, 100%': { transform: 'scale(2)', opacity: 0 },
                      },
                    }}
                  />
                  <Box
                    sx={{
                      position: 'relative',
                      width: '100%',
                      height: '100%',
                      borderRadius: '50%',
                      bgcolor: 'primary.main',
                    }}
                  />
                </Box>
              }
              label={t('hero.badge')}
              sx={{
                px: 2,
                py: 1,
                fontSize: '0.875rem',
                fontWeight: 500,
                backdropFilter: 'blur(8px)',
                border: 1,
                borderColor: theme.palette.mode === 'dark'
                  ? 'rgba(59, 130, 246, 0.3)'
                  : 'primary.light',
                bgcolor: theme.palette.mode === 'dark'
                  ? 'rgba(59, 130, 246, 0.1)'
                  : 'primary.50',
                color: theme.palette.mode === 'dark' ? 'primary.light' : 'primary.dark',
              }}
            />
          </Box>

          {/* Main Headline */}
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: '2.25rem', sm: '3rem', md: '3.75rem', lg: '4.5rem' },
              fontWeight: 700,
              mb: 3,
              lineHeight: 1.2,
            }}
          >
            {t('hero.title')}
          </Typography>

          {/* Subheadline */}
          <Typography
            variant="h5"
            color="text.secondary"
            sx={{
              fontSize: { xs: '1.125rem', sm: '1.25rem', md: '1.5rem' },
              mb: 5,
              maxWidth: '48rem',
              mx: 'auto',
              lineHeight: 1.6,
            }}
          >
            {t('hero.description')}
          </Typography>

          {/* CTA Buttons */}
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={2}
            justifyContent="center"
            sx={{ mb: 6 }}
          >
            <Button
              component={Link}
              href="/get-quote"
              variant="contained"
              size="large"
              endIcon={<ArrowForward />}
              sx={{
                fontSize: { xs: '1rem', sm: '1.125rem' },
                px: 4,
                py: 1.5,
                textTransform: 'none',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: theme.palette.mode === 'dark'
                    ? '0 8px 24px rgba(59, 130, 246, 0.4)'
                    : '0 8px 24px rgba(37, 99, 235, 0.3)',
                },
              }}
            >
              {t('hero.primaryCta')}
            </Button>

            <Button
              component={Link}
              href="#demo-video"
              variant="outlined"
              size="large"
              startIcon={<PlayArrow />}
              sx={{
                fontSize: { xs: '1rem', sm: '1.125rem' },
                px: 4,
                py: 1.5,
                textTransform: 'none',
                backdropFilter: 'blur(8px)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-2px)',
                },
              }}
            >
              {t('hero.secondaryCta')}
            </Button>
          </Stack>

          {/* Social Proof Stats */}
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={{ xs: 3, sm: 4 }}
            justifyContent="center"
            alignItems="center"
            sx={{
              fontSize: { xs: '0.875rem', sm: '1rem' },
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography
                variant="h4"
                sx={{
                  fontSize: { xs: '1.5rem', sm: '1.875rem' },
                  fontWeight: 700,
                }}
              >
                {t('hero.stats.studiosCount')}
              </Typography>
              <Typography color="text.secondary">
                {t('hero.stats.studiosLabel')}
              </Typography>
            </Box>

            <Box
              sx={{
                display: { xs: 'none', sm: 'block' },
                width: '1px',
                height: '2rem',
                bgcolor: theme.palette.mode === 'dark' ? 'grey.700' : 'grey.300',
              }}
            />

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography
                variant="h4"
                sx={{
                  fontSize: { xs: '1.5rem', sm: '1.875rem' },
                  fontWeight: 700,
                }}
              >
                {t('hero.stats.projectsCount')}
              </Typography>
              <Typography color="text.secondary">
                {t('hero.stats.projectsLabel')}
              </Typography>
            </Box>

            <Box
              sx={{
                display: { xs: 'none', sm: 'block' },
                width: '1px',
                height: '2rem',
                bgcolor: theme.palette.mode === 'dark' ? 'grey.700' : 'grey.300',
              }}
            />

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography
                variant="h4"
                color="primary"
                sx={{
                  fontSize: { xs: '1.5rem', sm: '1.875rem' },
                  fontWeight: 700,
                }}
              >
                {t('hero.stats.uptimeCount')}
              </Typography>
              <Typography color="text.secondary">
                {t('hero.stats.uptimeLabel')}
              </Typography>
            </Box>
          </Stack>

          {/* Trust Badges / Logos */}
          <Box sx={{ mt: 8 }}>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              {t('hero.trustedBy')}
            </Typography>
            <Stack
              direction="row"
              spacing={4}
              justifyContent="center"
              flexWrap="wrap"
              sx={{ opacity: 0.6 }}
            >
              {/* Placeholder for company logos - will be from Sanity */}
              {[1, 2, 3, 4, 5].map((i) => (
                <Box
                  key={i}
                  sx={{
                    height: 32,
                    width: 96,
                    borderRadius: 1,
                    bgcolor: theme.palette.mode === 'dark' ? 'grey.700' : 'grey.300',
                  }}
                />
              ))}
            </Stack>
          </Box>
        </Box>
      </Container>

      {/* Scroll Indicator */}
      <Box
        sx={{
          position: 'absolute',
          bottom: '2rem',
          left: '50%',
          transform: 'translateX(-50%)',
          animation: 'bounce 2s infinite',
          '@keyframes bounce': {
            '0%, 100%': { transform: 'translateX(-50%) translateY(0)' },
            '50%': { transform: 'translateX(-50%) translateY(-10px)' },
          },
        }}
      >
        <Box
          sx={{
            width: 24,
            height: 40,
            borderRadius: '12px',
            border: 2,
            borderColor: theme.palette.mode === 'dark' ? 'grey.600' : 'grey.400',
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'center',
            p: 0.5,
          }}
        >
          <Box
            sx={{
              width: 6,
              height: 6,
              borderRadius: '50%',
              bgcolor: theme.palette.mode === 'dark' ? 'grey.400' : 'grey.600',
            }}
          />
        </Box>
      </Box>
    </Box>
  );
}
