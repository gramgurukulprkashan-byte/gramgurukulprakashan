import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import PageHero from '@/components/PageHero';
import SectionTitle from '@/components/SectionTitle';
import { GraduationCap, BookOpen, Users, Lightbulb, Download } from 'lucide-react';

export const metadata: Metadata = {
  title: 'गाँव से शिक्षा',
  description: 'गाँव की शिक्षा कैसी हो — "मेरा जिला" पुस्तक और ग्रामीण ज्ञान को शिक्षा का अभिन्न हिस्सा बनाना।',
};

const TRADITIONAL_LEARNING = [
  { icon: '🌾', label: 'हल चलाना', desc: 'खेती की कला और मिट्टी की तासीर का ज्ञान' },
  { icon: '🌱', label: 'देसी बीज संग्रह', desc: 'देसी बीजों को पहचानना और संरक्षित करना' },
  { icon: '🐄', label: 'पशुपालन व गोसेवा', desc: 'पशुओं की भाषा, देखभाल और पालन-पोषण' },
  { icon: '🌿', label: 'पारंपरिक आयुर्वेद', desc: 'जंगलों की जड़ी-बूटियाँ और घरेलू उपचार' },
  { icon: '🪵', label: 'काष्ठ शिल्प', desc: 'लकड़ी से कृषि उपकरण, तीर-कमान व घरेलू साधन' },
  { icon: '🏠', label: 'मिट्टी-खपरैल निर्माण', desc: 'पर्यावरण-अनुकूल पारंपरिक घर निर्माण' },
  { icon: '🌀', label: 'गोपण निर्माण व कला', desc: 'हाथ से बुनी जाने वाली पारंपरिक गोपण (गुलेल)' },
  { icon: '⚖️', label: 'गाँव की पंच व्यवस्था', desc: 'तड़वी, बड़वा और कोटवाल की न्याय प्रणाली' },
];

export default function GaonSeShikshaPage() {
  return (
    <>
      <PageHero
        title="गाँव से शिक्षा"
        description="गाँव की शिक्षा कैसी हो — स्कूल और समाज के बीच का जीवंत संवाद"
        breadcrumb={[{ label: 'गाँव से शिक्षा' }]}
        variant="mustard"
      />

      {/* Intro with Real Child Photo */}
      <section className="py-16 section-cream" aria-label="परिचय">
        <div className="container-main">
          <div className="grid lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7">
              <SectionTitle title="हमारी मौलिक चिंता" />
              <div className="prose-hindi text-base md:text-lg leading-relaxed mb-6">
                <p>
                  आज की प्रचलित शिक्षा व्यवस्था में <strong>गाँव की कोई जगह नहीं बची है।</strong> पाठ्यपुस्तकों में केवल शहरी जीवन, विदेशी तकनीक और दूर-दराज के उदाहरण होते हैं।
                </p>
                <p>
                  लेकिन जो बच्चा बचपन से खेत देखता है, बैलों को हाँकना सीखता है, गोपण से पक्षियों को पहचानता है, जंगल की जड़ी-बूटियों के बीच बड़ा होता है — उसे अपनी माटी और संस्कृति की कोई प्रामाणिक शिक्षा स्कूल में नहीं मिलती।
                </p>
                <blockquote
                  className="p-4 rounded-xl font-bold"
                  style={{
                    backgroundColor: 'rgba(200, 102, 30, 0.1)',
                    borderLeft: '4px solid var(--color-orange)',
                    color: 'var(--color-charcoal)',
                  }}
                >
                  परिणाम यह होता है कि वर्तमान पढ़ाई बच्चे को अपने ही गाँव, माता-पिता और संस्कृति से हीन भावना से भर देती है। ग्राम गुरुकुल प्रकाशन इस खाई को पाटने का संकल्प है।
                </blockquote>
              </div>
            </div>

            {/* Real photo: Bhil child with traditional Gopan */}
            <div className="lg:col-span-5">
              <div
                className="relative rounded-3xl overflow-hidden shadow-2xl"
                style={{
                  aspectRatio: '4/5',
                  border: '5px solid var(--color-mustard)',
                }}
              >
                <Image
                  src="/content-media/20.jpeg"
                  alt="झाबुआ का बालक पारंपरिक गोपण के साथ — प्रकृति से सीखने की सहज कला"
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 1024px) 100vw, 420px"
                />
                <div className="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-black/80 to-transparent text-white text-xs md:text-sm">
                  गोपण और प्रकृति: गाँव का बाल जीवन सहज ज्ञान से परिपूर्ण है
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mera Jila Book Spotlight */}
      <section className="py-16 section-sand" aria-label="मेरा जिला पुस्तक">
        <div className="container-main">
          <SectionTitle title='"मेरा जिला" — भाग 1' subtitle="कक्षा 6 के लिए झाबुआ ज़िले पर आधारित सामाजिक विज्ञान" />
          <div className="grid md:grid-cols-12 gap-8 items-center">
            {/* Book card */}
            <div className="md:col-span-7 card-base p-8">
              <div className="flex items-center gap-4 mb-6">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0"
                  style={{ backgroundColor: 'rgba(200, 102, 30, 0.12)', color: 'var(--color-orange)' }}
                >
                  <BookOpen size={32} />
                </div>
                <div>
                  <h3
                    className="text-2xl font-bold"
                    style={{ color: 'var(--color-charcoal)', fontFamily: 'var(--font-heading)' }}
                  >
                    मेरा जिला — भाग 1 (झाबुआ)
                  </h3>
                  <span className="badge-wip">निर्माणाधीन पाठ्यपुस्तक</span>
                </div>
              </div>

              <p className="text-base leading-relaxed mb-4" style={{ color: 'var(--color-charcoal)' }}>
                यह पाठ्यपुस्तक कक्षा 6 के विद्यार्थियों के लिए झाबुआ ज़िले के भूगोल, इतिहास, संस्कृति और ग्राम-व्यवस्था पर आधारित है। इसमें बच्चे अपने <strong>परिवार, बड़वा, तड़वी, समाज, परंपराएँ, खेत, नदी-तालाब, पशु और त्योहारों</strong> के माध्यम से सामाजिक विज्ञान सीखते हैं।
              </p>

              <div className="flex flex-wrap gap-4 pt-4">
                <a
                  href="/content-media/Front - Back.pdf"
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                >
                  <Download size={18} aria-hidden="true" />
                  कवर प्रारूप देखें (PDF)
                </a>
                <Link href="/pustakein/mera-jila-bhag-1" className="btn-secondary">
                  पुस्तक विवरण पढ़ें →
                </Link>
              </div>
            </div>

            {/* Why it matters */}
            <div className="md:col-span-5 flex flex-col gap-4">
              <h3
                className="text-xl font-bold mb-2"
                style={{ color: 'var(--color-charcoal)', fontFamily: 'var(--font-heading)' }}
              >
                यह पुस्तक क्यों आवश्यक है?
              </h3>
              {[
                { title: 'स्थानीय परिवेश से जुड़ाव', desc: 'बच्चे अपने गाँव और नदियों के उदाहरणों से अवधारणाएँ जल्दी समझते हैं।' },
                { title: 'माटी का गौरव', desc: 'गाँव के काम और कृषि कौशल के प्रति हीन भावना समाप्त होती है।' },
                { title: 'स्थानीय भीली शब्दों का समावेश', desc: 'मातृभाषा से मानक हिंदी तक की स्वाभाविक यात्रा।' },
                { title: 'परंपरा व विज्ञान का समन्वय', desc: 'हलमा और पारंपरिक जल-संरक्षण को आधुनिक विज्ञान की दृष्टि से समझना।' },
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-white/70 border border-[var(--color-sand-dark)]">
                  <span className="w-2.5 h-2.5 rounded-full mt-2 shrink-0 bg-[var(--color-orange)]" />
                  <div>
                    <h4 className="font-bold text-sm" style={{ color: 'var(--color-charcoal)' }}>{item.title}</h4>
                    <p className="text-xs" style={{ color: 'var(--color-clay)' }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Traditional Learning Grid */}
      <section className="py-16 section-cream" aria-label="गाँव का पारंपरिक ज्ञान">
        <div className="container-main">
          <SectionTitle
            title="गाँव के जीवन में समाया अनौपचारिक ज्ञान"
            subtitle="वे हुनर और संस्कार जो किसी स्कूल में नहीं, बल्कि गाँव की चौपाल और खेतों में सीखे जाते हैं"
          />

          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {TRADITIONAL_LEARNING.map((item, idx) => (
              <div
                key={idx}
                className="card-base p-5 flex flex-col gap-2 hover:shadow-lg transition-all"
              >
                <span className="text-3xl" aria-hidden="true">{item.icon}</span>
                <h3
                  className="font-bold text-base"
                  style={{ color: 'var(--color-charcoal)', fontFamily: 'var(--font-heading)' }}
                >
                  {item.label}
                </h3>
                <p className="text-xs leading-relaxed" style={{ color: 'var(--color-clay)' }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
