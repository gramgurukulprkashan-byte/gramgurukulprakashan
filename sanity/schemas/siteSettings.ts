import { defineField, defineType } from 'sanity';

export const siteSettingsType = defineType({
  name: 'siteSettings',
  title: 'वेबसाइट सेटिंग्स (Site Settings)',
  type: 'document',
  fields: [
    defineField({
      name: 'slogan',
      title: 'मुख्य नारा (Slogan)',
      type: 'string',
      description: 'उदा. "जो बांचेगा वही बचेगा"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'missionStatement',
      title: 'उद्देश्य / ध्येय वाक्य (Mission Statement)',
      type: 'text',
      rows: 3,
      description: 'संस्था का मुख्य ध्येय और दृष्टिकोण',
    }),
    defineField({
      name: 'counters',
      title: 'मुख्य आँकड़े (Counters)',
      type: 'object',
      fields: [
        defineField({ name: 'villages', title: 'गाँवों की संख्या', type: 'number', initialValue: 900 }),
        defineField({ name: 'booksPublished', title: 'प्रकाशित पुस्तकें', type: 'number', initialValue: 2 }),
        defineField({ name: 'activeReaders', title: 'सक्रिय पाठक', type: 'number', initialValue: 5000 }),
      ],
    }),
    defineField({
      name: 'socialLinks',
      title: 'सोशल मीडिया लिंक (Social Links)',
      type: 'object',
      fields: [
        defineField({ name: 'instagram', title: 'इंस्टाग्राम URL', type: 'url' }),
        defineField({ name: 'facebook', title: 'फेसबुक URL', type: 'url' }),
        defineField({ name: 'linktree', title: 'लिंकट्री URL', type: 'url' }),
      ],
    }),
    defineField({
      name: 'email',
      title: 'आधिकारिक ईमेल (Email)',
      type: 'string',
      initialValue: 'gramgurukulprakashan@gmail.com',
    }),
    defineField({
      name: 'phone',
      title: 'संपर्क फोन नम्बर (Phone)',
      type: 'string',
    }),
    defineField({
      name: 'address',
      title: 'कार्यालय का पता (Address)',
      type: 'text',
      rows: 2,
    }),
  ],
});
