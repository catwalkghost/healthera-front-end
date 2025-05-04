/**
 * Formats dates from YYYY-MM-DD to DD MM YYYY
 * 
 * This utility handles the conversion of ISO date strings to a more user-friendly
 * display format. It's used throughout the application for consistent date presentation.
 * 
 * @param dateString - Date string in YYYY-MM-DD format
 * @returns Formatted date string in DD MM YYYY format
 */
export const formatDate = (dateString: string): string => {
  try {
    // Handle empty or invalid dates
    if (!dateString) return '';
    
    // Parse the date
    const parts = dateString.split('-');
    if (parts.length !== 3) {
      // Not in expected format, return original
      return dateString;
    }
    
    const [year, month, day] = parts;
    
    // Return in DD MM YYYY format
    return `${day} ${month} ${year}`;
  } catch (error) {
    console.error('Error formatting date:', error);
    return dateString;
  }
};

/**
 * Creates a Date object for comparison operations
 * 
 * Rather than parsing dates in multiple places with different logic,
 * this utility centralizes date parsing for comparison operations.
 * This ensures consistent date handling throughout the application.
 * 
 * @param dateString - Date string in YYYY-MM-DD format
 * @returns Date object for comparison
 */
export const getDateForComparison = (dateString: string): Date => {
  try {
    return new Date(dateString);
  } catch (error) {
    console.error('Error parsing date for comparison:', error);
    return new Date(); // Return current date as fallback
  }
}; 