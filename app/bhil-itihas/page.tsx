import type { Metadata } from 'next';
import Link from 'next/link';
import PageHero from '@/components/PageHero';
import SectionTitle from '@/components/SectionTitle';
import { AlertTriangle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'भील समाज का इतिहास',
  description: 'भील समाज का इतिहास, मानगढ़ नरसंहार और स्वतंत्रता संग्राम में भील समाज का योगदान।',
};

export default function BhilItihasPage() {
  return (
    <>
      <PageHero
        title="भील समाज का इतिहास"
        description="इतिहास, विरासत और स्वतंत्रता संग्राम में योगदान"
        breadcrumb={[{ label: 'भील समाज का इतिहास' }]}
        variant="charcoal"
      />

      {/* Intro */}
      <section className="py-16 section-cream" aria-label="परिचय">
        <div className="container-main max-w-3xl">
          <SectionTitle title="भील समाज: एक गौरवशाली इतिहास" />
          <div className="prose-hindi">
            <p>
              भील समाज भारत के सबसे प्राचीन और समृद्ध आदिवासी समुदायों में से एक है। मध्य भारत के पहाड़ों, जंगलों और नदियों के बीच बसे इस समाज ने सदियों से अपनी अनूठी सांस्कृतिक पहचान बनाए रखी है।
            </p>
            <p>
              झाबुआ ज़िला भील समाज का एक महत्वपूर्ण केंद्र है, जहाँ आज भी परंपरागत जीवनशैली, परंपराएँ और ज्ञान-विज्ञान जीवित हैं।
            </p>
          </div>
        </div>
      </section>

      {/* Mangarh */}
      <section
        className="py-16"
        style={{ backgroundColor: '#2d1a0e' }}
        aria-label="मानगढ़ नरसंहार"
      >
        <div className="container-main max-w-3xl">
          {/* Admin notice */}
          {/* TODO (Admin only): Verify the figure 1507 and its sources with the client before publishing */}
          <div
            className="mb-6 p-4 rounded-xl flex items-start gap-3"
            style={{ backgroundColor: 'rgba(255,200,0,0.1)', border: '1.5px solid rgba(255,200,0,0.3)' }}
            role="note"
            aria-label="संपादकीय सूचना"
          >
            <AlertTriangle size={18} style={{ color: '#FFC107', flexShrink: 0, marginTop: 2 }} aria-hidden="true" />
            <p className="text-sm" style={{ color: '#FFC107' }}>
              <strong>संपादक के लिए:</strong> "1507" का आँकड़ा और स्रोत प्रकाशन से पहले क्लाइंट से प्रमाणित कराएँ।
            </p>
          </div>

          <h2
            className="text-3xl md:text-4xl font-bold mb-6"
            style={{ color: 'var(--color-mustard)', fontFamily: 'var(--font-heading)' }}
          >
            मानगढ़ नरसंहार और स्वतंत्रता संग्राम
          </h2>

          <div className="prose-hindi" style={{ color: 'var(--color-sand)' }}>
            <p>
              मानगढ़ का नाम स्वतंत्रता संग्राम के इतिहास में एक महत्वपूर्ण स्थान रखता है, लेकिन यह इतिहास की मुख्यधारा में बहुत कम जगह पा सका।
            </p>
            <p>
              यह देश की स्वतंत्रता के लिए एक बहुत बड़ा आंदोलन था, जिसमें <strong style={{ color: 'var(--color-mustard)' }}>1507</strong>{/* TODO: verify this figure */} भील पुरुष, महिलाएँ, बच्चे और बुज़ुर्गों ने अपने प्राण न्योछावर किए। फिर भी यह घटना मुख्यधारा के स्वतंत्रता इतिहास में शायद ही मिलती है।
            </p>
            <p>
              ग्राम गुरुकुल प्रकाशन इस इतिहास को सही रूप में दर्ज करने और देश के सामने रखने के लिए प्रतिबद्ध है।
            </p>
          </div>

          <div
            className="mt-6 p-4 rounded-xl"
            style={{ backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
          >
            <p className="text-sm" style={{ color: 'rgba(240, 228, 200, 0.6)' }}>
              स्रोत एवं संदर्भ: TODO — प्रामाणिक स्रोत यहाँ दर्ज करें।
            </p>
          </div>
        </div>
      </section>

      {/* Freedom fighters */}
      <section className="py-16 section-sand" aria-label="स्वतंत्रता सेनानी">
        <div className="container-main">
          <SectionTitle title="स्वतंत्रता सेनानी" />
          <div
            className="p-8 rounded-2xl text-center"
            style={{ backgroundColor: 'white', border: '2px dashed var(--color-sand-dark)' }}
          >
            <p style={{ color: 'var(--color-clay)' }}>
              TODO: CMS से स्वतंत्रता सेनानियों के प्रोफाइल कार्ड यहाँ प्रदर्शित होंगे।
            </p>
            <Link href="/hamse-judein" className="btn-primary mt-4">
              जानकारी भेजें
            </Link>
          </div>
        </div>
      </section>

      {/* Research material */}
      <section className="py-16 section-cream" aria-label="शोध सामग्री">
        <div className="container-main max-w-3xl">
          <SectionTitle title="शोध सामग्री" />
          <div
            className="p-6 rounded-2xl"
            style={{ backgroundColor: 'var(--color-sand)', border: '2px dashed var(--color-sand-dark)' }}
          >
            <p style={{ color: 'var(--color-clay)' }}>
              TODO: CMS से PDF सूची यहाँ प्रदर्शित होगी। इतिहास के दस्तावेज़ और पुरानी तस्वीरें यहाँ उपलब्ध होंगी।
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
