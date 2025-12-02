import { useState, useEffect, useCallback } from 'react';
import { useForm, UseFormReturn } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormData, formSchema, StepId } from '../zod/schemas/formSchemas';
import { availableSteps } from '../components/contacts/FormProgress';
import { 
  getStoredFormData, 
  saveFormData, 
  clearStoredFormData, 
  mergeFormData 
} from '../utils/contactFormStorage';

interface UseContactFormReturn {
  form: UseFormReturn<FormData>;
  activeStep: number;
  completedSteps: Set<number>;
  submitted: boolean;
  savedData: Partial<FormData> | null;
  handleNext: () => Promise<void>;
  handleBack: () => void;
  handleStepClick: (stepIndex: number) => void;
  handleReset: () => void;
  onSubmit: (data: FormData) => Promise<void>;
  currentStepId: StepId;
  isFirstStep: boolean;
  isLastStep: boolean;
  totalSteps: number;
}

export const useContactForm = (): UseContactFormReturn => {
  const [activeStep, setActiveStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());
  const [submitted, setSubmitted] = useState(false);
  const [savedData, setSavedData] = useState<Partial<FormData> | null>(null);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: 'onBlur',
    reValidateMode: 'onChange',
    criteriaMode: 'all',
    shouldUnregister: false,
    defaultValues: getStoredFormData(),
  });

  const { watch, getValues, trigger, reset } = form;

  // Check for saved data on mount
  useEffect(() => {
    const saved = getStoredFormData();
    // We compare with default values to see if there is actual saved data
    // This is a simplified check, might need refinement based on exact requirements
    // but for now we just check if we got something back that isn't empty
    // Actually getStoredFormData returns defaultValues if nothing is there.
    // So we need to check localStorage directly or modify getStoredFormData to return null.
    // But let's stick to the original logic:
    // The original logic setSavedData if localStorage had item.
    if (typeof window !== 'undefined' && localStorage.getItem('contact-form-data')) {
       setSavedData(saved);
    }
  }, []);

  // Persist form values
  useEffect(() => {
    if (submitted) return;

    const subscription = watch(() => {
      const values = getValues();
      const merged = mergeFormData(values);
      saveFormData(merged);
    });

    return () => subscription.unsubscribe();
  }, [watch, getValues, submitted]);

  const handleNext = async () => {
    const currentStepId = availableSteps[activeStep].id;
    const isValid = await trigger(currentStepId);

    if (isValid) {
      const values = getValues();
      saveFormData(values);

      setCompletedSteps((prev) => new Set(prev).add(activeStep));
      setActiveStep((prev) => prev + 1);
      
      // Double save to ensure consistency (from original code)
      setTimeout(() => {
        saveFormData(getValues());
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
    clearStoredFormData();
  };

  const handleReset = () => {
    reset();
    setActiveStep(0);
    setCompletedSteps(new Set());
    setSubmitted(false);
    clearStoredFormData();
    setSavedData(null);
  };

  return {
    form,
    activeStep,
    completedSteps,
    submitted,
    savedData,
    handleNext,
    handleBack,
    handleStepClick,
    handleReset,
    onSubmit,
    currentStepId: availableSteps[activeStep].id,
    isFirstStep: activeStep === 0,
    isLastStep: activeStep === availableSteps.length - 1,
    totalSteps: availableSteps.length,
  };
};
