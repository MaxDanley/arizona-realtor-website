# Google OAuth Setup Guide

## 🔐 **Google OAuth Configuration**

To enable Google sign-in functionality, you need to set up Google OAuth credentials and configure the environment variables.

### **Step 1: Create Google OAuth Credentials**

1. **Go to Google Cloud Console**
   - Visit [Google Cloud Console](https://console.cloud.google.com/)
   - Sign in with your Google account

2. **Create or Select a Project**
   - Click on the project dropdown at the top
   - Create a new project or select an existing one

3. **Enable Google+ API**
   - Go to "APIs & Services" > "Library"
   - Search for "Google+ API" and enable it

4. **Create OAuth 2.0 Credentials**
   - Go to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "OAuth 2.0 Client IDs"
   - Choose "Web application" as the application type

5. **Configure OAuth Consent Screen**
   - Go to "APIs & Services" > "OAuth consent screen"
   - Choose "External" user type
   - Fill in the required information:
     - App name: "Arizona Real Estate Academy"
     - User support email: your email
     - Developer contact: your email
   - Add scopes: `email`, `profile`, `openid`
   - Add test users (your email) for testing

6. **Configure Authorized Redirect URIs**
   - Add these URIs to your OAuth client:
     - `http://localhost:3000/api/auth/callback/google` (for development)
     - `https://your-domain.vercel.app/api/auth/callback/google` (for production)

### **Step 2: Get Your Credentials**

After creating the OAuth client, you'll get:
- **Client ID**: A long string starting with numbers
- **Client Secret**: A secret string

### **Step 3: Configure Environment Variables**

Add these environment variables to your Vercel dashboard:

```bash
# Google OAuth Configuration
GOOGLE_CLIENT_ID=your_google_client_id_here
GOOGLE_CLIENT_SECRET=your_google_client_secret_here

# Enable Google OAuth in frontend
NEXT_PUBLIC_GOOGLE_OAUTH_ENABLED=true
```

### **Step 4: Redeploy**

After adding the environment variables:
1. Go to your Vercel dashboard
2. Click "Redeploy" on your project
3. Wait for deployment to complete

### **Step 5: Test Google Sign-In**

1. Visit your sign-in page
2. You should see the "Continue with Google" button
3. Click it to test the Google OAuth flow

## 🔧 **Troubleshooting**

### **Google Button Not Showing**
- Check that `NEXT_PUBLIC_GOOGLE_OAUTH_ENABLED=true` is set
- Verify `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` are set
- Redeploy your application

### **OAuth Error: redirect_uri_mismatch**
- Make sure your redirect URI in Google Console matches your domain
- For Vercel: `https://your-app.vercel.app/api/auth/callback/google`
- For local development: `http://localhost:3000/api/auth/callback/google`

### **OAuth Error: invalid_client**
- Check that your `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` are correct
- Make sure there are no extra spaces or characters

### **User Creation Issues**
- Check your database connection
- Verify Prisma migrations are applied
- Check server logs for errors

## 📋 **Environment Variables Checklist**

Make sure these are set in Vercel:

```bash
# Required for Google OAuth
GOOGLE_CLIENT_ID=your_client_id
GOOGLE_CLIENT_SECRET=your_client_secret
NEXT_PUBLIC_GOOGLE_OAUTH_ENABLED=true

# Required for NextAuth
NEXTAUTH_URL=https://your-domain.vercel.app
NEXTAUTH_SECRET=your_secret_key

# Required for database
DATABASE_URL=your_postgresql_connection_string

# Optional for email (if using Resend)
RESEND_API_KEY=your_resend_api_key
```

## 🚀 **Production Checklist**

- [ ] Google OAuth credentials created
- [ ] OAuth consent screen configured
- [ ] Redirect URIs added for production domain
- [ ] Environment variables set in Vercel
- [ ] Application redeployed
- [ ] Google sign-in tested on production
- [ ] User creation flow tested
- [ ] Database permissions verified

## 📞 **Support**

If you encounter issues:
1. Check the browser console for errors
2. Check Vercel function logs
3. Verify all environment variables are set
4. Test with a different Google account
5. Check Google Cloud Console for API quotas

---

**Note**: Google OAuth is now conditionally enabled. The Google sign-in button will only appear if the proper environment variables are configured.
