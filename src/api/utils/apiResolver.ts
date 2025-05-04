import { USE_MOCKS, logApiSource } from '../config';

/**
 * Generic API resolver factory
 * 
 * Creates an API implementation factory for any API module.
 * This allows for consistent resolution of mock vs. real implementations.
 * 
 * @param serviceName - Name of the API service (for logging)
 * @param mockImpl - Mock API implementation
 * @param realImpl - Real API implementation
 * @returns The appropriate API implementation based on configuration
 */
export function createApiResolver<T>(
  serviceName: string,
  mockImpl: T,
  realImpl: T
): T {
  const isMock = USE_MOCKS;
  
  // Log which implementation is being used
  logApiSource(serviceName, isMock);
  
  // Return the appropriate implementation
  return isMock ? mockImpl : realImpl;
} 