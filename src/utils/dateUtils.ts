export const formatDate = (dateString: string): string => {
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      throw new Error('Invalid date');
    }
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  } catch (error) {
    return dateString;
  }
};

export const validateDuration = (durationString: string): { isValid: boolean; value: number } => {
  const duration = parseInt(durationString, 10);
  if (isNaN(duration) || duration < 1 || duration > 14) {
    return { isValid: false, value: 0 };
  }
  return { isValid: true, value: duration };
};
