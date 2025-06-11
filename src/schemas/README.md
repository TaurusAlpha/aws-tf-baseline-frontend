# Validation Schemas

Frontend validation schemas using Zod for type-safe runtime validation:

## When Validation is Needed
- ✅ User form inputs (AWS resource names, regions, configurations)
- ✅ API request/response data
- ✅ Terraform variable inputs
- ✅ Terragrunt configuration files
- ❌ Static configuration files
- ❌ Internal component props (use TypeScript types instead)

## Recommended Approach
Use **Zod** for runtime validation with TypeScript inference:
- Better TypeScript integration than Yup
- Automatic type inference
- Composable schemas
- Built-in error handling

## Schema Structure
- `terraform.schema.ts` - Terragrunt base configuration validation
- `aws.schema.ts` - AWS-specific validations (regions, resource names, etc.)
- `common.schema.ts` - Shared validation patterns
- `index.ts` - Main exports and utility functions
- `base/*.json` - Legacy JSON schemas
- `layer/*.ts` - Terraform layer specific

## Available Schemas
### Terraform/Terragrunt
- `globalConfigSchema` - Organization-wide configuration
- `accountConfigSchema` - AWS account-specific settings
- `regionConfigSchema` - Region-specific environment config
- `terragruntBaseSchema` - Base Terragrunt configuration
- `terragruntProjectSchema` - Complete project configuration

### AWS-Specific
- `awsRegionSchema` - Valid AWS regions
- `awsAccountIdSchema` - 12-digit AWS account ID
- `awsProfileNameSchema` - AWS CLI profile names
- `awsRoleArnSchema` - IAM role ARN validation
- `environmentTypeSchema` - Environment type validation

### Common Patterns
- `organizationNameSchema` - Organization name validation
- `versionConstraintSchema` - Terraform/Terragrunt version constraints
- `booleanSchema` - Boolean with string coercion

## Implementation Guide
```typescript
// Example: Terragrunt global configuration validation
import { globalConfigSchema } from './terraform.schema';

const result = globalConfigSchema.safeParse(formData);
if (result.success) {
  // Valid data with full type safety
  console.log(result.data.org_name); // TypeScript knows this is a string
} else {
  // Validation errors
  console.log(result.error.errors);
}
```

## Usage with Forms
```typescript
import { validateForm, getFieldErrors } from './index';
import { terragruntProjectSchema } from './terraform.schema';

// Simple validation
const { success, data, errors } = validateForm(terragruntProjectSchema, formData);

// Field-specific errors for form UX
const fieldErrors = getFieldErrors(terragruntProjectSchema, formData);
console.log(fieldErrors['global.org_name']); // Error message for org_name field
```

## Type Inference
```typescript
import type { GlobalConfig, TerragruntProject } from './terraform.schema.ts';

// Types are automatically inferred from schemas
const config: GlobalConfig = {
  org_name: 'my-org',
  management_account_id: '123456789012',
  default_region: 'eu-west-1'
};
```
