import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import PageHero from '@/components/PageHero';
import { getVillageBySlug } from '@/lib/queries';
import { REAL_VILLAGES } from '@/lib/seedData';
import { ArrowLeft, MapPin, Info, Download, BookOpen } from 'lucide-react';

interface Props {
  params: Promise<{ slug: string }>;
}

const SEED_LOOKUP: Record<string, any> = Object.fromEntries(
  REAL_VILLAGES.map((v) => [v.slug.current, v])
);

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  let village: any = null;
  try {
    village = await getVillageBySlug(slug);
  } catch { /* empty */ }
  if (!village) village = SEED_LOOKUP[slug];
  if (!village) return { title: 'गाँव नहीं मिला' };
  return {
    title: `${village.name} — ग्राम एटलस, झाबुआ`,
    description: `${village.name}, विकासखंड ${village.block}, ज़िला ${village.district} का ऐतिहासिक एवं भौगोलिक दस्तावेज़।`,
  };
}

export default async function VillagePage({ params }: Props) {
  const { slug } = await params;
  let village: any = null;
  try {
    village = await getVillageBySlug(slug);
  } catch { /* empty */ }
  if (!village && SEED_LOOKUP[slug]) village = SEED_LOOKUP[slug];
  if (!village) notFound();

  const sections = [
    { icon: '📖', title: 'गाँव के नाम की कहानी', content: village.nameStory },
    { icon: '🏘️', title: 'गाँव का इतिहास एवं बसाहट', content: village.settlementHistory },
    { icon: '🌊', title: 'नदी, तालाब, पहाड़ और जलस्रोत', content: village.riversAndPonds },
    { icon: '🌿', title: 'पेड़-पौधे, पशु और वनस्पतियाँ', content: village.plantsAndAnimals },
    { icon: '🐄', title: 'खेती और चराई की जगहें', content: village.grazingAreas },
    { icon: '⚖️', title: 'पारंपरिक व्यवस्था एवं पंचायत', content: village.traditionalSystem },
    { icon: '🎭', title: 'परंपराएँ, पर्व और त्योहार', content: village.traditionsAndFestivals },
  ];

  return (
    <>
      <PageHero
        title={`ग्राम ${village.name}`}
        description={`${village.block} विकासखंड — ज़िला ${village.district}`}
        breadcrumb={[
          { label: 'ग्राम एटलस', href: '/gram-atlas' },
          { label: village.name },
        ]}
        variant="cream"
      />

      <article className="py-16 section-cream">
        <div className="container-main max-w-4xl">
          {/* Header Card with Photo & PDF Download */}
          <div
            className="card-base p-6 md:p-8 mb-10 overflow-hidden"
            style={{ border: '2px solid var(--color-sand-dark)' }}
          >
            <div className="grid md:grid-cols-12 gap-6 items-center">
              {village.thumbnail && (
                <div className="md:col-span-5">
                  <div
                    className="relative rounded-2xl overflow-hidden shadow-md aspect-4/3"
                    style={{ border: '2px solid var(--color-sand-dark)' }}
                  >
                    <Image
                      src={village.thumbnail}
                      alt={`ग्राम ${village.name} परिदृश्य`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 360px"
                    />
                  </div>
                </div>
              )}

              <div className={village.thumbnail ? 'md:col-span-7' : 'md:col-span-12'}>
                <div className="flex items-center gap-2 mb-2">
                  <MapPin size={18} style={{ color: 'var(--color-orange)' }} aria-hidden="true" />
                  <span className="font-semibold text-sm" style={{ color: 'var(--color-clay)' }}>
                    {village.block} विकासखंड, {village.district} ज़िला
                  </span>
                </div>

                <h2
                  className="text-2xl md:text-3xl font-bold mb-3"
                  style={{ color: 'var(--color-charcoal)', fontFamily: 'var(--font-heading)' }}
                >
                  ग्राम {village.name} का सामाजिक-सांस्कृतिक एटलस
                </h2>

                <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--color-clay)' }}>
                  गाँव की पहचान, लोक इतिहास, प्रकृति, जल-संरचना और पारंपरिक भील सामाजिक व्यवस्था का संकलन।
                </p>

                {village.pdfUrl && (
                  <div className="pt-2">
                    <a
                      href={village.pdfUrl}
                      download
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary"
                    >
                      <Download size={18} aria-hidden="true" />
                      संपूर्ण एटलस PDF डाउनलोड करें (13 MB)
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Detailed Sections */}
          <div className="space-y-6">
            {sections.map((sec) => (
              <section
                key={sec.title}
                className="card-base p-6 md:p-7"
                aria-label={sec.title}
              >
                <h2
                  className="flex items-center gap-3 text-lg md:text-xl font-bold mb-3"
                  style={{ color: 'var(--color-charcoal)', fontFamily: 'var(--font-heading)' }}
                >
                  <span className="text-2xl" aria-hidden="true">{sec.icon}</span>
                  {sec.title}
                </h2>
                <p className="text-sm md:text-base leading-relaxed" style={{ color: 'var(--color-charcoal)' }}>
                  {sec.content || (
                    <span className="italic opacity-60">
                      यह जानकारी क्षेत्रीय शोध दल द्वारा संकलित की जा रही है।
                    </span>
                  )}
                </p>
              </section>
            ))}
          </div>

          {/* Contributor */}
          {village.contributor && (
            <p className="mt-8 text-sm" style={{ color: 'var(--color-clay)' }}>
              <span className="font-semibold">जानकारी संकलन:</span> {village.contributor}
            </p>
          )}

          {/* Suggest correction */}
          <div
            className="mt-8 p-5 rounded-2xl flex items-start gap-4"
            style={{ backgroundColor: 'var(--color-sand)', border: '1.5px solid var(--color-sand-dark)' }}
          >
            <Info size={20} style={{ color: 'var(--color-orange)', flexShrink: 0, marginTop: 2 }} aria-hidden="true" />
            <div>
              <p className="text-sm font-bold" style={{ color: 'var(--color-charcoal)' }}>
                जानकारी भेजें / सुधार सुझाएँ
              </p>
              <p className="text-sm mt-1" style={{ color: 'var(--color-clay)' }}>
                क्या आपके पास {village.name} गाँव की पुरानी कहानियाँ, जलस्रोतों या वंशावली की जानकारी है?{' '}
                <Link href="/hamse-judein" className="font-semibold hover:underline" style={{ color: 'var(--color-orange)' }}>
                  यहाँ भेजें →
                </Link>
              </p>
            </div>
          </div>

          <div className="mt-8">
            <Link href="/gram-atlas" className="btn-secondary flex items-center gap-2 w-fit">
              <ArrowLeft size={16} aria-hidden="true" />
              सभी गाँव देखें
            </Link>
          </div>
        </div>
      </article>
    </>
  );
}
