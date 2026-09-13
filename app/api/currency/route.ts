import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
    if (!response.ok) {
      throw new Error('Failed to fetch rates');
    }
    const data = await response.json();
    return NextResponse.json(data.rates);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch rates' }, { status: 500 });
  }
}
