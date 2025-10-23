import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'
import bcrypt from 'bcryptjs'
import { prisma } from './prisma'

export const authOptions = {
  providers: [
    ...(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET ? [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      })
    ] : []),
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        try {
          console.log('NextAuth authorize called with:', credentials?.email)
          
          if (!credentials?.email || !credentials?.password) {
            console.log('Missing credentials')
            return null
          }

          console.log('Looking up user:', credentials.email)
          const user = await prisma.user.findUnique({
            where: {
              email: credentials.email
            }
          })

          if (!user) {
            console.log('User not found:', credentials.email)
            return null
          }

          // Check if email is verified
          if (!user.emailVerified) {
            console.log('Email not verified for user:', credentials.email)
            return null
          }

          // Check if user has a password (not OAuth user)
          if (!user.password) {
            console.log('User has no password (OAuth user):', credentials.email)
            return null
          }

          console.log('User found, checking password...')
          const isPasswordValid = await bcrypt.compare(
            credentials.password,
            user.password
          )

          if (!isPasswordValid) {
            console.log('Invalid password for user:', credentials.email)
            return null
          }

          console.log('User authenticated successfully:', user.email)
          return {
            id: user.id,
            email: user.email,
            name: `${user.firstName} ${user.lastName}`,
          }
        } catch (error) {
          console.error('Authorization error:', error)
          return null
        }
      }
    })
  ],
  session: {
    strategy: 'jwt' as const
  },
  callbacks: {
    async signIn({ user, account }: any) {
      if (account?.provider === 'google') {
        try {
          // Check if user exists
          const existingUser = await prisma.user.findUnique({
            where: { email: user.email! }
          })

          if (!existingUser) {
            // Create new user for Google OAuth
            const [firstName, ...lastNameParts] = user.name?.split(' ') || ['', '']
            const lastName = lastNameParts.join(' ') || ''

            await prisma.user.create({
              data: {
                email: user.email!,
                firstName: firstName,
                lastName: lastName,
                emailVerified: true, // Google emails are pre-verified
                emailVerifiedAt: new Date(),
                password: null // No password for OAuth users
              }
            })
          }
          return true
        } catch (error) {
          console.error('Google sign-in error:', error)
          return false
        }
      }
      return true
    },
    async jwt({ token, user }: any) {
      if (user) {
        token.id = user.id
      }
      return token
    },
    async session({ session, token }: any) {
      if (token && session.user) {
        session.user.id = token.id as string
      }
      return session
    }
  },
  pages: {
    signIn: '/auth/signin'
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: true
}
