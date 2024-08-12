import React from 'react';
import { Box, Container, Card, CardContent, Typography, Button } from '@mui/material';
import { CheckCircle } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';

interface SuccessScreenProps {
  onReset: () => void;
}

export default function SuccessScreen({ onReset }: SuccessScreenProps) {
  const theme = useTheme();
  const { t } = useTranslation('contact-form');

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background:
          theme.palette.mode === 'dark'
            ? 'linear-gradient(135deg, #1e3a8a 0%, #7c3aed 100%)'
            : 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
        py: 8,
      }}
    >
      <Container maxWidth="md">
        <Card>
          <CardContent sx={{ textAlign: 'center', py: 8 }}>
            <CheckCircle sx={{ fontSize: 80, color: 'success.main', mb: 2 }} />
            <Typography variant="h3" gutterBottom fontWeight={700}>
              {t('success.title')}
            </Typography>
            <Typography variant="h6" color="text.secondary" paragraph>
              {t('success.message')}
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
              {t('success.description')}
            </Typography>
            <Button variant="contained" size="large" onClick={onReset} sx={{ mt: 3 }}>
              {t('success.action')}
            </Button>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}
