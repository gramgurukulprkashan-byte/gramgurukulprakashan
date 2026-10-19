import { defineField, defineType } from 'sanity';

export const traditionType = defineType({
  name: 'tradition',
  title: 'संस्कृति और परंपराएँ (Traditions)',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'परंपरा का नाम',
      type: 'string',
      description: 'उदा. हलमा, मातावन, भिड़हा, नवाई, जातर, सलावणी, फाळा, नौतरां',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'स्लग (URL पहचानकर्ता)',
      type: 'slug',
      options: { source: 'name', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'meaning',
      title: 'परंपरा का अर्थ एवं परिभाषा',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'process',
      title: 'परंपरा की विधि और प्रक्रिया',
      type: 'text',
      rows: 5,
    }),
    defineField({
      name: 'socialImportance',
      title: 'सामाजिक महत्व',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'lesson',
      title: 'आज के समाज के लिए सीख',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'photos',
      title: 'छायाचित्र (Photos)',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
    }),
    defineField({
      name: 'mediaEmbed',
      title: 'ऑडियो / वीडियो लिंक (YouTube या अन्य)',
      type: 'url',
    }),
    defineField({
      name: 'contributor',
      title: 'प्रमाणित करने वाले बुज़ुर्ग / संकलनकर्ता',
      type: 'string',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'meaning',
      media: 'photos.0',
    },
  },
});
