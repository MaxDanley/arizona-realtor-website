const { execSync } = require('child_process');
const path = require('path');

console.log('🚀 Deploying migrations to Neon database...');

try {
  // Set the DATABASE_URL environment variable for this script
  const databaseUrl = process.env.DATABASE_URL;
  
  if (!databaseUrl) {
    console.error('❌ DATABASE_URL environment variable is not set');
    process.exit(1);
  }

  console.log('📊 Database URL found:', databaseUrl.substring(0, 50) + '...');

  // Run prisma migrate deploy
  console.log('🔄 Running prisma migrate deploy...');
  execSync('npx prisma migrate deploy', {
    stdio: 'inherit',
    env: {
      ...process.env,
      DATABASE_URL: databaseUrl
    }
  });

  console.log('✅ Migrations deployed successfully!');

  // Generate Prisma client
  console.log('🔧 Generating Prisma client...');
  execSync('npx prisma generate', {
    stdio: 'inherit',
    env: {
      ...process.env,
      DATABASE_URL: databaseUrl
    }
  });

  console.log('✅ Prisma client generated successfully!');

} catch (error) {
  console.error('❌ Error deploying migrations:', error.message);
  process.exit(1);
}


