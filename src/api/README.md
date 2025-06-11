# API Layer

This folder contains all backend interaction logic:

- `client.ts` - Axios instance with base configuration
- `endpoints.ts` - API endpoint definitions
- `services/` - Organized API calls by feature (auth, terraform, etc.)

## Usage Example

```typescript
import { terraformService } from './services/terraform'

const config = await terraformService.generateConfig(formData)
```
