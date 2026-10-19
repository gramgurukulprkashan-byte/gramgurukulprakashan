import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import PageHero from '@/components/PageHero';
import { getKnowledgeTopicBySlug } from '@/lib/queries';
import { ArrowLeft } from 'lucide-react';

interface Props { params: Promise<{ slug: string }>; }

const SEED: Record<string, any> = {
  kheti: {
    title: 'पारंपरिक खेती और आधुनिक कृषि-विज्ञान',
    slug: { current: 'kheti' },
    traditionalKnowledge: 'भील समाज में खेती का ज्ञान पीढ़ियों से चला आ रहा है। बारिश देखकर बीज बोना, मिट्टी को जानना, देसी खाद का उपयोग — ये सब गाँव के किसान की विरासत है।\n\nTODO: ग्राम बुज़ुर्गों से विस्तृत जानकारी दर्ज करें।',
    modernScience: 'आधुनिक कृषि-विज्ञान मिट्टी परीक्षण, उन्नत बीज, सिंचाई प्रबंधन और कीट नियंत्रण पर ज़ोर देता है।\n\nTODO: कृषि विशेषज्ञों से जानकारी दर्ज करें।',
    similarities: 'दोनों मिट्टी की नमी और मौसम के महत्व को मानते हैं।',
    differences: 'परंपरागत खेती अनुभव पर निर्भर है; आधुनिक विज्ञान डेटा पर।',
    uses: 'दोनों को मिलाकर टिकाऊ खेती संभव है।',
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const t = await getKnowledgeTopicBySlug(slug).catch(() => SEED[slug]);
  if (!t) return { title: 'विषय नहीं मिला' };
  return { title: t.title };
}

export default async function KnowledgeTopicPage({ params }: Props) {
  const { slug } = await params;
  let topic: any = null;
  try { topic = await getKnowledgeTopicBySlug(slug); } catch { /* empty */ }
  if (!topic && SEED[slug]) topic = SEED[slug];
  if (!topic) notFound();

  return (
    <>
      <PageHero
        title={topic.title}
        breadcrumb={[
          { label: 'परंपरागत ज्ञान', href: '/parampragat-gyan' },
          { label: topic.title },
        ]}
        variant="cream"
      />

      <article className="py-16 section-cream">
        <div className="container-main max-w-4xl">
          {/* Two-column comparison */}
          <div className="grid md:grid-cols-2 gap-6 mb-10">
            {/* Traditional */}
            <div
              className="rounded-2xl p-6"
              style={{ backgroundColor: 'rgba(122, 74, 43, 0.06)', border: '2px solid rgba(122, 74, 43, 0.2)' }}
            >
              <h2
                className="text-xl font-bold mb-4 flex items-center gap-2"
                style={{ color: 'var(--color-clay)', fontFamily: 'var(--font-heading)' }}
              >
                <span aria-hidden="true">🌾</span>
                परंपरागत ज्ञान
              </h2>
              {topic.traditionalKnowledge ? (
                <p style={{ color: 'var(--color-clay)', whiteSpace: 'pre-line' }}>{topic.traditionalKnowledge}</p>
              ) : (
                <p className="italic opacity-60" style={{ color: 'var(--color-clay)' }}>TODO: जानकारी दर्ज करें</p>
              )}
            </div>

            {/* Modern */}
            <div
              className="rounded-2xl p-6"
              style={{ backgroundColor: 'rgba(63, 91, 46, 0.06)', border: '2px solid rgba(63, 91, 46, 0.2)' }}
            >
              <h2
                className="text-xl font-bold mb-4 flex items-center gap-2"
                style={{ color: 'var(--color-green)', fontFamily: 'var(--font-heading)' }}
              >
                <span aria-hidden="true">🔬</span>
                आधुनिक विज्ञान
              </h2>
              {topic.modernScience ? (
                <p style={{ color: 'var(--color-green)', whiteSpace: 'pre-line' }}>{topic.modernScience}</p>
              ) : (
                <p className="italic opacity-60" style={{ color: 'var(--color-green)' }}>TODO: जानकारी दर्ज करें</p>
              )}
            </div>
          </div>

          {/* Similarities, Differences, Uses */}
          {[
            { title: '🤝 समानताएँ', content: topic.similarities },
            { title: '⚖️ अंतर', content: topic.differences },
            { title: '💡 उपयोग', content: topic.uses },
          ].map((sec) => (
            <section key={sec.title} className="mb-6 card-base p-6" aria-label={sec.title}>
              <h3
                className="text-lg font-bold mb-3"
                style={{ color: 'var(--color-charcoal)', fontFamily: 'var(--font-heading)' }}
              >
                {sec.title}
              </h3>
              <p style={{ color: 'var(--color-clay)' }}>
                {sec.content || <span className="italic opacity-60">TODO: जानकारी दर्ज करें</span>}
              </p>
            </section>
          ))}

          {/* Closing */}
          <div
            className="mt-8 p-6 rounded-2xl text-center"
            style={{ backgroundColor: 'var(--color-mustard)' }}
          >
            <p className="font-semibold text-lg" style={{ color: 'var(--color-charcoal)', fontFamily: 'var(--font-heading)' }}>
              आधुनिक विज्ञान गाँव तक पहुँचे और गाँव का ज्ञान देश तक — यही हमारा लक्ष्य है।
            </p>
          </div>

          <div className="mt-8">
            <Link href="/parampragat-gyan" className="btn-secondary flex items-center gap-2 w-fit">
              <ArrowLeft size={16} aria-hidden="true" />
              सभी विषय
            </Link>
          </div>
        </div>
      </article>
    </>
  );
}
