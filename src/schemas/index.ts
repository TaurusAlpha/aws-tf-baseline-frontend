import { z } from 'zod';

// Export all schemas
export * from './terraform.schema.ts';
export * from './aws.schema.ts';
export * from './common.schema.ts';

// Utility function for form validation
export function validateForm<T>(schema: z.ZodSchema<T>, data: unknown) {
  const result = schema.safeParse(data);
  
  if (result.success) {
    return {
      success: true,
      data: result.data,
      errors: undefined
    };
  }
  
  return {
    success: false,
    data: undefined,
    errors: result.error.errors.map(err => `${err.path.join('.')}: ${err.message}`)
  };
}

// Utility to get field-specific errors
export function getFieldErrors<T>(schema: z.ZodSchema<T>, data: unknown) {
  const result = schema.safeParse(data);
  
  if (result.success) {
    return {};
  }
  
  const fieldErrors: Record<string, string> = {};
  result.error.errors.forEach(err => {
    const fieldPath = err.path.join('.');
    fieldErrors[fieldPath] = err.message;
  });
  
  return fieldErrors;
}
