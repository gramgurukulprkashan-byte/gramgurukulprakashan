import type { Metadata } from 'next';
import { Noto_Sans_Devanagari, Tiro_Devanagari_Hindi } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// ─── Fonts ────────────────────────────────────────────────
const notoSansDevanagari = Noto_Sans_Devanagari({
  subsets: ['devanagari', 'latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-body',
  display: 'swap',
  preload: true,
});

const tiroDevanagari = Tiro_Devanagari_Hindi({
  subsets: ['devanagari', 'latin'],
  weight: '400',
  variable: '--font-heading',
  display: 'swap',
  preload: false,
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://gramgurukulprakashan.com';

// ─── Default Metadata (Top-Tier SEO) ──────────────────────
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'ग्रामगुरुकुल प्रकाशन | Gram Gurukul Prakashan — gramgurukulprakashan.com',
    template: '%s | ग्रामगुरुकुल प्रकाशन (Gram Gurukul Prakashan)',
  },
  description:
    'ग्रामगुरुकुल प्रकाशन (Gram Gurukul Prakashan) की आधिकारिक वेबसाइट — gramgurukulprakashan.com। झाबुआ (मध्य प्रदेश) से भील समाज की सांस्कृतिक धरोहर, परंपरागत ज्ञान, ग्राम वाचनालय "जो बांचेगा वही बचेगा" और ग्राम एटलस का प्रमुख प्रकाशन केंद्र।',
  keywords: [
    'gramgurukulprakashan',
    'gramgurukulprakashan.com',
    'gram gurukul prakashan',
    'gram gurukul',
    'gramgurukul',
    'ग्रामगुरुकुल प्रकाशन',
    'ग्राम गुरुकुल प्रकाशन',
    'ग्रामगुरुकुल',
    'ग्राम वाचनालय',
    'जो बांचेगा वही बचेगा',
    'झाबुआ',
    'jhabua',
    'भील समाज',
    'भील संस्कृति',
    'ग्राम एटलस',
    'मध्य प्रदेश',
    'madhya pradesh',
    'नवभगीरथ',
    'छागोला गांव एटलस',
    'शिवगंगा गुरुकुल धरमपुरी 457661',
  ],
  authors: [{ name: 'ग्रामगुरुकुल प्रकाशन', url: siteUrl }],
  creator: 'ग्रामगुरुकुल प्रकाशन',
  publisher: 'ग्रामगुरुकुल प्रकाशन',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'hi_IN',
    url: siteUrl,
    siteName: 'ग्रामगुरुकुल प्रकाशन | Gram Gurukul Prakashan',
    title: 'ग्रामगुरुकुल प्रकाशन | Gram Gurukul Prakashan — आधिकारिक वेबसाइट',
    description:
      'गाँव के परंपरागत ज्ञान और भील समाज की सांस्कृतिक धरोहर को देश और दुनिया के समक्ष लाने का संकल्प। आधिकारिक वेबसाइट gramgurukulprakashan.com।',
    images: [
      {
        url: '/content-media/vachanalay-125-books.webp',
        width: 1200,
        height: 630,
        alt: 'ग्रामगुरुकुल प्रकाशन — जो बांचेगा वही बचेगा',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ग्रामगुरुकुल प्रकाशन | Gram Gurukul Prakashan (gramgurukulprakashan.com)',
    description: 'झाबुआ के परंपरागत ज्ञान, भील संस्कृति और ग्राम वाचनालय की आधिकारिक वेबसाइट।',
    images: ['/content-media/vachanalay-125-books.webp'],
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '32x32' },
      { url: '/favicon.webp', type: 'image/webp' },
      { url: '/logo.webp', type: 'image/webp' },
    ],
    shortcut: '/favicon.ico',
    apple: '/logo.webp',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  category: 'Publishing',
};

// ─── JSON-LD Structured Data Schema (Organization + WebSite) ──
const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${siteUrl}/#organization`,
      name: 'ग्रामगुरुकुल प्रकाशन',
      alternateName: [
        'Gram Gurukul Prakashan',
        'Gramgurukul Prakashan',
        'gramgurukulprakashan.com',
        'ग्राम गुरुकुल प्रकाशन',
        'Gramgurukul',
      ],
      url: siteUrl,
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/logo.webp`,
        caption: 'ग्रामगुरुकुल प्रकाशन लोगो',
      },
      image: `${siteUrl}/logo.webp`,
      description:
        'ग्रामगुरुकुल प्रकाशन का उद्देश्य गाँव के अद्वितीय परंपरागत ज्ञान और भील समाज की समृद्ध सांस्कृतिक धरोहर को देश और दुनिया के समक्ष प्रस्तुत करना है। झाबुआ, मध्य प्रदेश।',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'शिवगंगा गुरुकुल, धरमपुरी',
        addressLocality: 'झाबुआ',
        addressRegion: 'मध्य प्रदेश',
        postalCode: '457661',
        addressCountry: 'IN',
      },
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+91-9685271507',
        email: 'gramgurukulprakashan@gmail.com',
        contactType: 'customer support',
        availableLanguage: ['Hindi', 'English'],
      },
      slogan: 'जो बांचेगा वही बचेगा',
    },
    {
      '@type': 'WebSite',
      '@id': `${siteUrl}/#website`,
      url: siteUrl,
      name: 'ग्रामगुरुकुल प्रकाशन | Gram Gurukul Prakashan',
      alternateName: 'gramgurukulprakashan.com',
      publisher: {
        '@id': `${siteUrl}/#organization`,
      },
      inLanguage: 'hi-IN',
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: `${siteUrl}/pustakein?q={search_term_string}`,
        },
        'query-input': 'required name=search_term_string',
      },
    },
  ],
};

// ─── Root Layout ──────────────────────────────────────────
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="hi" dir="ltr">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className={`${notoSansDevanagari.variable} ${tiroDevanagari.variable}`}>
        <Header />
        <main id="main-content" tabIndex={-1}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
