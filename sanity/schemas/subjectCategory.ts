import { defineField, defineType } from 'sanity';

export const subjectCategoryType = defineType({
  name: 'subjectCategory',
  title: 'वाचनालय विषय श्रेणियाँ (Library Subjects)',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'विषय का नाम',
      type: 'string',
      description: 'उदा. खेती एवं कृषि, पशुपालन, स्वास्थ्य, इतिहास, लोककथाएँ (कुल 14 विषय)',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'icon',
      title: 'प्रतीक चिन्ह (Emoji / Icon)',
      type: 'string',
      placeholder: '🌾, 🐄, 💊, 📜',
    }),
    defineField({
      name: 'description',
      title: 'विषय का संक्षिप्त परिचय',
      type: 'text',
      rows: 2,
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'icon',
    },
  },
});
