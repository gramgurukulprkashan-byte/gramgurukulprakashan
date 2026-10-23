import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import PageHero from '@/components/PageHero';
import SectionTitle from '@/components/SectionTitle';
import StatsGrid from '@/components/StatsGrid';

export const metadata: Metadata = {
  title: 'हमारे कार्य एवं उपलब्धियाँ',
  description: 'ग्रामगुरुकुल प्रकाशन ने अब तक क्या किया — शिवगंगा ग्राम वाचनालय, ग्रामगुरुकुल वर्ग और प्रकाशन का विवरण।',
};

const STATS = [
  { value: 900, suffix: '+', label: 'गाँवों में ग्राम वाचनालय', sublabel: 'झाबुआ ज़िला' },
  { value: 125, label: 'पुस्तकें प्रति वाचनालय', sublabel: 'हर पेटी में' },
  { value: 14, label: 'विषय', sublabel: 'विविध ज्ञान' },
  { value: 2009, label: 'से सक्रिय', sublabel: 'अविरल यात्रा' },
];

const GURUKUL_REPORTS = [
  {
    image: '/content-media/semalpada-gurukul-varg.webp',
    title: 'ग्रामगुरुकुल वर्ग — सेमलपाड़ा (थांदला)',
    desc: 'व्यक्तित्व विकास, खेल और गाँव के उत्थान पर विचार-विमर्श। युवाओं में नेतृत्व क्षमता जगाने का सत्र।',
  },
  {
    image: '/content-media/salarpada-gurukul-varg.webp',
    title: 'ग्रामगुरुकुल वर्ग — सालारपाड़ा',
    desc: '3 फलियों के 49 युवा शामिल हुए। खेल, सामूहिक संवाद और ग्राम-सेवा के संकल्प लिए गए।',
  },
  {
    image: '/content-media/halma-youth-group.webp',
    title: 'हलमा — भील समाज की सामूहिक शक्ति',
    desc: 'जल-संरक्षण और पहाड़ पर कंटूर ट्रेंच बनाने के लिए हलमा टी-शर्ट पहने एकजुट युवा।',
  },
  {
    image: '/content-media/udaypuria-dharampuri-launch.webp',
    title: 'वाचनालय वितरण — उदयपुरिया और धरमपुरी',
    desc: '27 अक्टूबर 2023 को ग्राम वाचनालय की पेटियों का औपचारिक वितरण एवं शुभारंभ।',
  },
];

const TIMELINE = [
  {
    year: '2009',
    title: 'शुरुआत एवं साहित्य खोज',
    desc: 'झाबुआ के गाँवों में ग्राम वाचनालय के लिए गाँव के अनुकूल और प्रेरक साहित्य ढूँढने की यात्रा शुरू हुई।',
  },
  {
    year: '2012-2015',
    title: 'ग्राम वाचनालयों की स्थापना',
    desc: 'गाँव-गाँव में 125 पुस्तकों की विशेष लोहे की पेटी पहुँचाने का कार्य गतिमान हुआ।',
  },
  {
    year: '2016-2022',
    title: '900+ गाँवों तक विस्तार',
    desc: 'झाबुआ ज़िले के 900 से अधिक गाँवों में वाचनालय सक्रिय हुए और "जो बांचेगा वही बचेगा" जन-आंदोलन बना।',
  },
  {
    year: '2023-2024',
    title: 'ग्रामगुरुकुल वर्ग एवं पत्रिका',
    desc: 'गाँव के युवाओं के लिए गुरुकुल वर्ग और "भीलांचल की आवाज" मासिक पत्रिका का नियमित प्रकाशन शुरू।',
  },
  {
    year: 'वर्तमान',
    title: 'मौलिक प्रकाशन — मेरा जिला व ग्राम एटलस',
    desc: 'कक्षा 6 के लिए "मेरा जिला" पाठ्यपुस्तक और प्रामाणिक "छागोला ग्राम एटलस" का प्रकाशन।',
  },
];

const ONGOING_WORKS = [
  {
    title: '"मेरा जिला" — भाग 1',
    desc: 'कक्षा 6 सामाजिक विज्ञान के लिए झाबुआ ज़िले पर आधारित एक विशेष पाठ्यपुस्तक, जो बच्चों को उनके अपने परिवेश से जोड़कर पढ़ाती है।',
    status: 'निर्माणाधीन',
    href: '/pustakein/mera-jila-bhag-1',
    icon: '📗',
  },
  {
    title: 'ग्राम एटलस — झाबुआ',
    desc: 'झाबुआ ज़िले के हर गाँव की कहानी, इतिहास, नदी-पहाड़, परंपराएँ और संस्कृति का एक विस्तृत दस्तावेज़ (छागोला एटलस प्रकाशित)।',
    status: 'प्रकाशित एवं निरंतर',
    href: '/gram-atlas',
    icon: '🗺️',
  },
];

export default function KaryaPage() {
  return (
    <>
      <PageHero
        title="हमारे कार्य एवं उपलब्धियाँ"
        description="ग्राम वाचनालय से लेकर ग्रामगुरुकुल वर्ग और प्रकाशन तक — जानें हमने क्या किया"
        breadcrumb={[{ label: 'हमारे कार्य' }]}
        variant="mustard"
      />

      {/* ── Stats ─────────────────────────────────────────── */}
      <section className="py-16 section-cream" aria-label="उपलब्धियाँ">
        <div className="container-main">
          <SectionTitle title="अब तक का सफर" centered />
          <StatsGrid counters={STATS} />
        </div>
      </section>

      {/* ── What We Did ───────────────────────────────────── */}
      <section className="py-16 section-sand">
        <div className="container-main max-w-3xl">
          <SectionTitle title="हमने क्या किया?" />
          <div className="prose-hindi text-base md:text-lg leading-relaxed">
            <p>
              शिवगंगा के मार्गदर्शन में हमने झाबुआ के 900 से अधिक गाँवों में <strong>ग्राम वाचनालय</strong> शुरू किए, जिसका नारा है <em>"जो बांचेगा वही बचेगा"</em>।
            </p>
            <p>
              हर गाँव में एक पेटी में <strong>125 किताबें</strong> दी गईं, जिनमें <strong>14 प्रकार के विषय</strong> शामिल हैं — जैसे खेती, स्वास्थ्य, इतिहास, लोककथाएँ, बच्चों की किताबें, विज्ञान और अन्य।
            </p>
            <p>
              इसके साथ ही <strong>ग्रामगुरुकुल वर्ग</strong> आयोजित किए जाते हैं, जिनमें गाँव के युवाओं और किशोरों को व्यक्तित्व विकास, नेतृत्व और समाज-सेवा के संस्कारों से जोड़ा जाता है।
            </p>
          </div>
        </div>
      </section>

      {/* ── Real Field Photo Reports ──────────────────────── */}
      <section className="py-16 section-cream" aria-label="ग्रामगुरुकुल वर्ग व वाचनालय रिपोर्ट">
        <div className="container-main">
          <SectionTitle
            title="धरातल पर कार्य — प्रत्यक्ष रिपोर्ट"
            subtitle="सेमलपाड़ा, सालारपाड़ा, उदयपुरिया और धरमपुरी में युवाओं व ग्रामीणों की सहभागिता"
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {GURUKUL_REPORTS.map((report, idx) => (
              <article key={idx} className="card-base overflow-hidden flex flex-col group hover:shadow-xl transition-all">
                <div className="relative aspect-4/3 overflow-hidden bg-[var(--color-sand)]">
                  <Image
                    src={report.image}
                    alt={report.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                </div>
                <div className="p-4 flex flex-col gap-1 flex-1">
                  <h3
                    className="text-base font-bold"
                    style={{ color: 'var(--color-charcoal)', fontFamily: 'var(--font-heading)' }}
                  >
                    {report.title}
                  </h3>
                  <p className="text-xs leading-relaxed" style={{ color: 'var(--color-clay)' }}>
                    {report.desc}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Timeline ──────────────────────────────────────── */}
      <section className="py-16 section-sand" aria-label="हमारा सफर">
        <div className="container-main max-w-3xl">
          <SectionTitle title="हमारा सफर — वर्ष दर वर्ष" />
          <ol className="relative list-none m-0 p-0 space-y-0" aria-label="कार्य की समय-रेखा">
            {TIMELINE.map((item, i) => (
              <li key={i} className="flex gap-4 pb-8 last:pb-0">
                <div className="flex flex-col items-center">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 font-bold text-xs"
                    style={{
                      backgroundColor: 'var(--color-orange)',
                      color: 'white',
                    }}
                  >
                    ✓
                  </div>
                  {i < TIMELINE.length - 1 && (
                    <div
                      className="w-0.5 flex-1 mt-2"
                      style={{ backgroundColor: 'var(--color-sand-dark)' }}
                      aria-hidden="true"
                    />
                  )}
                </div>
                <div className="pb-2 flex-1">
                  <span
                    className="text-xs font-bold px-2 py-0.5 rounded"
                    style={{ backgroundColor: 'rgba(200, 102, 30, 0.1)', color: 'var(--color-orange)' }}
                  >
                    {item.year}
                  </span>
                  <h3
                    className="text-lg font-bold mt-2 mb-1"
                    style={{ color: 'var(--color-charcoal)', fontFamily: 'var(--font-heading)' }}
                  >
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--color-clay)' }}>
                    {item.desc}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── Ongoing Work ──────────────────────────────────── */}
      <section className="py-16 section-cream" aria-label="जारी कार्य">
        <div className="container-main">
          <SectionTitle title="वर्तमान प्रमुख प्रकाशन कार्य" />
          <div className="grid md:grid-cols-2 gap-6">
            {ONGOING_WORKS.map((work) => (
              <div key={work.title} className="card-base p-6 flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <span className="text-4xl" aria-hidden="true">{work.icon}</span>
                  <div>
                    <h3
                      className="text-xl font-bold"
                      style={{ color: 'var(--color-charcoal)', fontFamily: 'var(--font-heading)' }}
                    >
                      {work.title}
                    </h3>
                    <span className="badge-published">{work.status}</span>
                  </div>
                </div>
                <p style={{ color: 'var(--color-clay)' }}>{work.desc}</p>
                <Link
                  href={work.href}
                  className="text-sm font-semibold hover:underline mt-auto"
                  style={{ color: 'var(--color-orange)' }}
                >
                  अधिक जानें →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
