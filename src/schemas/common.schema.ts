import { z } from 'zod';

// Common string validations
export const nonEmptyStringSchema = z.string().min(1, 'This field cannot be empty');

export const organizationNameSchema = z.string()
  .min(2, 'Organization name must be at least 2 characters')
  .max(50, 'Organization name cannot exceed 50 characters')
  .regex(/^[a-zA-Z0-9._-]+$/, 'Organization name can only contain letters, numbers, dots, hyphens, and underscores');

// Version constraint validation (for Terraform/Terragrunt)
export const versionConstraintSchema = z.string()
  .min(1, 'Version constraint is required')
  .regex(/^[~>=<\d\s.,]+$/, 'Invalid version constraint format');

// Boolean with string coercion (for form inputs)
export const booleanSchema = z.union([
  z.boolean(),
  z.string().transform((val) => val === 'true' || val === '1')
]);

// Optional string that can be empty
export const optionalStringSchema = z.string().optional().or(z.literal(''));

// Validation result helper type
export type ValidationResult<T> = {
  success: boolean;
  data?: T;
  errors?: string[];
};
