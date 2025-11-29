import React from 'react';
import { Grid, TextField, FormControl, InputLabel, Select, MenuItem, Typography } from '@mui/material';
import { Control, FieldErrors, Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { FormData } from '../schemas/formSchemas';

interface BusinessInfoStepProps {
  control: Control<FormData>;
  errors: FieldErrors<FormData>;
}

export default function BusinessInfoStep({ control, errors }: BusinessInfoStepProps) {
  const { t } = useTranslation('contact-form');

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6}>
        <Controller
          name="businessInfo.companyName"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Company Name"
              fullWidth
              required
              error={!!errors.businessInfo?.companyName}
              helperText={errors.businessInfo?.companyName?.message}
            />
          )}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <Controller
          name="businessInfo.position"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Position/Title"
              fullWidth
              required
              error={!!errors.businessInfo?.position}
              helperText={errors.businessInfo?.position?.message}
            />
          )}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <Controller
          name="businessInfo.industry"
          control={control}
          render={({ field }) => (
            <FormControl fullWidth required error={!!errors.businessInfo?.industry}>
              <InputLabel>Industry</InputLabel>
              <Select {...field} label="Industry">
                <MenuItem value="">Select...</MenuItem>
                <MenuItem value="technology">Technology</MenuItem>
                <MenuItem value="finance">Finance</MenuItem>
                <MenuItem value="healthcare">Healthcare</MenuItem>
                <MenuItem value="education">Education</MenuItem>
                <MenuItem value="retail">Retail</MenuItem>
                <MenuItem value="manufacturing">Manufacturing</MenuItem>
                <MenuItem value="other">Other</MenuItem>
              </Select>
              {errors.businessInfo?.industry && (
                <Typography variant="caption" color="error" sx={{ mt: 0.5, ml: 2 }}>
                  {errors.businessInfo.industry.message}
                </Typography>
              )}
            </FormControl>
          )}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <Controller
          name="businessInfo.companySize"
          control={control}
          render={({ field }) => (
            <FormControl fullWidth required error={!!errors.businessInfo?.companySize}>
              <InputLabel>Company Size</InputLabel>
              <Select {...field} label="Company Size">
                <MenuItem value="">Select...</MenuItem>
                <MenuItem value="1-10">1-10 employees</MenuItem>
                <MenuItem value="11-50">11-50 employees</MenuItem>
                <MenuItem value="51-200">51-200 employees</MenuItem>
                <MenuItem value="201-500">201-500 employees</MenuItem>
                <MenuItem value="501+">501+ employees</MenuItem>
              </Select>
              {errors.businessInfo?.companySize && (
                <Typography variant="caption" color="error" sx={{ mt: 0.5, ml: 2 }}>
                  {errors.businessInfo.companySize.message}
                </Typography>
              )}
            </FormControl>
          )}
        />
      </Grid>
      <Grid item xs={12}>
        <Controller
          name="businessInfo.website"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Company Website"
              fullWidth
              error={!!errors.businessInfo?.website}
              helperText={errors.businessInfo?.website?.message}
              placeholder="https://example.com"
            />
          )}
        />
      </Grid>
    </Grid>
  );
}
