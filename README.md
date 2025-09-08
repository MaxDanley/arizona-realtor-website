# Arizona Real Estate Academy

A comprehensive online learning platform for Arizona Real Estate licensing and continuing education courses. Built with Next.js, TypeScript, and modern web technologies.

## Features

- **Modern Authentication**: Secure login/registration with NextAuth.js
- **Course Management**: Complete course system with progress tracking
- **Quiz & Exam System**: Interactive quizzes and final exams
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **SEO Optimized**: Built-in SEO optimization for better search rankings
- **Database Integration**: PostgreSQL with Prisma ORM
- **Real-time Progress**: Track learning progress and time spent
- **Certificate Generation**: Automatic certificate generation upon completion

## Tech Stack

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, NextAuth.js
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js with credentials provider
- **UI Components**: Lucide React icons, Headless UI
- **Form Handling**: React Hook Form with Zod validation

## Getting Started

### Prerequisites

- Node.js 18+ 
- PostgreSQL database
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd arizona-realtor-website
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

4. Configure your `.env` file with:
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

5. Set up the database:
```bash
npx prisma migrate dev
npx prisma generate
```

6. Run the development server:
```bash
npm run dev
```

7. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   │   └── auth/          # Authentication endpoints
│   ├── auth/              # Authentication pages
│   ├── dashboard/         # User dashboard
│   ├── courses/           # Course pages
│   └── globals.css        # Global styles
├── components/            # Reusable components
├── lib/                   # Utility functions
├── types/                 # TypeScript type definitions
└── prisma/               # Database schema and migrations
```

## Database Schema

The application uses a comprehensive database schema designed for real estate education:

- **Users**: User accounts and profiles
- **Courses**: Course information and metadata
- **Chapters**: Course content and structure
- **Quizzes**: Mid-chapter assessments
- **Questions**: Quiz questions and answers
- **Enrollments**: User course enrollments
- **Progress**: Learning progress tracking
- **Attempts**: Quiz and exam attempt records

## Course Types

1. **Salesperson License**: 90-hour pre-licensing course
2. **Continuing Education**: License maintenance courses
3. **Broker License**: Advanced broker licensing course

## Features in Development

- [ ] Course content management system
- [ ] Interactive quiz system
- [ ] Progress tracking and analytics
- [ ] Certificate generation
- [ ] Payment integration
- [ ] Email notifications
- [ ] Admin dashboard

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy automatically on push

### Other Platforms

The application can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support and questions:
- Email: support@arizonarealtor.com
- Phone: (555) 123-4567

## Arizona Department of Real Estate Compliance

This platform is designed to meet all requirements set forth by the Arizona Department of Real Estate for real estate education providers. All courses are structured according to ADRE guidelines and requirements.

---

Built with ❤️ for Arizona Real Estate Professionals