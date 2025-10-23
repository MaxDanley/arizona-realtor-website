import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { EmailService } from '@/lib/email'
import { CodeGenerator } from '@/lib/code-generator'

export async function POST(request: NextRequest) {
  try {
    console.log('=== DEBUG FORGOT PASSWORD ===')
    
    // Test 1: Check environment variables
    console.log('1. Checking environment variables...')
    const envCheck = {
      DATABASE_URL: process.env.DATABASE_URL ? 'SET' : 'MISSING',
      RESEND_API_KEY: process.env.RESEND_API_KEY ? 'SET' : 'MISSING',
      NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET ? 'SET' : 'MISSING'
    }
    console.log('Environment variables:', envCheck)

    // Test 2: Check database connection
    console.log('2. Testing database connection...')
    await prisma.$connect()
    console.log('Database connected successfully')

    // Test 3: Check if we can find a user
    console.log('3. Testing user lookup...')
    const testEmail = 'test@example.com'
    const user = await prisma.user.findUnique({
      where: { email: testEmail }
    })
    console.log('User lookup result:', user ? 'User found' : 'User not found')

    // Test 4: Test code generation
    console.log('4. Testing code generation...')
    const testCode = CodeGenerator.generatePasswordResetCode()
    const testExpiry = CodeGenerator.getExpirationTime(5)
    console.log('Generated code:', testCode)
    console.log('Expiry time:', testExpiry)

    // Test 5: Test email service
    console.log('5. Testing email service...')
    const emailResult = await EmailService.sendPasswordResetCode(
      'test@example.com',
      testCode,
      'Test'
    )
    console.log('Email service result:', emailResult)

    // Test 6: Test password reset code creation (if user exists)
    if (user) {
      console.log('6. Testing password reset code creation...')
      try {
        const resetCode = await prisma.passwordResetCode.create({
          data: {
            userId: user.id,
            code: testCode,
            expiresAt: testExpiry
          }
        })
        console.log('Password reset code created successfully:', resetCode.id)
        
        // Clean up test code
        await prisma.passwordResetCode.delete({
          where: { id: resetCode.id }
        })
        console.log('Test code cleaned up')
      } catch (dbError) {
        console.error('Database error creating reset code:', dbError)
        throw dbError
      }
    }

    await prisma.$disconnect()

    return NextResponse.json({
      success: true,
      message: 'All tests passed',
      results: {
        environment: envCheck,
        database: 'Connected successfully',
        userLookup: user ? 'User found' : 'User not found',
        codeGeneration: 'Working',
        emailService: emailResult.success ? 'Working' : 'Failed',
        passwordResetCode: user ? 'Working' : 'Skipped (no user)'
      },
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    console.error('=== DEBUG FORGOT PASSWORD ERROR ===')
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
      message: 'Debug test failed',
      error: error instanceof Error ? error.message : 'Unknown error',
      errorType: error instanceof Error ? error.constructor.name : 'Unknown',
      stack: error instanceof Error ? error.stack : undefined,
      timestamp: new Date().toISOString()
    }, { status: 500 })
  }
}
