import type { Metadata } from 'next';
import Link from 'next/link';
import PageHero from '@/components/PageHero';
import SectionTitle from '@/components/SectionTitle';
import EmptyState from '@/components/EmptyState';
import { getAllVillages } from '@/lib/queries';
import { Search } from 'lucide-react';

export const metadata: Metadata = {
  title: 'ग्राम एटलस',
  description: 'झाबुआ ज़िले के हर गाँव की कहानी — इतिहास, नदियाँ, परंपराएँ और संस्कृति।',
};

const SEED_VILLAGES = [
  { _id: 'v1', name: 'रणपुरा', slug: { current: 'ranpura' }, district: 'झाबुआ', block: 'झाबुआ', thumbnail: null },
  { _id: 'v2', name: 'मेघनगर', slug: { current: 'meghnagar' }, district: 'झाबुआ', block: 'मेघनगर', thumbnail: null },
  { _id: 'v3', name: 'थांदला', slug: { current: 'thandla' }, district: 'झाबुआ', block: 'थांदला', thumbnail: null },
  { _id: 'v4', name: 'पेटलावद', slug: { current: 'petlawad' }, district: 'झाबुआ', block: 'पेटलावद', thumbnail: null },
];

export default async function GramAtlasPage() {
  let villages: typeof SEED_VILLAGES = [];
  try { villages = await getAllVillages() || []; } catch { /* empty */ }
  if (!villages || villages.length === 0) villages = SEED_VILLAGES;

  return (
    <>
      <PageHero
        title="ग्राम एटलस"
        description="हर गाँव की कहानी एक जगह — इतिहास, भूगोल और संस्कृति"
        breadcrumb={[{ label: 'ग्राम एटलस' }]}
        variant="cream"
      />

      {/* Search/filter bar */}
      <section className="py-8 section-sand" aria-label="गाँव खोजें">
        <div className="container-main">
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

      {/* Map Coming Soon */}
      <section className="py-6 section-sand">
        <div className="container-main">
          <div
            className="p-4 rounded-xl flex items-center gap-3"
            style={{ backgroundColor: 'rgba(200, 102, 30, 0.1)', border: '1.5px solid rgba(200, 102, 30, 0.3)' }}
            role="note"
          >
            <span aria-hidden="true">🗺️</span>
            <p className="text-sm font-medium" style={{ color: 'var(--color-orange)' }}>
              नक्शा जल्द आ रहा है — Phase 3 में इंटरेक्टिव डिजिटल नक्शा जोड़ा जाएगा।
            </p>
          </div>
        </div>
      </section>

      {/* Village grid */}
      <section className="py-16 section-cream" aria-label="गाँवों की सूची">
        <div className="container-main">
          <SectionTitle title={`गाँवों की सूची (${villages.length})`} />
          {villages.length > 0 ? (
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {villages.map((v: any) => (
                <Link
                  key={v._id}
                  href={`/gram-atlas/${v.slug?.current}`}
                  className="card-base p-5 no-underline block"
                  style={{ textDecoration: 'none' }}
                >
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center mb-3 text-lg font-bold"
                    style={{ backgroundColor: 'var(--color-mustard)', color: 'var(--color-charcoal)' }}
                    aria-hidden="true"
                  >
                    {v.name?.[0] || '?'}
                  </div>
                  <h2
                    className="font-bold text-lg mb-1"
                    style={{ color: 'var(--color-charcoal)', fontFamily: 'var(--font-heading)' }}
                  >
                    {v.name}
                  </h2>
                  <p className="text-sm" style={{ color: 'var(--color-clay)' }}>
                    {v.block} — {v.district}
                  </p>
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
