import { z } from 'zod';

// AWS regions
export const awsRegions = [
  'us-east-1', 'us-east-2', 'us-west-1', 'us-west-2',
  'eu-west-1', 'eu-west-2', 'eu-west-3', 'eu-central-1', 'eu-north-1',
  'ap-northeast-1', 'ap-northeast-2', 'ap-southeast-1', 'ap-southeast-2',
  'ap-south-1', 'ca-central-1', 'sa-east-1'
] as const;

export const awsRegionSchema = z.enum(awsRegions, {
  errorMap: () => ({ message: 'Must be a valid AWS region' })
});

// AWS Account ID validation
export const awsAccountIdSchema = z.string().regex(/^\d{12}$/, 'Must be a 12-digit AWS account ID');

// AWS Profile name validation
export const awsProfileNameSchema = z.string()
  .min(1, 'Profile name cannot be empty')
  .regex(/^[a-zA-Z0-9_-]+$/, 'Profile name can only contain letters, numbers, hyphens, and underscores');

// AWS IAM Role ARN validation
export const awsRoleArnSchema = z.string()
  .regex(/^arn:aws:iam::\d{12}:role\/.+$/, 'Must be a valid IAM role ARN');

// AWS resource name validation (general purpose)
export const awsResourceNameSchema = z.string()
  .min(1, 'Resource name cannot be empty')
  .max(255, 'Resource name cannot exceed 255 characters')
  .regex(/^[a-zA-Z0-9._-]+$/, 'Resource name can only contain letters, numbers, dots, hyphens, and underscores');

// Environment types
export const environmentTypeSchema = z.enum(['nonprod', 'prod'], {
  errorMap: () => ({ message: 'Environment type must be either "nonprod" or "prod"' })
});

// Common environment names
export const environmentNameSchema = z.string()
  .min(1, 'Environment name is required')
  .regex(/^[a-z0-9-]+$/, 'Environment name must be lowercase with hyphens only');
