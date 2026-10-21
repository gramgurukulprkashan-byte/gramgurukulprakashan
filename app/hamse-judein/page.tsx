import type { Metadata } from 'next';
import PageHero from '@/components/PageHero';
import SectionTitle from '@/components/SectionTitle';
import JoinForm from '@/components/JoinForm';
import { Pen, Search, Palette, Sprout } from 'lucide-react';

export const metadata: Metadata = {
  title: 'हमसे जुड़ें',
  description: 'ग्रामगुरुकुल प्रकाशन से जुड़ें — लेखक, शोधकर्ता, शिक्षक, डिज़ाइनर या गाँव के जानकार।',
};

const WHO_WE_NEED = [
  {
    icon: <Pen size={28} />,
    title: 'लेखक और शोधकर्ता',
    desc: 'जो गाँव की संस्कृति, इतिहास और परंपराओं पर गहराई से लिख सकें। हिंदी में सरल और स्पष्ट लेखन।',
  },
  {
    icon: <Search size={28} />,
    title: 'शिक्षक और विषय विशेषज्ञ',
    desc: 'जो शिक्षा, कृषि, स्वास्थ्य, इतिहास या अन्य विषयों में विशेषज्ञ हों और गाँव के संदर्भ में लिख सकें।',
  },
  {
    icon: <Palette size={28} />,
    title: 'डिज़ाइनर और संपादक',
    desc: 'पुस्तकों, पत्रिकाओं और डिजिटल सामग्री के लिए डिज़ाइन और संपादन में रुचि रखने वाले।',
  },
  {
    icon: <Sprout size={28} />,
    title: 'गाँव के जानकार',
    desc: 'बुज़ुर्ग, किसान, शिल्पकार — जिनके पास परंपरागत ज्ञान है और वे उसे दर्ज करवाना चाहते हैं।',
  },
];

export default function HamseJudeinPage() {
  return (
    <>
      <PageHero
        title="हमसे जुड़ें"
        description="ग्रामगुरुकुल प्रकाशन के साथ इस ज्ञान-यात्रा में शामिल हों"
        breadcrumb={[{ label: 'हमसे जुड़ें' }]}
        variant="mustard"
      />

      {/* Who we need */}
      <section className="py-16 section-cream" aria-label="हमें किसकी ज़रूरत है">
        <div className="container-main">
          <SectionTitle
            title="हमें किसकी ज़रूरत है?"
            subtitle="इस काम को आगे बढ़ाने के लिए हम लगातार लोगों की तलाश में हैं"
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {WHO_WE_NEED.map((item) => (
              <div key={item.title} className="card-base p-6 flex flex-col gap-4">
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: 'rgba(200, 102, 30, 0.1)', color: 'var(--color-orange)' }}
                  aria-hidden="true"
                >
                  {item.icon}
                </div>
                <h2
                  className="text-lg font-bold"
                  style={{ color: 'var(--color-charcoal)', fontFamily: 'var(--font-heading)' }}
                >
                  {item.title}
                </h2>
                <p className="text-sm" style={{ color: 'var(--color-clay)' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Submission section */}
      <section className="py-16 section-sand" aria-label="ज्ञान एवं संकलन में सहयोग">
        <div className="container-main max-w-3xl">
          <SectionTitle
            title="ज्ञान एवं संकलन में सहयोग"
            subtitle="गाँव की परंपराएँ, लोककथाएँ और तस्वीरें हमारे साथ साझा करें"
          />
          <JoinForm />
        </div>
      </section>
    </>
  );
}
