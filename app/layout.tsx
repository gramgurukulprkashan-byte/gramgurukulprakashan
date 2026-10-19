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

// ─── Default Metadata ─────────────────────────────────────
export const metadata: Metadata = {
  title: {
    default: 'ग्राम गुरुकुल प्रकाशन — जो बांचेगा वही बचेगा',
    template: '%s | ग्राम गुरुकुल प्रकाशन',
  },
  description:
    'ग्राम गुरुकुल प्रकाशन का उद्देश्य गाँव के अद्वितीय परंपरागत ज्ञान और भील समाज की समृद्ध सांस्कृतिक धरोहर को देश और दुनिया के समक्ष प्रस्तुत करना है। झाबुआ, मध्य प्रदेश।',
  keywords: [
    'ग्राम गुरुकुल प्रकाशन',
    'भील समाज',
    'झाबुआ',
    'ग्राम वाचनालय',
    'परंपरागत ज्ञान',
    'मध्य प्रदेश',
    'सांस्कृतिक धरोहर',
  ],
  authors: [{ name: 'ग्राम गुरुकुल प्रकाशन' }],
  creator: 'ग्राम गुरुकुल प्रकाशन',
  publisher: 'ग्राम गुरुकुल प्रकाशन',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://gramgurukulprakashan.org'),
  openGraph: {
    type: 'website',
    locale: 'hi_IN',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://gramgurukulprakashan.org',
    siteName: 'ग्राम गुरुकुल प्रकाशन',
    title: 'ग्राम गुरुकुल प्रकाशन — जो बांचेगा वही बचेगा',
    description:
      'गाँव के परंपरागत ज्ञान और भील समाज की सांस्कृतिक धरोहर को देश और दुनिया के समक्ष लाने का संकल्प।',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ग्राम गुरुकुल प्रकाशन — जो बांचेगा वही बचेगा',
    description: 'गाँव के परंपरागत ज्ञान और भील समाज की सांस्कृतिक धरोहर।',
  },
  robots: {
    index: true,
    follow: true,
  },
};

// ─── JSON-LD Organisation Schema ─────────────────────────
const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'ग्राम गुरुकुल प्रकाशन',
  alternateName: 'Gram Gurukul Prakashan',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://gramgurukulprakashan.org',
  logo: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://gramgurukulprakashan.org'}/logo.png`,
  description:
    'ग्राम गुरुकुल प्रकाशन का उद्देश्य गाँव के परंपरागत ज्ञान और भील समाज की सांस्कृतिक धरोहर को देश और दुनिया के समक्ष प्रस्तुत करना है।',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'झाबुआ',
    addressRegion: 'मध्य प्रदेश',
    addressCountry: 'IN',
    // TODO: Add full postal address when provided by client
  },
  contactPoint: {
    '@type': 'ContactPoint',
    email: 'gramgurukulprakashan@gmail.com',
    contactType: 'customer support',
    availableLanguage: ['Hindi'],
  },
  sameAs: [
    'https://instagram.com/gramgurukulprakashan',
    'https://facebook.com/gramgurukulprakashan',
    'https://linktr.ee/gramgurukulprakashan',
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
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
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
