import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import PageHero from '@/components/PageHero';
import SectionTitle from '@/components/SectionTitle';
import DotDivider from '@/components/DotDivider';
import { ChevronRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'हमारे बारे में',
  description:
    'ग्रामगुरुकुल प्रकाशन की शुरुआत, उद्देश्य, शिवगंगा की प्रेरणा और हम किन सवालों पर काम कर रहे हैं — जानें सब कुछ।',
};

const CHALLENGES = [
  'लगातार इसी विषय पर काम करने वाले समर्पित कार्यकर्ताओं की आवश्यकता',
  'स्थानीय भीली, हिंदी और अंग्रेज़ी लेखकों और अनुवादकों की कमी',
  'ग्रामीण विषयों का गहराई से अध्ययन करने वाले शोधकर्ताओं की आवश्यकता',
  'पुस्तक सज्जा एवं डिज़ाइनरों की आवश्यकता',
  'गाँव के प्राचीन इतिहास और देशी बीजों के विषय विशेषज्ञों की आवश्यकता',
];

const QUESTIONS = [
  'गाँव की शिक्षा कैसी हो, जो बच्चे को अपनी माटी से जोड़े रखे?',
  'स्कूलों में स्थानीय इतिहास और पारंपरिक हुनर को कैसे शामिल किया जाए?',
  'आधुनिक विज्ञान और तकनीक गाँव में सरल भाषा में कैसे आए?',
];

export default function HamareBareMain() {
  return (
    <>
      <PageHero
        title="हमारे बारे में"
        description="ग्रामगुरुकुल प्रकाशन की शुरुआत, शिवगंगा की दृष्टि और हमारे मौलिक सवाल"
        breadcrumb={[{ label: 'हमारे बारे में' }]}
        variant="cream"
      />

      {/* ── शुरुआत क्यों — With Mahesh Sharma Ji Photo ────── */}
      <section className="py-16 section-cream">
        <div className="container-main">
          <div className="grid lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7">
              <SectionTitle title="शुरुआत क्यों हुई?" />
              <div className="prose-hindi text-base md:text-lg leading-relaxed space-y-4">
                <p>
                  2009 में जब झाबुआ के सभी गाँवों में ग्राम वाचनालय स्थापित करने के लिए हमने उपयुक्त साहित्य ढूँढना शुरू किया, तब हमें गाँव के लोगों और बच्चों के हिसाब से बहुत कम सामग्री मिली।
                </p>
                <p>
                  वर्तमान शिक्षा में गाँव की बातें, देशी खेती, जल-संरक्षण और भील समाज के आत्मसम्मान का कोई स्थान नहीं था। यह पढ़ाई व्यक्ति को अपने ही गाँव, माता-पिता और समाज से अलग कर देती है।
                </p>
                <p>
                  गाँव का युवक अपने ही परिवेश को हीन भावना से देखने लगता है। इसी व्यथा और चिंता से <strong>ग्रामगुरुकुल प्रकाशन</strong> की नींव रखी गई।
                </p>
              </div>
            </div>

            {/* Real photo: Mahesh Sharma ji with village elder */}
            <div className="lg:col-span-5">
              <div
                className="relative rounded-3xl overflow-hidden shadow-2xl"
                style={{
                  aspectRatio: '4/3',
                  border: '5px solid var(--color-mustard)',
                }}
              >
                <Image
                  src="/content-media/mahesh-sharma-elder.webp"
                  alt="पद्मश्री महेश शर्मा जी ग्रामीण बुजुर्ग के साथ आत्मीय संवाद करते हुए"
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 1024px) 100vw, 420px"
                />
                <div className="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-black/85 via-black/40 to-transparent text-white text-xs md:text-sm">
                  गाँव के अग्रजों के साथ आत्मीय संवाद — यही है ग्रामगुरुकुल की प्रेरणा
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── उद्देश्य ─────────────────────────────────────── */}
      <section className="py-16 section-sand">
        <div className="container-main max-w-3xl">
          <SectionTitle title="हमारा ध्येय" />
          <blockquote
            className="text-xl md:text-2xl font-bold leading-relaxed p-6 rounded-2xl shadow-sm"
            style={{
              backgroundColor: 'var(--color-mustard)',
              color: 'var(--color-charcoal)',
              fontFamily: 'var(--font-heading)',
              borderLeft: 'none',
            }}
          >
            "गाँव का परंपरागत ज्ञान और शहरों का आधुनिक विज्ञान — इन दोनों के आदान-प्रदान और परस्पर सम्मान के लिए ग्रामगुरुकुल प्रकाशन समर्पित है।"
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
                  <p style={{ color: 'rgba(26, 26, 26, 0.85)' }}>
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
                  <ul className="list-none p-0 m-0 space-y-2 font-medium" style={{ color: 'rgba(26, 26, 26, 0.85)' }}>
                    <li>• शिवगंगा ग्राम वाचनालय (900+ गाँव)</li>
                    <li>• ग्रामगुरुकुल वर्ग (युवा व बालक)</li>
                    <li>• मासिक पत्रिका "भीलांचल की आवाज"</li>
                  </ul>
                </div>
                <div>
                  <h3
                    className="text-lg font-bold mb-3"
                    style={{ color: 'var(--color-charcoal)', fontFamily: 'var(--font-heading)' }}
                  >
                    📖 कार्य
                  </h3>
                  <ol className="list-none p-0 m-0 space-y-2" style={{ color: 'rgba(26, 26, 26, 0.85)' }}>
                    <li>1. झाबुआ के ज्ञान को सही रूप में संकलित कर प्रकाशित करना।</li>
                    <li>2. आधुनिक विज्ञान को सरल हिंदी में लिखकर प्रकाशित करना।</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── जिन सवालों पर काम हो रहा है ─────────────────── */}
      <section className="py-16 section-sand">
        <div className="container-main max-w-3xl">
          <SectionTitle title="जिन मौलिक सवालों पर हम काम कर रहे हैं" />
          <ul className="space-y-4 list-none m-0 p-0">
            {QUESTIONS.map((q, i) => (
              <li
                key={i}
                className="flex items-start gap-4 p-5 rounded-2xl bg-white shadow-sm"
                style={{ border: '2px solid var(--color-sand-dark)' }}
              >
                <span
                  className="text-2xl font-bold shrink-0"
                  style={{ color: 'var(--color-orange)', fontFamily: 'var(--font-heading)' }}
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

      {/* ── आ रही कठिनाइयाँ एवं आमंत्रण ────────────────────── */}
      <section className="py-16 section-cream">
        <div className="container-main max-w-3xl">
          <SectionTitle title="सहयोग का खुला आमंत्रण" />
          <p className="mb-6 text-base" style={{ color: 'var(--color-clay)' }}>
            हम इस व्यापक कार्य में समर्पित हैं, लेकिन इस यज्ञ को पूर्ण करने के लिए हमें और भी हाथों की ज़रूरत है:
          </p>
          <ul className="space-y-3 list-none m-0 p-0 mb-8">
            {CHALLENGES.map((ch, i) => (
              <li
                key={i}
                className="flex items-center gap-3 p-4 rounded-xl"
                style={{ backgroundColor: 'var(--color-sand)', border: '1.5px solid var(--color-sand-dark)' }}
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
          <p className="mb-6 font-medium text-base" style={{ color: 'var(--color-clay)' }}>
            अगर आप इस काम में सहयोग देना चाहते हैं — चाहे लेखन में, शोध में, अनुवाद में, पुस्तक सज्जा में या गाँव के ज्ञान को दर्ज करने में — हम आपका सस्नेह स्वागत करते हैं।
          </p>
          <Link href="/hamse-judein" className="btn-primary">
            हमसे जुड़ें एवं सहयोग करें
            <ChevronRight size={18} aria-hidden="true" />
          </Link>
        </div>
      </section>
    </>
  );
}
