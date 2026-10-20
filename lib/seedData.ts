export interface BookItem {
  _id: string;
  title: string;
  slug: { current: string };
  author: string;
  subject: string;
  status: 'प्रकाशित' | 'निर्माणाधीन';
  coverImage?: string;
  pdfUrl?: string;
  description: string;
  pages?: string;
  publisher?: string;
  allowDownload?: boolean;
}

export interface VillageItem {
  _id: string;
  name: string;
  slug: { current: string };
  district: string;
  block: string;
  thumbnail?: string;
  pdfUrl?: string;
  nameStory?: string;
  settlementHistory?: string;
  riversAndPonds?: string;
  plantsAndAnimals?: string;
  grazingAreas?: string;
  traditionalSystem?: string;
  traditionsAndFestivals?: string;
  contributor?: string;
}

export interface NoticeItem {
  _id: string;
  title: string;
  slug: { current: string };
  description: string;
  publishDate: string;
  important: boolean;
  hasPdf: boolean;
  hasImage: boolean;
  image?: string;
  pdf?: string;
}

export const REAL_BOOKS: BookItem[] = [
  {
    _id: 'book-nav-bhagirath',
    title: 'नवभगीरथ — झाबुआ में गंगावतरण',
    slug: { current: 'nav-bhagirath' },
    author: 'गिरीश प्रभुणे (अनुवाद: डॉ. मोहन ब. बांडे)',
    subject: 'जल-संरक्षण एवं सामाजिक पुनर्जागरण',
    status: 'प्रकाशित',
    coverImage: '/content-media/nav-bhagirath-book.webp',
    description:
      'पद्मश्री महेश शर्मा जी के मार्गदर्शन में शिवगंगा द्वारा झाबुआ की माटी में हलमा परंपरा के माध्यम से किए गए जल-संरक्षण, पर्यावरण-संरक्षण और सामाजिक समरसता की ऐतिहासिक गाथा।',
    pages: '220 पृष्ठ',
    publisher: 'शिवगंगा एवं ग्राम गुरुकुल प्रकाशन',
    allowDownload: false,
  },
  {
    _id: 'book-bhilanchal-ki-aawaz',
    title: 'भीलांचल की आवाज — मासिक पत्रिका',
    slug: { current: 'bhilanchal-ki-aawaz' },
    author: 'ग्रामगुरुकुल प्रकाशन मण्डल',
    subject: 'ग्राम चेतना एवं संस्कृति',
    status: 'प्रकाशित',
    coverImage: '/content-media/bhilanchal-ki-aawaz.webp',
    description:
      'अंक 01 (जनवरी 2024), धर्मभूमि झाबुआ। ध्येय वाक्य: "चलो जलायें दीप वहाँ, जहाँ अभी भी अंधेरा है"। झाबुआ के 900 गाँवों में ग्राम वाचनालय, हलमा, स्थानीय ज्ञान और ग्राम विकास की ताज़ा गतिविधियों की मासिक पत्रिका।',
    pages: '32 पृष्ठ',
    publisher: 'ग्राम गुरुकुल प्रकाशन मण्डल, झाबुआ',
    allowDownload: false,
  },
  {
    _id: 'book-mera-jila',
    title: 'मेरा जिला — भाग 1',
    slug: { current: 'mera-jila-bhag-1' },
    author: 'ग्राम गुरुकुल प्रकाशन मण्डल',
    subject: 'सामाजिक विज्ञान (कक्षा 6)',
    status: 'निर्माणाधीन',
    coverImage: '/content-media/mera-jila-cover.webp',
    pdfUrl: '/content-media/Front - Back.pdf',
    description:
      'कक्षा 6 के लिए झाबुआ ज़िले पर आधारित सामाजिक विज्ञान की पाठ्यपुस्तक। इस पुस्तक में बच्चे अपने परिवार, बड़वा, तड़वी, समाज, खेत, नदी-तालाब और परंपराओं के माध्यम से सीखते हैं।',
    pages: 'पाठ्यपुस्तक प्रारूप',
    publisher: 'ग्राम गुरुकुल प्रकाशन',
    allowDownload: true,
  },
  {
    _id: 'book-gram-atlas-chhagola',
    title: 'ग्राम एटलस — छागोला',
    slug: { current: 'gram-atlas-chhagola' },
    author: 'ग्राम गुरुकुल शोध दल',
    subject: 'इतिहास, भूगोल एवं सर्वेक्षण',
    status: 'प्रकाशित',
    coverImage: '/content-media/chhagola-atlas-cover.webp',
    pdfUrl: '/content-media/छागोला गांव एटलस.pdf',
    description:
      'ग्राम छागोला (विकासखंड झाबुआ) का संपूर्ण एटलस और सर्वेक्षण ग्रंथ। 13.4 MB के इस विस्तृत दस्तावेज़ में गाँव का इतिहास, फलियों की स्थिति, नदी-नाले, जलस्रोत, परंपरागत वनस्पति, कुलदेवता और लोक-जीवन का प्रामाणिक संकलन है।',
    pages: '13.4 MB पूर्ण एटलस',
    publisher: 'ग्राम गुरुकुल प्रकाशन',
    allowDownload: true,
  },
  {
    _id: 'book-vachanalay-125',
    title: 'ग्राम वाचनालय संचयन (125 पुस्तकें)',
    slug: { current: 'vachanalay-125-pustakein' },
    author: 'शिवगंगा एवं ग्राम गुरुकुल प्रकाशन',
    subject: 'सामुदायिक पुस्तकालय संचयन',
    status: 'प्रकाशित',
    coverImage: '/content-media/vachanalay-125-books.webp',
    description:
      'हर ग्राम वाचनालय की विशेष पेटी में रखी जाने वाली 125 चुनिंदा प्रेरणादायी पुस्तकें — सम्पूर्ण रामायण, चन्द्रशेखर आज़ाद, भगत सिंह, छत्रपति शिवाजी, महाराणा प्रताप, स्वामी विवेकानन्द, पंचतंत्र, बाल साहित्य एवं कृषि-स्वास्थ्य ज्ञान।',
    pages: '125 पुस्तकों का सेट',
    publisher: 'शिवगंगा समग्र ग्रामविकास परिषद',
    allowDownload: false,
  },
];

export const REAL_VILLAGES: VillageItem[] = [
  {
    _id: 'v-chhagola',
    name: 'छागोला',
    slug: { current: 'chhagola' },
    district: 'झाबुआ',
    block: 'झाबुआ',
    thumbnail: '/content-media/chhagola-atlas-cover.webp',
    pdfUrl: '/content-media/छागोला गांव एटलस.pdf',
    nameStory:
      'छागोला गाँव का नामकरण यहाँ की ऐतिहासिक घाटी और छांवदार वनों के आधार पर माना जाता है। बुजुर्गों के अनुसार पुराने समय में यह क्षेत्र सघन पेड़ों और शीतल जलस्रोतों से समृद्ध था।',
    settlementHistory:
      'छागोला गाँव भील समुदाय के प्रमुख कुलों द्वारा कई पीढ़ियों पूर्व बसाया गया था। यहाँ के तड़वी और बड़वा परंपरा से गाँव के आपसी विवादों और सामाजिक कार्यक्रमों का संचालन करते हैं।',
    riversAndPonds:
      'गाँव से होकर बहने वाले प्राकृतिक नाले और शिवगंगा द्वारा हलमा के माध्यम से बनाए गए चेकडैम व तलाई गाँव में भूजल स्तर को समृद्ध रखते हैं।',
    plantsAndAnimals:
      'गाँव में महुआ, पलाश (खाखरा), नीम, सागौन और बाँस के पेड़ बहुतायत में पाए जाते हैं। गाय, बैल, बकरी और देशी मुर्गी पालन मुख्य आजीविका के सहायक साधन हैं।',
    grazingAreas:
      'गाँव की सामूहिक गोचर भूमि (माल भूमि) पशुओं के चरने और सामुदायिक उपयोग के लिए सुरक्षित रखी जाती है।',
    traditionalSystem:
      'तड़वी (गाँव का मुखिया), बड़वा (परंपरागत स्वास्थ्य और अनुष्ठान विशेषज्ञ), और कोटवाल की सामूहिक व्यवस्था से गाँव चलता है।',
    traditionsAndFestivals:
      'भगोरिया, जात्रा, दिवसो, नवाई, और हलमा यहाँ के प्रमुख पर्व व परंपराएँ हैं।',
    contributor: 'ग्राम गुरुकुल शोध दल एवं छागोला ग्रामवासी',
  },
  {
    _id: 'v-silkhodari',
    name: 'सिलखोदरी',
    slug: { current: 'silkhodari' },
    district: 'झाबुआ',
    block: 'झाबुआ',
    thumbnail: '/content-media/silkhodari-vachanalay.webp',
    nameStory:
      'गाँव की प्राकृतिक शिलाओं और जलधाराओं से सिलखोदरी नाम पड़ा। यहाँ शिवगंगा ग्राम वाचनालय सक्रिय रूप से संचालित है और दीवार पर ध्येय वाक्य अंकित है: "जो बांचेगा वही बचेगा"।',
    settlementHistory:
      'सिलखोदरी में भील समुदाय के कई फलियों में परिवार बसे हैं। गाँव के बच्चों और बुजुर्गों ने मिलकर ज्ञान की पेटी का स्वागत किया।',
    riversAndPonds:
      'गाँव के पास छोटे बंधान और तालाब हैं जो कृषि सिंचाई और पशुओं के पानी में सहयोग करते हैं।',
    plantsAndAnimals: 'महुआ, ताड़, बबूल और पलाश वृक्ष।',
    grazingAreas: 'गाँव की शामलात भूमि।',
    traditionalSystem: 'पारंपरिक ग्राम सभा और फलिया बैठक।',
    traditionsAndFestivals: 'भगोरिया, दिवाली नवाई और हलमा।',
  },
  {
    _id: 'v-udaypuria',
    name: 'उदयपुरिया',
    slug: { current: 'udaypuria' },
    district: 'झाबुआ',
    block: 'झाबुआ',
    thumbnail: '/content-media/udaypuria-dharampuri-launch.webp',
    nameStory:
      'उदयपुरिया गाँव में 27 अक्टूबर 2023 को ग्राम वाचनालय की 125 पुस्तकों की पेटी का वितरण और औपचारिक शुरूआत की गई।',
    settlementHistory:
      'गाँव के युवाओं और अग्रजों ने मिलकर वाचनालय की पेटी का स्वागत किया और नियमित वाचन की जिम्मेदारी ली।',
    riversAndPonds: 'गाँव की छोटी तलाई और कुएँ।',
    plantsAndAnimals: 'देशी गाय और स्थानीय कृषि उपज।',
    grazingAreas: 'पशुओं के लिए चरनोई।',
    traditionalSystem: 'ग्राम प्रमुख और युवा मण्डल।',
    traditionsAndFestivals: 'नवाई और भगोरिया।',
  },
  {
    _id: 'v-bhamarda',
    name: 'भमरदा',
    slug: { current: 'bhamarda' },
    district: 'झाबुआ',
    block: 'झाबुआ',
    thumbnail: '/content-media/bhamarda-launch.webp',
    nameStory:
      'भमरदा गाँव में 27 अक्टूबर 2023 को ग्राम वाचनालय की पेटी का वितरण हुआ। गाँव के फलियों तक पठन संस्कृति पहुँची।',
    settlementHistory:
      'गाँव में युवाओं द्वारा ज्ञान की पेटी का नियमित पठन-पाठन कराया जाता है।',
    riversAndPonds: 'प्राकृतिक नाला और जल संचयन संरचनाएँ।',
    plantsAndAnimals: 'स्थानीय वृक्ष एवं पशुधन।',
    grazingAreas: 'सामुदायिक गोचर।',
    traditionalSystem: 'तड़वी व्यवस्था।',
    traditionsAndFestivals: 'पारंपरिक लोक उत्सव।',
  },
  {
    _id: 'v-semalpada',
    name: 'सेमलपाड़ा',
    slug: { current: 'semalpada' },
    district: 'झाबुआ',
    block: 'थांदला',
    thumbnail: '/content-media/semalpada-gurukul-varg.webp',
    nameStory:
      'सेमल (शाल्मली) के घने वृक्षों की उपस्थिति के कारण गाँव का नाम सेमलपाड़ा पड़ा।',
    settlementHistory:
      'यहाँ ग्राम गुरुकुल वर्ग का आयोजन हुआ जिसमें युवाओं ने व्यक्तित्व विकास और समाज सेवा के संकल्प लिए।',
    riversAndPonds: 'नदी की उपधारा और तलाई।',
    plantsAndAnimals: 'सेमल, महुआ और आम।',
    grazingAreas: 'पहाड़ी गोचर।',
    traditionalSystem: 'ग्राम गुरुकुल युवा समिति।',
    traditionsAndFestivals: 'हलमा और भगोरिया।',
  },
  {
    _id: 'v-salarpada',
    name: 'सालारपाड़ा',
    slug: { current: 'salarpada' },
    district: 'झाबुआ',
    block: 'झाबुआ',
    thumbnail: '/content-media/salarpada-gurukul-varg.webp',
    nameStory:
      'सालार वृक्षों की बहुतायत से इस गाँव का नाम सालारपाड़ा पड़ा।',
    settlementHistory:
      'यहाँ 3 फलियों के 49 युवाओं ने ग्राम गुरुकुल वर्ग में भाग लिया और गाँव के विकास का संकल्प लिया।',
    riversAndPonds: 'गाँव के पास जलधारा।',
    plantsAndAnimals: 'सालार और औषधीय पेड़।',
    grazingAreas: 'पशु चराई क्षेत्र।',
    traditionalSystem: 'फलिया तड़वी व्यवस्था।',
    traditionsAndFestivals: 'नवाई और सामूहिक उत्सव।',
  },
  {
    _id: 'v-ranpura',
    name: 'रणपुरा',
    slug: { current: 'ranpura' },
    district: 'झाबुआ',
    block: 'झाबुआ',
    nameStory: 'रणपुरा झाबुआ का एक प्राचीन गाँव है, जहाँ कृषि और पशुपालन मुख्य आधार हैं।',
    settlementHistory: 'गाँव में कई पीढ़ियों से भील परिवार प्रेम और सहयोग से रहते हैं।',
    riversAndPonds: 'गाँव का तालाब और कुएँ।',
    plantsAndAnimals: 'महुआ, नीम और पीपल।',
    grazingAreas: 'शामलात गोचर।',
    traditionalSystem: 'तड़वी व्यवस्था।',
    traditionsAndFestivals: 'भगोरिया और जात्रा।',
  },
  {
    _id: 'v-dharampuri',
    name: 'धरमपुरी',
    slug: { current: 'dharampuri' },
    district: 'झाबुआ',
    block: 'झाबुआ',
    thumbnail: '/content-media/udaypuria-dharampuri-launch.webp',
    nameStory:
      'धरमपुरी गाँव में 27/10/2023 को ग्राम वाचनालय की शुरूआत हुई। यहाँ शिवगंगा गुरुकुल का मुख्य केंद्र स्थित है।',
    settlementHistory:
      'धरमपुरी में शिवगंगा गुरुकुल स्थित है जो पूरे झाबुआ ज़िले में ग्राम वाचनालय, हलमा और ग्रामीण ज्ञान-प्रकाशन का केंद्रीय परिसर है।',
    riversAndPonds: 'गाँव का तालाब।',
    plantsAndAnimals: 'वनस्पतियाँ और घरेलू पशु।',
    grazingAreas: 'चरनोई भूमि।',
    traditionalSystem: 'गाँव की पंचायत और बुजुर्गों का मार्गदर्शन।',
    traditionsAndFestivals: 'जात्रा और उत्सव।',
  },
];

export const REAL_NOTICES: NoticeItem[] = [
  {
    _id: 'notice-bhilanchal',
    title: '"भीलांचल की आवाज" मासिक पत्रिका का नवीन अंक प्रकाशित',
    slug: { current: 'bhilanchal-ki-aawaz-ank-1' },
    description:
      'धर्मभूमि झाबुआ से "भीलांचल की आवाज" (अंक 01) का विमोचन। ध्येय: "चलो जलायें दीप वहाँ, जहाँ अभी भी अंधेरा है"। ग्राम वाचनालय और झाबुआ के विकास की प्रेरणादायी गाथा।',
    publishDate: '2024-01-15',
    important: true,
    hasImage: true,
    hasPdf: false,
    image: '/content-media/bhilanchal-ki-aawaz.webp',
  },
  {
    _id: 'notice-nav-bhagirath',
    title: 'पुस्तक "नवभगीरथ" — झाबुआ में गंगावतरण का लोकार्पण',
    slug: { current: 'nav-bhagirath-lokarpan' },
    description:
      'पद्मश्री महेश शर्मा जी के मार्गदर्शन में शिवगंगा के हलमा अभियान और जल-आंदोलन पर गिरीश प्रभुणे द्वारा लिखित पुस्तक अब उपलब्ध।',
    publishDate: '2024-02-10',
    important: true,
    hasImage: true,
    hasPdf: false,
    image: '/content-media/nav-bhagirath-book.webp',
  },
  {
    _id: 'notice-chhagola-atlas',
    title: 'ग्राम एटलस — छागोला (विस्तृत 13.4 MB शोध दस्तावेज़) जारी',
    slug: { current: 'chhagola-atlas-jari' },
    description:
      'ग्राम छागोला का पूर्ण सामाजिक, भौगोलिक व सांस्कृतिक एटलस प्रकाशित। ग्रामीण व शोधकर्ता निःशुल्क डाउनलोड कर सकते हैं।',
    publishDate: '2024-03-01',
    important: false,
    hasImage: true,
    hasPdf: true,
    image: '/content-media/chhagola-atlas-cover.webp',
    pdf: '/content-media/छागोला गांव एटलस.pdf',
  },
  {
    _id: 'notice-vachanalay-varg',
    title: 'उदयपुरिया, धरमपुरी एवं भमरदा में नए ग्राम वाचनालय की स्थापना',
    slug: { current: 'udaypuria-dharampuri-bhamarda-vachanalay' },
    description:
      'गाँवों में 125 पुस्तकों से युक्त विशेष वाचनालय पेटियों का वितरण सम्पन्न। बच्चों और युवाओं में पठन के प्रति अपार उत्साह।',
    publishDate: '2023-10-27',
    important: false,
    hasImage: true,
    hasPdf: false,
    image: '/content-media/udaypuria-dharampuri-launch.webp',
  },
];
