export function formatHindiDate(dateString: string): string {
  if (!dateString) return '';
  const date = new Date(dateString);
  const hindiMonths = [
    'जनवरी', 'फ़रवरी', 'मार्च', 'अप्रैल', 'मई', 'जून',
    'जुलाई', 'अगस्त', 'सितम्बर', 'अक्टूबर', 'नवम्बर', 'दिसम्बर',
  ];
  const day = date.getDate();
  const month = hindiMonths[date.getMonth()];
  const year = date.getFullYear();
  return `${day} ${month} ${year}`;
}

const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

export function checkRateLimit(ip: string, limit = 5, windowMs = 60000): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);
  if (!record || now > record.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + windowMs });
    return true;
  }
  if (record.count >= limit) return false;
  record.count++;
  return true;
}

export const NAV_ITEMS = [
  {
    group: 'मुख्य',
    items: [
      { label: 'मुख्य पृष्ठ', href: '/' },
      { label: 'हमारे बारे में', href: '/hamare-bare-mein' },
      { label: 'हमारे कार्य', href: '/karya' },
    ],
  },
  {
    group: 'ज्ञान',
    items: [
      { label: 'गाँव से शिक्षा', href: '/gaon-se-shiksha' },
      { label: 'ग्राम एटलस', href: '/gram-atlas' },
      { label: 'संस्कृति और परंपराएँ', href: '/sanskriti-parampara' },
      { label: 'भील समाज का इतिहास', href: '/bhil-itihas' },
      { label: 'परंपरागत ज्ञान', href: '/parampragat-gyan' },
    ],
  },
  {
    group: 'प्रकाशन',
    items: [{ label: 'पुस्तकें एवं प्रकाशन', href: '/pustakein' }],
  },
  {
    group: 'जुड़ाव',
    items: [
      { label: 'सूचना एवं जानकारी', href: '/soochna' },
      { label: 'हमसे जुड़ें', href: '/hamse-judein' },
      { label: 'संपर्क करें', href: '/sampark' },
    ],
  },
];

export const SOCIAL_LINKS = {
  email: 'gramgurukulprakashan@gmail.com',
  phone: '+91 96852 71507',
  phoneRaw: '+919685271507',
  address: 'शिवगंगा गुरुकुल, धरमपुरी, ज़िला — झाबुआ (मध्य प्रदेश) - 457661',
  district: 'झाबुआ',
  pincode: '457661',
};

export const CONTACT_INFO = SOCIAL_LINKS;
