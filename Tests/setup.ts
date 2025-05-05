import '@testing-library/jest-dom';
import { afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import * as React from 'react';

// Define React for global scope to fix UMD global reference
globalThis.React = React;

// Clean up after each test
afterEach(() => {
  cleanup();
}); 