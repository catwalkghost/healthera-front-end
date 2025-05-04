# API Abstraction Layer

This directory contains the API abstraction layer that allows seamless toggling between mock data and real API implementations.

## How It Works

1. **Configuration**: The `api/config/index.ts` file contains a `USE_MOCKS` flag which determines whether to use mock or real API implementations.

2. **API Types**: Each API module has a type definition that both mock and real implementations must conform to.

3. **Implementation Selection**: The `apiResolver.ts` utility selects the appropriate implementation based on the `USE_MOCKS` flag.

4. **Logging**: When an API is used, it logs whether mock or real implementation is being used.

## Usage

To use an API in your components or hooks:

```typescript
import { fetchPrescriptions } from '../api/prescriptions';

// Use the API function - it will automatically use the correct implementation
const prescriptions = await fetchPrescriptions();
```

## Toggling Between Mock and Real Implementations

To switch between mock and real API implementations, change the `USE_MOCKS` flag in `api/config/index.ts`:

```typescript
// Use mock implementations
export const USE_MOCKS = true;

// Use real API implementations
export const USE_MOCKS = false;
```

In a production environment, you would typically set this through an environment variable.

## Adding a New API Module

1. Copy the templates from `api/templates/newModule/`
2. Rename and adapt the files for your new module
3. Implement the mock and real API implementations
4. Use the same pattern to export from index.ts

## Benefits

- **Centralized Toggle**: One flag to rule them all 
- **Type Safety**: Both implementations conform to the same type definition
- **Development Friendly**: Easy to work with mock data during development
- **Transparent**: Logging shows which implementation is being used
- **Consistent Pattern**: All API modules follow the same pattern

This architecture allows you to develop against mock data and easily switch to real API implementation when ready, without changing any of your application code. 