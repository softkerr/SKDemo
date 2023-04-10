# Company Website - Multi-Language Next.js Project

A modern, fully-featured company website built with Next.js 15, Material-UI v6, Sanity CMS, and internationalization via Locize. Features headless CMS content management, build-time translation downloads, light/dark theme switching, and multi-currency support.

## 🚀 Features

### Core Technologies
- **Next.js 15** with App Router for optimal performance
- **Material-UI v6** - Complete UI built exclusively with MUI components
- **Sanity CMS v3** - Headless CMS for content management (English-only)
- **Locize** - Translation management platform with build-time downloads
- **TypeScript** - Full type safety throughout the project

### Content Management
- **Sanity Studio** - Visual content editor for non-technical users
- **English-Only Content** - Sanity stores base content in English
- **Content Types**: Services, Pricing Tiers, Team Members, Site Settings, Pages
- **Real-time Preview** - Live content updates in development

### Internationalization (i18n)
- **4 Languages**: English (EN), German (DE), Spanish (ES), French (FR)
- **Locize Integration** - Professional translation management
- **Build-Time Downloads** - Translations downloaded during dev/build (no runtime API calls)
- **Local Translation Files** - Served as static assets for optimal performance
- **7 Namespaces**: common, home, services, pricing, about, contact, sanity
- **Language Switcher** - Persistent language preference

### User Experience
- **Currency Switcher** - Toggle between USD and EUR with live conversion
- **Theme System**
  - Light and Dark modes
  - Persistent theme preference (localStorage)
  - Smooth theme transitions
  - MUI theming with custom palettes
- **Responsive Design** - Mobile-first approach with MUI Grid/Stack/Box
- **SEO Optimized** - Next.js metadata API for better search rankings
- **Code Quality** - ESLint and Prettier configured

## 📁 Project Structure

```
SKDemo/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── layout.tsx         # Root layout with providers
│   │   ├── page.tsx           # Home page
│   │   ├── about/
│   │   │   └── page.tsx       # About page
│   │   ├── services/
│   │   │   └── page.tsx       # Services page
│   │   ├── pricing/
│   │   │   └── page.tsx       # Pricing page
│   │   └── contact/
│   │       └── page.tsx       # Contact page
│   ├── components/            # Reusable components
│   │   ├── Header.tsx         # Main navigation header
│   │   ├── Footer.tsx         # Footer component
│   │   ├── ThemeSwitcher.tsx  # Light/Dark toggle
│   │   ├── LanguageSwitcher.tsx # Language selector
│   │   └── CurrencySwitcher.tsx # Currency toggle
│   ├── sanity/                # Sanity CMS integration
│   │   ├── client.ts          # Sanity client configuration
│   │   ├── queries.ts         # GROQ queries for content
│   │   ├── schemas/           # Content type schemas
│   │   │   ├── service.ts
│   │   │   ├── pricingTier.ts
│   │   │   ├── teamMember.ts
│   │   │   ├── siteSettings.ts
│   │   │   └── page.ts
│   │   └── types.ts           # TypeScript types for Sanity
│   ├── theme/                 # MUI theme configuration
│   │   ├── theme.ts           # Theme definitions
│   │   └── ThemeProvider.tsx  # Theme context provider
│   ├── i18n/                  # Internationalization
│   │   └── config.ts          # i18next configuration (HttpBackend)
│   ├── providers/             # React context providers
│   │   ├── I18nProvider.tsx
│   │   └── Providers.tsx
│   └── types/                 # TypeScript type definitions
│       ├── app.ts
│       └── i18n.ts
├── public/
│   └── locales/               # Translation files (downloaded from Locize)
│       ├── en/                # English translations
│       │   ├── common.json    # Navigation, buttons, footer
│       │   ├── home.json      # Home page content
│       │   ├── services.json  # Services page content
│       │   ├── pricing.json   # Pricing page content
│       │   ├── about.json     # About page content
│       │   ├── contact.json   # Contact form
│       │   └── sanity.json    # Sanity content translations
│       ├── de/                # German translations (auto-downloaded)
│       ├── es/                # Spanish translations (auto-downloaded)
│       ├── fr/                # French translations (auto-downloaded)
│       └── README.md          # Translation file documentation
├── scripts/
│   └── download-translations.js  # Locize download script
├── sanity/                    # Sanity Studio
│   ├── schema.ts              # Studio schema configuration
│   └── sanity.config.ts       # Studio configuration
├── .env.local                 # Environment variables (not in git)
├── .env.local.example         # Environment template
├── package.json
├── tsconfig.json
├── next.config.js
├── .eslintrc.json
└── README.md
```

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 15 (App Router, React Server Components)
- **UI Library**: Material-UI (MUI) v6
- **Language**: TypeScript
- **Styling**: Emotion (MUI's styling solution)
- **Icons**: @mui/icons-material

### Content & Translations
- **CMS**: Sanity v3 (Headless CMS)
- **Internationalization**: 
  - react-i18next v14
  - i18next v23
  - i18next-http-backend v2 (local file loading)
- **Translation Management**: Locize (with locize-cli)

### Development Tools
- **Linting**: ESLint
- **Formatting**: Prettier
- **Environment**: dotenv (environment variables)
- **Build Tools**: locize-cli (translation downloads)

## 📦 Installation

### Prerequisites
- Node.js 18+ and npm
- Sanity account (free at [sanity.io](https://www.sanity.io/))
- Locize account (free tier available at [locize.com](https://locize.com/))

### Setup Steps

1. **Clone or navigate to the project**:
   ```bash
   cd */SKDemo
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure environment variables**:
   ```bash
   cp .env.local.example .env.local
   ```
   
   Edit `.env.local` and add your credentials:
   ```env
   # Sanity CMS
   NEXT_PUBLIC_SANITY_PROJECT_ID=your_sanity_project_id
   NEXT_PUBLIC_SANITY_DATASET=production
   SANITY_API_TOKEN=your_sanity_token
   
   # Locize (Translation Management)
   NEXT_PUBLIC_LOCIZE_PROJECT_ID=your_locize_project_id
   LOCIZE_API_KEY=your_locize_api_key
   ```

4. **Download translations from Locize**:
   ```bash
   npm run download-translations
   ```
   This will download all translation files to `public/locales/`

5. **Seed Sanity with sample content** (optional):
   - Log in to your Sanity Studio at `https://your-project.sanity.studio`
   - Create sample services, pricing tiers, team members, etc.

## 🚀 Running the Project

### Development Mode
```bash
npm run dev
```
- Automatically downloads latest translations before starting
- Opens at [http://localhost:3000](http://localhost:3000)
- Hot reload enabled for both Next.js and Sanity content

### Production Build
```bash
npm run build
```
- Downloads latest translations before building
- Creates optimized production bundle
- Includes all static translation files

### Start Production Server
```bash
npm start
```
Serves the production build on port 3000

### Other Commands

**Download Translations Manually**:
```bash
npm run download-translations
```

**Lint Code**:
```bash
npm run lint
```

**Format Code**:
```bash
npm run format
```

**Run Sanity Studio** (if configured):
```bash
cd sanity
npm run dev
```

## 🗄️ Content Management with Sanity CMS

### Architecture
- **English-Only Storage**: All content is stored in Sanity in English
- **Translation via Locize**: English content serves as translation keys in Locize
- **Content Types**: Services, Pricing Tiers, Team Members, Site Settings, Pages

### Content Schemas

#### Service
```typescript
{
  title: string          // "Web Development"
  slug: string           // "web-development"
  description: string    // Service description
  icon: string           // Icon identifier
  features: string[]     // List of features
}
```

#### Pricing Tier
```typescript
{
  name: string           // "Basic", "Pro", "Enterprise"
  price: number          // Base price in USD
  period: string         // "month", "year"
  features: string[]     // List of features
  highlighted: boolean   // Featured plan
}
```

#### Team Member
```typescript
{
  name: string           // "John Doe"
  role: string           // "CEO"
  bio: string            // Biography
  image: Image           // Profile photo
  social: {
    linkedin?: string
    twitter?: string
    github?: string
  }
}
```

### Querying Content
Content is fetched using GROQ queries in `src/sanity/queries.ts`:

```typescript
// Example: Get all services
const services = await client.fetch(`
  *[_type == "service"] | order(_createdAt desc) {
    _id,
    title,
    slug,
    description,
    icon,
    features
  }
`);
```

### Content Workflow
1. **Create/Edit** content in Sanity Studio (English)
2. **Publish** changes in Sanity
3. **Add translations** in Locize dashboard for other languages
4. **Download** latest translations: `npm run download-translations`
5. **Deploy** - content and translations are ready

## 🌍 Translation System (Locize)

### How It Works
1. **Build-Time Downloads**: Translations are downloaded when you run `npm run dev` or `npm run build`
2. **Local Files**: Translations stored in `public/locales/` as static JSON files
3. **Fast Loading**: No runtime API calls - translations served as static assets
4. **Offline Development**: Work offline after initial download

### Auto-Download Scripts
The project automatically downloads translations before starting:

```json
{
  "scripts": {
    "predev": "npm run download-translations",
    "prebuild": "npm run download-translations",
    "download-translations": "node scripts/download-translations.js"
  }
}
```

### Translation Namespaces

| Namespace | Content | Example Keys |
|-----------|---------|--------------|
| `common` | Navigation, buttons, footer | `nav.home`, `button.submit` |
| `home` | Home page content | `hero.title`, `features.title` |
| `services` | Services page | `title`, `description` |
| `pricing` | Pricing page | `billing.monthly`, `cta.button` |
| `about` | About page | `mission.title`, `values.integrity` |
| `contact` | Contact form | `form.name`, `form.email` |
| `sanity` | Sanity CMS content translations | Dynamic keys from Sanity |

### Using Translations in Components

```typescript
'use client';
import { useTranslation } from 'react-i18next';

export default function MyComponent() {
  const { t } = useTranslation('common');
  
  return (
    <Typography>{t('nav.home')}</Typography>
  );
}
```

### Adding New Translations
1. **Add keys in Locize dashboard** or edit JSON files locally
2. **Download updates**: `npm run download-translations`
3. **Use in code**: `t('namespace:key')`

### Supported Languages
- 🇬🇧 **English (en)** - Default language
- 🇩🇪 **German (de)** - Deutsch
- 🇪🇸 **Spanish (es)** - Español  
- 🇫🇷 **French (fr)** - Français

### Translation File Structure
```
public/locales/
├── en/
│   ├── common.json     # 1.5KB - Navigation, UI elements
│   ├── home.json       # 850B - Home page
│   ├── services.json   # 420B - Services page
│   ├── pricing.json    # 380B - Pricing page
│   ├── about.json      # 650B - About page
│   ├── contact.json    # 1.2KB - Contact form
│   └── sanity.json     # Dynamic - CMS content
├── de/ (same structure)
├── es/ (same structure)
└── fr/ (same structure)
```

## 💱 Currency Switching

The currency switcher allows users to toggle between USD and EUR with real-time conversion.

### Features
- **Live Conversion**: Prices automatically converted based on exchange rates
- **Persistent Preference**: Currency choice saved to localStorage
- **Format Localization**: Proper currency symbols and decimal separators
- **Event-Driven**: Custom `currencyChange` event notifies all components

### How It Works
1. User selects currency in `CurrencySwitcher` component
2. Preference saved to localStorage
3. `currencyChange` event dispatched globally
4. Components update prices using conversion rate
5. Format displayed with proper symbols ($ or €)

### Conversion Rates
Current conversion rate: `1 USD = 0.85 EUR`

To update the rate, edit the conversion logic in pricing components:
```typescript
const convertPrice = (usdPrice: number, currency: string) => {
  if (currency === 'EUR') {
    return usdPrice * 0.85; // Update rate here
  }
  return usdPrice;
};
```

### Price Formatting
```typescript
// USD: $99.00
// EUR: €84.15
const formattedPrice = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: currency,
}).format(price);
```

## 🎨 Theming

### Theme Modes
- **Light Mode**: Clean, bright interface with blue primary color
- **Dark Mode**: Eye-friendly dark interface with custom dark palette

### Theme Configuration
Themes are defined in `src/theme/theme.ts`:

```typescript
// Light Theme
palette: {
  mode: 'light',
  primary: { main: '#1976d2' },   // Blue
  secondary: { main: '#dc004e' }, // Pink
  background: {
    default: '#f5f5f5',
    paper: '#ffffff',
  },
}

// Dark Theme
palette: {
  mode: 'dark',
  primary: { main: '#90caf9' },   // Light blue
  secondary: { main: '#f48fb1' }, // Light pink
  background: {
    default: '#121212',
    paper: '#1e1e1e',
  },
}
```

### Customizing Themes
Edit `src/theme/theme.ts` to customize:
- **Colors**: Primary, secondary, error, warning, success
- **Typography**: Font families, sizes, weights
- **Spacing**: Grid spacing, padding, margins
- **Component Styles**: MUI component overrides

### Theme Persistence
Theme preference is automatically saved to localStorage and persists across sessions.

### Using Theme in Components
```typescript
import { useTheme } from '@mui/material/styles';

const theme = useTheme();
const isDark = theme.palette.mode === 'dark';
```

## 📄 Pages

### Home (`/`)
- **Hero Section**: Eye-catching headline with CTA button
- **Features Grid**: Three feature cards showcasing company strengths
- **Services Showcase**: Preview of services (fetched from Sanity)
- **Call-to-Action**: Final conversion section
- **Fully Responsive**: Mobile-optimized layout

### Services (`/services`)
- **Service Grid**: Dynamic service cards from Sanity CMS
- **Rich Content**: Title, description, icon, and features list
- **Hover Effects**: Interactive card animations
- **Translation Ready**: All content translatable via Locize

### Pricing (`/pricing`)
- **Pricing Tiers**: Basic, Professional, Enterprise plans (from Sanity)
- **Billing Toggle**: Monthly/Yearly pricing switch
- **Currency Support**: Prices in USD or EUR with live conversion
- **Highlighted Plan**: Featured "Professional" tier
- **Feature Lists**: Detailed comparison of plan features

### About (`/about`)
- **Mission & Vision**: Company values and goals
- **Statistics**: Key metrics (team size, projects, clients)
- **Team Section**: Team members with photos and bios (from Sanity)
- **Social Links**: LinkedIn, Twitter, GitHub integration
- **Multi-Column Layout**: Responsive grid design

### Contact (`/contact`)
- **Contact Form**: Name, email, subject, message fields
- **Form Validation**: Client-side validation with error messages
- **Contact Information**: Email, phone, address display
- **Working Hours**: Business hours information
- **Two-Column Layout**: Form + info side-by-side on desktop

## 🔧 Key Technical Features

### No Raw HTML Tags
All UI elements use Material-UI components for consistency:
- ✅ `<Box>` instead of `<div>`
- ✅ `<Typography>` instead of `<h1>`, `<p>`, `<span>`
- ✅ `<Stack>` and `<Grid>` for layouts
- ✅ `<Button>`, `<Card>`, `<TextField>` for interactive elements
- ✅ `<Container>` for content wrapping

### Client vs Server Components
- **Server Components** (default): Pages, layouts, static content
- **Client Components** (`'use client'`): Interactive elements, state management
  - `Header`, `Footer`, `ThemeSwitcher`, `LanguageSwitcher`, `CurrencySwitcher`
  - Form components, theme providers

### Persistent User Preferences
All user settings saved to localStorage:
- ✅ **Theme Mode**: `theme-mode` → `light` | `dark`
- ✅ **Language**: `i18nextLng` → `en` | `de` | `es` | `fr`
- ✅ **Currency**: `currency` → `USD` | `EUR`

### Performance Optimizations
- **Static Translation Files**: No runtime API calls for translations
- **Build-Time Downloads**: Translations bundled during build
- **Server Components**: Reduced JavaScript bundle size
- **Image Optimization**: Next.js Image component for Sanity images
- **Code Splitting**: Automatic route-based splitting

## � Responsive Design

The project uses MUI's responsive utilities for all screen sizes:

### Breakpoints
- **xs**: 0px+ (mobile)
- **sm**: 600px+ (tablet)
- **md**: 900px+ (small laptop)
- **lg**: 1200px+ (desktop)
- **xl**: 1536px+ (large desktop)

### Responsive Patterns
```typescript
// Hide on mobile, show on desktop
sx={{ display: { xs: 'none', md: 'block' } }}

// Stack on mobile, row on desktop
<Stack direction={{ xs: 'column', md: 'row' }}>

// Different spacing per breakpoint
sx={{ padding: { xs: 2, sm: 3, md: 4 } }}

// Responsive grid columns
<Grid container spacing={3}>
  <Grid item xs={12} sm={6} md={4}>
```

### Mobile-First Approach
All layouts are designed mobile-first, then enhanced for larger screens.

## 🔐 Environment Variables

### Required Variables

Create a `.env.local` file (never commit this!):

```env
# Sanity CMS Configuration
NEXT_PUBLIC_SANITY_PROJECT_ID=w0sfj1fr
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_sanity_token_here

# Locize Translation Management
NEXT_PUBLIC_LOCIZE_PROJECT_ID=12c4406b-2f1f-437a-ab3d-aa2b3e252bba
LOCIZE_API_KEY=51af8e76-74f4-4bba-9045-eb342c417db6
```

### Variable Usage

| Variable | Used By | Purpose |
|----------|---------|---------|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Client & Server | Sanity project identifier |
| `NEXT_PUBLIC_SANITY_DATASET` | Client & Server | Sanity dataset name |
| `SANITY_API_TOKEN` | Server only | Authenticated Sanity queries |
| `NEXT_PUBLIC_LOCIZE_PROJECT_ID` | Build scripts | Locize project identifier |
| `LOCIZE_API_KEY` | Build scripts | Download translations (not exposed to client) |

### Security Notes
- ✅ `NEXT_PUBLIC_*` variables are exposed to the browser
- ✅ Non-prefixed variables stay server-side only
- ⚠️ Never commit `.env.local` to version control
- ✅ Use `.env.local.example` as a template

## 🚀 Deployment

### Deployment Checklist
- ✅ Set environment variables on hosting platform
- ✅ Ensure `LOCIZE_API_KEY` is set for build-time downloads
- ✅ Run `npm run build` to test locally
- ✅ Verify translation files are downloaded to `public/locales/`
- ✅ Check Sanity content is accessible

### Vercel (Recommended)

1. **Install Vercel CLI**:
   ```bash
   npm install -g vercel
   ```

2. **Add Environment Variables**:
   Go to Project Settings → Environment Variables and add:
   - `NEXT_PUBLIC_SANITY_PROJECT_ID`
   - `NEXT_PUBLIC_SANITY_DATASET`
   - `SANITY_API_TOKEN`
   - `NEXT_PUBLIC_LOCIZE_PROJECT_ID`
   - `LOCIZE_API_KEY`

3. **Deploy**:
   ```bash
   vercel
   ```

4. **Automatic Deployments**:
   Connect your Git repository for automatic deployments on push.

### Netlify

1. **Build Settings**:
   - Build command: `npm run build`
   - Publish directory: `.next`

2. **Environment Variables**:
   Add all required variables in Site Settings → Environment Variables

3. **Deploy**:
   ```bash
   netlify deploy --prod
   ```

### Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .

# Set environment variables
ENV NODE_ENV=production

# Download translations and build
RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]
```

### Translation Files in Deployment

**Option 1: Download on Build** (Recommended)
- Translations downloaded during build via `prebuild` hook
- Requires `LOCIZE_API_KEY` in build environment
- Always gets latest translations
- No need to commit translation files

**Option 2: Commit Translation Files**
- Commit `public/locales/` to repository
- Faster builds (no download needed)
- May have outdated translations
- Remove `public/locales` from `.gitignore`

## 🔧 Configuration Files

### `package.json`
Key scripts:
```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "predev": "npm run download-translations",
    "prebuild": "npm run download-translations",
    "download-translations": "node scripts/download-translations.js"
  }
}
```

### `tsconfig.json`
- **Strict Mode**: Enabled for type safety
- **Path Aliases**: `@/*` maps to `./src/*`
- **JSX**: `preserve` for Next.js
- **Module**: `esnext` with `bundler` resolution

### `next.config.js`
```javascript
{
  reactStrictMode: true,
  compiler: {
    emotion: true // Required for MUI
  },
  images: {
    domains: ['cdn.sanity.io'] // Sanity image CDN
  }
}
```

### `.eslintrc.json`
- Next.js core web vitals
- Prettier integration
- TypeScript rules
- React hooks rules

### `src/i18n/config.ts`
```typescript
i18n
  .use(HttpBackend) // Load from local files
  .use(initReactI18next)
  .init({
    lng: 'en',
    fallbackLng: 'en',
    ns: ['common', 'home', 'services', 'pricing', 'about', 'contact', 'sanity'],
    defaultNS: 'common',
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json'
    }
  });
```

## 📝 Development Workflows

### Adding New Content

#### Add a Service
1. Go to Sanity Studio
2. Create new Service document with title, description, features (in English)
3. Publish in Sanity
4. Add translations in Locize dashboard
5. Run `npm run download-translations`
6. Content appears on Services page in all languages

#### Add a Translation Key
1. **Option A**: Add in Locize dashboard
   - Go to your Locize project
   - Navigate to the appropriate namespace
   - Add new key with translations for all languages
   - Download: `npm run download-translations`

2. **Option B**: Edit local JSON files
   - Edit `public/locales/en/[namespace].json`
   - Add the key and value
   - Upload to Locize or manually translate to other languages

#### Add a New Page
1. Create page file: `src/app/[page-name]/page.tsx`
2. Add to navigation in `src/components/Header.tsx`
3. Add page translations to `common.json` or create new namespace
4. Create Sanity schema if page needs CMS content
5. Update TypeScript types if needed

### Working with Translations

```typescript
// Simple translation
const { t } = useTranslation('common');
<Typography>{t('nav.home')}</Typography>

// With namespace
const { t } = useTranslation('services');
<Typography>{t('title')}</Typography>

// Multiple namespaces
const { t } = useTranslation(['common', 'home']);
<Typography>{t('common:nav.home')}</Typography>

// With variables
t('contact.form.greeting', { name: 'John' })
// Translation: "Hello {{name}}!" → "Hello John!"
```

### Working with Sanity Content

```typescript
// In a server component
import { client } from '@/sanity/client';
import { servicesQuery } from '@/sanity/queries';

export default async function ServicesPage() {
  const services = await client.fetch(servicesQuery);
  
  return (
    <Box>
      {services.map(service => (
        <ServiceCard key={service._id} {...service} />
      ))}
    </Box>
  );
}
```

### Updating Translations
```bash
# Download latest from Locize
npm run download-translations

# Translations auto-download before dev/build
npm run dev    # Downloads first, then starts
npm run build  # Downloads first, then builds
```

## 🐛 Troubleshooting

### Translation Issues

**Problem**: Translations not loading
```bash
# Check if files exist
ls -la public/locales/en/

# Download translations manually
npm run download-translations

# Check environment variables
cat .env.local | grep LOCIZE
```

**Problem**: "Missing required argument projectId"
- Ensure `.env.local` exists with `NEXT_PUBLIC_LOCIZE_PROJECT_ID`
- Check that `LOCIZE_API_KEY` is set
- The download script (`scripts/download-translations.js`) loads these automatically

**Problem**: Translations outdated
```bash
# Force fresh download
npm run download-translations

# Or restart dev server (auto-downloads)
npm run dev
```

### Sanity Issues

**Problem**: Content not appearing
- Verify `NEXT_PUBLIC_SANITY_PROJECT_ID` is correct
- Check content is published in Sanity Studio
- Ensure `SANITY_API_TOKEN` has read permissions

**Problem**: "Cannot read properties of undefined"
- Check GROQ query syntax in `src/sanity/queries.ts`
- Verify content type exists in Sanity
- Add null checks in components

### Build Issues

**Problem**: Build fails with translation download error
```bash
# Check internet connection
ping api.locize.app

# Verify API key
echo $LOCIZE_API_KEY

# Download manually first
npm run download-translations
npm run build
```

**Problem**: TypeScript errors
```bash
# Regenerate types
npm run build

# Check tsconfig.json
cat tsconfig.json
```

### Environment Variables

**Problem**: Variables not working
- Ensure `.env.local` exists (not `.env.local.example`)
- Restart dev server after changing variables
- Check variable names match exactly (case-sensitive)
- Client variables must start with `NEXT_PUBLIC_`

### Performance Issues

**Problem**: Slow page loads
- Check browser console for errors
- Verify translation files are being served statically
- Enable production mode: `npm run build && npm start`
- Check network tab for unnecessary API calls

## 📚 Documentation

### Project Documentation
- **Architecture**: `LOCIZE_LOCAL_WORKFLOW.md` - Complete translation system guide
- **Migration**: `TRANSLATION_MIGRATION_COMPLETE.md` - Migration from runtime to build-time
- **Quick Reference**: `TRANSLATIONS_QUICK_REFERENCE.md` - Daily usage commands
- **Translation Fix**: `TRANSLATION_DOWNLOAD_FIX.md` - Environment variable solution
- **Sanity Architecture**: `SANITY_LOCIZE_ARCHITECTURE.md` - Sanity + Locize integration
- **Refactoring Summary**: `REFACTORING_SUMMARY.md` - Sanity schema changes

### Translation Files
- **Translation README**: `public/locales/README.md` - File structure explanation

### External Resources
- [Next.js Documentation](https://nextjs.org/docs)
- [Material-UI Documentation](https://mui.com/)
- [React i18next](https://react.i18next.com/)
- [Sanity Documentation](https://www.sanity.io/docs)
- [Locize Documentation](https://docs.locize.com/)

## 🤝 Contributing

### Code Style Guidelines
1. **TypeScript**: Use strict typing, avoid `any`
2. **Components**: Use Material-UI components exclusively (no raw HTML)
3. **Translations**: All user-facing text must be translatable
4. **Naming**: Use descriptive names (PascalCase for components, camelCase for functions)
5. **Server/Client**: Mark interactive components with `'use client'`

### Pull Request Process
1. Create feature branch: `git checkout -b feature/my-feature`
2. Make changes following code style
3. Add translations for all new text
4. Test in all supported languages
5. Test in both light and dark themes
6. Update documentation if needed
7. Submit pull request with clear description

### Testing Checklist
- ✅ Works in all 4 languages (EN, DE, ES, FR)
- ✅ Responsive on mobile, tablet, desktop
- ✅ Light and dark themes
- ✅ Both currencies (USD, EUR)
- ✅ No console errors
- ✅ TypeScript builds without errors
- ✅ ESLint passes

## 🎯 Project Highlights

### Content Management
- ✅ **Headless CMS**: Sanity for flexible content management
- ✅ **English-Only Storage**: Simple content model, translations externalized
- ✅ **Visual Editor**: Non-technical users can update content
- ✅ **Structured Content**: Services, pricing, team members, pages

### Translation System
- ✅ **Build-Time Downloads**: No runtime API calls for best performance
- ✅ **Static File Serving**: Translations as fast as any other asset
- ✅ **Professional Management**: Locize dashboard for translators
- ✅ **Auto-Sync**: Downloads latest before dev/build automatically
- ✅ **Offline Development**: Work without internet after initial download

### User Experience
- ✅ **4 Languages**: English, German, Spanish, French
- ✅ **2 Currencies**: USD and EUR with live conversion
- ✅ **2 Themes**: Light and dark mode
- ✅ **Persistent Preferences**: All settings saved to localStorage
- ✅ **Fully Responsive**: Mobile-first design

### Developer Experience
- ✅ **Type Safety**: Full TypeScript coverage
- ✅ **Modern Stack**: Next.js 15, React 18, Material-UI v6
- ✅ **Code Quality**: ESLint, Prettier, strict mode
- ✅ **Fast Development**: Hot reload, auto-downloads
- ✅ **Clear Documentation**: 7+ guide documents

### Performance
- ✅ **Server Components**: Reduced JavaScript bundle
- ✅ **Static Translations**: No translation API latency
- ✅ **Image Optimization**: Next.js Image with Sanity CDN
- ✅ **Code Splitting**: Automatic route-based splitting
- ✅ **Build Optimization**: Production-ready builds

## 📊 Project Statistics

- **Languages**: 4 (EN, DE, ES, FR)
- **Translation Namespaces**: 7
- **Sanity Content Types**: 5
- **Pages**: 5 (Home, Services, Pricing, About, Contact)
- **Components**: 10+ reusable components
- **Translation Keys**: 100+ across all namespaces
- **Supported Currencies**: 2 (USD, EUR)

## 🔄 Workflow Summary

### Daily Development
```bash
# Start dev server (auto-downloads translations)
npm run dev

# Make changes to code
# Edit content in Sanity Studio
# Add translations in Locize dashboard

# Refresh to see changes
```

### Content Updates
```bash
# 1. Edit content in Sanity (English)
# 2. Add translations in Locize
# 3. Download latest translations
npm run download-translations
```

### Production Deployment
```bash
# Build (auto-downloads latest translations)
npm run build

# Test production build locally
npm start

# Deploy to hosting platform
vercel deploy --prod
```

## 📄 License

This project is for demonstration purposes.

## 👨‍💻 Author

Built as a demonstration of modern web development practices using:
- Next.js 15 (App Router)
- Material-UI v6
- Sanity CMS
- Locize Translation Management
- TypeScript

## 🙏 Acknowledgments

- **Next.js Team** - Amazing React framework
- **Material-UI Team** - Comprehensive component library  
- **Sanity** - Flexible headless CMS
- **Locize** - Professional translation management
- **React Team** - React 18 and Server Components

---

**🚀 Ready to start?** Run `npm install && npm run dev` and open [http://localhost:3000](http://localhost:3000)

**📖 Need help?** Check the documentation files or open an issue.

**🌟 Built with modern web technologies for optimal performance and developer experience!**
