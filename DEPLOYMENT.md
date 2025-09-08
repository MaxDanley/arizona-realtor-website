# Vercel Deployment Guide

## Quick Deployment Steps

### 1. Push to GitHub
```bash
git add .
git commit -m "Ready for Vercel deployment"
git push origin main
```

### 2. Connect to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository
4. Vercel will auto-detect Next.js

### 3. Environment Variables
Set these in Vercel Dashboard → Settings → Environment Variables:

```
DATABASE_URL=postgresql://username:password@host:port/database?schema=public
NEXTAUTH_URL=https://your-domain.vercel.app
NEXTAUTH_SECRET=your-secret-key-here
NEXT_PUBLIC_APP_URL=https://your-domain.vercel.app
```

### 4. Database Setup
Choose one of these providers:

#### Option A: Vercel Postgres (Recommended)
1. In Vercel Dashboard → Storage → Create Database
2. Copy the connection string to `DATABASE_URL`
3. Run migrations: `npx prisma migrate deploy`

#### Option B: Neon (Free Tier Available)
1. Go to [neon.tech](https://neon.tech)
2. Create new project
3. Copy connection string to `DATABASE_URL`
4. Run migrations: `npx prisma migrate deploy`

#### Option C: Supabase
1. Go to [supabase.com](https://supabase.com)
2. Create new project
3. Go to Settings → Database → Connection string
4. Copy to `DATABASE_URL`
5. Run migrations: `npx prisma migrate deploy`

### 5. Deploy
- Click "Deploy" in Vercel
- The build will automatically run `prisma generate`
- Your site will be live at `https://your-project.vercel.app`

## Troubleshooting

### Prisma Client Error
If you see "Prisma Client not generated", ensure:
- `prisma` is in `dependencies` (not `devDependencies`)
- Build script includes `prisma generate`
- `vercel.json` is configured correctly

### Database Connection Error
- Verify `DATABASE_URL` is correct
- Ensure database is accessible from Vercel
- Check if migrations have been run

### Build Failures
- Check Vercel build logs
- Ensure all environment variables are set
- Verify `package.json` scripts are correct

## Production Checklist

- [ ] Environment variables configured
- [ ] Database connected and migrated
- [ ] Domain configured (optional)
- [ ] SSL certificate active (automatic with Vercel)
- [ ] Analytics configured (optional)
- [ ] Error monitoring set up (optional)

## Support

For deployment issues:
- Check Vercel documentation
- Review build logs in Vercel dashboard
- Ensure all dependencies are properly configured
