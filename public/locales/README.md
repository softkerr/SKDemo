# Translation Files

This directory contains translation files for the application.

## Structure

```
locales/
├── en/          English (default)
├── de/          German
├── es/          Spanish
└── fr/          French
```

## Namespaces

Each language folder contains the following namespace files:

- **common.json** - Navigation, buttons, footer, general UI
- **home.json** - Homepage content
- **services.json** - Services page
- **pricing.json** - Pricing page
- **about.json** - About page
- **contact.json** - Contact page
- **sanity.json** - Sanity CMS content translations

## Source of Truth

These files are **downloaded from Locize** during development and build:

```bash
npm run download-translations
```

## Manual Management

If you prefer to manage translations manually (without Locize):

1. Edit the JSON files directly in this directory
2. Remove the `predev` and `prebuild` scripts from `package.json`
3. Commit the `/public/locales` directory to git

## Adding New Translations

### Via Locize (Recommended)

1. Log in to [Locize Dashboard](https://www.locize.app/)
2. Add/edit translations in the web interface
3. Run `npm run download-translations` to sync
4. Commit changes if keeping translations in git

### Manually

1. Edit the JSON files in this directory
2. Follow the existing structure
3. Ensure all languages have the same keys
4. Test in the application

## Translation Keys

Use dot notation to access nested keys:

```typescript
const { t } = useTranslation('common');

// Access: common.navigation.home
t('navigation.home')

// Access: common.footer.copyright
t('footer.copyright', { year: 2025, company: 'YourCo' })
```

## Sanity Integration

The `sanity.json` namespace is special:

- English text from Sanity CMS becomes translation keys
- Add Sanity content to this file for translation
- Example: `t(service.title)` where `service.title = "Web Development"`

## Best Practices

1. **Consistent Structure** - All languages should have identical key structure
2. **Descriptive Keys** - Use clear, meaningful key names
3. **Interpolation** - Use `{{variable}}` for dynamic content
4. **Namespaces** - Keep translations organized by page/feature
5. **Pluralization** - Use i18next pluralization for countable items

## Need Help?

See [LOCIZE_LOCAL_WORKFLOW.md](../../../LOCIZE_LOCAL_WORKFLOW.md) for complete documentation.
