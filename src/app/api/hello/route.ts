import { headers } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET() {
  const headersList = await headers();

  return NextResponse.json({
    message: 'Hello from Next.js on Quant Cloud!',
    host: headersList.get('host'),
    timestamp: new Date().toISOString(),
  });
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));

  return NextResponse.json({
    message: 'POST received',
    body,
    timestamp: new Date().toISOString(),
  });
}
