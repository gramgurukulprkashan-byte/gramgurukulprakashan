import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import PageHero from '@/components/PageHero';
import { getVillageBySlug } from '@/lib/queries';
import { ArrowLeft, MapPin, Info } from 'lucide-react';

interface Props {
  params: Promise<{ slug: string }>;
}

const SEED_VILLAGES: Record<string, any> = {
  ranpura: {
    name: 'रणपुरा',
    slug: { current: 'ranpura' },
    district: 'झाबुआ',
    block: 'झाबुआ',
    nameStory: 'TODO: गाँव के नाम की कहानी यहाँ दर्ज करें।',
    settlementHistory: 'TODO: गाँव कैसे बसा, उसका इतिहास यहाँ दर्ज करें।',
    riversAndPonds: 'TODO: नदी, तालाब और पहाड़ की जानकारी यहाँ दर्ज करें।',
    plantsAndAnimals: 'TODO: पेड़-पौधे, पशु और वनस्पतियाँ यहाँ दर्ज करें।',
    grazingAreas: 'TODO: खेती और चराई की जगहें यहाँ दर्ज करें।',
    traditionalSystem: 'TODO: पारंपरिक व्यवस्था और जीवनशैली यहाँ दर्ज करें।',
    traditionsAndFestivals: 'TODO: परंपराएँ और त्योहार यहाँ दर्ज करें।',
    contributor: null,
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const village = await getVillageBySlug(slug).catch(() => SEED_VILLAGES[slug]);
  if (!village) return { title: 'गाँव नहीं मिला' };
  return { title: `${village.name} — ग्राम एटलस`, description: `${village.name}, ${village.block}, ${village.district}` };
}

export default async function VillagePage({ params }: Props) {
  const { slug } = await params;
  let village: any = null;
  try { village = await getVillageBySlug(slug); } catch { /* empty */ }
  if (!village && SEED_VILLAGES[slug]) village = SEED_VILLAGES[slug];
  if (!village) notFound();

  const sections = [
    { icon: '📖', title: 'गाँव के नाम की कहानी', content: village.nameStory },
    { icon: '🏘️', title: 'गाँव का इतिहास', content: village.settlementHistory },
    { icon: '🌊', title: 'नदी, तालाब और पहाड़', content: village.riversAndPonds },
    { icon: '🌿', title: 'पेड़-पौधे और वनस्पतियाँ', content: village.plantsAndAnimals },
    { icon: '🐄', title: 'खेती और चराई की जगहें', content: village.grazingAreas },
    { icon: '⚖️', title: 'पारंपरिक व्यवस्था', content: village.traditionalSystem },
    { icon: '🎭', title: 'परंपराएँ और त्योहार', content: village.traditionsAndFestivals },
  ];

  return (
    <>
      <PageHero
        title={village.name}
        description={`${village.block} — ${village.district}`}
        breadcrumb={[
          { label: 'ग्राम एटलस', href: '/gram-atlas' },
          { label: village.name },
        ]}
        variant="cream"
      />

      <article className="py-16 section-cream">
        <div className="container-main max-w-3xl">
          {/* Location badge */}
          <div className="flex items-center gap-2 mb-8">
            <MapPin size={18} style={{ color: 'var(--color-orange)' }} aria-hidden="true" />
            <span style={{ color: 'var(--color-clay)' }}>{village.block} विकासखंड, {village.district} ज़िला</span>
          </div>

          {/* Sections */}
          <div className="space-y-8">
            {sections.map((sec) => (
              <section
                key={sec.title}
                className="card-base p-6"
                aria-label={sec.title}
              >
                <h2
                  className="flex items-center gap-2 text-xl font-bold mb-3"
                  style={{ color: 'var(--color-charcoal)', fontFamily: 'var(--font-heading)' }}
                >
                  <span aria-hidden="true">{sec.icon}</span>
                  {sec.title}
                </h2>
                <p style={{ color: 'var(--color-clay)' }}>
                  {sec.content || (
                    <span className="italic opacity-60">
                      TODO: यह जानकारी दर्ज की जानी है।
                    </span>
                  )}
                </p>
              </section>
            ))}
          </div>

          {/* Contributor */}
          {village.contributor && (
            <p className="mt-8 text-sm" style={{ color: 'var(--color-clay)' }}>
              <span className="font-semibold">जानकारी दी:</span> {village.contributor}
            </p>
          )}

          {/* Suggest correction */}
          <div
            className="mt-8 p-4 rounded-xl flex items-start gap-3"
            style={{ backgroundColor: 'var(--color-sand)', border: '1.5px solid var(--color-sand-dark)' }}
          >
            <Info size={18} style={{ color: 'var(--color-orange)', flexShrink: 0, marginTop: 2 }} aria-hidden="true" />
            <div>
              <p className="text-sm font-semibold" style={{ color: 'var(--color-charcoal)' }}>
                जानकारी भेजें / सुधार सुझाएँ
              </p>
              <p className="text-sm" style={{ color: 'var(--color-clay)' }}>
                क्या आपके पास इस गाँव की अधिक जानकारी है?{' '}
                <Link href="/hamse-judein" className="font-medium hover:underline" style={{ color: 'var(--color-orange)' }}>
                  यहाँ भेजें →
                </Link>
              </p>
            </div>
          </div>

          <div className="mt-8">
            <Link href="/gram-atlas" className="btn-secondary flex items-center gap-2 w-fit">
              <ArrowLeft size={16} aria-hidden="true" />
              सभी गाँव
            </Link>
          </div>

          {/* PHASE 3: lat/lng extension point */}
          {/* TODO Phase 3: Add interactive map using village.lat / village.lng */}
        </div>
      </article>
    </>
  );
}
