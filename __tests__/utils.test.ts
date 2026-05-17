import { formatDate, validateDuration } from '../src/utils/dateUtils';

describe('Utility Functions', () => {
  // Test 4: Format date correctly
  it('should format YYYY-MM-DD correctly', () => {
    const formatted = formatDate('2026-05-11');
    expect(formatted).toContain('2026');
    expect(formatted).toContain('May');
  });

  // Test 5: Handle invalid date
  it('should return original string if date is invalid', () => {
    const formatted = formatDate('not-a-date');
    expect(formatted).toBe('not-a-date');
  });

  // Test 6: Duration validation
  it('should invalidate 0 days', () => {
    const result = validateDuration('0');
    expect(result.isValid).toBe(false);
  });
});
