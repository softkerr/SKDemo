import { FormData } from '../zod/schemas/formSchemas';

const STORAGE_KEY = 'contact-form-data';

export const defaultValues: FormData = {
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

export const getStoredFormData = (): FormData => {
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
  return defaultValues;
};

export const saveFormData = (data: FormData) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (err) {
    console.error('Error saving form data to localStorage:', err);
  }
};

export const clearStoredFormData = () => {
  localStorage.removeItem(STORAGE_KEY);
};

export const mergeFormData = (newValues: FormData): FormData => {
  const existingData = localStorage.getItem(STORAGE_KEY);
  let mergedData = newValues;

  if (existingData) {
    try {
      const existing = JSON.parse(existingData);
      mergedData = {
        personalInfo: { ...existing.personalInfo, ...newValues.personalInfo },
        businessInfo: { ...existing.businessInfo, ...newValues.businessInfo },
        message: { ...existing.message, ...newValues.message },
        preferences: { ...existing.preferences, ...newValues.preferences },
      };
    } catch (e) {
      console.warn('Could not merge with existing data, using current values');
    }
  }
  return mergedData;
};
