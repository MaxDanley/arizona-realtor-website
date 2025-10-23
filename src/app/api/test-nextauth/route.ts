import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()
    
    console.log('Testing NextAuth with credentials:', email)
    
    // Test the authorize function directly
    const credentialsProvider = authOptions.providers[0]
    if (credentialsProvider && 'authorize' in credentialsProvider) {
      const result = await credentialsProvider.authorize({
        email,
        password
      })
      
      if (result) {
        console.log('NextAuth authorize successful:', result)
        return NextResponse.json({
          success: true,
          message: 'NextAuth authorization successful',
          user: result
        })
      } else {
        console.log('NextAuth authorize failed')
        return NextResponse.json({
          success: false,
          message: 'NextAuth authorization failed',
          error: 'Invalid credentials'
        }, { status: 401 })
      }
    }
    
    return NextResponse.json({
      success: false,
      message: 'Credentials provider not found'
    }, { status: 500 })
    
  } catch (error) {
    console.error('NextAuth test error:', error)
    
    return NextResponse.json({
      success: false,
      message: 'NextAuth test failed',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
