import { formatDate, getDateForComparison } from '../utils/dateFormat';

describe('Date Format Utilities', () => {
  describe('formatDate', () => {
    test('should format date from YYYY-MM-DD to DD MM YYYY', () => {
      expect(formatDate('2023-05-10')).toBe('10 05 2023');
      expect(formatDate('2025-12-01')).toBe('01 12 2025');
    });

    test('should handle empty string', () => {
      expect(formatDate('')).toBe('');
    });

    test('should return original string if format is invalid', () => {
      expect(formatDate('invalid-date')).toBe('invalid-date');
    });
  });

  describe('getDateForComparison', () => {
    test('should return a Date object for valid dates', () => {
      const result = getDateForComparison('2023-05-10');
      expect(result).toBeInstanceOf(Date);
      expect(result.getFullYear()).toBe(2023);
      expect(result.getMonth()).toBe(4); // May (0-indexed)
      expect(result.getDate()).toBe(10);
    });

    test('should return a Date object for invalid dates', () => {
      const result = getDateForComparison('invalid-date');
      expect(result).toBeInstanceOf(Date);
    });
  });
}); 