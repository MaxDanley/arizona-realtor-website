import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'
import { CodeGenerator } from '@/lib/code-generator'
import { EmailService } from '@/lib/email'

const resendSchema = z.object({
  email: z.string().email()
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

export async function POST(request: NextRequest) {
  try {
    // Get client IP for rate limiting
    const ip = request.headers.get('x-forwarded-for') || 
               request.headers.get('x-real-ip') || 
               '127.0.0.1'

    // Check rate limit
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again in 5 minutes.' },
        { status: 429 }
      )
    }

    const body = await request.json()
    const { email } = resendSchema.parse(body)

    const user = await prisma.user.findUnique({
      where: { email }
    })

    if (!user) {
      // Don't reveal if user exists or not for security
      return NextResponse.json({
        message: 'If an account with that email exists, a new password reset code has been sent.'
      })
    }

    // Generate new reset code
    const resetCode = CodeGenerator.generatePasswordResetCode()
    const expiresAt = CodeGenerator.getExpirationTime(5) // 5 minutes

    // Mark all existing codes as used
    await prisma.passwordResetCode.updateMany({
      where: {
        userId: user.id,
        used: false
      },
      data: {
        used: true
      }
    })

    // Create new password reset code
    await prisma.passwordResetCode.create({
      data: {
        userId: user.id,
        code: resetCode,
        expiresAt: expiresAt
      }
    })

    // Send reset email
    const emailResult = await EmailService.sendPasswordResetCode(
      user.email,
      resetCode,
      user.firstName
    )

    // Check if email was actually sent
    if (!emailResult.success) {
      console.error('Failed to send password reset email:', emailResult.error)
      return NextResponse.json(
        { error: 'Failed to send password reset email. Please try again.' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      message: 'If an account with that email exists, a new password reset code has been sent.',
      success: true
    })

  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid input', details: error.issues },
        { status: 400 }
      )
    }

    console.error('Resend reset code error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
