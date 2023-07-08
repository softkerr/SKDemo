import { client } from './client';
import type {
  SanityService,
  SanityPricingTier,
  SanityTeamMember,
  SanitySiteSettings,
  SanityPage,
  SanityNavigation,
  SanityProduct,
} from '@/types/sanity';

// All content from Sanity is in English
// Use English text as keys for Locize translations in components

// Fetch all services
export async function getServices(): Promise<SanityService[]> {
  const query = `*[_type == "service"] | order(order asc) {
    _id,
    title,
    slug,
    category,
    description,
    icon,
    featured,
    order
  }`;
  return client.fetch(query);
}

// Fetch featured services
export async function getFeaturedServices(): Promise<SanityService[]> {
  const query = `*[_type == "service" && featured == true] | order(order asc) {
    _id,
    title,
    slug,
    category,
    description,
    icon,
    order,
    featured
  }`;
  return client.fetch(query);
}

// Fetch all pricing tiers
export async function getPricingTiers(): Promise<SanityPricingTier[]> {
  const query = `*[_type == "pricingTier"] | order(order asc) {
    _id,
    name,
    slug,
    description,
    priceUSD,
    priceEUR,
    features,
    popular,
    order,
    buttonText
  }`;
  return client.fetch(query);
}

// Fetch all team members
export async function getTeamMembers(): Promise<SanityTeamMember[]> {
  const query = `*[_type == "teamMember"] | order(order asc) {
    _id,
    name,
    role,
    bio,
    image,
    order,
    social
  }`;
  return client.fetch(query);
}

// Fetch site settings
export async function getSiteSettings(): Promise<SanitySiteSettings | null> {
  const query = `*[_type == "siteSettings"][0] {
    _id,
    companyName,
    tagline,
    logo,
    contact,
    social,
    seo
  }`;
  return client.fetch(query);
}

// Fetch page by slug
export async function getPageBySlug(slug: string): Promise<SanityPage | null> {
  const query = `*[_type == "page" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    subtitle,
    content,
    seo
  }`;
  return client.fetch(query, { slug });
}

// Fetch single service by slug
export async function getServiceBySlug(slug: string): Promise<SanityService | null> {
  const query = `*[_type == "service" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    category,
    description,
    icon,
    featured,
    order
  }`;
  return client.fetch(query, { slug });
}

// Fetch navigation by identifier
export async function getNavigation(identifier: string): Promise<SanityNavigation | null> {
  const query = `*[_type == "navigation" && identifier.current == $identifier][0] {
    _id,
    title,
    identifier,
    items[] {
      label,
      translationKey,
      linkType,
      internalLink,
      externalLink,
      openInNewTab,
      icon,
      order,
      showInHeader,
      showInFooter,
      children[] {
        label,
        translationKey,
        linkType,
        internalLink,
        externalLink,
        icon,
        order
      }
    }
  }`;
  return client.fetch(query, { identifier });
}

// Fetch all navigations
export async function getAllNavigations(): Promise<SanityNavigation[]> {
  const query = `*[_type == "navigation"] | order(title asc) {
    _id,
    title,
    identifier,
    items[] {
      label,
      translationKey,
      linkType,
      internalLink,
      externalLink,
      openInNewTab,
      icon,
      order,
      showInHeader,
      showInFooter,
      children[] {
        label,
        translationKey,
        linkType,
        internalLink,
        externalLink,
        icon,
        order
      }
    }
  }`;
  return client.fetch(query);
}

// Fetch all products with localization
export async function getProducts(locale: string = 'en'): Promise<SanityProduct[]> {
  const query = `*[_type == "product" && isActive == true] | order(sortOrder asc) {
    _id,
    "id": productId.current,
    name,
    description,
    category,
    "pricing": pricing,
    "originalPricing": originalPricing,
    features,
    badge,
    deliveryTime,
    billingCycle,
    isRecurring,
    "image": image.asset->url,
    sortOrder
  }`;
  return client.fetch(query);
}

// Fetch product by ID
export async function getProductById(id: string, locale: string = 'en'): Promise<SanityProduct | null> {
  const query = `*[_type == "product" && productId.current == $id][0] {
    _id,
    "id": productId.current,
    "name": name.${locale},
    "description": description.${locale},
    category,
    "pricing": pricing,
    "originalPricing": originalPricing,
    "features": features.${locale},
    badge,
    "deliveryTime": deliveryTime.${locale},
    billingCycle,
    isRecurring,
    "image": image.asset->url,
    sortOrder
  }`;
  return client.fetch(query, { id });
}

// Fetch products by category
export async function getProductsByCategory(category: string, locale: string = 'en'): Promise<SanityProduct[]> {
  const query = `*[_type == "product" && category == $category && isActive == true] | order(sortOrder asc) {
    _id,
    "id": productId.current,
    "name": name.${locale},
    "description": description.${locale},
    category,
    "pricing": pricing,
    "originalPricing": originalPricing,
    "features": features.${locale},
    badge,
    "deliveryTime": deliveryTime.${locale},
    billingCycle,
    isRecurring,
    "image": image.asset->url,
    sortOrder
  }`;
  return client.fetch(query, { category });
}
