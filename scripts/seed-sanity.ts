/**
 * Sanity Content Seeding Script
 * 
 * This script automatically populates your Sanity Studio with sample content
 * Run: npm run seed:sanity
 */

import { createClient } from '@sanity/client';
import dotenv from 'dotenv';
import { products as staticProducts } from '../src/data/products';

// Load environment variables
dotenv.config({ path: '.env.local' });

// Create Sanity client
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  token: process.env.SANITY_API_TOKEN!,
  useCdn: false,
  apiVersion: '2024-01-01',
});

// ============================================================================
// PRODUCT CONVERSION HELPERS
// ============================================================================

// Currency conversion rates (approximate)
const CURRENCY_RATES = {
  usd: 1,
  eur: 0.92,
};

// Helper function to convert price to different currencies
function convertPrice(usdPrice: number) {
  return {
    usd: usdPrice,
    eur: Math.round(usdPrice * CURRENCY_RATES.eur),
  };
}

// Convert static products to Sanity format
const products = staticProducts.map((product, index) => ({
  _type: 'product',
  _id: product.id,
  productId: {
    _type: 'slug',
    current: product.id,
  },
  name: product.name,
  description: product.description,
  category: product.category,
  pricing: convertPrice(product.price),
  originalPricing: product.originalPrice 
    ? convertPrice(product.originalPrice) 
    : convertPrice(product.price),
  features: product.features,
  badge: product.badge || '',
  deliveryTime: product.deliveryTime || 'TBD',
  billingCycle: product.billingCycle,
  isRecurring: product.isRecurring || false,
  isActive: true,
  sortOrder: index,
}));

// ============================================================================
// SAMPLE DATA
// ============================================================================

const services = [
  {
    _type: 'service',
    _id: 'service-web-dev',
    title: 'Web Development',
    slug: { _type: 'slug', current: 'web-development' },
    category: 'development',
    description: 'Custom web applications built with modern technologies like Next.js, React, and TypeScript. We create fast, scalable, and maintainable web solutions.',
    icon: 'Code',
    featured: true,
    order: 0,
  },
  {
    _type: 'service',
    _id: 'service-mobile-dev',
    title: 'Mobile App Development',
    slug: { _type: 'slug', current: 'mobile-app-development' },
    category: 'development',
    description: 'Native and cross-platform mobile applications for iOS and Android using React Native and Flutter.',
    icon: 'PhoneIphone',
    featured: true,
    order: 1,
  },
  {
    _type: 'service',
    _id: 'service-cloud',
    title: 'Cloud Solutions',
    slug: { _type: 'slug', current: 'cloud-solutions' },
    category: 'consulting',
    description: 'Scalable cloud infrastructure and deployment solutions on AWS, Azure, and Google Cloud Platform.',
    icon: 'Cloud',
    featured: true,
    order: 2,
  },
  {
    _type: 'service',
    _id: 'service-ui-ux',
    title: 'UI/UX Design',
    slug: { _type: 'slug', current: 'ui-ux-design' },
    category: 'design',
    description: 'Beautiful, user-centered design that enhances user experience and drives engagement.',
    icon: 'Palette',
    featured: false,
    order: 3,
  },
  {
    _type: 'service',
    _id: 'service-devops',
    title: 'DevOps & CI/CD',
    slug: { _type: 'slug', current: 'devops-ci-cd' },
    category: 'consulting',
    description: 'Automated deployment pipelines and infrastructure as code for faster, safer releases.',
    icon: 'Settings',
    featured: false,
    order: 4,
  },
  {
    _type: 'service',
    _id: 'service-consulting',
    title: 'Technical Consulting',
    slug: { _type: 'slug', current: 'technical-consulting' },
    category: 'consulting',
    description: 'Expert guidance on architecture, technology selection, and development best practices.',
    icon: 'Psychology',
    featured: false,
    order: 5,
  },
];

const pricingTiers = [
  {
    _type: 'pricingTier',
    _id: 'pricing-starter',
    name: 'Starter',
    slug: { _type: 'slug', current: 'starter' },
    description: 'Perfect for small projects and startups',
    priceUSD: 999,
    priceEUR: 849,
    features: [
      'Up to 5 pages',
      'Responsive design',
      'Basic SEO optimization',
      'Contact form integration',
      '30 days support',
      'Mobile-friendly',
    ],
    popular: false,
    order: 0,
    buttonText: 'Get Started',
  },
  {
    _type: 'pricingTier',
    _id: 'pricing-professional',
    name: 'Professional',
    slug: { _type: 'slug', current: 'professional' },
    description: 'For growing businesses with advanced needs',
    priceUSD: 2499,
    priceEUR: 2124,
    features: [
      'Up to 15 pages',
      'Custom design system',
      'Advanced SEO & analytics',
      'CMS integration',
      'E-commerce ready',
      'Performance optimization',
      '90 days support',
      'Priority email support',
    ],
    popular: true,
    order: 1,
    buttonText: 'Get Started',
  },
  {
    _type: 'pricingTier',
    _id: 'pricing-enterprise',
    name: 'Enterprise',
    slug: { _type: 'slug', current: 'enterprise' },
    description: 'For large-scale projects and organizations',
    priceUSD: 5999,
    priceEUR: 5099,
    features: [
      'Unlimited pages',
      'Premium custom design',
      'Enterprise SEO strategy',
      'Custom API integrations',
      'Advanced security',
      'Load balancing & CDN',
      'Dedicated account manager',
      '1 year premium support',
      '24/7 phone support',
    ],
    popular: false,
    order: 2,
    buttonText: 'Contact Sales',
  },
];

const teamMembers = [
  {
    _type: 'teamMember',
    _id: 'team-sarah',
    name: 'Sarah Johnson',
    role: 'CEO & Founder',
    bio: 'Visionary leader with 15+ years in the tech industry. Passionate about building products that make a difference.',
    order: 0,
    social: {
      linkedin: 'https://linkedin.com/in/sarahjohnson',
      twitter: 'https://twitter.com/sarahjohnson',
    },
  },
  {
    _type: 'teamMember',
    _id: 'team-michael',
    name: 'Michael Chen',
    role: 'CTO',
    bio: 'Technology expert specializing in scalable architecture and cloud solutions. Former principal engineer at major tech companies.',
    order: 1,
    social: {
      linkedin: 'https://linkedin.com/in/michaelchen',
      github: 'https://github.com/michaelchen',
    },
  },
  {
    _type: 'teamMember',
    _id: 'team-emily',
    name: 'Emily Rodriguez',
    role: 'Lead Designer',
    bio: 'Award-winning designer creating beautiful, user-centered experiences. 10+ years in UX/UI design.',
    order: 2,
    social: {
      linkedin: 'https://linkedin.com/in/emilyrodriguez',
      twitter: 'https://twitter.com/emilyrodriguez',
    },
  },
  {
    _type: 'teamMember',
    _id: 'team-david',
    name: 'David Kim',
    role: 'Senior Developer',
    bio: 'Full-stack developer with expertise in React, Next.js, and Node.js. Passionate about clean code and best practices.',
    order: 3,
    social: {
      github: 'https://github.com/davidkim',
      linkedin: 'https://linkedin.com/in/davidkim',
    },
  },
];

const navigation = {
  _type: 'navigation',
  _id: 'nav-main-menu',
  title: 'Main Menu',
  identifier: { _type: 'slug', current: 'main-menu' },
  items: [
    {
      _key: 'nav-home',
      label: 'Home',
      translationKey: 'nav.home',
      linkType: 'internal',
      internalLink: '/',
      icon: 'Home',
      order: 0,
      showInHeader: true,
      showInFooter: true,
      openInNewTab: false,
    },
    {
      _key: 'nav-shop',
      label: 'Shop',
      translationKey: 'nav.shop',
      linkType: 'internal',
      internalLink: '/shop',
      icon: 'Build',
      order: 10,
      showInHeader: true,
      showInFooter: false,
      openInNewTab: false,
    },
    {
      _key: 'nav-studio',
      label: 'Studio',
      translationKey: 'nav.studio',
      linkType: 'internal',
      internalLink: '/studio',
      icon: 'Palette',
      order: 20,
      showInHeader: true,
      showInFooter: false,
      openInNewTab: false,
    },
    {
      _key: 'nav-admin',
      label: 'Admin',
      translationKey: 'nav.admin',
      linkType: 'internal',
      internalLink: '/admin',
      icon: 'AdminPanelSettings',
      order: 30,
      showInHeader: true,
      showInFooter: true,
      openInNewTab: false,
    },
    {
      _key: 'nav-contacts',
      label: 'Contacts',
      translationKey: 'nav.contacts',
      linkType: 'internal',
      internalLink: '/contacts',
      icon: 'ContactMail',
      order: 40,
      showInHeader: true,
      showInFooter: true,
      openInNewTab: false,
    },
  ],
};

const siteSettings = {
  _type: 'siteSettings',
  _id: 'siteSettings',
  companyName: 'WebDev Studio',
  tagline: 'Building Tomorrow\'s Web Today',
  contact: {
    email: 'hello@webdevstudio.com',
    phone: '+1 (555) 123-4567',
    address: '123 Tech Street, Suite 100\nSan Francisco, CA 94105\nUnited States',
  },
  social: {
    github: 'https://github.com/webdevstudio',
    linkedin: 'https://linkedin.com/company/webdevstudio',
    twitter: 'https://twitter.com/webdevstudio',
  },
  seo: {
    metaTitle: 'WebDev Studio - Professional Web Development Services',
    metaDescription: 'Custom web development solutions with Next.js, React, and modern technologies. We build fast, scalable, and beautiful web applications.',
    keywords: ['web development', 'nextjs', 'react', 'typescript', 'sanity cms', 'mobile apps', 'cloud solutions'],
  },
};

// ============================================================================
// SEEDING FUNCTIONS
// ============================================================================

async function seedContent(contentType: string, items: any[]) {
  console.log(`\n📝 Seeding ${contentType}...`);
  let created = 0;
  let updated = 0;

  for (const item of items) {
    try {
      // Check if document exists
      const existing = await client.getDocument(item._id);
      
      if (existing) {
        // Update existing document
        await client.createOrReplace(item);
        updated++;
        console.log(`   ✓ Updated: ${item.title || item.name || item.label || item._id}`);
      } else {
        // Create new document
        await client.create(item);
        created++;
        console.log(`   ✓ Created: ${item.title || item.name || item.label || item._id}`);
      }
    } catch (error: any) {
      if (error.statusCode === 404) {
        // Document doesn't exist, create it
        await client.create(item);
        created++;
        console.log(`   ✓ Created: ${item.title || item.name || item.label || item._id}`);
      } else {
        console.error(`   ✗ Error with ${item._id}:`, error.message);
      }
    }
  }

  console.log(`   Summary: ${created} created, ${updated} updated`);
  return { created, updated };
}

async function seedAll() {
  console.log('╔════════════════════════════════════════════════════════╗');
  console.log('║   🌱 Sanity Content Seeding Script                   ║');
  console.log('╚════════════════════════════════════════════════════════╝');
  console.log('\n📊 Project Info:');
  console.log(`   Project ID: ${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}`);
  console.log(`   Dataset: ${process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'}`);

  try {
    const stats = {
      services: await seedContent('Services', services),
      pricing: await seedContent('Pricing Tiers', pricingTiers),
      team: await seedContent('Team Members', teamMembers),
      products: await seedContent('Products', products),
    };

    // Seed navigation (single document)
    console.log('\n🧭 Seeding Navigation...');
    await client.createOrReplace(navigation);
    console.log('   ✓ Main navigation created/updated');

    // Seed site settings (singleton)
    console.log('\n⚙️  Seeding Site Settings...');
    await client.createOrReplace(siteSettings);
    console.log('   ✓ Site settings created/updated');

    // Summary
    console.log('\n╔════════════════════════════════════════════════════════╗');
    console.log('║   🎉 Seeding Complete!                                ║');
    console.log('╚════════════════════════════════════════════════════════╝');
    console.log('\n📊 Summary:');
    console.log(`   Services:      ${stats.services.created} created, ${stats.services.updated} updated`);
    console.log(`   Pricing:       ${stats.pricing.created} created, ${stats.pricing.updated} updated`);
    console.log(`   Team:          ${stats.team.created} created, ${stats.team.updated} updated`);
    console.log(`   Products:      ${stats.products.created} created, ${stats.products.updated} updated`);
    console.log(`   Navigation:    ✓ Main menu`);
    console.log(`   Site Settings: ✓ Configured`);
    console.log('\n🚀 Next steps:');
    console.log('   1. Visit http://localhost:3000/studio to view your content');
    console.log('   2. Run "npm run download-translations" to sync translations');
    console.log('   3. Start developing with "npm run dev"');
    console.log('');

  } catch (error: any) {
    console.error('\n❌ Seeding failed:', error.message);
    console.error('\n💡 Check:');
    console.error('   - Your .env.local file has correct Sanity credentials');
    console.error('   - SANITY_API_TOKEN has write permissions');
    console.error('   - You\'re connected to the internet');
    process.exit(1);
  }
}

// Run the seeding
seedAll();
