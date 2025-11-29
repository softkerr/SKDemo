import React from 'react';
import {
  Grid,
  FormControl,
  FormControlLabel,
  FormLabel,
  RadioGroup,
  Radio,
  Checkbox,
  Stack,
  Divider,
  Typography,
} from '@mui/material';
import { Control, FieldErrors, Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { FormData } from '../schemas/formSchemas';

interface PreferencesStepProps {
  control: Control<FormData>;
  errors: FieldErrors<FormData>;
}

export default function PreferencesStep({ control, errors }: PreferencesStepProps) {
  const { t } = useTranslation('contact-form');

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Controller
          name="preferences.contactMethod"
          control={control}
          render={({ field }) => (
            <FormControl fullWidth>
              <FormLabel>Preferred Contact Method</FormLabel>
              <RadioGroup {...field}>
                <FormControlLabel value="email" control={<Radio />} label="Email" />
                <FormControlLabel value="phone" control={<Radio />} label="Phone" />
                <FormControlLabel value="both" control={<Radio />} label="Both" />
              </RadioGroup>
            </FormControl>
          )}
        />
      </Grid>
      <Grid item xs={12}>
        <Divider />
      </Grid>
      <Grid item xs={12}>
        <Stack spacing={2}>
          <Controller
            name="preferences.newsletterSubscribe"
            control={control}
            render={({ field }) => (
              <FormControlLabel
                control={<Checkbox {...field} checked={field.value} />}
                label="Subscribe to our newsletter for updates and offers"
              />
            )}
          />
          <Controller
            name="preferences.marketingConsent"
            control={control}
            render={({ field }) => (
              <FormControlLabel
                control={<Checkbox {...field} checked={field.value} />}
                label="I agree to receive marketing communications"
              />
            )}
          />
          <Controller
            name="preferences.termsAccepted"
            control={control}
            render={({ field }) => (
              <FormControlLabel
                control={<Checkbox {...field} checked={field.value} />}
                label={
                  <Typography>
                    I accept the{' '}
                    <Typography component="span" color="primary" sx={{ cursor: 'pointer' }}>
                      terms and conditions
                    </Typography>{' '}
                    and{' '}
                    <Typography component="span" color="primary" sx={{ cursor: 'pointer' }}>
                      privacy policy
                    </Typography>
                    *
                  </Typography>
                }
              />
            )}
          />
          {errors.preferences?.termsAccepted && (
            <Typography variant="caption" color="error">
              {errors.preferences.termsAccepted.message}
            </Typography>
          )}
        </Stack>
      </Grid>
    </Grid>
  );
}
