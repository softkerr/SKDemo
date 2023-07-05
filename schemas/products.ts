import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'product',
  title: 'Products',
  type: 'document',
  fields: [
    defineField({
      name: 'productId',
      title: 'Product ID',
      type: 'slug',
      description: 'Unique identifier for the product (e.g., landing-page)',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'name',
      title: 'Product Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Web Design', value: 'web-design' },
          { title: 'Development', value: 'development' },
          { title: 'Marketing', value: 'marketing' },
          { title: 'SEO', value: 'seo' },
          { title: 'Maintenance', value: 'maintenance' },
          { title: 'Consulting', value: 'consulting' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'pricing',
      title: 'Pricing',
      type: 'object',
      fields: [
        {
          name: 'usd',
          title: 'USD Price',
          type: 'number',
          validation: (Rule) => Rule.required().positive(),
        },
        {
          name: 'eur',
          title: 'EUR Price',
          type: 'number',
          validation: (Rule) => Rule.required().positive(),
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'originalPricing',
      title: 'Original Pricing (for discounts)',
      type: 'object',
      fields: [
        { name: 'usd', type: 'number', title: 'USD Original' },
        { name: 'eur', type: 'number', title: 'EUR Original' },
      ],
    }),
    defineField({
      name: 'features',
      title: 'Features',
      type: 'array',
      of: [{ type: 'string' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'badge',
      title: 'Badge',
      type: 'string',
      options: {
        list: [
          { title: 'None', value: '' },
          { title: 'Popular', value: 'Popular' },
          { title: 'Best Value', value: 'Best Value' },
          { title: 'New', value: 'New' },
          { title: 'Essential', value: 'Essential' },
        ],
      },
    }),
    defineField({
      name: 'deliveryTime',
      title: 'Delivery Time',
      type: 'string',
    }),
    defineField({
      name: 'billingCycle',
      title: 'Billing Cycle',
      type: 'string',
      options: {
        list: [
          { title: 'One-time', value: 'one-time' },
          { title: 'Monthly', value: 'monthly' },
          { title: 'Yearly', value: 'yearly' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'isRecurring',
      title: 'Is Recurring',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'image',
      title: 'Product Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'isActive',
      title: 'Is Active',
      type: 'boolean',
      initialValue: true,
      description: 'Inactive products will not be shown in the shop',
    }),
    defineField({
      name: 'sortOrder',
      title: 'Sort Order',
      type: 'number',
      description: 'Lower numbers appear first',
      initialValue: 0,
    }),
  ],
  preview: {
    select: {
      title: 'name.en',
      subtitle: 'category',
      media: 'image',
    },
    prepare(selection) {
      const { title, subtitle } = selection;
      return {
        title: title,
        subtitle: subtitle?.toUpperCase(),
      };
    },
  },
});
