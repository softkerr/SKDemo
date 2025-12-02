import * as z from 'zod';

// Zod validation schemas for each step
export const personalInfoSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().regex(/^\+?[\d\s-()]+$/, 'Invalid phone number').optional().or(z.literal('')),
  dateOfBirth: z.string().optional(),
});

export const businessInfoSchema = z.object({
  companyName: z.string().min(2, 'Company name must be at least 2 characters'),
  position: z.string().min(2, 'Position must be at least 2 characters'),
  industry: z.string().min(1, 'Please select an industry'),
  companySize: z.string().min(1, 'Please select company size'),
  website: z.string().url('Invalid URL').optional().or(z.literal('')),
});

export const messageSchema = z.object({
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  message: z.string().min(20, 'Message must be at least 20 characters'),
  priority: z.enum(['low', 'medium', 'high']),
  category: z.string().min(1, 'Please select a category'),
  attachments: z.boolean().optional(),
});

export const preferencesSchema = z.object({
  contactMethod: z.enum(['email', 'phone', 'both']),
  newsletterSubscribe: z.boolean(),
  termsAccepted: z.boolean().refine((val) => val === true, {
    message: 'You must accept the terms and conditions',
  }),
  marketingConsent: z.boolean().optional(),
});

// Combined schema for all steps
export const formSchema = z.object({
  personalInfo: personalInfoSchema,
  businessInfo: businessInfoSchema,
  message: messageSchema,
  preferences: preferencesSchema,
});

export type FormData = z.infer<typeof formSchema>;
export type StepId = 'personalInfo' | 'businessInfo' | 'message' | 'preferences';
