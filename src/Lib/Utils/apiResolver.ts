/**
 * Generic API resolver factory
 * 
 * Creates an API implementation factory for any API module.
 * This allows for consistent resolution of mock vs real implementations.
 * 
 * @param mockImpl - Mock API implementation
 * @param realImpl - Real API implementation
 * @returns The appropriate API implementation based on configuration
 */
export const createApiResolver = <T>(
  mockImpl: T,
  realImpl: T
): T => {
  // In a real app, this would be set via environment variables
  // For simplicity in this example, we'll use a constant
  const isMock = true;
  
// Return the appropriate implementation
  return isMock ? mockImpl : realImpl;
} 