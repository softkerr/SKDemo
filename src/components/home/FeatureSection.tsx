import React from 'react';
import { Box, Container, Typography, Button, Grid, Stack, Chip, Paper, alpha } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Link from 'next/link';
import { ArrowForward } from '@mui/icons-material';
import { BenefitGrid } from './BenefitGrid';
import { colors, type FeatureSection as FeatureSectionData } from '@/data/homepage';
import { useTranslation } from 'react-i18next';

interface FeatureSectionProps {
  section: FeatureSectionData;
  index: number;
}

export const FeatureSection: React.FC<FeatureSectionProps> = ({ section, index }) => {
  const theme = useTheme();
  const { t } = useTranslation('home');
  const isEven = index % 2 === 0;
  const colorScheme = colors[section.colorScheme];

  return (
    <Box
      id={section.id}
      sx={{
        py: 15,
        position: 'relative',
        overflow: 'hidden',
        background:
          theme.palette.mode === 'dark'
            ? isEven
              ? 'linear-gradient(180deg, #0f172a 0%, #1e293b 100%)'
              : '#1e293b'
            : isEven
              ? 'linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)'
              : '#f8fafc',
      }}
    >
      {/* Decorative background blob */}
      <Box
        sx={{
          position: 'absolute',
          top: isEven ? '10%' : 'auto',
          bottom: isEven ? 'auto' : '10%',
          left: isEven ? '5%' : 'auto',
          right: isEven ? 'auto' : '5%',
          width: '600px',
          height: '600px',
          borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%',
          background: `radial-gradient(circle, ${colorScheme.glow} 0%, transparent 70%)`,
          filter: 'blur(80px)',
          animation: 'morph 20s ease-in-out infinite, float 8s ease-in-out infinite',
        }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Grid container spacing={8} alignItems="center">
          {/* Content */}
          <Grid size={{ xs: 12, md: 6 }} order={{ xs: 2, md: isEven ? 1 : 2 }}>
            <Stack spacing={4}>
              <Box>
                <Typography
                  variant="h2"
                  sx={{
                    fontSize: { xs: '2.5rem', md: '3.5rem' },
                    fontWeight: 800,
                    mb: 2,
                    lineHeight: 1.2,
                  }}
                >
                  {section.title}
                </Typography>
                <Typography
                  variant="h6"
                  color="text.secondary"
                  sx={{ fontSize: '1.25rem', lineHeight: 1.7 }}
                >
                  {section.description}
                </Typography>
              </Box>

              <Box>
                <Typography
                  variant="h5"
                  sx={{ fontWeight: 700, mb: 3, color: colorScheme.primary }}
                >
                  {t('featureSection.keyBenefits')}
                </Typography>
                <BenefitGrid benefits={section.benefits} color={colorScheme.primary} />
              </Box>

              <Box>
                <Button
                  component={Link}
                  href={section.route}
                  variant="outlined"
                  size="large"
                  endIcon={<ArrowForward />}
                  sx={{
                    px: 4,
                    py: 1.5,
                    borderRadius: 50,
                    borderWidth: 2,
                    borderColor: colorScheme.primary,
                    color: colorScheme.primary,
                    '&:hover': {
                      borderWidth: 2,
                      background: alpha(colorScheme.primary, 0.05),
                      borderColor: colorScheme.secondary,
                      color: colorScheme.secondary,
                    },
                  }}
                >
                  {t('featureSection.explore')} {section.badge}
                </Button>
              </Box>
            </Stack>
          </Grid>

          {/* Preview Card */}
          <Grid size={{ xs: 12, md: 6 }} order={{ xs: 1, md: isEven ? 2 : 1 }}>
            <Paper
              elevation={0}
              sx={{
                p: 6,
                borderRadius: 4,
                background:
                  theme.palette.mode === 'dark'
                    ? 'rgba(30, 41, 59, 0.5)'
                    : 'rgba(255, 255, 255, 0.8)',
                backdropFilter: 'blur(20px)',
                border: '1px solid',
                borderColor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'divider',
                boxShadow: `0 20px 60px ${colorScheme.glow}`,
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: `0 24px 80px ${colorScheme.glow}`,
                },
              }}
            >
              <Stack spacing={3}>
                <Box
                  sx={{
                    width: 80,
                    height: 80,
                    borderRadius: 3,
                    background: colorScheme.gradient,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: `0 8px 24px ${colorScheme.glow}`,
                  }}
                >
                  {React.cloneElement(section.icon, {
                    sx: { fontSize: 40, color: 'white' },
                  })}
                </Box>
                <Typography variant="h4" sx={{ fontWeight: 700 }}>
                  {section.title}
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.8 }}>
                  {section.previewDescription}
                </Typography>
                <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                  {section.previewTags.map((tag, idx) => (
                    <Chip
                      key={idx}
                      label={tag}
                      size="small"
                      sx={{
                        background: alpha(colorScheme.primary, 0.1),
                        color: colorScheme.primary,
                        fontWeight: 600,
                        border: '1px solid',
                        borderColor: alpha(colorScheme.primary, 0.2),
                        backdropFilter: 'blur(10px)',
                      }}
                    />
                  ))}
                </Stack>
              </Stack>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};
