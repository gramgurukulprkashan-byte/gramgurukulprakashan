import { defineField, defineType } from 'sanity';

export const roleType = defineType({
  name: 'role',
  title: 'पारंपरिक भूमिकाएँ (Traditional Roles)',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'भूमिका का नाम',
      type: 'string',
      description: 'उदा. बड़वा, तड़वी, कोटवाल, पुजारा, वार्तिया, वातड़िया, होयणपणी',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'स्लग',
      type: 'slug',
      options: { source: 'name', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'भूमिका का संक्षिप्त परिचय',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'responsibilities',
      title: 'पारंपरिक दायित्व एवं कार्य',
      type: 'text',
      rows: 4,
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'description',
    },
  },
});
