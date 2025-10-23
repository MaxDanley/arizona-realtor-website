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
    DATABASE_URL_PREFIX: process.env.DATABASE_URL?.substring(0, 20) + '...',
    DATABASE_URL_LENGTH: process.env.DATABASE_URL?.length || 0,
    DATABASE_URL_VALID: process.env.DATABASE_URL?.startsWith('postgresql://') || process.env.DATABASE_URL?.startsWith('postgres://') || false
  }

  // Check if all critical variables are set
  const allSet = envVars.NEXTAUTH_URL === 'SET' && 
                 envVars.NEXTAUTH_SECRET === 'SET' && 
                 envVars.DATABASE_URL === 'SET' &&
                 envVars.DATABASE_URL_VALID

  return NextResponse.json({
    success: allSet,
    message: allSet ? 'All environment variables are properly configured' : 'Some environment variables are missing or invalid',
    environment: envVars,
    timestamp: new Date().toISOString(),
    url: request.url
  })
}