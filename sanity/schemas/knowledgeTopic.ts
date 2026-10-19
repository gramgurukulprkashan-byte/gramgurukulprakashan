import { defineField, defineType } from 'sanity';

export const knowledgeTopicType = defineType({
  name: 'knowledgeTopic',
  title: 'परंपरागत ज्ञान (Traditional Knowledge Topics)',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'ज्ञान का विषय / शीर्षक',
      type: 'string',
      description: 'उदा. देसी बीज और जैव विविधता, वर्षा का पूर्वानुमान, जड़ी-बूटियाँ',
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
      name: 'traditionalKnowledge',
      title: 'गाँव का परंपरागत ज्ञान',
      type: 'text',
      rows: 5,
      description: 'गाँव के बुजुर्ग और परंपरा क्या सिखाती है',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'modernScience',
      title: 'आधुनिक विज्ञान का दृष्टिकोण',
      type: 'text',
      rows: 5,
      description: 'आधुनिक विज्ञान इसके बारे में क्या कहता है',
    }),
    defineField({
      name: 'similarities',
      title: 'समानताएँ (Where They Agree)',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'differences',
      title: 'अंतर / पूरक दृष्टिकोण',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'uses',
      title: 'दैनिक जीवन में उपयोग',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'images',
      title: 'चित्र (Photos)',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'images.0',
    },
  },
});
