# Setup Instructions

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/arizona_realtor_db?schema=public"

# NextAuth.js
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"

# Email (for production)
EMAIL_SERVER_HOST="smtp.gmail.com"
EMAIL_SERVER_PORT=587
EMAIL_SERVER_USER="your-email@gmail.com"
EMAIL_SERVER_PASSWORD="your-app-password"
EMAIL_FROM="noreply@arizonarealtor.com"

# App Configuration
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

## GitHub Repository Setup

1. Go to GitHub.com and create a new repository named `arizona-realtor-website`
2. Make it public
3. Don't initialize with README, .gitignore, or license (we already have these)

Then run these commands:

```bash
git remote add origin https://github.com/YOUR_USERNAME/arizona-realtor-website.git
git branch -M main
git push -u origin main
```

## Database Setup

1. Install PostgreSQL
2. Create a database named `arizona_realtor_db`
3. Update the DATABASE_URL in your .env file
4. Run: `npx prisma migrate dev`
5. Run: `npx prisma generate`

## Development

```bash
npm run dev
```

Visit http://localhost:3000
