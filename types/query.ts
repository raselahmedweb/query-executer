export interface QueryResponse {
  success: boolean;
  data?: any[];
  rowCount?: number;
  command?: string;
  error?: string;
}