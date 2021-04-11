export interface ValidationError {
  type: string;
  message: string;
  data?: unknown;
  field: string;
}
