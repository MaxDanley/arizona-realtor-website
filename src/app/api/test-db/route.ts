import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    console.log('Testing database connection...')
    
    // Test database connection
    await prisma.$connect()
    console.log('Database connected successfully')
    
    // Try a simple query
    const userCount = await prisma.user.count()
    console.log('User count query successful:', userCount)
    
    // Test if we can create a test user (without actually creating one)
    const testUser = await prisma.user.findFirst()
    console.log('Test user query successful')
    
    return NextResponse.json({
      success: true,
      message: 'Database connection successful',
      userCount: userCount,
      hasUsers: !!testUser,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('Database connection error:', error)
    
    return NextResponse.json({
      success: false,
      message: 'Database connection failed',
      error: error instanceof Error ? error.message : 'Unknown error',
      errorType: error instanceof Error ? error.constructor.name : 'Unknown',
      timestamp: new Date().toISOString()
    }, { status: 500 })
  } finally {
    try {
      await prisma.$disconnect()
    } catch (disconnectError) {
      console.error('Error disconnecting from database:', disconnectError)
    }
  }
}
