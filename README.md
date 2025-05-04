# Healthera Prescription Management App

A React application for managing prescriptions, allowing users to view a list of current prescriptions and request refills.

## Screenshots

### HD

![Screenshot 2025-05-05 at 00 49 59](https://github.com/user-attachments/assets/59937661-dcd7-42ed-b099-6317ffca31dd)
![Screenshot 2025-05-05 at 00 49 48](https://github.com/user-attachments/assets/290e394d-9db7-4072-99d3-aabed34ff180)
![Screenshot 2025-05-05 at 00 49 37](https://github.com/user-attachments/assets/7cfbcf70-0256-437f-a574-6fcebbecf0c2)
![Screenshot 2025-05-05 at 00 49 29](https://github.com/user-attachments/assets/f918f023-61bc-4a9b-bec3-5f1c285d67ef)

### Tablet

![Screenshot 2025-05-05 at 00 50 12](https://github.com/user-attachments/assets/e0e468c4-fc64-4c6b-9354-6e60af78ba0f)

### Mobile

![Screenshot 2025-05-05 at 00 50 30](https://github.com/user-attachments/assets/6c7553a3-8b7d-46a3-9e53-6c6ec8b11a00)


## Setup Instructions

1. **Clone the repository**
   ```
   git clone [repository-url]
   cd healthera-front-end
   ```

2. **Install dependencies**
   ```
   npm install
   ```

3. **Start the development server**
   ```
   npm run dev
   ```

4. **Run tests**
   ```
   npm test
   ```

## Architecture Decisions

### 1. Component Structure

The application follows a clear separation of concerns:
- **Pages**: Container components that manage data fetching and state
- **Components**: Presentational components focused on rendering UI
- **Hooks**: Custom hooks that encapsulate reusable logic

This structure improves maintainability by keeping components focused on specific responsibilities.

### 2. Component Composition

For larger components, we use component composition to break them down into smaller, focused components:
- The PrescriptionDetails page is broken down into multiple components
- Each component has a single responsibility (BackButton, InfoSection, etc.)
- Components are organized in a folder structure that reflects their purpose

### 3. Mock API Implementation

The application uses a mock API implementation to simulate backend interactions:

- **API Structure**: The API layer uses a factory pattern that can switch between mock and real implementations
- **Simulated Delays**: API calls include intentional delays (200-1000ms) to simulate real-world network latency
- **Mock Data**: Realistic prescription data is provided for testing and development
- **Error Handling**: Simulated error states to test UI resilience

The mock API implementation allows for:
- Testing loading states and UI feedback
- Ensuring async code works properly
- Providing a realistic user experience during development
- Testing the application without a backend dependency

To adjust or remove simulated delays, modify the delay values in:
- `src/api/prescriptions/mockApi.ts`

The application can be configured to use real API endpoints by changing the `USE_MOCKS` flag in `src/utils/apiResolver.ts`.

### 4. State Management

The application uses React hooks for state management:
- **useState**: For component-level state
- **useEffect**: For side effects like data fetching
- **useMemo**: For performance optimization
- **useCallback**: For memoizing event handlers

Custom hooks like `usePrescriptions` and `useRefillRequest` encapsulate domain-specific logic, making the code more reusable and testable.

For this scoped assignment, I opted not to introduce Redux, Zustand, or similar global state libraries. 
Given that the data flow is linear and localized to individual views (i.e., list and detail), `useState` and `useEffect` were sufficient. 
Where needed, I encapsulated logic in custom hooks to ensure separation of concerns and make scaling easier later. 
If this were a larger or collaborative app, I'd revisit the tradeoffs and consider a state management library if shared, persistent state became necessary.

### 5. TypeScript Best Practices

The application uses TypeScript to ensure type safety:
- Strong typing for all components, hooks, and functions
- Interface definitions for API responses and component props
- No use of `any` type to ensure maximum type safety
- Proper naming conventions for types and interfaces

### 6. API Layer

The API layer is designed with an abstraction that allows seamless switching between mock data and real API implementations:
- Mock implementations for development and testing
- Clear interfaces that both mock and real implementations must follow
- Configuration flags to control which implementation to use

### 7. Routing

React Router is used for navigation between pages, with lazy loading for improved performance.

### 8. UI Components

Material UI provides a consistent design language and accessibility features:
- Responsive layout that works on various screen sizes
- Proper semantic HTML for improved accessibility
- ARIA attributes for screen readers

### 9. Accessibility

The application prioritizes accessibility through:
- Proper heading hierarchy
- ARIA live regions for dynamic content
- Adequate color contrast
- Screen reader announcements
- Keyboard navigable interface

## Testing Strategy

The application includes comprehensive tests for different aspects of the codebase:

### 1. Component Testing

- **PrescriptionCard**: Tests for rendering correct information, expired status, and refill status
- **PrescriptionDetails**: 
  - Tests for the main container component (loading states, error handling)
  - Tests for extracted sub-components (BackButton, InfoItem, InfoSection, PrescriptionHeader)
- **SearchInput**: Tests for input handling and search functionality

### 2. Hook Testing

- **usePrescriptions**: Tests for data fetching, filtering, and state management
- **useRefillRequest**: Tests for refill request handling and state management

### 3. Utility Testing

- **dateFormat**: Tests for date formatting and comparison utilities

### 4. Test Structure

Tests are organized to mirror the application structure:
- Component tests in `/tests/components/`
- Hook tests in `/tests/hooks/`
- Utility tests in `/tests/utils/`

## Performance Considerations

- **Code Splitting**: Lazy loading of route components to reduce initial bundle size
- **Memoization**: useMemo and useCallback to prevent unnecessary re-renders
- **Optimized Rendering**: Avoiding unnecessary re-renders with memoized components
- **Responsive Design**: Layouts that adapt to different screen sizes

## Real-World Extension

In a real-world scenario, this application could be extended in the following ways:

### 1. Authentication and Authorization

- Implement user authentication using JWT or OAuth
- Role-based access control for different user types (patients, doctors, pharmacists)
- Session management with refresh tokens

### 2. Advanced API Features

- Real API integration with error handling and retry logic
- Request caching and optimistic updates for better UX
- Pagination for handling large datasets
- Real-time updates using WebSockets for prescription status changes

### 3. Additional Features

- Medication reminders and notifications
- Prescription history and analytics
- Pharmacy location finder
- Doctor communication channels
- Medication information and side effects
- Insurance and payment integration

### 4. Enhanced User Experience

- Offline support with service workers
- Push notifications for refill reminders
- Dark mode and theme customization
- Internationalization and localization

### 5. DevOps and Infrastructure

- CI/CD pipeline for automated testing and deployment
- Error tracking and monitoring
- Analytics for usage patterns
- Performance monitoring and optimization

