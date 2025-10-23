# Vercel Environment Variables Setup Guide

## 🚨 Current Issue
You're getting NextAuth configuration errors because the required environment variables are not properly set up in Vercel.

## ✅ Required Environment Variables

You need to add these **3 environment variables** to your Vercel project:

### 1. DATABASE_URL
- **Value:** Your Neon database connection string
- **Example:** `postgresql://username:password@ep-xxx.us-east-1.aws.neon.tech/neondb?sslmode=require`
- **How to get:** From your Neon dashboard → Connection Details → Connection String

### 2. NEXTAUTH_URL
- **Value:** Your Vercel app URL
- **Example:** `https://arizona-realtor-website.vercel.app`
- **Important:** Must match your actual Vercel domain

### 3. NEXTAUTH_SECRET
- **Value:** A secure random string (32+ characters)
- **Generated for you:** `bdCQZ7les6kvBy43nD+RPH6coclFvAjAiboeXYqUfYo=`
- **How to generate:** Run `openssl rand -base64 32` in terminal

## 🔧 How to Add Environment Variables in Vercel

### Step 1: Go to Vercel Dashboard
1. Visit [vercel.com](https://vercel.com)
2. Sign in to your account
3. Find your `arizona-realtor-website` project

### Step 2: Navigate to Settings
1. Click on your project
2. Go to **Settings** tab
3. Click **Environment Variables** in the left sidebar

### Step 3: Add Each Variable
For each variable, click **Add New** and enter:

**Variable 1:**
- **Name:** `DATABASE_URL`
- **Value:** [Your Neon connection string]
- **Environment:** Select all (Production, Preview, Development)

**Variable 2:**
- **Name:** `NEXTAUTH_URL`
- **Value:** `https://arizona-realtor-website.vercel.app`
- **Environment:** Select all (Production, Preview, Development)

**Variable 3:**
- **Name:** `NEXTAUTH_SECRET`
- **Value:** `bdCQZ7les6kvBy43nD+RPH6coclFvAjAiboeXYqUfYo=`
- **Environment:** Select all (Production, Preview, Development)

### Step 4: Redeploy
1. After adding all variables, go to **Deployments** tab
2. Click the **3 dots** on your latest deployment
3. Click **Redeploy**
4. Or push a new commit to trigger automatic deployment

## 🔍 How to Get Your Neon Connection String

### If you already have a Neon database:
1. Go to [neon.tech](https://neon.tech)
2. Sign in to your account
3. Select your project
4. Go to **Dashboard**
5. Click **Connection Details**
6. Copy the **Connection String**
7. It should look like: `postgresql://username:password@ep-xxx.us-east-1.aws.neon.tech/neondb?sslmode=require`

### If you need to create a new Neon database:
1. Go to [neon.tech](https://neon.tech)
2. Sign up for a free account
3. Create a new project
4. Choose a name (e.g., "arizona-realtor-db")
5. Select a region close to you
6. Click **Create Project**
7. Copy the connection string from the dashboard

## 🚀 After Setting Up Environment Variables

1. **Redeploy your app** (important!)
2. **Test registration** - should work without 500 errors
3. **Test sign-in** - should work properly
4. **Check console** - no more NextAuth errors

## 🔧 Troubleshooting

### If you still get errors:
1. **Double-check variable names** - they must be exact (case-sensitive)
2. **Make sure you selected all environments** (Production, Preview, Development)
3. **Redeploy after adding variables** - changes don't take effect until redeploy
4. **Check your Neon connection string** - make sure it's valid and accessible

### Common Issues:
- **Wrong NEXTAUTH_URL:** Must match your actual Vercel domain
- **Missing NEXTAUTH_SECRET:** Required for NextAuth to work
- **Invalid DATABASE_URL:** Check your Neon connection string
- **Not redeployed:** Environment variables only take effect after redeploy

## 📞 Need Help?

If you're still having issues:
1. Check the Vercel deployment logs
2. Verify all 3 environment variables are set
3. Make sure you redeployed after adding them
4. Test with a simple registration to see if the 500 error is gone

## ✅ Success Checklist

- [ ] Added `DATABASE_URL` with Neon connection string
- [ ] Added `NEXTAUTH_URL` with your Vercel domain
- [ ] Added `NEXTAUTH_SECRET` with the provided value
- [ ] Selected all environments for each variable
- [ ] Redeployed your application
- [ ] Tested registration (no 500 error)
- [ ] Tested sign-in (works properly)




