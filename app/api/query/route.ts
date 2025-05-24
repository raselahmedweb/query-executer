import { NextResponse } from 'next/server';
import { query, initializePool } from '../../../lib/db';

export async function POST(request: Request) {
  try {
    const { sql, connectionString } = await request.json();
    if (!sql || typeof sql !== 'string') {
      return NextResponse.json({ success: false, error: 'Invalid query' }, { status: 400 });
    }
    if (!connectionString || typeof connectionString !== 'string') {
      return NextResponse.json({ success: false, error: 'Invalid connection string' }, { status: 400 });
    }

    initializePool(connectionString);
    const result = await query(sql);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Server error' },
      { status: 500 }
    );
  }
}