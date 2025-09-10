# NextAuth Debugging Guide

## 🚨 Current Issue
You're still getting NextAuth 500 errors. Let's debug this systematically.

## 🔍 Step 1: Check Environment Variables

### Local Debug (if running locally):
Visit: `http://localhost:3000/api/debug`

### Production Debug:
Visit: `https://arizona-realtor-website.vercel.app/api/debug?key=debug123`

This will show you which environment variables are set or missing.

## 🔍 Step 2: Check Vercel Environment Variables

### Go to Vercel Dashboard:
1. Visit [vercel.com](https://vercel.com)
2. Go to your project: `arizona-realtor-website`
3. Go to **Settings** → **Environment Variables**

### Verify These Variables Are Set:
- [ ] `DATABASE_URL` - Should show "SET" in debug
- [ ] `NEXTAUTH_URL` - Should show "SET" in debug  
- [ ] `NEXTAUTH_SECRET` - Should show "SET" in debug

### If Any Are Missing:
1. Click **Add New**
2. Enter the exact name and value
3. Select **all environments** (Production, Preview, Development)
4. Click **Save**

## 🔍 Step 3: Check Vercel Logs

### View Deployment Logs:
1. Go to **Deployments** tab in Vercel
2. Click on your latest deployment
3. Click **View Function Logs**
4. Look for any error messages

### Common Error Messages:
- `NEXTAUTH_SECRET is not defined`
- `Database connection failed`
- `Invalid DATABASE_URL`

## 🔍 Step 4: Test Database Connection

### Check if your Neon database is accessible:
1. Go to [neon.tech](https://neon.tech)
2. Sign in to your account
3. Go to your project dashboard
4. Check if the database is active and running

### Test Connection String:
Your `DATABASE_URL` should look like:
```
postgresql://username:password@ep-xxx.us-east-1.aws.neon.tech/neondb?sslmode=require
```

## 🔍 Step 5: Redeploy After Changes

### Important: You MUST redeploy after adding environment variables
1. Go to **Deployments** tab
2. Click the **3 dots** on your latest deployment
3. Click **Redeploy**
4. Wait for deployment to complete

## 🔍 Step 6: Test Step by Step

### Test 1: Environment Variables
Visit: `https://arizona-realtor-website.vercel.app/api/debug?key=debug123`
- All should show "SET"
- If any show "MISSING", add them to Vercel

### Test 2: Database Connection
Try to register a new user
- If it works, database is connected
- If 500 error, check database connection

### Test 3: NextAuth Session
Try to sign in
- If it works, NextAuth is configured
- If 500 error, check NextAuth configuration

## 🚨 Common Issues & Solutions

### Issue 1: Environment Variables Not Set
**Symptoms:** Debug shows "MISSING" for variables
**Solution:** Add variables to Vercel and redeploy

### Issue 2: Wrong NEXTAUTH_URL
**Symptoms:** NextAuth errors persist
**Solution:** Make sure NEXTAUTH_URL matches your exact Vercel domain

### Issue 3: Database Connection Failed
**Symptoms:** Registration fails with 500 error
**Solution:** Check your Neon connection string

### Issue 4: Not Redeployed
**Symptoms:** Changes don't take effect
**Solution:** Redeploy after adding environment variables

## 🔧 Quick Fix Checklist

- [ ] Added `DATABASE_URL` to Vercel
- [ ] Added `NEXTAUTH_URL` to Vercel (exact domain)
- [ ] Added `NEXTAUTH_SECRET` to Vercel
- [ ] Selected all environments for each variable
- [ ] Redeployed the application
- [ ] Checked debug endpoint shows all "SET"
- [ ] Tested registration works
- [ ] Tested sign-in works

## 📞 Still Having Issues?

### Check These:
1. **Vercel Logs:** Look for specific error messages
2. **Neon Database:** Make sure it's active and accessible
3. **Environment Variables:** Double-check names and values
4. **Redeployment:** Make sure you redeployed after changes

### Get Help:
1. Share the debug endpoint results
2. Share any error messages from Vercel logs
3. Confirm which environment variables are missing

## 🎯 Expected Results

After fixing everything:
- Debug endpoint shows all "SET"
- No 500 errors in console
- Registration works
- Sign-in works
- NextAuth session management works



