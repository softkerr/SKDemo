'use client';

import React, { useState, useEffect } from 'react';
import { Box, Container, Typography, Card, CardContent, Alert, Paper } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslation } from 'react-i18next';
import '../../i18n/config';

import { FormData, formSchema, StepId } from './schemas/formSchemas';
import { availableSteps } from './components/FormProgress';
import PersonalInfoStep from './components/PersonalInfoStep';
import BusinessInfoStep from './components/BusinessInfoStep';
import MessageStep from './components/MessageStep';
import PreferencesStep from './components/PreferencesStep';
import FormProgress from './components/FormProgress';
import FormNavigation from './components/FormNavigation';
import SuccessScreen from './components/SuccessScreen';

const STORAGE_KEY = 'contact-form-data';

export default function AdvancedContactForm() {
  const theme = useTheme();
  const { t } = useTranslation('contact-form');
  const [activeStep, setActiveStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());
  const [submitted, setSubmitted] = useState(false);
  const [savedData, setSavedData] = useState<Partial<FormData> | null>(null);

  // Load saved data from localStorage before initializing form
  const getDefaultValues = (): FormData => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        try {
          const parsedData = JSON.parse(saved);
          return parsedData;
        } catch (error) {
          console.error('Error loading saved form data:', error);
        }
      }
    }

    return {
      personalInfo: {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        dateOfBirth: '',
      },
      businessInfo: {
        companyName: '',
        position: '',
        industry: '',
        companySize: '',
        website: '',
      },
      message: {
        subject: '',
        message: '',
        priority: 'medium',
        category: '',
        attachments: false,
      },
      preferences: {
        contactMethod: 'email',
        newsletterSubscribe: false,
        termsAccepted: false,
        marketingConsent: false,
      },
    };
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
    getValues,
    trigger,
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: 'onBlur',
    reValidateMode: 'onChange',
    criteriaMode: 'all',
    shouldUnregister: false,
    defaultValues: getDefaultValues(),
  });

  // Check if there was saved data and show alert
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsedData = JSON.parse(saved);
        setSavedData(parsedData);
      } catch (error) {
        console.error('Error loading saved form data:', error);
      }
    }
  }, []);

  // Persist form values to localStorage
  useEffect(() => {
    if (submitted) return;

    const subscription = watch(() => {
      try {
        const values = getValues();
        console.log('💾 Saving to localStorage:', values);

        const existingData = localStorage.getItem(STORAGE_KEY);
        let mergedData = values;

        if (existingData) {
          try {
            const existing = JSON.parse(existingData);
            mergedData = {
              personalInfo: { ...existing.personalInfo, ...values.personalInfo },
              businessInfo: { ...existing.businessInfo, ...values.businessInfo },
              message: { ...existing.message, ...values.message },
              preferences: { ...existing.preferences, ...values.preferences },
            };
            console.log('🔄 Merged with existing data:', mergedData);
          } catch (e) {
            console.warn('Could not merge with existing data, using current values');
          }
        }

        localStorage.setItem(STORAGE_KEY, JSON.stringify(mergedData));
      } catch (err) {
        console.error('Error saving form data to localStorage:', err);
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, getValues, submitted]);

  const handleNext = async () => {
    const currentStepId = availableSteps[activeStep].id;

    const currentValues = getValues();
    console.log('📝 Current form values before Next:', currentValues);
    console.log('🔍 Validating step:', currentStepId);

    const isValid = await trigger(currentStepId);
    console.log('✅ Validation result:', isValid);

    if (isValid) {
      const valuesAfterValidation = getValues();
      console.log('🔎 Values after validation:', valuesAfterValidation);

      const finalValues = getValues();
      console.log('💾 Saving before step change:', finalValues);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(finalValues));

      setCompletedSteps((prev) => new Set(prev).add(activeStep));
      setActiveStep((prev) => prev + 1);

      setTimeout(() => {
        const valuesAfterStepChange = getValues();
        console.log('💾 Values after step change:', valuesAfterStepChange);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(valuesAfterStepChange));
      }, 100);
    }
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const handleStepClick = (stepIndex: number) => {
    if (stepIndex <= activeStep || completedSteps.has(stepIndex)) {
      setActiveStep(stepIndex);
    }
  };

  const onSubmit = async (data: FormData) => {
    console.log('Form submitted:', data);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setSubmitted(true);
    localStorage.removeItem(STORAGE_KEY);
  };

  const handleReset = () => {
    reset();
    setActiveStep(0);
    setCompletedSteps(new Set());
    setSubmitted(false);
    localStorage.removeItem(STORAGE_KEY);
    setSavedData(null);
  };

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

  const currentStep = availableSteps[activeStep];

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
              <Box sx={{ mb: 4 }}>{renderStepContent(currentStep.id)}</Box>

              <FormNavigation
                activeStep={activeStep}
                totalSteps={availableSteps.length}
                onBack={handleBack}
                onNext={handleNext}
                onReset={handleReset}
                onSubmit={() => handleSubmit(onSubmit)()}
                isFirstStep={activeStep === 0}
                isLastStep={activeStep === availableSteps.length - 1}
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
