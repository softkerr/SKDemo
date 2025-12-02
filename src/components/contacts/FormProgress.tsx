import React from 'react';
import { Box, Typography, LinearProgress, Stepper, Step, StepLabel } from '@mui/material';
import { Person, Business, Message, Settings } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { StepId } from '../../zod/schemas/formSchemas';

interface StepConfig {
  id: StepId;
  label: string;
  icon: React.ReactElement;
}

interface FormProgressProps {
  activeStep: number;
  completedSteps: Set<number>;
  onStepClick: (index: number) => void;
}

export const availableSteps: StepConfig[] = [
  { id: 'personalInfo', label: 'Personal Info', icon: <Person /> },
  { id: 'businessInfo', label: 'Business Info', icon: <Business /> },
  { id: 'message', label: 'Message', icon: <Message /> },
  { id: 'preferences', label: 'Preferences', icon: <Settings /> },
];

export default function FormProgress({
  activeStep,
  completedSteps,
  onStepClick,
}: FormProgressProps) {
  const { t } = useTranslation('contact-form');
  const progress = ((activeStep + 1) / availableSteps.length) * 100;

  return (
    <>
      {/* Progress Bar */}
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Typography variant="body2" color="text.secondary">
            {t('progress.step', { current: activeStep + 1, total: availableSteps.length })}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('progress.complete', { percent: Math.round(progress) })}
          </Typography>
        </Box>
        <LinearProgress
          variant="determinate"
          value={progress}
          sx={{ height: 8, borderRadius: 4 }}
        />
      </Box>

      {/* Stepper - Clickable */}
      <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
        {availableSteps.map((step, index) => (
          <Step key={step.id} completed={completedSteps.has(index)} sx={{ cursor: 'pointer' }}>
            <StepLabel
              onClick={() => onStepClick(index)}
              sx={{
                cursor:
                  completedSteps.has(index) || index === activeStep ? 'pointer' : 'not-allowed',
                opacity: completedSteps.has(index) || index === activeStep ? 1 : 0.5,
              }}
            >
              {t(`steps.${step.id}.label`)}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </>
  );
}
