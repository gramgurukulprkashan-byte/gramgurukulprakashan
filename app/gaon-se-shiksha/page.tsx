import type { Metadata } from 'next';
import Link from 'next/link';
import PageHero from '@/components/PageHero';
import SectionTitle from '@/components/SectionTitle';
import { GraduationCap, BookOpen, Users, Lightbulb } from 'lucide-react';

export const metadata: Metadata = {
  title: 'गाँव से शिक्षा',
  description: 'गाँव की शिक्षा कैसी हो — "मेरा जिला" पुस्तक और ग्रामीण ज्ञान को शिक्षा का हिस्सा बनाना।',
};

const TRADITIONAL_LEARNING = [
  { icon: '🌾', label: 'हल चलाना', desc: 'खेती की कला और मिट्टी का ज्ञान' },
  { icon: '🌱', label: 'बीज संग्रह', desc: 'देसी बीजों को पहचानना और संरक्षित करना' },
  { icon: '🐄', label: 'पशुपालन', desc: 'पशुओं की देखभाल और पालन-पोषण' },
  { icon: '🌿', label: 'आयुर्वेद', desc: 'जड़ी-बूटियाँ और घरेलू उपचार' },
  { icon: '🪵', label: 'लकड़ी का काम', desc: 'लकड़ी से उपकरण और घर बनाना' },
  { icon: '🏠', label: 'घर बनाना', desc: 'पारंपरिक निर्माण कला और सामग्री' },
  { icon: '🌀', label: 'गोपण बनाना', desc: 'पारंपरिक शिल्प और बुनाई' },
  { icon: '⚖️', label: 'गाँव की व्यवस्था', desc: 'पारंपरिक न्याय और शासन' },
];

export default function GaonSeShikshaPage() {
  return (
    <>
      <PageHero
        title="गाँव से शिक्षा"
        description="गाँव की शिक्षा कैसी हो — स्कूल और समाज के बीच का संवाद"
        breadcrumb={[{ label: 'गाँव से शिक्षा' }]}
        variant="mustard"
      />

      {/* Intro */}
      <section className="py-16 section-cream" aria-label="परिचय">
        <div className="container-main max-w-3xl">
          <SectionTitle title="हमारी चिंता" />
          <div className="prose-hindi">
            <p>
              आज की शिक्षा व्यवस्था में <strong>गाँव की कोई जगह नहीं है।</strong> पाठ्यपुस्तकों में शहरी जीवन, विदेशी उदाहरण और दूर की चीज़ें हैं। लेकिन जो बच्चा रोज़ खेत देखता है, नदी के किनारे खेलता है, पशुओं के साथ बढ़ता है — उसे उसके अपने परिवेश की कोई शिक्षा नहीं मिलती।
            </p>
            <p>
              यह पढ़ाई व्यक्ति को <strong>अपने समाज और गाँव से अलग करती है।</strong> गाँव के काम और ज्ञान को हीन समझा जाने लगता है।
            </p>
          </div>
        </div>
      </section>

      {/* Mera Jila book */}
      <section className="py-16 section-sand" aria-label="मेरा जिला पुस्तक">
        <div className="container-main">
          <SectionTitle title='"मेरा जिला" — भाग 1' subtitle="कक्षा 6 सामाजिक विज्ञान" />
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Book card */}
            <div className="card-base p-8">
              <div className="flex items-center gap-3 mb-4">
                <BookOpen size={32} style={{ color: 'var(--color-orange)' }} aria-hidden="true" />
                <div>
                  <h2
                    className="text-xl font-bold"
                    style={{ color: 'var(--color-charcoal)', fontFamily: 'var(--font-heading)' }}
                  >
                    मेरा जिला — भाग 1
                  </h2>
                  <span className="badge-wip">निर्माणाधीन</span>
                </div>
              </div>
              <p style={{ color: 'var(--color-clay)' }}>
                यह पुस्तक कक्षा 6 के बच्चों के लिए झाबुआ ज़िले पर आधारित सामाजिक विज्ञान की पाठ्यपुस्तक है। इसमें बच्चे सीखते हैं अपने <strong>परिवार, बड़वा, तड़वी, समाज, परंपराएँ, खेत, नदी-तालाब, पशु और त्योहारों</strong> के बारे में।
              </p>
              <p className="mt-4 text-sm" style={{ color: 'var(--color-clay)' }}>
                TODO: पाठों की सूची CMS से प्रदर्शित होगी।
              </p>
              <Link href="/pustakein/mera-jila-bhag-1" className="btn-primary mt-6">
                अधिक जानें
              </Link>
            </div>
            {/* Why it matters */}
            <div>
              <h3
                className="text-xl font-bold mb-4"
                style={{ color: 'var(--color-charcoal)', fontFamily: 'var(--font-heading)' }}
              >
                यह पुस्तक क्यों?
              </h3>
              <ul className="space-y-3">
                {[
                  'बच्चे अपने परिवेश से जुड़कर सीखें',
                  'गाँव का ज्ञान पाठ्यक्रम में शामिल हो',
                  'स्थानीय भाषा और उदाहरणों का उपयोग',
                  'ग्रामीण जीवन की गरिमा को पहचान मिले',
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3"
                  >
                    <span
                      className="w-2 h-2 rounded-full shrink-0 mt-2"
                      style={{ backgroundColor: 'var(--color-orange)' }}
                      aria-hidden="true"
                    />
                    <span style={{ color: 'var(--color-charcoal)' }}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Traditional learning */}
      <section className="py-16 section-cream" aria-label="गाँव में सीखने के तरीके">
        <div className="container-main">
          <SectionTitle
            title="गाँव में सीखने की परंपरा"
            subtitle="पहले गाँव में शिक्षा कैसे होती थी?"
          />
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
            {TRADITIONAL_LEARNING.map((item) => (
              <div
                key={item.label}
                className="card-base p-5 text-center flex flex-col items-center gap-3"
              >
                <span className="text-3xl" aria-hidden="true">{item.icon}</span>
                <h3
                  className="font-bold"
                  style={{ color: 'var(--color-charcoal)', fontFamily: 'var(--font-heading)' }}
                >
                  {item.label}
                </h3>
                <p className="text-xs" style={{ color: 'var(--color-clay)' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Teacher resources */}
      <section className="py-16 section-sand" aria-label="शिक्षकों के लिए">
        <div className="container-main max-w-3xl">
          <SectionTitle title="शिक्षकों के लिए" />
          <div
            className="p-6 rounded-2xl"
            style={{ backgroundColor: 'white', border: '2px dashed var(--color-sand-dark)' }}
          >
            <div className="flex items-center gap-3 mb-4">
              <GraduationCap size={28} style={{ color: 'var(--color-orange)' }} aria-hidden="true" />
              <h3
                className="text-lg font-bold"
                style={{ color: 'var(--color-charcoal)', fontFamily: 'var(--font-heading)' }}
              >
                पाठ योजनाएँ, गतिविधियाँ और अभ्यास प्रश्न
              </h3>
            </div>
            <p style={{ color: 'var(--color-clay)' }}>
              TODO: CMS से शिक्षकों के लिए PDF संसाधन यहाँ प्रदर्शित होंगे। ग्रामीण जीवन और स्थानीय ज्ञान को शिक्षा का हिस्सा बनाने के सुझाव भी यहाँ होंगे।
            </p>
            <Link href="/sampark" className="btn-primary mt-4">
              हमसे सम्पर्क करें
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
