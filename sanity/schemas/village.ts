import { defineField, defineType } from 'sanity';

export const villageType = defineType({
  name: 'village',
  title: 'ग्राम एटलस — गाँव (Villages)',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'गाँव का नाम',
      type: 'string',
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
      name: 'district',
      title: 'ज़िला',
      type: 'string',
      initialValue: 'झाबुआ',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'block',
      title: 'विकासखंड',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'nameStory',
      title: 'गाँव के नामकरण की कहानी',
      type: 'text',
      rows: 4,
      description: 'गाँव का नाम कैसे पड़ा? लोककथा या ऐतिहासिक संदर्भ',
    }),
    defineField({
      name: 'settlementHistory',
      title: 'गाँव के बसने का इतिहास',
      type: 'text',
      rows: 4,
      description: 'गाँव कब और कैसे बसा? पहले कौन परिवार आकर बसे?',
    }),
    defineField({
      name: 'riversAndPonds',
      title: 'नदियाँ, नाले एवं तालाब',
      type: 'text',
      rows: 3,
      description: 'गाँव के प्रमुख जलस्रोत और उनका महत्व',
    }),
    defineField({
      name: 'plantsAndAnimals',
      title: 'स्थानीय पेड़-पौधे और जीव-जंतु',
      type: 'text',
      rows: 3,
      description: 'स्थानीय वनस्पति और वन्यजीव',
    }),
    defineField({
      name: 'grazingAreas',
      title: 'चरागाह एवं गोचर भूमि',
      type: 'text',
      rows: 3,
      description: 'पशुओं के चरने की जगह और उनकी स्थिति',
    }),
    defineField({
      name: 'traditionalSystem',
      title: 'पारंपरिक प्रशासनिक व्यवस्था',
      type: 'text',
      rows: 3,
      description: 'तड़वी, पटेल या बुजुर्गों की निर्णय प्रक्रिया',
    }),
    defineField({
      name: 'traditionsAndFestivals',
      title: 'गाँव के प्रमुख त्यौहार और परंपराएँ',
      type: 'text',
      rows: 3,
      description: 'गाँव में मनाए जाने वाले विशेष मेले, जातर या त्यौहार',
    }),
    defineField({
      name: 'photos',
      title: 'गाँव के छायाचित्र (Photos)',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
    }),
    defineField({
      name: 'contributor',
      title: 'जानकारी देने वाले / संकलनकर्ता का नाम',
      type: 'string',
      placeholder: 'उदा. गाँव के बुजुर्ग या स्थानीय युवा',
    }),
    defineField({
      name: 'lat',
      title: 'अक्षांश (Latitude)',
      type: 'number',
    }),
    defineField({
      name: 'lng',
      title: 'देशांतर (Longitude)',
      type: 'number',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'block',
      media: 'photos.0',
    },
  },
});
