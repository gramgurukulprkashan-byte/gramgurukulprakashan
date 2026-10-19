import type { Metadata } from 'next';
import Link from 'next/link';
import PageHero from '@/components/PageHero';
import SectionTitle from '@/components/SectionTitle';
import StatsGrid from '@/components/StatsGrid';
import DotDivider from '@/components/DotDivider';

export const metadata: Metadata = {
  title: 'हमारे कार्य एवं उपलब्धियाँ',
  description: 'ग्राम गुरुकुल प्रकाशन ने अब तक क्या किया — ग्राम वाचनालय, सशक्तिकरण वर्ग और प्रकाशन का विवरण।',
};

const STATS = [
  { value: 900, suffix: '+', label: 'गाँवों में ग्राम वाचनालय', sublabel: 'झाबुआ ज़िला' },
  { value: 125, label: 'पुस्तकें प्रति वाचनालय', sublabel: 'हर पेटी में' },
  { value: 14, label: 'विषय', sublabel: 'विविध ज्ञान' },
  { value: 2009, label: 'से सक्रिय', sublabel: 'वर्ष' },
];

// Timeline entries — years not confirmed; TODO: verify with client
const TIMELINE = [
  {
    year: '2009',
    title: 'शुरुआत',
    desc: 'झाबुआ के गाँवों में ग्राम वाचनालय के लिए उपयुक्त पुस्तकें ढूँढने का काम शुरू हुआ।',
    confirmed: true,
  },
  {
    year: 'TODO',
    title: 'ग्राम वाचनालयों की स्थापना',
    desc: 'पहले गाँवों में पुस्तकों की पेटी के साथ ग्राम वाचनालय स्थापित किए गए।',
    confirmed: false,
  },
  {
    year: 'TODO',
    title: '900 गाँवों तक विस्तार',
    desc: 'झाबुआ ज़िले के 900 से अधिक गाँवों में ग्राम वाचनालय पहुँचाए गए।',
    confirmed: false,
  },
  {
    year: 'TODO',
    title: 'सशक्तिकरण वर्ग',
    desc: 'गाँव के युवाओं और महिलाओं के लिए सशक्तिकरण वर्ग शुरू किए गए।',
    confirmed: false,
  },
  {
    year: 'निर्माणाधीन',
    title: 'प्रकाशन — मेरा जिला भाग-1 व ग्राम एटलस',
    desc: '"मेरा जिला" (कक्षा 6 सामाजिक विज्ञान) और ग्राम एटलस का निर्माण जारी है।',
    confirmed: true,
  },
];

const ONGOING_WORKS = [
  {
    title: '"मेरा जिला" — भाग 1',
    desc: 'कक्षा 6 सामाजिक विज्ञान के लिए झाबुआ ज़िले पर आधारित एक विशेष पाठ्यपुस्तक, जो बच्चों को उनके अपने परिवेश से जोड़कर पढ़ाती है।',
    status: 'निर्माणाधीन',
    href: '/gaon-se-shiksha',
    icon: '📗',
  },
  {
    title: 'ग्राम एटलस — झाबुआ',
    desc: 'झाबुआ ज़िले के हर गाँव की कहानी, इतिहास, नदी-पहाड़, परंपराएँ और संस्कृति का एक विस्तृत दस्तावेज़।',
    status: 'निर्माणाधीन',
    href: '/gram-atlas',
    icon: '🗺️',
  },
];

export default function KaryaPage() {
  return (
    <>
      <PageHero
        title="हमारे कार्य एवं उपलब्धियाँ"
        description="ग्राम वाचनालय से लेकर प्रकाशन तक — जानें हमने क्या किया"
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
          <div className="prose-hindi">
            <p>
              हमने 900 से अधिक गाँवों में <strong>ग्राम वाचनालय</strong> शुरू किए, जिसका नारा है <em>"जो बांचेगा वही बचेगा"</em>।
            </p>
            <p>
              हर गाँव में एक पेटी में <strong>125 किताबें</strong> दी गईं, जिनमें <strong>14 प्रकार के विषय</strong> शामिल हैं — जैसे खेती, स्वास्थ्य, इतिहास, लोककथाएँ, बच्चों की किताबें, विज्ञान और अन्य।
            </p>
            <p>
              इसके साथ ही <strong>सशक्तिकरण वर्ग</strong> आयोजित किए जाते हैं, जिनमें गाँव के युवाओं और महिलाओं को ज्ञान और कौशल से जोड़ा जाता है।
            </p>
          </div>
        </div>
      </section>

      {/* ── Timeline ──────────────────────────────────────── */}
      <section className="py-16 section-cream" aria-label="हमारा सफर">
        <div className="container-main max-w-3xl">
          <SectionTitle title="हमारा सफर" />
          <ol className="relative list-none m-0 p-0 space-y-0" aria-label="कार्य की समय-रेखा">
            {TIMELINE.map((item, i) => (
              <li key={i} className="flex gap-4 pb-8 last:pb-0">
                {/* Line */}
                <div className="flex flex-col items-center">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 font-bold text-xs"
                    style={{
                      backgroundColor: item.confirmed ? 'var(--color-orange)' : 'var(--color-sand-dark)',
                      color: item.confirmed ? 'white' : 'var(--color-clay)',
                    }}
                  >
                    {item.confirmed ? '✓' : '?'}
                  </div>
                  {i < TIMELINE.length - 1 && (
                    <div
                      className="w-0.5 flex-1 mt-2"
                      style={{ backgroundColor: 'var(--color-sand-dark)' }}
                      aria-hidden="true"
                    />
                  )}
                </div>
                {/* Content */}
                <div className="pb-2 flex-1">
                  <span
                    className="text-xs font-semibold"
                    style={{ color: 'var(--color-orange)' }}
                  >
                    {item.year}
                    {!item.confirmed && ' (TODO: वर्ष की पुष्टि करें)'}
                  </span>
                  <h3
                    className="text-lg font-bold mt-1 mb-1"
                    style={{ color: 'var(--color-charcoal)', fontFamily: 'var(--font-heading)' }}
                  >
                    {item.title}
                  </h3>
                  <p className="text-sm" style={{ color: 'var(--color-clay)' }}>
                    {item.desc}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── Ongoing Work ──────────────────────────────────── */}
      <section className="py-16 section-sand" aria-label="जारी कार्य">
        <div className="container-main">
          <SectionTitle title="जारी कार्य" />
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
                    <span className="badge-wip">{work.status}</span>
                  </div>
                </div>
                <p style={{ color: 'var(--color-clay)' }}>{work.desc}</p>
                <Link
                  href={work.href}
                  className="text-sm font-medium hover:underline mt-auto"
                  style={{ color: 'var(--color-orange)' }}
                >
                  अधिक जानें →
                </Link>
              </div>
            ))}
          </div>
          <p className="mt-6 text-xs" style={{ color: 'var(--color-clay)' }}>
            * 900/125/14 के आँकड़े CMS के "सेटिंग्स" भाग से बदले जा सकते हैं।
          </p>
        </div>
      </section>
    </>
  );
}
