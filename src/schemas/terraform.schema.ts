import { z } from 'zod';

// Converted from base/global.schema.json
export const globalConfigSchema = z.object({
  org_name: z.string().min(1, 'Organization name is required'),
  management_account_id: z.string().regex(/^\d{12}$/, 'Must be a 12-digit AWS account ID'),
  management_profile_name: z.string().optional(),
  default_region: z.string().default('eu-west-1'),
});

// Converted from base/account.schema.json
export const accountConfigSchema = z.object({
  account_name: z.string().min(1, 'Account name is required'),
  account_id: z.string().regex(/^\d{12}$/, 'Must be a 12-digit AWS account ID'),
  profile_name: z.string().min(1, 'Profile name is required'),
  assume_role_arn: z.string().regex(/^arn:aws:iam::\d{12}:role\/.+$/, 'Must be a valid IAM role ARN').optional(),
  external_id: z.string().optional(),
});

// Converted from base/region.schema.json
export const regionConfigSchema = z.object({
  env: z.string().min(1, 'Environment name is required'),
  env_type: z.enum(['nonprod', 'prod'], {
    errorMap: () => ({ message: 'Environment type must be either "nonprod" or "prod"' })
  }),
  aws_region: z.string().min(1, 'AWS region is required'),
});

// Converted from base/terragrunt_base.schema.json
export const terragruntBaseSchema = z.object({
  tg_local: z.boolean(),
  terraform_version_constraint: z.string().min(1, 'Terraform version constraint is required'),
  terragrunt_version_constraint: z.string().min(1, 'Terragrunt version constraint is required'),
});

// Composite schema for full Terragrunt project configuration
export const terragruntProjectSchema = z.object({
  global: globalConfigSchema,
  account: accountConfigSchema,
  region: regionConfigSchema,
  base: terragruntBaseSchema,
});

// Type inference
export type GlobalConfig = z.infer<typeof globalConfigSchema>;
export type AccountConfig = z.infer<typeof accountConfigSchema>;
export type RegionConfig = z.infer<typeof regionConfigSchema>;
export type TerragruntBase = z.infer<typeof terragruntBaseSchema>;
export type TerragruntProject = z.infer<typeof terragruntProjectSchema>;
