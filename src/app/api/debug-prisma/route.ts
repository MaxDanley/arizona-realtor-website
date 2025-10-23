import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    console.log('=== PRISMA DEBUG TEST ===')
    
    // Test 1: Basic connection
    console.log('1. Testing Prisma connection...')
    await prisma.$connect()
    console.log('✅ Prisma connected successfully')

    // Test 2: Check if tables exist
    console.log('2. Checking table existence...')
    
    let userTableExists = false
    let resetCodeTableExists = false
    
    try {
      const userCount = await prisma.user.count()
      userTableExists = true
      console.log('✅ Users table exists, count:', userCount)
    } catch (error) {
      console.log('❌ Users table error:', error instanceof Error ? error.message : 'Unknown error')
    }

    try {
      const resetCodeCount = await prisma.passwordResetCode.count()
      resetCodeTableExists = true
      console.log('✅ Password reset codes table exists, count:', resetCodeCount)
    } catch (error) {
      console.log('❌ Password reset codes table error:', error instanceof Error ? error.message : 'Unknown error')
    }

    // Test 3: Test a simple user query
    console.log('3. Testing user query...')
    let testUser = null
    try {
      testUser = await prisma.user.findFirst()
      console.log('✅ User query successful:', testUser ? 'User found' : 'No users in database')
    } catch (error) {
      console.log('❌ User query error:', error instanceof Error ? error.message : 'Unknown error')
    }

    // Test 4: Test password reset code creation (if user exists)
    console.log('4. Testing password reset code creation...')
    let resetCodeTest = null
    if (testUser) {
      try {
        resetCodeTest = await prisma.passwordResetCode.create({
          data: {
            userId: testUser.id,
            code: '123456',
            expiresAt: new Date(Date.now() + 5 * 60 * 1000) // 5 minutes from now
          }
        })
        console.log('✅ Password reset code created successfully:', resetCodeTest.id)
        
        // Clean up test record
        await prisma.passwordResetCode.delete({
          where: { id: resetCodeTest.id }
        })
        console.log('✅ Test record cleaned up')
      } catch (error) {
        console.log('❌ Password reset code creation error:', error instanceof Error ? error.message : 'Unknown error')
      }
    } else {
      console.log('⚠️ Skipping reset code test - no users in database')
    }

    // Test 5: Check database URL format
    console.log('5. Checking DATABASE_URL format...')
    const dbUrl = process.env.DATABASE_URL
    const isValidUrl = dbUrl && (dbUrl.startsWith('postgresql://') || dbUrl.startsWith('postgres://'))
    console.log('DATABASE_URL format:', isValidUrl ? '✅ Valid' : '❌ Invalid')
    console.log('DATABASE_URL prefix:', dbUrl?.substring(0, 20) + '...')

    await prisma.$disconnect()
    console.log('✅ Prisma disconnected')

    return NextResponse.json({
      success: true,
      message: 'Prisma debug test completed',
      results: {
        connection: 'Success',
        userTable: userTableExists ? 'Exists' : 'Missing',
        resetCodeTable: resetCodeTableExists ? 'Exists' : 'Missing',
        userQuery: testUser ? 'Success' : 'No users',
        resetCodeCreation: resetCodeTest ? 'Success' : 'Failed/Skipped',
        databaseUrl: isValidUrl ? 'Valid' : 'Invalid'
      },
      details: {
        userCount: userTableExists ? await prisma.user.count() : 'N/A',
        resetCodeCount: resetCodeTableExists ? await prisma.passwordResetCode.count() : 'N/A',
        testUser: testUser ? { id: testUser.id, email: testUser.email } : null,
        databaseUrlPrefix: dbUrl?.substring(0, 30) + '...'
      },
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    console.error('=== PRISMA DEBUG ERROR ===')
    console.error('Error type:', error instanceof Error ? error.constructor.name : 'Unknown')
    console.error('Error message:', error instanceof Error ? error.message : 'Unknown error')
    console.error('Full error:', error)
    
    try {
      await prisma.$disconnect()
    } catch (disconnectError) {
      console.error('Error disconnecting:', disconnectError)
    }

    return NextResponse.json({
      success: false,
      message: 'Prisma debug test failed',
      error: error instanceof Error ? error.message : 'Unknown error',
      errorType: error instanceof Error ? error.constructor.name : 'Unknown',
      stack: error instanceof Error ? error.stack : undefined,
      timestamp: new Date().toISOString()
    }, { status: 500 })
  }
}
