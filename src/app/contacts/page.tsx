'use client';

import React from 'react';
import { Box, Container, Typography, Card, CardContent, Alert, Paper } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import '../../i18n/config';

import { StepId } from '../../zod/schemas/formSchemas';
import PersonalInfoStep from '../../components/contacts/PersonalInfoStep';
import BusinessInfoStep from '../../components/contacts/BusinessInfoStep';
import MessageStep from '../../components/contacts/MessageStep';
import PreferencesStep from '../../components/contacts/PreferencesStep';
import FormProgress from '../../components/contacts/FormProgress';
import FormNavigation from '../../components/contacts/FormNavigation';
import SuccessScreen from '../../components/contacts/SuccessScreen';
import { useContactForm } from '../../hooks/useContactForm';

export default function AdvancedContactForm() {
  const theme = useTheme();
  const { t } = useTranslation('contact-form');

  const {
    form: {
      control,
      handleSubmit,
      formState: { errors },
      watch,
    },
    activeStep,
    completedSteps,
    submitted,
    savedData,
    handleNext,
    handleBack,
    handleStepClick,
    handleReset,
    onSubmit,
    currentStepId,
    isFirstStep,
    isLastStep,
    totalSteps,
  } = useContactForm();

  const renderStepContent = (stepId: StepId) => {
    switch (stepId) {
      case 'personalInfo':
        return <PersonalInfoStep control={control} errors={errors} />;
      case 'businessInfo':
        return <BusinessInfoStep control={control} errors={errors} />;
      case 'message':
        return <MessageStep control={control} errors={errors} />;
      case 'preferences':
        return <PreferencesStep control={control} errors={errors} />;
      default:
        return null;
    }
  };

  if (submitted) {
    return <SuccessScreen onReset={handleReset} />;
  }

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
      <Container maxWidth="lg">
        {/* Header */}
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: '2rem', md: '3rem' },
              fontWeight: 700,
              color: 'white',
              mb: 2,
            }}
          >
            {t('title')}
          </Typography>
          <Typography variant="h6" sx={{ color: 'rgba(255,255,255,0.9)' }}>
            {t('subtitle')}
          </Typography>
        </Box>

        {/* Alert for loaded data */}
        {savedData && (
          <Alert severity="info" sx={{ mb: 3 }}>
            {t('alerts.dataLoaded')}
          </Alert>
        )}

        {/* Main Form Card */}
        <Card>
          <CardContent>
            <FormProgress
              activeStep={activeStep}
              completedSteps={completedSteps}
              onStepClick={handleStepClick}
            />

            {/* Form Content */}
            <form onSubmit={handleSubmit(onSubmit)}>
              <Box sx={{ mb: 4 }}>{renderStepContent(currentStepId)}</Box>

              <FormNavigation
                activeStep={activeStep}
                totalSteps={totalSteps}
                onBack={handleBack}
                onNext={handleNext}
                onReset={handleReset}
                onSubmit={() => handleSubmit(onSubmit)()}
                isFirstStep={isFirstStep}
                isLastStep={isLastStep}
              />
            </form>
          </CardContent>
        </Card>

        {/* Debug Info (Development only) */}
        {process.env.NODE_ENV === 'development' && (
          <Paper sx={{ mt: 3, p: 2 }}>
            <Typography variant="caption" color="text.secondary">
              Form Data (Dev Mode):
            </Typography>
            <pre style={{ fontSize: '0.75rem', overflow: 'auto' }}>
              {JSON.stringify(watch(), null, 2)}
            </pre>
          </Paper>
        )}
      </Container>
    </Box>
  );
}
