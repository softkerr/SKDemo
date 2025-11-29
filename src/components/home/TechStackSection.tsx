import React from 'react';
import { Box, Container, Typography, Grid, Paper, alpha } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { techFeatures } from '@/data/homepage';

export const TechStackSection: React.FC = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        py: 15,
        background:
          theme.palette.mode === 'dark'
            ? 'linear-gradient(180deg, #0f172a 0%, #1e293b 100%)'
            : 'linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)',
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 10 }}>
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
          <Typography variant="h6" color="text.secondary" sx={{ maxWidth: '700px', mx: 'auto' }}>
            Leveraging the latest web technologies for performance, security, and scalability
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {techFeatures.map((feature, idx) => (
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
                  {React.cloneElement(feature.icon, {
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
          ))}
        </Grid>
      </Container>
    </Box>
  );
};
