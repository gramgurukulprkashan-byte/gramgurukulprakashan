import type { Metadata } from 'next';
import Link from 'next/link';
import {
  BookOpen, MapPin, Music, History, Sprout, Library,
  ChevronRight, Users, GraduationCap, Pen
} from 'lucide-react';
import StatsGrid from '@/components/StatsGrid';
import NoticeCard from '@/components/NoticeCard';
import BookCard from '@/components/BookCard';
import DotDivider from '@/components/DotDivider';
import EmptyState from '@/components/EmptyState';
import { getLatestNotices, getFeaturedBooks } from '@/lib/queries';

export const metadata: Metadata = {
  title: 'ग्राम गुरुकुल प्रकाशन — जो बांचेगा वही बचेगा',
  description:
    'गाँव के परंपरागत ज्ञान और भील समाज की सांस्कृतिक धरोहर को देश और दुनिया के समक्ष लाने का संकल्प। झाबुआ, मध्य प्रदेश।',
};

// ─── Seed data for dev / fallback ─────────────────────────
const SEED_NOTICES = [
  {
    _id: 'seed-1',
    title: 'ग्राम वाचनालय की नई पुस्तकें उपलब्ध',
    slug: { current: 'gram-vachanalay-nayi-pustakein' },
    description: 'झाबुआ ज़िले के ग्राम वाचनालयों में नई पुस्तकें पहुँचाई जा रही हैं। जानें किन गाँवों को पुस्तकें मिलेंगी।',
    publishDate: '2026-10-15',
    important: true,
    hasPdf: false,
    hasImage: true,
  },
  {
    _id: 'seed-2',
    title: 'सशक्तिकरण वर्ग — अगला सत्र',
    slug: { current: 'sashaktikaran-varg-agla-satra' },
    description: 'अगले सशक्तिकरण वर्ग में भाग लेने के इच्छुक लोग अभी आवेदन कर सकते हैं।',
    publishDate: '2026-10-10',
    important: false,
    hasPdf: true,
    hasImage: false,
  },
  {
    _id: 'seed-3',
    title: '"मेरा जिला" पुस्तक निर्माण में सहयोग करें',
    slug: { current: 'mera-jila-sahyog' },
    description: 'कक्षा 6 सामाजिक विज्ञान के लिए "मेरा जिला" पुस्तक के निर्माण में आपका सहयोग आमंत्रित है।',
    publishDate: '2026-10-01',
    important: false,
    hasPdf: false,
    hasImage: false,
  },
];

const SEED_BOOKS = [
  {
    _id: 'book-1',
    title: 'मेरा जिला — भाग 1',
    slug: { current: 'mera-jila-bhag-1' },
    author: 'ग्राम गुरुकुल प्रकाशन',
    cover: null,
    subject: 'सामाजिक विज्ञान',
    status: 'निर्माणाधीन' as const,
    description: 'कक्षा 6 के लिए झाबुआ ज़िले पर आधारित सामाजिक विज्ञान की पाठ्यपुस्तक।',
  },
  {
    _id: 'book-2',
    title: 'ग्राम एटलस — झाबुआ',
    slug: { current: 'gram-atlas-jhabua' },
    author: 'ग्राम गुरुकुल प्रकाशन',
    cover: null,
    subject: 'इतिहास एवं भूगोल',
    status: 'निर्माणाधीन' as const,
    description: 'झाबुआ ज़िले के हर गाँव की कहानी, इतिहास और संस्कृति का दस्तावेज़।',
  },
];

const STATS = [
  { value: 900, suffix: '+', label: 'गाँवों में ग्राम वाचनालय', sublabel: 'झाबुआ ज़िला' },
  { value: 125, label: 'पुस्तकें प्रति वाचनालय', sublabel: 'हर पेटी में' },
  { value: 14, label: 'विषय', sublabel: 'विविध ज्ञान' },
  { value: 2009, label: 'से सक्रिय', sublabel: 'वर्ष' },
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
    desc: 'हर गाँव की कहानी',
  },
  {
    href: '/sanskriti-parampara',
    icon: <Music size={28} />,
    title: 'संस्कृति और परंपराएँ',
    desc: 'भील समाज की विरासत',
  },
  {
    href: '/bhil-itihas',
    icon: <History size={28} />,
    title: 'भील समाज का इतिहास',
    desc: 'इतिहास और स्वतंत्रता संग्राम',
  },
  {
    href: '/parampragat-gyan',
    icon: <Sprout size={28} />,
    title: 'परंपरागत ज्ञान',
    desc: 'पारंपरिक और आधुनिक विज्ञान',
  },
  {
    href: '/pustakein',
    icon: <BookOpen size={28} />,
    title: 'पुस्तकें एवं प्रकाशन',
    desc: 'हमारी प्रकाशित पुस्तकें',
  },
];

const WORK_CARDS = [
  {
    icon: <Library size={32} />,
    title: 'ग्राम वाचनालय',
    desc: '900+ गाँवों में पुस्तकालय स्थापित किए गए हैं, जहाँ 125 पुस्तकें की एक पेटी हर गाँव में उपलब्ध है।',
    href: '/gram-vachanalay',
  },
  {
    icon: <Users size={32} />,
    title: 'सशक्तिकरण वर्ग',
    desc: 'गाँव के युवाओं और महिलाओं के लिए ज्ञान, कौशल और जागरूकता के वर्ग आयोजित किए जाते हैं।',
    href: '/karya',
  },
  {
    icon: <BookOpen size={32} />,
    title: 'ज्ञान का संकलन',
    desc: 'गाँव के अद्वितीय परंपरागत ज्ञान को सही रूप में एकत्रित कर प्रकाशित किया जाता है।',
    href: '/pustakein',
  },
  {
    icon: <Pen size={32} />,
    title: 'सरल भाषा में प्रकाशन',
    desc: 'नये ज्ञान को सरल हिंदी में लिखकर गाँव के पाठकों तक पहुँचाया जाता है।',
    href: '/pustakein',
  },
];

export default async function HomePage() {
  // Fetch data from CMS (with fallback to seed data)
  let notices: typeof SEED_NOTICES = [];
  let books: typeof SEED_BOOKS = [];

  try {
    notices = await getLatestNotices(5) || [];
  } catch {
    notices = SEED_NOTICES;
  }
  if (!notices || notices.length === 0) notices = SEED_NOTICES;

  try {
    books = await getFeaturedBooks(4) || [];
  } catch {
    books = SEED_BOOKS;
  }
  if (!books || books.length === 0) books = SEED_BOOKS;

  return (
    <>
      {/* ── 1. HERO ─────────────────────────────────────── */}
      <section
        className="relative overflow-hidden min-h-screen flex items-center hero-gradient dot-pattern"
        aria-label="मुख्य परिचय"
        style={{ paddingTop: '5rem' }}
      >
        {/* Decorative circle ring (top right) */}
        <div
          className="absolute top-8 right-0 w-96 h-96 rounded-full opacity-10 pointer-events-none"
          style={{ border: '40px solid var(--color-mustard)', transform: 'translate(40%, -20%)' }}
          aria-hidden="true"
        />
        {/* Decorative circle ring (bottom left) */}
        <div
          className="absolute bottom-0 left-0 w-72 h-72 rounded-full opacity-8 pointer-events-none"
          style={{ border: '30px solid var(--color-orange)', transform: 'translate(-40%, 40%)' }}
          aria-hidden="true"
        />

        <div className="container-main relative z-10 py-16 md:py-24">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Text */}
            <div className="animate-fade-in-up">
              {/* Badge */}
              <div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 text-sm font-semibold"
                style={{ backgroundColor: 'rgba(200, 102, 30, 0.12)', color: 'var(--color-orange)', border: '1px solid rgba(200, 102, 30, 0.3)' }}
              >
                <span>📚</span>
                <span>सांस्कृतिक केंद्र, झाबुआ</span>
              </div>

              <h1
                className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
                style={{ color: 'var(--color-charcoal)', fontFamily: 'var(--font-heading)' }}
              >
                "जो बांचेगा
                <br />
                <span style={{ color: 'var(--color-orange)' }}>वही बचेगा"</span>
              </h1>

              <p className="text-lg md:text-xl mb-8 leading-relaxed max-w-xl" style={{ color: 'var(--color-clay)' }}>
                झाबुआ के ज्ञान को देश व दुनिया में सही रूप में ले जाना और नये ज्ञान को झाबुआ के गाँवों में सरल भाषा में पहुँचाना।
              </p>

              <div className="flex flex-wrap gap-4">
                <Link href="/gram-vachanalay" className="btn-primary">
                  ग्राम वाचनालय देखें
                  <ChevronRight size={18} aria-hidden="true" />
                </Link>
                <Link href="/hamse-judein" className="btn-secondary">
                  हमसे जुड़ें
                </Link>
              </div>
            </div>

            {/* Image placeholder */}
            <div className="animate-fade-in-up-delay-1 flex justify-center">
              <div
                className="relative rounded-full overflow-hidden dot-pattern-light"
                style={{
                  width: 'min(340px, 90vw)',
                  height: 'min(340px, 90vw)',
                  border: '6px solid var(--color-mustard)',
                  boxShadow: '0 8px 48px rgba(227, 176, 35, 0.3)',
                  backgroundColor: 'var(--color-sand)',
                }}
                role="img"
                aria-label="TODO: ग्राम वाचनालय या गाँव का फोटो यहाँ लगाएँ"
              >
                <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
                  <svg viewBox="0 0 120 120" width="100" height="100" fill="none" aria-hidden="true">
                    {/* House with books illustration */}
                    <circle cx="60" cy="60" r="55" fill="rgba(227, 176, 35, 0.15)" />
                    <path d="M60 20 L90 45 L90 90 L30 90 L30 45 Z" fill="rgba(200, 102, 30, 0.2)" stroke="#C8661E" strokeWidth="2" />
                    <path d="M45 90 L45 68 L55 68 L55 90" fill="none" stroke="#C8661E" strokeWidth="2" />
                    <path d="M20 45 L60 15 L100 45" stroke="#E3B023" strokeWidth="3" fill="none" />
                    {/* Books */}
                    <rect x="62" y="55" width="20" height="28" rx="2" fill="rgba(63, 91, 46, 0.4)" stroke="#3F5B2E" strokeWidth="1.5" />
                    <path d="M65 55 L65 83" stroke="#3F5B2E" strokeWidth="1" />
                    {/* Dots pattern */}
                    <circle cx="35" cy="70" r="2" fill="#E3B023" opacity="0.5" />
                    <circle cx="40" cy="78" r="2" fill="#E3B023" opacity="0.5" />
                    <circle cx="35" cy="80" r="2" fill="#C8661E" opacity="0.4" />
                  </svg>
                  <p className="text-sm mt-4 font-semibold" style={{ color: 'var(--color-clay)' }}>
                    TODO: ग्राम वाचनालय की फोटो
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. IMPACT COUNTERS ──────────────────────────── */}
      <section
        className="py-16 section-sand"
        aria-label="हमारे प्रभाव के आँकड़े"
      >
        <div className="container-main">
          <h2
            className="text-center text-2xl font-bold mb-12"
            style={{ color: 'var(--color-clay)', fontFamily: 'var(--font-heading)' }}
          >
            हमारा काम, अब तक
          </h2>
          <StatsGrid counters={STATS} />
        </div>
      </section>

      {/* ── 3. ABOUT TEASER ─────────────────────────────── */}
      <section className="py-16 section-cream" aria-label="हमारे बारे में संक्षिप्त जानकारी">
        <div className="container-main">
          <div className="max-w-3xl mx-auto text-center">
            <DotDivider />
            <h2
              className="text-3xl md:text-4xl font-bold mb-6"
              style={{ color: 'var(--color-charcoal)', fontFamily: 'var(--font-heading)' }}
            >
              हमारे बारे में
            </h2>
            <p className="text-lg leading-relaxed mb-8" style={{ color: 'var(--color-clay)' }}>
              ग्राम गुरुकुल प्रकाशन का उद्देश्य गाँव के अद्वितीय पारंपरिक ज्ञान-विज्ञान और भील समाज की समृद्ध सांस्कृतिक धरोहर को देश और दुनिया के समक्ष सही रूप में लाने और शहर के नये ज्ञान को गाँव में सरल भाषा में प्रस्तुत करने के लिए प्रतिबद्ध है।
            </p>
            <Link href="/hamare-bare-mein" className="btn-primary">
              और जानें
              <ChevronRight size={18} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── 4. WORK CARDS ───────────────────────────────── */}
      <section
        className="py-16 section-sand"
        aria-label="हमारे कार्य"
      >
        <div className="container-main">
          <h2
            className="text-3xl md:text-4xl font-bold mb-3"
            style={{ color: 'var(--color-charcoal)', fontFamily: 'var(--font-heading)' }}
          >
            हमारे कार्य
          </h2>
          <p className="mb-10" style={{ color: 'var(--color-clay)' }}>
            गाँव और शहर के बीच ज्ञान का सेतु बनाना
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {WORK_CARDS.map((card) => (
              <Link
                key={card.title}
                href={card.href}
                className="card-base p-6 flex flex-col gap-4 no-underline group"
                style={{ textDecoration: 'none' }}
              >
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center"
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
                <span className="text-sm font-medium group-hover:underline" style={{ color: 'var(--color-orange)' }}>
                  अधिक जानें →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. KNOWLEDGE QUICK LINKS ────────────────────── */}
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
            आगे बढ़ें और जानें
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {KNOWLEDGE_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex flex-col gap-3 p-5 rounded-2xl transition-all no-underline group"
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.06)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  textDecoration: 'none',
                }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
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
                <p className="text-sm" style={{ color: 'rgba(240, 228, 200, 0.6)' }}>
                  {link.desc}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. LATEST NOTICES ───────────────────────────── */}
      <section className="py-16 section-cream" aria-label="ताज़ा सूचनाएँ">
        <div className="container-main">
          <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
            <h2
              className="text-3xl md:text-4xl font-bold"
              style={{ color: 'var(--color-charcoal)', fontFamily: 'var(--font-heading)' }}
            >
              सूचनाएँ एवं जानकारी
            </h2>
            <Link
              href="/soochna"
              className="text-sm font-medium hover:underline"
              style={{ color: 'var(--color-orange)' }}
            >
              सभी सूचनाएँ देखें →
            </Link>
          </div>

          {notices.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {notices.slice(0, 5).map((notice) => (
                <NoticeCard key={notice._id} notice={notice as any} />
              ))}
            </div>
          ) : (
            <EmptyState message="अभी कोई सूचना उपलब्ध नहीं है।" />
          )}
        </div>
      </section>

      {/* ── 7. FEATURED BOOKS ───────────────────────────── */}
      <section className="py-16 section-sand" aria-label="प्रमुख पुस्तकें">
        <div className="container-main">
          <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
            <h2
              className="text-3xl md:text-4xl font-bold"
              style={{ color: 'var(--color-charcoal)', fontFamily: 'var(--font-heading)' }}
            >
              पुस्तकें एवं प्रकाशन
            </h2>
            <Link
              href="/pustakein"
              className="text-sm font-medium hover:underline"
              style={{ color: 'var(--color-orange)' }}
            >
              सभी पुस्तकें देखें →
            </Link>
          </div>

          {books.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {books.map((book) => (
                <BookCard key={book._id} book={book as any} />
              ))}
            </div>
          ) : (
            <EmptyState message="अभी कोई पुस्तक उपलब्ध नहीं है।" />
          )}
        </div>
      </section>

      {/* ── 8. JOIN CTA ─────────────────────────────────── */}
      <section
        className="py-16 relative overflow-hidden dot-pattern-mustard"
        style={{ backgroundColor: 'var(--color-mustard)' }}
        aria-label="आप कैसे जुड़ सकते हैं"
      >
        {/* Background ring */}
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
              आप कैसे जुड़ सकते हैं?
            </h2>
            <p className="text-lg mb-6" style={{ color: 'rgba(26, 26, 26, 0.75)' }}>
              हमें लेखकों, शोधकर्ताओं, शिक्षकों, डिज़ाइनरों, विषय विशेषज्ञों और गाँव के जानकार बुज़ुर्गों की ज़रूरत है। अगर आप इस काम में योगदान देना चाहते हैं, तो हम आपका स्वागत करते हैं।
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/hamse-judein" className="btn-secondary">
                हमसे जुड़ें
                <ChevronRight size={18} aria-hidden="true" />
              </Link>
              <Link href="/sampark" className="btn-secondary">
                संपर्क करें
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── 9. SOCIAL STRIP ─────────────────────────────── */}
      <section className="py-10 section-cream" aria-label="सोशल मीडिया">
        <div className="container-main">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h2
                className="text-xl font-bold mb-1"
                style={{ color: 'var(--color-charcoal)', fontFamily: 'var(--font-heading)' }}
              >
                हमसे जुड़े रहें
              </h2>
              <p className="text-sm" style={{ color: 'var(--color-clay)' }}>
                ताज़ा अपडेट के लिए हमें फॉलो करें
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a
                href="https://instagram.com/gramgurukulprakashan"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary text-sm px-4 py-2"
                style={{ minHeight: '40px' }}
                aria-label="इंस्टाग्राम पर फॉलो करें (नया टैब)"
              >
                📸 इंस्टाग्राम
              </a>
              <a
                href="https://facebook.com/gramgurukulprakashan"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary text-sm px-4 py-2"
                style={{ minHeight: '40px' }}
                aria-label="फेसबुक पर फॉलो करें (नया टैब)"
              >
                👥 फेसबुक
              </a>
              <a
                href="mailto:gramgurukulprakashan@gmail.com"
                className="btn-primary text-sm px-4 py-2"
                style={{ minHeight: '40px' }}
              >
                ✉ ईमेल करें
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
