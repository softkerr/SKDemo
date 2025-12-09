import React from 'react';
import { Grid, TextField } from '@mui/material';
import { Control, FieldErrors, Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { FormData } from '../../zod/schemas/formSchemas';

interface PersonalInfoStepProps {
  control: Control<FormData>;
  errors: FieldErrors<FormData>;
}

export default function PersonalInfoStep({ control, errors }: PersonalInfoStepProps) {
  const { t } = useTranslation('contact-form');

  return (
    <Grid container spacing={3}>
      <Grid size={{ xs: 12, sm: 6 }}>
        <Controller
          name="personalInfo.firstName"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label={t('steps.personalInfo.fields.firstName.label')}
              placeholder={t('steps.personalInfo.fields.firstName.placeholder')}
              fullWidth
              required
              error={!!errors.personalInfo?.firstName}
              helperText={errors.personalInfo?.firstName?.message}
            />
          )}
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6 }}>
        <Controller
          name="personalInfo.lastName"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label={t('steps.personalInfo.fields.lastName.label')}
              placeholder={t('steps.personalInfo.fields.lastName.placeholder')}
              fullWidth
              required
              error={!!errors.personalInfo?.lastName}
              helperText={errors.personalInfo?.lastName?.message}
            />
          )}
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6 }}>
        <Controller
          name="personalInfo.email"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label={t('steps.personalInfo.fields.email.label')}
              placeholder={t('steps.personalInfo.fields.email.placeholder')}
              type="email"
              fullWidth
              required
              error={!!errors.personalInfo?.email}
              helperText={errors.personalInfo?.email?.message}
            />
          )}
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6 }}>
        <Controller
          name="personalInfo.phone"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label={t('steps.personalInfo.fields.phone.label')}
              placeholder={t('steps.personalInfo.fields.phone.placeholder')}
              fullWidth
              error={!!errors.personalInfo?.phone}
              helperText={errors.personalInfo?.phone?.message}
            />
          )}
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6 }}>
        <Controller
          name="personalInfo.dateOfBirth"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label={t('steps.personalInfo.fields.dateOfBirth.label')}
              placeholder={t('steps.personalInfo.fields.dateOfBirth.placeholder')}
              type="date"
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
          )}
        />
      </Grid>
    </Grid>
  );
}
