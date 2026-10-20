/**
 * ग्रामगुरुकुल प्रकाशन — Sanity Seed Script
 * 
 * चलाने के लिए:
 *   npx tsx sanity/seed.ts
 * 
 * आवश्यक पर्यावरण चर (.env.local):
 *   NEXT_PUBLIC_SANITY_PROJECT_ID
 *   NEXT_PUBLIC_SANITY_DATASET
 *   SANITY_API_TOKEN (write permissions आवश्यक)
 */

import { createClient } from '@sanity/client';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const token = process.env.SANITY_API_TOKEN;

if (!projectId || !token || projectId === 'placeholder') {
  console.error('❌ त्रुटि: कृपया .env.local में NEXT_PUBLIC_SANITY_PROJECT_ID और SANITY_API_TOKEN दर्ज करें।');
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2024-01-01',
  token,
  useCdn: false,
});

async function seed() {
  console.log('🌱 ग्रामगुरुकुल प्रकाशन डेटाबेस सीडिंग प्रारंभ...\n');

  // 1. Site Settings
  console.log('1. मुख्य साइट सेटिंग्स दर्ज की जा रही हैं...');
  await client.createOrReplace({
    _id: 'siteSettings',
    _type: 'siteSettings',
    slogan: 'जो बांचेगा वही बचेगा',
    missionStatement: 'गाँव का ज्ञान, गाँव के लिए — भील समाज की संस्कृति, परंपराओं और स्थानीय ज्ञान को सहेजने और नई पीढ़ी तक पहुँचाने का संकल्प।',
    counters: {
      villages: 900,
      booksPublished: 2,
      activeReaders: 5000,
    },
    socialLinks: {
      instagram: 'https://instagram.com/gramgurukulprakashan',
      facebook: 'https://facebook.com/gramgurukulprakashan',
      linktree: 'https://linktr.ee/gramgurukulprakashan',
    },
    email: 'gramgurukulprakashan@gmail.com',
    phone: '+91 96852 71507',
    address: 'शिवगंगा गुरुकुल, धरमपुरी, ज़िला — झाबुआ (मध्य प्रदेश)',
  });

  // 2. Notices
  console.log('2. सूचनाएँ जोड़ी जा रही हैं...');
  const notices = [
    {
      _id: 'notice-1',
      _type: 'notice',
      title: 'ग्राम वाचनालय विस्तार अभियान — 50 नए गाँवों में शुरुआत',
      slug: { _type: 'slug', current: 'gram-vachanalay-vistar-50-gaon' },
      publishDate: '2024-03-01',
      important: true,
      description: 'झाबुआ जिले के 50 नए गाँवों में ग्राम वाचनालय की पेटियाँ पहुँचाई जा रही हैं। स्थानीय युवा और बुजुर्ग मिलकर वाचनालय का संचालन करेंगे।',
    },
    {
      _id: 'notice-2',
      _type: 'notice',
      title: "'मेरा जिला' पुस्तक का प्रथम प्रारूप तैयार — शिक्षकों से सुझाव आमंत्रित",
      slug: { _type: 'slug', current: 'mera-jila-praroop-sujhav' },
      publishDate: '2024-02-15',
      important: false,
      description: 'कक्षा 6 के लिए झाबुआ ज़िले पर केंद्रित सामाजिक विज्ञान की पुस्तक "मेरा जिला — भाग 1" का प्रारूप तैयार है। शिक्षक एवं शोधार्थी अपने सुझाव भेज सकते हैं।',
    },
    {
      _id: 'notice-3',
      _type: 'notice',
      title: 'भील समाज की परंपराओं के संकलन हेतु गाँव-गाँव संवाद',
      slug: { _type: 'slug', current: 'bhil-parampara-samvad-jhabua' },
      publishDate: '2024-01-20',
      important: false,
      description: 'हलमा, मातावन, फाळा जैसी पारंपरिक व्यवस्थाओं के दस्तावेज़ीकरण हेतु टीम गाँवों का दौरा कर रही है।',
    },
  ];
  for (const n of notices) {
    await client.createOrReplace(n);
  }

  // 3. Books
  console.log('3. पुस्तकें जोड़ी जा रही हैं...');
  const books: any[] = [
    {
      _id: 'book-1',
      _type: 'book',
      title: 'मेरा जिला — भाग 1',
      slug: { _type: 'slug', current: 'mera-jila-bhag-1' },
      subject: 'सामाजिक विज्ञान',
      status: 'निर्माणाधीन',
      publishDate: '2024 (शीघ्र प्रकाशित)',
      allowDownload: true,
      description: 'कक्षा 6 के बच्चों के लिए विशेष रूप से तैयार सामाजिक विज्ञान की पुस्तक, जो झाबुआ ज़िले के भूगोल, इतिहास, संस्कृति और जनजीवन को केंद्र में रखती है।',
    },
    {
      _id: 'book-2',
      _type: 'book',
      title: 'ग्राम एटलस — झाबुआ',
      slug: { _type: 'slug', current: 'gram-atlas-jhabua' },
      author: 'ग्रामगुरुकुल प्रकाशन',
      subject: 'इतिहास एवं भूगोल',
      status: 'निर्माणाधीन',
      publishDate: '2024 (शीघ्र प्रकाशित)',
      allowDownload: true,
      description: 'झाबुआ ज़िले के प्रत्येक गाँव का दस्तावेज़ — गाँव का नाम कैसे पड़ा, नदियाँ, पहाड़, कुल-गोत्र और पारंपरिक व्यवस्था।',
    },
  ];
  for (const b of books) {
    await client.createOrReplace(b);
  }

  // 4. Vachanalay
  console.log('4. ग्राम वाचनालय सूचियाँ जोड़ी जा रही हैं...');
  const vachanalays = [
    { _id: 'vachanalay-1', _type: 'vachanalay', village: 'चंद्रगढ़', block: 'झाबुआ', district: 'झाबुआ', note: 'सक्रिय वाचनालय' },
    { _id: 'vachanalay-2', _type: 'vachanalay', village: 'मेघनगर', block: 'मेघनगर', district: 'झाबुआ', note: 'नियमित पाठक बैठकें' },
    { _id: 'vachanalay-3', _type: 'vachanalay', village: 'थांदला', block: 'थांदला', district: 'झाबुआ', note: 'नई पुस्तकें उपलब्ध' },
    { _id: 'vachanalay-4', _type: 'vachanalay', village: 'पेटलावद', block: 'पेटलावद', district: 'झाबुआ', note: 'सक्रिय वाचनालय' },
    { _id: 'vachanalay-5', _type: 'vachanalay', village: 'राणापुर', block: 'राणापुर', district: 'झाबुआ', note: 'सक्रिय वाचनालय' },
    { _id: 'vachanalay-6', _type: 'vachanalay', village: 'रामा', block: 'रामा', district: 'झाबुआ', note: 'सक्रिय वाचनालय' },
  ];
  for (const v of vachanalays) {
    await client.createOrReplace(v);
  }

  // 5. Villages (Atlas)
  console.log('5. ग्राम एटलस के गाँव जोड़े जा रहे हैं...');
  const villages = [
    {
      _id: 'village-chandragarh',
      _type: 'village',
      name: 'चंद्रगढ़',
      slug: { _type: 'slug', current: 'chandragarh' },
      district: 'झाबुआ',
      block: 'झाबुआ',
      nameStory: 'चंद्रगढ़ झाबुआ ज़िले का एक ऐतिहासिक एवं सांस्कृतिक रूप से समृद्ध गाँव है, जो अपनी प्राचीन पहाड़ियों और प्राकृतिक परिवेश के लिए जाना जाता है।',
      settlementHistory: 'यहाँ भील समाज की पीढ़ियाँ सदियों से कृषि और वनोपज संकलन से जीवन यापन कर रही हैं।',
      riversAndPonds: 'गाँव के पास से एक मौसमी नाला बहता है जो आगे चलकर अनास नदी में मिलता है।',
      plantsAndAnimals: 'महुआ, ताड़, नीम, पलाश के वृक्ष बहुतायत में पाए जाते हैं।',
      grazingAreas: 'गाँव की साझा गोचर भूमि जहाँ पशुओं के चरने की पारंपरिक व्यवस्था है।',
      traditionalSystem: 'तड़वी और बुजुर्गों की पंचायत द्वारा आपसी विवादों का निपटारा किया जाता है।',
      traditionsAndFestivals: 'भगोरिया, जातर और नवाई धूमधाम से मनाए जाते हैं।',
      contributor: 'चंद्रगढ़ ग्रामवासी एवं युवा साथी',
    },
    {
      _id: 'village-meghnagar',
      _type: 'village',
      name: 'मेघनगर',
      slug: { _type: 'slug', current: 'meghnagar' },
      district: 'झाबुआ',
      block: 'मेघनगर',
      nameStory: 'मेघनगर का नामकरण वर्षा और बादलों के सघन आवागमन की पौराणिक लोकमान्यता से जुड़ा है।',
      settlementHistory: 'रेलवे लाइन और पारंपरिक व्यापारिक मार्गों के संगम पर बसा ऐतिहासिक कस्बा और आसपास के गाँव।',
      riversAndPonds: 'स्थानीय तालाब और बावड़ियाँ पारंपरिक जल संरक्षण के उदाहरण हैं।',
      plantsAndAnimals: 'सागौन, महुआ, खजूर और स्थानीय पक्षी।',
      grazingAreas: 'पहाड़ियों से सटी खुली चरागाह भूमि।',
      traditionalSystem: 'गाँव स्तर पर तड़वी और पटेलों का सम्मानजनक मार्गदर्शन।',
      traditionsAndFestivals: 'भगोरिया हाट और बाबा देव की पूजा।',
      contributor: 'मेघनगर अध्ययन समूह',
    },
    {
      _id: 'village-thandla',
      _type: 'village',
      name: 'थांदला',
      slug: { _type: 'slug', current: 'thandla' },
      district: 'झाबुआ',
      block: 'थांदला',
      nameStory: 'पद्मावती नदी के तट पर स्थित थांदला का नाम प्राचीन बसाहट से व्युत्पन्न है।',
      settlementHistory: 'प्राचीन काल से व्यापार और आदिवासी संस्कृति का प्रमुख केंद्र।',
      riversAndPonds: 'पद्मावती नदी गाँव के जनजीवन और खेती की जीवनरेखा है।',
      plantsAndAnimals: 'खेती के अनुकूल भूमि और सघन वनस्पति।',
      grazingAreas: 'नदी किनारे की साझा भूमि।',
      traditionalSystem: 'पारंपरिक सामुदायिक निर्णय प्रणाली।',
      traditionsAndFestivals: 'भगोरिया, दिवाली, होली और हलमा।',
      contributor: 'थांदला वाचनालय समिति',
    },
    {
      _id: 'village-petlawad',
      _type: 'village',
      name: 'पेटलावद',
      slug: { _type: 'slug', current: 'petlawad' },
      district: 'झाबुआ',
      block: 'पेटलावद',
      nameStory: 'उपजाऊ घाटियों और पहाड़ियों के बीच स्थित ऐतिहासिक क्षेत्र।',
      settlementHistory: 'कृषि और वनोपज पर आधारित समृद्ध समुदाय।',
      riversAndPonds: 'माही नदी घाटी क्षेत्र के प्राकृतिक जलस्रोत।',
      plantsAndAnimals: 'विविध स्थानीय फसलें एवं औषधीय पौधे।',
      grazingAreas: 'पहाड़ी चरागाह।',
      traditionalSystem: 'ग्राम प्रमुखों की पारंपरिक बैठकें।',
      traditionsAndFestivals: 'नवाई, जातर और सामूहिक श्रम।',
      contributor: 'पेटलावद अध्ययन दल',
    },
  ];
  for (const vil of villages) {
    await client.createOrReplace(vil);
  }

  // 6. Traditions
  console.log('6. संस्कृति एवं परंपराएँ जोड़ी जा रही हैं...');
  const traditions = [
    {
      _id: 'tradition-halma',
      _type: 'tradition',
      name: 'हलमा',
      slug: { _type: 'slug', current: 'halma' },
      meaning: 'सामूहिक श्रम और निस्वार्थ सहकार की भील परंपरा, जहाँ पूरा गाँव मिलकर किसी व्यक्ति, परिवार या पूरे गाँव के संकट (जैसे जल संरक्षण, मकान निर्माण या खेती) के समाधान हेतु बिना किसी पारिश्रमिक के श्रमदान करता है।',
      process: 'गाँव का कोई भी व्यक्ति जब किसी बड़े काम में असमर्थ होता है, तो वह तड़वी या बुजुर्गों के माध्यम से हलमा का आह्वान करता है। निश्चित दिन सभी ग्रामीण अपने औजार लेकर पहुँचते हैं और काम पूरा करते हैं।',
      socialImportance: 'सामूहिक एकता, बंधुत्व और आत्मनिर्भरता का बेमिसाल उदाहरण। यह परंपरा सिखाती है कि समाज का संकट किसी एक का नहीं, सबका है।',
      lesson: 'पर्यावरण संकट और जल संकट के वर्तमान दौर में हलमा दुनिया भर के लिए एक अनुकरणीय सामुदायिक मॉडल है।',
    },
    {
      _id: 'tradition-matavan',
      _type: 'tradition',
      name: 'मातावन',
      slug: { _type: 'slug', current: 'matavan' },
      meaning: 'गाँव की सीमा और प्रकृति की रक्षा करने वाली देवी माता का पवित्र वन (देववन / Sacred Grove)। यहाँ किसी भी पेड़ को काटना वर्जित होता है।',
      process: 'गाँव के बुजुर्ग और पुजारा वर्ष में विशेष अवसर पर मातावन में सामूहिक पूजा-अर्चना करते हैं।',
      socialImportance: 'पारंपरिक जैव विविधता संरक्षण का अद्वितीय उदाहरण, जहाँ आस्था के माध्यम से वनों की रक्षा होती है।',
      lesson: 'आधुनिक पर्यावरण विज्ञान जिस पवित्र वनों (Sacred Groves) की बात करता है, भील समाज ने उसे सदियों से मातावन के रूप में सहेज रखा है।',
    },
    {
      _id: 'tradition-bhidha',
      _type: 'tradition',
      name: 'भिड़हा',
      slug: { _type: 'slug', current: 'bhidha' },
      meaning: 'पारंपरिक आपसी सहायता और सहकार की रीति, विशेषकर खेती के समय एक-दूसरे के सहयोग की व्यवस्था।',
      process: 'एक किसान के खेत में निराई-गुड़ाई या कटाई के लिए अन्य परिवारों का मिलकर हाथ बँटाना।',
      socialImportance: 'आर्थिक बोझ कम करना और सामाजिक सौहार्द बढ़ाना।',
      lesson: 'साझा श्रम से किसी भी बड़े काम को सरलता से पूरा किया जा सकता है।',
    },
    {
      _id: 'tradition-navai',
      _type: 'tradition',
      name: 'नवाई',
      slug: { _type: 'slug', current: 'navai' },
      meaning: 'नई फसल आने पर प्रकृति और कुल देवताओं को पहला अन्न अर्पित करने का पावन पर्व।',
      process: 'खेत से नया अन्न घर आने पर पहले देवताओं और पितरों को भोग लगाया जाता है, उसके बाद ही पूरा परिवार नया अन्न खाता है।',
      socialImportance: 'प्रकृति के प्रति कृतज्ञता और सम्मान का भाव।',
      lesson: 'प्रकृति जो देती है, उसके प्रति आदर और विनम्रता का संदेश।',
    },
    {
      _id: 'tradition-jatar',
      _type: 'tradition',
      name: 'जातर',
      slug: { _type: 'slug', current: 'jatar' },
      meaning: 'गाँव के देवताओं और ग्राम-रक्षकों की वार्षिक सामूहिक पूजा और मेला।',
      process: 'पूरे गाँव का एकत्र होकर ग्राम सीमा पर स्थित देव-स्थलों पर पूजा करना और सामूहिक भोज।',
      socialImportance: 'गाँव की सामूहिक पहचान और आध्यात्मिक जुड़ाव।',
      lesson: 'सामूहिकता और उत्सव की संस्कृति।',
    },
    {
      _id: 'tradition-salavani',
      _type: 'tradition',
      name: 'सलावणी',
      slug: { _type: 'slug', current: 'salavani' },
      meaning: 'गाँव और पशुधन को रोगों और विपत्तियों से बचाने के लिए की जाने वाली पारंपरिक शांति-प्रक्रिया।',
      process: 'गाँव की परिधि में औषधीय धूप और मंत्रोच्चार के साथ सामूहिक रक्षा सूत्र।',
      socialImportance: 'सामूहिक स्वास्थ्य और पशुधन की सुरक्षा के प्रति जागरूकता।',
      lesson: 'रोग निवारण और स्वच्छता के प्रति पारंपरिक समझ।',
    },
    {
      _id: 'tradition-phala',
      _type: 'tradition',
      name: 'फाळा',
      slug: { _type: 'slug', current: 'phala' },
      meaning: 'भील गाँव की भौगोलिक और सामाजिक इकाई (टोला या मोहल्ला), जहाँ एक ही कुल या रिश्तेदारी के परिवार एक पहाड़ी ढलान पर साथ रहते हैं।',
      process: 'हर फाळा आत्मनिर्भर होता है और आपस में गहरा दैनिक संवाद रखता है।',
      socialImportance: 'विकेंद्रीकृत और प्रकृति-अनुकूल बसाहट का आदर्श प्रारूप।',
      lesson: 'प्रकृति के अनुरूप आवास निर्माण की कला।',
    },
    {
      _id: 'tradition-nautara',
      _type: 'tradition',
      name: 'नौतरां',
      slug: { _type: 'slug', current: 'nautara' },
      meaning: 'विवाह या बड़े पारिवारिक अवसरों पर रिश्तेदारों और ग्रामीणों द्वारा आर्थिक एवं सामाजिक सहयोग की औपचारिक व्यवस्था।',
      process: 'आयोजक परिवार को सभी संबंधी अपनी सामर्थ्यानुसार सहयोग राशि या सामग्री भेंट करते हैं, जिसे व्यवस्थित रूप से दर्ज किया जाता है।',
      socialImportance: 'पारिवारिक आयोजनों में कर्ज से मुक्ति और आपसी सामाजिक बीमा।',
      lesson: 'आधुनिक क्राउडफंडिंग और सोशल इंश्योरेंस का सदियों पुराना लोक प्रारूप।',
    },
  ];
  for (const t of traditions) {
    await client.createOrReplace(t);
  }

  // 7. Traditional Roles
  console.log('7. पारंपरिक भूमिकाएँ जोड़ी जा रही हैं...');
  const roles = [
    { _id: 'role-badwa', _type: 'role', name: 'बड़वा', slug: { _type: 'slug', current: 'badwa' }, description: 'पारंपरिक आध्यात्मिक मार्गदर्शक, जो प्राकृतिक ऊर्जा, जड़ी-बूटियों और अनुष्ठानों के जानकार होते हैं।', responsibilities: 'रोग निवारण, मानसिक शांति और आध्यात्मिक संतुलन बनाए रखना।' },
    { _id: 'role-tadvi', _type: 'role', name: 'तड़वी', slug: { _type: 'slug', current: 'tadvi' }, description: 'गाँव के पारंपरिक मुखिया और प्रशासनिक प्रमुख, जो न्याय और सामाजिक व्यवस्था का संचालन करते हैं।', responsibilities: 'विवादों का पारंपरिक समाधान, हलमा का आह्वान, बाहरी प्रशासन से समन्वय।' },
    { _id: 'role-kotwal', _type: 'role', name: 'कोटवाल', slug: { _type: 'slug', current: 'kotwal' }, description: 'गाँव के सूचना-प्रसारक और सुरक्षा व्यवस्था के समन्वयक।', responsibilities: 'गाँव तक सूचनाएँ पहुँचाना, बैठकों की मुनादी करना।' },
    { _id: 'role-pujara', _type: 'role', name: 'पुजारा', slug: { _type: 'slug', current: 'pujara' }, description: 'ग्राम देवता और पवित्र स्थलों के मुख्य पुजारी।', responsibilities: 'धार्मिक अनुष्ठान, जातर और पूजा-पद्धति का संचालन।' },
    { _id: 'role-wartiya', _type: 'role', name: 'वार्तिया', slug: { _type: 'slug', current: 'wartiya' }, description: 'पारंपरिक कथावाचक और मौखिक इतिहास के संरक्षक।', responsibilities: 'पीढ़ी-दर-पीढ़ी लोकगाथाओं और इतिहास को जीवित रखना।' },
    { _id: 'role-vatadiya', _type: 'role', name: 'वातड़िया', slug: { _type: 'slug', current: 'vatadiya' }, description: 'पारंपरिक संवाद-वाहक और संदेशवाहक।', responsibilities: 'महत्वपूर्ण संदेशों को एक गाँव से दूसरे गाँव तक ले जाना।' },
    { _id: 'role-hoynapani', _type: 'role', name: 'होयणपणी', slug: { _type: 'slug', current: 'hoynapani' }, description: 'पारंपरिक जल-व्यवस्था और जलस्रोतों के प्रबंधक।', responsibilities: 'तालाब, कुएं और जलस्रोतों की देखरेख और जल वितरण।' },
  ];
  for (const r of roles) {
    await client.createOrReplace(r);
  }

  // 8. History Entries
  console.log('8. भील समाज का इतिहास प्रविष्टियाँ जोड़ी जा रही हैं...');
  const historyEntries = [
    {
      _id: 'history-mangarh',
      _type: 'historyEntry',
      title: 'मानगढ़ नरसंहार (17 नवम्बर 1913)',
      slug: { _type: 'slug', current: 'mangarh-narsanhar-1913' },
      category: 'स्वतंत्रता संग्राम',
      content: '17 नवम्बर 1913 को मानगढ़ पहाड़ी (राजस्थान-मध्य प्रदेश सीमा) पर ब्रिटिश फौज और देशी रियासतों की सेनाओं ने गोविंद गुरु के नेतृत्व में शांतिपूर्ण सभा कर रहे भील समाज पर अंधाधुंध गोलियाँ बरसाईं। लोकमान्यता के अनुसार इसमें 1500 से अधिक भील क्रांतिकारी शहीद हुए। इसे "आदिवासी जलियाँवाला बाग" कहा जाता है, जो जलियाँवाला बाग (1919) से भी छह वर्ष पूर्व घटित हुआ था।',
      sources: 'राजपूताना एजेंसी रिकॉर्ड्स, गोविंद गुरु के भगत आंदोलन के दस्तावेज़। [संपादक नोट: 1507 की संख्या और विशिष्ट स्रोतों का अंतिम सत्यापन प्रकाशन पूर्व अपेक्षित]',
      verified: false,
    },
    {
      _id: 'history-tantya-bhil',
      _type: 'historyEntry',
      title: 'जननायक टंट्या भील (टंट्या मामा)',
      slug: { _type: 'slug', current: 'jannayak-tantya-bhil' },
      category: 'नायक एवं वीरांगनाएँ',
      content: '1857 के प्रथम स्वतंत्रता संग्राम के बाद मध्य भारत में अंग्रेजों के शोषण और अत्याचार के विरुद्ध सशक्त सशस्त्र प्रतिरोध करने वाले अमर सेनानी। उन्होंने गरीबों और वंचितों की रक्षा के लिए ब्रिटिश खज़ाने लूटे और जनता में बाँटे। उन्हें "भारतीय रॉबिनहुड" के नाम से भी जाना जाता है।',
      sources: 'सेंट्रल प्रोविंसेज पुलिस गजेटियर (1889), लोकगीत और मौखिक इतिहास।',
      verified: true,
    },
  ];
  for (const h of historyEntries) {
    await client.createOrReplace(h);
  }

  // 9. Subject Categories (14 Categories)
  console.log('9. 14 वाचनालय विषय श्रेणियाँ जोड़ी जा रही हैं...');
  const subjects = [
    { name: 'खेती एवं कृषि', icon: '🌾', desc: 'स्थानीय खेती के तरीके और फसलें' },
    { name: 'पशुपालन', icon: '🐄', desc: 'पशुओं की देखभाल और पालन-पोषण' },
    { name: 'स्वास्थ्य', icon: '💊', desc: 'स्वास्थ्य और आयुर्वेद' },
    { name: 'इतिहास', icon: '📜', desc: 'भील समाज और झाबुआ का इतिहास' },
    { name: 'लोककथाएँ', icon: '📖', desc: 'गाँव की कहानियाँ और लोकगाथाएँ' },
    { name: 'बच्चों की किताबें', icon: '👧', desc: 'बच्चों के लिए सरल और रोचक किताबें' },
    { name: 'विज्ञान', icon: '🔬', desc: 'सरल भाषा में विज्ञान' },
    { name: 'शिक्षा', icon: '✏️', desc: 'शिक्षा और सीखने के तरीके' },
    { name: 'भाषा एवं साहित्य', icon: '📝', desc: 'हिंदी और स्थानीय भाषाएँ' },
    { name: 'महिला एवं बाल विकास', icon: '👩', desc: 'महिलाओं और बच्चों के अधिकार और विकास' },
    { name: 'जल-जंगल-ज़मीन', icon: '🌊', desc: 'प्राकृतिक संसाधनों की जानकारी' },
    { name: 'संस्कृति एवं परंपराएँ', icon: '🎭', desc: 'भील समाज की संस्कृति और रीति-रिवाज' },
    { name: 'रोज़गार एवं कौशल', icon: '🔧', desc: 'आजीविका और कौशल विकास' },
    { name: 'समाज एवं व्यवस्था', icon: '🏘️', desc: 'गाँव की पारंपरिक व्यवस्था' },
  ];
  for (let i = 0; i < subjects.length; i++) {
    const s = subjects[i];
    await client.createOrReplace({
      _id: `subject-${i + 1}`,
      _type: 'subjectCategory',
      name: s.name,
      icon: s.icon,
      description: s.desc,
    });
  }

  // 10. Reader Stories
  console.log('10. वाचनालय कहानियाँ जोड़ी जा रही हैं...');
  const stories = [
    {
      _id: 'story-1',
      _type: 'libraryStory',
      title: 'पढ़कर बदली सोच',
      author: 'रमेश भाई',
      village: 'चंद्रगढ़',
      body: 'वाचनालय में खेती की किताब पढ़ने के बाद मैंने अपने खेत में पारंपरिक बीजों और जैविक खाद की विधि आज़माई। फसल बेहतर हुई और लागत भी घटी।',
    },
    {
      _id: 'story-2',
      _type: 'libraryStory',
      title: 'बच्चों को मिली किताबों की दुनिया',
      author: 'सुमित्रा बाई',
      village: 'थांदला',
      body: 'हमारे गाँव में जब से वाचनालय की पेटी आई, बच्चे स्कूल के बाद नियमित रूप से कहानियों की किताबें पढ़ते हैं। उनका भाषा ज्ञान बहुत सुधरा है।',
    },
  ];
  for (const st of stories) {
    await client.createOrReplace(st);
  }

  console.log('\n🎉 सभी डेटा सफलतापूर्वक दर्ज कर दिया गया!');
}

seed().catch((err) => {
  console.error('❌ सीडिंग में त्रुटि:', err);
  process.exit(1);
});
