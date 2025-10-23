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

// Request password reset
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email } = forgotPasswordSchema.parse(body)

    const user = await prisma.user.findUnique({
      where: { email }
    })

    if (!user) {
      // Don't reveal if user exists or not for security
      return NextResponse.json({
        message: 'If an account with that email exists, a password reset code has been sent.'
      })
    }

    // Generate reset code
    const resetCode = CodeGenerator.generatePasswordResetCode()
    const expiresAt = CodeGenerator.getExpirationTime(15) // 15 minutes

    // Create password reset code
    await prisma.passwordResetCode.create({
      data: {
        userId: user.id,
        code: resetCode,
        expiresAt: expiresAt
      }
    })

    // Send reset email
    try {
      await EmailService.sendPasswordResetCode(
        user.email,
        resetCode,
        user.firstName
      )
    } catch (emailError) {
      console.error('Failed to send password reset email:', emailError)
      return NextResponse.json(
        { error: 'Failed to send password reset email' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      message: 'If an account with that email exists, a password reset code has been sent.'
    })

  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid input', details: error.issues },
        { status: 400 }
      )
    }

    console.error('Forgot password error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
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
