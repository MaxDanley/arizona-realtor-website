import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const { email, password, firstName, lastName } = await request.json()
    
    console.log('Creating test user:', email)
    
    if (!email || !password || !firstName || !lastName) {
      return NextResponse.json({ 
        success: false, 
        error: 'All fields are required' 
      }, { status: 400 })
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      return NextResponse.json({ 
        success: false, 
        error: 'User already exists' 
      }, { status: 400 })
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12)
    
    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        firstName,
        lastName,
        phone: '555-0123',
        address: '123 Test St, Phoenix, AZ 85001',
        licenseNumber: 'TEST123456'
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        createdAt: true
      }
    })

    console.log('Test user created successfully:', user.email)

    return NextResponse.json({
      success: true,
      message: 'Test user created successfully',
      user
    })

  } catch (error) {
    console.error('Create test user error:', error)
    
    return NextResponse.json({
      success: false,
      error: 'Failed to create test user',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
