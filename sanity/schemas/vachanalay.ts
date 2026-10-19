import { defineField, defineType } from 'sanity';

export const vachanalayType = defineType({
  name: 'vachanalay',
  title: 'ग्राम वाचनालय (Village Libraries)',
  type: 'document',
  fields: [
    defineField({
      name: 'village',
      title: 'गाँव का नाम',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'block',
      title: 'विकासखंड (Block)',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'district',
      title: 'ज़िला (District)',
      type: 'string',
      initialValue: 'झाबुआ',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'note',
      title: 'विशेष टिप्पणी / स्थिति',
      type: 'string',
      placeholder: 'उदा. सक्रिय वाचनालय, नई पुस्तकें उपलब्ध',
    }),
    defineField({
      name: 'photos',
      title: 'वाचनालय के चित्र',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
    }),
  ],
  preview: {
    select: {
      title: 'village',
      subtitle: 'block',
    },
  },
});
