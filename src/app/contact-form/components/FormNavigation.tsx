import React from 'react';
import { Stack, Button, Divider } from '@mui/material';
import { ArrowBack, ArrowForward, Send, RestartAlt } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

interface FormNavigationProps {
  activeStep: number;
  totalSteps: number;
  onBack: () => void;
  onNext: () => void;
  onReset: () => void;
  onSubmit: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
}

export default function FormNavigation({
  activeStep,
  totalSteps,
  onBack,
  onNext,
  onReset,
  onSubmit,
  isFirstStep,
  isLastStep,
}: FormNavigationProps) {
  const { t } = useTranslation('contact-form');

  return (
    <>
      <Divider sx={{ my: 3 }} />
      <Stack direction="row" spacing={2} justifyContent="space-between">
        <Button
          onClick={onBack}
          disabled={isFirstStep}
          startIcon={<ArrowBack />}
          variant="outlined"
        >
          {t('buttons.prev')}
        </Button>

        <Button
          onClick={onReset}
          color="error"
          variant="outlined"
          startIcon={<RestartAlt />}
        >
          {t('buttons.reset')}
        </Button>

        {isLastStep ? (
          <Button
            variant="contained"
            type="submit"
            endIcon={<Send />}
            size="large"
          >
            {t('buttons.submit')}
          </Button>
        ) : (
          <Button
            variant="contained"
            onClick={onNext}
            endIcon={<ArrowForward />}
          >
            {t('buttons.next')}
          </Button>
        )}
      </Stack>
    </>
  );
}
