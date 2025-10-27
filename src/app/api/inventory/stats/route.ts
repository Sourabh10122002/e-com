import { NextResponse } from 'next/server';
import { getInventoryStats } from '@/lib/data';

export async function GET() {
  try {
    const stats = getInventoryStats();
    return NextResponse.json(stats);
  } catch (error) {
    console.error('Error fetching inventory stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch inventory statistics' },
      { status: 500 }
    );
  }
}