import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'navigation',
  title: 'Navigation',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Navigation Title',
      type: 'string',
      description: 'Internal name for this navigation (e.g., "Main Menu", "Footer Menu")',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'identifier',
      title: 'Identifier',
      type: 'slug',
      description: 'Unique identifier (e.g., main-menu, footer-menu)',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'items',
      title: 'Navigation Items',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'navItem',
          title: 'Navigation Item',
          fields: [
            {
              name: 'label',
              title: 'Label',
              type: 'string',
              description: 'Navigation label in English (translations via Locize)',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'translationKey',
              title: 'Translation Key',
              type: 'string',
              description: 'Locize translation key (e.g., nav.home, nav.services)',
              placeholder: 'nav.home',
            },
            {
              name: 'linkType',
              title: 'Link Type',
              type: 'string',
              options: {
                list: [
                  { title: 'Internal Link', value: 'internal' },
                  { title: 'External Link', value: 'external' },
                  { title: 'No Link (Dropdown Parent)', value: 'none' },
                ],
                layout: 'radio',
              },
              initialValue: 'internal',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'internalLink',
              title: 'Internal Link',
              type: 'string',
              description: 'Internal route path (e.g., /, /services, /about)',
              hidden: ({ parent }) => parent?.linkType !== 'internal',
              placeholder: '/services',
            },
            {
              name: 'externalLink',
              title: 'External Link',
              type: 'url',
              description: 'Full URL for external links',
              hidden: ({ parent }) => parent?.linkType !== 'external',
              placeholder: 'https://example.com',
            },
            {
              name: 'openInNewTab',
              title: 'Open in New Tab',
              type: 'boolean',
              initialValue: false,
              hidden: ({ parent }) => parent?.linkType === 'none',
            },
            {
              name: 'icon',
              title: 'Icon Name',
              type: 'string',
              description: 'MUI icon name (optional, e.g., Home, Info, ContactMail)',
              placeholder: 'Home',
            },
            {
              name: 'order',
              title: 'Display Order',
              type: 'number',
              description: 'Order of appearance (lower numbers first)',
              initialValue: 0,
            },
            {
              name: 'showInHeader',
              title: 'Show in Header',
              type: 'boolean',
              initialValue: true,
            },
            {
              name: 'showInFooter',
              title: 'Show in Footer',
              type: 'boolean',
              initialValue: false,
            },
            {
              name: 'children',
              title: 'Sub-Menu Items',
              type: 'array',
              description: 'Dropdown/nested menu items',
              of: [
                {
                  type: 'object',
                  name: 'subNavItem',
                  title: 'Sub-Menu Item',
                  fields: [
                    {
                      name: 'label',
                      title: 'Label',
                      type: 'string',
                      description: 'Sub-menu label in English',
                      validation: (Rule) => Rule.required(),
                    },
                    {
                      name: 'translationKey',
                      title: 'Translation Key',
                      type: 'string',
                      description: 'Locize translation key',
                      placeholder: 'nav.services.web',
                    },
                    {
                      name: 'linkType',
                      title: 'Link Type',
                      type: 'string',
                      options: {
                        list: [
                          { title: 'Internal Link', value: 'internal' },
                          { title: 'External Link', value: 'external' },
                        ],
                        layout: 'radio',
                      },
                      initialValue: 'internal',
                    },
                    {
                      name: 'internalLink',
                      title: 'Internal Link',
                      type: 'string',
                      hidden: ({ parent }) => parent?.linkType !== 'internal',
                      placeholder: '/services/web-development',
                    },
                    {
                      name: 'externalLink',
                      title: 'External Link',
                      type: 'url',
                      hidden: ({ parent }) => parent?.linkType !== 'external',
                    },
                    {
                      name: 'icon',
                      title: 'Icon Name',
                      type: 'string',
                      placeholder: 'Web',
                    },
                    {
                      name: 'order',
                      title: 'Display Order',
                      type: 'number',
                      initialValue: 0,
                    },
                  ],
                  preview: {
                    select: {
                      title: 'label',
                      link: 'internalLink',
                    },
                    prepare({ title, link }) {
                      return {
                        title: title,
                        subtitle: link || 'External link',
                      };
                    },
                  },
                },
              ],
            },
          ],
          preview: {
            select: {
              title: 'label',
              linkType: 'linkType',
              internalLink: 'internalLink',
              externalLink: 'externalLink',
              order: 'order',
            },
            prepare({ title, linkType, internalLink, externalLink, order }) {
              let subtitle = '';
              if (linkType === 'internal') {
                subtitle = internalLink || 'Internal';
              } else if (linkType === 'external') {
                subtitle = externalLink || 'External';
              } else {
                subtitle = 'Dropdown Parent';
              }
              return {
                title: `${order}. ${title}`,
                subtitle: subtitle,
              };
            },
          },
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      identifier: 'identifier.current',
    },
    prepare({ title, identifier }) {
      return {
        title: title,
        subtitle: identifier || 'No identifier',
      };
    },
  },
});
