import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import PageHero from '@/components/PageHero';
import SectionTitle from '@/components/SectionTitle';
import EmptyState from '@/components/EmptyState';
import { getAllVillages } from '@/lib/queries';
import { REAL_VILLAGES } from '@/lib/seedData';
import { Search, Download, MapPin, BookOpen } from 'lucide-react';

export const metadata: Metadata = {
  title: 'ग्राम एटलस — झाबुआ',
  description: 'झाबुआ ज़िले के हर गाँव की कहानी — इतिहास, नदियाँ, पहाड़, फलियों का विवरण और संस्कृति।',
};

export default async function GramAtlasPage() {
  let villages: any[] = [];
  try {
    villages = await getAllVillages() || [];
  } catch { /* empty */ }
  if (!villages || villages.length === 0) {
    villages = REAL_VILLAGES;
  }

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
                      src={chhagola.thumbnail || '/content-media/chhagola-village-school.webp'}
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
                    ग्राम छागोला का 13.4 MB का पूर्ण डिजिटल एटलस प्रकाशित किया गया है। इसमें गाँव के फलियों की स्थिति, जलधाराएँ, कुल परंपराएँ, लोक-संस्कृति, ऐतिहासिक पृष्ठभूमि और वनस्पति का सचित्र दस्तावेजीकरण किया गया है।
                  </p>

                  <div className="flex flex-wrap gap-3 pt-2">
                    <a
                      href="/content-media/छागोला गांव एटलस.pdf"
                      download
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary"
                    >
                      <Download size={18} aria-hidden="true" />
                      छागोला एटलस डाउनलोड करें (PDF - 13 MB)
                    </a>
                    <Link
                      href={`/gram-atlas/${chhagola.slug.current}`}
                      className="btn-secondary"
                    >
                      गाँव का विवरण पढ़ें →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── Search Bar ──────────────────────────────────── */}
      <section className="py-6 section-cream" aria-label="गाँव खोजें">
        <div className="container-main max-w-2xl">
          <form method="GET" role="search" className="flex gap-3">
            <label htmlFor="village-search" className="sr-only">गाँव खोजें</label>
            <div className="relative flex-1">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--color-clay)' }} aria-hidden="true" />
              <input
                id="village-search"
                name="q"
                type="search"
                placeholder="गाँव का नाम या विकासखंड खोजें..."
                className="input-base pl-10"
              />
            </div>
            <button type="submit" className="btn-primary px-6">खोजें</button>
          </form>
        </div>
      </section>

      {/* ── Villages Grid ───────────────────────────────── */}
      <section className="py-16 section-sand" aria-label="गाँवों की सूची">
        <div className="container-main">
          <SectionTitle
            title={`सर्वेक्षित गाँवों की सूची (${villages.length})`}
            subtitle="प्रत्येक गाँव का इतिहास, नदियाँ, पहाड़, और लोक-व्यवस्था"
          />

          {villages.length > 0 ? (
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {villages.map((v: any) => (
                <Link
                  key={v._id}
                  href={`/gram-atlas/${v.slug?.current}`}
                  className="card-base overflow-hidden no-underline block group hover:shadow-xl transition-all"
                  style={{ textDecoration: 'none' }}
                >
                  {v.thumbnail ? (
                    <div className="relative aspect-16/10 overflow-hidden bg-[var(--color-sand)]">
                      <Image
                        src={v.thumbnail}
                        alt={`ग्राम ${v.name}`}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      />
                    </div>
                  ) : (
                    <div
                      className="aspect-16/10 flex items-center justify-center font-bold text-3xl"
                      style={{ backgroundColor: 'var(--color-sand)', color: 'var(--color-orange)' }}
                    >
                      {v.name?.[0] || 'ग'}
                    </div>
                  )}

                  <div className="p-4 flex flex-col gap-1">
                    <div className="flex items-center justify-between">
                      <h3
                        className="font-bold text-lg"
                        style={{ color: 'var(--color-charcoal)', fontFamily: 'var(--font-heading)' }}
                      >
                        ग्राम {v.name}
                      </h3>
                      <span
                        className="text-[11px] px-2 py-0.5 rounded font-medium"
                        style={{ backgroundColor: 'rgba(200, 102, 30, 0.1)', color: 'var(--color-orange)' }}
                      >
                        {v.block}
                      </span>
                    </div>

                    <p className="text-xs flex items-center gap-1" style={{ color: 'var(--color-clay)' }}>
                      <MapPin size={12} aria-hidden="true" />
                      ज़िला {v.district}
                    </p>

                    <div className="mt-2 pt-2 border-t border-[var(--color-sand-dark)] flex items-center justify-between text-xs font-semibold" style={{ color: 'var(--color-orange)' }}>
                      <span>एटलस विवरण</span>
                      <span>→</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <EmptyState message="अभी कोई गाँव उपलब्ध नहीं है।" />
          )}
        </div>
      </section>
    </>
  );
}
