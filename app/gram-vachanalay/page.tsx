import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import PageHero from '@/components/PageHero';
import SectionTitle from '@/components/SectionTitle';
import EmptyState from '@/components/EmptyState';
import { getAllVachanalay, getSubjectCategories } from '@/lib/queries';

export const metadata: Metadata = {
  title: 'ग्राम वाचनालय',
  description:
    '"जो बांचेगा वही बचेगा" — झाबुआ के 900+ गाँवों में शिवगंगा ग्राम वाचनालय। 125 पुस्तकों की पेटी, 14 विषय, और ग्रामीण पठन क्रांति।',
};

// 14 subject categories
const SEED_SUBJECTS = [
  { name: 'खेती एवं कृषि', icon: '🌾', desc: 'स्थानीय देशी खेती के तरीके और फसलें' },
  { name: 'पशुपालन', icon: '🐄', desc: 'पशुओं की देखभाल और संवर्धन' },
  { name: 'स्वास्थ्य एवं आयुर्वेद', icon: '🌿', desc: 'प्राकृतिक स्वास्थ्य और जड़ी-बूटियाँ' },
  { name: 'भील समाज व इतिहास', icon: '📜', desc: 'गौरवशाली इतिहास और स्वतंत्रता सेनानी' },
  { name: 'लोककथाएँ एवं गाथाएँ', icon: '📖', desc: 'गाँव की कहानियाँ और लोकगाथाएँ' },
  { name: 'बाल साहित्य', icon: '👧', desc: 'बच्चों के लिए सचित्र प्रेरणादायी पुस्तकें' },
  { name: 'सरल विज्ञान', icon: '🔬', desc: 'सरल भाषा में प्रायोगिक विज्ञान' },
  { name: 'शिक्षा एवं संस्कार', icon: '✏️', desc: 'जीवन निर्माण और शिक्षा' },
  { name: 'भाषा एवं व्याकरण', icon: '📝', desc: 'हिंदी और स्थानीय बोली' },
  { name: 'महिला एवं बाल विकास', icon: '👩', desc: 'मातृ-शिशु स्वास्थ्य और महिला सशक्तीकरण' },
  { name: 'जल-जंगल-ज़मीन', icon: '🌊', desc: 'हलमा और प्राकृतिक संसाधन' },
  { name: 'संस्कृति एवं परंपराएँ', icon: '🎭', desc: 'भील संस्कृति, पर्व और लोककला' },
  { name: 'कौशल एवं स्वावलंबन', icon: '🔧', desc: 'ग्रामीण हुनर और स्वरोज़गार' },
  { name: 'ग्राम व्यवस्था एवं न्याय', icon: '⚖️', desc: 'गाँव की पारंपरिक तड़वी-बड़वा व्यवस्था' },
];

const SEED_VACHANALAY = [
  { _id: 'v-silkhodari', village: 'सिलखोदरी', block: 'झाबुआ', district: 'झाबुआ', note: 'सक्रिय वाचनालय — "जो बांचेगा वही बचेगा"' },
  { _id: 'v-udaypuria', village: 'उदयपुरिया', block: 'झाबुआ', district: 'झाबुआ', note: 'वितरण व शुरूआत: 27/10/2023' },
  { _id: 'v-dharampuri', village: 'धरमपुरी', block: 'झाबुआ', district: 'झाबुआ', note: 'वितरण व शुरूआत: 27/10/2023' },
  { _id: 'v-bhamarda', village: 'भमरदा', block: 'झाबुआ', district: 'झाबुआ', note: 'वितरण व शुरूआत: 27/10/2023' },
  { _id: 'v-semalpada', village: 'सेमलपाड़ा', block: 'थांदला', district: 'झाबुआ', note: 'ग्राम गुरुकुल वर्ग एवं सक्रिय वाचनालय' },
  { _id: 'v-salarpada', village: 'सालारपाड़ा', block: 'झाबुआ', district: 'झाबुआ', note: '3 फलियों के 49 युवा सक्रिय पाठक' },
  { _id: 'v-ranpura', village: 'रणपुरा', block: 'झाबुआ', district: 'झाबुआ', note: 'कृषक एवं युवा पाठक समूह' },
  { _id: 'v-meghnagar', village: 'मेघनगर', block: 'मेघनगर', district: 'झाबुआ', note: 'नियमित पठन सत्र' },
  { _id: 'v-petlawad', village: 'पेटलावद', block: 'पेटलावद', district: 'झाबुआ', note: 'सक्रिय पुस्तकालय केंद्र' },
];

const FIELD_GALLERY = [
  {
    image: '/content-media/35.jpeg',
    title: 'शिवगंगा ग्राम वाचनालय — सिलखोदरी',
    desc: 'गाँव की दीवार पर लिखा नारा: "जो बांचेगा, वही बचेगा"। ग्रामीण बुजुर्ग और बच्चे पेटी के साथ।',
  },
  {
    image: '/content-media/37.jpeg',
    title: '125 पुस्तकों का विशेष संचयन',
    desc: 'सम्पूर्ण रामायण, चन्द्रशेखर आज़ाद, भगत सिंह, शिवाजी, विवेकानन्द, पंचतंत्र से सजी वाचनालय पेटी।',
  },
  {
    image: '/content-media/36.jpeg',
    title: 'गाँव के बच्चों का पठन चक्र',
    desc: 'सफेद धातु पेटी के चारों ओर बैठकर उत्साह से कहानियाँ और महापुरुषों की जीवनी पढ़ते बच्चे।',
  },
  {
    image: '/content-media/26.jpeg',
    title: 'वितरण एवं शुरूआत — उदयपुरिया व धरमपुरी',
    desc: '27 अक्टूबर 2023 को उदयपुरिया और धरमपुरी में ग्राम वाचनालय की औपचारिक स्थापना।',
  },
  {
    image: '/content-media/27.jpeg',
    title: 'वितरण — ग्राम भमरदा',
    desc: '27 अक्टूबर 2023 को ग्राम भमरदा में वाचनालय पेटी सौंपते हुए शिवगंगा कार्यकर्ता।',
  },
  {
    image: '/content-media/25.jpeg',
    title: 'गाँव-गाँव तक ज्ञान का सफर',
    desc: 'मोटरसाइकिल पर पेटी लादकर ग्राम-चुही पहुँचाते युवा कार्यकर्ता ("भीलांचल की आवाज")।',
  },
];

const SEED_STORIES = [
  {
    _id: 's1',
    title: 'खेती में नई समझ मिली',
    author: 'कमलेश भाई भील',
    village: 'सिलखोदरी',
    body: 'वाचनालय में खेती और जल-संरक्षण की किताब पढ़ने के बाद हमने खेत के किनारे मेड़बंदी की और खाद का देसी तरीका अपनाया। मिट्टी और फसल दोनों में फर्क दिखा।',
  },
  {
    _id: 's2',
    title: 'बच्चे अब टीवी-मोबाइल छोड़ किताबें पढ़ते हैं',
    author: 'राधा बाई',
    village: 'उदयपुरिया',
    body: 'हमारे गाँव में जब से वाचनालय की पेटी आई है, शाम को बच्चे एक जगह बैठकर महापुरुषों और पंचतंत्र की कहानियाँ पढ़ते हैं। इससे उनमें सीखने की ललक बढ़ी है।',
  },
  {
    _id: 's3',
    title: 'इतिहास की सही जानकारी मिली',
    author: 'दिनेश तड़वी',
    village: 'भमरदा',
    body: 'किताबों से हमें पता चला कि हमारे पूर्वजों ने देश की आज़ादी में कितना बड़ा बलिदान दिया। यह पढ़कर गाँव के युवाओं का सीना गर्व से चौड़ा हो जाता है।',
  },
];

export default async function GramVachanalaPage() {
  let vachanalay: any[] = [];
  let subjects: typeof SEED_SUBJECTS = [];
  const stories = SEED_STORIES;

  try {
    vachanalay = await getAllVachanalay() || [];
  } catch { /* empty */ }
  if (!vachanalay || vachanalay.length === 0) vachanalay = SEED_VACHANALAY;

  try {
    subjects = await getSubjectCategories() || [];
  } catch { /* empty */ }
  if (!subjects || subjects.length === 0) subjects = SEED_SUBJECTS;

  return (
    <>
      <PageHero
        title="ग्राम वाचनालय"
        description='"जो बांचेगा वही बचेगा" — झाबुआ के हर गाँव में ज्ञान का सामुदायिक दीप'
        breadcrumb={[{ label: 'ग्राम वाचनालय' }]}
        variant="mustard"
      />

      {/* ── Intro + Visual Banner ─────────────────────── */}
      <section className="py-16 section-cream" aria-label="ग्राम वाचनालय परिचय">
        <div className="container-main">
          <div className="grid lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6">
              <SectionTitle title="ग्राम वाचनालय क्या है?" />
              <div className="prose-hindi text-base md:text-lg leading-relaxed mb-6">
                <p>
                  ग्राम वाचनालय केवल पुस्तकों का संग्रह नहीं, बल्कि ग्रामीण समाज में ज्ञान, संस्कार और स्वाभिमान का जीवंत केंद्र है।
                </p>
                <p>
                  झाबुआ ज़िले के <strong>900 से अधिक गाँवों</strong> में हर गाँव में एक सुदृढ़ पेटी में <strong>125 चुनिंदा पुस्तकें</strong> पहुँचाई गई हैं, जो <strong>14 जीवनोपयोगी विषयों</strong> को समाहित करती हैं।
                </p>
                <blockquote
                  className="p-4 rounded-xl font-bold text-lg"
                  style={{
                    backgroundColor: 'rgba(200, 102, 30, 0.1)',
                    borderLeft: '4px solid var(--color-orange)',
                    color: 'var(--color-charcoal)',
                  }}
                >
                  "जो बांचेगा वही बचेगा" — यानी जो पढ़ेगा, वही अपने जल, जंगल, ज़मीन, संस्कृति और स्वाभिमान की रक्षा कर सकेगा।
                </blockquote>
              </div>
            </div>

            {/* Real Silkhodari photo */}
            <div className="lg:col-span-6">
              <div
                className="relative rounded-2xl overflow-hidden shadow-2xl"
                style={{
                  aspectRatio: '4/3',
                  border: '5px solid var(--color-mustard)',
                }}
              >
                <Image
                  src="/content-media/35.jpeg"
                  alt="शिवगंगा ग्राम वाचनालय सिलखोदरी — जो बांचेगा वही बचेगा"
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 1024px) 100vw, 550px"
                />
                <div
                  className="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-black/80 to-transparent text-white text-xs md:text-sm font-medium"
                >
                  ग्राम सिलखोदरी: शिवगंगा ग्राम वाचनालय — "जो बांचेगा वही बचेगा"
                </div>
              </div>
            </div>
          </div>

          {/* Big Stat Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
            {[
              { val: '900+', label: 'गाँवों में वाचनालय' },
              { val: '125', label: 'पुस्तकें प्रति पेटी' },
              { val: '14', label: 'ज्ञान के विविध विषय' },
              { val: '2009', label: 'से अविरल ज्ञान-यात्रा' },
            ].map((stat) => (
              <div
                key={stat.label}
                className="p-6 rounded-2xl text-center shadow-sm"
                style={{ backgroundColor: 'var(--color-mustard)' }}
              >
                <div
                  className="text-3xl md:text-5xl font-bold mb-1"
                  style={{ color: 'var(--color-charcoal)', fontFamily: 'var(--font-heading)' }}
                >
                  {stat.val}
                </div>
                <p className="text-xs md:text-sm font-semibold" style={{ color: 'rgba(26, 26, 26, 0.8)' }}>
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 125 Book Box Spotlight ────────────────────── */}
      <section className="py-16 section-sand" aria-label="125 पुस्तकों की पेटी">
        <div className="container-main">
          <SectionTitle
            title="125 पुस्तकों की पेटी"
            subtitle="गाँव के बच्चों, युवाओं और बुजुर्गों के लिए संजोया गया ज्ञान का भंडार"
          />

          <div className="grid lg:grid-cols-12 gap-8 items-center mb-12">
            <div className="lg:col-span-5">
              <div
                className="relative rounded-2xl overflow-hidden shadow-xl"
                style={{ aspectRatio: '4/3', border: '4px solid var(--color-orange)' }}
              >
                <Image
                  src="/content-media/37.jpeg"
                  alt="ग्राम वाचनालय में रखी 125 पुस्तकों का वास्तविक संचयन"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 450px"
                />
                <div className="absolute bottom-0 inset-x-0 p-2 bg-black/70 text-white text-xs text-center">
                  वाचनालय पेटी में उपलब्ध वास्तविक पुस्तकें
                </div>
              </div>
            </div>
            <div className="lg:col-span-7">
              <h3
                className="text-2xl font-bold mb-4"
                style={{ color: 'var(--color-charcoal)', fontFamily: 'var(--font-heading)' }}
              >
                रामायण से लेकर आज़ाद व विज्ञान तक
              </h3>
              <p className="text-base leading-relaxed mb-4" style={{ color: 'var(--color-clay)' }}>
                हर पेटी में सम्पूर्ण रामायण, अमर क्रांतिकारी चन्द्रशेखर आज़ाद, नेताजी सुभाषचंद्र बोस, भगत सिंह, छत्रपति शिवाजी महाराज, महाराणा प्रताप, स्वामी विवेकानन्द, पंचतंत्र, अकबर-बीरबल, विक्रम बेताल, और सरल कृषि-स्वास्थ्य की पुस्तकें शामिल हैं।
              </p>
              <p className="text-base leading-relaxed mb-4" style={{ color: 'var(--color-clay)' }}>
                पेटी लोहे की टिकाऊ धातु से बनाई जाती है जिस पर शिवगंगा का प्रतीक चक्र अंकित होता है, ताकि बारिश और धूप में भी ज्ञान सुरक्षित रहे।
              </p>
              <div className="flex flex-wrap gap-3">
                <Link href="/pustakein/vachanalay-125-pustakein" className="btn-primary text-sm">
                  125 पुस्तकों का विवरण देखें
                </Link>
                <Link href="/hamse-judein" className="btn-secondary text-sm">
                  अपने गाँव में वाचनालय शुरू करें
                </Link>
              </div>
            </div>
          </div>

          {/* 14 Subjects Grid */}
          <h4
            className="text-xl font-bold mb-6 text-center"
            style={{ color: 'var(--color-charcoal)', fontFamily: 'var(--font-heading)' }}
          >
            वाचनालय में समाहित 14 विषय
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3">
            {subjects.map((sub, i) => (
              <div
                key={sub.name || i}
                className="flex flex-col items-center gap-2 p-3 rounded-2xl text-center card-hover transition-all"
                style={{ backgroundColor: 'white', border: '1.5px solid var(--color-sand-dark)' }}
              >
                <span className="text-3xl" aria-hidden="true">{sub.icon || '📚'}</span>
                <span className="text-xs font-bold leading-tight" style={{ color: 'var(--color-charcoal)' }}>
                  {sub.name}
                </span>
                {sub.desc && (
                  <span className="text-[10px] leading-tight opacity-75" style={{ color: 'var(--color-clay)' }}>
                    {sub.desc}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Real Field Reports & Photo Gallery ─────────── */}
      <section className="py-16 section-cream" aria-label="धरातल से झलकियाँ">
        <div className="container-main">
          <SectionTitle
            title="धरातल पर ग्राम वाचनालय — प्रत्यक्ष चित्र"
            subtitle="झाबुआ के फलियों और चौपालों में पुस्तकों का उत्सव और ग्रामीणों की सहभागिता"
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {FIELD_GALLERY.map((item, idx) => (
              <article key={idx} className="card-base overflow-hidden flex flex-col group">
                <div
                  className="relative overflow-hidden"
                  style={{ aspectRatio: '16/10', backgroundColor: 'var(--color-sand)' }}
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <div className="p-4 flex flex-col gap-1 flex-1">
                  <h3
                    className="text-base font-bold"
                    style={{ color: 'var(--color-charcoal)', fontFamily: 'var(--font-heading)' }}
                  >
                    {item.title}
                  </h3>
                  <p className="text-xs leading-relaxed" style={{ color: 'var(--color-clay)' }}>
                    {item.desc}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Vachanalay List ───────────────────────────── */}
      <section className="py-16 section-sand" aria-label="वाचनालय सूची">
        <div className="container-main">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <SectionTitle
                title="प्रमुख ग्राम वाचनालय केंद्र"
                subtitle="झाबुआ के विभिन्न विकासखंडों में सक्रिय सामुदायिक पुस्तकालय"
              />
            </div>
            <Link href="/gram-atlas" className="text-sm font-semibold hover:underline" style={{ color: 'var(--color-orange)' }}>
              गाँव एटलस में देखें →
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {vachanalay.map((v: any) => (
              <div key={v._id} className="card-base p-5">
                <div className="flex items-center justify-between mb-2">
                  <h3
                    className="font-bold text-lg"
                    style={{ color: 'var(--color-charcoal)', fontFamily: 'var(--font-heading)' }}
                  >
                    ग्राम {v.village}
                  </h3>
                  <span
                    className="text-xs px-2.5 py-0.5 rounded-full font-medium"
                    style={{ backgroundColor: 'rgba(200, 102, 30, 0.1)', color: 'var(--color-orange)' }}
                  >
                    {v.block}
                  </span>
                </div>
                <p className="text-xs" style={{ color: 'var(--color-clay)' }}>
                  ज़िला: {v.district}
                </p>
                {v.note && (
                  <p className="text-xs mt-3 italic pt-2 border-t border-[var(--color-sand-dark)]" style={{ color: 'var(--color-charcoal)' }}>
                    📌 {v.note}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Stories ───────────────────────────────────── */}
      <section className="py-16 section-cream" aria-label="अनुभव और कहानियाँ">
        <div className="container-main">
          <SectionTitle
            title="गाँव के पाठकों के अनुभव"
            subtitle="जब हाथ में किताब आई, तो कैसे बदल गई सोच और गाँव का माहौल"
          />
          <div className="grid md:grid-cols-3 gap-6">
            {stories.map((story) => (
              <blockquote
                key={story._id}
                className="card-base p-6 flex flex-col justify-between"
              >
                <p
                  className="text-sm md:text-base leading-relaxed mb-6 italic"
                  style={{ color: 'var(--color-charcoal)' }}
                >
                  "{story.body}"
                </p>
                <footer className="flex items-center gap-3 pt-4 border-t border-[var(--color-sand-dark)]">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shrink-0"
                    style={{ backgroundColor: 'var(--color-mustard)', color: 'var(--color-charcoal)' }}
                    aria-hidden="true"
                  >
                    {story.author?.[0] || 'प'}
                  </div>
                  <div>
                    <cite className="not-italic font-bold text-sm block" style={{ color: 'var(--color-charcoal)' }}>
                      {story.author}
                    </cite>
                    <span className="text-xs block" style={{ color: 'var(--color-clay)' }}>
                      ग्राम: {story.village} (झाबुआ)
                    </span>
                  </div>
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
