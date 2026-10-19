import { defineField, defineType } from 'sanity';

export const noticeType = defineType({
  name: 'notice',
  title: 'सूचना एवं समाचार (Notices)',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'सूचना का शीर्षक',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'स्लग (URL पहचानकर्ता)',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'publishDate',
      title: 'प्रकाशन तिथि',
      type: 'date',
      options: { dateFormat: 'YYYY-MM-DD' },
      initialValue: () => new Date().toISOString().split('T')[0],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'important',
      title: 'क्या यह महत्वपूर्ण सूचना है? (Pin / Highlight)',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'description',
      title: 'विस्तृत विवरण',
      type: 'text',
      rows: 6,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'संबंधित चित्र (वैकल्पिक)',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'चित्र का विवरण (Alt Text)',
          type: 'string',
        }),
      ],
    }),
    defineField({
      name: 'pdf',
      title: 'संलग्न पीडीएफ दस्तावेज़ (वैकल्पिक)',
      type: 'file',
      options: { accept: '.pdf' },
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'publishDate',
      media: 'image',
    },
  },
});
