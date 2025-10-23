import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'
import { CodeGenerator } from '@/lib/code-generator'
import { EmailService } from '@/lib/email'

const verifyEmailSchema = z.object({
  email: z.string().email(),
  code: z.string().length(6, 'Verification code must be 6 digits')
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, code } = verifyEmailSchema.parse(body)

    // Find user
    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        verificationCodes: {
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

    if (user.emailVerified) {
      return NextResponse.json(
        { error: 'Email already verified' },
        { status: 400 }
      )
    }

    // Check if verification code exists and is valid
    const verificationCode = user.verificationCodes.find(vc => vc.code === code)

    if (!verificationCode) {
      return NextResponse.json(
        { error: 'Invalid or expired verification code' },
        { status: 400 }
      )
    }

    // Mark code as used and verify email
    await prisma.$transaction([
      prisma.verificationCode.update({
        where: { id: verificationCode.id },
        data: { used: true }
      }),
      prisma.user.update({
        where: { id: user.id },
        data: {
          emailVerified: true,
          emailVerifiedAt: new Date()
        }
      })
    ])

    return NextResponse.json({
      message: 'Email verified successfully',
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        emailVerified: true
      }
    })

  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid input', details: error.issues },
        { status: 400 }
      )
    }

    console.error('Email verification error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// Resend verification code
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { email } = z.object({ email: z.string().email() }).parse(body)

    const user = await prisma.user.findUnique({
      where: { email }
    })

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    if (user.emailVerified) {
      return NextResponse.json(
        { error: 'Email already verified' },
        { status: 400 }
      )
    }

    // Generate new verification code
    const verificationCode = CodeGenerator.generateVerificationCode()
    const expiresAt = CodeGenerator.getExpirationTime(15)

    // Create new verification code
    await prisma.verificationCode.create({
      data: {
        userId: user.id,
        code: verificationCode,
        expiresAt: expiresAt
      }
    })

    // Send verification email
    try {
      await EmailService.sendVerificationCode(
        user.email,
        verificationCode,
        user.firstName
      )
    } catch (emailError) {
      console.error('Failed to send verification email:', emailError)
      return NextResponse.json(
        { error: 'Failed to send verification email' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      message: 'Verification code sent successfully'
    })

  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid input', details: error.issues },
        { status: 400 }
      )
    }

    console.error('Resend verification error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
