import type { Metadata } from 'next';
import Link from 'next/link';
import PageHero from '@/components/PageHero';
import SectionTitle from '@/components/SectionTitle';
import DotDivider from '@/components/DotDivider';
import { ChevronRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'हमारे बारे में',
  description:
    'ग्राम गुरुकुल प्रकाशन की शुरुआत, उद्देश्य और हम किन सवालों पर काम कर रहे हैं — जानें सब कुछ।',
};

const CHALLENGES = [
  'लगातार इसी विषय पर काम करने वाले लोगों की कमी',
  'लेखकों की कमी',
  'किसी विषय का गहराई से अध्ययन करने वालों की कमी',
  'डिज़ाइनरों की कमी',
  'विषय विशेषज्ञों की कमी',
];

const QUESTIONS = [
  'गाँव की शिक्षा कैसी हो?',
  'स्कूलों में क्या पढ़ाया जाना चाहिए?',
  'आधुनिक विज्ञान गाँव में कैसे आ सकता है?',
];

export default function HamareBareMain() {
  return (
    <>
      <PageHero
        title="हमारे बारे में"
        description="ग्राम गुरुकुल प्रकाशन की शुरुआत, उद्देश्य और हमारे सवाल"
        breadcrumb={[{ label: 'हमारे बारे में' }]}
        variant="cream"
      />

      {/* ── शुरुआत क्यों ────────────────────────────────── */}
      <section className="py-16 section-cream">
        <div className="container-main max-w-3xl">
          <SectionTitle title="शुरुआत क्यों?" />
          <div className="prose-hindi">
            <p>
              2009 में जब झाबुआ के सभी गाँवों में ग्राम वाचनालय स्थापित करने के लिए हमने किताबें ढूँढना शुरू किया, तब हमें गाँव के लोगों के हिसाब से बहुत कम साहित्य मिला।
            </p>
            <p>
              और जब मैं पढ़ रहा था, तब भी मुझे लगा कि इस शिक्षा में गाँव की बातें नहीं सिखाई जा रही हैं। यह पढ़ाई व्यक्ति को अपने समाज और गाँव से अलग करती है। व्यक्ति गाँव में रहने और गाँव के काम व व्यवस्था को हीन भावना से देखने लगता है और अपने समाज से कट जाता है।
            </p>
            <p>
              <strong>इसी चिंता से ग्राम गुरुकुल प्रकाशन की ज़रूरत महसूस हुई।</strong>
            </p>
          </div>
        </div>
      </section>

      {/* ── उद्देश्य ─────────────────────────────────────── */}
      <section className="py-16 section-sand">
        <div className="container-main max-w-3xl">
          <SectionTitle title="उद्देश्य" />
          <blockquote
            className="text-xl md:text-2xl font-bold leading-relaxed p-6 rounded-2xl"
            style={{
              backgroundColor: 'var(--color-mustard)',
              color: 'var(--color-charcoal)',
              fontFamily: 'var(--font-heading)',
              borderLeft: 'none',
            }}
          >
            "गाँव का परंपरागत ज्ञान और शहरों का आधुनिक विज्ञान, इन दोनों के आदान-प्रदान के लिए ग्राम गुरुकुल प्रकाशन की शुरुआत की गई।"
          </blockquote>
        </div>
      </section>

      {/* ── Brochure Panel ───────────────────────────────── */}
      <section className="py-16 section-cream">
        <div className="container-main">
          <div
            className="rounded-3xl p-8 md:p-12 dot-pattern relative overflow-hidden"
            style={{ backgroundColor: 'var(--color-mustard)' }}
          >
            {/* Decorative ring */}
            <div
              className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-15 pointer-events-none"
              style={{ border: '30px solid var(--color-charcoal)', transform: 'translate(30%, -30%)' }}
              aria-hidden="true"
            />
            <div className="relative z-10 max-w-4xl">
              <h2
                className="text-3xl md:text-4xl font-bold mb-8"
                style={{ color: 'var(--color-charcoal)', fontFamily: 'var(--font-heading)' }}
              >
                लक्ष्य, गतिविधियाँ और कार्य
              </h2>
              <div className="grid md:grid-cols-3 gap-8">
                <div>
                  <h3
                    className="text-lg font-bold mb-3"
                    style={{ color: 'var(--color-charcoal)', fontFamily: 'var(--font-heading)' }}
                  >
                    🎯 लक्ष्य
                  </h3>
                  <p style={{ color: 'rgba(26, 26, 26, 0.8)' }}>
                    झाबुआ के ज्ञान को देश व दुनिया में सही रूप में ले जाना और नये ज्ञान को झाबुआ के गाँवों में सरल भाषा में पहुँचाना।
                  </p>
                </div>
                <div>
                  <h3
                    className="text-lg font-bold mb-3"
                    style={{ color: 'var(--color-charcoal)', fontFamily: 'var(--font-heading)' }}
                  >
                    🌱 गतिविधियाँ
                  </h3>
                  <ul className="list-none p-0 m-0 space-y-2" style={{ color: 'rgba(26, 26, 26, 0.8)' }}>
                    <li>• ग्राम वाचनालय</li>
                    <li>• सशक्तिकरण वर्ग</li>
                  </ul>
                </div>
                <div>
                  <h3
                    className="text-lg font-bold mb-3"
                    style={{ color: 'var(--color-charcoal)', fontFamily: 'var(--font-heading)' }}
                  >
                    📖 कार्य
                  </h3>
                  <ol className="list-none p-0 m-0 space-y-2" style={{ color: 'rgba(26, 26, 26, 0.8)' }}>
                    <li>1. झाबुआ के ज्ञान को सही रूप में एकत्रित कर उसे प्रकाशित करना।</li>
                    <li>2. नये ज्ञान को सरल भाषा में लिखकर प्रकाशित करना।</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── हमारी चिंता ──────────────────────────────────── */}
      <section className="py-16 section-sand">
        <div className="container-main max-w-3xl">
          <SectionTitle title="हमारी चिंता" />
          <div className="prose-hindi">
            <p>
              हमारी शिक्षा व्यवस्था में एक बड़ी कमी है — वह व्यक्ति को उसके गाँव, उसके समाज और उसकी परंपराओं से अलग कर देती है। शिक्षित होने के बाद व्यक्ति गाँव को कम आँकने लगता है।
            </p>
            <p>
              हमारा मानना है कि गाँव के परंपरागत ज्ञान में भी बहुत कुछ है जो आज के आधुनिक विज्ञान के साथ मिलकर और भी उपयोगी हो सकता है।
            </p>
          </div>
        </div>
      </section>

      {/* ── जिन सवालों पर काम हो रहा है ─────────────────── */}
      <section className="py-16 section-cream">
        <div className="container-main max-w-3xl">
          <SectionTitle title="जिन सवालों पर हम काम कर रहे हैं" />
          <ul className="space-y-4 list-none m-0 p-0">
            {QUESTIONS.map((q, i) => (
              <li
                key={i}
                className="flex items-start gap-4 p-5 rounded-2xl"
                style={{ backgroundColor: 'var(--color-sand)', border: '2px solid var(--color-sand-dark)' }}
              >
                <span
                  className="text-2xl font-bold shrink-0"
                  style={{ color: 'var(--color-mustard)', fontFamily: 'var(--font-heading)' }}
                >
                  ?
                </span>
                <p className="text-lg font-semibold" style={{ color: 'var(--color-charcoal)', fontFamily: 'var(--font-heading)' }}>
                  {q}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── आ रही कठिनाइयाँ ──────────────────────────────── */}
      <section className="py-16 section-sand">
        <div className="container-main max-w-3xl">
          <SectionTitle title="आ रही कठिनाइयाँ" />
          <p className="mb-6" style={{ color: 'var(--color-clay)' }}>
            हम इस काम में लगे हुए हैं, लेकिन कुछ कठिनाइयाँ हैं जिनसे हम जूझ रहे हैं:
          </p>
          <ul className="space-y-3 list-none m-0 p-0 mb-8">
            {CHALLENGES.map((ch, i) => (
              <li
                key={i}
                className="flex items-center gap-3 p-4 rounded-xl"
                style={{ backgroundColor: 'white', border: '1.5px solid var(--color-sand-dark)' }}
              >
                <span
                  className="w-2 h-2 rounded-full shrink-0"
                  style={{ backgroundColor: 'var(--color-orange)' }}
                  aria-hidden="true"
                />
                <span style={{ color: 'var(--color-charcoal)' }}>{ch}</span>
              </li>
            ))}
          </ul>
          <p className="mb-6 font-medium" style={{ color: 'var(--color-clay)' }}>
            अगर आप इस काम में सहयोग देना चाहते हैं — चाहे लेखन में, शोध में, डिज़ाइन में या गाँव के ज्ञान को दर्ज करने में — हम आपका स्वागत करते हैं।
          </p>
          <Link href="/hamse-judein" className="btn-primary">
            आप कैसे जुड़ सकते हैं
            <ChevronRight size={18} aria-hidden="true" />
          </Link>
        </div>
      </section>
    </>
  );
}
