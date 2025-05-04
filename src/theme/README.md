# Healthera UI Theme

A premium, professional theme designed for healthcare and pharmaceutical applications. This theme uses Material UI v5 with a custom color palette designed for a pharmacy/prescription application.

## Features

- Professional color palette with deep navy primary and aqua accent colors
- Clean, modern typography using the Inter font family
- Custom component styling for a high-end, cohesive look
- Support for future extensions (dark mode, etc.)

## Usage

### Basic Usage

The theme is already applied at the root level of the application in `App.tsx`. This means all Material UI components will automatically use the custom styling.

```tsx
import { ThemeProvider, CssBaseline } from '@mui/material';
import { theme } from './theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {/* Your app content */}
    </ThemeProvider>
  );
}
```

### Using Theme Colors

You can access theme colors and values in your components:

```tsx
import { useTheme } from '@mui/material/styles';

function MyComponent() {
  const theme = useTheme();
  
  return (
    <div style={{ color: theme.palette.primary.main }}>
      This text uses the primary color
    </div>
  );
}
```

### Custom Colors

The theme includes custom palette entries:

- `theme.palette.navy.main` - A deep navy blue
- `theme.palette.aqua.main` - A bright aqua accent

```tsx
<Box sx={{ bgcolor: 'navy.main', color: 'white' }}>
  Navy background
</Box>
```

## Typography

The theme uses Inter as the primary font family. All headings are set to semi-bold (600) for a clean, professional look.

```tsx
<Typography variant="h1">Heading 1</Typography>
<Typography variant="h2">Heading 2</Typography>
<Typography variant="body1">Regular text</Typography>
```

## Component Overrides

Common components have been customized:

- Buttons have rounded corners and consistent padding
- Cards have subtle elevation and hover effects
- Text fields are outlined and full width by default

## Extending the Theme

To extend the theme for dark mode or other variations:

```tsx
import { createTheme } from '@mui/material/styles';
import { theme as baseTheme } from './theme';

const darkTheme = createTheme({
  ...baseTheme,
  palette: {
    ...baseTheme.palette,
    mode: 'dark',
    background: {
      default: '#121212',
      paper: '#1E1E1E',
    },
  },
});
``` 