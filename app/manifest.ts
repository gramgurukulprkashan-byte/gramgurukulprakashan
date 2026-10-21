import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'ग्रामगुरुकुल प्रकाशन | Gram Gurukul Prakashan',
    short_name: 'ग्रामगुरुकुल',
    description:
      'ग्रामगुरुकुल प्रकाशन (gramgurukulprakashan.com) — झाबुआ से भील संस्कृति, ग्राम वाचनालय "जो बांचेगा वही बचेगा" और ग्राम एटलस की आधिकारिक वेबसाइट।',
    start_url: '/',
    display: 'standalone',
    background_color: '#FAF7F0',
    theme_color: '#5A2C10',
    lang: 'hi',
    icons: [
      {
        src: '/logo.webp',
        sizes: '192x192',
        type: 'image/webp',
      },
      {
        src: '/logo.webp',
        sizes: '512x512',
        type: 'image/webp',
      },
    ],
  };
}
