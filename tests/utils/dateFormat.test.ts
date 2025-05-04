import { describe, it, expect } from 'vitest';
import { formatDate, getDateForComparison } from "../../src/utils/dateFormat";

describe("Date Format Utilities", () => {
  describe("formatDate", () => {
    it("should format dates correctly", () => {
      expect(formatDate("2023-01-15")).toBe("15 01 2023");
    });

    it("should handle empty strings", () => {
      expect(formatDate("")).toBe("");
    });

    it("should return the original string if format is invalid", () => {
      expect(formatDate("invalid-date")).toBe("invalid-date");
    });
  });

  describe("getDateForComparison", () => {
    it("should return a valid Date object", () => {
      const result = getDateForComparison("2023-05-10");
      expect(result).toBeInstanceOf(Date);
      expect(result.getFullYear()).toBe(2023);
      expect(result.getMonth()).toBe(4); // May is 4 (0-indexed)
      expect(result.getDate()).toBe(10);
    });

    it("should return current date for invalid input", () => {
      const result = getDateForComparison("invalid");
      
      // Just verify it returns a valid Date object
      expect(result).toBeInstanceOf(Date);
    });
  });
}); 