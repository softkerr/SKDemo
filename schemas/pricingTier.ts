import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'pricingTier',
  title: 'Pricing Tier',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Plan Name',
      type: 'string',
      description: 'Plan name in English (translations via Locize)',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'Plan description in English (translations via Locize)',
    }),
    defineField({
      name: 'priceUSD',
      title: 'Price (USD)',
      type: 'number',
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: 'priceEUR',
      title: 'Price (EUR)',
      type: 'number',
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: 'features',
      title: 'Features',
      type: 'array',
      description: 'Feature list in English (translations via Locize)',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'popular',
      title: 'Popular Plan',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      initialValue: 0,
    }),
    defineField({
      name: 'buttonText',
      title: 'Button Text',
      type: 'string',
      description: 'CTA button text in English (translations via Locize)',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      priceUSD: 'priceUSD',
      popular: 'popular',
    },
    prepare({ title, priceUSD, popular }) {
      return {
        title: title,
        subtitle: `$${priceUSD}/month${popular ? ' (Popular)' : ''}`,
      };
    },
  },
});
