import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import {
  BookOpen, MapPin, Music, History, Sprout, Library,
  ChevronRight, Users, GraduationCap, Pen
} from 'lucide-react';
import StatsGrid from '@/components/StatsGrid';
import BookCard from '@/components/BookCard';
import DotDivider from '@/components/DotDivider';
import EmptyState from '@/components/EmptyState';
import { getFeaturedBooks } from '@/lib/queries';
import { REAL_BOOKS } from '@/lib/seedData';

export const metadata: Metadata = {
  title: 'ग्रामगुरुकुल प्रकाशन | Gram Gurukul Prakashan — आधिकारिक वेबसाइट (gramgurukulprakashan.com)',
  description:
    'ग्रामगुरुकुल प्रकाशन (Gram Gurukul Prakashan — gramgurukulprakashan.com) की आधिकारिक वेबसाइट। झाबुआ (मध्य प्रदेश) से परंपरागत ज्ञान, भील संस्कृति, ग्राम वाचनालय "जो बांचेगा वही बचेगा" और ग्राम एटलस का प्रमुख प्रकाशन संस्थान।',
  alternates: {
    canonical: 'https://gramgurukulprakashan.com',
  },
};

const STATS = [
  { value: 900, suffix: '+', label: 'गाँवों में ग्राम वाचनालय', sublabel: 'झाबुआ + आलीराजपुर' },
  { value: 125, label: 'पुस्तकें प्रति वाचनालय', sublabel: 'हर पेटी में' },
  { value: 14, label: 'विषय', sublabel: 'विविध ज्ञान' },
  { value: 2009, label: 'से सक्रिय', sublabel: 'अविरल अभियान' },
];

const KNOWLEDGE_LINKS = [
  {
    href: '/gaon-se-shiksha',
    icon: <GraduationCap size={28} />,
    title: 'गाँव से शिक्षा',
    desc: 'गाँव की शिक्षा कैसी हो?',
  },
  {
    href: '/gram-atlas',
    icon: <MapPin size={28} />,
    title: 'ग्राम एटलस',
    desc: 'हर गाँव की कहानी व नक्शा',
  },
  {
    href: '/sanskriti-parampara',
    icon: <Music size={28} />,
    title: 'संस्कृति और परंपराएँ',
    desc: 'भील समाज की समृद्ध धरोहर',
  },
  {
    href: '/bhil-itihas',
    icon: <History size={28} />,
    title: 'भील समाज का इतिहास',
    desc: 'कोटिया भील व स्वतंत्रता संग्राम',
  },
  {
    href: '/parampragat-gyan',
    icon: <Sprout size={28} />,
    title: 'परंपरागत ज्ञान',
    desc: 'देसी बीज, खेती और आयुर्वेद',
  },
  {
    href: '/pustakein',
    icon: <BookOpen size={28} />,
    title: 'पुस्तकें एवं प्रकाशन',
    desc: 'नवभगीरथ व मौलिक पुस्तकें',
  },
];

const WORK_CARDS = [
  {
    icon: <Library size={32} />,
    title: 'शिवगंगा ग्राम वाचनालय',
    desc: 'गाँवों में पुस्तकों की पेटी स्थापित, जहाँ 125 पुस्तकों के माध्यम से पठन संस्कृति घर-घर पहुँच रही है।',
    href: '/gram-vachanalay',
  },
  {
    icon: <Users size={32} />,
    title: 'ग्रामगुरुकुल वर्ग',
    desc: 'गाँव के युवाओं, किशोरों और महिलाओं के लिए स्वावलंबन, व्यक्तित्व विकास और सामाजिक दायित्व के वर्ग।',
    href: '/karya',
  },
  {
    icon: <BookOpen size={32} />,
    title: 'स्थानीय ज्ञान का संकलन',
    desc: 'गाँव के अद्वितीय परंपरागत ज्ञान, देशी बीजों, जल-संरक्षण और लोक इतिहास को प्रामाणिक रूप से लिपिबद्ध करना।',
    href: '/pustakein',
  },
  {
    icon: <Pen size={32} />,
    title: 'सरल भाषा में प्रकाशन',
    desc: 'शहरों के आधुनिक विज्ञान और तकनीक को गाँव के पाठकों के लिए अत्यंत सरल हिंदी व स्थानीय बोली में प्रकाशित करना।',
    href: '/pustakein',
  },
];

const STORY_PHOTOS = [
  {
    src: '/content-media/mahesh-sharma-elder.webp',
    caption: 'पद्मश्री महेश शर्मा जी ग्रामीण बुजुर्ग के साथ',
    tag: 'आत्मीय संवाद',
  },
  {
    src: '/content-media/silkhodari-vachanalay.webp',
    caption: 'ग्राम सिलखोदरी में शिवगंगा वाचनालय की शुरूआत',
    tag: 'जो बांचेगा वही बचेगा',
  },
  {
    src: '/content-media/children-reading-circle.webp',
    caption: 'वाचनालय पेटी के चारों ओर पठन चक्र में बच्चे',
    tag: 'बाल पठन संस्कृति',
  },
  {
    src: '/content-media/halma-youth-group.webp',
    caption: 'ग्रामगुरुकुल प्रकाशन की टोली',
    tag: 'प्रकाशन टोली',
  },
  {
    src: '/content-media/semalpada-gurukul-varg.webp',
    caption: 'ग्रामगुरुकुल वर्ग — सेमलपाड़ा (थांदला)',
    tag: 'व्यक्तित्व विकास',
  },
  {
    src: '/content-media/malvai-ancient-temple.webp',
    caption: 'मालवई के 10वीं सदी के प्राचीन मंदिर में अध्ययन दल',
    tag: 'ऐतिहासिक धरोहर',
  },
];

export default async function HomePage() {
  let books: any[] = [];

  try {
    books = await getFeaturedBooks(4) || [];
  } catch { /* empty */ }
  if (!books || books.length === 0) books = REAL_BOOKS.slice(0, 4);

  return (
    <>
      {/* ── 1. HERO (Inspired by Shivganga Visual Depth) ── */}
      <section
        className="relative overflow-hidden min-h-[85vh] flex items-center hero-gradient dot-pattern py-12 md:py-16"
        aria-label="मुख्य परिचय"
      >
        <div
          className="absolute top-10 right-0 w-96 h-96 rounded-full opacity-10 pointer-events-none"
          style={{ border: '40px solid var(--color-mustard)', transform: 'translate(40%, -20%)' }}
          aria-hidden="true"
        />
        <div
          className="absolute bottom-0 left-0 w-72 h-72 rounded-full opacity-8 pointer-events-none"
          style={{ border: '30px solid var(--color-orange)', transform: 'translate(-40%, 40%)' }}
          aria-hidden="true"
        />

        <div className="container-main relative z-10 py-12 md:py-20">
          <div className="grid lg:grid-cols-12 gap-10 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 animate-fade-in-up">
              <div
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6 text-sm font-semibold"
                style={{
                  backgroundColor: 'rgba(200, 102, 30, 0.12)',
                  color: 'var(--color-orange)',
                  border: '1px solid rgba(200, 102, 30, 0.3)',
                }}
              >
                <span>🌿</span>
                <span>ग्रामगुरुकुल प्रकाशन — झाबुआ</span>
              </div>

              <h1
                className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-[1.15]"
                style={{ color: 'var(--color-charcoal)', fontFamily: 'var(--font-heading)' }}
              >
                <span className="sr-only">ग्रामगुरुकुल प्रकाशन (Gram Gurukul Prakashan — gramgurukulprakashan.com) — </span>
                "जो बांचेगा
                <br />
                <span style={{ color: 'var(--color-orange)' }}>वही बचेगा"</span>
              </h1>

              <p
                className="text-lg md:text-xl mb-8 leading-relaxed max-w-2xl"
                style={{ color: 'var(--color-clay)' }}
              >
                झाबुआ के परंपरागत ज्ञान-विज्ञान और भील संस्कृति को देश-दुनिया में सही रूप में ले जाना, और आधुनिक ज्ञान को झाबुआ के <strong>गाँवों</strong> में सरल भाषा में पहुँचाना।
              </p>

              <div className="flex flex-wrap gap-4 items-center">
                <Link href="/gram-vachanalay" className="btn-primary text-base px-6 py-3">
                  ग्राम वाचनालय देखें
                  <ChevronRight size={18} aria-hidden="true" />
                </Link>
                <Link href="/pustakein" className="btn-secondary text-base px-6 py-3">
                  पुस्तकें एवं प्रकाशन
                </Link>
              </div>

              <div className="mt-8 pt-6 border-t border-[var(--color-sand-dark)] flex items-center gap-6 text-xs md:text-sm font-medium" style={{ color: 'var(--color-clay)' }}>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-600"></span>
                  <span>सक्रिय ग्राम वाचनालय</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                  <span>125 पुस्तकें प्रति पेटी</span>
                </div>
              </div>
            </div>

            {/* Right: Featured Photo Showcase */}
            <div className="lg:col-span-5 animate-fade-in-up-delay-1 flex justify-center">
              <div className="relative w-full max-w-md">
                {/* Main Card */}
                <div
                  className="relative rounded-3xl overflow-hidden shadow-2xl"
                  style={{
                    aspectRatio: '4/3',
                    border: '5px solid var(--color-mustard)',
                    boxShadow: '0 20px 50px rgba(122, 74, 43, 0.25)',
                  }}
                >
                  <Image
                    src="/content-media/silkhodari-vachanalay.webp"
                    alt="शिवगंगा ग्राम वाचनालय सिलखोदरी — जो बांचेगा वही बचेगा"
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 768px) 100vw, 450px"
                  />
                  <div className="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-black/85 via-black/40 to-transparent text-white">
                    <p className="text-xs font-semibold text-amber-300">ग्राम सिलखोदरी — झाबुआ</p>
                    <p className="text-sm font-bold">शिवगंगा ग्राम वाचनालय: "जो बांचेगा, वही बचेगा"</p>
                  </div>
                </div>

                {/* Overlapping Floating Badge */}
                <div
                  className="absolute -bottom-6 -left-4 md:-left-8 bg-white p-4 rounded-2xl shadow-xl flex items-center gap-3"
                  style={{ border: '2px solid var(--color-mustard)', maxWidth: '280px' }}
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 font-bold text-lg"
                    style={{ backgroundColor: 'var(--color-mustard)', color: 'var(--color-charcoal)' }}
                  >
                    125
                  </div>
                  <div>
                    <p className="text-xs font-bold leading-tight" style={{ color: 'var(--color-charcoal)' }}>
                      पुस्तकों का संचयन
                    </p>
                    <p className="text-[11px] leading-tight mt-0.5" style={{ color: 'var(--color-clay)' }}>
                      रामायण, आज़ाद, शिवाजी व पंचतंत्र
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. IMPACT STATS ─────────────────────────────── */}
      <section className="py-16 section-sand" aria-label="हमारे प्रभाव के आँकड़े">
        <div className="container-main">
          <h2
            className="text-center text-2xl font-bold mb-12"
            style={{ color: 'var(--color-clay)', fontFamily: 'var(--font-heading)' }}
          >
            झाबुआ की माटी में ज्ञान-क्रांति
          </h2>
          <StatsGrid counters={STATS} />
        </div>
      </section>


      {/* ── 4. WORK CARDS ───────────────────────────────── */}
      <section className="py-16 section-cream" aria-label="हमारे कार्य">
        <div className="container-main">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2
              className="text-3xl md:text-4xl font-bold mb-3"
              style={{ color: 'var(--color-charcoal)', fontFamily: 'var(--font-heading)' }}
            >
              हमारे प्रमुख कार्य
            </h2>
            <p style={{ color: 'var(--color-clay)' }}>
              गाँव और शहर के बीच ज्ञान का सेतु बनाना — गाँव का ज्ञान दुनिया तक, दुनिया का विज्ञान गाँव तक
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {WORK_CARDS.map((card) => (
              <Link
                key={card.title}
                href={card.href}
                className="card-base p-6 flex flex-col gap-4 no-underline group hover:shadow-xl transition-all"
                style={{ textDecoration: 'none' }}
              >
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110"
                  style={{ backgroundColor: 'rgba(200, 102, 30, 0.1)', color: 'var(--color-orange)' }}
                  aria-hidden="true"
                >
                  {card.icon}
                </div>
                <h3
                  className="text-lg font-bold"
                  style={{ color: 'var(--color-charcoal)', fontFamily: 'var(--font-heading)' }}
                >
                  {card.title}
                </h3>
                <p className="text-sm leading-relaxed flex-1" style={{ color: 'var(--color-clay)' }}>
                  {card.desc}
                </p>
                <span className="text-sm font-semibold group-hover:underline flex items-center gap-1" style={{ color: 'var(--color-orange)' }}>
                  अधिक जानें →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. REAL PHOTO STORIES GRID (Shivganga Heritage) ── */}
      <section className="py-16 section-sand" aria-label="धरातल से जीवंत तस्वीरें">
        <div className="container-main">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <DotDivider />
            <h2
              className="text-3xl md:text-4xl font-bold mb-3"
              style={{ color: 'var(--color-charcoal)', fontFamily: 'var(--font-heading)' }}
            >
              धरातल से जीवंत झलकियाँ
            </h2>
            <p style={{ color: 'var(--color-clay)' }}>
              झाबुआ के गाँवों में लोक-चेतना, पठन क्रांति और हलमा की प्रेरणादायी यात्रा
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {STORY_PHOTOS.map((photo, i) => (
              <div
                key={i}
                className="card-base overflow-hidden flex flex-col group hover:shadow-xl transition-all"
              >
                <div
                  className="relative overflow-hidden aspect-4/3"
                  style={{ backgroundColor: 'var(--color-sand)' }}
                >
                  <Image
                    src={photo.src}
                    alt={photo.caption}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute top-3 left-3">
                    <span
                      className="text-[11px] font-bold px-2.5 py-1 rounded-full shadow"
                      style={{ backgroundColor: 'var(--color-mustard)', color: 'var(--color-charcoal)' }}
                    >
                      {photo.tag}
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <p
                    className="text-sm font-semibold leading-snug"
                    style={{ color: 'var(--color-charcoal)' }}
                  >
                    {photo.caption}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. FEATURED BOOKS SHOWCASE ──────────────────── */}
      <section className="py-16 section-cream" aria-label="प्रमुख पुस्तकें">
        <div className="container-main">
          <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
            <div>
              <h2
                className="text-3xl md:text-4xl font-bold"
                style={{ color: 'var(--color-charcoal)', fontFamily: 'var(--font-heading)' }}
              >
                प्रमुख पुस्तकें एवं प्रकाशन
              </h2>
              <p className="text-sm mt-1" style={{ color: 'var(--color-clay)' }}>
                नवभगीरथ, भीलांचल की आवाज, और स्थानीय पाठ्यपुस्तकें
              </p>
            </div>
            <Link
              href="/pustakein"
              className="text-sm font-semibold hover:underline flex items-center gap-1"
              style={{ color: 'var(--color-orange)' }}
            >
              सभी पुस्तकें देखें →
            </Link>
          </div>

          {books.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {books.map((book) => (
                <BookCard key={book._id} book={book} />
              ))}
            </div>
          ) : (
            <EmptyState message="अभी कोई पुस्तक उपलब्ध नहीं है।" />
          )}
        </div>
      </section>

      {/* ── 7. KNOWLEDGE QUICK LINKS ────────────────────── */}
      <section
        className="py-16"
        style={{ backgroundColor: 'var(--color-charcoal)' }}
        aria-label="ज्ञान के द्वार"
      >
        <div className="container-main">
          <h2
            className="text-3xl md:text-4xl font-bold mb-3 text-center"
            style={{ color: 'white', fontFamily: 'var(--font-heading)' }}
          >
            ज्ञान के द्वार
          </h2>
          <p className="text-center mb-10" style={{ color: 'var(--color-sand)' }}>
            भील संस्कृति, इतिहास, स्थानीय भूगोल और शिक्षा की समग्र दृष्टि
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {KNOWLEDGE_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex flex-col gap-3 p-5 rounded-2xl transition-all no-underline group hover:border-[var(--color-mustard)]"
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.06)',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  textDecoration: 'none',
                }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110"
                  style={{ backgroundColor: 'rgba(227, 176, 35, 0.15)', color: 'var(--color-mustard)' }}
                  aria-hidden="true"
                >
                  {link.icon}
                </div>
                <h3
                  className="font-bold text-base"
                  style={{ color: 'white', fontFamily: 'var(--font-heading)' }}
                >
                  {link.title}
                </h3>
                <p className="text-sm" style={{ color: 'rgba(240, 228, 200, 0.7)' }}>
                  {link.desc}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>


      {/* ── 9. JOIN CTA ─────────────────────────────────── */}
      <section
        className="py-16 relative overflow-hidden dot-pattern-mustard"
        style={{ backgroundColor: 'var(--color-mustard)' }}
        aria-label="आप कैसे जुड़ सकते हैं"
      >
        <div
          className="absolute right-0 top-0 w-64 h-64 rounded-full opacity-20 pointer-events-none"
          style={{ border: '20px solid var(--color-charcoal)', transform: 'translate(30%, -30%)' }}
          aria-hidden="true"
        />
        <div className="container-main relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2
              className="text-3xl md:text-4xl font-bold mb-4"
              style={{ color: 'var(--color-charcoal)', fontFamily: 'var(--font-heading)' }}
            >
              इस ज्ञान-यज्ञ में आपका स्वागत है
            </h2>
            <p className="text-lg mb-8" style={{ color: 'rgba(26, 26, 26, 0.8)' }}>
              हमें लेखकों, शोधकर्ताओं, शिक्षकों, डिज़ाइनरों, विषय विशेषज्ञों और गाँव के जानकार अग्रजों की आवश्यकता है। झाबुआ के ज्ञान का उजियारा दुनिया में फैलाने और नए ज्ञान को झाबुआ में लाने के लिए जुड़ें।
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/hamse-judein" className="btn-secondary text-base px-6 py-3">
                हमसे जुड़ें
                <ChevronRight size={18} aria-hidden="true" />
              </Link>
              <Link href="/sampark" className="btn-secondary text-base px-6 py-3">
                संपर्क करें
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
