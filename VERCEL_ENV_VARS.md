# Vercel Environment Variables Setup

## Required Environment Variables for Production

You need to set up these environment variables in your Vercel dashboard:

### 1. Database Configuration
```
DATABASE_URL
```
**Value:** Your PostgreSQL connection string from your database provider (e.g., Neon, Supabase, Railway, etc.)
**Example:** `postgresql://username:password@host:port/database_name?schema=public`

### 2. NextAuth.js Configuration
```
NEXTAUTH_URL
```
**Value:** Your production domain
**Example:** `https://your-app-name.vercel.app`

```
NEXTAUTH_SECRET
```
**Value:** A random secret string (minimum 32 characters)
**How to generate:** Run `openssl rand -base64 32` in your terminal
**Example:** `a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6`

## How to Set Up in Vercel

1. Go to your Vercel dashboard
2. Select your project
3. Go to Settings → Environment Variables
4. Add each variable:
   - **Name:** `DATABASE_URL`
   - **Value:** Your database connection string
   - **Environment:** Production, Preview, Development (select all)

   - **Name:** `NEXTAUTH_URL`
   - **Value:** `https://your-app-name.vercel.app`
   - **Environment:** Production, Preview, Development (select all)

   - **Name:** `NEXTAUTH_SECRET`
   - **Value:** Your generated secret key
   - **Environment:** Production, Preview, Development (select all)

## Local Development Setup

Create a `.env.local` file in your project root with:

```env
# Database
DATABASE_URL="postgresql://maxdanley@localhost:5432/arizona_realtor_db?schema=public"

# NextAuth.js
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-local-secret-key-here"
```

## Database Providers

### Option 1: Neon (Recommended - Free tier available)
1. Go to https://neon.tech
2. Create a free account
3. Create a new project
4. Copy the connection string
5. Use it as your `DATABASE_URL`

### Option 2: Supabase
1. Go to https://supabase.com
2. Create a new project
3. Go to Settings → Database
4. Copy the connection string
5. Use it as your `DATABASE_URL`

### Option 3: Railway
1. Go to https://railway.app
2. Create a new project
3. Add PostgreSQL database
4. Copy the connection string
5. Use it as your `DATABASE_URL`

## Security Notes

- Never commit your `.env` files to git
- Use different secrets for development and production
- The `NEXTAUTH_SECRET` should be at least 32 characters long
- Keep your database credentials secure

## Troubleshooting

If you're still getting the NO_SECRET error:
1. Make sure you've added `NEXTAUTH_SECRET` to Vercel
2. Redeploy your application after adding environment variables
3. Check that the variable names match exactly (case-sensitive)
4. Ensure you've selected the correct environments (Production, Preview, Development)


