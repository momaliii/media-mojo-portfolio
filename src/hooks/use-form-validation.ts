
import { useState } from 'react';
import { toast } from '@/hooks/use-toast';

type FormErrors<T> = Partial<Record<keyof T, string>>;
type ValidationRules<T> = Partial<Record<keyof T, (value: any) => string | undefined>>;

export function useFormValidation<T extends Record<string, any>>(initialState: T, validationRules: ValidationRules<T>) {
  const [formData, setFormData] = useState<T>(initialState);
  const [errors, setErrors] = useState<FormErrors<T>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof T, boolean>>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Validate field if it's been touched
    if (touched[name as keyof T]) {
      validateField(name as keyof T, value);
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));
    
    validateField(name as keyof T, value);
  };

  const validateField = (field: keyof T, value: any) => {
    const validator = validationRules[field];
    if (validator) {
      const error = validator(value);
      setErrors((prev) => ({
        ...prev,
        [field]: error,
      }));
      return error === undefined;
    }
    return true;
  };

  const validateForm = (): boolean => {
    let isValid = true;
    const newErrors: FormErrors<T> = {};
    
    // Mark all fields as touched
    const allTouched: Partial<Record<keyof T, boolean>> = {};
    
    Object.keys(formData).forEach((key) => {
      const field = key as keyof T;
      allTouched[field] = true;
      
      if (validationRules[field]) {
        const error = validationRules[field]!(formData[field]);
        if (error) {
          newErrors[field] = error;
          isValid = false;
        }
      }
    });
    
    setErrors(newErrors);
    setTouched(allTouched);
    
    if (!isValid) {
      toast({
        title: "Validation Error",
        description: "Please check the form for errors.",
        variant: "destructive",
      });
    }
    
    return isValid;
  };

  const resetForm = () => {
    setFormData(initialState);
    setErrors({});
    setTouched({});
  };

  return {
    formData,
    errors,
    touched,
    setFormData,
    handleChange,
    handleBlur,
    validateForm,
    resetForm,
  };
}
