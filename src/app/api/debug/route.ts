import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const key = searchParams.get('key')

  if (key !== 'debug123') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const envVars = {
    NODE_ENV: process.env.NODE_ENV,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL ? 'SET' : 'MISSING',
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET ? 'SET' : 'MISSING',
    DATABASE_URL: process.env.DATABASE_URL ? 'SET' : 'MISSING',
    DATABASE_URL_PREFIX: process.env.DATABASE_URL?.substring(0, 20) + '...'
  }

  return NextResponse.json({
    message: 'Environment variables check',
    environment: envVars,
    timestamp: new Date().toISOString(),
    url: request.url
  })
}