import React from 'react';
import { Box, Container, Typography, Button, Stack, alpha } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Link from 'next/link';
import { ArrowForward } from '@mui/icons-material';

export const HeroSection: React.FC = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        background:
          theme.palette.mode === 'dark'
            ? 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #0f172a 100%)'
            : 'linear-gradient(135deg, #f8fafc 0%, #e0e7ff 50%, #f1f5f9 100%)',
      }}
    >
      {/* Animated background blobs */}
      <Box
        sx={{
          position: 'absolute',
          top: '20%',
          right: '10%',
          width: '500px',
          height: '500px',
          borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%',
          background: 'radial-gradient(circle, rgba(147, 51, 234, 0.15) 0%, transparent 70%)',
          filter: 'blur(60px)',
          animation: 'morph 20s ease-in-out infinite, float 8s ease-in-out infinite',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: '10%',
          left: '5%',
          width: '400px',
          height: '400px',
          borderRadius: '30% 60% 70% 40% / 50% 60% 30% 60%',
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, transparent 70%)',
          filter: 'blur(60px)',
          animation: 'morph 15s ease-in-out infinite reverse, float 10s ease-in-out infinite',
        }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Stack spacing={5} alignItems="center" textAlign="center">
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: '3rem', md: '5rem' },
              fontWeight: 900,
              lineHeight: 1.1,
              background: 'linear-gradient(135deg, #9333ea 0%, #3b82f6 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
            }}
          >
            Welcome to SK Demo
          </Typography>
          <Typography
            variant="h5"
            color="text.secondary"
            sx={{
              maxWidth: '700px',
              fontSize: { xs: '1.25rem', md: '1.5rem' },
              lineHeight: 1.7,
            }}
          >
            A comprehensive platform showcasing modern web development with Next.js, Sanity CMS, and
            advanced features for administration, content management, e-commerce, and more.
          </Typography>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3}>
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
                borderRadius: 2,
                background: 'linear-gradient(135deg, #9333ea 0%, #7c3aed 100%)',
                boxShadow: '0 8px 24px rgba(147, 51, 234, 0.3)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #7e22ce 0%, #6d28d9 100%)',
                },
              }}
            >
              Explore Features
            </Button>
            <Button
              component={Link}
              href="/contact"
              variant="outlined"
              size="large"
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
              Get in Touch
            </Button>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};
