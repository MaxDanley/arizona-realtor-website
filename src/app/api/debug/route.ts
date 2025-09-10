import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  // Only allow in development or with a secret key
  const debugKey = request.nextUrl.searchParams.get('key')
  
  if (process.env.NODE_ENV === 'production' && debugKey !== 'debug123') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const envCheck = {
    NODE_ENV: process.env.NODE_ENV,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL ? 'SET' : 'MISSING',
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET ? 'SET' : 'MISSING',
    DATABASE_URL: process.env.DATABASE_URL ? 'SET' : 'MISSING',
    // Don't expose actual values for security
    DATABASE_URL_PREFIX: process.env.DATABASE_URL?.substring(0, 20) + '...' || 'MISSING',
  }

  return NextResponse.json({
    message: 'Environment variables check',
    environment: envCheck,
    timestamp: new Date().toISOString(),
    url: request.url
  })
}



