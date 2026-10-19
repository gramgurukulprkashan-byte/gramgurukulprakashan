import { defineField, defineType } from 'sanity';

export const libraryStoryType = defineType({
  name: 'libraryStory',
  title: 'वाचनालय से कहानियाँ एवं अनुभव (Library Stories)',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'कहानी का शीर्षक',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'author',
      title: 'पाठक / लेखक का नाम',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'village',
      title: 'गाँव का नाम',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'body',
      title: 'अनुभव या कहानी का पूरा विवरण',
      type: 'text',
      rows: 6,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'photo',
      title: 'पाठक या गतिविधि का फ़ोटो',
      type: 'image',
      options: { hotspot: true },
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'author',
      media: 'photo',
    },
  },
});
