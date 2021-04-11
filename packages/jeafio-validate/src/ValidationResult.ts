import { ValidationError } from './ValidationError';

export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
}
