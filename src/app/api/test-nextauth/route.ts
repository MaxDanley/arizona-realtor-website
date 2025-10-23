import { NextRequest, NextResponse } from 'next/server'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()
    
    console.log('Testing NextAuth authentication logic:', email)
    
    if (!email || !password) {
      return NextResponse.json({
        success: false,
        message: 'Email and password are required'
      }, { status: 400 })
    }

    // Find user
    const user = await prisma.user.findUnique({
      where: { email }
    })

    if (!user) {
      console.log('User not found:', email)
      return NextResponse.json({
        success: false,
        message: 'User not found'
      }, { status: 401 })
    }

    // Check if email is verified
    if (!user.emailVerified) {
      console.log('Email not verified for user:', email)
      return NextResponse.json({
        success: false,
        message: 'Email not verified'
      }, { status: 401 })
    }

    // Check if user has a password (not OAuth user)
    if (!user.password) {
      console.log('User has no password (OAuth user):', email)
      return NextResponse.json({
        success: false,
        message: 'User has no password (OAuth user)'
      }, { status: 401 })
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
      console.log('Invalid password for user:', email)
      return NextResponse.json({
        success: false,
        message: 'Invalid password'
      }, { status: 401 })
    }

    console.log('NextAuth authentication logic successful:', email)
    return NextResponse.json({
      success: true,
      message: 'NextAuth authentication logic successful',
      user: {
        id: user.id,
        email: user.email,
        name: `${user.firstName} ${user.lastName}`,
      }
    })
    
  } catch (error) {
    console.error('NextAuth test error:', error)
    
    return NextResponse.json({
      success: false,
      message: 'NextAuth test failed',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
