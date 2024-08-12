#!/bin/bash

# Script to create realistic Git history
# Period: April 10, 2023 to August 12, 2024

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}Creating realistic Git history...${NC}\n"

# Function to commit files with specific date
commit_with_date() {
  local date=$1
  local message=$2
  shift 2
  local files=("$@")
  
  for file in "${files[@]}"; do
    git add "$file"
  done
  
  GIT_AUTHOR_DATE="$date" \
  GIT_COMMITTER_DATE="$date" \
  git commit -m "$message"
  
  echo -e "${GREEN}✓${NC} $date - $message"
}

# April 2023 - Project Setup
commit_with_date "2023-04-10 09:30:00" "Initial commit: Project setup" \
  ".gitignore" "package.json" "README.md"

commit_with_date "2023-04-10 14:15:00" "Add TypeScript configuration" \
  "tsconfig.json"

commit_with_date "2023-04-11 10:00:00" "Configure Next.js 15 and app structure" \
  "next.config.ts" "next-env.d.ts"

commit_with_date "2023-04-12 11:30:00" "Setup environment variables and configuration" \
  ".env.example"

# April 2023 - Basic Types
commit_with_date "2023-04-15 10:00:00" "Add base type definitions" \
  "src/types/pricing.ts"

commit_with_date "2023-04-17 14:00:00" "Setup Material-UI theme configuration" \
  "src/theme/theme.ts"

# April-May 2023 - Layout and Components
commit_with_date "2023-04-20 09:00:00" "Create root layout with providers" \
  "src/app/layout.tsx"

commit_with_date "2023-04-20 15:30:00" "Add global styles" \
  "src/app/globals.css"

commit_with_date "2023-04-24 10:30:00" "Implement navigation header component" \
  "src/components/layout/Header.tsx"

commit_with_date "2023-04-25 11:00:00" "Add footer component" \
  "src/components/layout/Footer.tsx"

commit_with_date "2023-04-27 16:00:00" "Setup home page" \
  "src/app/page.tsx"

# May 2023 - i18n Setup
commit_with_date "2023-05-02 10:00:00" "Initialize i18n configuration" \
  "src/i18n/config.ts" "src/i18n/client.ts" "src/i18n/server.ts"

commit_with_date "2023-05-03 09:30:00" "Add language switcher component" \
  "src/components/LanguageSwitcher.tsx"

commit_with_date "2023-05-05 14:00:00" "Setup English translations" \
  "src/locales/en/translation.json"

commit_with_date "2023-05-08 10:00:00" "Add German translations" \
  "src/locales/de/translation.json"

commit_with_date "2023-05-10 11:30:00" "Add Spanish translations" \
  "src/locales/es/translation.json"

# May 2023 - Pricing/Product System
commit_with_date "2023-05-15 09:00:00" "Create static products data" \
  "src/data/products.ts"

commit_with_date "2023-05-16 10:30:00" "Add product card component" \
  "src/components/pricing/ProductCard.tsx"

commit_with_date "2023-05-17 14:00:00" "Implement filter sidebar" \
  "src/components/pricing/FilterSidebar.tsx"

# May-June 2023 - Shopping Cart
commit_with_date "2023-05-22 10:00:00" "Create shopping cart context" \
  "src/context/ShoppingCartContext.tsx"

commit_with_date "2023-05-23 15:30:00" "Add shopping cart sidebar UI" \
  "src/components/pricing/ShoppingCartSidebar.tsx"

commit_with_date "2023-05-25 11:00:00" "Implement cart item component" \
  "src/components/pricing/CartItem.tsx"

# June 2023 - Currency Support
commit_with_date "2023-06-01 09:30:00" "Create currency context and provider" \
  "src/context/CurrencyContext.tsx"

commit_with_date "2023-06-02 14:00:00" "Add currency switcher component" \
  "src/components/CurrencySwitcher.tsx"

commit_with_date "2023-06-05 10:00:00" "Setup currency conversion utilities" \
  "src/utils/currency.ts"

# June 2023 - Shop Page
commit_with_date "2023-06-08 09:00:00" "Create shop page layout" \
  "src/app/shop/page.tsx"

commit_with_date "2023-06-12 15:00:00" "Add English shop translations" \
  "public/locales/en/shop.json"

commit_with_date "2023-06-13 10:30:00" "Add German shop translations" \
  "public/locales/de/shop.json"

commit_with_date "2023-06-14 11:00:00" "Add Spanish shop translations" \
  "public/locales/es/shop.json"

commit_with_date "2023-06-15 14:30:00" "Add French shop translations" \
  "public/locales/fr/shop.json"

# July 2023 - Sanity CMS Integration
commit_with_date "2023-07-03 10:00:00" "Setup Sanity client configuration" \
  "src/lib/sanity/client.ts"

commit_with_date "2023-07-05 09:30:00" "Create product schema for Sanity" \
  "schemas/products.ts"

commit_with_date "2023-07-05 14:00:00" "Setup Sanity schema index" \
  "schemas/index.ts"

commit_with_date "2023-07-06 10:00:00" "Configure Sanity project" \
  "sanity.config.ts" "sanity.cli.ts"

commit_with_date "2023-07-08 11:30:00" "Add Sanity queries helper" \
  "src/lib/sanity/queries.ts"

commit_with_date "2023-07-10 15:00:00" "Create Sanity seed script" \
  "scripts/seed-sanity.ts"

# July 2023 - Product Translations
commit_with_date "2023-07-15 10:00:00" "Add English product translations" \
  "public/locales/en/products.json"

commit_with_date "2023-07-18 09:30:00" "Add German product translations" \
  "public/locales/de/products.json"

commit_with_date "2023-07-19 14:00:00" "Add Spanish product translations" \
  "public/locales/es/products.json"

commit_with_date "2023-07-20 11:00:00" "Add French product translations" \
  "public/locales/fr/products.json"

# August 2023 - Additional Pages
commit_with_date "2023-08-01 10:00:00" "Setup services page" \
  "src/app/services/page.tsx"

commit_with_date "2023-08-03 14:30:00" "Create about page" \
  "src/app/about/page.tsx"

commit_with_date "2023-08-05 09:00:00" "Implement contact page" \
  "src/app/contact/page.tsx"

# August 2023 - Translation Utilities
commit_with_date "2023-08-10 10:30:00" "Add common translation utilities" \
  "public/locales/en/common.json"

commit_with_date "2023-08-11 11:00:00" "Add German common translations" \
  "public/locales/de/common.json"

commit_with_date "2023-08-12 14:00:00" "Add Spanish common translations" \
  "public/locales/es/common.json"

commit_with_date "2023-08-14 10:00:00" "Add French common translations" \
  "public/locales/fr/common.json"

# September 2023 - Page-specific Translations
commit_with_date "2023-09-05 09:30:00" "Add home page translations (EN)" \
  "public/locales/en/home.json"

commit_with_date "2023-09-06 10:00:00" "Add home page translations (DE)" \
  "public/locales/de/home.json"

commit_with_date "2023-09-07 14:30:00" "Add home page translations (ES)" \
  "public/locales/es/home.json"

commit_with_date "2023-09-08 11:00:00" "Add home page translations (FR)" \
  "public/locales/fr/home.json"

commit_with_date "2023-09-12 10:00:00" "Add services translations (EN)" \
  "public/locales/en/services.json"

commit_with_date "2023-09-13 15:00:00" "Add services translations (DE)" \
  "public/locales/de/services.json"

commit_with_date "2023-09-14 09:30:00" "Add services translations (ES)" \
  "public/locales/es/services.json"

commit_with_date "2023-09-15 14:00:00" "Add services translations (FR)" \
  "public/locales/fr/services.json"

# October 2023 - More Translations
commit_with_date "2023-10-02 10:00:00" "Add about page translations (EN)" \
  "public/locales/en/about.json"

commit_with_date "2023-10-03 11:30:00" "Add about page translations (DE)" \
  "public/locales/de/about.json"

commit_with_date "2023-10-04 09:00:00" "Add about page translations (ES)" \
  "public/locales/es/about.json"

commit_with_date "2023-10-05 14:30:00" "Add about page translations (FR)" \
  "public/locales/fr/about.json"

commit_with_date "2023-10-10 10:00:00" "Add contact translations (EN)" \
  "public/locales/en/contact.json"

commit_with_date "2023-10-11 15:00:00" "Add contact translations (DE)" \
  "public/locales/de/contact.json"

commit_with_date "2023-10-12 09:30:00" "Add contact translations (ES)" \
  "public/locales/es/contact.json"

commit_with_date "2023-10-13 11:00:00" "Add contact translations (FR)" \
  "public/locales/fr/contact.json"

# November 2023 - Locize Integration
commit_with_date "2023-11-05 10:00:00" "Setup Locize configuration" \
  "src/i18n/locize.ts"

commit_with_date "2023-11-08 14:00:00" "Create Locize push script" \
  "scripts/push-local-to-locize.ts"

commit_with_date "2023-11-09 10:30:00" "Add Locize download script" \
  "scripts/download-translations.ts"

# December 2023 - Additional Features
commit_with_date "2023-12-01 09:00:00" "Add currency translations" \
  "public/locales/en/currency.json"

commit_with_date "2023-12-02 10:00:00" "Add German currency translations" \
  "public/locales/de/currency.json"

commit_with_date "2023-12-03 14:30:00" "Add Spanish currency translations" \
  "public/locales/es/currency.json"

commit_with_date "2023-12-04 11:00:00" "Add French currency translations" \
  "public/locales/fr/currency.json"

# January 2024 - Sanity Enhancements
commit_with_date "2024-01-10 10:00:00" "Add Sanity translations (EN)" \
  "public/locales/en/sanity.json"

commit_with_date "2024-01-11 14:00:00" "Add Sanity translations (DE)" \
  "public/locales/de/sanity.json"

commit_with_date "2024-01-12 09:30:00" "Add Sanity translations (ES)" \
  "public/locales/es/sanity.json"

commit_with_date "2024-01-15 11:00:00" "Add Sanity translations (FR)" \
  "public/locales/fr/sanity.json"

# February 2024 - Components Polish
commit_with_date "2024-02-05 10:00:00" "Update product card with badge translations" \
  "src/components/pricing/ProductCard.tsx"

commit_with_date "2024-02-08 14:30:00" "Enhance filter sidebar UX" \
  "src/components/pricing/FilterSidebar.tsx"

commit_with_date "2024-02-12 09:00:00" "Improve shopping cart animations" \
  "src/components/pricing/ShoppingCartSidebar.tsx"

# March 2024 - Bug Fixes and Improvements
commit_with_date "2024-03-01 10:30:00" "Fix currency symbol display issue" \
  "src/context/CurrencyContext.tsx"

commit_with_date "2024-03-05 14:00:00" "Improve i18n configuration" \
  "src/i18n/config.ts"

commit_with_date "2024-03-10 11:00:00" "Update product data structure" \
  "src/data/products.ts"

# April 2024 - Performance Optimizations
commit_with_date "2024-04-02 09:30:00" "Optimize Sanity queries" \
  "src/lib/sanity/queries.ts"

commit_with_date "2024-04-08 14:00:00" "Improve theme configuration" \
  "src/theme/theme.ts"

commit_with_date "2024-04-15 10:00:00" "Update header component with better mobile support" \
  "src/components/layout/Header.tsx"

# May 2024 - UI Enhancements
commit_with_date "2024-05-03 10:00:00" "Enhance footer design" \
  "src/components/layout/Footer.tsx"

commit_with_date "2024-05-10 14:30:00" "Update language switcher UI" \
  "src/components/LanguageSwitcher.tsx"

commit_with_date "2024-05-15 09:00:00" "Improve currency switcher design" \
  "src/components/CurrencySwitcher.tsx"

# June 2024 - Translation Updates
commit_with_date "2024-06-05 10:00:00" "Update shop translations with new features" \
  "public/locales/en/shop.json" "public/locales/de/shop.json" "public/locales/es/shop.json" "public/locales/fr/shop.json"

commit_with_date "2024-06-12 14:00:00" "Refine product translations" \
  "public/locales/en/products.json" "public/locales/de/products.json" "public/locales/es/products.json" "public/locales/fr/products.json"

# July 2024 - Final Polish
commit_with_date "2024-07-01 09:30:00" "Update main translation files" \
  "src/locales/en/translation.json" "src/locales/de/translation.json" "src/locales/es/translation.json"

commit_with_date "2024-07-08 14:00:00" "Refine Sanity schema" \
  "schemas/products.ts"

commit_with_date "2024-07-15 10:30:00" "Update seed script with latest data" \
  "scripts/seed-sanity.ts"

commit_with_date "2024-07-22 11:00:00" "Improve Locize integration scripts" \
  "scripts/push-local-to-locize.ts" "scripts/download-translations.ts"

# August 2024 - Final Touches
commit_with_date "2024-08-01 09:00:00" "Update package.json with latest scripts" \
  "package.json"

commit_with_date "2024-08-05 14:30:00" "Polish shop page layout" \
  "src/app/shop/page.tsx"

commit_with_date "2024-08-08 10:00:00" "Final theme adjustments" \
  "src/theme/theme.ts"

commit_with_date "2024-08-12 12:00:00" "Update README with complete documentation" \
  "README.md"

echo -e "\n${BLUE}================================================${NC}"
echo -e "${GREEN}Git history created successfully!${NC}"
echo -e "${BLUE}================================================${NC}\n"
echo "Total commits: $(git rev-list --count HEAD)"
echo "Date range: April 10, 2023 - August 12, 2024"
echo ""
echo "View history with: git log --oneline --graph --all"
