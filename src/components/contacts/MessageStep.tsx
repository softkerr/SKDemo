import React from 'react';
import {
  Grid,
  TextField,
  FormControl,
  FormControlLabel,
  FormLabel,
  RadioGroup,
  Radio,
  Select,
  MenuItem,
  InputLabel,
  Checkbox,
  Typography,
} from '@mui/material';
import { Control, FieldErrors, Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { FormData } from '../../zod/schemas/formSchemas';

interface MessageStepProps {
  control: Control<FormData>;
  errors: FieldErrors<FormData>;
}

export default function MessageStep({ control, errors }: MessageStepProps) {
  const { t } = useTranslation('contact-form');

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Controller
          name="message.subject"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Subject"
              fullWidth
              required
              error={!!errors.message?.subject}
              helperText={errors.message?.subject?.message}
            />
          )}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <Controller
          name="message.category"
          control={control}
          render={({ field }) => (
            <FormControl fullWidth required error={!!errors.message?.category}>
              <InputLabel>Category</InputLabel>
              <Select {...field} label="Category">
                <MenuItem value="">Select...</MenuItem>
                <MenuItem value="general">General Inquiry</MenuItem>
                <MenuItem value="support">Technical Support</MenuItem>
                <MenuItem value="sales">Sales</MenuItem>
                <MenuItem value="partnership">Partnership</MenuItem>
                <MenuItem value="feedback">Feedback</MenuItem>
              </Select>
              {errors.message?.category && (
                <Typography variant="caption" color="error" sx={{ mt: 0.5, ml: 2 }}>
                  {errors.message.category.message}
                </Typography>
              )}
            </FormControl>
          )}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <Controller
          name="message.priority"
          control={control}
          render={({ field }) => (
            <FormControl fullWidth>
              <FormLabel>Priority</FormLabel>
              <RadioGroup {...field} row>
                <FormControlLabel value="low" control={<Radio />} label="Low" />
                <FormControlLabel value="medium" control={<Radio />} label="Medium" />
                <FormControlLabel value="high" control={<Radio />} label="High" />
              </RadioGroup>
            </FormControl>
          )}
        />
      </Grid>
      <Grid item xs={12}>
        <Controller
          name="message.message"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Message"
              multiline
              rows={6}
              fullWidth
              required
              error={!!errors.message?.message}
              helperText={errors.message?.message?.message}
              placeholder="Please provide details about your inquiry..."
            />
          )}
        />
      </Grid>
      <Grid item xs={12}>
        <Controller
          name="message.attachments"
          control={control}
          render={({ field }) => (
            <FormControlLabel
              control={<Checkbox {...field} checked={field.value} />}
              label="I have attachments to send (will be requested via email)"
            />
          )}
        />
      </Grid>
    </Grid>
  );
}
