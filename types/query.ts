export interface QueryResponse {
  success: boolean;
  data?: Record<string, string | number | null>[];
  rowCount?: number;
  command?: string;
  error?: string;
}