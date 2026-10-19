import type { Metadata } from 'next';
import Link from 'next/link';
import PageHero from '@/components/PageHero';
import SectionTitle from '@/components/SectionTitle';
import EmptyState from '@/components/EmptyState';
import { getAllVachanalay, getSubjectCategories } from '@/lib/queries';

export const metadata: Metadata = {
  title: 'ग्राम वाचनालय',
  description:
    '"जो बांचेगा वही बचेगा" — झाबुआ के 900+ गाँवों में ग्राम वाचनालय। पुस्तकों की पेटी, 14 विषय, और ग्रामीण पाठकों की कहानियाँ।',
};

// Seed subject categories (14 items) — TODO: verify with client
const SEED_SUBJECTS = [
  { name: 'खेती एवं कृषि', icon: '🌾', desc: 'स्थानीय खेती के तरीके और फसलें' },
  { name: 'पशुपालन', icon: '🐄', desc: 'पशुओं की देखभाल और पालन-पोषण' },
  { name: 'स्वास्थ्य', icon: '💊', desc: 'स्वास्थ्य और आयुर्वेद' },
  { name: 'इतिहास', icon: '📜', desc: 'भील समाज और झाबुआ का इतिहास' },
  { name: 'लोककथाएँ', icon: '📖', desc: 'गाँव की कहानियाँ और लोकगाथाएँ' },
  { name: 'बच्चों की किताबें', icon: '👧', desc: 'बच्चों के लिए सरल और रोचक किताबें' },
  { name: 'विज्ञान', icon: '🔬', desc: 'सरल भाषा में विज्ञान' },
  { name: 'शिक्षा', icon: '✏️', desc: 'शिक्षा और सीखने के तरीके' },
  { name: 'भाषा एवं साहित्य', icon: '📝', desc: 'हिंदी और स्थानीय भाषाएँ' },
  { name: 'महिला एवं बाल विकास', icon: '👩', desc: 'महिलाओं और बच्चों के अधिकार और विकास' },
  { name: 'जल-जंगल-ज़मीन', icon: '🌊', desc: 'प्राकृतिक संसाधनों की जानकारी' },
  { name: 'संस्कृति एवं परंपराएँ', icon: '🎭', desc: 'भील समाज की संस्कृति और रीति-रिवाज' },
  { name: 'रोज़गार एवं कौशल', icon: '🔧', desc: 'आजीविका और कौशल विकास' },
  { name: 'समाज एवं व्यवस्था', icon: '🏘️', desc: 'गाँव की पारंपरिक व्यवस्था' },
];

// Seed vachanalay entries
const SEED_VACHANALAY = [
  { _id: 'v1', village: 'रणपुरा', block: 'झाबुआ', district: 'झाबुआ', note: 'सक्रिय वाचनालय' },
  { _id: 'v2', village: 'मेघनगर', block: 'मेघनगर', district: 'झाबुआ', note: null },
  { _id: 'v3', village: 'थांदला', block: 'थांदला', district: 'झाबुआ', note: 'नई पुस्तकें उपलब्ध' },
  { _id: 'v4', village: 'पेटलावद', block: 'पेटलावद', district: 'झाबुआ', note: null },
  { _id: 'v5', village: 'राणापुर', block: 'राणापुर', district: 'झाबुआ', note: null },
  { _id: 'v6', village: 'रामा', block: 'रामा', district: 'झाबुआ', note: null },
];

const SEED_STORIES = [
  {
    _id: 's1',
    title: 'पढ़कर बदली सोच',
    author: 'रमेश भाई',
    village: 'रणपुरा',
    body: 'वाचनालय में खेती की किताब पढ़ने के बाद मैंने अपने खेत में नई तकनीक आज़माई। फसल बेहतर हुई।',
  },
  {
    _id: 's2',
    title: 'बच्चों को मिली किताबें',
    author: 'सुमित्रा बाई',
    village: 'थांदला',
    body: 'हमारे गाँव में जब से वाचनालय आया, बच्चे रोज़ वहाँ जाते हैं और पढ़ते हैं।',
  },
];

export default async function GramVachanalaPage() {
  let vachanalay: typeof SEED_VACHANALAY = [];
  let subjects: typeof SEED_SUBJECTS = [];
  let stories = SEED_STORIES;

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
        description='"जो बांचेगा वही बचेगा" — हर गाँव में ज्ञान का दरवाज़ा'
        breadcrumb={[{ label: 'ग्राम वाचनालय' }]}
        variant="mustard"
      />

      {/* ── Intro + Big Stats ─────────────────────────── */}
      <section className="py-16 section-cream" aria-label="ग्राम वाचनालय परिचय">
        <div className="container-main max-w-3xl">
          <SectionTitle title="ग्राम वाचनालय क्या है?" />
          <div className="prose-hindi">
            <p>
              ग्राम वाचनालय एक ऐसी पहल है जिसमें हर गाँव में एक पुस्तकों की पेटी रखी जाती है, जिसमें <strong>125 पुस्तकें</strong> होती हैं और जो <strong>14 अलग-अलग विषयों</strong> को कवर करती हैं।
            </p>
            <p>
              इसका नारा है: <em>"जो बांचेगा वही बचेगा"</em> — यानी जो पढ़ेगा, वही आगे बढ़ेगा।
            </p>
          </div>

          {/* Big stat */}
          <div
            className="mt-8 p-8 rounded-2xl text-center dot-pattern"
            style={{ backgroundColor: 'var(--color-mustard)' }}
          >
            <div
              className="text-6xl md:text-7xl font-bold mb-2"
              style={{ color: 'var(--color-charcoal)', fontFamily: 'var(--font-heading)' }}
            >
              900+
            </div>
            <p className="text-xl font-semibold" style={{ color: 'rgba(26, 26, 26, 0.75)' }}>
              गाँवों में ग्राम वाचनालय स्थापित
            </p>
          </div>
        </div>
      </section>

      {/* ── 125 Book Box ──────────────────────────────── */}
      <section className="py-16 section-sand" aria-label="125 पुस्तकों की पेटी">
        <div className="container-main">
          <SectionTitle title="125 पुस्तकों की पेटी" />
          <p className="mb-8" style={{ color: 'var(--color-clay)' }}>
            हर पेटी में नीचे दिए गए 14 विषयों पर पुस्तकें होती हैं:
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {subjects.map((sub, i) => (
              <div
                key={sub.name || i}
                className="flex flex-col items-center gap-2 p-4 rounded-2xl text-center"
                style={{ backgroundColor: 'white', border: '2px solid var(--color-sand-dark)' }}
              >
                <span className="text-2xl" aria-hidden="true">{sub.icon || '📚'}</span>
                <span className="text-xs font-semibold leading-tight" style={{ color: 'var(--color-charcoal)' }}>
                  {sub.name}
                </span>
                {i < 14 && (
                  <span className="text-xs opacity-50 italic">TODO: पुष्टि करें</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Vachanalay List ───────────────────────────── */}
      <section className="py-16 section-cream" aria-label="वाचनालय सूची">
        <div className="container-main">
          <SectionTitle title="वाचनालय की सूची" />
          {vachanalay.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {vachanalay.map((v: any) => (
                <div
                  key={v._id}
                  className="card-base p-5"
                >
                  <h3
                    className="font-bold text-lg mb-1"
                    style={{ color: 'var(--color-charcoal)', fontFamily: 'var(--font-heading)' }}
                  >
                    {v.village}
                  </h3>
                  <p className="text-sm" style={{ color: 'var(--color-clay)' }}>
                    {v.block} — {v.district}
                  </p>
                  {v.note && (
                    <p className="text-sm mt-2 italic" style={{ color: 'var(--color-orange)' }}>
                      {v.note}
                    </p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <EmptyState message="अभी वाचनालय की जानकारी उपलब्ध नहीं है।" />
          )}
          <p className="mt-6 text-sm" style={{ color: 'var(--color-clay)' }}>
            * यह सूची CMS से नियंत्रित होती है।
          </p>
        </div>
      </section>

      {/* ── Stories ───────────────────────────────────── */}
      <section className="py-16 section-sand" aria-label="अनुभव और कहानियाँ">
        <div className="container-main">
          <SectionTitle title="अनुभव और कहानियाँ" />
          <div className="grid md:grid-cols-2 gap-6">
            {stories.map((story) => (
              <blockquote
                key={story._id}
                className="card-base p-6"
              >
                <p
                  className="text-base leading-relaxed mb-4"
                  style={{ color: 'var(--color-charcoal)' }}
                >
                  "{story.body}"
                </p>
                <footer className="flex items-center gap-2">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
                    style={{ backgroundColor: 'var(--color-mustard)', color: 'var(--color-charcoal)' }}
                    aria-hidden="true"
                  >
                    {story.author?.[0] || '?'}
                  </div>
                  <div>
                    <cite className="not-italic font-semibold text-sm" style={{ color: 'var(--color-charcoal)' }}>
                      {story.author}
                    </cite>
                    <span className="text-xs block" style={{ color: 'var(--color-clay)' }}>
                      {story.village}
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
