import React from 'react';
import { Box, Container, Typography, Button, Stack, alpha } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Link from 'next/link';
import { ShoppingCart, AdminPanelSettings } from '@mui/icons-material';

export const CTASection: React.FC = () => {
  const theme = useTheme();

  return (
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
  );
};
