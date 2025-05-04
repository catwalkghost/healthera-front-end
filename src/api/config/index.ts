// In a real app, this would be set via environment variables (import.meta.env.VITE_USE_MOCKS)
// For simplicity in this example, we'll use a constant that can be toggled
export const USE_MOCKS = true;

// Logger configuration
export const API_LOGGING_ENABLED = true;

// Logger utility function
export const logApiSource = (serviceName: string, isMock: boolean): void => {
  if (API_LOGGING_ENABLED) {
    const source = isMock ? '📦 Using mock data' : '🔌 Using real API';
    console.log(`${source} for ${serviceName}`);
  }
}; 