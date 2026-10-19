import { defineField, defineType } from 'sanity';

export const historyEntryType = defineType({
  name: 'historyEntry',
  title: 'भील समाज का इतिहास (History Entries)',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'घटना / विषय का शीर्षक',
      type: 'string',
      description: 'उदा. मानगढ़ नरसंहार, टंट्या भील, भील विद्रोह',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'स्लग',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'श्रेणी (Category)',
      type: 'string',
      options: {
        list: [
          { title: 'स्वतंत्रता संग्राम', value: 'स्वतंत्रता संग्राम' },
          { title: 'प्राचीन इतिहास', value: 'प्राचीन इतिहास' },
          { title: 'नायक एवं वीरांगनाएँ', value: 'नायक एवं वीरांगनाएँ' },
          { title: 'ऐतिहासिक स्थल', value: 'ऐतिहासिक स्थल' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'content',
      title: 'विस्तृत ऐतिहासिक विवरण',
      type: 'text',
      rows: 8,
    }),
    defineField({
      name: 'sources',
      title: 'ऐतिहासिक स्रोत / संदर्भ',
      type: 'text',
      rows: 3,
      description: 'पुस्तकों, अभिलेखों या गजेटियर के संदर्भ',
    }),
    defineField({
      name: 'verified',
      title: 'क्या यह तथ्य व आँकड़ा क्लाइंट द्वारा प्रमाणित है?',
      type: 'boolean',
      initialValue: false,
      description: 'उदा. मानगढ़ का 1507 का आँकड़ा प्रमाणित होने पर टिक करें',
    }),
    defineField({
      name: 'images',
      title: 'चित्र एवं अभिलेख',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'category',
      media: 'images.0',
    },
  },
});
