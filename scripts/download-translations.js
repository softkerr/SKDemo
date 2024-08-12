#!/usr/bin/env node

/**
 * Download translations from Locize
 * Reads credentials from .env.local file
 */

const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

// Load .env.local file
const envPath = path.join(__dirname, '..', '.env.local');
if (fs.existsSync(envPath)) {
  require('dotenv').config({ path: envPath });
}

const projectId = process.env.NEXT_PUBLIC_LOCIZE_PROJECT_ID;
const apiKey = process.env.LOCIZE_API_KEY;
const version = process.env.NEXT_PUBLIC_LOCIZE_VERSION || 'latest';
const outputPath = './public/locales';

if (!projectId) {
  console.error('❌ Error: NEXT_PUBLIC_LOCIZE_PROJECT_ID is not set in .env.local');
  process.exit(1);
}

if (!apiKey) {
  console.error('❌ Error: LOCIZE_API_KEY is not set in .env.local');
  process.exit(1);
}

console.log('📥 Downloading translations from Locize...');
console.log(`   Project: ${projectId}`);
console.log(`   Version: ${version}`);
console.log(`   Output: ${outputPath}`);

try {
  const command = `npx locize download --project-id=${projectId} --api-key=${apiKey} --ver=${version} --clean=true --path=${outputPath}`;
  
  execSync(command, { 
    stdio: 'inherit',
    env: { ...process.env }
  });
  
  console.log('✅ Translations downloaded successfully!');
} catch (error) {
  console.error('❌ Failed to download translations');
  process.exit(1);
}
