#!/usr/bin/env tsx

/**
 * Push Local Translations to Locize
 * 
 * This script uploads translations from src/locales/ to Locize.
 * Use this during development when you don't have translators yet.
 * 
 * Usage:
 *   npm run push:local-to-locize
 * 
 * What it does:
 * 1. Reads all translation files from src/locales/{lang}/translation.json
 * 2. Detects namespaces from first-level keys (common, home, services, etc.)
 * 3. Flattens nested JSON within each namespace to dot-notation keys
 * 4. Uploads each namespace separately to Locize via API
 * 
 * Flow:
 *   src/locales/en/translation.json → Parse namespaces → 
 *   Upload each namespace to Locize → Later: npm run download-translations → 
 *   public/locales/en/{namespace}.json
 */

import fs from 'fs';
import path from 'path';
import https from 'https';
import { config } from 'dotenv';

// Load environment variables from .env.local
config({ path: path.join(process.cwd(), '.env.local') });

// Configuration
const LOCIZE_PROJECT_ID = process.env.NEXT_PUBLIC_LOCIZE_PROJECT_ID;
const LOCIZE_API_KEY = process.env.LOCIZE_API_KEY;
const LOCIZE_VERSION = 'latest';
const SOURCE_DIR = path.join(process.cwd(), 'src/locales');

// Languages to sync (only those configured in Locize)
// Note: Add 'fr' to this list once French is added to Locize project
const LANGUAGES = ['en', 'de', 'es', 'fr-FR'];

// Color codes for terminal output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  red: '\x1b[31m',
  cyan: '\x1b[36m',
};

/**
 * Flatten nested JSON object to dot-notation
 * 
 * Example:
 *   { home: { title: "Home" } } → { "home.title": "Home" }
 */
function flattenObject(
  obj: Record<string, any>,
  prefix = '',
  result: Record<string, string> = {}
): Record<string, string> {
  for (const [key, value] of Object.entries(obj)) {
    const newKey = prefix ? `${prefix}.${key}` : key;
    
    if (value && typeof value === 'object' && !Array.isArray(value)) {
      // Recursively flatten nested objects
      flattenObject(value, newKey, result);
    } else {
      // Leaf node - add to result
      result[newKey] = value;
    }
  }
  
  return result;
}

/**
 * Upload translations to Locize via API
 */
async function uploadToLocize(
  language: string,
  namespace: string,
  translations: Record<string, string>
): Promise<void> {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify(translations);
    
    const options = {
      hostname: 'api.locize.app',
      path: `/update/${LOCIZE_PROJECT_ID}/${LOCIZE_VERSION}/${language}/${namespace}`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(data),
        'Authorization': `Bearer ${LOCIZE_API_KEY}`,
      },
    };

    const req = https.request(options, (res) => {
      let responseData = '';

      res.on('data', (chunk) => {
        responseData += chunk;
      });

      res.on('end', () => {
        if (res.statusCode && res.statusCode >= 200 && res.statusCode < 300) {
          resolve();
        } else if (res.statusCode === 412) {
          // HTTP 412: Nothing changed - treat as success
          resolve();
        } else {
          reject(new Error(`HTTP ${res.statusCode}: ${responseData}`));
        }
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    req.write(data);
    req.end();
  });
}

/**
 * Process a single translation file
 */
async function processTranslationFile(
  language: string,
  filePath: string
): Promise<{ keys: number; success: boolean }> {
  try {
    // Read translation file
    const content = fs.readFileSync(filePath, 'utf-8');
    const translations = JSON.parse(content);
    
    let totalKeyCount = 0;
    const namespaces = Object.keys(translations);
    
    console.log(`  ${colors.cyan}└─${colors.reset} Found ${namespaces.length} namespaces: ${namespaces.join(', ')}`);
    
    // Process each namespace separately
    for (const namespace of namespaces) {
      const namespaceTranslations = translations[namespace];
      
      // Flatten nested structure within this namespace to dot-notation
      const flatTranslations = flattenObject(namespaceTranslations);
      const keyCount = Object.keys(flatTranslations).length;
      totalKeyCount += keyCount;
      
      console.log(`     ${colors.cyan}├─${colors.reset} ${namespace}: ${keyCount} keys`);
      
      // Upload to Locize (each namespace separately)
      await uploadToLocize(language, namespace, flatTranslations);
      console.log(`     ${colors.green}└─${colors.reset} ✓ ${namespace} uploaded`);
    }
    
    return { keys: totalKeyCount, success: true };
  } catch (error) {
    console.error(`  ${colors.red}✗${colors.reset} Failed to process ${language}:`, error);
    return { keys: 0, success: false };
  }
}

/**
 * Main function
 */
async function main() {
  console.log(`\n${colors.bright}${colors.blue}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}`);
  console.log(`${colors.bright}📤 Pushing Local Translations to Locize${colors.reset}`);
  console.log(`${colors.blue}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}\n`);

  // Validate environment variables
  if (!LOCIZE_PROJECT_ID || !LOCIZE_API_KEY) {
    console.error(`${colors.red}✗ Error: Missing Locize configuration${colors.reset}`);
    console.error(`\nPlease ensure .env.local contains:`);
    console.error(`  NEXT_PUBLIC_LOCIZE_PROJECT_ID=your-project-id`);
    console.error(`  LOCIZE_API_KEY=your-api-key\n`);
    process.exit(1);
  }

  // Check source directory exists
  if (!fs.existsSync(SOURCE_DIR)) {
    console.error(`${colors.red}✗ Error: Source directory not found${colors.reset}`);
    console.error(`  Expected: ${SOURCE_DIR}\n`);
    process.exit(1);
  }

  console.log(`${colors.bright}Configuration:${colors.reset}`);
  console.log(`  Project ID: ${colors.cyan}${LOCIZE_PROJECT_ID}${colors.reset}`);
  console.log(`  Version: ${colors.cyan}${LOCIZE_VERSION}${colors.reset}`);
  console.log(`  Source: ${colors.cyan}${SOURCE_DIR}${colors.reset}`);
  console.log(`  Namespaces: ${colors.cyan}Auto-detected from translation.json first-level keys${colors.reset}`);
  console.log(`  Languages: ${colors.cyan}${LANGUAGES.join(', ')}${colors.reset}\n`);

  console.log(`${colors.bright}Processing translations:${colors.reset}\n`);

  let totalKeys = 0;
  let successCount = 0;
  let failCount = 0;

  // Process each language
  for (const language of LANGUAGES) {
    const filePath = path.join(SOURCE_DIR, language, 'translation.json');
    
    console.log(`${colors.bright}${language.toUpperCase()}${colors.reset}`);
    
    if (!fs.existsSync(filePath)) {
      console.log(`  ${colors.yellow}⚠${colors.reset} File not found: ${filePath}\n`);
      continue;
    }

    const result = await processTranslationFile(language, filePath);
    
    if (result.success) {
      console.log(`  ${colors.green}✓${colors.reset} Uploaded successfully\n`);
      totalKeys += result.keys;
      successCount++;
    } else {
      console.log(`  ${colors.red}✗${colors.reset} Upload failed\n`);
      failCount++;
    }
  }

  // Summary
  console.log(`${colors.blue}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}\n`);
  console.log(`${colors.bright}Summary:${colors.reset}`);
  console.log(`  ${colors.green}✓${colors.reset} Successful: ${successCount} languages`);
  if (failCount > 0) {
    console.log(`  ${colors.red}✗${colors.reset} Failed: ${failCount} languages`);
  }
  console.log(`  ${colors.cyan}📝${colors.reset} Total keys: ${totalKeys}`);
  console.log();

  if (successCount > 0) {
    console.log(`${colors.green}${colors.bright}✓ Translations pushed to Locize!${colors.reset}`);
    console.log(`\nNext steps:`);
    console.log(`  1. Verify in Locize dashboard: ${colors.cyan}https://www.locize.app/${colors.reset}`);
    console.log(`  2. Download to public folder: ${colors.cyan}npm run download-translations${colors.reset}`);
    console.log(`  3. Test your app: ${colors.cyan}npm run dev${colors.reset}\n`);
  } else {
    console.log(`${colors.red}${colors.bright}✗ No translations were uploaded${colors.reset}\n`);
    process.exit(1);
  }
}

// Run the script
main().catch((error) => {
  console.error(`\n${colors.red}${colors.bright}✗ Fatal error:${colors.reset}`, error);
  process.exit(1);
});
