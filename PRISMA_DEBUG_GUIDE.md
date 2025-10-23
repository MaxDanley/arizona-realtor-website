# Prisma Logging & Debugging Guide

## 🔍 **How to Check Prisma Logs**

### **Method 1: Enable Prisma Query Logging**

Add this to your `src/lib/prisma.ts` file:

```typescript
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

// Log all Prisma events
prisma.$on('query', (e) => {
  console.log('Query: ' + e.query)
  console.log('Params: ' + e.params)
  console.log('Duration: ' + e.duration + 'ms')
})

prisma.$on('error', (e) => {
  console.error('Prisma Error:', e)
})

prisma.$on('info', (e) => {
  console.log('Prisma Info:', e)
})

prisma.$on('warn', (e) => {
  console.warn('Prisma Warning:', e)
})
```

### **Method 2: Check Vercel Function Logs**

1. **Go to Vercel Dashboard**
2. **Select your project**
3. **Go to Functions tab**
4. **Click on the function that failed**
5. **View the logs** - Prisma errors will appear here

### **Method 3: Use Prisma Studio**

```bash
npx prisma studio
```

This opens a web interface to browse your database and see what's happening.

### **Method 4: Direct Database Connection Test**

Create a test endpoint to check database connectivity:

```typescript
// src/app/api/test-prisma/route.ts
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    // Test basic connection
    await prisma.$connect()
    
    // Test a simple query
    const userCount = await prisma.user.count()
    
    // Test password reset codes table
    const resetCodeCount = await prisma.passwordResetCode.count()
    
    return Response.json({
      success: true,
      userCount,
      resetCodeCount,
      message: 'Database connection successful'
    })
  } catch (error) {
    return Response.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    }, { status: 500 })
  }
}
```

### **Method 5: Check Environment Variables**

Make sure these are set in Vercel:

```bash
DATABASE_URL=postgresql://username:password@host:port/database
NEXTAUTH_SECRET=your_secret_key
NEXTAUTH_URL=https://your-domain.vercel.app
```

### **Method 6: Check Database Schema**

Run this to see if your database schema is up to date:

```bash
npx prisma db pull
npx prisma generate
```

## 🚨 **Common Prisma Error Patterns**

### **Connection Errors**
```
Error: Can't reach database server
```
**Solution**: Check `DATABASE_URL` environment variable

### **Schema Errors**
```
Error: The table `public.password_reset_codes` does not exist
```
**Solution**: Run database migrations

### **Permission Errors**
```
Error: permission denied for table users
```
**Solution**: Check database user permissions

### **Timeout Errors**
```
Error: Query engine exited with code: 1
```
**Solution**: Check database connection limits

## 🔧 **Quick Debugging Steps**

1. **Check if database is accessible**:
   ```bash
   npx prisma db pull
   ```

2. **Check if migrations are applied**:
   ```bash
   npx prisma migrate status
   ```

3. **Reset database** (if needed):
   ```bash
   npx prisma migrate reset
   ```

4. **Generate Prisma client**:
   ```bash
   npx prisma generate
   ```

## 📊 **Monitoring Prisma Performance**

Add this to your API routes to monitor query performance:

```typescript
const startTime = Date.now()
const result = await prisma.user.findUnique({ where: { email } })
const duration = Date.now() - startTime
console.log(`Query took ${duration}ms`)
```

## 🎯 **For Your Current Issue**

Since you're getting a 500 error on forgot-password, check:

1. **Database connection**: Visit `/api/test-db`
2. **Prisma logs**: Check Vercel function logs
3. **Schema**: Make sure `password_reset_codes` table exists
4. **Environment**: Verify `DATABASE_URL` is correct

The enhanced logging I added will show exactly where the Prisma error occurs!
