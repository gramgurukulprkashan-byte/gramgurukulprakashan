import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import PageHero from '@/components/PageHero';
import SectionTitle from '@/components/SectionTitle';
import VillageList from '@/components/VillageList';
import { REAL_VILLAGES, ATLAS_PROJECT_VILLAGES } from '@/lib/seedData';

export const metadata: Metadata = {
  title: 'ग्राम एटलस — झाबुआ',
  description: 'झाबुआ ज़िले के हर गाँव की कहानी — इतिहास, नदियाँ, पहाड़, फलियों का विवरण और संस्कृति।',
};

export default function GramAtlasPage() {
  const chhagola = REAL_VILLAGES.find((v) => v.slug.current === 'chhagola');

  return (
    <>
      <PageHero
        title="ग्राम एटलस"
        description="हर गाँव की कहानी एक जगह — इतिहास, भूगोल, नदियाँ और संस्कृति का प्रामाणिक संकलन"
        breadcrumb={[{ label: 'ग्राम एटलस' }]}
        variant="cream"
      />

      {/* ── Featured Atlas: छागोला ──────────────────────── */}
      {chhagola && (
        <section className="py-12 section-sand" aria-label="प्रमुख प्रकाशित एटलस">
          <div className="container-main">
            <div
              className="card-base p-6 md:p-8 overflow-hidden"
              style={{
                border: '3px solid var(--color-orange)',
                backgroundColor: 'white',
              }}
            >
              <div className="grid md:grid-cols-12 gap-8 items-center">
                <div className="md:col-span-4">
                  <div
                    className="relative rounded-2xl overflow-hidden shadow-lg aspect-4/3"
                    style={{ border: '2px solid var(--color-sand-dark)' }}
                  >
                    <Image
                      src={chhagola.thumbnail || '/content-media/chhagola-atlas-cover.webp'}
                      alt="ग्राम छागोला सर्वेक्षण एवं एटलस"
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 360px"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="badge-published">पूर्ण सर्वेक्षण उपलब्ध</span>
                    </div>
                  </div>
                </div>

                <div className="md:col-span-8 flex flex-col gap-3">
                  <div className="flex items-center gap-2">
                    <span
                      className="text-xs px-3 py-1 rounded-full font-bold"
                      style={{ backgroundColor: 'var(--color-mustard)', color: 'var(--color-charcoal)' }}
                    >
                      ⭐ विशेष एटलस दस्तावेज़
                    </span>
                    <span className="text-xs" style={{ color: 'var(--color-clay)' }}>
                      विकासखंड: झाबुआ
                    </span>
                  </div>

                  <h2
                    className="text-2xl md:text-3xl font-bold"
                    style={{ color: 'var(--color-charcoal)', fontFamily: 'var(--font-heading)' }}
                  >
                    ग्राम एटलस — {chhagola.name}
                  </h2>

                  <p className="text-sm md:text-base leading-relaxed" style={{ color: 'var(--color-clay)' }}>
                    ग्राम छागोला का पूर्ण डिजिटल एटलस प्रकाशित किया गया है। इसमें गाँव के फलियों की स्थिति, जलधाराएँ, कुल परंपराएँ, लोक-संस्कृति, ऐतिहासिक पृष्ठभूमि और वनस्पति का सचित्र दस्तावेजीकरण किया गया है।
                  </p>

                  <div className="flex flex-wrap gap-3 pt-2">
                    <Link
                      href={`/gram-atlas/${chhagola.slug.current}`}
                      className="btn-primary"
                    >
                      गाँव का विवरण पढ़ें →
                    </Link>
                    <Link
                      href="/sampark"
                      className="btn-secondary"
                    >
                      एटलस प्रति हेतु संपर्क करें
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── Villages List (37 Surveyed Villages) ─────────── */}
      <section className="py-16 section-cream" aria-label="गाँवों की सूची">
        <div className="container-main">
          <SectionTitle
            title="ग्राम एटलस प्रोजेक्ट 2026 – गाँवों की सूची"
            subtitle="प्रत्येक गाँव का इतिहास, नदियाँ, पहाड़, और लोक-व्यवस्था का प्रामाणिक दस्तावेजीकरण"
          />

          <VillageList villages={ATLAS_PROJECT_VILLAGES} />
        </div>
      </section>
    </>
  );
}
