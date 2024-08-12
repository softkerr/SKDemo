#!/usr/bin/env node

/**
 * Setup Verification Script
 * Checks if everything is configured correctly for the multi-currency shop
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 Verifying Multi-Currency Shop Setup...\n');

let hasErrors = false;

// Check 1: Environment Variables
console.log('1️⃣  Checking environment variables...');
const envPath = path.join(__dirname, '..', '.env.local');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf-8');
  
  const hasProjectId = envContent.includes('NEXT_PUBLIC_SANITY_PROJECT_ID');
  const hasDataset = envContent.includes('NEXT_PUBLIC_SANITY_DATASET');
  const hasApiToken = envContent.includes('SANITY_API_TOKEN');
  
  if (hasProjectId && hasDataset) {
    console.log('   ✅ Sanity project configuration found');
  } else {
    console.log('   ❌ Missing NEXT_PUBLIC_SANITY_PROJECT_ID or NEXT_PUBLIC_SANITY_DATASET');
    hasErrors = true;
  }
  
  if (hasApiToken) {
    console.log('   ✅ Sanity API token configured');
  } else {
    console.log('   ⚠️  SANITY_API_TOKEN not found (needed for seeding)');
    console.log('      Get token from: https://sanity.io/manage');
  }
} else {
  console.log('   ❌ .env.local file not found');
  hasErrors = true;
}

// Check 2: Sanity Schema
console.log('\n2️⃣  Checking Sanity schema...');
const productSchemaPath = path.join(__dirname, '..', 'sanity', 'schemas', 'product.ts');
const schemasIndexPath = path.join(__dirname, '..', 'schemas', 'index.ts');

if (fs.existsSync(productSchemaPath)) {
  console.log('   ✅ Product schema exists');
} else {
  console.log('   ❌ Product schema not found');
  hasErrors = true;
}

if (fs.existsSync(schemasIndexPath)) {
  const schemasContent = fs.readFileSync(schemasIndexPath, 'utf-8');
  if (schemasContent.includes('product')) {
    console.log('   ✅ Product schema registered in index');
  } else {
    console.log('   ❌ Product schema not registered in schemas/index.ts');
    hasErrors = true;
  }
} else {
  console.log('   ❌ schemas/index.ts not found');
  hasErrors = true;
}

// Check 3: Required Components
console.log('\n3️⃣  Checking required components...');
const files = [
  { path: 'src/context/CurrencyContext.tsx', name: 'Currency Context' },
  { path: 'src/components/CurrencySelector.tsx', name: 'Currency Selector' },
  { path: 'src/lib/sanity/queries.ts', name: 'Sanity Queries' },
  { path: 'src/types/sanity.ts', name: 'Sanity Types' },
  { path: 'scripts/seed-products.ts', name: 'Seed Script' },
];

files.forEach(({ path: filePath, name }) => {
  const fullPath = path.join(__dirname, '..', filePath);
  if (fs.existsSync(fullPath)) {
    console.log(`   ✅ ${name}`);
  } else {
    console.log(`   ❌ ${name} not found at ${filePath}`);
    hasErrors = true;
  }
});

// Check 4: Currency Type Updates
console.log('\n4️⃣  Checking type definitions...');
const typesPath = path.join(__dirname, '..', 'src', 'types', 'index.ts');
if (fs.existsSync(typesPath)) {
  const typesContent = fs.readFileSync(typesPath, 'utf-8');
  if (typesContent.includes('USD') && typesContent.includes('EUR')) {
    console.log('   ✅ Currency type includes USD and EUR');
  } else {
    console.log('   ❌ Currency type missing USD or EUR');
    hasErrors = true;
  }
}

// Check 5: Sanity Queries
console.log('\n5️⃣  Checking Sanity queries...');
const queriesPath = path.join(__dirname, '..', 'src', 'lib', 'sanity', 'queries.ts');
if (fs.existsSync(queriesPath)) {
  const queriesContent = fs.readFileSync(queriesPath, 'utf-8');
  if (queriesContent.includes('getProducts')) {
    console.log('   ✅ Product queries implemented');
  } else {
    console.log('   ❌ getProducts query not found');
    hasErrors = true;
  }
}

// Summary
console.log('\n' + '='.repeat(50));
if (hasErrors) {
  console.log('❌ Setup verification failed');
  console.log('\nPlease fix the issues above before proceeding.');
  console.log('\nRefer to:');
  console.log('  - MIGRATION_GUIDE.md for setup instructions');
  console.log('  - QUICK_START.md for usage guide');
  console.log('  - scripts/README.md for seeding instructions');
  process.exit(1);
} else {
  console.log('✅ All checks passed!');
  console.log('\n📝 Next steps:');
  console.log('  1. Run: npm run seed:products (if not done yet)');
  console.log('  2. Run: npm run dev');
  console.log('  3. Visit: http://localhost:3000/shop');
  console.log('  4. Visit: http://localhost:3000/studio (to manage products)');
  console.log('\n📚 Documentation:');
  console.log('  - QUICK_START.md - Usage guide');
  console.log('  - MIGRATION_GUIDE.md - Technical details');
  console.log('  - scripts/README.md - Seeding guide');
  process.exit(0);
}
