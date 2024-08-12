/**
 * Sanity to Locize Sync Script
 * 
 * Extracts content from Sanity CMS (English) and pushes it to Locize
 * for translation into other languages.
 * 
 * Run: npm run sync:sanity-to-locize
 */

import { createClient } from '@sanity/client';
import dotenv from 'dotenv';
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

// Load environment variables
dotenv.config({ path: '.env.local' });

// Create Sanity client
const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  token: process.env.SANITY_API_TOKEN!,
  useCdn: false,
  apiVersion: '2024-01-01',
});

// Locize configuration
const LOCIZE_PROJECT_ID = process.env.NEXT_PUBLIC_LOCIZE_PROJECT_ID;
const LOCIZE_API_KEY = process.env.LOCIZE_API_KEY;
const LOCIZE_VERSION = 'latest';

interface SanityContent {
  services: any[];
  pricingTiers: any[];
  teamMembers: any[];
  navigation: any[];
  siteSettings: any;
}

/**
 * Fetch all content from Sanity
 */
async function fetchSanityContent(): Promise<SanityContent> {
  console.log('📥 Fetching content from Sanity...\n');

  const [services, pricingTiers, teamMembers, navigation, siteSettings] = await Promise.all([
    sanityClient.fetch('*[_type == "service"] | order(order asc)'),
    sanityClient.fetch('*[_type == "pricingTier"] | order(order asc)'),
    sanityClient.fetch('*[_type == "teamMember"] | order(order asc)'),
    sanityClient.fetch('*[_type == "navigation"]'),
    sanityClient.fetch('*[_type == "siteSettings"][0]'),
  ]);

  console.log(`   ✓ Services: ${services.length}`);
  console.log(`   ✓ Pricing Tiers: ${pricingTiers.length}`);
  console.log(`   ✓ Team Members: ${teamMembers.length}`);
  console.log(`   ✓ Navigation Menus: ${navigation.length}`);
  console.log(`   ✓ Site Settings: ${siteSettings ? 'Found' : 'Not found'}`);

  return { services, pricingTiers, teamMembers, navigation, siteSettings };
}

/**
 * Generate translation keys from Sanity content
 */
function generateTranslationKeys(content: SanityContent) {
  const translations: any = {
    sanity: {
      services: {},
      pricing: {},
      team: {},
      navigation: {},
      siteSettings: {},
    },
  };

  // Services
  content.services.forEach((service, index) => {
    const key = service.slug?.current || `service-${index}`;
    translations.sanity.services[key] = {
      title: service.title,
      description: service.description,
    };
  });

  // Pricing Tiers
  content.pricingTiers.forEach((tier, index) => {
    const key = tier.slug?.current || `tier-${index}`;
    translations.sanity.pricing[key] = {
      name: tier.name,
      description: tier.description || '',
      buttonText: tier.buttonText || 'Get Started',
      features: {},
    };

    // Features
    if (tier.features && Array.isArray(tier.features)) {
      tier.features.forEach((feature: string, idx: number) => {
        translations.sanity.pricing[key].features[`feature${idx}`] = feature;
      });
    }
  });

  // Team Members
  content.teamMembers.forEach((member, index) => {
    const key = member.name.toLowerCase().replace(/\s+/g, '-');
    translations.sanity.team[key] = {
      name: member.name,
      role: member.role,
      bio: member.bio || '',
    };
  });

  // Navigation
  content.navigation.forEach((nav) => {
    const navKey = nav.identifier?.current || 'main-menu';
    translations.sanity.navigation[navKey] = {};

    if (nav.items && Array.isArray(nav.items)) {
      nav.items.forEach((item: any) => {
        const itemKey = item.label.toLowerCase().replace(/\s+/g, '-');
        translations.sanity.navigation[navKey][itemKey] = {
          label: item.label,
        };

        // Sub-items
        if (item.children && Array.isArray(item.children)) {
          translations.sanity.navigation[navKey][itemKey].children = {};
          item.children.forEach((child: any) => {
            const childKey = child.label.toLowerCase().replace(/\s+/g, '-');
            translations.sanity.navigation[navKey][itemKey].children[childKey] = child.label;
          });
        }
      });
    }
  });

  // Site Settings
  if (content.siteSettings) {
    translations.sanity.siteSettings = {
      companyName: content.siteSettings.companyName,
      tagline: content.siteSettings.tagline || '',
    };

    if (content.siteSettings.seo) {
      translations.sanity.siteSettings.seo = {
        metaTitle: content.siteSettings.seo.metaTitle || '',
        metaDescription: content.siteSettings.seo.metaDescription || '',
      };
    }
  }

  return translations;
}

/**
 * Save translations to local file
 */
function saveTranslationsLocally(translations: any) {
  const outputDir = path.join(process.cwd(), 'temp-locize');
  const outputFile = path.join(outputDir, 'sanity.json');

  // Create directory if it doesn't exist
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Write file
  fs.writeFileSync(outputFile, JSON.stringify(translations.sanity, null, 2));

  console.log(`\n💾 Saved translations to: ${outputFile}`);
  return outputFile;
}

/**
 * Push translations to Locize using API
 */
async function pushToLocize(namespace: string, content: any, language: string = 'en') {
  const url = `https://api.locize.app/update/${LOCIZE_PROJECT_ID}/${LOCIZE_VERSION}/${language}/${namespace}`;

  console.log(`\n📤 Pushing "${namespace}" to Locize (${language})...`);

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${LOCIZE_API_KEY}`,
      },
      body: JSON.stringify(content),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Locize API error: ${response.status} - ${errorText}`);
    }

    console.log('   ✓ Successfully pushed to Locize');
    return true;
  } catch (error: any) {
    console.error(`   ✗ Failed to push to Locize: ${error.message}`);
    return false;
  }
}

/**
 * Alternative: Use locize CLI to push
 */
function pushToLocizeViaCLI(filePath: string) {
  console.log('\n📤 Pushing to Locize via CLI...');

  try {
    // Copy file to public/locales/en/ for locize CLI
    const targetDir = path.join(process.cwd(), 'public', 'locales', 'en');
    const targetFile = path.join(targetDir, 'sanity.json');

    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }

    fs.copyFileSync(filePath, targetFile);
    console.log(`   ✓ Copied to ${targetFile}`);

    // Use locize CLI to sync
    console.log('\n   Running locize sync...');
    const syncCommand = `npx locize sync --project-id=${LOCIZE_PROJECT_ID} --api-key=${LOCIZE_API_KEY} --ver=${LOCIZE_VERSION} --path=./public/locales --language=en`;

    execSync(syncCommand, { stdio: 'inherit' });

    console.log('\n   ✓ Successfully synced to Locize');
    return true;
  } catch (error: any) {
    console.error(`\n   ✗ Failed to sync: ${error.message}`);
    return false;
  }
}

/**
 * Main execution
 */
async function main() {
  console.log('╔════════════════════════════════════════════════════════╗');
  console.log('║   🔄 Sanity → Locize Content Sync                    ║');
  console.log('╚════════════════════════════════════════════════════════╝\n');

  // Validate environment variables
  if (!LOCIZE_PROJECT_ID || !LOCIZE_API_KEY) {
    console.error('❌ Error: Missing Locize credentials in .env.local');
    console.error('   Required: NEXT_PUBLIC_LOCIZE_PROJECT_ID and LOCIZE_API_KEY');
    process.exit(1);
  }

  try {
    // Step 1: Fetch content from Sanity
    const content = await fetchSanityContent();

    // Step 2: Generate translation structure
    console.log('\n🔧 Generating translation keys...');
    const translations = generateTranslationKeys(content);
    console.log('   ✓ Translation structure created');

    // Step 3: Save locally
    const filePath = saveTranslationsLocally(translations);

    // Step 4: Push to Locize (using API)
    console.log('\n📡 Pushing to Locize...');
    const success = await pushToLocize('sanity', translations.sanity, 'en');

    if (success) {
      console.log('\n╔════════════════════════════════════════════════════════╗');
      console.log('║   ✅ Sync Complete!                                   ║');
      console.log('╚════════════════════════════════════════════════════════╝');
      console.log('\n📊 Summary:');
      console.log(`   • Services: ${content.services.length}`);
      console.log(`   • Pricing Tiers: ${content.pricingTiers.length}`);
      console.log(`   • Team Members: ${content.teamMembers.length}`);
      console.log(`   • Navigation Menus: ${content.navigation.length}`);
      console.log(`   • Site Settings: ✓`);
      console.log('\n🎯 Next steps:');
      console.log('   1. Go to your Locize dashboard');
      console.log('   2. Navigate to "sanity" namespace');
      console.log('   3. Add translations for DE, ES, FR languages');
      console.log('   4. Run "npm run download-translations" to sync back');
      console.log('');

      // Cleanup temp file
      if (fs.existsSync(path.join(process.cwd(), 'temp-locize'))) {
        fs.rmSync(path.join(process.cwd(), 'temp-locize'), { recursive: true });
      }
    } else {
      console.log('\n⚠️  API push failed. Trying CLI method...');
      pushToLocizeViaCLI(filePath);
    }
  } catch (error: any) {
    console.error('\n❌ Sync failed:', error.message);
    console.error('\n💡 Troubleshooting:');
    console.error('   - Check your Sanity credentials in .env.local');
    console.error('   - Verify Locize API key has write permissions');
    console.error('   - Ensure you have content in Sanity Studio');
    console.error('   - Check internet connection');
    process.exit(1);
  }
}

// Run the script
main();
