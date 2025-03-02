interface ValidationResult {
  isValid: boolean;
  error?: string;
}

/**
 * Validates required fields in a request
 * @param fields - Object containing field names and their values
 * @returns ValidationResult indicating if all required fields are present
 */
export const validateRequiredFields = (fields: Record<string, any>): ValidationResult => {
  const missingFields = Object.entries(fields)
    .filter(([_, value]) => !value?.toString().trim())
    .map(([key]) => key);

  if (missingFields.length > 0) {
    return {
      isValid: false,
      error: `Missing required fields: ${missingFields.join(', ')}`,
    };
  }

  return { isValid: true };
};