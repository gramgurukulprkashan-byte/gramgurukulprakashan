import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import PageHero from '@/components/PageHero';
import { getTraditionBySlug } from '@/lib/queries';
import { ArrowLeft, Info } from 'lucide-react';

interface Props { params: Promise<{ slug: string }>; }

const SEED: Record<string, any> = {
  halma: {
    name: 'हलमा',
    slug: { current: 'halma' },
    meaning: 'हलमा एक सामूहिक श्रम की पारंपरिक भील परंपरा है। इसमें पूरा गाँव मिलकर किसी एक परिवार या सामाजिक कार्य के लिए श्रम दान करता है।',
    process: 'TODO: ग्राम बुज़ुर्गों से प्रमाणित प्रक्रिया यहाँ दर्ज करें।',
    socialImportance: 'हलमा सामाजिक एकता और परस्पर सहयोग का प्रतीक है।',
    lesson: 'सामूहिक सहयोग से बड़े से बड़ा काम संभव होता है।',
    contributor: null,
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const t = await getTraditionBySlug(slug).catch(() => SEED[slug]);
  if (!t) return { title: 'परंपरा नहीं मिली' };
  return { title: `${t.name} — परंपरा`, description: t.meaning };
}

export default async function TraditionPage({ params }: Props) {
  const { slug } = await params;
  let tradition: any = null;
  try { tradition = await getTraditionBySlug(slug); } catch { /* empty */ }
  if (!tradition && SEED[slug]) tradition = SEED[slug];
  if (!tradition) notFound();

  return (
    <>
      <PageHero
        title={tradition.name}
        breadcrumb={[
          { label: 'संस्कृति और परंपराएँ', href: '/sanskriti-parampara' },
          { label: tradition.name },
        ]}
        variant="mustard"
      />

      <article className="py-16 section-cream">
        <div className="container-main max-w-3xl">
          {/* Community notice */}
          <div
            className="mb-8 p-4 rounded-xl flex items-start gap-3"
            style={{ backgroundColor: 'rgba(200, 102, 30, 0.08)', border: '1.5px solid rgba(200, 102, 30, 0.2)' }}
            role="note"
          >
            <Info size={18} style={{ color: 'var(--color-orange)', flexShrink: 0, marginTop: 2 }} aria-hidden="true" />
            <p className="text-sm" style={{ color: 'var(--color-clay)' }}>
              TODO: यह विवरण ग्राम बुज़ुर्गों से प्रमाणित कराएँ। प्रकाशन से पहले सामुदायिक सहमति ली जाएगी।
            </p>
          </div>

          {[
            { title: 'अर्थ', content: tradition.meaning },
            { title: 'प्रक्रिया', content: tradition.process },
            { title: 'सामाजिक महत्व', content: tradition.socialImportance },
            { title: 'इससे मिलने वाली सीख', content: tradition.lesson },
          ].map((sec) => sec.content && (
            <section key={sec.title} className="mb-8" aria-label={sec.title}>
              <h2
                className="text-xl font-bold mb-3"
                style={{ color: 'var(--color-charcoal)', fontFamily: 'var(--font-heading)', borderBottom: '2px solid var(--color-mustard)', paddingBottom: '0.5rem' }}
              >
                {sec.title}
              </h2>
              <p style={{ color: 'var(--color-clay)' }}>{sec.content}</p>
            </section>
          ))}

          {tradition.contributor && (
            <p className="text-sm mt-4" style={{ color: 'var(--color-clay)' }}>
              <span className="font-semibold">जानकारी दी:</span> {tradition.contributor}
            </p>
          )}

          <div className="mt-8">
            <Link href="/sanskriti-parampara" className="btn-secondary flex items-center gap-2 w-fit">
              <ArrowLeft size={16} aria-hidden="true" />
              सभी परंपराएँ
            </Link>
          </div>
        </div>
      </article>
    </>
  );
}
