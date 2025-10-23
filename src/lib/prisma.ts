import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient({
  log: [
    {
      emit: 'event',
      level: 'query',
    },
    {
      emit: 'event',
      level: 'error',
    },
    {
      emit: 'event',
      level: 'info',
    },
    {
      emit: 'event',
      level: 'warn',
    },
  ],
})

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

// Log all Prisma events in development
if (process.env.NODE_ENV === 'development') {
  prisma.$on('query', (e: any) => {
    console.log('🔍 Prisma Query:', e.query)
    console.log('📝 Params:', e.params)
    console.log('⏱️ Duration:', e.duration + 'ms')
  })

  prisma.$on('error', (e: any) => {
    console.error('❌ Prisma Error:', e)
  })

  prisma.$on('info', (e: any) => {
    console.log('ℹ️ Prisma Info:', e)
  })

  prisma.$on('warn', (e: any) => {
    console.warn('⚠️ Prisma Warning:', e)
  })
}
