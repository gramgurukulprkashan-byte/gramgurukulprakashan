import { defineField, defineType } from 'sanity';

export const bookType = defineType({
  name: 'book',
  title: 'पुस्तक एवं प्रकाशन (Books)',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'पुस्तक का नाम',
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
      name: 'author',
      title: 'लेखक / संपादक / संकलनकर्ता',
      type: 'string',
      initialValue: 'ग्राम गुरुकुल प्रकाशन',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subject',
      title: 'विषय',
      type: 'string',
      description: 'उदा. सामाजिक विज्ञान, इतिहास एवं भूगोल, स्थानीय संस्कृति',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'status',
      title: 'प्रकाशन स्थिति',
      type: 'string',
      options: {
        list: [
          { title: 'प्रकाशित (उपलब्ध)', value: 'प्रकाशित' },
          { title: 'निर्माणाधीन (शीघ्र उपलब्ध)', value: 'निर्माणाधीन' },
          { title: 'आउट ऑफ प्रिंट', value: 'समाप्त' },
        ],
      },
      initialValue: 'निर्माणाधीन',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'publishDate',
      title: 'प्रकाशन वर्ष / माह',
      type: 'string',
      placeholder: 'उदा. 2024 या शीघ्र',
    }),
    defineField({
      name: 'cover',
      title: 'पुस्तक का मुखपृष्ठ (Cover Image)',
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
      name: 'description',
      title: 'पुस्तक का विवरण एवं परिचय',
      type: 'text',
      rows: 5,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'samplePages',
      title: 'नमूना पृष्ठों के चित्र',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
    }),
    defineField({
      name: 'samplePdf',
      title: 'नमूना पीडीएफ या संपूर्ण पुस्तक (वैकल्पिक)',
      type: 'file',
      options: { accept: '.pdf' },
    }),
    defineField({
      name: 'allowDownload',
      title: 'क्या पाठक सीधे डाउनलोड कर सकते हैं?',
      type: 'boolean',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'status',
      media: 'cover',
    },
  },
});
