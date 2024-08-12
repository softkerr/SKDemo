'use client';

import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Stepper,
  Step,
  StepLabel,
  Button,
  TextField,
  FormControl,
  FormControlLabel,
  Checkbox,
  Radio,
  RadioGroup,
  FormLabel,
  Select,
  MenuItem,
  InputLabel,
  Card,
  CardContent,
  Stack,
  Alert,
  Chip,
  Grid,
  Paper,
  Divider,
  LinearProgress,
  IconButton,
  Tooltip,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import {
  ArrowBack,
  ArrowForward,
  Send,
  CheckCircle,
  Person,
  Business,
  Message,
  Settings,
  RestartAlt,
} from '@mui/icons-material';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useTranslation } from 'react-i18next';
import '../../i18n/config';

// Zod validation schemas for each step
const personalInfoSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().regex(/^\+?[\d\s-()]+$/, 'Invalid phone number').optional().or(z.literal('')),
  dateOfBirth: z.string().optional(),
});

const businessInfoSchema = z.object({
  companyName: z.string().min(2, 'Company name must be at least 2 characters'),
  position: z.string().min(2, 'Position must be at least 2 characters'),
  industry: z.string().min(1, 'Please select an industry'),
  companySize: z.string().min(1, 'Please select company size'),
  website: z.string().url('Invalid URL').optional().or(z.literal('')),
});

const messageSchema = z.object({
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  message: z.string().min(20, 'Message must be at least 20 characters'),
  priority: z.enum(['low', 'medium', 'high']),
  category: z.string().min(1, 'Please select a category'),
  attachments: z.boolean().optional(),
});

const preferencesSchema = z.object({
  contactMethod: z.enum(['email', 'phone', 'both']),
  newsletterSubscribe: z.boolean(),
  termsAccepted: z.boolean().refine((val) => val === true, {
    message: 'You must accept the terms and conditions',
  }),
  marketingConsent: z.boolean().optional(),
});

// Combined schema for all steps
const formSchema = z.object({
  personalInfo: personalInfoSchema,
  businessInfo: businessInfoSchema,
  message: messageSchema,
  preferences: preferencesSchema,
});

type FormData = z.infer<typeof formSchema>;

// Available steps configuration
const availableSteps = [
  { id: 'personalInfo', label: 'Personal Info', icon: <Person /> },
  { id: 'businessInfo', label: 'Business Info', icon: <Business /> },
  { id: 'message', label: 'Message', icon: <Message /> },
  { id: 'preferences', label: 'Preferences', icon: <Settings /> },
] as const;

type StepId = typeof availableSteps[number]['id'];

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

    // Return default empty values if no saved data
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
    setValue,
    getValues,
    trigger,
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: 'onBlur', // Changed from 'onChange' to prevent validation interference
    reValidateMode: 'onChange', // Re-validate on change after first validation
    criteriaMode: 'all', // Show all errors
    shouldUnregister: false, // CRITICAL: Keep field values when unmounting
    defaultValues: getDefaultValues(),
  });

  const formData = watch();

  // Check if there was saved data and show alert (keeps previous behavior)
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

  // Persist form values to localStorage using getValues() to ensure nested
  // fields (e.g. personalInfo.firstName) are included even if registered
  // behavior would make watch() return partial shapes.
  useEffect(() => {
    if (submitted) return; // don't save after submission

    // Use watch subscription and call getValues() when values change
    const subscription = watch(() => {
      try {
        const values = getValues();
        console.log('💾 Saving to localStorage:', values); // Debug log
        
        // Safeguard: Merge with existing data to prevent accidental overwrites
        const existingData = localStorage.getItem(STORAGE_KEY);
        let mergedData = values;
        
        if (existingData) {
          try {
            const existing = JSON.parse(existingData);
            // Deep merge: keep existing non-empty values, add new values
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
    
    // Get current form values before validation
    const currentValues = getValues();
    console.log('📝 Current form values before Next:', currentValues);
    console.log('🔍 Validating step:', currentStepId);
    
    // Validate only the current step's fields
    const isValid = await trigger(currentStepId);
    
    console.log('✅ Validation result:', isValid);

    if (isValid) {
      
      setCompletedSteps((prev) => new Set(prev).add(activeStep));
      setActiveStep((prev) => prev + 1);
      
    }
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const handleStepClick = (stepIndex: number) => {
    // Can only navigate to completed steps or current step
    if (stepIndex <= activeStep || completedSteps.has(stepIndex)) {
      setActiveStep(stepIndex);
    }
  };

  const onSubmit = async (data: FormData) => {
    console.log('Form submitted:', data);
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    setSubmitted(true);
    
    // Clear localStorage after successful submission
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
        return (
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
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
            <Grid item xs={12} sm={6}>
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
            <Grid item xs={12} sm={6}>
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
            <Grid item xs={12} sm={6}>
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
            <Grid item xs={12} sm={6}>
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
                )}              />
            </Grid>
          </Grid>
        );

      case 'businessInfo':
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

      case 'message':
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

      case 'preferences':
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

      default:
        return null;
    }
  };

  if (submitted) {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          background: theme.palette.mode === 'dark'
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
              <Button
                variant="contained"
                size="large"
                onClick={handleReset}
                sx={{ mt: 3 }}
              >
                {t('success.action')}
              </Button>
            </CardContent>
          </Card>
        </Container>
      </Box>
    );
  }

  const currentStep = availableSteps[activeStep];
  const progress = ((activeStep + 1) / availableSteps.length) * 100;

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: theme.palette.mode === 'dark'
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
              <LinearProgress variant="determinate" value={progress} sx={{ height: 8, borderRadius: 4 }} />
            </Box>

            {/* Stepper - Clickable */}
            <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
              {availableSteps.map((step, index) => (
                <Step 
                  key={step.id} 
                  completed={completedSteps.has(index)}
                  sx={{ cursor: 'pointer' }}
                >
                  <StepLabel 
                    onClick={() => handleStepClick(index)}
                    sx={{
                      cursor: completedSteps.has(index) || index === activeStep ? 'pointer' : 'not-allowed',
                      opacity: completedSteps.has(index) || index === activeStep ? 1 : 0.5,
                    }}
                  >
                    {t(`steps.${step.id}.label`)}
                  </StepLabel>
                </Step>
              ))}
            </Stepper>

            {/* Form Content */}
            <form onSubmit={handleSubmit(onSubmit)}>
              <Box sx={{ mb: 4 }}>{renderStepContent(currentStep.id)}</Box>

              {/* Navigation Buttons */}
              <Divider sx={{ my: 3 }} />
              <Stack direction="row" spacing={2} justifyContent="space-between">
                <Button
                  onClick={handleBack}
                  disabled={activeStep === 0}
                  startIcon={<ArrowBack />}
                  variant="outlined"
                >
                  {t('buttons.prev')}
                </Button>
                
                <Button
                  onClick={handleReset}
                  color="error"
                  variant="outlined"
                  startIcon={<RestartAlt />}
                >
                  {t('buttons.reset')}
                </Button>

                {activeStep === availableSteps.length - 1 ? (
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
                    onClick={handleNext}
                    endIcon={<ArrowForward />}
                  >
                    {t('buttons.next')}
                  </Button>
                )}
              </Stack>
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
              {JSON.stringify(formData, null, 2)}
            </pre>
          </Paper>
        )}
      </Container>
    </Box>
  );
}
