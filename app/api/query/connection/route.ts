import { NextResponse } from 'next/server';
import { testConnection, initializePool } from '../../../../lib/db';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const connectionString = typeof body === 'string' ? body : body.connectionString;

    if (!connectionString || typeof connectionString !== 'string') {
      return NextResponse.json({ success: false, error: 'Invalid connection string' }, { status: 400 });
    }

    const result = await testConnection(connectionString);
    if (result.success) {
      initializePool(connectionString);
    }
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error in /api/query/connection:', error);
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Server error' },
      { status: 500 }
    );
  }
}