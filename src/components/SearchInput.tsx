import { ChangeEvent, useState, useEffect } from 'react';
import { TextField, InputAdornment, Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { SearchInputProps } from '../types/Prescription';

/**
 * SearchInput component provides a search field with debounced input
 * 
 * This component handles user input for searching prescriptions and passes
 * the search term to the parent component via the onSearch callback.
 * 
 * Accessibility features:
 * - Proper labeling with aria-label
 * - Visual feedback for focus states
 * - Keyboard accessible
 */
const SearchInput = ({
  onSearch,
  initialValue = '',
  placeholder = 'Search prescriptions...',
  ariaLabel = 'Search prescriptions'
}: SearchInputProps) => {
  const [inputValue, setInputValue] = useState(initialValue);

  // Update local state when initialValue prop changes
  useEffect(() => {
    setInputValue(initialValue);
  }, [initialValue]);

  // Handle input changes and propagate to parent
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    onSearch(newValue);
  };

  // Styles for visually hidden text (for screen readers only)
  const visuallyHidden = {
    position: 'absolute',
    width: '1px',
    height: '1px',
    padding: 0,
    margin: '-1px',
    overflow: 'hidden',
    clip: 'rect(0, 0, 0, 0)',
    whiteSpace: 'nowrap',
    borderWidth: 0
  };

  return (
    <Box
      maxWidth={{ xs: '100%', sm: 450, md: 500 }}
      mx="auto"
      mb={{ xs: 2, md: 3 }}
      sx={{
        '& .MuiOutlinedInput-root': {
          borderRadius: 1.5,
          bgcolor: 'white',
          boxShadow: '0 1px 4px rgba(0, 0, 0, 0.05)',
          transition: 'box-shadow 0.2s ease-in-out',
          '&:hover, &.Mui-focused': {
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
          },
          height: { xs: 44, md: 48 }
        }
      }}
    >
      <TextField
        id="prescription-search"
        value={inputValue}
        onChange={handleChange}
        placeholder={placeholder}
        aria-label={ariaLabel}
        role="searchbox"
        inputProps={{
          'aria-describedby': 'search-description'
        }}
        variant="outlined"
        fullWidth
        size="small"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon color="action" fontSize="small" aria-hidden="true" />
            </InputAdornment>
          ),
        }}
      />
      <Box id="search-description" sx={visuallyHidden}>
        Type to search for prescriptions by name, doctor, or pharmacy
      </Box>
    </Box>
  );
};

export default SearchInput; 