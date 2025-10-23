import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'
import { CodeGenerator } from '@/lib/code-generator'
import { EmailService } from '@/lib/email'

const forgotPasswordSchema = z.object({
  email: z.string().email()
})

const resetPasswordSchema = z.object({
  email: z.string().email(),
  code: z.string().length(6, 'Reset code must be 6 digits'),
  newPassword: z.string().min(6, 'Password must be at least 6 characters')
})

// Rate limiting map (in production, use Redis or database)
const rateLimitMap = new Map<string, { count: number; lastReset: number }>()

// Rate limiting: max 3 requests per 5 minutes per IP
function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const windowMs = 5 * 60 * 1000 // 5 minutes
  const maxRequests = 3

  const userLimit = rateLimitMap.get(ip)
  
  if (!userLimit) {
    rateLimitMap.set(ip, { count: 1, lastReset: now })
    return true
  }

  // Reset counter if window has passed
  if (now - userLimit.lastReset > windowMs) {
    rateLimitMap.set(ip, { count: 1, lastReset: now })
    return true
  }

  // Check if under limit
  if (userLimit.count < maxRequests) {
    userLimit.count++
    return true
  }

  return false
}

// Request password reset
export async function POST(request: NextRequest) {
  try {
    console.log('=== FORGOT PASSWORD REQUEST ===')
    
    // Get client IP for rate limiting
    const ip = request.headers.get('x-forwarded-for') || 
               request.headers.get('x-real-ip') || 
               '127.0.0.1'
    console.log('Client IP:', ip)

    // Check rate limit
    if (!checkRateLimit(ip)) {
      console.log('Rate limit exceeded for IP:', ip)
      return NextResponse.json(
        { error: 'Too many requests. Please try again in 5 minutes.' },
        { status: 429 }
      )
    }

    const body = await request.json()
    console.log('Request body:', { email: body.email })
    const { email } = forgotPasswordSchema.parse(body)
    console.log('Parsed email:', email)

    console.log('Looking up user in database...')
    const user = await prisma.user.findUnique({
      where: { email }
    })
    console.log('User lookup result:', user ? `User found: ${user.email}` : 'User not found')

    if (!user) {
      // Don't reveal if user exists or not for security
      console.log('User not found, returning generic message')
      return NextResponse.json({
        message: 'If an account with that email exists, a password reset code has been sent.'
      })
    }

    // Generate reset code
    console.log('Generating reset code...')
    const resetCode = CodeGenerator.generatePasswordResetCode()
    const expiresAt = CodeGenerator.getExpirationTime(5) // 5 minutes
    console.log('Generated code:', resetCode)
    console.log('Expires at:', expiresAt)

    // Create password reset code
    console.log('Creating password reset code in database...')
    const resetCodeRecord = await prisma.passwordResetCode.create({
      data: {
        userId: user.id,
        code: resetCode,
        expiresAt: expiresAt
      }
    })
    console.log('Password reset code created:', resetCodeRecord.id)

    // Send reset email
    console.log('Sending password reset email...')
    const emailResult = await EmailService.sendPasswordResetCode(
      user.email,
      resetCode,
      user.firstName
    )
    console.log('Email service result:', emailResult)

    // Check if email was actually sent
    if (!emailResult.success) {
      console.error('Failed to send password reset email:', emailResult.error)
      return NextResponse.json(
        { error: 'Failed to send password reset email. Please try again.' },
        { status: 500 }
      )
    }

    console.log('Password reset process completed successfully')
    return NextResponse.json({
      message: 'If an account with that email exists, a password reset code has been sent.',
      success: true
    })

  } catch (error) {
    console.error('=== FORGOT PASSWORD ERROR ===')
    console.error('Error type:', error instanceof Error ? error.constructor.name : 'Unknown')
    console.error('Error message:', error instanceof Error ? error.message : 'Unknown error')
    console.error('Full error:', error)
    
    if (error instanceof z.ZodError) {
      console.error('Zod validation error:', error.issues)
      return NextResponse.json(
        { error: 'Invalid input', details: error.issues },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { 
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

// Reset password with code
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, code, newPassword } = resetPasswordSchema.parse(body)

    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        passwordResetCodes: {
          where: {
            used: false,
            expiresAt: {
              gt: new Date() // Not expired
            }
          },
          orderBy: {
            createdAt: 'desc'
          }
        }
      }
    })

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    // Check if reset code exists and is valid
    const resetCode = user.passwordResetCodes.find(rc => rc.code === code)

    if (!resetCode) {
      return NextResponse.json(
        { error: 'Invalid or expired reset code' },
        { status: 400 }
      )
    }

    // Hash new password
    const bcrypt = await import('bcryptjs')
    const hashedPassword = await bcrypt.hash(newPassword, 12)

    // Update password and mark code as used
    await prisma.$transaction([
      prisma.passwordResetCode.update({
        where: { id: resetCode.id },
        data: { used: true }
      }),
      prisma.user.update({
        where: { id: user.id },
        data: { password: hashedPassword }
      })
    ])

    return NextResponse.json({
      message: 'Password reset successfully'
    })

  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid input', details: error.issues },
        { status: 400 }
      )
    }

    console.error('Reset password error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
