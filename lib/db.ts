import { Pool } from 'pg';

let pool: Pool | null = null;

export function initializePool(connectionString: string) {
  if (!pool) {
    pool = new Pool({ connectionString });
  }
}

export async function testConnection(connectionString: string) {
  const testPool = new Pool({ connectionString });
  try {
    await testPool.query('SELECT 1');
    await testPool.end();
    return { success: true, message: 'Connection successful' };
  } catch (error) {
    await testPool.end();
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

export async function query(text: string, params: any[] = []) {
  if (!pool) {
    return { success: false, error: 'Database connection not initialized' };
  }
  try {
    const trimmedText = text.trim();
    if (trimmedText.startsWith('--') || trimmedText.startsWith('/*')) {
      return { success: false, error: 'Commented query not executed' };
    }
    const result = await pool.query(text, params);
    return { success: true, data: result.rows, rowCount: result.rowCount, command: result.command };
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

export function closePool() {
  if (pool) {
    pool.end();
    pool = null;
  }
}